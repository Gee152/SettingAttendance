import { MessageAssociation } from "../../domain/association/association"
import { ErrorEntity } from "../../domain/association/error"
import { MessageStatus } from "../../infra/database/entity/message.entity"

class CreateMessageUseCaseRequest {
  public content: string
  
  constructor(content: string) {
    this.content = content
  }
}

class CreateMessageUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

class GetMessageUseCaseRequest {
  public messageID: string

  constructor(messageID: string) {
    this.messageID = messageID
  }
}

class GetMessageUseCaseResponse {
  public messages: MessageAssociation | null
  public error: ErrorEntity | null

  constructor(messages: MessageAssociation | null, error: ErrorEntity | null) {
    this.messages = messages
    this.error = error
  }
}

class UpdateMessageUseCaseRequest {
  public messageID: string
  public content: string

  constructor(messageID: string, content: string) {
    this.messageID = messageID
    this.content = content
  }
}

class UpdateMessageUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

class DeleteMessageUseCaseRequest {
  public messageID: string

  constructor(messageID: string) {
    this.messageID = messageID
  }
}

class DeleteMessageUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

export {
  CreateMessageUseCaseRequest,
  CreateMessageUseCaseResponse,
  GetMessageUseCaseRequest,
  GetMessageUseCaseResponse,
  UpdateMessageUseCaseRequest,
  UpdateMessageUseCaseResponse,
  DeleteMessageUseCaseRequest,
  DeleteMessageUseCaseResponse
}
