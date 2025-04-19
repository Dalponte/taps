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
            const TAP_ID = 99;
            const COMMAND_ID = 2;
            const PARAMETER = 0;
            const BYTES_PER_INT = 2;

            // Create a Buffer of 6 bytes (3 * 2-byte integers)
            const TOTAL_BYTES = 3 * BYTES_PER_INT;
            const commandPayload = Buffer.alloc(TOTAL_BYTES);
            // Write each value as a 2-byte unsigned integer (Big Endian)
            let offset = 0;
            commandPayload.writeUInt16BE(TAP_ID, offset);
            offset += BYTES_PER_INT;
            commandPayload.writeUInt16BE(COMMAND_ID, offset);
            offset += BYTES_PER_INT;
            commandPayload.writeUInt16BE(PARAMETER, offset);

            await this.mqttPublisher.publish('tap/command', commandPayload);
            this.logger.log(`Published tap/command Buffer for tap/done event (Tap ID: ${TAP_ID}, Cmd: ${COMMAND_ID}, Param: ${PARAMETER}, Size: ${commandPayload.length} bytes)`);
        } catch (error) {
            this.logger.error(
                `Failed to publish tap/command for tap/done event: ${error.message}`,
                error.stack,
            );
        }
    }
}
