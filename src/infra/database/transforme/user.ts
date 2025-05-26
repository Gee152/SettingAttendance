import { UserAssociation } from "../../../domain/association/association"
import { UserEntity } from "../entity/user.entity"

function toUserEntity(m: UserEntity): UserAssociation {
  return new UserAssociation(
    m.userID,
    m.name,
    m.email,
    m.passwordHash,
    m.createdAt,
    m.updatedAt
  )
}

function toUserModel(e: UserAssociation): UserEntity {
  return new UserEntity(
    e.userID,
    e.name,
    e.email,
    e.passwordHash,
    e.createdAt,
    e.updatedAt
  )
}


export {toUserEntity, toUserModel}