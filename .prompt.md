# Project Prompt: NestJS MQTT Event Hub with Clean Architecture

## Project Goal

Implement a NestJS application acting as an MQTT message event handling hub for multiple Arduino devices. The application should strictly follow the principles of Clean Architecture and be event-driven.

## Core Requirements

1.  **Technology Stack:** NestJS (TypeScript)
2.  **Communication Protocol:** MQTT
3.  **Architecture:** Clean Architecture
4.  **Event Handling:** The application must subscribe to MQTT topics and process incoming messages from Arduino devices.
5.  **Message Format:** Messages from Arduino devices will be binary serialized C++ data structures. The NestJS application needs to deserialize and handle these binary messages.

## Development Environment

*   **OS:** Windows + WSL
*   **MQTT Broker:** Eclipse Mosquitto running in a Docker container.
*   **Network:** The broker will be accessible on the local network. Ports 1883 (MQTT) and 9001 (Websockets) are open on the firewall.
*   **Client Devices:** Arduino devices running C++ applications that communicate exclusively via MQTT.

## Implementation Details

*   Utilize the built-in NestJS MQTT microservice capabilities as documented here: [https://docs.nestjs.com/microservices/mqtt](https://docs.nestjs.com/microservices/mqtt)
*   Structure the application according to Clean Architecture layers (e.g., Domain, Application, Infrastructure, Presentation/API).
*   Implement appropriate handlers for different MQTT topics/events.
*   Implement logic for deserializing binary data received from Arduinos.

## Future Roadmap

*   **Messaging:** Integrate Kafka alongside MQTT to store and process critical events and queue processing.
*   **Persistence:** Add Prisma with a PostgreSQL database for data storage.
*   **Deployment:** Implement infrastructure as code using Terraform for deployment.
*   **Project Structure:** Potentially transition to a NestJS monorepo structure using workspaces ([https://docs.nestjs.com/cli/monorepo](https://docs.nestjs.com/cli/monorepo)) if the project grows.

## Key Considerations

*   **Clean Architecture:** Ensure strict separation of concerns between layers. The core domain logic should be independent of frameworks (NestJS), protocols (MQTT), and databases.
*   **Binary Deserialization:** Carefully define the binary data structures and implement robust deserialization logic in the NestJS application. Consider using libraries like `protobuf` or defining a custom binary protocol if needed.
*   **Error Handling:** Implement comprehensive error handling for MQTT connection issues, message deserialization failures, and business logic errors.
*   **Scalability:** While starting simple, keep potential future scaling needs in mind when designing the architecture.
