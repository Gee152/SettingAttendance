import { createCampaign, getCampaign, updateCampaign, deleteCampaign, listCampaign, countCampaign } from "../../infra/database/campaign"
import { CampaignAssociation } from "../association/association"

class CreateCampaignRepository {
  async createCampaign(Campaign: CampaignAssociation): Promise<CampaignAssociation> {
      return await createCampaign(Campaign)
  }
}

class GetCampaignRepository {
  async getCampaign(CampaignID: string): Promise<CampaignAssociation | null> {
      return await getCampaign(CampaignID)
  }
}

class UpdateCampaignRepository {
  async updateCampaign(Campaign: CampaignAssociation): Promise<CampaignAssociation | null> {
    return await updateCampaign(Campaign)
  }

  async getCampaign(CampaignID: string): Promise<CampaignAssociation | null> {
      return await getCampaign(CampaignID)
  }
}

class DeleteCampaignRepository {
  async deleteCampaign(CampaignID: string): Promise<CampaignAssociation> {
    return await deleteCampaign(CampaignID)
  }
}

class ListCampaignRepository {
  async listCampaign(page?: number, limit?: number, filters?: { status?: string; userName?: string }): Promise<CampaignAssociation[]> {
    return await listCampaign(page, limit, filters)
  }

  async countCampaign(filters?: { status?: string; userName?: string }): Promise<number> {
    return await countCampaign(filters)
  }
}

export {
  CreateCampaignRepository,
  GetCampaignRepository,
  UpdateCampaignRepository,
  DeleteCampaignRepository,
  ListCampaignRepository
}