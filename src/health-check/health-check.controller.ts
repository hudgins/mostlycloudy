import { Controller, Get } from '@nestjs/common';
import { WeatherSourcesRegistryService } from '../weather-sources/weather-sources-registry.service';
import { ServiceHealth } from '../core/service/service.interface';

type SourceHealth = {
  [source: string]: { status: ServiceHealth };
};

type DetailedHealthResponse = {
  status: ServiceHealth;
  sources: SourceHealth;
};

@Controller('v1/health-check')
export class HealthCheckController {
  constructor(
    private readonly weatherSourcesRegistryService: WeatherSourcesRegistryService,
  ) {}

  @Get()
  getBasicHealth() {
    return 'up';
  }

  @Get('detailed')
  async getDetailedHealth(): Promise<DetailedHealthResponse> {
    const services = this.weatherSourcesRegistryService.getWeatherServices();
    let health = { status: ServiceHealth.Normal, sources: {} };
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      const status = await service.getHealth();
      health.sources[service.getName()] = { status };
      if (status !== ServiceHealth.Normal.toString())
        health.status = status as ServiceHealth;
    }
    return health;
  }
}
