import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { GamesModule } from './games/games.module';
import { ConfigModule } from '@nestjs/config';
import { HeatmapModule } from './heatmap/heatmap.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    GamesModule,
    HeatmapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
