import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

const mockPaginatedResponse = {
    data: [{ id: 1, type: 'x01' }],
    meta: { total: 1, page: 1, limit: 20, totalPages: 1 },
};

const mockGamesService = {
    findAll: jest.fn<any>().mockResolvedValue(mockPaginatedResponse),
    findOne: jest.fn<any>(),
    getPopularityStatistics: jest.fn<any>(),
};

describe('GamesController', () => {
    let controller: GamesController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GamesController],
            providers: [{ provide: GamesService, useValue: mockGamesService }],
        }).compile();

        controller = module.get<GamesController>(GamesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return paginated games', async () => {
        const result = await controller.findAll(1, 20);

        expect(result).toEqual(mockPaginatedResponse);
        expect(mockGamesService.findAll).toHaveBeenCalled();
    });

    it('should return a single game', async () => {
        const mockGameDetail = {
            id: 1,
            type: 'x01',
            players: [
                { id: 'p1', name: 'Alice', averageScorePerRound: [60], misses: 0 }
            ]
        };
        mockGamesService.findOne.mockResolvedValue(mockGameDetail);

        const result = await controller.findOne(1);

        expect(result).toEqual(mockGameDetail);
        expect(mockGamesService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return popularity statistics', async () => {
        const stats = [{ gametype: 'x01', count: 10 }];
        mockGamesService.getPopularityStatistics.mockResolvedValue(stats);

        const result = await controller.getPopularityStatistics();

        expect(result).toEqual(stats);
        expect(mockGamesService.getPopularityStatistics).toHaveBeenCalled();
    });
});
