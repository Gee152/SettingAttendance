import { AppDataSource } from "../../data-source"
import { KanbanStepAssociation } from "../../domain/association/kanbanStep"
import { KanbanStepModel } from "./entity/kanbanStep.entity"
import { toKanbanStepAssociation, toKanbanStepModel } from "./transforme/kanbanStep"

const INITIAL_DEFAULT_STEPS: KanbanStepAssociation[] = [
    new KanbanStepAssociation(
        "PROSPECTO",
        "Prospecto",
        "#E2773A",
        "bg-primary/15",
        "text-primary",
        "border-primary/30",
        1,
        true,
        true
    ),
    new KanbanStepAssociation(
        "EM_CONTATO",
        "Em Contato",
        "#F59E0B",
        "bg-amber-500/15",
        "text-amber-600 dark:text-amber-400",
        "border-amber-500/30",
        2,
        true,
        true
    ),
    new KanbanStepAssociation(
        "RECOLHIMENTO_DADOS",
        "Recolhimento de Dados",
        "#D97706",
        "bg-amber-600/15",
        "text-amber-700 dark:text-amber-300",
        "border-amber-600/30",
        3,
        true,
        true
    ),
    new KanbanStepAssociation(
        "FLUXO_PAGAMENTO",
        "Fluxo de Pagamento",
        "#8B5CF6",
        "bg-purple-500/15",
        "text-purple-600 dark:text-purple-400",
        "border-purple-500/30",
        4,
        true,
        true
    ),
    new KanbanStepAssociation(
        "CONCLUIDAS",
        "Concluídas",
        "#10B981",
        "bg-emerald-500/15",
        "text-emerald-600 dark:text-emerald-400",
        "border-emerald-500/30",
        5,
        true,
        true
    )
]

async function seedDefaultKanbanSteps(): Promise<KanbanStepAssociation[]> {
    const repository = AppDataSource.getRepository(KanbanStepModel)
    const count = await repository.count()
    if (count === 0) {
        for (const step of INITIAL_DEFAULT_STEPS) {
            const model = toKanbanStepModel(step)
            await repository.save(model)
        }
    }
    return await listKanbanStep()
}

async function createKanbanStep(step: KanbanStepAssociation): Promise<KanbanStepAssociation> {
    const repository = AppDataSource.getRepository(KanbanStepModel)
    const model = toKanbanStepModel(step)
    const saved = await repository.save(model)
    return toKanbanStepAssociation(saved)
}

async function getKanbanStep(stepId: string): Promise<KanbanStepAssociation | null> {
    const repository = AppDataSource.getRepository(KanbanStepModel)
    const stepFromDb = await repository.findOneBy({ stepId, isActive: true })
    return stepFromDb ? toKanbanStepAssociation(stepFromDb) : null
}

async function updateKanbanStep(step: KanbanStepAssociation): Promise<KanbanStepAssociation | null> {
    const repository = AppDataSource.getRepository(KanbanStepModel)
    const model = toKanbanStepModel(step)
    
    if (model.stepId) {
        await repository.update(model.stepId, model)
        const updated = await repository.findOneBy({ stepId: model.stepId })
        return updated ? toKanbanStepAssociation(updated) : null
    }
    return null
}

async function deleteKanbanStep(stepId: string): Promise<void> {
    const repository = AppDataSource.getRepository(KanbanStepModel)
    const stepFromDb = await repository.findOneBy({ stepId })
    if (stepFromDb) {
        stepFromDb.isActive = false
        await repository.save(stepFromDb)
    }
}

async function listKanbanStep(): Promise<KanbanStepAssociation[]> {
    const repository = AppDataSource.getRepository(KanbanStepModel)
    
    // Auto-seed if empty
    const count = await repository.count()
    if (count === 0) {
        for (const step of INITIAL_DEFAULT_STEPS) {
            const model = toKanbanStepModel(step)
            await repository.save(model)
        }
    }

    const steps = await repository.find({
        where: { isActive: true },
        order: { stepOrder: 'ASC', createdAt: 'ASC' }
    })

    return steps.map(s => toKanbanStepAssociation(s))
}

export {
    createKanbanStep,
    getKanbanStep,
    updateKanbanStep,
    deleteKanbanStep,
    listKanbanStep,
    seedDefaultKanbanSteps
}
