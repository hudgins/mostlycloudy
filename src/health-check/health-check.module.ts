import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { WeatherSourcesRegistryModule } from 'src/weather-sources/weather-sources-registry.module';

@Module({
  imports: [WeatherSourcesRegistryModule],
  controllers: [HealthCheckController]
})
export class HealthCheckModule {}
