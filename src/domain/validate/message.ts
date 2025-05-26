import { CreateMessageUseCaseRequest, DeleteMessageUseCaseRequest, GetMessageUseCaseRequest, UpdateMessageUseCaseRequest } from "../ucio/message"
import { checkEmpty } from "./common"

class CreateMessageValidate  {
  async createMessageValidate(req: CreateMessageUseCaseRequest): Promise<string> {
      if (checkEmpty(req.content)) {
          return "O conteúdo não pode ser vazio."
      }
        return ""
    }
}

class GetMessageValidate  {
    async getMessageValidate(req: GetMessageUseCaseRequest): Promise<string> {
        if (checkEmpty(req.messageID)) {
            return "O identificador não pode ser vazio."
        }
          return ""
    }
}

class UpdateMessageValidate {
    async updateMessageValidate(req: UpdateMessageUseCaseRequest): Promise<string> {
        if (checkEmpty(req.messageID)) {
            return "O identificador não pode ser vazio."
        }

        if (checkEmpty(req.content)) {
            return "O conteúdo não pode ser vazio."
        }

        return ""
    }
}

class DeleteMessageValidate {
    async deleteMessage(req:DeleteMessageUseCaseRequest): Promise<string | null> {
        if (checkEmpty(req.messageID)) {
            return 'O identificador não pode ficar vazio.'
        }
        return null
    }
}

export {
  CreateMessageValidate, GetMessageValidate, UpdateMessageValidate,
  DeleteMessageValidate
}