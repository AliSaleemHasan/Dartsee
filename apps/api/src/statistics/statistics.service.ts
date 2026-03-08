import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

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
}
