export interface IKanbanStep {
    stepId: string
    label: string
    color: string
    badgeBg: string
    badgeText: string
    badgeBorder: string
    stepOrder: number
    isDefault: boolean
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export class KanbanStepAssociation implements IKanbanStep {
    public stepId: string
    public label: string
    public color: string
    public badgeBg: string
    public badgeText: string
    public badgeBorder: string
    public stepOrder: number
    public isDefault: boolean
    public isActive: boolean
    public createdAt?: Date
    public updatedAt?: Date

    constructor(
        stepId: string,
        label: string,
        color: string,
        badgeBg: string,
        badgeText: string,
        badgeBorder: string,
        stepOrder: number,
        isDefault: boolean,
        isActive: boolean,
        createdAt?: Date,
        updatedAt?: Date
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
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
