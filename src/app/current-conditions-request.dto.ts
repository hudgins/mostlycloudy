import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPostalCode,
} from 'class-validator';
import {
  WeatherSource,
  WeatherUnits,
} from '../core/weather-data/weather-data.interface';

export class CurrentConditionsRequestDto {
  @IsOptional()
  city?: string;

  @IsOptional()
  @IsPostalCode('US')
  zip?: string;

  @IsOptional()
  @IsNumberString()
  lat?: string;

  @IsNumberString()
  @IsOptional()
  long?: string;

  @IsOptional()
  @IsEnum(WeatherUnits)
  units?: WeatherUnits;

  @IsOptional()
  @IsEnum(WeatherSource)
  source?: WeatherSource;
}
