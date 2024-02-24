import { Module } from '@nestjs/common';
import { OpenWeatherMapService } from './open-weather-map.service';

@Module({
  providers: [OpenWeatherMapService]
})
export class OpenWeatherMapModule {}
