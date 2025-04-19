import { Inject, Injectable, Logger } from '@nestjs/common';
import { IMqttPublisher } from '../ports/out/mqtt-publisher.interface';

@Injectable()
export class HandleTapInputUseCase {
    private readonly logger = new Logger(HandleTapInputUseCase.name);

    constructor(
        @Inject(IMqttPublisher)
        private readonly mqttPublisher: IMqttPublisher,
    ) { }

    async execute(payload: any): Promise<void> {
        try {
            const [tapId] = payload;
            await this.mqttPublisher.publish('tap/command', [
                tapId,
                1,
                30,
            ]);
        } catch (error) {
            this.logger.error(
                `Failed to deserialize, process, or respond to tap input: ${error.message}`,
                error.stack,
            );
        }
    }
}
