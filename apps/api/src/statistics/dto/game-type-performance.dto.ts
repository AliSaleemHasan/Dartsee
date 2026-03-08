import { ApiProperty } from '@nestjs/swagger';
import { GameTypePerformanceStat } from '@repo/types';

export class GameTypePerformanceStatDto implements GameTypePerformanceStat {
    @ApiProperty({ description: 'The format of the game played (e.g. 501, 301, Cricket).', example: '501' })
    gameType!: string;

    @ApiProperty({ description: 'The average points scored per dart thrown in this format.', example: 30.5 })
    avgScorePerThrow!: number;

    @ApiProperty({ description: 'Percentage of throws that entirely missed the board in this format.', example: 2.1 })
    missRate!: number;

    @ApiProperty({ description: 'Percentage of throws that hit a Triple ring in this format.', example: 15.4 })
    tripleRate!: number;
}
