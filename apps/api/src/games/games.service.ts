import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginatedResponseDto } from '../shared/dto/paginated-response.dto';
import { Game, Player, Throw } from '@repo/prisma';

@Injectable()
export class GamesService {
    constructor(private readonly db: DatabaseService) { }

    async findAll(
        pagination: PaginationQueryDto,
    ): Promise<PaginatedResponseDto<Game>> {
        const [data, total] = await Promise.all([
            this.db.game.findMany({
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { id: 'asc' },
                include: {
                    game_players: {
                        select: {
                            player: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.db.game.count(),
        ]);

        return {
            data,
            meta: {
                total,
                page: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(total / pagination.limit),
            },
        };
    }

    private calculatePlayerStats(player: Player, playerThrows: Throw[]) {

        const totalThrows = playerThrows.length;
        const totalScore = playerThrows.reduce((sum, t) => sum + (t.score || 0) * (t.modifier || 0), 0);
        const rounds = totalThrows / 3;
        const misses = playerThrows.filter((t) => t.modifier === 0).length;

        return {
            id: player.id,
            name: player.name,
            averageScorePerRound: rounds > 0 ? Number((totalScore / rounds).toFixed(2)) : 0,
            misses,
        };
    }

    async findOne(id: number) {
        const game = await this.db.game.findUnique({
            where: { id },
            include: {
                game_players: {
                    include: {
                        player: true,
                    },
                },
                throws: true,
            },
        });

        if (!game) {
            throw new NotFoundException(`Game with ID ${id} not found`);
        }

        const throwsByPlayerId = game.throws.reduce((acc, t) => {
            if (t.player_id) {
                if (!acc[t.player_id]) acc[t.player_id] = [];
                acc[t.player_id]!.push(t);
            }
            return acc;
        }, {} as Record<string, typeof game.throws>);

        const players = game.game_players.map((gp) => {
            if (!gp.player) return null;

            return this.calculatePlayerStats(gp.player, throwsByPlayerId[gp.player_id!] || []);
        });

        return {
            id: game.id,
            type: game.type,
            players,
        };
    }

    async getPopularityStatistics() {
        const stats = await this.db.game.groupBy({
            by: ['type'],
            _count: {
                id: true,
            },
        });

        return stats.map(stat => ({
            gametype: stat.type || 'Unknown',
            count: stat._count.id,
        }));
    }



}
