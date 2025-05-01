import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Campaign } from './campaign.entity'
import { UserEntity } from './user.entity'
import { Contact } from './contact.entity'

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

@Entity({ schema: 'public', name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid', { name: 'message_id' })
  public id!: string

  @Column('text')
  public content!: string

  @Column({ type: 'enum', enum: MessageStatus })
  public status!: MessageStatus

  @ManyToOne(() => UserEntity, (user) => user.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @ManyToOne(() => Campaign, (campaigns) => campaigns.messages)
  @JoinColumn({ name: 'campaign_id' })
  campaign!: Campaign

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact!: Contact

  @CreateDateColumn()
  sentAt!: Date
}