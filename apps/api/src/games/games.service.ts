import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { PaginatedResponseDto } from '../shared/dto/paginated-response.dto';
import { Game } from '../generated/prisma/client';

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
}
