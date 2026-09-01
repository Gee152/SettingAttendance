import {
    createKanbanStep,
    getKanbanStep,
    updateKanbanStep,
    deleteKanbanStep,
    listKanbanStep,
    seedDefaultKanbanSteps
} from "../../infra/database/kanbanStep"
import { KanbanStepAssociation } from "../association/kanbanStep"

class CreateKanbanStepRepository {
    async create(step: KanbanStepAssociation): Promise<KanbanStepAssociation> {
        return await createKanbanStep(step)
    }
}

class GetKanbanStepRepository {
    async get(stepId: string): Promise<KanbanStepAssociation | null> {
        return await getKanbanStep(stepId)
    }
}

class UpdateKanbanStepRepository {
    async update(step: KanbanStepAssociation): Promise<KanbanStepAssociation | null> {
        return await updateKanbanStep(step)
    }
}

class DeleteKanbanStepRepository {
    async delete(stepId: string): Promise<void> {
        return await deleteKanbanStep(stepId)
    }
}

class ListKanbanStepRepository {
    async list(): Promise<KanbanStepAssociation[]> {
        return await listKanbanStep()
    }

    async seed(): Promise<KanbanStepAssociation[]> {
        return await seedDefaultKanbanSteps()
    }
}

export {
    CreateKanbanStepRepository,
    GetKanbanStepRepository,
    UpdateKanbanStepRepository,
    DeleteKanbanStepRepository,
    ListKanbanStepRepository
}
