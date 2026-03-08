import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) { }

    @ApiOperation({ summary: 'Count the occurrences of different game types played.' })
    @Get('popularity')
    getPopularityStatistics() {
        return this.statisticsService.getPopularityStatistics();
    }
}
