export interface WeatherData {
  locationCoords: { lat: number, long: number }
  locationName: string
  weatherDescription: string
  temperatureCurrent: number
  temperatureLow: number
  temperatureHigh: number
  humidity: number
  windSpeed: number
  windDirection: number
  units: WeatherUnits
  source: WeatherSource
}

export type WeatherSource = 'openweathermap' | 'alwayssunny'
export type WeatherUnits = 'standard' | 'metric' | 'imperial'

export interface WeatherService {
  fetchWeatherForCity(city: string, units: WeatherUnits): Promise<WeatherData>
  fetchWeatherForZipCode(zipCode: string, units: WeatherUnits): Promise<WeatherData>
  fetchWeatherForLatLong(latitude: string, longitude: string, units: WeatherUnits): Promise<WeatherData>
}
