import { 
  GetPermissionsRequest, GetPermissionsResponse, 
  UpdatePermissionsRequest, UpdatePermissionsResponse,
  ListUsersResponse 
} from "../ucio/permission"
import { getPermissionsByUser, updatePermissionsByUser } from "../../infra/database/permission"
import { getUser, listUser } from "../../infra/database/user"
import { PreconditionError, InternalServerError } from "../association/error"

export class GetPermissionsUseCase {
  async execute(req: GetPermissionsRequest): Promise<GetPermissionsResponse> {
    try {
      if (!req.userID) {
        return new GetPermissionsResponse([], new PreconditionError("userID é obrigatório"))
      }
      const permissions = await getPermissionsByUser(req.userID)
      return new GetPermissionsResponse(permissions, null)
    } catch (error: any) {
      return new GetPermissionsResponse([], new InternalServerError(error.message))
    }
  }
}

export class UpdatePermissionsUseCase {
  async execute(req: UpdatePermissionsRequest): Promise<UpdatePermissionsResponse> {
    try {
      if (!req.targetUserID) {
        return new UpdatePermissionsResponse(false, [], new PreconditionError("targetUserID é obrigatório"))
      }

      // Check if requester is Root or Admin
      if (req.requesterID) {
        const requester = await getUser(req.requesterID)
        if (requester && requester.role !== '1' && (requester.role as any) !== 1 && requester.role !== 'Root' && requester.role !== 'Admin') {
          return new UpdatePermissionsResponse(false, [], new PreconditionError("Apenas usuários com perfil Root podem alterar permissões."))
        }
      }

      const updated = await updatePermissionsByUser(req.targetUserID, req.permissions)
      return new UpdatePermissionsResponse(true, updated, null)
    } catch (error: any) {
      return new UpdatePermissionsResponse(false, [], new InternalServerError(error.message))
    }
  }
}

export class ListUsersUseCase {
  async execute(): Promise<ListUsersResponse> {
    try {
      const users = await listUser()
      const sanitized = users.map(u => ({
        userID: u.userID,
        name: u.name,
        email: u.email,
        role: u.role,
        isActive: u.isActive
      }))
      return new ListUsersResponse(sanitized, null)
    } catch (error: any) {
      return new ListUsersResponse([], new InternalServerError(error.message))
    }
  }
}
