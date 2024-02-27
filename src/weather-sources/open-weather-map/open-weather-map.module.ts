import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherMapService } from './open-weather-map.service';
import { MetricsModule } from '../../metrics/metrics.module';

@Module({
  imports: [ConfigModule, MetricsModule],
  providers: [OpenWeatherMapService],
  exports: [OpenWeatherMapService],
})
export class OpenWeatherMapModule {}
