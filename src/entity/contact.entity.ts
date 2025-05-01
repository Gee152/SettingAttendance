import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  phoneNumber!: string

  @Column()
  name!: string

  @Column('jsonb', { nullable: true })
  tags!: string[]

  @ManyToOne(() => UserEntity, (user) => user.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
} 