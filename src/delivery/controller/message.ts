import { CreateMessageUseCaseRequest, DeleteMessageUseCaseRequest, GetMessageUseCaseRequest, UpdateMessageUseCaseRequest } from "../../domain/ucio/message"
import { CreateMessageUseCase, DeleteMessageUseCase, GetMessageUseCase, UpdateMessageUseCase } from "../../domain/usecase/MessageUseCase"
import { SuccessResponse } from "../response/response"
import { Request, Response } from 'express'

class CreateMessageController {
  async createMessage(req: Request, res: Response): Promise<void> {
      const {content} = req.body
      const ucReq = new CreateMessageUseCaseRequest(content)
      const usecase = new CreateMessageUseCase()
      const ucRes = await usecase.execute(ucReq)
      new SuccessResponse().success(res, ucRes)
  }
}

class GetMessageController {
  async getMessage(req: Request, res: Response): Promise<void> {
    const { messageID } = req.body
    const ucReq = new GetMessageUseCaseRequest(messageID)
    const usecase = new GetMessageUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class UpdateMessageController {
  async updateMessage(req: Request, res: Response): Promise<void> {
    const { messageID, content } = req.body
    const ucReq = new UpdateMessageUseCaseRequest(messageID, content)
    const usecase = new UpdateMessageUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class DeleteMessageController {
  async deleteMessage(req: Request, res: Response): Promise<void> {
    const { messageID } = req.body
    const ucReq = new DeleteMessageUseCaseRequest(messageID)
    const usecase = new DeleteMessageUseCase()
    const ucRes = await usecase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

export {
  CreateMessageController, GetMessageController, UpdateMessageController, DeleteMessageController
}