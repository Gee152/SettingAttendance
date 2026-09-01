import { createMessage, deleteMessage, getMessage, updateMessage, listMessage } from "../../infra/database/message"
import { MessageAssociation } from "../association/association"

class CreateMessageRepository {
  async createMessage(message: MessageAssociation): Promise<MessageAssociation> {
      return await createMessage(message)
  }
}

class GetMessageRepository {
  async getMessage(messageID: string): Promise<MessageAssociation | null> {
      return await getMessage(messageID)
  }
}

class UpdateMessageRepository {
  async updateMessage(message: MessageAssociation): Promise<MessageAssociation | null> {
    return await updateMessage(message)
  }

  async getMessage(messageID: string): Promise<MessageAssociation | null> {
      return await getMessage(messageID)
  }
}

class DeleteMessageRepository {
  async deleteMessage(messageID: string): Promise<MessageAssociation> {
    return await deleteMessage(messageID)
  }
}

class ListMessageRepository {
  async listMessage(): Promise<MessageAssociation[]> {
    return await listMessage()
  }
}

export {
  CreateMessageRepository, GetMessageRepository , UpdateMessageRepository, DeleteMessageRepository, ListMessageRepository
}