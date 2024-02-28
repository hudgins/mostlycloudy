import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsService],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should report a metric and retrieve it', () => {
    service.incrementMetric('test.metric');
    service.incrementMetric('test.metric');
    expect(service.getMetric('test.metric')).toEqual(2);
  });

  it('should report a metric by providing an increment amount and retrieve it', () => {
    service.incrementMetric('test.metric', 5);
    service.incrementMetric('test.metric', 10);
    expect(service.getMetric('test.metric')).toEqual(15);
  });
});
