export interface TapCommandData {
    tapId: number;
    commandType: number;
    pulses: number;
}

export enum CommandType {
    CMD_POUR = 1,
    CMD_CONTINUE = 2,
}

export const IMqttPublisher = Symbol('IMqttPublisher');

export interface IMqttPublisher {
    publish(topic: string, payload: any): Promise<void>;
}
