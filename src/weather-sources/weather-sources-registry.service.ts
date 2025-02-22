import { Injectable } from '@nestjs/common';

import {
  WeatherSource,
  WeatherService,
} from '../core/weather-data/weather-data.interface';
import { OpenWeatherMapService } from './open-weather-map/open-weather-map.service';
import { AlwaysSunnyService } from './always-sunny/always-sunny.service';

@Injectable()
export class WeatherSourcesRegistryService {
  private readonly weatherServices: Map<WeatherSource, WeatherService> =
    new Map<WeatherSource, WeatherService>();

  constructor(
    openWeatherMapService: OpenWeatherMapService,
    alwaysSunnyService: AlwaysSunnyService,
  ) {
    this.weatherServices.set('openweathermap', openWeatherMapService);
    this.weatherServices.set('alwayssunny', alwaysSunnyService);
  }

  getWeatherServices(): readonly WeatherService[] {
    return Array.from(this.weatherServices.values());
  }

  getWeatherService(source: WeatherSource): WeatherService {
    if (!this.weatherServices.has(source))
      throw new Error('unrecognized weather source');
    return this.weatherServices.get(source);
  }
}
