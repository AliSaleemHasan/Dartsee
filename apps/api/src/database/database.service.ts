import { Injectable, OnModuleInit, OnModuleDestroy, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@repo/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as path from 'path';

@Injectable()
export class DatabaseService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    constructor() {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl) {
            throw new InternalServerErrorException("Please provide Database_URL in .env")
        }
        const dbPath = dbUrl.replace('file:', '');
        const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
        super({ adapter });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}
