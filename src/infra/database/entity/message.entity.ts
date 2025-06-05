import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum MessageStatus {
  CREATED = 'created',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  UPDATED = 'updated'
}

@Entity({ schema: 'public', name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'message_id' })
    public messageID!: string | null

  @Column('text')
    public content!: string

  @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.CREATED })
    public status!: MessageStatus

  @CreateDateColumn({ name: 'created_at' })
    public createdAt!: Date

    
  @UpdateDateColumn({name: 'updated_at' })
    public updatedAt!: Date

  constructor(
    messageID: string | null, 
    content: string, 
    status: MessageStatus,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.messageID = messageID
    this.content = content
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}