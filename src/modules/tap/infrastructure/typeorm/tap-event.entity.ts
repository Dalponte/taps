import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tap_events')
export class TapEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Identifier of the tap device (optional)
    @Column({ nullable: true })
    tapId?: string;

    // Type of event, e.g. "tap:input", "tap:state", "tap:done"
    @Column()
    eventType: string;

    // Arbitrary event payload stored as JSON
    @Column('simple-json', { nullable: true })
    payload?: Record<string, any>;

    // When the event occurred (if provided by source)
    @Column({ type: 'datetime', nullable: true })
    occurredAt?: Date;

    @CreateDateColumn()
    createdAt: Date;
}
