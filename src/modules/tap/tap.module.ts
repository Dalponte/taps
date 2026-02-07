import { Module } from '@nestjs/common';
import { TapMqttController } from './adapters/tap.mqtt.controller';
import { HandleTapStateUseCase } from './application/use-cases/handle-tap-state.use-case';
import { HandleTapInputUseCase } from './application/use-cases/handle-tap-input.use-case';
import { HandleTapDoneUseCase } from './application/use-cases/handle-tap-done.use-case';
import { HandleTapFlowUseCase } from './application/use-cases/handle-tap-flow.use-case';
import { IMqttPublisher } from './application/ports/out/mqtt-publisher.interface';
import { MqttPublisherAdapter } from './infrastructure/mqtt/mqtt-publisher.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TapEvent } from './infrastructure/typeorm/tap-event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TapEvent])],
    controllers: [TapMqttController],
    providers: [
        HandleTapStateUseCase,
        HandleTapInputUseCase,
        HandleTapDoneUseCase,
        HandleTapFlowUseCase,
        {
            provide: IMqttPublisher,
            useClass: MqttPublisherAdapter,
        },
    ],
})
export class TapModule { }
