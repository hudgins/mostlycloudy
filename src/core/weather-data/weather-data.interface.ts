import { Service } from '../service/service.interface';
import { ApiProperty } from '@nestjs/swagger';

export type WeatherData = {
  locationCoords: { lat: number; long: number };
  locationName: string;
  weatherDescription: string;
  temperatureCurrent: number;
  temperatureLow: number;
  temperatureHigh: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  units: WeatherUnits;
  source: WeatherSource;
};

export class WeatherDataEntity implements WeatherData {
  @ApiProperty({
    example: { lat: 49.4999, long: -117.2855 },
    description: 'location latitude and longitude',
  })
  locationCoords: { lat: number; long: number };

  @ApiProperty({
    example: 'Nelson',
    description: 'location name',
  })
  locationName: string;

  @ApiProperty({
    example: 'Mostly cloudy',
    description: 'text summary of weather conditions',
  })
  weatherDescription: string;

  @ApiProperty({
    example: '20',
    description: 'current temperature in requested units (C/F/K)',
  })
  temperatureCurrent: number;

  @ApiProperty({
    example: '-40',
    description: 'expected minimum temperature for the day',
  })
  temperatureLow: number;

  @ApiProperty({
    example: '35',
    description: 'expected maximum temperature for the day',
  })
  temperatureHigh: number;

  @ApiProperty({
    example: '40',
    description: 'percent humidity',
  })
  humidity: number;

  @ApiProperty({
    example: '1.54',
    description: 'wind speed in specified units',
  })
  windSpeed: number;

  @ApiProperty({
    example: '190',
    description: 'wind direction in degrees',
  })
  windDirection: number;

  @ApiProperty({
    example: 'metric',
    description: 'units requested in API call (standard, metric, imperial)',
  })
  units: WeatherUnits;

  @ApiProperty({
    example: 'openweathermap',
    description: 'weather source (eg. alwayssunny, openweathermap)',
  })
  source: WeatherSource;
}

const WeatherSourceEnum = {
  OpenWeatherMap: 'openweathermap',
  AlwaysSunny: 'alwayssunny',
} as const;
export type WeatherSource =
  (typeof WeatherSourceEnum)[keyof typeof WeatherSourceEnum];
export const WeatherSourceValues = Object.values(WeatherSourceEnum);

const WeatherUnitsEnum = {
  Standard: 'standard',
  Metric: 'metric',
  Imperial: 'imperial',
} as const;
export type WeatherUnits =
  (typeof WeatherUnitsEnum)[keyof typeof WeatherUnitsEnum];
export const WeatherUnitsValues = Object.values(WeatherUnitsEnum);

export interface WeatherService extends Service {
  fetchWeatherForCity(city: string, units: WeatherUnits): Promise<WeatherData>;
  fetchWeatherForZipCode(
    zipCode: string,
    units: WeatherUnits,
  ): Promise<WeatherData>;
  fetchWeatherForLatLong(
    latitude: string,
    longitude: string,
    units: WeatherUnits,
  ): Promise<WeatherData>;
}
