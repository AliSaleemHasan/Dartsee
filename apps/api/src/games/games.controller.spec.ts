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
});
