import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { DatabaseService } from '../database/database.service';

const mockDatabaseService = {
    game: {
        findMany: jest.fn<any>(),
        count: jest.fn<any>(),
        findUnique: jest.fn<any>(),
        groupBy: jest.fn<any>(),
    },
};

describe('GamesService', () => {
    let service: GamesService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GamesService,
                { provide: DatabaseService, useValue: mockDatabaseService },
            ],
        }).compile();

        service = module.get<GamesService>(GamesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return paginated games', async () => {
        const mockGames = [
            { id: 1, type: 'x01' },
            { id: 2, type: 'cricket' },
        ];
        (mockDatabaseService.game.findMany as any).mockResolvedValue(mockGames);
        (mockDatabaseService.game.count as any).mockResolvedValue(100);

        const result = await service.findAll({ page: 1, limit: 2, skip: 0 });

        expect(result.data).toEqual(mockGames);
        expect(result.meta.total).toBe(100);
        expect(result.meta.page).toBe(1);
        expect(result.meta.limit).toBe(2);
        expect(result.meta.totalPages).toBe(50);
    });

    it('should return a game with player statistics', async () => {
        const mockGame = {
            id: 1,
            type: 'x01',
            game_players: [
                { player_id: 'p1', player: { id: 'p1', name: 'Alice' } },
                { player_id: 'p2', player: { id: 'p2', name: 'Bob' } }
            ],
            throws: [
                { player_id: 'p1', score: 20, modifier: 1 },
                { player_id: 'p1', score: 20, modifier: 1 },
                { player_id: 'p1', score: 20, modifier: 1 },
                { player_id: 'p2', score: 0, modifier: 0 },
                { player_id: 'p2', score: 10, modifier: 1 },
                { player_id: 'p2', score: 10, modifier: 1 },
            ]
        };

        (mockDatabaseService.game.findUnique as any).mockResolvedValue(mockGame);

        const result = await service.findOne(1);

        expect(result).toBeDefined();
        // @ts-ignore
        expect(result.id).toBe(1);
        // @ts-ignore
        expect(result.players).toHaveLength(2);

        // @ts-ignore
        const alice = result.players.find(p => p.id === 'p1')!;
        expect(alice.isWinner).toBe(true);
        expect(alice.stats.averageScorePerRound).toEqual(60);
        expect(alice.stats.totalScore).toEqual(60);
        expect(alice.stats.bestRoundScore).toEqual(60);
        expect(alice.stats.misses).toBe(0);
        expect(alice.rounds).toHaveLength(1);
        expect(alice.rounds[0]?.throws).toEqual(['20', '20', '20']);

        // @ts-ignore
        const bob = result.players.find(p => p.id === 'p2')!;
        expect(bob.isWinner).toBe(false);
        expect(bob.stats.averageScorePerRound).toEqual(20);
        expect(bob.stats.totalScore).toEqual(20);
        expect(bob.stats.bestRoundScore).toEqual(20);
        expect(bob.stats.misses).toBe(1);
        expect(bob.rounds).toHaveLength(1);
        expect(bob.rounds[0]?.score).toEqual(20);
    });

    it('should throw Exception if game does not exist', async () => {
        (mockDatabaseService.game.findUnique as any).mockResolvedValue(null);
        await expect(service.findOne(999)).rejects.toThrow();
    });

    it('should return game popularity statistics', async () => {
        const mockStats = [
            { type: 'x01', _count: { id: 10 } },
            { type: 'cricket', _count: { id: 5 } },
        ];
        (mockDatabaseService.game.groupBy as any).mockResolvedValue(mockStats);

        const result = await service.getPopularityStatistics();

        expect(result).toHaveLength(2);
        expect(result).toEqual([
            { gametype: 'x01', count: 10 },
            { gametype: 'cricket', count: 5 },
        ]);
    });
});
