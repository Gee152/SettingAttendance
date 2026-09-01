import { Request, Response } from 'express';
import {
    CreateStepProspectoUseCase,
    GetStepProspectoUseCase,
    ListStepProspectoUseCase,
    UpdateStepProspectoUseCase,
    DeleteStepProspectoUseCase
} from '../../domain/usecase/StepProspectoUseCase';
import {
    CreateStepProspectoUseCaseRequest,
    GetStepProspectoUseCaseRequest,
    ListStepProspectoUseCaseRequest,
    UpdateStepProspectoUseCaseRequest,
    DeleteStepProspectoUseCaseRequest
} from '../../domain/ucio/stepProspecto';

export class StepProspectoController {
    async create(req: Request, res: Response): Promise<Response> {
        const { uuid, proposalId, fromStep, toStep, description, history, userId } = req.body;
        const request = new CreateStepProspectoUseCaseRequest(
            proposalId,
            toStep,
            description,
            fromStep,
            history,
            userId,
            uuid
        );
        const useCase = new CreateStepProspectoUseCase();
        const response = await useCase.execute(request);
        if (response.error) {
            return res.status(400).json(response);
        }
        return res.status(201).json(response);
    }

    async get(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.body;
        const request = new GetStepProspectoUseCaseRequest(uuid);
        const useCase = new GetStepProspectoUseCase();
        const response = await useCase.execute(request);
        if (response.error) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }

    async list(req: Request, res: Response): Promise<Response> {
        const { proposalId } = req.body;
        const request = new ListStepProspectoUseCaseRequest(proposalId);
        const useCase = new ListStepProspectoUseCase();
        const response = await useCase.execute(request);
        if (response.error) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { uuid, proposalId, fromStep, toStep, description, history, userId } = req.body;
        const request = new UpdateStepProspectoUseCaseRequest(
            uuid,
            proposalId,
            fromStep,
            toStep,
            description,
            history,
            userId
        );
        const useCase = new UpdateStepProspectoUseCase();
        const response = await useCase.execute(request);
        if (response.error) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.body;
        const request = new DeleteStepProspectoUseCaseRequest(uuid);
        const useCase = new DeleteStepProspectoUseCase();
        const response = await useCase.execute(request);
        if (response.error) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
}
