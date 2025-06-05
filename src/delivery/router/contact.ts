import { Router } from "express"
import { CreateContactController, DeleteContactController, GetContactController, UpdateContactController } from "../controller/contact"

class contactRouter {
  private router: Router

  constructor() {
    this.router = Router()

    this.router.post('/createContact', new CreateContactController().createContact)
    this.router.post('/getContact', new GetContactController().getContact)
    this.router.post('/updateContact', new UpdateContactController().updateContact)
    this.router.post('/deleteContact', new DeleteContactController().deleteContact)
  }

  getRouter(): Router {
    return this.router
  }
}

export {
  contactRouter
}