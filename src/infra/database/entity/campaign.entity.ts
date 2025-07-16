import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  SENT = 'sent',
}

@Entity({ schema: 'public', name: 'campaigns' })
export class CampaignEntity {
  @PrimaryColumn({ type:'uuid', name: 'campaingn_id' })
    public campaignID!: string

  @Column({ name: 'user_name', length: 100, nullable: true })
    public userName!: string

  @Column({type: 'varchar', name: 'messages', length: 500})
    public messages!: string

  @Column({type: 'timestamp', name: 'scheduled_at' ,nullable: true })
    public scheduledAt!: Date

  @Column({ type: 'enum', name: 'status' ,enum: CampaignStatus, default: CampaignStatus.DRAFT })
    public status!: CampaignStatus

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true})
   public createdAt!: Date
  
  @UpdateDateColumn({type: 'timestamp', name: 'updated_at', nullable: true})
    public updatedAt!: Date

   constructor(campaignID: string, userName: string, messages: string, scheduledAt: Date, status: CampaignStatus, createdAt: Date, updatedAt: Date) {
    this.campaignID = campaignID
    this.userName = userName
    this.messages = messages
    this.scheduledAt = scheduledAt
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}