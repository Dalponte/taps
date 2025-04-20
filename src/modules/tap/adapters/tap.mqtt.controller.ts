import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { HandleTapStateUseCase } from '../application/use-cases/handle-tap-state.use-case';
import { HandleTapInputUseCase } from '../application/use-cases/handle-tap-input.use-case';
import { HandleTapDoneUseCase } from '../application/use-cases/handle-tap-done.use-case';
import { HandleTapFlowUseCase } from '../application/use-cases/handle-tap-flow.use-case';

@Controller()
export class TapMqttController {
    private readonly logger = new Logger(TapMqttController.name);

    constructor(
        private readonly handleTapStateUseCase: HandleTapStateUseCase,
        private readonly handleTapInputUseCase: HandleTapInputUseCase,
        private readonly handleTapDoneUseCase: HandleTapDoneUseCase,
        private readonly handleTapFlowUseCase: HandleTapFlowUseCase,
    ) { }

    @EventPattern('tap/state')
    handleTapState(@Payload() rawPayload: any) {
        this.logger.log(`Received tap state via MQTT Controller: ${JSON.stringify(rawPayload)}`);
        this.handleTapStateUseCase.execute(rawPayload);
    }

    @EventPattern('tap/input')
    handleTapInput(@Payload() rawPayload: any) {
        this.logger.log(`Received raw tap input via MQTT Controller: ${JSON.stringify(rawPayload)}`);
        this.handleTapInputUseCase.execute(rawPayload);
    }

    @EventPattern('tap/done')
    handleTapPour(@Payload() rawPayload: any) {
        this.logger.log(`Received tap/done event. Payload (raw): ${JSON.stringify(rawPayload)}`);
        this.handleTapDoneUseCase.execute();
    }

    @EventPattern('tap/flow')
    handleTapFlow(@Payload() rawPayload: any) {
        this.logger.log(`Received tap flow data via MQTT Controller (binary data)`);
        this.handleTapFlowUseCase.execute(rawPayload);
    }
}
