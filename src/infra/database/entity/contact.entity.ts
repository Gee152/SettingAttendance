import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ContactEntity {
  @PrimaryGeneratedColumn()
    public contactID!: string

  @Column()
    public phoneNumber!: string

  @Column()
    public name!: string

  @Column('jsonb', { nullable: true })
    public tags!: string[]

  constructor(contactID: string, phoneNumber: string, name: string, tags: string[]) {
    this.contactID = contactID
    this.phoneNumber = phoneNumber
    this.name = name
    this.tags = tags
  }

  @ManyToOne(() => UserEntity, (user) => user.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
    user!: UserEntity

  @CreateDateColumn()
    createdAt!: Date

  @UpdateDateColumn()
    updatedAt!: Date
} 