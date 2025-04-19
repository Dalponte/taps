import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TapModule } from './modules/tap/tap.module';
import { SharedMqttModule } from './modules/shared/mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedMqttModule,
    TapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
