import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IMqttPublisher } from '../../application/ports/out/mqtt-publisher.interface';
import { MQTT_CLIENT } from '../../../shared/mqtt/mqtt.module';

@Injectable()
export class MqttPublisherAdapter implements IMqttPublisher {
    private readonly logger = new Logger(MqttPublisherAdapter.name);

    constructor(
        @Inject(MQTT_CLIENT) private readonly client: ClientProxy,
    ) { }

    async publish(topic: string, payload: Buffer): Promise<void> {
        try {
            this.client.emit(topic, payload);
            this.logger.log(`Published message to topic: ${topic}, Size: ${payload.length}`);
        } catch (error) {
            this.logger.error(
                `Failed to publish message to topic ${topic}: ${error.message}`,
                error.stack,
            );
            throw error;
        }
    }
}
