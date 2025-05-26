import { MessageAssociation } from "../../../domain/association/association"
import { MessageEntity, MessageStatus } from "../entity/message.entity"

function toMessageEntity(m: MessageEntity): MessageAssociation {
  return new MessageAssociation(
  m.messageID,
  m.content,
  m.status,
  m.createdAt,
  m.updatedAt
  )
}

function toMessageModel(e: MessageAssociation): MessageEntity {
  return new MessageEntity(
    e.messageID,
    e.content,
    e.status as MessageStatus,
    e.createdAt,
    e.updatedAt
  )
}

export {
  toMessageEntity,
  toMessageModel
}