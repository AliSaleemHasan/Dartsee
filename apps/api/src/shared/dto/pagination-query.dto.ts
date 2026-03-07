export class PaginationQueryDto {
    readonly page: number;
    readonly limit: number;

    constructor(page?: number, limit?: number) {
        this.page = Math.max(1, page ?? 1);
        this.limit = Math.min(100, Math.max(1, limit ?? 20));
    }

    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}
