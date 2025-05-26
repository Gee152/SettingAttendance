import { CreateUserUseCaseRequest, DeleteUserUseCaseRequest, GetLoginUserUseCaseRequest, StartSessionUserWthatsAppRequest } from "../ucio/user"
import { checkEmpty } from "./common"

class CreateUserValidate  {
  async createUserValidate(req: CreateUserUseCaseRequest): Promise<string> {
      if (checkEmpty(req.name)) {
          return "O nome não pode ser vazio."
      }

      if (checkEmpty(req.email)) {
          return "O e-mail não pode ser vazio."
      }

      if (checkEmpty(req.passwordHash)) {
          return "A senha não pode ser vazia."
      }
        return ""
    }
}

class GetLoginUserValidate  {
    async getLoginUserValidate(req: GetLoginUserUseCaseRequest): Promise<string> {
        if (checkEmpty(req.email)) {
            return "O e-mail não pode ser vazio."
        }
  
        if (checkEmpty(req.passwordHash)) {
            return "A senha não pode ser vazia."
        }
          return ""
    }
}

class UpdateUserValidate {
    async updateUserValidate(req: CreateUserUseCaseRequest): Promise<string> {
        if (checkEmpty(req.name)) {
            return "O nome não pode ser vazio."
        }

        if (checkEmpty(req.email)) {
            return "O e-mail não pode ser vazio."
        }

        if (checkEmpty(req.passwordHash)) {
            return "A senha não pode ser vazia."
        }
        return ""
    }
}

class DeleteUserValidate {
    async deleteUser(req:DeleteUserUseCaseRequest): Promise<string | null> {
        if (checkEmpty(req.userID)) {
            return 'O ID não pode ficar vazio.'
        }
        return null
    }
}

class StartSessionWhatsAppValidate {
    async startSessionWhatsAppValidate(req: StartSessionUserWthatsAppRequest): Promise<string> {
        if (checkEmpty(req.userID)) return "O userID não pode ser vazio."
        
        if (checkEmpty(req.session)) return "O session não pode ser vazio."

        return ''
  }
}

export {
    CreateUserValidate, GetLoginUserValidate, UpdateUserValidate , DeleteUserValidate,
    StartSessionWhatsAppValidate
}