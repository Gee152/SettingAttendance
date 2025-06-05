import { MessageAssociation } from "../../domain/association/association"
import { ErrorEntity } from "../../domain/association/error"

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

class GetMessageUseCaseResponse { //Deixar só o response com error
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
