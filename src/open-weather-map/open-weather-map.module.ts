import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherMapService } from './open-weather-map.service';

@Module({
  imports: [ConfigModule],
  providers: [OpenWeatherMapService]
})
export class OpenWeatherMapModule {}
