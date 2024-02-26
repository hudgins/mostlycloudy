import { Injectable } from '@nestjs/common';
import { WeatherData, WeatherSource, WeatherService, WeatherUnits } from '../core/weather-data/weather-data.interface';
import { OpenWeatherMapService } from '../open-weather-map/open-weather-map.service';
import { AlwaysSunnyService } from '../always-sunny/always-sunny.service';

@Injectable()
export class AppService {
  private readonly weatherServices: Map<WeatherSource, WeatherService> = new Map<WeatherSource, WeatherService>();

  constructor(openWeatherMapService: OpenWeatherMapService, alwaysSunnyService: AlwaysSunnyService) {
    this.weatherServices.set(WeatherSource.OpenWeatherMap, openWeatherMapService)
    this.weatherServices.set(WeatherSource.AlwaysSunny, alwaysSunnyService)
  }

  async getWeatherForCity(city: string, units: WeatherUnits = WeatherUnits.Metric, source: WeatherSource = WeatherSource.OpenWeatherMap): Promise<WeatherData> {
    return this.getWeatherService(source).fetchWeatherForCity(city, units)
  }

  async getWeatherForZipCode(zip: string, units: WeatherUnits = WeatherUnits.Metric, source: WeatherSource = WeatherSource.OpenWeatherMap): Promise<WeatherData> {
    return this.getWeatherService(source).fetchWeatherForZipCode(zip, units)
  }

  async getWeatherForLatLong(latitude: string, longitude: string, units: WeatherUnits = WeatherUnits.Metric, source: WeatherSource = WeatherSource.OpenWeatherMap): Promise<WeatherData> {
    return this.getWeatherService(source).fetchWeatherForLatLong(latitude, longitude, units)
  }

  private getWeatherService(source: WeatherSource): WeatherService {
    if (!this.weatherServices.has(source)) throw new Error('unrecognized weather source')
    return this.weatherServices.get(source)
  }
}
