import { Request, Response } from 'express'
import {
    CreateKanbanStepUseCaseRequest,
    GetKanbanStepUseCaseRequest,
    UpdateKanbanStepUseCaseRequest,
    DeleteKanbanStepUseCaseRequest,
    ListKanbanStepUseCaseRequest
} from "../../domain/ucio/kanbanStep"
import {
    CreateKanbanStepUseCase,
    GetKanbanStepUseCase,
    UpdateKanbanStepUseCase,
    DeleteKanbanStepUseCase,
    ListKanbanStepUseCase
} from "../../domain/usecase/KanbanStepUseCase"
import { SuccessResponse } from "../response/response"

class CreateKanbanStepController {
    async create(req: Request, res: Response): Promise<void> {
        const { stepId, label, color, badgeBg, badgeText, badgeBorder, stepOrder, isDefault } = req.body

        const ucReq = new CreateKanbanStepUseCaseRequest(
            stepId,
            label,
            color,
            badgeBg,
            badgeText,
            badgeBorder,
            stepOrder,
            isDefault
        )

        const usecase = new CreateKanbanStepUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class GetKanbanStepController {
    async get(req: Request, res: Response): Promise<void> {
        const { stepId } = req.body
        const ucReq = new GetKanbanStepUseCaseRequest(stepId)
        const usecase = new GetKanbanStepUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class UpdateKanbanStepController {
    async update(req: Request, res: Response): Promise<void> {
        const { stepId, label, color, badgeBg, badgeText, badgeBorder, stepOrder, isDefault } = req.body

        const ucReq = new UpdateKanbanStepUseCaseRequest(
            stepId,
            label,
            color,
            badgeBg,
            badgeText,
            badgeBorder,
            stepOrder,
            isDefault
        )

        const usecase = new UpdateKanbanStepUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class DeleteKanbanStepController {
    async delete(req: Request, res: Response): Promise<void> {
        const { stepId } = req.body
        const ucReq = new DeleteKanbanStepUseCaseRequest(stepId)
        const usecase = new DeleteKanbanStepUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class ListKanbanStepController {
    async list(_req: Request, res: Response): Promise<void> {
        const ucReq = new ListKanbanStepUseCaseRequest()
        const usecase = new ListKanbanStepUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

export {
    CreateKanbanStepController,
    GetKanbanStepController,
    UpdateKanbanStepController,
    DeleteKanbanStepController,
    ListKanbanStepController
}
