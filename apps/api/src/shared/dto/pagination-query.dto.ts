import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQuery } from '@repo/types';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto implements PaginationQuery {
    @ApiPropertyOptional({ description: 'The page number to retrieve.', minimum: 1, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1;

    @ApiPropertyOptional({ description: 'Filter by game type.' })
    @IsOptional()
    readonly type?: string;

    @ApiPropertyOptional({ description: 'The number of games per page.', minimum: 1, maximum: 100, default: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    readonly limit: number = 20;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}
