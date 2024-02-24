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
}
