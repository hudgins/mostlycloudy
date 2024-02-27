import nock = require('nock');

const OPEN_WEATHER_MAP_RESPONSE = {
  coord: { lon: -117.2855, lat: 49.4999 },
  weather: [
    { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' },
  ],
  base: 'stations',
  main: {
    temp: 8.08,
    feels_like: 5.35,
    temp_min: 6.9,
    temp_max: 8.08,
    pressure: 1021,
    humidity: 53,
  },
  visibility: 10000,
  wind: { speed: 4.63, deg: 170 },
  clouds: { all: 100 },
  dt: 1708737220,
  sys: {
    type: 1,
    id: 398,
    country: 'CA',
    sunrise: 1708699480,
    sunset: 1708737646,
  },
  timezone: -28800,
  id: 6086871,
  name: 'Nelson',
  cod: 200,
};

export function mockWeatherHttpRequest(overrideData: any = {}) {
  nock('https://api.openweathermap.org')
    .get(/.*/)
    .reply(200, { ...OPEN_WEATHER_MAP_RESPONSE, ...overrideData });
}
