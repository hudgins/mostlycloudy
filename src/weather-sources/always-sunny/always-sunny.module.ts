import { Module } from '@nestjs/common';
import { AlwaysSunnyService } from './always-sunny.service';
import { MetricsModule } from '../../metrics/metrics.module';

@Module({
  imports: [MetricsModule],
  providers: [AlwaysSunnyService],
  exports: [AlwaysSunnyService]
})
export class AlwaysSunnyModule {}
