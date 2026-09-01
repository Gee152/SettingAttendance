import {
    CreateKanbanStepUseCaseRequest,
    GetKanbanStepUseCaseRequest,
    UpdateKanbanStepUseCaseRequest,
    DeleteKanbanStepUseCaseRequest
} from "../ucio/kanbanStep"

class CreateKanbanStepValidate {
    async validate(req: CreateKanbanStepUseCaseRequest): Promise<string | null> {
        if (!req.stepId || req.stepId.trim() === "") {
            return "O identificador da etapa (stepId) é obrigatório."
        }
        if (!req.label || req.label.trim() === "") {
            return "O rótulo da etapa (label) é obrigatório."
        }
        if (!req.color || req.color.trim() === "") {
            return "A cor da etapa (color) é obrigatória."
        }
        return null
    }
}

class GetKanbanStepValidate {
    async validate(req: GetKanbanStepUseCaseRequest): Promise<string | null> {
        if (!req.stepId || req.stepId.trim() === "") {
            return "O identificador da etapa (stepId) é obrigatório."
        }
        return null
    }
}

class UpdateKanbanStepValidate {
    async validate(req: UpdateKanbanStepUseCaseRequest): Promise<string | null> {
        if (!req.stepId || req.stepId.trim() === "") {
            return "O identificador da etapa (stepId) é obrigatório."
        }
        if (!req.label || req.label.trim() === "") {
            return "O rótulo da etapa (label) é obrigatório."
        }
        return null
    }
}

class DeleteKanbanStepValidate {
    async validate(req: DeleteKanbanStepUseCaseRequest): Promise<string | null> {
        if (!req.stepId || req.stepId.trim() === "") {
            return "O identificador da etapa (stepId) é obrigatório."
        }
        return null
    }
}

export {
    CreateKanbanStepValidate,
    GetKanbanStepValidate,
    UpdateKanbanStepValidate,
    DeleteKanbanStepValidate
}
