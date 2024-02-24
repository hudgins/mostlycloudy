import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherMapService } from './open-weather-map.service';
import { MetricsModule } from '../metrics/metrics.module';

describe('OpenWeatherMapService', () => {
  let service: OpenWeatherMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MetricsModule],
      providers: [OpenWeatherMapService],
    }).compile();

    service = module.get<OpenWeatherMapService>(OpenWeatherMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  function validateWeatherData(data: any) {
    expect(data).toHaveProperty('locationCoords')
    expect(data).toHaveProperty('locationName')
    expect(data).toHaveProperty('weatherDescription')
    expect(data).toHaveProperty('temperatureCurrent')
    expect(data).toHaveProperty('temperatureLow')
    expect(data).toHaveProperty('temperatureHigh')
    expect(data).toHaveProperty('humidity')
    expect(data).toHaveProperty('windSpeed')
    expect(data).toHaveProperty('windDirection')
  }

  it('should fetch weather for Nelson, Canada by city name', async () => {
    const weather = await service.fetchWeatherForCity('Nelson, Canada')
    validateWeatherData(weather)
    expect(weather.locationName).toEqual('Nelson')
  })

  it('should fetch weather for Nelson, Canada by lat/long', async () => {
    const weather = await service.fetchWeatherForLatLong('49.48885', '-117.2855')
    validateWeatherData(weather)
    expect(weather.locationName).toEqual('Nelson')
  })

  it('should fetch weather for Beverly Hills by zip code', async () => {
    const weather = await service.fetchWeatherForZipCode('90210')
    validateWeatherData(weather)
    expect(weather.locationName).toEqual('Beverly Hills')
  })
});
