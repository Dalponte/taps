import { Module } from '@nestjs/common';
import { TapMqttController } from './adapters/tap.mqtt.controller';
import { HandleTapStateUseCase } from './application/use-cases/handle-tap-state.use-case';
import { HandleTapInputUseCase } from './application/use-cases/handle-tap-input.use-case';
import { HandleTapDoneUseCase } from './application/use-cases/handle-tap-done.use-case'; // Import the new use case
import { IMqttPublisher } from './application/ports/out/mqtt-publisher.interface'; // Import output port
import { MqttPublisherAdapter } from './infrastructure/mqtt/mqtt-publisher.adapter'; // Import output adapter

@Module({
    controllers: [TapMqttController],
    providers: [
        HandleTapStateUseCase,
        HandleTapInputUseCase,
        HandleTapDoneUseCase,
        {
            provide: IMqttPublisher,
            useClass: MqttPublisherAdapter,
        },
    ],
})
export class TapModule { }
