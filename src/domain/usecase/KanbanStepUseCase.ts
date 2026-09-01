import {
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
} from "../ucio/kanbanStep"
import {
    CreateKanbanStepValidate,
    GetKanbanStepValidate,
    UpdateKanbanStepValidate,
    DeleteKanbanStepValidate
} from "../validate/kanbanStep"
import {
    CreateKanbanStepRepository,
    GetKanbanStepRepository,
    UpdateKanbanStepRepository,
    DeleteKanbanStepRepository,
    ListKanbanStepRepository
} from "../repository/kanbanStep"
import {
    InternalServerError,
    PreconditionError,
    TAG_INTERNAL_SERVER_ERROR,
    TAG_PRE_CONDITION_ERROR
} from "../association/error"
import { KanbanStepAssociation } from "../association/kanbanStep"

export class CreateKanbanStepUseCase {
    constructor(
        private validate: CreateKanbanStepValidate = new CreateKanbanStepValidate(),
        private repository: CreateKanbanStepRepository = new CreateKanbanStepRepository()
    ) {}

    async execute(req: CreateKanbanStepUseCaseRequest): Promise<CreateKanbanStepUseCaseResponse> {
        try {
            const error = await this.validate.validate(req)
            if (!error) {
                const step = new KanbanStepAssociation(
                    req.stepId,
                    req.label,
                    req.color,
                    req.badgeBg || "bg-primary/15",
                    req.badgeText || "text-primary",
                    req.badgeBorder || "border-primary/30",
                    req.stepOrder || 0,
                    req.isDefault || false,
                    true,
                    new Date(),
                    new Date()
                )
                const saved = await this.repository.create(step)
                return new CreateKanbanStepUseCaseResponse(saved, null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new CreateKanbanStepUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new CreateKanbanStepUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class GetKanbanStepUseCase {
    constructor(
        private validate: GetKanbanStepValidate = new GetKanbanStepValidate(),
        private repository: GetKanbanStepRepository = new GetKanbanStepRepository()
    ) {}

    async execute(req: GetKanbanStepUseCaseRequest): Promise<GetKanbanStepUseCaseResponse> {
        try {
            const error = await this.validate.validate(req)
            if (!error) {
                const step = await this.repository.get(req.stepId)
                if (!step) {
                    return new GetKanbanStepUseCaseResponse(null, new PreconditionError("Etapa não encontrada."))
                }
                return new GetKanbanStepUseCaseResponse(step, null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new GetKanbanStepUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new GetKanbanStepUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class UpdateKanbanStepUseCase {
    constructor(
        private validate: UpdateKanbanStepValidate = new UpdateKanbanStepValidate(),
        private repository: UpdateKanbanStepRepository = new UpdateKanbanStepRepository(),
        private getRepository: GetKanbanStepRepository = new GetKanbanStepRepository()
    ) {}

    async execute(req: UpdateKanbanStepUseCaseRequest): Promise<UpdateKanbanStepUseCaseResponse> {
        try {
            const error = await this.validate.validate(req)
            if (!error) {
                const existing = await this.getRepository.get(req.stepId)
                if (existing) {
                    const updatedAssociation = new KanbanStepAssociation(
                        req.stepId,
                        req.label,
                        req.color,
                        req.badgeBg || existing.badgeBg,
                        req.badgeText || existing.badgeText,
                        req.badgeBorder || existing.badgeBorder,
                        req.stepOrder !== undefined ? req.stepOrder : existing.stepOrder,
                        req.isDefault !== undefined ? req.isDefault : existing.isDefault,
                        existing.isActive,
                        existing.createdAt,
                        new Date()
                    )
                    const updated = await this.repository.update(updatedAssociation)
                    return new UpdateKanbanStepUseCaseResponse(updated, null)
                } else {
                    return new UpdateKanbanStepUseCaseResponse(null, new PreconditionError("Etapa não encontrada."))
                }
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new UpdateKanbanStepUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new UpdateKanbanStepUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class DeleteKanbanStepUseCase {
    constructor(
        private validate: DeleteKanbanStepValidate = new DeleteKanbanStepValidate(),
        private repository: DeleteKanbanStepRepository = new DeleteKanbanStepRepository()
    ) {}

    async execute(req: DeleteKanbanStepUseCaseRequest): Promise<DeleteKanbanStepUseCaseResponse> {
        try {
            const error = await this.validate.validate(req)
            if (!error) {
                await this.repository.delete(req.stepId)
                return new DeleteKanbanStepUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new DeleteKanbanStepUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new DeleteKanbanStepUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class ListKanbanStepUseCase {
    constructor(
        private repository: ListKanbanStepRepository = new ListKanbanStepRepository()
    ) {}

    async execute(_req?: ListKanbanStepUseCaseRequest): Promise<ListKanbanStepUseCaseResponse> {
        try {
            const steps = await this.repository.list()
            return new ListKanbanStepUseCaseResponse(steps, steps.length, null)
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new ListKanbanStepUseCaseResponse(null, 0, new InternalServerError(error.message))
        }
    }
}
