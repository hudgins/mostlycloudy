import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenWeatherMapModule } from './open-weather-map/open-weather-map.module';

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
    OpenWeatherMapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
