export enum ServiceHealth {
  Normal = 'normal',
  Degraded = 'degraded',
}

export interface Service {
  getName(): string;
  getHealth(): Promise<ServiceHealth>;
}
