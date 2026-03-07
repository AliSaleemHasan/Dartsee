import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { DatabaseService } from '../database/database.service';

const mockDatabaseService = {
    game: {
        findMany: jest.fn<any>(),
        count: jest.fn<any>(),
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
});
