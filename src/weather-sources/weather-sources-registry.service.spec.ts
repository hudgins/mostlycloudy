import { Test, TestingModule } from '@nestjs/testing';
import { WeatherSourcesRegistryService } from './weather-sources-registry.service';
import { AlwaysSunnyModule } from './always-sunny/always-sunny.module';
import { OpenWeatherMapModule } from './open-weather-map/open-weather-map.module';
import { ConfigModule } from '@nestjs/config';

describe('WeatherSourcesRegistryService', () => {
  let registry: WeatherSourcesRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        AlwaysSunnyModule,
        OpenWeatherMapModule,
      ],
      providers: [WeatherSourcesRegistryService],
    }).compile();

    registry = module.get<WeatherSourcesRegistryService>(
      WeatherSourcesRegistryService,
    );
  });

  it('should be defined', () => {
    expect(registry).toBeDefined();
  });

  it('should return the list of services', () => {
    const services = registry.getWeatherServices();
    expect(services.length).toBeGreaterThan(1);
    services.forEach((service) => {
      expect(service.getName()).toBeDefined();
      expect(registry.getWeatherService(service.getName()).getName()).toEqual(
        service.getName(),
      );
    });
  });
});
