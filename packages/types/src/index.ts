export interface HeatmapResponse {
    performance: {
        accuracy: number;
        averageScore: number;
        totalThrows: number;
    };
    favoriteZones: {
        score: number;
        hits: number;
        percentage: number;
    }[];
    coordinates: {
        x: number;
        y: number;
        modifier: number;
    }[];
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface PaginationQuery {
    page?: number;
    limit?: number;
}

// Feel free to move other interfaces (GameDetail, PlayerStats, etc.) here in the future!
