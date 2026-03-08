import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { HeatmapService } from './heatmap.service';
import { HeatmapResponseDto } from './dto/heatmap-response.dto';

@Controller('heatmap')
export class HeatmapController {
    constructor(private readonly heatmapService: HeatmapService) { }

    @Get(':playerId')
    async getPlayerHeatmap(@Param('playerId', ParseUUIDPipe) playerId: string): Promise<HeatmapResponseDto> {
        return this.heatmapService.getHeatmapData(playerId);
    }
}
