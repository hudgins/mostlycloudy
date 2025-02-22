import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPostalCode,
} from 'class-validator';
import {
  WeatherSource,
  WeatherSourceValues,
  WeatherUnits,
  WeatherUnitsValues,
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
  @IsEnum(WeatherUnitsValues)
  units?: WeatherUnits;

  @IsOptional()
  @IsEnum(WeatherSourceValues)
  source?: WeatherSource;
}
