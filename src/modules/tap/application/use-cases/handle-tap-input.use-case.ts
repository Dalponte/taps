import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandType, IMqttPublisher } from '../ports/out/mqtt-publisher.interface';

@Injectable()
export class HandleTapInputUseCase {
    private readonly logger = new Logger(HandleTapInputUseCase.name);

    constructor(
        @Inject(IMqttPublisher)
        private readonly mqttPublisher: IMqttPublisher,
    ) { }

    async execute(payload: any): Promise<void> {
        try {
            // Assuming payload is an array like [tapId]
            const [tapId] = payload;

            const PARAMETER = 30;
            const BYTES_PER_INT = 2;

            // Create a Buffer of 6 bytes (3 * 2-byte integers)
            const TOTAL_BYTES = 3 * BYTES_PER_INT; // tapId, commandId, parameter
            const commandPayload = Buffer.alloc(TOTAL_BYTES);

            // Write each value as a 2-byte unsigned integer (Big Endian)
            let offset = 0;
            commandPayload.writeUInt16BE(tapId, offset);
            offset += BYTES_PER_INT;
            commandPayload.writeUInt16BE(CommandType.CMD_POUR, offset);
            offset += BYTES_PER_INT;
            commandPayload.writeUInt16BE(PARAMETER, offset);

            await this.mqttPublisher.publish('tap/command', commandPayload);
            this.logger.log(`Published tap/command Buffer (Tap ID: ${tapId}, Cmd: ${CommandType.CMD_POUR}, Param: ${PARAMETER}, Size: ${commandPayload.length} bytes)`);
        } catch (error) {
            this.logger.error(
                `Failed to process tap input (Tap ID: ${payload?.[0]}): ${error instanceof Error ? error.message : String(error)}`,
                error instanceof Error ? error.stack : undefined,
            );
        }
    }
}
