import { AppDataSource } from "../../data-source"
import { UserAssociation } from "../../domain/association/association"
import { toUserEntity, toUserModel } from "./transforme/user"
import { UserEntity } from "../../entity/user.entity"

async function createUser(User: UserAssociation): Promise<UserAssociation> {
  const userTransformed = toUserModel(User)
  const repository = AppDataSource.getRepository(UserEntity);
  const userTransformeDB = await repository.save(userTransformed)

  return toUserEntity(userTransformeDB)
}

async function getLoginUser(email: string): Promise<UserAssociation | null> {
  const repository = AppDataSource.getRepository(UserEntity)
  const userFromDb = await repository.findOneBy({ email })

  return userFromDb ? toUserEntity(userFromDb) : null
}

async function getUpdateLoginUser(userID: string): Promise<UserAssociation | null> {
  const repository = AppDataSource.getRepository(UserEntity)
  const userFromDb = await repository.findOneBy({ userID })

  return userFromDb ? toUserEntity(userFromDb) : null
}

async function updateUser(User: UserAssociation): Promise<UserAssociation> {
  const updateUserTransformed = AppDataSource.getRepository(UserEntity)
  const updateUserModel = toUserModel(User)
  const { userID } = updateUserModel
  
  await updateUserTransformed.update(userID as string, updateUserModel)
  const result = await updateUserTransformed.findOneBy({ userID })

  return toUserEntity(result as UserEntity)
}

async function deleteUser(userID: string): Promise<UserAssociation> {
  const repository = AppDataSource.getRepository(UserEntity)
  const userFromDb = await repository.findOneBy({ userID })
  console.log("userFromDb", userFromDb)
  const userTransformeDB = toUserModel(userFromDb as UserAssociation)
  await repository.delete(userTransformeDB.userID as string)

  return toUserEntity(userFromDb as UserEntity)
}

async function getUserWhastsAppSession(userID: string): Promise<UserAssociation | null> {
  const repository = AppDataSource.getRepository(UserEntity)
  const userFromDb = await repository.findOneBy({ userID })
  console.log("userFromDb", userFromDb)
  return userFromDb ? toUserEntity(userFromDb) : null
}

export {
  createUser, getLoginUser, updateUser , getUpdateLoginUser, deleteUser, getUserWhastsAppSession
}