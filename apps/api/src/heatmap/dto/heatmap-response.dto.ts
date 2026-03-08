import { HeatmapResponse } from '@repo/types';

export class HeatmapPerformanceDto {
    accuracy!: number;
    averageScore!: number;
    totalThrows!: number;
}

export class HeatmapFavoriteZoneDto {
    score!: number;
    hits!: number;
    percentage!: number;
}

export class HeatmapCoordinateDto {
    x!: number;
    y!: number;
    modifier!: number;
}

export class HeatmapResponseDto implements HeatmapResponse {
    performance!: HeatmapPerformanceDto;
    favoriteZones!: HeatmapFavoriteZoneDto[];
    coordinates!: HeatmapCoordinateDto[];
}
