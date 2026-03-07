import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as path from 'path';

@Injectable()
export class DatabaseService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    constructor() {
        const dbPath = path.join(process.cwd(), 'prisma/dev.db');
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
