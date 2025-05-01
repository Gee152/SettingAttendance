import { Router } from 'express'
import { CreateUserRegisterController, DeleteUserController, LoginUserController, StartSessionUserWhatsAppController, UpdateUserController } from '../controller/user'

class userRouter {
  private router: Router

  constructor() {
    this.router = Router()

    this.router.post('/register', new CreateUserRegisterController().createUser)
    this.router.post('/login', new LoginUserController().loginUser)
    this.router.post('/updateUser', new UpdateUserController().updateUser)
    this.router.post('/deleteUser', new DeleteUserController().deleteUser)
    this.router.post('/startSessionUserWhatsApp', new StartSessionUserWhatsAppController().startSessionUserWhatsApp)
  }

  getRouter(): Router {
    return this.router
  }
}

export {
  userRouter
}