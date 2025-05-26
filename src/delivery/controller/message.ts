import { CreateMessageUseCaseRequest, CreateMessageUseCaseResponse, DeleteMessageUseCaseRequest, DeleteMessageUseCaseResponse, GetMessageUseCaseRequest, GetMessageUseCaseResponse, UpdateMessageUseCaseRequest, UpdateMessageUseCaseResponse } from "../../domain/ucio/message"
import { PreconditionError, TAG_INTERNAL_SERVER_ERROR, InternalServerError, TAG_PRE_CONDITION_ERROR } from "../../domain/association/error"
import { CreateMessageRepository, DeleteMessageRepository, GetMessageRepository, UpdateMessageRepository } from "../../domain/repository/message"
import { CreateMessageValidate, DeleteMessageValidate, GetMessageValidate, UpdateMessageValidate } from "../../domain/validate/message"
import { MessageStatus } from '../../infra/database/entity/message.entity'
import { SuccessResponse } from "../response/response"
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { UpdateUserUseCaseResponse } from "../../domain/ucio/user"

class CreateMessageController {
  async createMessage(req: Request, res: Response): Promise<void> {
      const {content} = req.body
      const ucReq = new CreateMessageUseCaseRequest(content)

      const validate = new CreateMessageValidate()
      const repository = new CreateMessageRepository()

      const usecase = async (req: CreateMessageUseCaseRequest): Promise<CreateMessageUseCaseResponse> => {
          try{
              const error = await validate.createMessageValidate(req)

              if (error) {
                return new CreateMessageUseCaseResponse(new PreconditionError(error))
              }

               await repository.createMessage({
                  messageID: uuidv4(),
                  content: req.content,
                  status: MessageStatus.CREATED,
                  createdAt: new Date(),
                  updatedAt: new Date()
                })
              return new CreateMessageUseCaseResponse(null)
          }catch(error: any) {
            return new CreateMessageUseCaseResponse(new PreconditionError(error.message))
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
        new CreateMessageUseCaseResponse(new InternalServerError(error.message))
      }
  }
}

class GetMessageController {
  async getMessage(req: Request, res: Response): Promise<void> {
    const { messageID } = req.params
    const ucReq = new GetMessageUseCaseRequest(messageID)

    const validate = new GetMessageValidate()
    const repository = new GetMessageRepository()

    const usecase = async (req: GetMessageUseCaseRequest): Promise<GetMessageUseCaseResponse> => {
      try {
        const error = await validate.getMessageValidate(req)

        if (!error) {
          return new GetMessageUseCaseResponse(null, new PreconditionError(error))
        }

        const message = await repository.getMessage(req.messageID)
        return new GetMessageUseCaseResponse(message, null)
      } catch (error: any) {
        return new GetMessageUseCaseResponse(null, new PreconditionError(error.message))
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
      new CreateMessageUseCaseResponse(new InternalServerError(error.message))
    }
  }
}

class UpdateMessageController {
  async updateMessage(req: Request, res: Response): Promise<void> {
    const { messageID, content } = req.body
    const ucReq = new UpdateMessageUseCaseRequest(messageID, content)
    console.log("ucReq", ucReq)
    const validate = new UpdateMessageValidate()
    const repository = new UpdateMessageRepository()

    const usecase = async (req: UpdateMessageUseCaseRequest): Promise<UpdateMessageUseCaseResponse> => {
      try {
        const error = await validate.updateMessageValidate(req)

        if (!error) {
          const updateMessage = await repository.getMessage(req.messageID)
          console.log("updateMessage", updateMessage)
          if(updateMessage?.messageID === req.messageID) {
            const now = new Date()
            updateMessage.content = req.content
            updateMessage.status = MessageStatus.UPDATED
            updateMessage.updatedAt = now
            await repository.updateMessage(updateMessage)
          }
          return new UpdateMessageUseCaseResponse( null )
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new UpdateMessageUseCaseResponse(new PreconditionError(error))
        }
      }catch(error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new UpdateMessageUseCaseResponse(new InternalServerError(error.message))
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
    }catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      new UpdateUserUseCaseResponse(new InternalServerError(error.message))
    }
  }
}

class DeleteMessageController {
  async deleteMessage(req: Request, res: Response): Promise<void> {
    const { messageID } = req.body
    const ucReq = new DeleteMessageUseCaseRequest(messageID)

    const validate = new DeleteMessageValidate()
    const repository = new DeleteMessageRepository()

    const usecase = async (req: DeleteMessageUseCaseRequest): Promise<DeleteMessageUseCaseResponse> => {
      try {
        const error = await validate.deleteMessage(req)

        if (!error) {
          await repository.deleteMessage(req.messageID)
          return new DeleteMessageUseCaseResponse(null)
        } else {
          return new DeleteMessageUseCaseResponse(new PreconditionError(error))
        }
      } catch (error: any) {
        return new DeleteMessageUseCaseResponse(new PreconditionError(error.message))
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
      new DeleteMessageUseCaseResponse(new InternalServerError(error.message))
    }
  }
}

export {
  CreateMessageController, GetMessageController, UpdateMessageController, DeleteMessageController
}