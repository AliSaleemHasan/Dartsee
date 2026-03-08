import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { DatabaseService } from '../database/database.service';

const mockDatabaseService = {
  game: {
    groupBy: jest.fn<any>(),
  },
  $queryRaw: jest.fn<any>(),
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

  it('should return top 5 players based on triple rate', async () => {
    const rawSqlMocks = [
      {
        playerId: 'uid-1',
        playerName: 'Michael van Gerwen',
        tripleRate: 28.4,
        doubleRate: 18.9,
        missRate: 0.9,
      },
    ];
    mockDatabaseService.$queryRaw.mockResolvedValue(rawSqlMocks);

    const result = await service.getTopPlayers();

    expect(result).toHaveLength(1);
    expect(result[0].playerName).toBe('Michael van Gerwen');
    expect(result[0].tripleRate).toBe(28.4);
    expect(mockDatabaseService.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('should return game type performance averages', async () => {
    const rawSqlMocks = [
      { gameType: '501', avgScorePerThrow: 30.5, missRate: 1.2, tripleRate: 15.4 },
    ];
    mockDatabaseService.$queryRaw.mockResolvedValue(rawSqlMocks);

    const result = await service.getPerformanceByGameType();

    expect(result).toHaveLength(1);
    expect(result[0].gameType).toBe('501');
    expect(result[0].avgScorePerThrow).toBe(30.5);
    expect(mockDatabaseService.$queryRaw).toHaveBeenCalledTimes(2); // Accounts for both previous test and this test since it's the exact same mock function
  });
});
