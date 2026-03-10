import { AppDataSource } from "../../data-source"
import { ProposalAssociation } from "../../domain/association/proposal"
import { toProposalAssociation, toProposalModel } from "./transforme/proposal"
import { ProposalModel } from "./entity/proposal.entity"

async function createProposal(proposal: ProposalAssociation): Promise<ProposalAssociation> {
    const proposalTransformed = toProposalModel(proposal)
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalTransformeDB = await repository.save(proposalTransformed)
    
    return toProposalAssociation(proposalTransformeDB)
}

async function getProposal(ID: number): Promise<ProposalAssociation | null> {
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalFromDb = await repository.findOneBy({ ID, isActive: true })

    return proposalFromDb ? toProposalAssociation(proposalFromDb) : null
}

async function updateProposal(proposal: ProposalAssociation): Promise<ProposalAssociation | null> {
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalModel = toProposalModel(proposal)
    
    if (proposalModel.ID) {
        await repository.update(proposalModel.ID, proposalModel)
        const result = await repository.findOneBy({ ID: proposalModel.ID })
        return result ? toProposalAssociation(result) : null
    }
    return null
}

async function deleteProposal(ID: number): Promise<void> {
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalFromDb = await repository.findOneBy({ ID })

    if (proposalFromDb) {
        proposalFromDb.isActive = false
        await repository.save(proposalFromDb)
    }
}

async function listProposal(): Promise<ProposalAssociation[]> {
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalsFromDb = await repository.find({ where: { isActive: true } })

    return proposalsFromDb.map(proposal => toProposalAssociation(proposal))
}

export {
    createProposal, getProposal, updateProposal, deleteProposal, listProposal
}
