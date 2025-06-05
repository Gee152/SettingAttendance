import { CreateContactUseCaseRequest, DeleteContactUseCaseRequest, GetContactUseCaseRequest, UpdateContactUseCaseRequest } from "../ucio/contact"
import { checkStringEmpty } from "./common"

class CreateContactValidate {
async createContactValidate(req: CreateContactUseCaseRequest): Promise<string> {
      if (checkStringEmpty(req.phoneNumber)) {
          return "O contato não pode ser vazio."
      }

      if (checkStringEmpty(req.name)) {
          return "O nome não pode ser vazio."
      }
        return ""
    }
}

class GetContactValidate {
  async getContactValidate(req: GetContactUseCaseRequest): Promise<string> {
    console.log('req.contactID', req.contactID)
      if (checkStringEmpty(req.contactID)) {
          return "O identificador não pode ser vazio."
      }
      return ""
  }
}

class UpdateContactValidate {
  async updateContactValidate(req: UpdateContactUseCaseRequest): Promise<string> {
    if (checkStringEmpty(req.contactID)) {
        return "O contato não pode ser vazio."
    }

    if (checkStringEmpty(req.phoneNumber)) {
        return "O contato não pode ser vazio."
    }

    if (checkStringEmpty(req.name)) {
        return "O nome não pode ser vazio."
    }
     return ""  
  }
}

class DeleteContactValidate {
  async deleteContactValidate(req: DeleteContactUseCaseRequest): Promise<string> {
      if (checkStringEmpty(req.contactID)) {
          return "O identificador não pode ser vazio."
      }
      return ""
  }
}

export {
  CreateContactValidate, GetContactValidate, UpdateContactValidate, DeleteContactValidate
}