import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ schema: 'public', name: 'kanban_steps' })
export class KanbanStepModel {
    @PrimaryColumn({ name: 'step_id', type: 'varchar', length: '100' })
    public stepId!: string

    @Column({ name: 'label', type: 'varchar', length: '255', nullable: false })
    public label: string

    @Column({ name: 'color', type: 'varchar', length: '50', nullable: false })
    public color: string

    @Column({ name: 'badge_bg', type: 'varchar', length: '100', nullable: false, default: 'bg-primary/15' })
    public badgeBg: string

    @Column({ name: 'badge_text', type: 'varchar', length: '100', nullable: false, default: 'text-primary' })
    public badgeText: string

    @Column({ name: 'badge_border', type: 'varchar', length: '100', nullable: false, default: 'border-primary/30' })
    public badgeBorder: string

    @Column({ name: 'step_order', type: 'integer', nullable: false, default: 0 })
    public stepOrder: number

    @Column({ name: 'is_default', type: 'boolean', nullable: false, default: false })
    public isDefault: boolean

    @Column({ name: 'is_active', type: 'boolean', nullable: false, default: true })
    public isActive: boolean

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
    public createdAt!: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
    public updatedAt!: Date

    constructor(
        stepId: string,
        label: string,
        color: string,
        badgeBg: string,
        badgeText: string,
        badgeBorder: string,
        stepOrder: number,
        isDefault: boolean,
        isActive: boolean
    ) {
        this.stepId = stepId
        this.label = label
        this.color = color
        this.badgeBg = badgeBg
        this.badgeText = badgeText
        this.badgeBorder = badgeBorder
        this.stepOrder = stepOrder
        this.isDefault = isDefault
        this.isActive = isActive
    }
}
