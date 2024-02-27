import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { MetricsService } from '../../metrics/metrics.service';
import {
  WeatherData,
  WeatherService,
  WeatherSource,
  WeatherUnits,
} from '../../core/weather-data/weather-data.interface';
import { ServiceHealth } from '../../core/service/service.interface';

@Injectable()
export class AlwaysSunnyService implements WeatherService {
  private readonly logger = new Logger(AlwaysSunnyService.name);

  constructor(private readonly metricsService: MetricsService) {}

  getName(): WeatherSource.AlwaysSunny {
    return WeatherSource.AlwaysSunny;
  }

  getHealth(): Promise<ServiceHealth> {
    return Promise.resolve(ServiceHealth.Normal);
  }

  async fetchWeatherForCity(
    city: string,
    units: WeatherUnits = WeatherUnits.Metric,
  ): Promise<WeatherData> {
    return this.fetchWeather({ city, units });
  }

  async fetchWeatherForZipCode(
    zipCode: string,
    units: WeatherUnits = WeatherUnits.Metric,
  ): Promise<WeatherData> {
    return this.fetchWeather({ zipCode, units });
  }

  async fetchWeatherForLatLong(
    latitude: string,
    longitude: string,
    units: WeatherUnits = WeatherUnits.Metric,
  ): Promise<WeatherData> {
    return this.fetchWeather({ latitude, longitude, units });
  }

  private async fetchWeather(params: any): Promise<WeatherData> {
    this.logger.log({ msg: 'weather source request', payload: params });
    return {
      locationName: params.city || 'Philadelphia',
      locationCoords: {
        lat: params.latitude || 49.4999,
        long: params.longitude || -117.2855,
      },
      weatherDescription: 'Sunny!',
      temperatureCurrent: this.convertTemp(27, params.units),
      temperatureLow: this.convertTemp(11, params.units),
      temperatureHigh: this.convertTemp(32, params.units),
      windSpeed: this.convertSpeed(5, params.units),
      windDirection: 180,
      humidity: 40,
      units: params.units,
      source: WeatherSource.AlwaysSunny,
    };
  }

  private convertTemp(
    temp: number,
    units: WeatherUnits = WeatherUnits.Metric,
  ): number {
    if (units == 'imperial') return (9 / 5) * temp + 32;
    if (units == 'standard') return temp + 273.15;
    return temp;
  }

  private convertSpeed(
    speed: number,
    units: WeatherUnits = WeatherUnits.Metric,
  ): number {
    if (units == 'imperial') return speed * 0.621371;
    return speed;
  }
}
