import {
    CreateStepProspectoUseCaseRequest,
    GetStepProspectoUseCaseRequest,
    UpdateStepProspectoUseCaseRequest,
    DeleteStepProspectoUseCaseRequest
} from '../ucio/stepProspecto';

export class CreateStepProspectoValidate {
    async validate(req: CreateStepProspectoUseCaseRequest): Promise<string | null> {
        if (!req.proposalId || req.proposalId.trim() === '') {
            return 'O identificador da proposta (proposalId) é obrigatório.';
        }
        if (!req.toStep || req.toStep.trim() === '') {
            return 'A etapa de destino (toStep) é obrigatória.';
        }
        if (!req.description || req.description.trim() === '') {
            return 'A descrição/motivo do avanço de etapa é obrigatória.';
        }
        return null;
    }
}

export class GetStepProspectoValidate {
    async validate(req: GetStepProspectoUseCaseRequest): Promise<string | null> {
        if (!req.uuid || req.uuid.trim() === '') {
            return 'O identificador único (uuid) é obrigatório.';
        }
        return null;
    }
}

export class UpdateStepProspectoValidate {
    async validate(req: UpdateStepProspectoUseCaseRequest): Promise<string | null> {
        if (!req.uuid || req.uuid.trim() === '') {
            return 'O identificador único (uuid) é obrigatório.';
        }
        return null;
    }
}

export class DeleteStepProspectoValidate {
    async validate(req: DeleteStepProspectoUseCaseRequest): Promise<string | null> {
        if (!req.uuid || req.uuid.trim() === '') {
            return 'O identificador único (uuid) é obrigatório.';
        }
        return null;
    }
}
