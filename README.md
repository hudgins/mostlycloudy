## Description

This project is a solution to a take-home job application assessment. The problem was presented as follows:

*Build an application using whatever tools, components, or third party libraries that you'd like. The app
should allow a user to search for current weather conditions by city name, zip code, or coordinates
(GPS, reverse geolocation) using the https://openweathermap.org/api API. The application should be
organized in a way where new features can be easily added and/or tested and that you would be
happy to maintain. Be sure to submit documentation on how to run the application, including some
example inputs.*

I have chosen to build the application as a [NestJS](https://docs.nestjs.com)-based (Node.js) service that presents a REST API.

## Design Details

1. **Weather Source Plugins** -- weather sources are encapsulated as modules with services
that inherit from a common interface. These services are added to a registry, which is
then used by the application controller to route calls to the appropriate weather source
service without requiring direct dependencies on those services. API callers can specify
which "source" they wish to receive weather data from. In addition to the OpenWeatherMap
service, a second "mock" weather source (AlwaysSunny) is available. The raw data from
weather sources is mapped to a common response format before returning data to the caller.
2. **Request Caching** -- request responses are cached (5 mins) to reduce the number of
unnecessary calls made to metered third-party APIs.
3. **Rate-limiting** -- requests are rate-limited (30/min) to prevent abuse and subsequent
costs for third-party APIs.
4. **Configuration** -- API keys, etc. are read from environment variables.
5. **HealthCheck** -- two health-related endpoints are provided, one for a basic ping by
load balancers or uptime monitors, the other for detailed status of the service functionality.
6. **Metrics** -- a basic in-memory metrics service is included, which services use to
report their usage.

### Implementation Details

- caching, rate-limiting, and metrics all use in-memory storage for the purpose of this exercise so as to not require other dependencies (eg. Redis).
- prefers @nestjs modules whenever possible:
  - caching - @nestjs/cache-manager
  - rate-limiting - @nestjs/throttler
  - config - @nestjs/config
- [class-validator](https://github.com/typestack/class-validator#readme) for request validation
- [pino](https://getpino.io) for logging
- [axios](https://axios-http.com) for http requests
- [lint-staged](https://github.com/lint-staged/lint-staged#readme) to lint and format staged changes on pre-commit hook
- [commitlint](https://commitlint.js.org) to enforce a common commit message format (future use with release-please)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using the APIs

- Query by lat/long
```bash
$ curl 'http://localhost:3000/v1/current?long=-117.2855&lat=49.4999&source=openweathermap'                                                                                                                                ─╯

{
  "locationName": "Nelson",
  "locationCoords": {
    "lat": 49.4999,
    "long": -117.2855
  },
  "weatherDescription": "overcast clouds",
  "temperatureCurrent": -0.92,
  "temperatureLow": -1.44,
  "temperatureHigh": -0.92,
  "windSpeed": 2.06,
  "windDirection": 180,
  "humidity": 69,
  "units": "metric",
  "source": "openweathermap"
}
```

- Query by city name
```bash
$ curl 'http://localhost:3000/v1/current?city=Nelson,CA&source=openweathermap&units=imperial'

{
  "locationName": "Nelson",
  "locationCoords": {
    "lat": 49.4999,
    "long": -117.2855
  },
  "weatherDescription": "overcast clouds",
  "temperatureCurrent": 30.34,
  "temperatureLow": 29.41,
  "temperatureHigh": 30.34,
  "windSpeed": 4.61,
  "windDirection": 180,
  "humidity": 69,
  "units": "imperial",
  "source": "openweathermap"
}
```

- Query by zip code (US only)
```bash
$ curl 'http://localhost:3000/v1/current?zip=90210&source=openweathermap'

{
  "locationName": "Beverly Hills",
  "locationCoords": {
    "lat": 34.0901,
    "long": -118.4065
  },
  "weatherDescription": "overcast clouds",
  "temperatureCurrent": 12.28,
  "temperatureLow": 10.79,
  "temperatureHigh": 13.97,
  "windSpeed": 1.54,
  "windDirection": 200,
  "humidity": 90,
  "units": "metric",
  "source": "openweathermap"
}
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
