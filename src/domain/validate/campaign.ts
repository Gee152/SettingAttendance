import { CreateCampaignUseCaseRequest, GetCampaignUseCaseRequest, UpdateCampaignUseCaseRequest, DeleteCampaignUseCaseRequest } from "../ucio/campaign"
import { checkEmptyDate, checkStringEmpty } from "./common"

class CreateCampaignValidate {
async createCampaignValidate(req: CreateCampaignUseCaseRequest): Promise<string | null> {
      if (checkStringEmpty(req.userName)) {
          return "O usuário não pode ser vazio."
      }

      if (checkStringEmpty(req.messages)) {
          return "A mensagem não pode ser vazio."
      }

      if (checkEmptyDate(req.scheduledAt)) {
          return "A data não pode ser vazio."
      }

      if (checkStringEmpty(req.status)) {
          return "O status não pode ser vazio."
      }
        return null
    }
}

class GetCampaignValidate {
  async getCampaignValidate(req: GetCampaignUseCaseRequest): Promise<string | null> {
      if (checkStringEmpty(req.campaignID)) {
          return "O identificador não pode ser vazio."
      }
      return null
  }
}

class UpdateCampaignValidate {
  async updateCampaignValidate(req: UpdateCampaignUseCaseRequest): Promise<string | null> {
    if (checkStringEmpty(req.campaignID)) {
        return "O contato não pode ser vazio."
    }

    if (checkStringEmpty(req.userName)) {
          return "O usuário não pode ser vazio."
    }

    if (checkStringEmpty(req.messages)) {
        return "A mensagem não pode ser vazio."
    }

    if (checkEmptyDate(req.scheduledAt)) {
          return "A data não pode ser vazio."
    }

    if (checkStringEmpty(req.status)) {
        return "O status não pode ser vazio."
    }
     return null
  }
}

class DeleteCampaignValidate {
  async deleteCampaignValidate(req: DeleteCampaignUseCaseRequest): Promise<string | null> {
      if (checkStringEmpty(req.campaignID)) {
          return "O identificador não pode ser vazio."
      }
      return null
  }
}

export { 
  CreateCampaignValidate, 
  GetCampaignValidate, 
  UpdateCampaignValidate, 
  DeleteCampaignValidate 
}