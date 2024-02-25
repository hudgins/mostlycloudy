import { Test, TestingModule } from '@nestjs/testing';
import { AlwaysSunnyService } from './always-sunny.service';
import { MetricsModule } from '../metrics/metrics.module';

describe('AlwaysSunnyService', () => {
  let service: AlwaysSunnyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MetricsModule],
      providers: [AlwaysSunnyService],
    }).compile();

    service = module.get<AlwaysSunnyService>(AlwaysSunnyService);
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
    expect(weather.locationName).toEqual('Nelson, Canada')
  })

  it('should fetch weather for Philadelphia by lat/long', async () => {
    const weather = await service.fetchWeatherForLatLong('49.48885', '-117.2855')
    validateWeatherData(weather)
    expect(weather.locationName).toEqual('Philadelphia')
  })

  it('should fetch weather for Philadelphia by zip code', async () => {
    const weather = await service.fetchWeatherForZipCode('90210')
    validateWeatherData(weather)
    expect(weather.locationName).toEqual('Philadelphia')
  })
});
