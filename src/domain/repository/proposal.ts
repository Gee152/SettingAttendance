import { createProposal, getProposal, updateProposal, deleteProposal, listProposal } from "../../infra/database/proposal"
import { ProposalAssociation } from "../association/proposal"

class CreateProposalRepository {
    async createProposal(proposal: ProposalAssociation): Promise<ProposalAssociation> {
        return await createProposal(proposal)
    }
}

class GetProposalRepository {
    async getProposal(ID: number): Promise<ProposalAssociation | null> {
        return await getProposal(ID)
    }
}

class UpdateProposalRepository {
    async updateProposal(proposal: ProposalAssociation): Promise<ProposalAssociation | null> {
        return await updateProposal(proposal)
    }
}

class DeleteProposalRepository {
    async deleteProposal(ID: number): Promise<void> {
        return await deleteProposal(ID)
    }
}

class ListProposalRepository {
    async listProposal(): Promise<ProposalAssociation[]> {
        return await listProposal()
    }
}

export {
    CreateProposalRepository, GetProposalRepository, UpdateProposalRepository, DeleteProposalRepository, ListProposalRepository
}
