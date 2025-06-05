import { ContactAssociation } from "../../../domain/association/association"
import { ContactEntity } from "../entity/contact.entity"

function toContactEntity(m: ContactEntity): ContactAssociation {
  return new ContactAssociation(
    m.contactID,
    m.userID,
    m.phoneNumber, 
    m.name,
    m.tags,
    m.createdAt,
    m.updatedAt
  )
}

function toContactModel(e: ContactAssociation): ContactEntity {
  return new ContactEntity(
    e.contactID,
    e.userID,
    e.phoneNumber,
    e.name,
    e.tags,
    e.createdAt,
    e.updatedAt
  )
}

export {
  toContactEntity, toContactModel
}
