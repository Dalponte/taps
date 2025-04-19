import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_BROKER_URL,
    },
  });

  await app.startAllMicroservices();
  await app.listen(9000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('MQTT Microservice is listening');
}
bootstrap();
