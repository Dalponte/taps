import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TapMqttSerializer } from '../../tap/infrastructure/mqtt/tap-mqtt.serializer'; // Import the new serializer

export const MQTT_CLIENT = 'MQTT_CLIENT';

@Global()
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: MQTT_CLIENT,
                imports: [ConfigModule],
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.MQTT,
                    options: {
                        url: configService.get<string>('MQTT_BROKER_URL'),
                        // Use the custom Tap serializer
                        serializer: new TapMqttSerializer(),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class SharedMqttModule { }