import { CampaignAssociation } from "../association/association"
import { ErrorEntity } from "../association/error"

class CreateCampaignUseCaseRequest {
  public userName: string
  public messages: string
  public scheduledAt: Date
  public status: string

  constructor(userName: string, messages: string, scheduledAt: Date, status: string) {
    this.userName = userName
    this.messages = messages
    this.scheduledAt = scheduledAt
    this.status = status
  }
}

class CreateCampaignUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  } 
}

class GetCampaignUseCaseRequest {
  public campaignID: string

  constructor(campaignID: string) {
    this.campaignID = campaignID
  }
}

class GetCampaignUseCaseResponse {
  public campaign: CampaignAssociation | null
  public error: ErrorEntity | null

  constructor(campaign: CampaignAssociation | null,error: ErrorEntity | null) {
    this.campaign = campaign
    this.error = error
  }
}

class UpdateCampaignUseCaseRequest {
  public campaignID: string
  public userName: string
  public messages: string
  public scheduledAt: Date
  public status: string

  constructor(campaignID: string,userName: string, messages: string, scheduledAt: Date, status: string) {
    this.campaignID = campaignID
    this.userName = userName
    this.messages = messages
    this.scheduledAt = scheduledAt
    this.status = status
  }
}

class UpdateCampaignUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

class DeleteCampaignUseCaseRequest {
  public campaignID: string

  constructor(campaignID: string) {
    this.campaignID = campaignID
  }
}

class DeleteCampaignUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

export {
  CreateCampaignUseCaseRequest,
  CreateCampaignUseCaseResponse,
  GetCampaignUseCaseRequest,
  GetCampaignUseCaseResponse,
  UpdateCampaignUseCaseRequest,
  UpdateCampaignUseCaseResponse,
  DeleteCampaignUseCaseRequest,
  DeleteCampaignUseCaseResponse
}