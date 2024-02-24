import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios'

const OPEN_WEATHER_MAP_API = 'https://api.openweathermap.org/data/2.5'

type OpenWeatherData = any
type OwmUnits = 'standard' | 'metric' | 'imperial'

@Injectable()
export class OpenWeatherMapService {
  private apiKey: string

  constructor(private configService: ConfigService) {
    this.apiKey = configService.get<string>('API_KEY') || 'none'
  }

  async fetchWeatherForCity(city: string, units: OwmUnits = 'metric'): Promise<OpenWeatherData> {
    const searchParams = {
      q: city,
      units: 'metric'
    }
    try {
      const weatherData = await this.makeRequest(searchParams)
      if (!weatherData?.weather) throw new Error('unexpected response from weather source')
      return weatherData
    } catch (err) {
      throw new Error(`failed to fetch weather from source`)
    }
  }

  private async makeRequest(params: any) {
    const searchParams = new URLSearchParams({ APPID: this.apiKey, ...params })
    const url = `${OPEN_WEATHER_MAP_API}/weather?${searchParams.toString()}`
    const response = await axios.get(url)
    return response.data
  }

}
