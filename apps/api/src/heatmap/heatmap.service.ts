import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { calculateThrowScore } from '../shared/utils/scoring.util';

import { HeatmapResponse } from '@repo/types';

@Injectable()
export class HeatmapService {
    constructor(private readonly db: DatabaseService) { }

    async getHeatmapData(playerId: string): Promise<HeatmapResponse> {
        // Fetch all throws for the user to plot on the canvas
        const throws = await this.db.throw.findMany({
            where: { player_id: playerId },
            select: {
                x: true,
                y: true,
                modifier: true,
                score: true,
            },
        });

        if (!throws || throws.length === 0) {
            throw new NotFoundException(`No throw data found for player ${playerId}`);
        }

        const totalThrows = throws.length;
        let validHits = 0;
        let totalScore = 0;

        // Grouping for favorite zones (ignoring misses)
        const zoneHits: Record<number, number> = {};
        const coordinates: HeatmapResponse['coordinates'] = [];

        for (const t of throws) {
            // Push exact coordinates required for the canvas plotter
            if (t.x !== null && t.y !== null && t.modifier !== null) {
                coordinates.push({
                    x: t.x,
                    y: t.y,
                    modifier: t.modifier,
                });
            }

            const modifier = t.modifier || 0;
            const score = t.score || 0;

            if (modifier > 0) {
                validHits++;
                totalScore += calculateThrowScore({ score, modifier });

                // Track the segment hit frequency
                if (score > 0) {
                    zoneHits[score] = (zoneHits[score] || 0) + 1;
                }
            }
        }

        const accuracy = totalThrows > 0 ? Number(((validHits / totalThrows) * 100).toFixed(1)) : 0;
        const averageScore = validHits > 0 ? Number((totalScore / validHits).toFixed(1)) : 0;

        // Sort zones by most hits and map to percentages
        const favoriteZones = Object.entries(zoneHits)
            .map(([scoreStr, hits]) => ({
                score: parseInt(scoreStr, 10),
                hits,
                percentage: validHits > 0 ? Number(((hits / validHits) * 100).toFixed(1)) : 0,
            }))
            .sort((a, b) => b.hits - a.hits)
            .slice(0, 5); // Take top 5

        return {
            performance: {
                accuracy,
                averageScore,
                totalThrows,
            },
            favoriteZones,
            coordinates,
        };
    }
}
