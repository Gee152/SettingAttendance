import { StepProspectoAssociation } from '../association/stepProspecto';
import { ErrorEntity } from '../association/error';

export class CreateStepProspectoUseCaseRequest {
    public uuid?: string;
    public proposalId: string;
    public fromStep?: string;
    public toStep: string;
    public description: string;
    public history?: any;
    public userId?: string;

    constructor(
        proposalId: string,
        toStep: string,
        description: string,
        fromStep?: string,
        history?: any,
        userId?: string,
        uuid?: string
    ) {
        this.proposalId = proposalId;
        this.toStep = toStep;
        this.description = description;
        this.fromStep = fromStep;
        this.history = history;
        this.userId = userId;
        this.uuid = uuid;
    }
}

export class CreateStepProspectoUseCaseResponse {
    public stepProspecto: StepProspectoAssociation | null;
    public error: ErrorEntity | null;

    constructor(stepProspecto: StepProspectoAssociation | null, error: ErrorEntity | null) {
        this.stepProspecto = stepProspecto;
        this.error = error;
    }
}

export class GetStepProspectoUseCaseRequest {
    public uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }
}

export class GetStepProspectoUseCaseResponse {
    public stepProspecto: StepProspectoAssociation | null;
    public error: ErrorEntity | null;

    constructor(stepProspecto: StepProspectoAssociation | null, error: ErrorEntity | null) {
        this.stepProspecto = stepProspecto;
        this.error = error;
    }
}

export class ListStepProspectoUseCaseRequest {
    public proposalId?: string;

    constructor(proposalId?: string) {
        this.proposalId = proposalId;
    }
}

export class ListStepProspectoUseCaseResponse {
    public stepsProspecto: StepProspectoAssociation[] | null;
    public total: number;
    public error: ErrorEntity | null;

    constructor(stepsProspecto: StepProspectoAssociation[] | null, total: number, error: ErrorEntity | null) {
        this.stepsProspecto = stepsProspecto;
        this.total = total;
        this.error = error;
    }
}

export class UpdateStepProspectoUseCaseRequest {
    public uuid: string;
    public proposalId?: string;
    public fromStep?: string;
    public toStep?: string;
    public description?: string;
    public history?: any;
    public userId?: string;

    constructor(
        uuid: string,
        proposalId?: string,
        fromStep?: string,
        toStep?: string,
        description?: string,
        history?: any,
        userId?: string
    ) {
        this.uuid = uuid;
        this.proposalId = proposalId;
        this.fromStep = fromStep;
        this.toStep = toStep;
        this.description = description;
        this.history = history;
        this.userId = userId;
    }
}

export class UpdateStepProspectoUseCaseResponse {
    public stepProspecto: StepProspectoAssociation | null;
    public error: ErrorEntity | null;

    constructor(stepProspecto: StepProspectoAssociation | null, error: ErrorEntity | null) {
        this.stepProspecto = stepProspecto;
        this.error = error;
    }
}

export class DeleteStepProspectoUseCaseRequest {
    public uuid: string;

    constructor(uuid: string) {
        this.uuid = uuid;
    }
}

export class DeleteStepProspectoUseCaseResponse {
    public success: boolean;
    public error: ErrorEntity | null;

    constructor(success: boolean, error: ErrorEntity | null) {
        this.success = success;
        this.error = error;
    }
}
