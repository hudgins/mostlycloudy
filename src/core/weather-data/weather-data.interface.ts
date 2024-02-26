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

export enum WeatherSource {
  OpenWeatherMap = 'openweathermap',
  AlwaysSunny = 'alwayssunny'
}
export enum WeatherUnits {
  Standard = 'standard',
  Metric = 'metric',
  Imperial = 'imperial'
}

export interface WeatherService {
  fetchWeatherForCity(city: string, units: WeatherUnits): Promise<WeatherData>
  fetchWeatherForZipCode(zipCode: string, units: WeatherUnits): Promise<WeatherData>
  fetchWeatherForLatLong(latitude: string, longitude: string, units: WeatherUnits): Promise<WeatherData>
}
