import { WeatherSource } from '../weather-data/weather-data.interface';

const ServiceHealthEnum = {
  Normal: 'normal',
  Degraded: 'degraded',
} as const;
export type ServiceHealth =
  (typeof ServiceHealthEnum)[keyof typeof ServiceHealthEnum];

export interface Service {
  getName(): WeatherSource;
  getHealth(): Promise<ServiceHealth>;
}
