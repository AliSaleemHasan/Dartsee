import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HeatmapService } from './heatmap.service';
import { HeatmapResponseDto } from './dto/heatmap-response.dto';

@ApiTags('Heatmap')
@Controller('heatmap')
export class HeatmapController {
    constructor(private readonly heatmapService: HeatmapService) { }

    @ApiOperation({ summary: 'Generate coordinate data and hit statistics for a specific player.' })
    @Get(':playerId')
    async getPlayerHeatmap(@Param('playerId', ParseUUIDPipe) playerId: string): Promise<HeatmapResponseDto> {
        return this.heatmapService.getHeatmapData(playerId);
    }
}
