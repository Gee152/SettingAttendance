import { AppDataSource } from "../../data-source"
import { PermissionEntity } from "./entity/permission.entity"
import { v4 as uuidv4 } from "uuid"

const DEFAULT_MODULES = [
  "dashboard",
  "kanban",
  "proposals",
  "contacts",
  "messages",
  "campaigns",
  "settings"
]

export async function getPermissionsByUser(userID: string): Promise<PermissionEntity[]> {
  const repo = AppDataSource.getRepository(PermissionEntity)
  let permissions = await repo.findBy({ userID })

  if (!permissions || permissions.length === 0) {
    // Populate default permissions (all true) if user has no explicit permissions in DB
    permissions = []
    for (const mod of DEFAULT_MODULES) {
      const p = repo.create({
        permissionID: uuidv4(),
        userID,
        module: mod,
        canRead: true,
        canWrite: true,
        canDelete: true
      })
      await repo.save(p)
      permissions.push(p)
    }
  }

  return permissions
}

export async function updatePermissionsByUser(
  targetUserID: string,
  newPermissions: { module: string; canRead: boolean; canWrite: boolean; canDelete: boolean }[]
): Promise<PermissionEntity[]> {
  const repo = AppDataSource.getRepository(PermissionEntity)

  for (const item of newPermissions) {
    let existing = await repo.findOneBy({ userID: targetUserID, module: item.module })
    if (existing) {
      existing.canRead = item.canRead
      existing.canWrite = item.canWrite
      existing.canDelete = item.canDelete
      await repo.save(existing)
    } else {
      const p = repo.create({
        permissionID: uuidv4(),
        userID: targetUserID,
        module: item.module,
        canRead: item.canRead,
        canWrite: item.canWrite,
        canDelete: item.canDelete
      })
      await repo.save(p)
    }
  }

  return await repo.findBy({ userID: targetUserID })
}
