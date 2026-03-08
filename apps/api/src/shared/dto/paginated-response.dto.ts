import { PaginatedResponse } from '@repo/types';

export class PaginatedMetaDto {
    total!: number;
    page!: number;
    limit!: number;
    totalPages!: number;
}

export class PaginatedResponseDto<T> implements PaginatedResponse<T> {
    data!: T[];
    meta!: PaginatedMetaDto;
}
