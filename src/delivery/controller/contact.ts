import { Request, Response } from "express"
import { CreateContactUseCaseRequest, GetContactUseCaseRequest, UpdateContactUseCaseRequest, DeleteContactUseCaseRequest } from "../../domain/ucio/contact"
import { CreateContactUseCase, GetContactUseCase, UpdateContactUseCase, DeleteContactUseCase } from "../../domain/usecase/ContactUseCase"
import { SuccessResponse } from "../response/response"

class CreateContactController {
  async createContact(req: Request, res: Response): Promise<void> {
      const { userID, name, phoneNumber, tags } = req.body
      const ucReq = new CreateContactUseCaseRequest(userID, name, phoneNumber, tags)
      const usecase = new CreateContactUseCase()
      const ucRes = await usecase.execute(ucReq)
      new SuccessResponse().success(res, ucRes)
  }
}

class GetContactController {
  async getContact(req: Request, res: Response): Promise<void> {
    const { contactID } = req.body
    const ucReq = new GetContactUseCaseRequest(contactID)
    const usecase = new GetContactUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class UpdateContactController {
  async updateContact(req: Request, res: Response): Promise<void> {
    const { contactID, userID, name, phoneNumber, tags } = req.body
    const ucReq = new UpdateContactUseCaseRequest(contactID, userID, name, phoneNumber, tags)
    const usecase = new UpdateContactUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class DeleteContactController {
  async deleteContact(req: Request, res: Response): Promise<void> {
    const { contactID } = req.body
    const ucReq = new DeleteContactUseCaseRequest(contactID)
    const usecase = new DeleteContactUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

export {
  CreateContactController, GetContactController, UpdateContactController, DeleteContactController
}
