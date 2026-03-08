import { Controller, Get, Query, ParseIntPipe, Param } from '@nestjs/common';
import { GamesService } from './games.service';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) { }

    @Get()
    findAll(@Query() pagination: PaginationQueryDto) {
        return this.gamesService.findAll(pagination);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.findOne(id);
    }
}
