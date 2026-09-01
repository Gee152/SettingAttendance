import { ErrorEntity } from "../association/error"
import { PermissionEntity } from "../../infra/database/entity/permission.entity"

export class GetPermissionsRequest {
  public userID: string

  constructor(userID: string) {
    this.userID = userID
  }
}

export class GetPermissionsResponse {
  public permissions: PermissionEntity[]
  public error: ErrorEntity | null

  constructor(permissions: PermissionEntity[], error: ErrorEntity | null = null) {
    this.permissions = permissions
    this.error = error
  }
}

export interface PermissionInput {
  module: string
  canRead: boolean
  canWrite: boolean
  canDelete: boolean
}

export class UpdatePermissionsRequest {
  public requesterID: string
  public targetUserID: string
  public permissions: PermissionInput[]

  constructor(requesterID: string, targetUserID: string, permissions: PermissionInput[]) {
    this.requesterID = requesterID
    this.targetUserID = targetUserID
    this.permissions = permissions
  }
}

export class UpdatePermissionsResponse {
  public success: boolean
  public permissions: PermissionEntity[]
  public error: ErrorEntity | null

  constructor(success: boolean, permissions: PermissionEntity[] = [], error: ErrorEntity | null = null) {
    this.success = success
    this.permissions = permissions
    this.error = error
  }
}

export class ListUsersResponse {
  public users: any[]
  public error: ErrorEntity | null

  constructor(users: any[], error: ErrorEntity | null = null) {
    this.users = users
    this.error = error
  }
}
