import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsModule } from '../metrics/metrics.module';
import { CoreModule } from '../core/core.module';
import { WeatherSourcesRegistryModule } from 'src/weather-sources/weather-sources-registry.module';
import { HealthCheckModule } from 'src/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    // LoggerModule.forRoot({
    //   pinoHttp: [
    //     {
    //       name: 'mostlycloudy',
    //       level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    //       transport: process.env.NODE_ENV !== 'production'
    //         ? { target: 'pino-pretty' }
    //         : undefined,
    //     },
    //   ],
    //   forRoutes: [AppController],
    //   exclude: [{ method: RequestMethod.ALL, path: 'check' }]
    // }),
    CacheModule.register(),
    MetricsModule,
    CoreModule,
    WeatherSourcesRegistryModule,
    HealthCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
