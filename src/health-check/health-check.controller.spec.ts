import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { WeatherSourcesRegistryModule } from '../weather-sources/weather-sources-registry.module';
import { ConfigModule } from '@nestjs/config';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), WeatherSourcesRegistryModule],
      controllers: [HealthCheckController],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "up" from basic health check route', () => {
    expect(controller.getBasicHealth()).toEqual('up')
  })

  it('should return status for each weather source', async () => {
    const statuses = await controller.getDetailedHealth()
    expect(statuses).toHaveProperty('status')
    expect(statuses).toHaveProperty('sources')
    expect(statuses.sources).toHaveProperty('alwayssunny')
    expect(statuses.sources).toHaveProperty('openweathermap')
    expect(statuses.sources.alwayssunny.status).toEqual('normal')
    expect(statuses.sources.openweathermap.status).toEqual('normal')
  })
});
