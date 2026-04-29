import { ProposalAssociation } from "../../../domain/association/proposal"
import { ProposalModel } from "../entity/proposal.entity"

function toProposalAssociation(m: ProposalModel): ProposalAssociation {
  return new ProposalAssociation(m.proposalID, m.address, m.codOperator, m.holder, m.dependents, m.dependentsList, m.dateOfBirth, m.cpf, m.identity, m.proposalNumber, m.whatsapp,
    m.zipCode, m.numberResident, m.UF, m.contact, m.email, m.contractReadjustment, m.contractImplementation, m.billExpiration, m.contractPrice, m.lead, 
    m.plan, m.typeOfContract, m.office, m.broker, m.admFee, m.supervisor, m.status, m.createdAt, m.updatedAt)
}

function toProposalModel(e: ProposalAssociation): ProposalModel {
  return new ProposalModel(e.proposalID, e.address, e.codOperator, e.holder, e.dependents, e.dependentsList, e.dateOfBirth, e.cpf, e.identity, e.proposalNumber, e.whatsapp,
    e.zipCode, e.numberResident, e.UF, e.contact, e.email, e.contractReadjustment, e.contractImplementation, e.billExpiration, e.contractPrice, e.lead, 
    e.plan, e.typeOfContract, e.office, e.broker, e.admFee, e.supervisor, e.status, true)
}

export {
    toProposalAssociation,
    toProposalModel
}
