import { CreateProposalUseCaseRequest, UpdateProposalUseCaseRequest, GetProposalUseCaseRequest, DeleteProposalUseCaseRequest } from "../ucio/proposal"

class CreateProposalValidate {
    async createProposalValidate(req: CreateProposalUseCaseRequest): Promise<string | null> {
        if (!req.address) return "O campo address é obrigatório"
        if (!req.cpf) return "O campo cpf é obrigatório"
        if (!req.email) return "O campo email é obrigatório"
        if (!req.holder) return "O campo holder é obrigatório"
        if (!req.proposalNumber) return "O campo proposalNumber é obrigatório"
        // Return null if all validations pass
        return null
    }
}

class UpdateProposalValidate {
    async updateProposalValidate(req: UpdateProposalUseCaseRequest): Promise<string | null> {
        if (!req.ID) return "O campo ID é obrigatório para atualização"
        if (!req.address) return "O campo address é obrigatório"
        if (!req.cpf) return "O campo cpf é obrigatório"
        if (!req.email) return "O campo email é obrigatório"
        return null
    }
}

class GetProposalValidate {
    async getProposalValidate(req: GetProposalUseCaseRequest): Promise<string | null> {
        if (!req.ID) return "O campo ID é obrigatório"
        return null
    }
}

class DeleteProposalValidate {
    async deleteProposalValidate(req: DeleteProposalUseCaseRequest): Promise<string | null> {
        if (!req.ID) return "O campo ID é obrigatório"
        return null
    }
}

export {
    CreateProposalValidate, UpdateProposalValidate, GetProposalValidate, DeleteProposalValidate
}
