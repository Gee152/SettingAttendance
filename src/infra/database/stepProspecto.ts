import { AppDataSource } from '../../data-source';
import { StepProspectoEntity } from './entity/stepProspecto.entity';
import { StepProspectoAssociation } from '../../domain/association/stepProspecto';

export async function createStepProspecto(data: StepProspectoAssociation): Promise<StepProspectoAssociation> {
    const repo = AppDataSource.getRepository(StepProspectoEntity);
    const entity = repo.create({
        uuid: data.uuid,
        proposalId: data.proposalId,
        fromStep: data.fromStep,
        toStep: data.toStep,
        description: data.description,
        history: data.history,
        userId: data.userId
    });
    const saved = await repo.save(entity);
    return new StepProspectoAssociation(
        saved.uuid,
        saved.proposalId,
        saved.fromStep,
        saved.toStep,
        saved.description,
        saved.history,
        saved.userId,
        saved.createdAt,
        saved.updatedAt
    );
}

export async function getStepProspecto(uuid: string): Promise<StepProspectoAssociation | null> {
    const repo = AppDataSource.getRepository(StepProspectoEntity);
    const found = await repo.findOne({ where: { uuid } });
    if (!found) return null;
    return new StepProspectoAssociation(
        found.uuid,
        found.proposalId,
        found.fromStep,
        found.toStep,
        found.description,
        found.history,
        found.userId,
        found.createdAt,
        found.updatedAt
    );
}

export async function listStepProspecto(proposalId?: string): Promise<StepProspectoAssociation[]> {
    const repo = AppDataSource.getRepository(StepProspectoEntity);
    const query = repo.createQueryBuilder('step');
    if (proposalId && proposalId.trim() !== '') {
        query.where('step.proposal_id = :proposalId', { proposalId });
    }
    query.orderBy('step.created_at', 'DESC');
    const list = await query.getMany();
    return list.map(item => new StepProspectoAssociation(
        item.uuid,
        item.proposalId,
        item.fromStep,
        item.toStep,
        item.description,
        item.history,
        item.userId,
        item.createdAt,
        item.updatedAt
    ));
}

export async function updateStepProspecto(data: StepProspectoAssociation): Promise<StepProspectoAssociation | null> {
    const repo = AppDataSource.getRepository(StepProspectoEntity);
    const found = await repo.findOne({ where: { uuid: data.uuid } });
    if (!found) return null;

    found.proposalId = data.proposalId || found.proposalId;
    found.fromStep = data.fromStep !== undefined ? data.fromStep : found.fromStep;
    found.toStep = data.toStep || found.toStep;
    found.description = data.description !== undefined ? data.description : found.description;
    found.history = data.history !== undefined ? data.history : found.history;
    found.userId = data.userId !== undefined ? data.userId : found.userId;

    const saved = await repo.save(found);
    return new StepProspectoAssociation(
        saved.uuid,
        saved.proposalId,
        saved.fromStep,
        saved.toStep,
        saved.description,
        saved.history,
        saved.userId,
        saved.createdAt,
        saved.updatedAt
    );
}

export async function deleteStepProspecto(uuid: string): Promise<boolean> {
    const repo = AppDataSource.getRepository(StepProspectoEntity);
    const result = await repo.delete({ uuid });
    return (result.affected ?? 0) > 0;
}
