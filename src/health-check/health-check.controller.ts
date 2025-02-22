import { Controller, Get } from '@nestjs/common';
import { WeatherSourcesRegistryService } from '../weather-sources/weather-sources-registry.service';
import { ServiceHealth } from '../core/service/service.interface';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

type SourceHealth = {
  [source: string]: { status: ServiceHealth };
};

class DetailedHealthResponse {
  @ApiProperty({
    example: 'degraded',
    description: 'service status (normal, degraded)',
  })
  status: ServiceHealth;

  @ApiProperty({
    example: {
      alwayssunny: { status: 'normal' },
      openweathermap: { status: 'degraded' },
    },
    description: 'status for each weather source',
  })
  sources: SourceHealth;
}

@Controller('v1/health-check')
export class HealthCheckController {
  constructor(
    private readonly weatherSourcesRegistryService: WeatherSourcesRegistryService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Basic health status',
    type: 'up',
  })
  getBasicHealth() {
    return 'up';
  }

  @Get('detailed')
  @ApiResponse({
    status: 200,
    description: 'Detailed health status',
    type: DetailedHealthResponse,
  })
  async getDetailedHealth(): Promise<DetailedHealthResponse> {
    const services = this.weatherSourcesRegistryService.getWeatherServices();
    const health: DetailedHealthResponse = { status: 'normal', sources: {} };
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      const status = await service.getHealth();
      health.sources[service.getName()] = { status };
      if (status !== 'normal') {
        health.status = status;
      }
    }
    return health;
  }
}
