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

export {
  createCampaign, 
  getCampaign, 
  updateCampaign, 
  deleteCampaign	
}