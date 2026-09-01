import { KanbanStepAssociation } from "../../../domain/association/kanbanStep"
import { KanbanStepModel } from "../entity/kanbanStep.entity"

function toKanbanStepAssociation(model: KanbanStepModel): KanbanStepAssociation {
    return new KanbanStepAssociation(
        model.stepId,
        model.label,
        model.color,
        model.badgeBg,
        model.badgeText,
        model.badgeBorder,
        model.stepOrder,
        model.isDefault,
        model.isActive,
        model.createdAt,
        model.updatedAt
    )
}

function toKanbanStepModel(association: KanbanStepAssociation): KanbanStepModel {
    const model = new KanbanStepModel(
        association.stepId,
        association.label,
        association.color,
        association.badgeBg,
        association.badgeText,
        association.badgeBorder,
        association.stepOrder,
        association.isDefault,
        association.isActive
    )
    if (association.createdAt) model.createdAt = association.createdAt
    if (association.updatedAt) model.updatedAt = association.updatedAt
    return model
}

export {
    toKanbanStepAssociation,
    toKanbanStepModel
}
