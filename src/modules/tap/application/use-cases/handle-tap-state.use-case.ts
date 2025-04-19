import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HandleTapStateUseCase {
    private readonly logger = new Logger(HandleTapStateUseCase.name);

    execute(data: any): void {
        // TODO: Implement business logic for handling tap state
        this.logger.log(`Handling tap state in Use Case: ${JSON.stringify(data)}`);
    }
}
