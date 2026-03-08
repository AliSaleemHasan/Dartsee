import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { GamesModule } from './games/games.module';
import { ConfigModule } from '@nestjs/config';
import { HeatmapModule } from './heatmap/heatmap.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GamesModule,
    HeatmapModule,
    StatisticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
