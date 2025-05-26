import { Router } from "express"
import { CreateMessageController, DeleteMessageController, GetMessageController, UpdateMessageController } from "../controller/message"

class MessageRouter {
  private router: Router

  constructor() {
    this.router = Router()

    this.router.post('/createMessage', new CreateMessageController().createMessage)
    this.router.post('/getMessage', new GetMessageController().getMessage)
    this.router.post('/updateMessage', new UpdateMessageController().updateMessage)
    this.router.post('/deleteMessage', new DeleteMessageController().deleteMessage)
  }

  getRouter(): Router {
    return this.router
  }
}

export {
  MessageRouter
}