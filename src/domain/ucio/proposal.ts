import { ProposalAssociation, Dependent, ProposalStatus } from "../association/proposal"
import { ErrorEntity } from "../association/error"

class CreateProposalUseCaseRequest {
    public address: string
    public codOperator: string
    public holder: string
    public dependents: boolean
    public dependentsList: Dependent[] | null
    public dateOfBirth: Date
    public cpf: string
    public identity: string | null
    public proposalNumber: string
    public whatsapp: string
    public zipCode: string
    public numberResident: string
    public UF: string
    public contact: string
    public email: string
    public contractReadjustment: Date
    public contractImplementation: Date
    public billExpiration: Date
    public contractPrice: number
    public lead: string
    public plan: string
    public typeOfContract: string
    public office: string
    public broker: string
    public admFee: number
    public supervisor: string
    public status: ProposalStatus
  
    constructor(
      address: string, codOperator: string, holder: string, dependents: boolean, dependentsList: Dependent[] | null, dateOfBirth: Date,
      cpf: string, identity: string | null, proposalNumber: string, whatsapp: string, zipCode: string,
      numberResident: string, UF: string, contact: string, email: string, contractReadjustment: Date,
      contractImplementation: Date, billExpiration: Date, contractPrice: number, lead: string,
      plan: string, typeOfContract: string, office: string, broker: string, admFee: number, supervisor: string, status: ProposalStatus
    ) {
      this.address = address
      this.codOperator = codOperator
      this.holder = holder
      this.dependents = dependents
      this.dependentsList = dependentsList
      this.dateOfBirth = dateOfBirth
      this.cpf = cpf
      this.identity = identity
      this.proposalNumber = proposalNumber
      this.whatsapp = whatsapp
      this.zipCode = zipCode
      this.numberResident = numberResident
      this.UF = UF
      this.contact = contact
      this.email = email
      this.contractReadjustment = contractReadjustment
      this.contractImplementation = contractImplementation
      this.billExpiration = billExpiration
      this.contractPrice = contractPrice
      this.lead = lead
      this.plan = plan
      this.typeOfContract = typeOfContract
      this.office = office
      this.broker = broker
      this.admFee = admFee
      this.supervisor = supervisor
      this.status = status
    }
}

class CreateProposalUseCaseResponse {
    public proposal: ProposalAssociation | null
    public error: ErrorEntity | null

    constructor(proposal: ProposalAssociation | null, error: ErrorEntity | null) {
        this.proposal = proposal
        this.error = error
    }
}

class GetProposalUseCaseRequest {
    public proposalID: string

    constructor(proposalID: string) {
        this.proposalID = proposalID
    }
}

class GetProposalUseCaseResponse {
    public proposal: ProposalAssociation | null
    public error: ErrorEntity | null

    constructor(proposal: ProposalAssociation | null, error: ErrorEntity | null) {
        this.proposal = proposal
        this.error = error
    }
}

class UpdateProposalUseCaseRequest {
    public proposalID: string
    public address: string
    public codOperator: string
    public holder: string
    public dependents: boolean
    public dependentsList: Dependent[] | null
    public dateOfBirth: Date
    public cpf: string
    public identity: string | null
    public proposalNumber: string
    public whatsapp: string
    public zipCode: string
    public numberResident: string
    public UF: string
    public contact: string
    public email: string
    public contractReadjustment: Date
    public contractImplementation: Date
    public billExpiration: Date
    public contractPrice: number
    public lead: string
    public plan: string
    public typeOfContract: string
    public office: string
    public broker: string
    public admFee: number
    public supervisor: string
    public status: ProposalStatus

    constructor(
        proposalID: string, address: string, codOperator: string, holder: string, dependents: boolean, dependentsList: Dependent[] | null, dateOfBirth: Date,
        cpf: string, identity: string | null, proposalNumber: string, whatsapp: string, zipCode: string,
        numberResident: string, UF: string, contact: string, email: string, contractReadjustment: Date,
        contractImplementation: Date, billExpiration: Date, contractPrice: number, lead: string,
        plan: string, typeOfContract: string, office: string, broker: string, admFee: number, supervisor: string, status: ProposalStatus
    ) {
        this.proposalID = proposalID
        this.address = address
        this.codOperator = codOperator
        this.holder = holder
        this.dependents = dependents
        this.dependentsList = dependentsList
        this.dateOfBirth = dateOfBirth
        this.cpf = cpf
        this.identity = identity
        this.proposalNumber = proposalNumber
        this.whatsapp = whatsapp
        this.zipCode = zipCode
        this.numberResident = numberResident
        this.UF = UF
        this.contact = contact
        this.email = email
        this.contractReadjustment = contractReadjustment
        this.contractImplementation = contractImplementation
        this.billExpiration = billExpiration
        this.contractPrice = contractPrice
        this.lead = lead
        this.plan = plan
        this.typeOfContract = typeOfContract
        this.office = office
        this.broker = broker
        this.admFee = admFee
        this.supervisor = supervisor
        this.status = status
    }
}

class UpdateProposalUseCaseResponse {
    public proposal: ProposalAssociation | null
    public error: ErrorEntity | null

    constructor(proposal: ProposalAssociation | null, error: ErrorEntity | null) {
        this.proposal = proposal
        this.error = error
    }
}

class DeleteProposalUseCaseRequest {
    public proposalID: string

    constructor(proposalID: string) {
        this.proposalID = proposalID
    }
}

class DeleteProposalUseCaseResponse {
    public error: ErrorEntity | null

    constructor(error: ErrorEntity | null) {
        this.error = error
    }
}

class ListProposalUseCaseRequest {
    public page?: number
    public limit?: number
    public status?: string
    public holder?: string
    public cpf?: string

    constructor(page?: number, limit?: number, status?: string, holder?: string, cpf?: string) {
        this.page = page
        this.limit = limit
        this.status = status
        this.holder = holder
        this.cpf = cpf
    }
}

class ListProposalUseCaseResponse {
    public proposals: ProposalAssociation[] | null
    public total: number
    public page: number
    public limit: number
    public error: ErrorEntity | null

    constructor(proposals: ProposalAssociation[] | null, total: number, page: number, limit: number, error: ErrorEntity | null) {
        this.proposals = proposals
        this.total = total
        this.page = page
        this.limit = limit
        this.error = error
    }
}

export {
    CreateProposalUseCaseRequest, CreateProposalUseCaseResponse,
    GetProposalUseCaseRequest, GetProposalUseCaseResponse,
    UpdateProposalUseCaseRequest, UpdateProposalUseCaseResponse,
    DeleteProposalUseCaseRequest, DeleteProposalUseCaseResponse,
    ListProposalUseCaseRequest, ListProposalUseCaseResponse
}
