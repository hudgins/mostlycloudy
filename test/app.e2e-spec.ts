// the tests are not existing due to open handles but I am deferring figuring this
// out for a later time, since it does not impact "production"
// it may have something to do with pino-pretty
// solution for now is jest --forceExit
// require('leaked-handles').set({
//     fullStack: true,
//     timeout: 5000,
//     debugSockets: true
// });
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app/app.module';
import { toContainKeys } from 'jest-extended';
expect.extend({ toContainKeys });

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Mostlycloudy weather service');
  });

  // health-check

  it('/v1/health-check (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/health-check')
      .expect(200)
      .expect('up');
  });

  it('/v1/health-check/detailed (GET)', () => {
    const expected = {
      status: 'normal',
      sources: {
        openweathermap: {
          status: 'normal',
        },
        alwayssunny: {
          status: 'normal',
        },
      },
    };

    return request(app.getHttpServer())
      .get('/v1/health-check/detailed')
      .expect(200)
      .expect(expected);
  }, 15_000);

  // current conditions API

  it('/v1/current (GET) - by city', async () => {
    const expected = {
      locationName: 'Nelson',
      locationCoords: {
        lat: 49.4999,
        long: -117.2855,
      },
      weatherDescription: 'few clouds',
      temperatureCurrent: 33.94,
      temperatureLow: 33.42,
      temperatureHigh: 33.94,
      windSpeed: 9.22,
      windDirection: 220,
      humidity: 29,
      units: 'imperial',
      source: 'openweathermap',
    };

    const response = await request(app.getHttpServer())
      .get('/v1/current?city=Nelson,CA&source=openweathermap&units=imperial')
      .set('Accept', 'application/json');
    expect(response.body).toContainKeys(Object.keys(expected));
    expect(response.body.locationName).toEqual('Nelson');
    expect(response.body.source).toEqual('openweathermap');
  }, 15_000);

  it('/v1/current (GET) - by zip', async () => {
    const expected = {
      locationName: 'Beverly Hills',
      locationCoords: {
        lat: 34.0901,
        long: -118.4065,
      },
      weatherDescription: 'overcast clouds',
      temperatureCurrent: 12.28,
      temperatureLow: 10.79,
      temperatureHigh: 13.97,
      windSpeed: 1.54,
      windDirection: 200,
      humidity: 90,
      units: 'metric',
      source: 'openweathermap',
    };

    const response = await request(app.getHttpServer())
      .get('/v1/current?zip=90210&source=openweathermap&units=imperial')
      .set('Accept', 'application/json');
    expect(response.body).toContainKeys(Object.keys(expected));
    expect(response.body.locationName).toEqual('Beverly Hills');
    expect(response.body.source).toEqual('openweathermap');
  }, 15_000);

  it('/v1/current (GET) - by lat/long', async () => {
    const expected = {
      locationName: 'Beverly Hills',
      locationCoords: {
        lat: 34.0901,
        long: -118.4065,
      },
      weatherDescription: 'overcast clouds',
      temperatureCurrent: 12.28,
      temperatureLow: 10.79,
      temperatureHigh: 13.97,
      windSpeed: 1.54,
      windDirection: 200,
      humidity: 90,
      units: 'metric',
      source: 'openweathermap',
    };

    const response = await request(app.getHttpServer())
      .get(
        '/v1/current?lat=34.0901&long=-118.4065&source=openweathermap&units=imperial',
      )
      .set('Accept', 'application/json');
    expect(response.body).toContainKeys(Object.keys(expected));
    expect(response.body.locationName).toEqual('Beverly Hills');
    expect(response.body.source).toEqual('openweathermap');
  }, 15_000);

  it('/v1/current (GET) - bad request', async () => {
    const expected = {
      error: 'Bad Request',
      message: 'invalid request: please provide city, zip, or lat/long pair',
      statusCode: 400,
    };

    const response = await request(app.getHttpServer())
      .get('/v1/current?source=openweathermap&units=metric')
      .set('Accept', 'application/json');
    expect(response.body).toEqual(expected);
  }, 15_000);

  it('/v1/current (GET) - weather not found', async () => {
    const expected = {
      error: 'Not Found',
      message: 'weather data not found',
      statusCode: 404,
    };

    const response = await request(app.getHttpServer())
      .get('/v1/current?city=Nowhereonearth&source=openweathermap&units=metric')
      .set('Accept', 'application/json');
    expect(response.body).toEqual(expected);
  }, 15_000);
});
