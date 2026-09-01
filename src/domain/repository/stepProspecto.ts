import { StepProspectoAssociation } from '../association/stepProspecto';
import {
    createStepProspecto,
    getStepProspecto,
    listStepProspecto,
    updateStepProspecto,
    deleteStepProspecto
} from '../../infra/database/stepProspecto';

export interface ICreateStepProspectoRepository {
    create(data: StepProspectoAssociation): Promise<StepProspectoAssociation>;
}

export class CreateStepProspectoRepository implements ICreateStepProspectoRepository {
    async create(data: StepProspectoAssociation): Promise<StepProspectoAssociation> {
        return await createStepProspecto(data);
    }
}

export interface IGetStepProspectoRepository {
    get(uuid: string): Promise<StepProspectoAssociation | null>;
}

export class GetStepProspectoRepository implements IGetStepProspectoRepository {
    async get(uuid: string): Promise<StepProspectoAssociation | null> {
        return await getStepProspecto(uuid);
    }
}

export interface IListStepProspectoRepository {
    list(proposalId?: string): Promise<StepProspectoAssociation[]>;
}

export class ListStepProspectoRepository implements IListStepProspectoRepository {
    async list(proposalId?: string): Promise<StepProspectoAssociation[]> {
        return await listStepProspecto(proposalId);
    }
}

export interface IUpdateStepProspectoRepository {
    update(data: StepProspectoAssociation): Promise<StepProspectoAssociation | null>;
}

export class UpdateStepProspectoRepository implements IUpdateStepProspectoRepository {
    async update(data: StepProspectoAssociation): Promise<StepProspectoAssociation | null> {
        return await updateStepProspecto(data);
    }
}

export interface IDeleteStepProspectoRepository {
    delete(uuid: string): Promise<boolean>;
}

export class DeleteStepProspectoRepository implements IDeleteStepProspectoRepository {
    async delete(uuid: string): Promise<boolean> {
        return await deleteStepProspecto(uuid);
    }
}
