/**
 * ============================================================================
 * CONSULTAS SQL DIRETAMENTE RELACIONADAS AOS INDICADORES DO DASHBOARD & ANALYTICS
 * ============================================================================
 * 
 * 1. CONTRATOS ATIVOS / TOTAIS POR STATUS:
 *    SELECT status, COUNT(*), SUM(contract_price) FROM proposals WHERE is_active = true GROUP BY status;
 * 
 * 2. FLUXO DE CAIXA (FATURAMENTO DE CONTRATOS APROVADOS):
 *    SELECT SUM(contract_price) AS fluxo_caixa FROM proposals WHERE status = 'APROVADO' AND is_active = true;
 * 
 * 3. TAXA DE CONVERSÃO (% DE PROPOSTAS APROVADAS SOBRE O TOTAL):
 *    SELECT (COUNT(CASE WHEN status = 'APROVADO' THEN 1 END)::float / NULLIF(COUNT(*), 0)) * 100 AS taxa_conversao FROM proposals WHERE is_active = true;
 * 
 * 4. TEMPO DE PROCESSO (TEMPO MÉDIO ENTRE CRIAÇÃO E FECHAMENTO EM SEGUNDOS):
 *    SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) AS tempo_processo_segundos FROM proposals WHERE status IN ('APROVADO', 'REJEITADO') AND is_active = true;
 * 
 * 5. EVOLUÇÃO TEMPORAL DE VENDAS POR PERÍODO:
 *    SELECT DATE(created_at) AS data_registro, status, COUNT(*) AS quantidade, SUM(contract_price) AS valor_total FROM proposals WHERE is_active = true GROUP BY DATE(created_at), status ORDER BY data_registro ASC;
 * ============================================================================
 */

import { AppDataSource } from "../../data-source"
import { ProposalAssociation } from "../../domain/association/proposal"
import { toProposalAssociation, toProposalModel } from "./transforme/proposal"
import { ProposalModel } from "./entity/proposal.entity"

async function createProposal(proposal: ProposalAssociation): Promise<ProposalAssociation> {
    const proposalTransformed = toProposalModel(proposal)
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalTransformeDB = await repository.save(proposalTransformed)
    
    return toProposalAssociation(proposalTransformeDB)
}

async function getProposal(proposalID: string): Promise<ProposalAssociation | null> {
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalFromDb = await repository.findOneBy({ proposalID, isActive: true })

    return proposalFromDb ? toProposalAssociation(proposalFromDb) : null
}

async function updateProposal(proposal: ProposalAssociation): Promise<ProposalAssociation | null> {
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalModel = toProposalModel(proposal)
    
    if (proposalModel.proposalID) {
        await repository.update(proposalModel.proposalID, proposalModel)
        const result = await repository.findOneBy({ proposalID: proposalModel.proposalID })
        return result ? toProposalAssociation(result) : null
    }
    return null
}

async function deleteProposal(proposalID: string): Promise<void> {
    const repository = AppDataSource.getRepository(ProposalModel)
    const proposalFromDb = await repository.findOneBy({ proposalID })

    if (proposalFromDb) {
        proposalFromDb.isActive = false
        await repository.save(proposalFromDb)
    }
}

async function listProposal(page?: number, limit?: number, filters?: { status?: string; holder?: string; cpf?: string }): Promise<ProposalAssociation[]> {
    const repository = AppDataSource.getRepository(ProposalModel)
    
    const queryBuilder = repository.createQueryBuilder('proposal')
      .where('proposal.isActive = :isActive', { isActive: true })
    
    if (filters?.status) {
      queryBuilder.andWhere('proposal.status = :status', { status: filters.status })
    }
    if (filters?.holder) {
      queryBuilder.andWhere('proposal.holder LIKE :holder', { holder: `%${filters.holder}%` })
    }
    if (filters?.cpf) {
      queryBuilder.andWhere('proposal.cpf = :cpf', { cpf: filters.cpf })
    }
    
    queryBuilder.orderBy('proposal.createdAt', 'DESC')
    
    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit)
    }
    
    const proposalsFromDb = await queryBuilder.getMany()
    return proposalsFromDb.map(proposal => toProposalAssociation(proposal))
}

async function countProposal(filters?: { status?: string; holder?: string; cpf?: string }): Promise<number> {
    const repository = AppDataSource.getRepository(ProposalModel)
    
    const queryBuilder = repository.createQueryBuilder('proposal')
      .where('proposal.isActive = :isActive', { isActive: true })
    
    if (filters?.status) {
      queryBuilder.andWhere('proposal.status = :status', { status: filters.status })
    }
    if (filters?.holder) {
      queryBuilder.andWhere('proposal.holder LIKE :holder', { holder: `%${filters.holder}%` })
    }
    if (filters?.cpf) {
      queryBuilder.andWhere('proposal.cpf = :cpf', { cpf: filters.cpf })
    }
    
    return await queryBuilder.getCount()
}

export {
    createProposal, getProposal, updateProposal, deleteProposal, listProposal, countProposal
}
