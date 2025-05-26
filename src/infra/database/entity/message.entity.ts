import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { CampaignEntity } from './campaign.entity'
import { UserEntity } from './user.entity'
import { ContactEntity } from './contact.entity'

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


  @ManyToOne(() => UserEntity, (user) => user.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
    user!: UserEntity

  @ManyToOne(() => CampaignEntity, (campaigns) => campaigns.messages)
  @JoinColumn({ name: 'campaign_id' })
    campaign!: CampaignEntity

  @ManyToOne(() => ContactEntity)
  @JoinColumn({ name: 'contact_id' })
    contact!: ContactEntity

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