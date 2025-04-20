import { Injectable, Logger } from '@nestjs/common';

interface FlowData {
    id: number;        // Tap ID
    flowRate: number;  // Current flow rate
    totalPulses: number; // Total pulses counted
}

@Injectable()
export class HandleTapFlowUseCase {
    private readonly logger = new Logger(HandleTapFlowUseCase.name);

    constructor() { }

    async execute(payload: Buffer): Promise<void> {
        try {
            if (!Buffer.isBuffer(payload) || payload.length < 6) {
                this.logger.warn(`Invalid flow data payload: ${payload}`);
                return;
            }

            // Parse the binary C++ struct format (3 uint16_t values)
            const BYTES_PER_INT = 2;
            let offset = 0;
            
            const flowData: FlowData = {
                id: payload.readUInt16BE(offset),
                flowRate: payload.readUInt16BE(offset += BYTES_PER_INT),
                totalPulses: payload.readUInt16BE(offset += BYTES_PER_INT)
            };

            this.logger.log(`Tap Flow Data - Tap ID: ${flowData.id}, Flow Rate: ${flowData.flowRate}, Total Pulses: ${flowData.totalPulses}`);
        } catch (error) {
            this.logger.error(
                `Failed to process tap flow data: ${error.message}`,
                error.stack,
            );
        }
    }
}