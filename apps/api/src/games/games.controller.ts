import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) { }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    ) {
        const pagination = new PaginationQueryDto(page, limit);
        return this.gamesService.findAll(pagination);
    }

    @Get('statistics/popularity')
    getPopularityStatistics() {
        return this.gamesService.getPopularityStatistics();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.findOne(id);
    }
}
