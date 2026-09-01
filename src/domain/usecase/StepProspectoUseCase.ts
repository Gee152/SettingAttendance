import { randomUUID } from 'crypto';
import {
    CreateStepProspectoUseCaseRequest,
    CreateStepProspectoUseCaseResponse,
    GetStepProspectoUseCaseRequest,
    GetStepProspectoUseCaseResponse,
    ListStepProspectoUseCaseRequest,
    ListStepProspectoUseCaseResponse,
    UpdateStepProspectoUseCaseRequest,
    UpdateStepProspectoUseCaseResponse,
    DeleteStepProspectoUseCaseRequest,
    DeleteStepProspectoUseCaseResponse
} from '../ucio/stepProspecto';
import {
    CreateStepProspectoValidate,
    GetStepProspectoValidate,
    UpdateStepProspectoValidate,
    DeleteStepProspectoValidate
} from '../validate/stepProspecto';
import {
    CreateStepProspectoRepository,
    GetStepProspectoRepository,
    ListStepProspectoRepository,
    UpdateStepProspectoRepository,
    DeleteStepProspectoRepository
} from '../repository/stepProspecto';
import {
    InternalServerError,
    PreconditionError,
    TAG_INTERNAL_SERVER_ERROR,
    TAG_PRE_CONDITION_ERROR
} from '../association/error';
import { StepProspectoAssociation } from '../association/stepProspecto';

export class CreateStepProspectoUseCase {
    constructor(
        private validate: CreateStepProspectoValidate = new CreateStepProspectoValidate(),
        private repository: CreateStepProspectoRepository = new CreateStepProspectoRepository()
    ) {}

    async execute(req: CreateStepProspectoUseCaseRequest): Promise<CreateStepProspectoUseCaseResponse> {
        try {
            const error = await this.validate.validate(req);
            if (!error) {
                const uuid = req.uuid || randomUUID();
                const step = new StepProspectoAssociation(
                    uuid,
                    req.proposalId,
                    req.fromStep,
                    req.toStep,
                    req.description,
                    req.history,
                    req.userId,
                    new Date(),
                    new Date()
                );
                const saved = await this.repository.create(step);
                return new CreateStepProspectoUseCaseResponse(saved, null);
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error);
                return new CreateStepProspectoUseCaseResponse(null, new PreconditionError(error));
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error);
            return new CreateStepProspectoUseCaseResponse(null, new InternalServerError(error.message));
        }
    }
}

export class GetStepProspectoUseCase {
    constructor(
        private validate: GetStepProspectoValidate = new GetStepProspectoValidate(),
        private repository: GetStepProspectoRepository = new GetStepProspectoRepository()
    ) {}

    async execute(req: GetStepProspectoUseCaseRequest): Promise<GetStepProspectoUseCaseResponse> {
        try {
            const error = await this.validate.validate(req);
            if (!error) {
                const step = await this.repository.get(req.uuid);
                if (!step) {
                    return new GetStepProspectoUseCaseResponse(null, new PreconditionError('Registro de transição não encontrado.'));
                }
                return new GetStepProspectoUseCaseResponse(step, null);
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error);
                return new GetStepProspectoUseCaseResponse(null, new PreconditionError(error));
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error);
            return new GetStepProspectoUseCaseResponse(null, new InternalServerError(error.message));
        }
    }
}

export class ListStepProspectoUseCase {
    constructor(
        private repository: ListStepProspectoRepository = new ListStepProspectoRepository()
    ) {}

    async execute(req?: ListStepProspectoUseCaseRequest): Promise<ListStepProspectoUseCaseResponse> {
        try {
            const list = await this.repository.list(req?.proposalId);
            return new ListStepProspectoUseCaseResponse(list, list.length, null);
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error);
            return new ListStepProspectoUseCaseResponse(null, 0, new InternalServerError(error.message));
        }
    }
}

export class UpdateStepProspectoUseCase {
    constructor(
        private validate: UpdateStepProspectoValidate = new UpdateStepProspectoValidate(),
        private repository: UpdateStepProspectoRepository = new UpdateStepProspectoRepository(),
        private getRepository: GetStepProspectoRepository = new GetStepProspectoRepository()
    ) {}

    async execute(req: UpdateStepProspectoUseCaseRequest): Promise<UpdateStepProspectoUseCaseResponse> {
        try {
            const error = await this.validate.validate(req);
            if (!error) {
                const existing = await this.getRepository.get(req.uuid);
                if (existing) {
                    const updatedAssociation = new StepProspectoAssociation(
                        req.uuid,
                        req.proposalId || existing.proposalId,
                        req.fromStep !== undefined ? req.fromStep : existing.fromStep,
                        req.toStep || existing.toStep,
                        req.description !== undefined ? req.description : existing.description,
                        req.history !== undefined ? req.history : existing.history,
                        req.userId !== undefined ? req.userId : existing.userId,
                        existing.createdAt,
                        new Date()
                    );
                    const updated = await this.repository.update(updatedAssociation);
                    return new UpdateStepProspectoUseCaseResponse(updated, null);
                } else {
                    return new UpdateStepProspectoUseCaseResponse(null, new PreconditionError('Registro de transição não encontrado.'));
                }
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error);
                return new UpdateStepProspectoUseCaseResponse(null, new PreconditionError(error));
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error);
            return new UpdateStepProspectoUseCaseResponse(null, new InternalServerError(error.message));
        }
    }
}

export class DeleteStepProspectoUseCase {
    constructor(
        private validate: DeleteStepProspectoValidate = new DeleteStepProspectoValidate(),
        private repository: DeleteStepProspectoRepository = new DeleteStepProspectoRepository()
    ) {}

    async execute(req: DeleteStepProspectoUseCaseRequest): Promise<DeleteStepProspectoUseCaseResponse> {
        try {
            const error = await this.validate.validate(req);
            if (!error) {
                const deleted = await this.repository.delete(req.uuid);
                return new DeleteStepProspectoUseCaseResponse(deleted, null);
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error);
                return new DeleteStepProspectoUseCaseResponse(false, new PreconditionError(error));
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error);
            return new DeleteStepProspectoUseCaseResponse(false, new InternalServerError(error.message));
        }
    }
}
