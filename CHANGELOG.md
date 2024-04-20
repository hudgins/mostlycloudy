# Changelog

## 1.0.0 (2024-04-20)


### Features

* adds /v1/current API and always-sunny weather source ([20057c1](https://github.com/hudgins/mostlycloudy/commit/20057c1d15fe52851a859a33b25b6df4197b4f1c))
* adds API docs via swagger ([9a66c1a](https://github.com/hudgins/mostlycloudy/commit/9a66c1ad7c740225efd0b89f4e457b7714c56f12))
* adds common interface for weather source data ([6c96bb0](https://github.com/hudgins/mostlycloudy/commit/6c96bb01f21558488d1c2a5513ac3af43decb55f))
* adds health-check endpoint ([76dbe1e](https://github.com/hudgins/mostlycloudy/commit/76dbe1eaa80a7638eef755c437079eb649ca4909))
* adds initial OpenWeatherMap module ([1a31240](https://github.com/hudgins/mostlycloudy/commit/1a312400a9a9d384a30b4a4702bc2452b07f956f))
* adds logger (pino) ([2d4edde](https://github.com/hudgins/mostlycloudy/commit/2d4eddea871c92f74dfb9481cfa655e99824b0d9))
* adds lookup by zip and lat/long ([c73abc6](https://github.com/hudgins/mostlycloudy/commit/c73abc6f6cdc2174d7a15071991d8eb29dff18a8))
* adds pretty logging locally ([18f5567](https://github.com/hudgins/mostlycloudy/commit/18f55674ee6743da56c4d966c0fc29778dfaaca5))
* adds rate-limiting ([2f00441](https://github.com/hudgins/mostlycloudy/commit/2f00441ed520db8e469a92afa987fca29bb618c7))
* adds request caching for 5 mins on /v1/current ([76167b9](https://github.com/hudgins/mostlycloudy/commit/76167b9cad80aebd96149c3c3c750157da9201cc))
* adds rudimentary metrics service ([24e7fc2](https://github.com/hudgins/mostlycloudy/commit/24e7fc27f34628f31e0f66e5cf71370de2570db5))
* calls API and reads API key from config ([e8cba20](https://github.com/hudgins/mostlycloudy/commit/e8cba200ac31a3e4adfc713931487b2d97cefb48))
* enhances request validation using class-validator ([a6b121d](https://github.com/hudgins/mostlycloudy/commit/a6b121d1076570c5429642c5aba51d6aec5ba901))


### Bug Fixes

* configures release-please to update version in source ([88f1412](https://github.com/hudgins/mostlycloudy/commit/88f14121531fb76eeca52dd217f37dfec694a829))
* fixes lint-staged and bug ignored by it ([ac40f3c](https://github.com/hudgins/mostlycloudy/commit/ac40f3cdde9ec92a184f9a0f5b0b6542ae1f153a))
* restores pretty logging in dev/local mode ([25ed6d9](https://github.com/hudgins/mostlycloudy/commit/25ed6d979aea78d7721ea207f453d3304b0da62f))
