import { UserAssociation } from "../association/association"
import { ErrorEntity } from "../association/error"

class CreateUserUseCaseRequest {
  public name: string
  public email: string
  public passwordHash: string

  constructor(name: string, email: string, passwordHash: string) {
    this.name = name,
    this.email = email,
    this.passwordHash = passwordHash
  }
}

class CreateUserUseCaseResponse {
  public user: UserAssociation | null
  public error: ErrorEntity | null

  constructor(user: UserAssociation | null, error: ErrorEntity | null) {
    this.user = user,
    this.error = error
  }
}

class GetLoginUserUseCaseRequest {
  public email: string
  public passwordHash: string

  constructor(email: string, passwordHash: string) {
    this.email = email,
    this.passwordHash = passwordHash
  }
}

class GetLoginUserUseCaseResponse {
  public token: string | null
  public user: UserAssociation | null
  public error: ErrorEntity | null

  constructor(token: string | null, user: UserAssociation | null, error: ErrorEntity | null) {
    this.token = token,
    this.user = user,
    this.error = error
  }
}

class UpdateUserUseCaseRequest {
  public userID: string
  public name: string
  public email: string
  public passwordHash: string

  constructor(userID: string, name: string, email: string, passwordHash: string) {
    this.userID = userID,
    this.name = name,
    this.email = email,
    this.passwordHash = passwordHash
  }
}

class UpdateUserUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

class DeleteUserUseCaseRequest {
  public userID: string

  constructor(userID: string) {
    this.userID = userID
  }
}

class DeleteUserUseCaseResponse {
  public error: ErrorEntity | null

  constructor(error: ErrorEntity | null) {
    this.error = error
  }
}

class StartSessionUserWthatsAppRequest {
  public userID: string
  public session: string

  constructor(userID: string, session: string) {
    this.userID = userID
    this.session = session
  }
}
class StartSessionUserWthatsAppResponse {
  public success: boolean
  public session: string | null
  public error: ErrorEntity | null

  constructor(success: boolean, session: string | null, error: ErrorEntity | null) {
    this.success = success
    this.session = session
    this.error = error
  }
}




export {
  CreateUserUseCaseRequest, CreateUserUseCaseResponse, GetLoginUserUseCaseRequest, 
  GetLoginUserUseCaseResponse, UpdateUserUseCaseRequest, UpdateUserUseCaseResponse,
  DeleteUserUseCaseRequest, DeleteUserUseCaseResponse ,StartSessionUserWthatsAppRequest,
  StartSessionUserWthatsAppResponse
}