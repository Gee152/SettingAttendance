import { AppDataSource } from "../../data-source"
import { MessageAssociation } from "../../domain/association/association"
import { MessageEntity } from "./entity/message.entity"
import { toMessageEntity, toMessageModel } from "./transforme/message"

async function createMessage(Message: MessageAssociation): Promise<MessageAssociation> {
  const messageTransformed = toMessageModel(Message)
  const repository = AppDataSource.getRepository(MessageEntity)
  const messageTransformeDB = await repository.save(messageTransformed)
  console.log("messageTransformeDB", messageTransformeDB)
  return toMessageEntity(messageTransformeDB)
}


async function getMessage(messageID: string): Promise<MessageAssociation | null> {
  const repository = AppDataSource.getRepository(MessageEntity)
  const messageFromDb = await repository.findOneBy({ messageID })

  return messageFromDb ? toMessageEntity(messageFromDb) : null
}

async function updateMessage(message: MessageAssociation): Promise<MessageAssociation> {
  const repository = AppDataSource.getRepository(MessageEntity)
  const model = toMessageModel(message)

  const { messageID } = model
  await repository.update(messageID as string, model)
  const result = await repository.findOneBy({ messageID: messageID as string })
  console.log("result", result)
  return toMessageEntity(result as MessageEntity)
}

async function deleteMessage(messageID: string): Promise<MessageAssociation> {
  const repository = AppDataSource.getRepository(MessageEntity)
  const messegeFromDb = await repository.findOneBy({ messageID })

  const messegeTransformeDB = toMessageModel(messegeFromDb as MessageAssociation)
  await repository.delete(messegeTransformeDB.messageID as string)

  return toMessageEntity(messegeFromDb as MessageEntity)
}


export {
  createMessage, getMessage, updateMessage, deleteMessage
}