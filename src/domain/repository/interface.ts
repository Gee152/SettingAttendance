import { createUser, deleteUser, getLoginUser, getUpdateLoginUser, getUserWhastsAppSession, updateUser } from "../../infra/database/user"
import { UserAssociation } from "../association/association"

class CreateUserRepository {
  async createUser(User: UserAssociation): Promise<UserAssociation> {
      return await createUser(User)
  }
}

class GetLoginUserRepository {
  async getLoginUser(email: string): Promise<UserAssociation | null> {
      return await getLoginUser(email)
  }
}

class UpdateUserRepository {
  async getUpdateLoginUser(userID: string): Promise<UserAssociation | null> {
    return await getUpdateLoginUser(userID)
  }

  async updateUser(UserID: UserAssociation): Promise<UserAssociation> {
    return await updateUser(UserID)
  }
}

class DeleteUserRepository {
  async deleteUserRepository(userID: string): Promise<UserAssociation> {
    return await deleteUser(userID)
  }
}

class StartSessionWhatsAppRepository {
  async startSessionWhatsAppRepository(userID: string): Promise<UserAssociation | null> {
    return await getUserWhastsAppSession(userID)
  }
}

export {
  CreateUserRepository, GetLoginUserRepository , UpdateUserRepository, DeleteUserRepository,
  StartSessionWhatsAppRepository
}