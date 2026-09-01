import {
  CreateProposalUseCaseRequest, CreateProposalUseCaseResponse,
  GetProposalUseCaseRequest, GetProposalUseCaseResponse,
  UpdateProposalUseCaseRequest, UpdateProposalUseCaseResponse,
  DeleteProposalUseCaseRequest, DeleteProposalUseCaseResponse,
  ListProposalUseCaseRequest, ListProposalUseCaseResponse
} from "../ucio/proposal"
import {
  CreateProposalValidate, UpdateProposalValidate, GetProposalValidate, DeleteProposalValidate
} from "../validate/proposal"
import {
  CreateProposalRepository, GetProposalRepository, UpdateProposalRepository,
  DeleteProposalRepository, ListProposalRepository
} from "../repository/proposal"
import { InternalServerError, PreconditionError, TAG_INTERNAL_SERVER_ERROR, TAG_PRE_CONDITION_ERROR } from "../association/error"
import { ProposalAssociation } from '../association/proposal'
import { v4 as uuidv4 } from 'uuid'

export class CreateProposalUseCase {
    constructor(
        private validate: CreateProposalValidate = new CreateProposalValidate(),
        private repository: CreateProposalRepository = new CreateProposalRepository()
    ) {}

    async execute(req: CreateProposalUseCaseRequest): Promise<CreateProposalUseCaseResponse> {
        try {
            const error = await this.validate.createProposalValidate(req)
            if (!error) {
                const proposal = await this.repository.createProposal({
                    proposalID: uuidv4(), 
                    address: req.address, 
                    codOperator: req.codOperator, 
                    holder: req.holder, 
                    dependents: req.dependents, 
                    dependentsList: req.dependentsList,
                    dateOfBirth: req.dateOfBirth,
                    cpf: req.cpf, 
                    identity: req.identity, 
                    proposalNumber: req.proposalNumber, 
                    whatsapp: req.whatsapp, 
                    zipCode: req.zipCode,
                    numberResident: req.numberResident, 
                    UF: req.UF, 
                    contact: req.contact, 
                    email: req.email, 
                    contractReadjustment: req.contractReadjustment,
                    contractImplementation: req.contractImplementation, 
                    billExpiration: req.billExpiration, 
                    contractPrice: req.contractPrice, 
                    lead: req.lead,
                    plan: req.plan, 
                    typeOfContract: req.typeOfContract, 
                    office: req.office, 
                    broker: req.broker, 
                    admFee: req.admFee, 
                    supervisor: req.supervisor,
                    status: req.status,
                    createdAt: new Date(), 
                    updatedAt: new Date()
                })
                return new CreateProposalUseCaseResponse(proposal, null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new CreateProposalUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new CreateProposalUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class GetProposalUseCase {
    constructor(
        private validate: GetProposalValidate = new GetProposalValidate(),
        private repository: GetProposalRepository = new GetProposalRepository()
    ) {}

    async execute(req: GetProposalUseCaseRequest): Promise<GetProposalUseCaseResponse> {
        try {
            const error = await this.validate.getProposalValidate(req)
            if (!error) {
                const proposal = await this.repository.getProposal(req.proposalID)
                if (!proposal) {
                    return new GetProposalUseCaseResponse(null, new PreconditionError("Proposta não encontrada"))
                }
                return new GetProposalUseCaseResponse(proposal, null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new GetProposalUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new GetProposalUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class UpdateProposalUseCase {
    constructor(
        private validate: UpdateProposalValidate = new UpdateProposalValidate(),
        private repository: UpdateProposalRepository = new UpdateProposalRepository(),
        private getRepository: GetProposalRepository = new GetProposalRepository()
    ) {}

    async execute(req: UpdateProposalUseCaseRequest): Promise<UpdateProposalUseCaseResponse> {
        try {
            const error = await this.validate.updateProposalValidate(req)
            if (!error) {
                const existingProposal = await this.getRepository.getProposal(req.proposalID)
                if (existingProposal) {
                    const proposalAssoc = new ProposalAssociation(
                        req.proposalID, 
                        req.address, 
                        req.codOperator, 
                        req.holder, 
                        req.dependents, 
                        req.dependentsList,
                        req.dateOfBirth ? new Date(req.dateOfBirth) : existingProposal.dateOfBirth,
                        req.cpf, 
                        req.identity, 
                        req.proposalNumber, 
                        req.whatsapp, 
                        req.zipCode,
                        req.numberResident, 
                        req.UF, 
                        req.contact, 
                        req.email, 
                        req.contractReadjustment ? new Date(req.contractReadjustment) : existingProposal.contractReadjustment,
                        req.contractImplementation ? new Date(req.contractImplementation) : existingProposal.contractImplementation, req.billExpiration ? new Date(req.billExpiration) : existingProposal.billExpiration, req.contractPrice, req.lead,
                        req.plan, 
                        req.typeOfContract, 
                        req.office, 
                        req.broker, 
                        req.admFee, 
                        req.supervisor,
                        req.status,
                        existingProposal.createdAt, new Date()
                    )
                    const updated = await this.repository.updateProposal(proposalAssoc)
                    return new UpdateProposalUseCaseResponse(updated, null)
                } else {
                    return new UpdateProposalUseCaseResponse(null, new PreconditionError("Proposta não encontrada"))
                }
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new UpdateProposalUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new UpdateProposalUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class DeleteProposalUseCase {
    constructor(
        private validate: DeleteProposalValidate = new DeleteProposalValidate(),
        private repository: DeleteProposalRepository = new DeleteProposalRepository()
    ) {}

    async execute(req: DeleteProposalUseCaseRequest): Promise<DeleteProposalUseCaseResponse> {
        try {
            const error = await this.validate.deleteProposalValidate(req)
            if (!error) {
                await this.repository.deleteProposal(req.proposalID)
                return new DeleteProposalUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new DeleteProposalUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new DeleteProposalUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class ListProposalUseCase {
    constructor(
        private repository: ListProposalRepository = new ListProposalRepository()
    ) {}

    async execute(req: ListProposalUseCaseRequest): Promise<ListProposalUseCaseResponse> {
        try {
            const page = req.page || 1
            const limit = req.limit || 10
            const filters = {
                status: req.status,
                holder: req.holder,
                cpf: req.cpf
            }

            const [proposals, total] = await Promise.all([
                this.repository.listProposal(page, limit, filters),
                this.repository.countProposal(filters)
            ])

            return new ListProposalUseCaseResponse(proposals, total, page, limit, null)
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new ListProposalUseCaseResponse(null, 0, 1, 10, new InternalServerError(error.message))
        }
    }
}
