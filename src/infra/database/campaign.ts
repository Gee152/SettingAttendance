import { AppDataSource } from "../../data-source"
import { CampaignAssociation } from "../../domain/association/association"
import { CampaignEntity } from "./entity/campaign.entity"
import { toCampaignModel, toCampaignEntity } from "./transforme/campaign"

async function createCampaign(campaign: CampaignAssociation): Promise<CampaignAssociation> {
  const campaignTransformed = toCampaignModel(campaign)
  const repository = AppDataSource.getRepository(CampaignEntity)
  const campaignTransformeDB = await repository.save(campaignTransformed)
  
  return toCampaignEntity(campaignTransformeDB)
}


async function getCampaign(campaignID: string): Promise<CampaignAssociation | null> {
  const repository = AppDataSource.getRepository(CampaignEntity)
  const campaignFromDb = await repository.findOneBy({ campaignID })

  return campaignFromDb ? toCampaignEntity(campaignFromDb) : null
}

async function updateCampaign(campaign: CampaignAssociation): Promise<CampaignAssociation> {
  const repository = AppDataSource.getRepository(CampaignEntity)
  const model = toCampaignModel(campaign)
  const { campaignID } = model
  await repository.update(campaignID as string, model)
  const result = await repository.findOneBy({ campaignID: campaignID as string })

  return toCampaignEntity(result as CampaignEntity)
}

async function deleteCampaign(campaignID: string): Promise<CampaignAssociation> {
  const repository = AppDataSource.getRepository(CampaignEntity)
  const CampaignFromDb = await repository.findOneBy({ campaignID })
  const CampaignTransformeDB = toCampaignModel(CampaignFromDb as CampaignAssociation)
  await repository.delete(CampaignTransformeDB.campaignID as string)

  return toCampaignEntity(CampaignFromDb as CampaignEntity)
}

async function listCampaign(page?: number, limit?: number, filters?: { status?: string; userName?: string }): Promise<CampaignAssociation[]> {
  const repository = AppDataSource.getRepository(CampaignEntity)
  
  const queryBuilder = repository.createQueryBuilder('campaign')
  
  if (filters?.status) {
    queryBuilder.andWhere('campaign.status = :status', { status: filters.status })
  }
  if (filters?.userName) {
    queryBuilder.andWhere('campaign.userName LIKE :userName', { userName: `%${filters.userName}%` })
  }
  
  queryBuilder.orderBy('campaign.createdAt', 'DESC')
  
  if (page && limit) {
    queryBuilder.skip((page - 1) * limit).take(limit)
  }
  
  const campaignsFromDb = await queryBuilder.getMany()
  return campaignsFromDb.map(campaign => toCampaignEntity(campaign))
}

async function countCampaign(filters?: { status?: string; userName?: string }): Promise<number> {
  const repository = AppDataSource.getRepository(CampaignEntity)
  
  const queryBuilder = repository.createQueryBuilder('campaign')
  
  if (filters?.status) {
    queryBuilder.andWhere('campaign.status = :status', { status: filters.status })
  }
  if (filters?.userName) {
    queryBuilder.andWhere('campaign.userName LIKE :userName', { userName: `%${filters.userName}%` })
  }
  
  return await queryBuilder.getCount()
}

export {
  createCampaign, 
  getCampaign, 
  updateCampaign, 
  deleteCampaign,
  listCampaign,
  countCampaign
}