import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import axios from 'axios'
import { MetricsService } from '../metrics/metrics.service';
import { WeatherData } from 'src/core/weather-data/weather-data.interface';

const OPEN_WEATHER_MAP_API = 'https://api.openweathermap.org/data/2.5'

type OpenWeatherData = any
type TemperatureUnits = 'standard' | 'metric' | 'imperial'
type OpenWeatherMapRequestParams = {
  q?: string
  zip?: string
  lat?: string
  lon?: string
  units: TemperatureUnits
}

@Injectable()
export class OpenWeatherMapService {
  private readonly apiKey: string
  private readonly logger = new Logger(OpenWeatherMapService.name)

  constructor(private configService: ConfigService, private readonly metricsService: MetricsService) {
    this.apiKey = configService.get<string>('API_KEY') || 'none'
  }

  async fetchWeatherForCity(city: string, units: TemperatureUnits = 'metric'): Promise<WeatherData> {
    return this.fetchWeather({ q: city, units })
  }

  async fetchWeatherForZipCode(zipCode: string, units: TemperatureUnits = 'metric'): Promise<WeatherData> {
    return this.fetchWeather({ zip: zipCode, units })
  }

  async fetchWeatherForLatLong(latitude: string, longitude: string, units: TemperatureUnits = 'metric'): Promise<WeatherData> {
    return this.fetchWeather({ lat: latitude, lon: longitude, units })
  }

  private async fetchWeather(params: OpenWeatherMapRequestParams): Promise<WeatherData> {
    try {
      const weatherData = await this.makeRequest(params)
      this.metricsService.incrementMetric('weather.openweathermap.api.requests')
      if (!weatherData?.weather) {
        throw new Error('unexpected response from weather source')
      }
      return this.standardizeWeatherData(weatherData)
    } catch (err) {
      this.metricsService.incrementMetric('weather.openweathermap.api.failures')
      this.logger.error(`failed to fetch weather data: ${err.message}`)
      throw new Error(`failed to fetch weather from source`)
    }
  }

  private async makeRequest(params: OpenWeatherMapRequestParams) {
    const searchParams = new URLSearchParams({ appid: this.apiKey, ...params })
    const url = `${OPEN_WEATHER_MAP_API}/weather?${searchParams.toString()}`
    const response = await axios.get(url)
    return response.data
  }

  private standardizeWeatherData(openWeatherData: OpenWeatherData): WeatherData {
    return {
      locationName: openWeatherData.name,
      locationCoords: { lat: openWeatherData.coord.lat, long: openWeatherData.coord.lon },
      weatherDescription: openWeatherData.weather[0].description,
      temperatureCurrent: openWeatherData.main.temp,
      temperatureLow: openWeatherData.main.temp_min,
      temperatureHigh: openWeatherData.main.temp_max,
      windSpeed: openWeatherData.wind.speed,
      windDirection: openWeatherData.wind.deg,
      humidity: openWeatherData.main.humidity
    }
  }
}

/**
 * OpenWeatherMap example
 {
   "coord":{
     "lon":-117.2855,
     "lat":49.4999
   },
   "weather":[{
     "id":804,
     "main":"Clouds",
     "description":"overcast clouds",
     "icon":"04d"
   }],
   "base":"stations",
   "main":{
     "temp":8.08,
     "feels_like":5.35,
     "temp_min":6.9,
     "temp_max":8.08,
     "pressure":1021,
     "humidity":53
   },
   "visibility":10000,
   "wind":{
     "speed":4.63,
     "deg":170
   },
   "clouds":{
     "all":100
   },
   "dt":1708737220,
   "sys":{
     "type":1,
     "id":398,
     "country":"CA",
     "sunrise":1708699480,
     "sunset":1708737646
   },
   "timezone":-28800,
   "id":6086871,
   "name":"Nelson",
   "cod":200
  }
  */

