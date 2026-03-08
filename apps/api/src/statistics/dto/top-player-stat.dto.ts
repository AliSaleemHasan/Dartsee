import { ApiProperty } from '@nestjs/swagger';
import { TopPlayerStat } from '@repo/types';

export class TopPlayerStatDto implements TopPlayerStat {
    @ApiProperty({ description: 'The unique identifier for the player.' })
    playerId!: string;

    @ApiProperty({ description: 'The full name of the player.' })
    playerName!: string;

    @ApiProperty({ description: 'Percentage of throws that hit a Triple ring.', example: 28.4 })
    tripleRate!: number;

    @ApiProperty({ description: 'Percentage of throws that hit a Double ring.', example: 18.9 })
    doubleRate!: number;

    @ApiProperty({ description: 'Percentage of throws that entirely missed the board.', example: 0.9 })
    missRate!: number;
}
