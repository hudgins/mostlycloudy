import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherMapService } from './open-weather-map.service';

describe('OpenWeatherMapService', () => {
  let service: OpenWeatherMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenWeatherMapService],
    }).compile();

    service = module.get<OpenWeatherMapService>(OpenWeatherMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch weather for Nelson, BC', async () => {
    const weather = await service.fetchWeatherForCity('Nelson, Canada')
    expect(weather).toHaveProperty('weather')
    expect(weather.name).toEqual('Nelson')
  })
});
