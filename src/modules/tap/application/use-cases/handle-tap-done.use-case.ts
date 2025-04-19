import { Inject, Injectable, Logger } from '@nestjs/common';
import { IMqttPublisher } from '../ports/out/mqtt-publisher.interface';

@Injectable()
export class HandleTapDoneUseCase {
    private readonly logger = new Logger(HandleTapDoneUseCase.name);

    constructor(
        @Inject(IMqttPublisher)
        private readonly mqttPublisher: IMqttPublisher,
    ) { }

    async execute(): Promise<void> {
        try {
            await this.mqttPublisher.publish('tap/command', [
                99,
                2,
                0,
            ]);
        } catch (error) {
            this.logger.error(
                `Failed to publish tap/command for tap/done event: ${error.message}`,
                error.stack,
            );
        }
    }
}
