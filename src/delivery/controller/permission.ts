import { Request, Response } from 'express'
import { GetPermissionsUseCase, UpdatePermissionsUseCase, ListUsersUseCase } from '../../domain/usecase/PermissionUseCase'
import { GetPermissionsRequest, UpdatePermissionsRequest } from '../../domain/ucio/permission'
import { SuccessResponse } from '../response/response'

export class GetPermissionsController {
  async getPermissions(req: Request, res: Response): Promise<void> {
    const { userID } = req.body
    const ucReq = new GetPermissionsRequest(userID)
    const useCase = new GetPermissionsUseCase()

    const ucRes = await useCase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

export class UpdatePermissionsController {
  async updatePermissions(req: Request, res: Response): Promise<void> {
    const { requesterID, targetUserID, permissions } = req.body
    const ucReq = new UpdatePermissionsRequest(requesterID, targetUserID, permissions)
    const useCase = new UpdatePermissionsUseCase()

    const ucRes = await useCase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

export class ListUsersController {
  async listUsers(req: Request, res: Response): Promise<void> {
    const useCase = new ListUsersUseCase()
    const ucRes = await useCase.execute()
    new SuccessResponse().success(res, ucRes)
  }
}
