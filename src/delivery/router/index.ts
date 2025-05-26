import { MessageRouter } from "./message"
import { userRouter } from "./user"
import express from 'express'

class Router {
	constructor(app: express.Router) {
		app.use(new userRouter().getRouter())
		app.use(new MessageRouter().getRouter())
	}
}

export { Router }
