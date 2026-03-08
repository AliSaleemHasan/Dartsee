import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { TopPlayerStatDto } from './dto/top-player-stat.dto';
import { GameTypePerformanceStatDto } from './dto/game-type-performance.dto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) { }

    @ApiOperation({ summary: 'Count the occurrences of different game types played.' })
    @Get('popularity')
    getPopularityStatistics() {
        return this.statisticsService.getPopularityStatistics();
    }

    @ApiOperation({ summary: 'Get the Top 5 players ranked strictly by their Triple Hit Rate percentage.' })
    @ApiResponse({ type: [TopPlayerStatDto] })
    @Get('top-players')
    getTopPlayers(): Promise<TopPlayerStatDto[]> {
        return this.statisticsService.getTopPlayers();
    }

    @ApiOperation({ summary: 'Calculate scoring averages and hit rates isolated by Gametype (e.g. 501, Cricket).' })
    @ApiResponse({ type: [GameTypePerformanceStatDto] })
    @Get('game-type-performance')
    getPerformanceByGameType(): Promise<GameTypePerformanceStatDto[]> {
        return this.statisticsService.getPerformanceByGameType();
    }
}
