import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

const mockStatisticsService = {
  getPopularityStatistics: jest.fn<any>(),
  getTopPlayers: jest.fn<any>(),
  getPerformanceByGameType: jest.fn<any>(),
};

describe('StatisticsController', () => {
  let controller: StatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        { provide: StatisticsService, useValue: mockStatisticsService },
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getTopPlayers on the service', async () => {
    const stats = [{ playerId: 'uid1', playerName: 'Alice', tripleRate: 20, doubleRate: 15, missRate: 1 }];
    mockStatisticsService.getTopPlayers.mockResolvedValue(stats);

    const result = await controller.getTopPlayers();

    expect(result).toEqual(stats);
    expect(mockStatisticsService.getTopPlayers).toHaveBeenCalledTimes(1);
  });

  it('should call getPerformanceByGameType on the service', async () => {
    const stats = [{ gameType: 'Cricket', avgScorePerThrow: 18, missRate: 2, tripleRate: 12 }];
    mockStatisticsService.getPerformanceByGameType.mockResolvedValue(stats);

    const result = await controller.getPerformanceByGameType();

    expect(result).toEqual(stats);
    expect(mockStatisticsService.getPerformanceByGameType).toHaveBeenCalledTimes(1);
  });
});

