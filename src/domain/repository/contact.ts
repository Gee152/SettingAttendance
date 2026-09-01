
import { createContact, getContact, updateContact, deleteContact, listContact } from "../../infra/database/contact"
import { ContactAssociation } from "../association/association"

class CreateContactRepository {
  async createContact(contact: ContactAssociation): Promise<ContactAssociation> {
      return await createContact(contact)
  }
}

class GetContactRepository {
  async getContact(contactID: string): Promise<ContactAssociation | null> {
      return await getContact(contactID)
  }
}

class UpdateContactRepository {
  async updateContact(contact: ContactAssociation): Promise<ContactAssociation | null> {
    return await updateContact(contact)
  }

  async getContact(contactID: string): Promise<ContactAssociation | null> {
      return await getContact(contactID)
  }
}

class DeleteContactRepository {
  async deleteContact(contactID: string): Promise<ContactAssociation> {
    return await deleteContact(contactID)
  }
}

class ListContactRepository {
  async listContact(): Promise<ContactAssociation[]> {
    return await listContact()
  }
}

export {
  CreateContactRepository, GetContactRepository, UpdateContactRepository, DeleteContactRepository, ListContactRepository
}
