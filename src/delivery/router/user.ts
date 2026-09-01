import { Router } from 'express'
import { CheckEmailExistsUserController, CreateUserRegisterController, DeleteUserController, LoginUserController, UpdateUserController } from '../controller/user'
import { GetPermissionsController, UpdatePermissionsController, ListUsersController } from '../controller/permission'

class userRouter {
  private router: Router

  constructor() {
    this.router = Router()

    this.router.post('/register', new CreateUserRegisterController().createUser)
    this.router.post('/login', new LoginUserController().loginUser)
    this.router.post('/updateUser', new UpdateUserController().updateUser)
    this.router.post('/deleteUser', new DeleteUserController().deleteUser)
    this.router.post('/checkEmailExists', new CheckEmailExistsUserController().checkEmailExistsUser)
    this.router.post('/getPermissions', new GetPermissionsController().getPermissions)
    this.router.post('/updatePermissions', new UpdatePermissionsController().updatePermissions)
    this.router.post('/listUsers', new ListUsersController().listUsers)
  }

  getRouter(): Router {
    return this.router
  }
}

export {
  userRouter
}