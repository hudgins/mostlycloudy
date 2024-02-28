import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';
import {
  WeatherData,
  WeatherDataEntity,
} from '../core/weather-data/weather-data.interface';
import { CurrentConditionsRequestDto } from './current-conditions-request.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getRoot(): Promise<string> {
    return 'Mostlycloudy weather service';
  }

  @Get('v1/current')
  @ApiOperation({ summary: 'Get Current Weather Conditions' })
  @ApiResponse({
    status: 200,
    description: 'Current Weather Conditions',
    type: WeatherDataEntity,
  })
  @CacheTTL(5 * 60 * 1000) // 5 mins
  @UseInterceptors(CacheInterceptor)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  async getWeather(
    @Query() query: CurrentConditionsRequestDto,
  ): Promise<WeatherData> {
    if (query.city)
      return this.appService.getWeatherForCity(
        query.city,
        query.units,
        query.source,
      );
    if (query.zip)
      return this.appService.getWeatherForZipCode(
        query.zip,
        query.units,
        query.source,
      );
    if (query.lat && query.long)
      return this.appService.getWeatherForLatLong(
        query.lat,
        query.long,
        query.units,
        query.source,
      );
    throw new BadRequestException(
      'invalid request: please provide city, zip, or lat/long pair',
    );
  }
}
