import { CampaignAssociation } from "../../../domain/association/association"
import { CampaignEntity, CampaignStatus } from "../entity/campaign.entity"

function toCampaignEntity(m: CampaignEntity): CampaignAssociation {
  return new CampaignAssociation(
    m.campaignID,
    m.userName,
    m.messages, 
    m.scheduledAt,
    m.status,
    m.createdAt,
    m.updatedAt
  )
}

function toCampaignModel(e: CampaignAssociation): CampaignEntity {
  return new CampaignEntity(
    e.campaignID,
    e.userName,
    e.messages,
    e.scheduledAt,
    e.status as CampaignStatus,
    e.createdAt,
    e.updatedAt
  )
}

export {
  toCampaignEntity, toCampaignModel
}