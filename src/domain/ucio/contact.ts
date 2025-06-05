import { ContactAssociation } from "../association/association"
import { ErrorEntity } from "../association/error"

class CreateContactUseCaseRequest {
  public userID: string
  public name: string
  public phoneNumber: string
  public tags: string[] | null
  
  constructor(userID: string, name: string, phoneNumber: string, tags:string[] | null) {
    this.userID = userID
    this.name = name
    this.phoneNumber = phoneNumber
    this.tags = tags
  }
}

class CreateContactUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

class GetContactUseCaseRequest {
  public contactID: string

  constructor(contactID: string) {
    this.contactID = contactID
  }
}

class GetContactUseCaseResponse {
  public contact: ContactAssociation | null
  public error: ErrorEntity | null

  constructor(contact: ContactAssociation | null,error: ErrorEntity | null) {
    this.contact = contact
    this.error = error
  }
}

class UpdateContactUseCaseRequest {
  public contactID: string
  public userID: string
  public name: string
  public phoneNumber: string
  public tags: string[] | null
  
  constructor(contactID: string, userID: string, name: string, phoneNumber: string, tags:string[] | null) {
    this.contactID = contactID
    this.userID = userID
    this.name = name
    this.phoneNumber = phoneNumber
    this.tags = tags
  }
}

class UpdateContactUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

class DeleteContactUseCaseRequest {
  public contactID: string

  constructor(contactID: string) {
    this.contactID = contactID
  }
}

class DeleteContactUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

export {
  CreateContactUseCaseRequest, CreateContactUseCaseResponse, GetContactUseCaseResponse, GetContactUseCaseRequest,
  UpdateContactUseCaseRequest, UpdateContactUseCaseResponse, DeleteContactUseCaseRequest, DeleteContactUseCaseResponse
}
