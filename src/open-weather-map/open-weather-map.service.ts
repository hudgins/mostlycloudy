import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import axios from 'axios'

const OPEN_WEATHER_MAP_API = 'https://api.openweathermap.org/data/2.5'

type OpenWeatherData = any
type TemperatureUnits = 'standard' | 'metric' | 'imperial'

@Injectable()
export class OpenWeatherMapService {
  private readonly apiKey: string
  private readonly logger = new Logger(OpenWeatherMapService.name)

  constructor(private configService: ConfigService) {
    this.apiKey = configService.get<string>('API_KEY') || 'none'
  }

  async fetchWeatherForCity(city: string, units: TemperatureUnits = 'metric'): Promise<OpenWeatherData> {
    return this.fetchWeather({ q: city, units })
  }

  async fetchWeatherForZipCode(zipCode: string, units: TemperatureUnits = 'metric'): Promise<OpenWeatherData> {
    return this.fetchWeather({ zip: zipCode, units })
  }

  async fetchWeatherForLatLong(latitude: string, longitude: string, units: TemperatureUnits = 'metric'): Promise<OpenWeatherData> {
    return this.fetchWeather({ lat: latitude, lon: longitude, units })
  }

  private async fetchWeather(params: any): Promise<OpenWeatherData> {
    try {
      const weatherData = await this.makeRequest(params)
      if (!weatherData?.weather) throw new Error('unexpected response from weather source')
      return weatherData
    } catch (err) {
      this.logger.error(`failed to fetch weather data: ${err.message}`)
      throw new Error(`failed to fetch weather from source`)
    }
  }

  private async makeRequest(params: any) {
    const searchParams = new URLSearchParams({ appid: this.apiKey, ...params })
    const url = `${OPEN_WEATHER_MAP_API}/weather?${searchParams.toString()}`
    const response = await axios.get(url)
    return response.data
  }
}
