import { CreateProposalUseCaseRequest, UpdateProposalUseCaseRequest, GetProposalUseCaseRequest, DeleteProposalUseCaseRequest } from "../ucio/proposal"

import { ProposalStatus } from "../association/proposal"

class CreateProposalValidate {
    async createProposalValidate(req: CreateProposalUseCaseRequest): Promise<string | null> {
        if (!req.address) return "O campo address é obrigatório"
        if (!req.codOperator) return "O campo codOperator é obrigatório"
        if (!req.holder) return "O campo holder é obrigatório"
        if (!req.dateOfBirth) return "O campo dateOfBirth é obrigatório"
        if (!req.cpf) return "O campo cpf é obrigatório"
        if (!req.proposalNumber) return "O campo proposalNumber é obrigatório"
        if (!req.whatsapp) return "O campo whatsapp é obrigatório"
        if (!req.zipCode) return "O campo zipCode é obrigatório"
        if (!req.numberResident) return "O campo numberResident é obrigatório"
        if (!req.UF) return "O campo UF é obrigatório"
        if (!req.contact) return "O campo contact é obrigatório"
        if (!req.email) return "O campo email é obrigatório"
        if (!req.contractReadjustment) return "O campo contractReadjustment é obrigatório"
        if (!req.contractImplementation) return "O campo contractImplementation é obrigatório"
        if (!req.billExpiration) return "O campo billExpiration é obrigatório"
        if (req.contractPrice === undefined || req.contractPrice === null) return "O campo contractPrice é obrigatório"
        if (!req.lead) return "O campo lead é obrigatório"
        if (!req.plan) return "O campo plan é obrigatório"
        if (!req.typeOfContract) return "O campo typeOfContract é obrigatório"
        if (!req.office) return "O campo office é obrigatório"
        if (!req.broker) return "O campo broker é obrigatório"
        if (req.admFee === undefined || req.admFee === null) return "O campo admFee é obrigatório"
        if (!req.supervisor) return "O campo supervisor é obrigatório"
        if (!req.status) return "O campo status é obrigatório"
        if (!Object.values(ProposalStatus).includes(req.status as ProposalStatus)) return `O campo status deve ser um dos seguintes valores: ${Object.values(ProposalStatus).join(', ')}`

        if (req.dependents === undefined || req.dependents === null) return "O campo dependents é obrigatório"
        if (req.dependents && (!req.dependentsList || req.dependentsList.length === 0)) {
            return "Se houver dependentes, a lista de dependentes não pode estar vazia"
        }
        
        // Return null if all validations pass
        return null
    }
}

class UpdateProposalValidate {
    async updateProposalValidate(req: UpdateProposalUseCaseRequest): Promise<string | null> {
        if (!req.proposalID) return "O campo ID é obrigatório para atualização"
        if (!req.address) return "O campo address é obrigatório"
        if (!req.cpf) return "O campo cpf é obrigatório"
        if (!req.email) return "O campo email é obrigatório"
        // In update, we might allow partial updates, but traditionally 
        // this architecture expects the full object. 
        // For now, I'll keep it consistent with the existing minimal validations 
        // but ensure core identification fields are present.
        return null
    }
}

class GetProposalValidate {
    async getProposalValidate(req: GetProposalUseCaseRequest): Promise<string | null> {
        if (!req.proposalID) return "O campo ID é obrigatório"
        return null
    }
}

class DeleteProposalValidate {
    async deleteProposalValidate(req: DeleteProposalUseCaseRequest): Promise<string | null> {
        if (!req.proposalID) return "O campo ID é obrigatório"
        return null
    }
}

export {
    CreateProposalValidate, UpdateProposalValidate, GetProposalValidate, DeleteProposalValidate
}
