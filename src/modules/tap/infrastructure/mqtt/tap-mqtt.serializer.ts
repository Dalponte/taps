import { Serializer, OutgoingRequest } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

/**
 * A serializer specifically for Tap module MQTT messages.
 * Passes Buffer payloads through directly and JSON-stringifies other types.
 */
export class TapMqttSerializer implements Serializer {
    private readonly logger = new Logger(TapMqttSerializer.name);

    serialize(value: OutgoingRequest): any {
        const data = value.data;
        if (Buffer.isBuffer(data)) {
            // If the data is already a Buffer, return it directly
            this.logger.verbose(`Passing through Buffer payload (Size: ${data.length})`);
            return data;
        }
        // Otherwise, fall back to JSON stringification for standard objects/primitives
        this.logger.verbose('Serializing non-Buffer payload to JSON');
        return JSON.stringify(data);
    }
}
