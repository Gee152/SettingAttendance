import { CheckEmailExistsUserUseCaseRequest, CreateUserUseCaseRequest, DeleteUserUseCaseRequest, GetLoginUserUseCaseRequest, StartSessionUserWthatsAppRequest, UpdateUserUseCaseRequest } from "../ucio/user"
import { checkEmpty } from "./common"

class CreateUserValidate {
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

class GetLoginUserValidate {
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

class CheckEmailExistsUserValidate {
    async checkEmailExistsValidate(req: CheckEmailExistsUserUseCaseRequest): Promise<string | null> {
        console.log('validate', req.email)
        if (checkEmpty(req.email)) {
            return "O e-mail não pode ser vazio."
        }

        return null
    }
}

class UpdateUserValidate {
    async updateUserValidate(req: UpdateUserUseCaseRequest): Promise<string> {
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
    async deleteUser(req: DeleteUserUseCaseRequest): Promise<string | null> {
        if (checkEmpty(req.userID)) {
            return 'O ID não pode ficar vazio.'
        }
        return null
    }
}

class StartSessionWhatsAppValidate {
    async startSessionWhatsAppValidate(req: StartSessionUserWthatsAppRequest): Promise<string | null> {
        if (checkEmpty(req.userID)) {
            return 'O ID não pode ficar vazio.'
        }
        return null
    }
}

export {
    CreateUserValidate, GetLoginUserValidate, UpdateUserValidate, DeleteUserValidate,
    StartSessionWhatsAppValidate, CheckEmailExistsUserValidate
}