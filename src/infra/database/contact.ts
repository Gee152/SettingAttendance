import { AppDataSource } from "../../data-source"
import { ContactAssociation } from "../../domain/association/association"
import { ContactEntity } from "./entity/contact.entity"
import { toContactModel, toContactEntity } from "./transforme/contact"

async function createContact(Contact: ContactAssociation): Promise<ContactAssociation> {
  const contactTransformed = toContactModel(Contact)
  const repository = AppDataSource.getRepository(ContactEntity)
  const ContactTransformeDB = await repository.save(contactTransformed)
  
  return toContactEntity(ContactTransformeDB)
}


async function getContact(contactID: string): Promise<ContactAssociation | null> {
  const repository = AppDataSource.getRepository(ContactEntity)
  const contactFromDb = await repository.findOneBy({ contactID })

  return contactFromDb ? toContactEntity(contactFromDb) : null
}

async function updateContact(contact: ContactAssociation): Promise<ContactAssociation> {
  const repository = AppDataSource.getRepository(ContactEntity)
  const model = toContactModel(contact)
  const { contactID } = model
  await repository.update(contactID as string, model)
  const result = await repository.findOneBy({ contactID: contactID as string })

  return toContactEntity(result as ContactEntity)
}

async function deleteContact(contactID: string): Promise<ContactAssociation> {
  const repository = AppDataSource.getRepository(ContactEntity)
  const contactFromDb = await repository.findOneBy({ contactID })
  const contactTransformeDB = toContactModel(contactFromDb as ContactAssociation)
  await repository.delete(contactTransformeDB.contactID as string)

  return toContactEntity(contactFromDb as ContactEntity)
}

export {
  createContact, getContact, updateContact, deleteContact
}