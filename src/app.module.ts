import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenWeatherMapModule } from './open-weather-map/open-weather-map.module';

@Module({
  imports: [OpenWeatherMapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
