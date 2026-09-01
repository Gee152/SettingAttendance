import { Router } from "express"
import { CreateCampaignController, GetCampaignController, UpdateCampaignController, DeleteCampaignController } from "../controller/campaign"
import { ExportCampaignController } from "../controller/exportCampaign"

class campaignRouter {
  private router: Router

  constructor() {
    this.router = Router()

    this.router.post('/createCampaign', new CreateCampaignController().createCampaign)
    this.router.post('/getCampaign', new GetCampaignController().getCampaign)
    this.router.post('/updateCampaign', new UpdateCampaignController().updateCampaign)
    this.router.post('/deleteCampaign', new DeleteCampaignController().deleteCampaign)
    this.router.post('/exportCampaignCSV', new ExportCampaignController().exportCSV)
    this.router.post('/exportCampaignPDF', new ExportCampaignController().exportPDF)
  }

  getRouter(): Router {
    return this.router
  }
}

export { 
  campaignRouter 
}