import { Injectable } from '@nestjs/common';

/**
 * Very basic skeleton of a service that stores metrics of application events.
 * eg. we can record every time a third-party API is called so we have
 * visibility into it internally rather than relying on the third party.
 *
 * TODO:
 * - persistent storage
 * - time-series data (number of API calls in 24 hours, not just since application start)
 */
@Injectable()
export class MetricsService {
  private readonly metrics: Map<string, number> = new Map<string, number>();

  incrementMetric(metricKey: string, metricValue: number = 1) {
    const existingMetricValue = this.metrics.get(metricKey) || 0;
    this.metrics.set(metricKey, existingMetricValue + metricValue);
  }

  getMetric(metricKey: string): number {
    return this.metrics.get(metricKey) || 0;
  }
}
