import { createProposal, getProposal, updateProposal, deleteProposal, listProposal } from "../../infra/database/proposal"
import { ProposalAssociation } from "../association/proposal"

class CreateProposalRepository {
    async createProposal(proposal: ProposalAssociation): Promise<ProposalAssociation> {
        return await createProposal(proposal)
    }
}

class GetProposalRepository {
    async getProposal(proposalID: string): Promise<ProposalAssociation | null> {
        return await getProposal(proposalID)
    }
}

class UpdateProposalRepository {
    async updateProposal(proposal: ProposalAssociation): Promise<ProposalAssociation | null> {
        return await updateProposal(proposal)
    }
}

class DeleteProposalRepository {
    async deleteProposal(proposalID: string): Promise<void> {
        return await deleteProposal(proposalID)
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
