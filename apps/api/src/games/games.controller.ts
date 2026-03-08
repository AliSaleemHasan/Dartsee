import { Controller, Get, Query, ParseIntPipe, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';

@ApiTags('Games')
@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) { }

    @ApiOperation({ summary: 'List all games securely tracked by Dartsee, paginated.' })
    @Get()
    findAll(@Query() pagination: PaginationQueryDto) {
        return this.gamesService.findAll(pagination);
    }

    @ApiOperation({ summary: 'Fetch precise match report for a completed game, calculating scores and isolating the winner.' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.findOne(id);
    }
}
