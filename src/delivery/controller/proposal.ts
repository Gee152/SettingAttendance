import { Request, Response } from 'express'
import {
  CreateProposalUseCaseRequest,
  GetProposalUseCaseRequest,
  UpdateProposalUseCaseRequest,
  DeleteProposalUseCaseRequest,
  ListProposalUseCaseRequest
} from "../../domain/ucio/proposal"
import { 
  CreateProposalUseCase, 
  GetProposalUseCase, 
  UpdateProposalUseCase, 
  DeleteProposalUseCase, 
  ListProposalUseCase 
} from "../../domain/usecase/ProposalUseCase"
import { SuccessResponse } from "../response/response"

class CreateProposalController {
    async createProposal(req: Request, res: Response): Promise<void> {
        const { address, codOperator, holder, dependents, dependentsList,
            dateOfBirth, cpf, identity, proposalNumber, whatsapp, 
            zipCode, numberResident, UF, contact, email, 
            contractReadjustment, contractImplementation, billExpiration, 
            contractPrice, lead, plan, typeOfContract, office, 
            broker, admFee, supervisor, status } = req.body

        console.log('req.body',req.body)
        const ucReq = new CreateProposalUseCaseRequest(
            address, codOperator, holder, 
            dependents, dependentsList, dateOfBirth, cpf, 
            identity, proposalNumber, whatsapp,
            zipCode, numberResident, UF, contact, 
            email, contractReadjustment, contractImplementation, 
            billExpiration, contractPrice, lead,
            plan, typeOfContract, office, 
            broker, admFee, supervisor, status
        )
        console.log('ucReq',ucReq)
        const usecase = new CreateProposalUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class GetProposalController {
    async getProposal(req: Request, res: Response): Promise<void> {
        const { proposalID } = req.body
        const ucReq = new GetProposalUseCaseRequest(proposalID)
        const usecase = new GetProposalUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class UpdateProposalController {
    async updateProposal(req: Request, res: Response): Promise<void> {
        const {
            proposalID, address, codOperator, holder, dependents, dependentsList, dateOfBirth,
            cpf, identity, proposalNumber, whatsapp, zipCode,
            numberResident, UF, contact, email, contractReadjustment,
            contractImplementation, billExpiration, contractPrice, lead,
            plan, typeOfContract, office, broker, admFee, supervisor, status 
            } = req.body

        const ucReq = new UpdateProposalUseCaseRequest(
            proposalID, address, codOperator, holder, dependents, dependentsList, dateOfBirth,
            cpf, identity, proposalNumber, whatsapp, zipCode,
            numberResident, UF, contact, email, contractReadjustment,
            contractImplementation, billExpiration, contractPrice, lead,
            plan, typeOfContract, office, broker, admFee, supervisor, status
        )

        const usecase = new UpdateProposalUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class DeleteProposalController {
    async deleteProposal(req: Request, res: Response): Promise<void> {
        const { proposalID } = req.body
        const ucReq = new DeleteProposalUseCaseRequest(proposalID)
        const usecase = new DeleteProposalUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

class ListProposalController {
    async listProposal(req: Request, res: Response): Promise<void> {
        const ucReq = new ListProposalUseCaseRequest()
        const usecase = new ListProposalUseCase()
        const ucRes = await usecase.execute(ucReq)
        new SuccessResponse().success(res, ucRes)
    }
}

export {
    CreateProposalController, GetProposalController, UpdateProposalController, 
    DeleteProposalController, ListProposalController
}
