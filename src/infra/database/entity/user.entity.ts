import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity({ schema: 'public', name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'user_id'})
    public userID!: string | null

  @Column()
    public name!: string

  @Column({ name: 'email' })
    public email!: string

  @Column({ name: 'passwordHash' })
    public passwordHash!: string

  @CreateDateColumn()
    public createdAt!: Date

  @UpdateDateColumn()
    public updatedAt!: Date

  constructor(  
    userID: string | null,
    name: string,
    email: string,
    passwordHash: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.userID = userID
    this.name = name
    this.email = email
    this.passwordHash = passwordHash
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  // Método para hash da senha
  async hashPassword(password: string): Promise<void> {
    const saltRounds = 10
    this.passwordHash = await bcrypt.hash(password, saltRounds)
  }

  // Método para verificar senha
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash)
  }
}