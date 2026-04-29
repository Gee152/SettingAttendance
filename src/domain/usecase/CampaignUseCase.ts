import { CreateCampaignUseCaseRequest, CreateCampaignUseCaseResponse, GetCampaignUseCaseRequest, GetCampaignUseCaseResponse, UpdateCampaignUseCaseRequest, UpdateCampaignUseCaseResponse, DeleteCampaignUseCaseRequest, DeleteCampaignUseCaseResponse } from "../ucio/campaign"
import { CreateCampaignValidate, GetCampaignValidate, UpdateCampaignValidate, DeleteCampaignValidate } from "../validate/campaign"
import { CreateCampaignRepository, GetCampaignRepository, UpdateCampaignRepository, DeleteCampaignRepository } from "../repository/campaign"
import { PreconditionError, InternalServerError, TAG_PRE_CONDITION_ERROR, TAG_INTERNAL_SERVER_ERROR } from "../association/error"
import { v4 as uuidv4 } from 'uuid'

export class CreateCampaignUseCase {
    constructor(
        private validate: CreateCampaignValidate = new CreateCampaignValidate(),
        private repository: CreateCampaignRepository = new CreateCampaignRepository()
    ) {}

    async execute(req: CreateCampaignUseCaseRequest): Promise<CreateCampaignUseCaseResponse> {
        try {
            const error = await this.validate.createCampaignValidate(req)
            if (!error) {
                await this.repository.createCampaign({
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
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new CreateCampaignUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class GetCampaignUseCase {
    constructor(
        private validate: GetCampaignValidate = new GetCampaignValidate(),
        private repository: GetCampaignRepository = new GetCampaignRepository()
    ) {}

    async execute(req: GetCampaignUseCaseRequest): Promise<GetCampaignUseCaseResponse> {
        try {
            const error = await this.validate.getCampaignValidate(req)
            if (!error) {
                const campaign = await this.repository.getCampaign(req.campaignID)
                return new GetCampaignUseCaseResponse(campaign, null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new GetCampaignUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new GetCampaignUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class UpdateCampaignUseCase {
    constructor(
        private validate: UpdateCampaignValidate = new UpdateCampaignValidate(),
        private repository: UpdateCampaignRepository = new UpdateCampaignRepository()
    ) {}

    async execute(req: UpdateCampaignUseCaseRequest): Promise<UpdateCampaignUseCaseResponse> {
        try {
            const error = await this.validate.updateCampaignValidate(req)
            if (!error) {
                const updateCampaign = await this.repository.getCampaign(req.campaignID)
                if (updateCampaign?.campaignID === req.campaignID) {
                    const now = new Date()
                    updateCampaign.userName = req.userName
                    updateCampaign.messages = req.messages
                    updateCampaign.scheduledAt = req.scheduledAt
                    updateCampaign.status = req.status
                    updateCampaign.updatedAt = now
                    await this.repository.updateCampaign(updateCampaign)
                }
                return new UpdateCampaignUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new UpdateCampaignUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new UpdateCampaignUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class DeleteCampaignUseCase {
    constructor(
        private validate: DeleteCampaignValidate = new DeleteCampaignValidate(),
        private repository: DeleteCampaignRepository = new DeleteCampaignRepository()
    ) {}

    async execute(req: DeleteCampaignUseCaseRequest): Promise<DeleteCampaignUseCaseResponse> {
        try {
            const error = await this.validate.deleteCampaignValidate(req)
            if (!error) {
                await this.repository.deleteCampaign(req.campaignID)
                return new DeleteCampaignUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new DeleteCampaignUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new DeleteCampaignUseCaseResponse(new InternalServerError(error.message))
        }
    }
}
