import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { UserEntity } from './user.entity'

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  SENT = 'sent',
}

@Entity({ schema: 'public', name: 'campaigns' })
export class Campaign {
  @PrimaryGeneratedColumn('uuid', { name: 'campaingn_id' })
  public id!: string

  @Column({ name: 'user_name', length: 100 })
  public name!: string

  @Column('text')
  public messages!: string

  @Column({ nullable: true })
  public scheduledAt!: Date

  @Column({ type: 'enum', enum: CampaignStatus, default: CampaignStatus.DRAFT })
  public status!: CampaignStatus

  @ManyToOne(() => UserEntity, (user) => user.campaigns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @CreateDateColumn()
  createdAt!: Date
}