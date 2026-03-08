import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

const mockStatisticsService = {
  getPopularityStatistics: jest.fn<any>(),
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

  it('should call getPopularityStatistics on the service', async () => {
    const stats = [{ gametype: 'cricket', count: 12 }];
    mockStatisticsService.getPopularityStatistics.mockResolvedValue(stats);

    const result = await controller.getPopularityStatistics();

    expect(result).toEqual(stats);
    expect(mockStatisticsService.getPopularityStatistics).toHaveBeenCalledTimes(1);
  });
});
