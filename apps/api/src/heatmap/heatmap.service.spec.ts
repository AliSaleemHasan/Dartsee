import { Test, TestingModule } from '@nestjs/testing';
import { HeatmapService } from './heatmap.service';
import { DatabaseService } from '../database/database.service';
import { jest } from '@jest/globals';

const mockDatabaseService = {
    throw: {
        findMany: jest.fn<any>(),
    },
};

describe('HeatmapService', () => {
    let service: HeatmapService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HeatmapService,
                { provide: DatabaseService, useValue: mockDatabaseService },
            ],
        }).compile();

        service = module.get<HeatmapService>(HeatmapService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should calculate accuracy, average score, and return top favorite zones correctly', async () => {
        const mockThrows = [
            // Hits (Score > 0, Modifier > 0)
            { x: 100, y: 100, modifier: 1, score: 20 },
            { x: 110, y: 110, modifier: 3, score: 20 }, // 60
            { x: 120, y: 120, modifier: 2, score: 10 }, // 20
            { x: 130, y: 130, modifier: 1, score: 10 }, // 10
            { x: 140, y: 140, modifier: 1, score: 20 }, // 20
            // Misses
            { x: 0, y: 0, modifier: 0, score: 0 },
        ];

        (mockDatabaseService.throw.findMany as any).mockResolvedValue(mockThrows);

        const result = await service.getHeatmapData('player-uuid-123');

        // Total Score = 20 + 60 + 20 + 10 + 20 = 130
        // Valid Hits = 5
        // Average Score = 130 / 5 = 26.0
        // Total Throws = 6
        // Accuracy = 5 / 6 * 100 = 83.3%

        expect(result.performance.totalThrows).toBe(6);
        expect(result.performance.accuracy).toBe(83.3);
        expect(result.performance.averageScore).toBe(26.0);

        // Favorite zones
        // 20 was hit 3 times
        // 10 was hit 2 times
        expect(result.favoriteZones).toHaveLength(2);
        expect(result.favoriteZones[0]?.score).toBe(20);
        expect(result.favoriteZones[0]?.hits).toBe(3);
        expect(result.favoriteZones[0]?.percentage).toBe(60); // 3 of 5 valid hits

        expect(result.favoriteZones[1]?.score).toBe(10);
        expect(result.favoriteZones[1]?.hits).toBe(2);
        expect(result.favoriteZones[1]?.percentage).toBe(40); // 2 of 5 valid hits

        // Coordinates mapping
        expect(result.coordinates).toHaveLength(6);
        expect(result.coordinates[0]).toEqual({ x: 100, y: 100, modifier: 1 });
    });

    it('should throw an Exception if player has zero throws', async () => {
        (mockDatabaseService.throw.findMany as any).mockResolvedValue([]);
        await expect(service.getHeatmapData('not-real-player')).rejects.toThrow();
    });
});
