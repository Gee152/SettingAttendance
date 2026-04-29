import { Request, Response } from "express"
import { CreateCampaignUseCaseRequest, GetCampaignUseCaseRequest, UpdateCampaignUseCaseRequest, DeleteCampaignUseCaseRequest } from "../../domain/ucio/campaign"
import { CreateCampaignUseCase, GetCampaignUseCase, UpdateCampaignUseCase, DeleteCampaignUseCase } from "../../domain/usecase/CampaignUseCase"
import { SuccessResponse } from "../response/response"

class CreateCampaignController {
  async createCampaign(req: Request, res: Response): Promise<void> {
      const { userName, messages, scheduledAt, status} = req.body
      const ucReq = new CreateCampaignUseCaseRequest(userName, messages, scheduledAt, status)
      const usecase = new CreateCampaignUseCase()
      const ucRes = await usecase.execute(ucReq)
      new SuccessResponse().success(res, ucRes)
  }
}

class GetCampaignController {
  async getCampaign(req: Request, res: Response): Promise<void> {
    const { campaignID } = req.body
    const ucReq = new GetCampaignUseCaseRequest(campaignID)
    const usecase = new GetCampaignUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class UpdateCampaignController {
  async updateCampaign(req: Request, res: Response): Promise<void> {
    const { campaignID, userName, messages, scheduledAt, status } = req.body
    const ucReq = new UpdateCampaignUseCaseRequest(campaignID, userName, messages, scheduledAt, status)
    const usecase = new UpdateCampaignUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class DeleteCampaignController {
  async deleteCampaign(req: Request, res: Response): Promise<void> {
    const { campaignID } = req.body
    const ucReq = new DeleteCampaignUseCaseRequest(campaignID)
    const usecase = new DeleteCampaignUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

export { 
  CreateCampaignController, 
  GetCampaignController, 
  UpdateCampaignController, 
  DeleteCampaignController 
}