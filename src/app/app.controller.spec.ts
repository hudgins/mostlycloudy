import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherSourcesRegistryModule } from '../weather-sources/weather-sources-registry.module';
import { mockWeatherHttpRequest } from '../../test/utils/openweathermap';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ThrottlerModule.forRoot(),
        CacheModule.register(),
        WeatherSourcesRegistryModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('weather', () => {
    it('should request weather for Nelson, Canada by city name', async () => {
      mockWeatherHttpRequest();

      const weather = await appController.getWeather({
        city: 'Nelson, Canada',
      });
      expect(weather.locationName).toEqual('Nelson');
    });

    it('should request weather for Nelson, Canada by lat long', async () => {
      mockWeatherHttpRequest();

      const weather = await appController.getWeather({
        lat: '49.48885',
        long: '-117.2855',
      });
      expect(weather.locationName).toEqual('Nelson');
    });

    it('should request weather for Beverly Hills by zip code', async () => {
      mockWeatherHttpRequest({ name: 'Beverly Hills' });

      const weather = await appController.getWeather({ zip: '90210' });
      expect(weather.locationName).toEqual('Beverly Hills');
    });

    it('should request weather for Nelson, Canada by city name from openweathermap', async () => {
      mockWeatherHttpRequest();

      const weather = await appController.getWeather({
        city: 'Nelson, Canada',
        source: 'openweathermap',
      });
      expect(weather.locationName).toEqual('Nelson');
      expect(weather.source).toEqual('openweathermap');
    });

    it('should request weather for Nelson, Canada by city name from alwayssunny', async () => {
      mockWeatherHttpRequest();

      const weather = await appController.getWeather({
        city: 'Nelson, Canada',
        source: 'alwayssunny',
      });
      expect(weather.locationName).toEqual('Nelson, Canada');
      expect(weather.source).toEqual('alwayssunny');
    });
  });
});
