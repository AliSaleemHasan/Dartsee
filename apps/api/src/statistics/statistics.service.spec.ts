import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { DatabaseService } from '../database/database.service';

const mockDatabaseService = {
  game: {
    groupBy: jest.fn<any>(),
  },
};

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return game popularity statistics directly from database groupings', async () => {
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
