import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherSource } from '../core/weather-data/weather-data.interface';
import { WeatherSourcesRegistryModule } from '../weather-sources/weather-sources-registry.module';
// import { ConsoleLogger } from '@nestjs/common';

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
    // }).setLogger(new ConsoleLogger()).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('weather', () => {
    it('should request weather for Nelson, Canada by city name', async () => {
      const weather = await appController.getWeather({
        city: 'Nelson, Canada',
      });
      expect(weather.locationName).toEqual('Nelson');
    });

    it('should request weather for Nelson, Canada by lat long', async () => {
      const weather = await appController.getWeather({
        lat: '49.48885',
        long: '-117.2855',
      });
      expect(weather.locationName).toEqual('Nelson');
    });

    it('should request weather for Beverly Hills by zip code', async () => {
      const weather = await appController.getWeather({ zip: '90210' });
      expect(weather.locationName).toEqual('Beverly Hills');
    });

    it('should request weather for Nelson, Canada by city name from openweathermap', async () => {
      const weather = await appController.getWeather({
        city: 'Nelson, Canada',
        source: WeatherSource.OpenWeatherMap,
      });
      expect(weather.locationName).toEqual('Nelson');
      expect(weather.source).toEqual('openweathermap');
    });

    it('should request weather for Nelson, Canada by city name from alwayssunny', async () => {
      const weather = await appController.getWeather({
        city: 'Nelson, Canada',
        source: WeatherSource.AlwaysSunny,
      });
      expect(weather.locationName).toEqual('Nelson, Canada');
      expect(weather.source).toEqual('alwayssunny');
    });
  });
});
