import { useSuspenseQuery, useQuery, keepPreviousData } from '@tanstack/react-query';
import { apiFetch } from './apiClient';
import type {
    PaginatedResponse,
    HeatmapResponse,
    TopPlayerStat,
    GameTypePerformanceStat
} from '@repo/types';

// Games
export function useGames(page: number, limit: number, type?: string) {
    const query = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (type && type !== 'All') {
        query.set('type', type);
    }

    return useQuery({
        queryKey: ['games', page, limit, type],
        queryFn: () => apiFetch<PaginatedResponse<any>>(`/games?${query.toString()}`),
        placeholderData: keepPreviousData,
    });
}

export function useGameDetail(id: number) {
    return useSuspenseQuery({
        queryKey: ['game', id],
        queryFn: () => apiFetch<any>(`/games/${id}`),
    });
}

// Statistics
export function useStatisticsPopularity() {
    return useSuspenseQuery({
        queryKey: ['statistics', 'popularity'],
        queryFn: () => apiFetch<{ gametype: string; count: number }[]>('/statistics/popularity'),
    });
}

export function useStatisticsTopPlayers() {
    return useSuspenseQuery({
        queryKey: ['statistics', 'top-players'],
        queryFn: () => apiFetch<TopPlayerStat[]>('/statistics/top-players'),
    });
}

export function useStatisticsGamePerformance() {
    return useSuspenseQuery({
        queryKey: ['statistics', 'game-performance'],
        queryFn: () => apiFetch<GameTypePerformanceStat[]>('/statistics/game-type-performance'),
    });
}

// Heatmap
export function usePlayerHeatmap(playerId: string) {
    return useSuspenseQuery({
        queryKey: ['heatmap', playerId],
        queryFn: () => apiFetch<HeatmapResponse>(`/heatmap/${playerId}`),
    });
}
