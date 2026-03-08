import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQuery } from '@repo/types';

export class PaginationQueryDto implements PaginationQuery {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1;

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
