import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherData } from '../core/weather-data/weather-data.interface';
import { CurrentConditionsRequestDto } from './current-conditions-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('v1/current')
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
