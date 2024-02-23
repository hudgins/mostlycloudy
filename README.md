## Description

This project is a solution to a take-home job application assessment. The problem was presented as follows:

"Build an application using whatever tools, components, or third party libraries that you'd like. The app
should allow a user to search for current weather conditions by city name, zip code, or coordinates
(GPS, reverse geolocation) using the https://openweathermap.org/api API. The application should be
organized in a way where new features can be easily added and/or tested and that you would be
happy to maintain. Be sure to submit documentation on how to run the application, including some
example inputs."

I have chosen to build the application as a NestJS service that presents a single REST endpoint
that satisfies the above requirements.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
