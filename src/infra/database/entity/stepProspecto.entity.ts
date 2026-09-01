import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'stepsPropscto', schema: 'public' })
export class StepProspectoEntity {
    @PrimaryColumn({ type: 'uuid', name: 'uuid' })
    public uuid!: string;

    @Column({ type: 'varchar', name: 'proposal_id', length: 120, nullable: false })
    public proposalId!: string;

    @Column({ type: 'varchar', name: 'from_step', length: 120, nullable: true })
    public fromStep?: string;

    @Column({ type: 'varchar', name: 'to_step', length: 120, nullable: false })
    public toStep!: string;

    @Column({ type: 'text', name: 'description', nullable: false })
    public description!: string;

    @Column({ type: 'jsonb', name: 'history', nullable: true })
    public history?: any;

    @Column({ type: 'varchar', name: 'user_id', length: 120, nullable: true })
    public userId?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
    public updatedAt!: Date;

    constructor(
        uuid?: string,
        proposalId?: string,
        fromStep?: string,
        toStep?: string,
        description?: string,
        history?: any,
        userId?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        if (uuid) this.uuid = uuid;
        if (proposalId) this.proposalId = proposalId;
        if (fromStep) this.fromStep = fromStep;
        if (toStep) this.toStep = toStep;
        if (description) this.description = description;
        if (history) this.history = history;
        if (userId) this.userId = userId;
        if (createdAt) this.createdAt = createdAt;
        if (updatedAt) this.updatedAt = updatedAt;
    }
}
