import { Dependent } from "./dependent"

export enum ProposalStatus {
  PENDENTE = 'PENDENTE',
  EM_ANALISE = 'EM_ANALISE',
  APROVADO = 'APROVADO',
  REJEITADO = 'REJEITADO',
  CANCELADO = 'CANCELADO',
}

class ProposalAssociation {
  public proposalID: string | null 
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
  public createdAt: Date 
  public updatedAt: Date

  constructor(
      proposalID: string | null,
      address: string,
      codOperator: string,
      holder: string,
      dependents: boolean,
      dependentsList: Dependent[] | null,
      dateOfBirth: Date,
      cpf: string,
      identity: string | null,
      proposalNumber: string,
      whatsapp: string,
      zipCode: string,
      numberResident: string,
      UF: string,
      contact: string,
      email: string,
      contractReadjustment: Date,
      contractImplementation: Date,
      billExpiration: Date,
      contractPrice: number,
      lead: string,
      plan: string,
      typeOfContract: string,
      office: string,
      broker: string,
      admFee: number,
      supervisor: string,
      status: ProposalStatus,
      createdAt: Date,
      updatedAt: Date
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
      this.createdAt = createdAt 
      this.updatedAt = updatedAt 
  }
}

export { ProposalAssociation, Dependent }
