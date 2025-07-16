import { Request, Response } from "express"
import { TAG_PRE_CONDITION_ERROR, PreconditionError, TAG_INTERNAL_SERVER_ERROR, InternalServerError } from "../../domain/association/error"
import { CreateCampaignRepository, GetCampaignRepository, UpdateCampaignRepository, DeleteCampaignRepository } from "../../domain/repository/campaign"
import { CreateCampaignUseCaseRequest, CreateCampaignUseCaseResponse, GetCampaignUseCaseRequest, GetCampaignUseCaseResponse, UpdateCampaignUseCaseRequest, UpdateCampaignUseCaseResponse, DeleteCampaignUseCaseRequest, DeleteCampaignUseCaseResponse } from "../../domain/ucio/campaign"
import { UpdateUserUseCaseResponse } from "../../domain/ucio/user"
import { CreateCampaignValidate, GetCampaignValidate, UpdateCampaignValidate, DeleteCampaignValidate } from "../../domain/validate/campaign"
import { SuccessResponse } from "../response/response"
import { v4 as uuidv4 } from 'uuid'

class CreateCampaignController {
  async createCampaign(req: Request, res: Response): Promise<void> {
      const { userName, messages, scheduledAt, status} = req.body
      const ucReq = new CreateCampaignUseCaseRequest(userName, messages, scheduledAt, status)

      const validate = new CreateCampaignValidate()
      const repository = new CreateCampaignRepository()

      const usecase = async (req: CreateCampaignUseCaseRequest): Promise<CreateCampaignUseCaseResponse> => {
          try{
              const error = await validate.createCampaignValidate(req)

              if (!error) {
               await repository.createCampaign({
                  campaignID: uuidv4(),
                  userName: req.userName,
                  messages: req.messages,
                  scheduledAt: req.scheduledAt,
                  status: req.status,
                  createdAt: new Date(),
                  updatedAt: new Date()
                })

                return new CreateCampaignUseCaseResponse(null)
              } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new CreateCampaignUseCaseResponse(new PreconditionError(error))
              }
          }catch(error: any) {
            return new CreateCampaignUseCaseResponse(new PreconditionError(error.error))
          }
      }

      try {
        const ucRes = await usecase(ucReq)
        if(ucRes.error) {
          res.status(400).json({ error: ucRes.error })
        }else {
          new SuccessResponse().success(res, ucRes)
        }
      }catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        new CreateCampaignUseCaseResponse(new InternalServerError(error.Campaign))
      }
  }
}

class GetCampaignController {
  async getCampaign(req: Request, res: Response): Promise<void> {
    const { campaignID } = req.body
    const ucReq = new GetCampaignUseCaseRequest(campaignID)

    const validate = new GetCampaignValidate()
    const repository = new GetCampaignRepository()

    const usecase = async (req: GetCampaignUseCaseRequest): Promise<GetCampaignUseCaseResponse> => {
      try {
        const error = await validate.getCampaignValidate(req)

        if (!error) {
          const Campaign = await repository.getCampaign(req.campaignID)
          console.log('getCampaign usecase', req.campaignID)
          return new GetCampaignUseCaseResponse(Campaign, null)
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new GetCampaignUseCaseResponse(null, new PreconditionError(error))
        }
      } catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new GetCampaignUseCaseResponse(null, new PreconditionError(error))
      }
    }

    try {
      const ucRes = await usecase(ucReq)
      console.log("ucRes", ucRes)
      if (ucRes.error) {
        res.status(400).json({ error: ucRes.error })
      } else {
        new SuccessResponse().success(res, ucRes)
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      new CreateCampaignUseCaseResponse(new InternalServerError(error))
    }
  }
}

class UpdateCampaignController {
  async updateCampaign(req: Request, res: Response): Promise<void> {
    const { campaignID, userName, messages, scheduledAt, status } = req.body
    const ucReq = new UpdateCampaignUseCaseRequest(campaignID, userName, messages, scheduledAt, status)

    const validate = new UpdateCampaignValidate()
    const repository = new UpdateCampaignRepository()

    const usecase = async (req: UpdateCampaignUseCaseRequest): Promise<UpdateCampaignUseCaseResponse> => {
      try {
        const error = await validate.updateCampaignValidate(req)

        if (!error) {
          const updateCampaign = await repository.getCampaign(req.campaignID)
          console.log("updateCampaign", updateCampaign)
          if(updateCampaign?.campaignID === req.campaignID) {
            const now = new Date()
            updateCampaign.userName = req.userName
            updateCampaign.messages = req.messages
            updateCampaign.scheduledAt = req.scheduledAt
            updateCampaign.status = req.status
            updateCampaign.updatedAt = now
            await repository.updateCampaign(updateCampaign)
          }
          return new UpdateCampaignUseCaseResponse(null)
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new UpdateCampaignUseCaseResponse(new PreconditionError(error))
        }
      }catch(error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new UpdateCampaignUseCaseResponse(new InternalServerError(error.Campaign))
      }
    }

    try {
      const ucRes = await usecase(ucReq)
      if (ucRes.error) {
        res.status(400).json({ error: ucRes.error})
      } else {
        new SuccessResponse().success(res, ucRes)
      }
    }catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      new UpdateUserUseCaseResponse(new InternalServerError(error))
    }
  }
}

class DeleteCampaignController {
  async deleteCampaign(req: Request, res: Response): Promise<void> {
    const { campaignID } = req.body
    const ucReq = new DeleteCampaignUseCaseRequest(campaignID)

    const validate = new DeleteCampaignValidate()
    const repository = new DeleteCampaignRepository()

    const usecase = async (req: DeleteCampaignUseCaseRequest): Promise<DeleteCampaignUseCaseResponse> => {
      try {
        const error = await validate.deleteCampaignValidate(req)

        if (!error) {
          await repository.deleteCampaign(req.campaignID)
          return new DeleteCampaignUseCaseResponse(null)
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new DeleteCampaignUseCaseResponse(new PreconditionError(error))
        }
      } catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new DeleteCampaignUseCaseResponse(new PreconditionError(error))
      }
    }

    try {
      const ucRes = await usecase(ucReq)
      if (ucRes.error) {
        res.status(400).json({ error: ucRes.error })
      } else {
        new SuccessResponse().success(res, ucRes)
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      new DeleteCampaignUseCaseResponse(new InternalServerError(error))
    }
  }
}

export { 
  CreateCampaignController, 
  GetCampaignController, 
  UpdateCampaignController, 
  DeleteCampaignController 
}