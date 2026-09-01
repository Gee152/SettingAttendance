import { CreateUserRepository, DeleteUserRepository, GetLoginUserRepository, GetUserRepository, UpdateUserRepository, StartSessionWhatsAppRepository, CheckEmailExistsUserRepository } from "../repository/user"
import { 
  CreateUserUseCaseRequest, CreateUserUseCaseResponse, 
  GetLoginUserUseCaseRequest, GetLoginUserUseCaseResponse, 
  UpdateUserUseCaseRequest, UpdateUserUseCaseResponse,
  DeleteUserUseCaseRequest, DeleteUserUseCaseResponse,
  CheckEmailExistsUserUseCaseRequest, CheckEmailExistsUserUseCaseResponse,
  StartSessionUserWthatsAppRequest, StartSessionUserWthatsAppResponse,
  GetUserUseCaseRequest, GetUserUseCaseResponse
} from "../ucio/user"
import { CreateUserValidate, DeleteUserValidate, GetLoginUserValidate, UpdateUserValidate, CheckEmailExistsUserValidate, StartSessionWhatsAppValidate, GetUserValidate } from "../validate/user"
import { PreconditionError, InternalServerError, TAG_PRE_CONDITION_ERROR, TAG_INTERNAL_SERVER_ERROR } from "../association/error"
import { UserTokenPayload } from "../association/UserTokenPayload"
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export class CreateUserUseCase {
  constructor(
    private validate: CreateUserValidate = new CreateUserValidate(),
    private repository: CreateUserRepository = new CreateUserRepository(),
    private loginRepo: GetLoginUserRepository = new GetLoginUserRepository()
  ) {}

  async execute(req: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    try {
      const error = await this.validate.createUserValidate(req)
      if (!error) {
        const existingUser = await this.loginRepo.getLoginUser(req.email)
        if (existingUser) {
          return new CreateUserUseCaseResponse(null, new PreconditionError("Este e-mail já está cadastrado no sistema."))
        }

        const hashedPassword = await bcrypt.hash(req.passwordHash, 10)
        const user = await this.repository.createUser({
          userID: uuidv4(),
          name: req.name,
          email: req.email,
          passwordHash: hashedPassword,
          role: '0',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        return new CreateUserUseCaseResponse(user, null)
      } else {
        console.log(TAG_PRE_CONDITION_ERROR, error)
        return new CreateUserUseCaseResponse(null, new PreconditionError(error))
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      return new CreateUserUseCaseResponse(null, new InternalServerError(error.message))
    }
  }
}

export class LoginUserUseCase {
  constructor(
    private validate: GetLoginUserValidate = new GetLoginUserValidate(),
    private repository: GetLoginUserRepository = new GetLoginUserRepository()
  ) {}

  async execute(req: GetLoginUserUseCaseRequest): Promise<GetLoginUserUseCaseResponse> {
    try {
      const error = await this.validate.getLoginUserValidate(req)
      if (!error) {
        const user = await this.repository.getLoginUser(req.email)
        
        if (!user || !(await bcrypt.compare(req.passwordHash, user.passwordHash))) {
          return new GetLoginUserUseCaseResponse(null, null, new PreconditionError("Usuário não cadastrado ou senha inválida"))
        }

        const payload: UserTokenPayload = {
          userID: user.userID,
          name: user.name,
          email: user.email
        }
        const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: '7d' })

        return new GetLoginUserUseCaseResponse(token, user, null)
      } else {
        console.log(TAG_PRE_CONDITION_ERROR, error)
        return new GetLoginUserUseCaseResponse(null, null, new PreconditionError(error))
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      return new GetLoginUserUseCaseResponse(null, null, new InternalServerError(error.message))
    }
  }
}

export class UpdateUserUseCase {
  constructor(
    private validate: UpdateUserValidate = new UpdateUserValidate(),
    private repository: UpdateUserRepository = new UpdateUserRepository()
  ) {}

  async execute(req: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    try {
      const error = await this.validate.updateUserValidate(req)
      if (!error) {
        const updateUser = await this.repository.updateLoginUser(req.userID)
        if (updateUser?.userID === req.userID) {
          const now = new Date()
          updateUser.name = req.name
          updateUser.email = req.email
          updateUser.passwordHash = req.passwordHash
          updateUser.updatedAt = now
          await this.repository.updateUser(updateUser)
        }
        return new UpdateUserUseCaseResponse(null)
      } else {
        console.log(TAG_PRE_CONDITION_ERROR, error)
        return new UpdateUserUseCaseResponse(new PreconditionError(error))
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      return new UpdateUserUseCaseResponse(new InternalServerError(error.message))
    }
  }
}

export class DeleteUserUseCase {
  constructor(
    private validate: DeleteUserValidate = new DeleteUserValidate(),
    private repository: DeleteUserRepository = new DeleteUserRepository()
  ) {}

  async execute(req: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    try {
      const error = await this.validate.deleteUser(req)
      if (!error) {
        await this.repository.deleteUserRepository(req.userID)
        return new DeleteUserUseCaseResponse(null)
      } else {
        console.log(TAG_PRE_CONDITION_ERROR, error)
        return new DeleteUserUseCaseResponse(new PreconditionError(error))
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      return new DeleteUserUseCaseResponse(new InternalServerError(error.message))
    }
  }
}

export class CheckEmailExistsUserUseCase {
  constructor(
    private validate: CheckEmailExistsUserValidate = new CheckEmailExistsUserValidate(),
    private repository: GetLoginUserRepository = new GetLoginUserRepository()
  ) {}

  async execute(req: CheckEmailExistsUserUseCaseRequest): Promise<CheckEmailExistsUserUseCaseResponse> {
    try {
      const error = await this.validate.checkEmailExistsValidate(req)

      if (!error) {
        const user = await this.repository.getLoginUser(req.email)

        if (req.email !== user?.email) {
          return new CheckEmailExistsUserUseCaseResponse(new PreconditionError("Email não encontrado"))
        }

        return new CheckEmailExistsUserUseCaseResponse(null)
      } else {
        console.log(TAG_PRE_CONDITION_ERROR, error)
        return new CheckEmailExistsUserUseCaseResponse(new PreconditionError("Email já cadastrado"))
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      return new CheckEmailExistsUserUseCaseResponse(new InternalServerError(error.message))
    }
  }
}

export class StartSessionWhatsAppUseCase {
  constructor(
    private validate: StartSessionWhatsAppValidate = new StartSessionWhatsAppValidate(),
    private repository: StartSessionWhatsAppRepository = new StartSessionWhatsAppRepository()
  ) {}

  async execute(req: StartSessionUserWthatsAppRequest): Promise<StartSessionUserWthatsAppResponse> {
    try {
      const error = await this.validate.startSessionWhatsAppValidate(req)
      if (!error) {
        const user = await this.repository.startSessionWhatsAppRepository(req.userID)
        if (user) {
          return new StartSessionUserWthatsAppResponse(true, req.session, req.userID, null)
        } else {
          return new StartSessionUserWthatsAppResponse(false, null, req.userID, new PreconditionError("Usuário não encontrado"))
        }
      } else {
        console.log(TAG_PRE_CONDITION_ERROR, error)
        return new StartSessionUserWthatsAppResponse(false, null, req.userID, new PreconditionError(error))
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      return new StartSessionUserWthatsAppResponse(false, null, req.userID, new InternalServerError(error.message))
    }
  }
}

export class GetUserUseCase {
  constructor(
    private validate: GetUserValidate = new GetUserValidate(),
    private repository: GetUserRepository = new GetUserRepository()
  ) {}

  async execute(req: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    try {
      const error = await this.validate.getUserValidate(req)
      if (!error) {
        const user = await this.repository.getUser(req.userID)
        if (!user) {
          return new GetUserUseCaseResponse(null, new PreconditionError("Usuário não encontrado"))
        }
        return new GetUserUseCaseResponse(user, null)
      } else {
        console.log(TAG_PRE_CONDITION_ERROR, error)
        return new GetUserUseCaseResponse(null, new PreconditionError(error))
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      return new GetUserUseCaseResponse(null, new InternalServerError(error.message))
    }
  }
}
