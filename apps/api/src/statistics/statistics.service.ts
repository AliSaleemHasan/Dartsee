import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { TopPlayerStatDto } from './dto/top-player-stat.dto';
import { GameTypePerformanceStatDto } from './dto/game-type-performance.dto';

@Injectable()
export class StatisticsService {
    constructor(private readonly db: DatabaseService) { }

    async getPopularityStatistics() {
        const stats = await this.db.game.groupBy({
            by: ['type'],
            _count: {
                id: true,
            },
        });

        return stats.map((stat) => ({
            gametype: stat.type || 'Unknown',
            count: stat._count.id,
        }));
    }

    async getTopPlayers(): Promise<TopPlayerStatDto[]> {
        // Raw SQL for ultimate aggregation performance across massive arrays of throws.
        // We calculate percentages by summing conditions where modifiers match Triple (3), Double (2), Miss (0).
        const rawStats = await this.db.$queryRaw<
            {
                playerId: string;
                playerName: string;
                tripleRate: number;
                doubleRate: number;
                missRate: number;
            }[]
        >`
            SELECT 
                p.id as playerId,
                p.name as playerName,
                ROUND(CAST(SUM(CASE WHEN t.modifier = 3 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(t.id) * 100, 1) as tripleRate,
                ROUND(CAST(SUM(CASE WHEN t.modifier = 2 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(t.id) * 100, 1) as doubleRate,
                ROUND(CAST(SUM(CASE WHEN t.modifier = 0 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(t.id) * 100, 1) as missRate
            FROM players p
            JOIN throws t ON p.id = t.player_id
            WHERE t.modifier IS NOT NULL
            GROUP BY p.id, p.name
            ORDER BY tripleRate DESC
            LIMIT 5;
        `;

        return rawStats.map(stat => ({
            playerId: stat.playerId,
            playerName: stat.playerName,
            tripleRate: Number(stat.tripleRate) || 0,
            doubleRate: Number(stat.doubleRate) || 0,
            missRate: Number(stat.missRate) || 0,
        }));
    }

    async getPerformanceByGameType(): Promise<GameTypePerformanceStatDto[]> {
        const rawStats = await this.db.$queryRaw<
            {
                gameType: string;
                avgScorePerThrow: number;
                missRate: number;
                tripleRate: number;
            }[]
        >`
            SELECT 
                g.type as gameType,
                ROUND(AVG(CAST(COALESCE(t.score, 0) * COALESCE(t.modifier, 1) AS FLOAT)), 1) as avgScorePerThrow,
                ROUND(CAST(SUM(CASE WHEN t.modifier = 0 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(t.id) * 100, 1) as missRate,
                ROUND(CAST(SUM(CASE WHEN t.modifier = 3 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(t.id) * 100, 1) as tripleRate
            FROM games g
            JOIN throws t ON g.id = t.game_id
            WHERE g.type IS NOT NULL AND t.modifier IS NOT NULL
            GROUP BY g.type
            ORDER BY g.type ASC;
        `;

        return rawStats.map(stat => ({
            gameType: stat.gameType,
            avgScorePerThrow: Number(stat.avgScorePerThrow) || 0,
            missRate: Number(stat.missRate) || 0,
            tripleRate: Number(stat.tripleRate) || 0,
        }));
    }
}
