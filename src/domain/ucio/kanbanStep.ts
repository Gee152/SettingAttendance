import { KanbanStepAssociation } from "../association/kanbanStep"
import { ErrorEntity } from "../association/error"

class CreateKanbanStepUseCaseRequest {
    public stepId: string
    public label: string
    public color: string
    public badgeBg?: string
    public badgeText?: string
    public badgeBorder?: string
    public stepOrder?: number
    public isDefault?: boolean

    constructor(
        stepId: string,
        label: string,
        color: string,
        badgeBg?: string,
        badgeText?: string,
        badgeBorder?: string,
        stepOrder?: number,
        isDefault?: boolean
    ) {
        this.stepId = stepId
        this.label = label
        this.color = color
        this.badgeBg = badgeBg || "bg-primary/15"
        this.badgeText = badgeText || "text-primary"
        this.badgeBorder = badgeBorder || "border-primary/30"
        this.stepOrder = stepOrder !== undefined ? stepOrder : 0
        this.isDefault = isDefault !== undefined ? isDefault : false
    }
}

class CreateKanbanStepUseCaseResponse {
    public step: KanbanStepAssociation | null
    public error: ErrorEntity | null

    constructor(step: KanbanStepAssociation | null, error: ErrorEntity | null) {
        this.step = step
        this.error = error
    }
}

class GetKanbanStepUseCaseRequest {
    public stepId: string

    constructor(stepId: string) {
        this.stepId = stepId
    }
}

class GetKanbanStepUseCaseResponse {
    public step: KanbanStepAssociation | null
    public error: ErrorEntity | null

    constructor(step: KanbanStepAssociation | null, error: ErrorEntity | null) {
        this.step = step
        this.error = error
    }
}

class UpdateKanbanStepUseCaseRequest {
    public stepId: string
    public label: string
    public color: string
    public badgeBg?: string
    public badgeText?: string
    public badgeBorder?: string
    public stepOrder?: number
    public isDefault?: boolean

    constructor(
        stepId: string,
        label: string,
        color: string,
        badgeBg?: string,
        badgeText?: string,
        badgeBorder?: string,
        stepOrder?: number,
        isDefault?: boolean
    ) {
        this.stepId = stepId
        this.label = label
        this.color = color
        this.badgeBg = badgeBg
        this.badgeText = badgeText
        this.badgeBorder = badgeBorder
        this.stepOrder = stepOrder
        this.isDefault = isDefault
    }
}

class UpdateKanbanStepUseCaseResponse {
    public step: KanbanStepAssociation | null
    public error: ErrorEntity | null

    constructor(step: KanbanStepAssociation | null, error: ErrorEntity | null) {
        this.step = step
        this.error = error
    }
}

class DeleteKanbanStepUseCaseRequest {
    public stepId: string

    constructor(stepId: string) {
        this.stepId = stepId
    }
}

class DeleteKanbanStepUseCaseResponse {
    public error: ErrorEntity | null

    constructor(error: ErrorEntity | null) {
        this.error = error
    }
}

class ListKanbanStepUseCaseRequest {}

class ListKanbanStepUseCaseResponse {
    public steps: KanbanStepAssociation[] | null
    public total: number
    public error: ErrorEntity | null

    constructor(steps: KanbanStepAssociation[] | null, total: number, error: ErrorEntity | null) {
        this.steps = steps
        this.total = total
        this.error = error
    }
}

export {
    CreateKanbanStepUseCaseRequest,
    CreateKanbanStepUseCaseResponse,
    GetKanbanStepUseCaseRequest,
    GetKanbanStepUseCaseResponse,
    UpdateKanbanStepUseCaseRequest,
    UpdateKanbanStepUseCaseResponse,
    DeleteKanbanStepUseCaseRequest,
    DeleteKanbanStepUseCaseResponse,
    ListKanbanStepUseCaseRequest,
    ListKanbanStepUseCaseResponse
}
