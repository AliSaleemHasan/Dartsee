import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginatedResponseDto } from '../shared/dto/paginated-response.dto';
import { Game, Player, Throw } from '@repo/prisma';
import { calculateThrowScore, formatThrow, chunkArray } from '../shared/utils/scoring.util';

@Injectable()
export class GamesService {
    constructor(private readonly db: DatabaseService) { }

    async findAll(
        pagination: PaginationQueryDto,
    ): Promise<PaginatedResponseDto<Game>> {
        const whereClause = pagination.type ? { type: pagination.type } : {};

        const [data, total] = await Promise.all([
            this.db.game.findMany({
                where: whereClause,
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
            this.db.game.count({ where: whereClause }),
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

    private groupThrowsByPlayer(throws: Throw[]): Record<string, Throw[]> {
        return throws.reduce((acc, t) => {
            if (t.player_id) {
                acc[t.player_id] ??= [];
                acc[t.player_id]!.push(t);
            }
            return acc;
        }, {} as Record<string, Throw[]>);
    }

    private calculatePlayerStats(player: Player, playerThrows: Throw[]) {
        let misses = 0;
        let bestRoundScore = 0;
        let totalScore = 0;

        const roundChunks = chunkArray(playerThrows, 3);

        const rounds = roundChunks.map((chunk, index) => {
            let roundScore = 0;
            const throws = chunk.map((t) => {
                if (t.modifier === 0) misses++;

                const score = calculateThrowScore(t);
                roundScore += score;
                totalScore += score;

                return formatThrow(t);
            });

            if (roundScore > bestRoundScore) bestRoundScore = roundScore;

            return {
                roundNumber: index + 1,
                throws,
                score: roundScore,
            };
        });

        const roundCount = Math.max(rounds.length, 1);
        const averageScorePerRound = playerThrows.length > 0
            ? Number((totalScore / roundCount).toFixed(2))
            : 0;

        return {
            id: player.id,
            name: player.name,
            stats: {
                averageScorePerRound,
                misses,
                totalScore,
                bestRoundScore,
            },
            rounds,
            _rawTotalScore: totalScore
        };
    }

    async findOne(id: number) {
        const game = await this.db.game.findUnique({
            where: { id },
            include: {
                game_players: {
                    include: { player: true },
                },
                throws: true,
            },
        });

        if (!game) throw new NotFoundException(`Game with ID ${id} not found`);

        const throwsByPlayerId = this.groupThrowsByPlayer(game.throws);

        // Map players and remove any invalid (null) records immediately
        const playersWithStats = game.game_players
            .map((gp) => gp.player ? this.calculatePlayerStats(gp.player, throwsByPlayerId[gp.player_id!] || []) : null)
            .filter((p): p is NonNullable<typeof p> => p !== null);

        const highestScore = Math.max(...playersWithStats.map(p => p._rawTotalScore), -1);

        const players = playersWithStats.map(({ _rawTotalScore, ...p }) => ({
            ...p,
            isWinner: p.id !== null && _rawTotalScore === highestScore && _rawTotalScore > 0,
        }));

        return {
            id: game.id,
            type: game.type,
            players,
        };
    }
}
