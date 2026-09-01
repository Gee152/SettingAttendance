import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ schema: 'public', name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'permission_id' })
    public permissionID!: string

  @Column({ name: 'user_id', type: 'varchar', length: '255', nullable: true })
    public userID!: string

  @Column({ name: 'module', type: 'varchar', length: '100', default: 'all' })
    public module!: string

  @Column({ name: 'can_read', default: true })
    public canRead!: boolean

  @Column({ name: 'can_write', default: true })
    public canWrite!: boolean

  @Column({ name: 'can_delete', default: false })
    public canDelete!: boolean

  @CreateDateColumn({ name: 'created_at' })
    public createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
    public updatedAt!: Date

  constructor(
    permissionID: string,
    userID: string,
    module: string,
    canRead: boolean = true,
    canWrite: boolean = true,
    canDelete: boolean = false
  ) {
    this.permissionID = permissionID
    this.userID = userID
    this.module = module
    this.canRead = canRead
    this.canWrite = canWrite
    this.canDelete = canDelete
  }
}
