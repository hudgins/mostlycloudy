import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherMapService } from './open-weather-map.service';

describe('OpenWeatherMapService', () => {
  let service: OpenWeatherMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [OpenWeatherMapService],
    }).compile();

    service = module.get<OpenWeatherMapService>(OpenWeatherMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch weather for Nelson, Canada by city name', async () => {
    const weather = await service.fetchWeatherForCity('Nelson, Canada')
    expect(weather).toHaveProperty('weather')
    expect(weather.name).toEqual('Nelson')
  })

  it('should fetch weather for Nelson, Canada by lat/long', async () => {
    const weather = await service.fetchWeatherForLatLong('49.48885', '-117.2855')
    expect(weather).toHaveProperty('weather')
    expect(weather.name).toEqual('Nelson')
  })

  it('should fetch weather for Beverly Hills by zip code', async () => {
    const weather = await service.fetchWeatherForZipCode('90210')
    expect(weather).toHaveProperty('weather')
    expect(weather.name).toEqual('Beverly Hills')
  })
});
