import { Request, Response } from 'express'
import {
  CreateProposalUseCaseRequest, CreateProposalUseCaseResponse,
  GetProposalUseCaseRequest, GetProposalUseCaseResponse,
  UpdateProposalUseCaseRequest, UpdateProposalUseCaseResponse,
  DeleteProposalUseCaseRequest, DeleteProposalUseCaseResponse,
  ListProposalUseCaseRequest, ListProposalUseCaseResponse
} from "../../domain/ucio/proposal"
import {
  CreateProposalValidate, UpdateProposalValidate, GetProposalValidate, DeleteProposalValidate
} from "../../domain/validate/proposal"
import {
  CreateProposalRepository, GetProposalRepository, UpdateProposalRepository,
  DeleteProposalRepository, ListProposalRepository
} from "../../domain/repository/proposal"
import { SuccessResponse } from "../response/response"
import { InternalServerError, PreconditionError, TAG_INTERNAL_SERVER_ERROR, TAG_PRE_CONDITION_ERROR } from "../../domain/association/error"
import { ProposalAssociation } from '../../domain/association/proposal'

class CreateProposalController {
    async createProposal(req: Request, res: Response): Promise<void> {
        const { address, codOperator, holder, dependents, 
            dateOfBirth, cpf, identity, proposalNumber, whatsapp, 
            zipCode, numberResident, UF, contact, email, 
            contractReadjustment, contractImplementation, billExpiration, 
            contractPrice, lead, plan, typeOfContract, office, 
            broker, admFee, supervisor } = req.body

        const ucReq = new CreateProposalUseCaseRequest(
            address, codOperator, holder, 
            dependents, dateOfBirth,cpf, 
            identity, proposalNumber, whatsapp,
            zipCode, numberResident, UF, contact, 
            email, contractReadjustment, contractImplementation, 
            billExpiration, contractPrice, lead,
            plan, typeOfContract, office, 
            broker, admFee, supervisor
            )

        const validate = new CreateProposalValidate()
        const repository = new CreateProposalRepository()

        const usecase = async (req: CreateProposalUseCaseRequest): Promise<CreateProposalUseCaseResponse> => {
            try {
                const error = await validate.createProposalValidate(req)
                if (!error) {
                    const proposalAssoc = new ProposalAssociation(
                        null, req.address, req.codOperator, req.holder, req.dependents, new Date(req.dateOfBirth),
                        req.cpf, req.identity, req.proposalNumber, req.whatsapp, req.zipCode,
                        req.numberResident, req.UF, req.contact, req.email, new Date(req.contractReadjustment),
                        new Date(req.contractImplementation), new Date(req.billExpiration), req.contractPrice, req.lead,
                        req.plan, req.typeOfContract, req.office, req.broker, req.admFee, req.supervisor,
                        new Date(), new Date()
                    )
                    const proposal = await repository.createProposal(proposalAssoc)
                    return new CreateProposalUseCaseResponse(proposal, null)
                } else {
                    console.log(TAG_PRE_CONDITION_ERROR, error)
                    return new CreateProposalUseCaseResponse(null, new PreconditionError(error))
                }
            } catch (error: any) {
                return new CreateProposalUseCaseResponse(null, new PreconditionError(error.message))
            }
        }

        try {
            const ucRes = await usecase(ucReq)
            if (ucRes.error) {
                res.status(400).json({ error: ucRes.error })
            } else {
                new SuccessResponse().success(res, ucRes.proposal)
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            res.status(500).json({ error: new InternalServerError(error.message) })
        }
    }
}

class GetProposalController {
    async getProposal(req: Request, res: Response): Promise<void> {
        const { ID } = req.body
        const ucReq = new GetProposalUseCaseRequest(ID)
        const validate = new GetProposalValidate()
        const repository = new GetProposalRepository()

        const usecase = async (req: GetProposalUseCaseRequest): Promise<GetProposalUseCaseResponse> => {
            try {
                const error = await validate.getProposalValidate(req)
                if (!error) {
                    const proposal = await repository.getProposal(req.ID)
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

        try {
            const ucRes = await usecase(ucReq)
            if (ucRes.error) {
                res.status(400).json({ error: ucRes.error })
            } else {
                new SuccessResponse().success(res, ucRes.proposal)
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            res.status(500).json({ error: new InternalServerError(error.message) })
        }
    }
}

class UpdateProposalController {
    async updateProposal(req: Request, res: Response): Promise<void> {
        const payload = req.body
        const ucReq = new UpdateProposalUseCaseRequest(
            payload.ID, payload.address, payload.codOperator, payload.holder, payload.dependents, payload.dateOfBirth,
            payload.cpf, payload.identity, payload.proposalNumber, payload.whatsapp, payload.zipCode,
            payload.numberResident, payload.UF, payload.contact, payload.email, payload.contractReadjustment,
            payload.contractImplementation, payload.billExpiration, payload.contractPrice, payload.lead,
            payload.plan, payload.typeOfContract, payload.office, payload.broker, payload.admFee, payload.supervisor
        )

        const validate = new UpdateProposalValidate()
        const repository = new UpdateProposalRepository()

        const usecase = async (req: UpdateProposalUseCaseRequest): Promise<UpdateProposalUseCaseResponse> => {
            try {
                const error = await validate.updateProposalValidate(req)
                if (!error) {
                    const existingProposal = await new GetProposalRepository().getProposal(req.ID)
                    if (existingProposal) {
                        const proposalAssoc = new ProposalAssociation(
                            req.ID, req.address, req.codOperator, req.holder, req.dependents, req.dateOfBirth ? new Date(req.dateOfBirth) : existingProposal.dateOfBirth,
                            req.cpf, req.identity, req.proposalNumber, req.whatsapp, req.zipCode,
                            req.numberResident, req.UF, req.contact, req.email, req.contractReadjustment ? new Date(req.contractReadjustment) : existingProposal.contractReadjustment,
                            req.contractImplementation ? new Date(req.contractImplementation) : existingProposal.contractImplementation, req.billExpiration ? new Date(req.billExpiration) : existingProposal.billExpiration, req.contractPrice, req.lead,
                            req.plan, req.typeOfContract, req.office, req.broker, req.admFee, req.supervisor,
                            existingProposal.createdAt, new Date()
                        )
                        const updated = await repository.updateProposal(proposalAssoc)
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

        try {
            const ucRes = await usecase(ucReq)
            if (ucRes.error) {
                res.status(400).json({ error: ucRes.error })
            } else {
                new SuccessResponse().success(res, ucRes.proposal)
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            res.status(500).json({ error: new InternalServerError(error.message) })
        }
    }
}

class DeleteProposalController {
    async deleteProposal(req: Request, res: Response): Promise<void> {
        const { ID } = req.body
        const ucReq = new DeleteProposalUseCaseRequest(ID)
        const validate = new DeleteProposalValidate()
        const repository = new DeleteProposalRepository()

        const usecase = async (req: DeleteProposalUseCaseRequest): Promise<DeleteProposalUseCaseResponse> => {
            try {
                const error = await validate.deleteProposalValidate(req)
                if (!error) {
                    await repository.deleteProposal(req.ID)
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

        try {
            const ucRes = await usecase(ucReq)
            if (ucRes.error) {
                res.status(400).json({ error: ucRes.error })
            } else {
                new SuccessResponse().success(res, { message: 'Proposta deletada com sucesso (logicamente)' })
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            res.status(500).json({ error: new InternalServerError(error.message) })
        }
    }
}

class ListProposalController {
    async listProposal(req: Request, res: Response): Promise<void> {
        const ucReq = new ListProposalUseCaseRequest()
        const repository = new ListProposalRepository()

        const usecase = async (req: ListProposalUseCaseRequest): Promise<ListProposalUseCaseResponse> => {
            try {
                const proposals = await repository.listProposal()
                return new ListProposalUseCaseResponse(proposals, null)
            } catch (error: any) {
                console.log(TAG_INTERNAL_SERVER_ERROR, error)
                return new ListProposalUseCaseResponse(null, new InternalServerError(error.message))
            }
        }

        try {
            const ucRes = await usecase(ucReq)
            if (ucRes.error) {
                res.status(400).json({ error: ucRes.error })
            } else {
                new SuccessResponse().success(res, ucRes.proposals)
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            res.status(500).json({ error: new InternalServerError(error.message) })
        }
    }
}

export {
    CreateProposalController, GetProposalController, UpdateProposalController, DeleteProposalController, ListProposalController
}
