<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A NestJS application acting as an MQTT message event handling hub for multiple Arduino devices, following Clean Architecture principles.</p>

## Description

This project implements a NestJS application designed to receive and process MQTT messages from Arduino devices. The messages are expected to be binary serialized C++ data structures. The application follows Clean Architecture principles to ensure separation of concerns and maintainability.

## Project setup

```bash
# Install dependencies
$ pnpm install
```

## Running the application

```bash
# Development mode with watch
$ pnpm run start:dev

# Production mode
$ pnpm run start:prod
```

## Running tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Resources

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- Project context defined in [general-context.prompt.md](./general-context.prompt.md).

## Stay in touch

- Author - Maico Dal Ponte (maicodalponte@gmail.com)

