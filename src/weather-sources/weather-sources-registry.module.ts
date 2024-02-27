import { Module } from '@nestjs/common';
import { OpenWeatherMapModule } from './open-weather-map/open-weather-map.module';
import { AlwaysSunnyModule } from './always-sunny/always-sunny.module';
import { WeatherSourcesRegistryService } from './weather-sources-registry.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, OpenWeatherMapModule, AlwaysSunnyModule],
  providers: [WeatherSourcesRegistryService],
  exports: [WeatherSourcesRegistryService],
})
export class WeatherSourcesRegistryModule {}
