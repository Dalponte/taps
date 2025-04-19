export interface TapCommandData {
    tapId: number;
    commandType: number;
    pulses: number;
}

export const IMqttPublisher = Symbol('IMqttPublisher');

export interface IMqttPublisher {
    publish(topic: string, payload: any): Promise<void>;
}
