export interface IStepProspecto {
    uuid: string;
    proposalId: string;
    fromStep?: string;
    toStep: string;
    description: string;
    history?: any;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class StepProspectoAssociation implements IStepProspecto {
    public uuid: string;
    public proposalId: string;
    public fromStep?: string;
    public toStep: string;
    public description: string;
    public history?: any;
    public userId?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(
        uuid: string,
        proposalId: string,
        fromStep: string | undefined,
        toStep: string,
        description: string,
        history?: any,
        userId?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.uuid = uuid;
        this.proposalId = proposalId;
        this.fromStep = fromStep;
        this.toStep = toStep;
        this.description = description;
        this.history = history;
        this.userId = userId;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
