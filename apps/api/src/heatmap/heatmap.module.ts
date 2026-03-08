import { Module } from '@nestjs/common';
import { HeatmapController } from './heatmap.controller';
import { HeatmapService } from './heatmap.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [HeatmapController],
    providers: [HeatmapService]
})
export class HeatmapModule { }
