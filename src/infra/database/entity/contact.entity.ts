import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'contact', schema: 'public'}) 
export class ContactEntity {
  @PrimaryColumn({ type: 'uuid', name: 'contact_id' })
    public contactID!: string

  @Column({ type: 'varchar', name: 'user_id' })
    public userID!: string

  @Column({ type: 'varchar', name: 'phone_number', length: 15 })
    public phoneNumber!: string

  @Column({ type: 'varchar', name: 'name', length: 120 })
    public name!: string

  @Column({ type: 'varchar', name: 'tags', nullable: true, length: 120 }) 
    public tags!: string[] | null

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
    createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: false })
    updatedAt!: Date

    constructor(contactID: string, userID: string, phoneNumber: string, name: string, tags: string[] | null, createdAt: Date, updatedAt: Date) {
    this.contactID = contactID
    this.userID = userID
    this.phoneNumber = phoneNumber
    this.name = name
    this.tags = tags
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
} 