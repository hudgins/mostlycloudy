import { Injectable } from '@nestjs/common';
import {
  WeatherData,
  WeatherSource,
  WeatherUnits,
} from '../core/weather-data/weather-data.interface';
import { WeatherSourcesRegistryService } from '../weather-sources/weather-sources-registry.service';

@Injectable()
export class AppService {
  constructor(
    private readonly weatherSourcesRegistryService: WeatherSourcesRegistryService,
  ) {}

  async getWeatherForCity(
    city: string,
    units: WeatherUnits = 'metric',
    source: WeatherSource = 'openweathermap',
  ): Promise<WeatherData> {
    return this.weatherSourcesRegistryService
      .getWeatherService(source)
      .fetchWeatherForCity(city, units);
  }

  async getWeatherForZipCode(
    zip: string,
    units: WeatherUnits = 'metric',
    source: WeatherSource = 'openweathermap',
  ): Promise<WeatherData> {
    return this.weatherSourcesRegistryService
      .getWeatherService(source)
      .fetchWeatherForZipCode(zip, units);
  }

  async getWeatherForLatLong(
    latitude: string,
    longitude: string,
    units: WeatherUnits = 'metric',
    source: WeatherSource = 'openweathermap',
  ): Promise<WeatherData> {
    return this.weatherSourcesRegistryService
      .getWeatherService(source)
      .fetchWeatherForLatLong(latitude, longitude, units);
  }
}
