import { http, HttpResponse } from 'msw';
import { API_URL } from '../../app/lib/apiClient';

export const handlers = [
    http.get(`${API_URL}/games`, () => {
        return HttpResponse.json({
            data: [{ id: 1, type: '301', createdAt: new Date().toISOString() }],
            meta: { total: 1, page: 1, limit: 20, totalPages: 1 },
        });
    }),
    http.get(`${API_URL}/games/:id`, ({ params }) => {
        return HttpResponse.json({
            id: Number(params.id),
            type: '301',
            createdAt: new Date().toISOString(),
            players: [
                { id: 'p1', name: 'Alice', isWinner: true, stats: { tripleRate: 5 }, rounds: [] },
                { id: 'p2', name: 'Bob', isWinner: false, stats: { tripleRate: 2 }, rounds: [] },
            ]
        });
    }),
    http.get(`${API_URL}/statistics/popularity`, () => {
        return HttpResponse.json([
            { gametype: '301', count: 100 },
            { gametype: 'Cricket', count: 50 },
        ]);
    }),
    http.get(`${API_URL}/statistics/top-players`, () => {
        return HttpResponse.json([
            { playerName: 'Mvp', tripleRate: 15.5, doubleRate: 10, missRate: 1 }
        ]);
    }),
    http.get(`${API_URL}/statistics/game-type-performance`, () => {
        return HttpResponse.json([
            { gameType: '301', avgScorePerThrow: 20, missRate: 5, tripleRate: 2 }
        ]);
    }),
    http.get(`${API_URL}/heatmap/:playerId`, ({ params }) => {
        if (params.playerId === '99') {
            return new HttpResponse(JSON.stringify({ message: "Player not found" }), { status: 404 });
        }
        return HttpResponse.json({
            performance: { accuracy: 80, averageScore: 15, totalThrows: 100 },
            favoriteZones: ['T20', 'S20'],
            coordinates: [{ x: 400, y: 400, section: 'Bullseye', modifier: 1 }]
        });
    })
];
