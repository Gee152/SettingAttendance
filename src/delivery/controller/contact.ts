import { Request, Response } from "express"
import { PreconditionError, TAG_INTERNAL_SERVER_ERROR, InternalServerError, TAG_PRE_CONDITION_ERROR } from "../../domain/association/error"
import { CreateContactRepository, GetContactRepository, UpdateContactRepository, DeleteContactRepository } from "../../domain/repository/contact"
import { CreateContactUseCaseRequest, CreateContactUseCaseResponse, GetContactUseCaseRequest, GetContactUseCaseResponse, UpdateContactUseCaseRequest, UpdateContactUseCaseResponse, DeleteContactUseCaseRequest, DeleteContactUseCaseResponse } from "../../domain/ucio/contact"
import { UpdateUserUseCaseResponse } from "../../domain/ucio/user"
import { CreateContactValidate, GetContactValidate, UpdateContactValidate, DeleteContactValidate } from "../../domain/validate/contact"
import { SuccessResponse } from "../response/response"
import { v4 as uuidv4 } from 'uuid'

class CreateContactController {
  async createContact(req: Request, res: Response): Promise<void> {
      const { userID, name, phoneNumber, tags } = req.body
      const ucReq = new CreateContactUseCaseRequest(userID, name, phoneNumber, tags)

      const validate = new CreateContactValidate()
      const repository = new CreateContactRepository()

      const usecase = async (req: CreateContactUseCaseRequest): Promise<CreateContactUseCaseResponse> => {
          try{
              const error = await validate.createContactValidate(req)

              if (!error) {
               await repository.createContact({
                  contactID: uuidv4(),
                  userID: req.userID,
                  name: req.name,
                  phoneNumber: req.phoneNumber,
                  tags: req.tags,
                  createdAt: new Date(),
                  updatedAt: new Date()
                })

                return new CreateContactUseCaseResponse(null)
              } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new CreateContactUseCaseResponse(new PreconditionError(error))
              }
          }catch(error: any) {
            return new CreateContactUseCaseResponse(new PreconditionError(error.error))
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
        new CreateContactUseCaseResponse(new InternalServerError(error.Contact))
      }
  }
}

class GetContactController {
  async getContact(req: Request, res: Response): Promise<void> {
    const { contactID } = req.body
    const ucReq = new GetContactUseCaseRequest(contactID)

    const validate = new GetContactValidate()
    const repository = new GetContactRepository()

    const usecase = async (req: GetContactUseCaseRequest): Promise<GetContactUseCaseResponse> => {
      try {
        const error = await validate.getContactValidate(req)

        if (!error) {
          const contact = await repository.getContact(req.contactID)
          console.log('getContact usecase', req.contactID)
          return new GetContactUseCaseResponse(contact, null)
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new GetContactUseCaseResponse(null, new PreconditionError(error))
        }
      } catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new GetContactUseCaseResponse(null, new PreconditionError(error))
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
      new CreateContactUseCaseResponse(new InternalServerError(error))
    }
  }
}

class UpdateContactController {
  async updateContact(req: Request, res: Response): Promise<void> {
    const { contactID, userID, name, phoneNumber, tags } = req.body
    const ucReq = new UpdateContactUseCaseRequest(contactID, userID, name, phoneNumber, tags)

    const validate = new UpdateContactValidate()
    const repository = new UpdateContactRepository()

    const usecase = async (req: UpdateContactUseCaseRequest): Promise<UpdateContactUseCaseResponse> => {
      try {
        const error = await validate.updateContactValidate(req)

        if (!error) {
          const updateContact = await repository.getContact(req.contactID)
          console.log("updateContact", updateContact)
          if(updateContact?.contactID === req.contactID) {
            const now = new Date()
            updateContact.name = req.name
            updateContact.phoneNumber = req.phoneNumber
            updateContact.tags = req.tags
            updateContact.updatedAt = now
            await repository.updateContact(updateContact)
          }
          return new UpdateContactUseCaseResponse(null)
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new UpdateContactUseCaseResponse(new PreconditionError(error))
        }
      }catch(error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new UpdateContactUseCaseResponse(new InternalServerError(error.Contact))
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

class DeleteContactController {
  async deleteContact(req: Request, res: Response): Promise<void> {
    const { contactID } = req.body
    const ucReq = new DeleteContactUseCaseRequest(contactID)

    const validate = new DeleteContactValidate()
    const repository = new DeleteContactRepository()

    const usecase = async (req: DeleteContactUseCaseRequest): Promise<DeleteContactUseCaseResponse> => {
      try {
        const error = await validate.deleteContactValidate(req)

        if (!error) {
          await repository.deleteContact(req.contactID)
          return new DeleteContactUseCaseResponse(null)
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new DeleteContactUseCaseResponse(new PreconditionError(error))
        }
      } catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new DeleteContactUseCaseResponse(new PreconditionError(error))
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
      new DeleteContactUseCaseResponse(new InternalServerError(error))
    }
  }
}

export {
  CreateContactController, GetContactController, UpdateContactController, DeleteContactController
}
