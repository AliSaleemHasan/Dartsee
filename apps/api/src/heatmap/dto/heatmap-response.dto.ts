import { ApiProperty } from '@nestjs/swagger';
import { HeatmapResponse } from '@repo/types';

export class HeatmapPerformanceDto {
    @ApiProperty({ description: 'The percentage of throws that hit the board versus missed.', example: 85.5 })
    accuracy!: number;

    @ApiProperty({ description: 'The average score calculated across all valid throws.', example: 14.2 })
    averageScore!: number;

    @ApiProperty({ description: 'The total number of darts thrown by the player.', example: 150 })
    totalThrows!: number;
}

export class HeatmapFavoriteZoneDto {
    @ApiProperty({ description: 'The segment score value (e.g. 20, 19, 50).', example: 20 })
    score!: number;

    @ApiProperty({ description: 'The number of times the player hit this zone.', example: 45 })
    hits!: number;

    @ApiProperty({ description: 'The hit ratio percentage relative to total valid throws.', example: 30.0 })
    percentage!: number;
}

export class HeatmapCoordinateDto {
    @ApiProperty({ description: 'Raw X coordinate captured by the Dartsee camera.', example: 350.5 })
    x!: number;

    @ApiProperty({ description: 'Raw Y coordinate captured by the Dartsee camera.', example: 400.1 })
    y!: number;

    @ApiProperty({ description: 'Hit modifier (1 for Single, 2 for Double, 3 for Treble, 0 for Miss)', example: 1 })
    modifier!: number;
}

export class HeatmapResponseDto implements HeatmapResponse {
    @ApiProperty({ type: () => HeatmapPerformanceDto })
    performance!: HeatmapPerformanceDto;

    @ApiProperty({ type: () => [HeatmapFavoriteZoneDto] })
    favoriteZones!: HeatmapFavoriteZoneDto[];

    @ApiProperty({ type: () => [HeatmapCoordinateDto] })
    coordinates!: HeatmapCoordinateDto[];
}
