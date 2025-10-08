import { campaignRouter } from "./campaign"
import { contactRouter } from "./contact"
import { MessageRouter } from "./message"
import { userRouter } from "./user"
import express from 'express'

class Router {
	constructor(app: express.Router) {
		app.use(new userRouter().getRouter())
		app.use(new MessageRouter().getRouter())
		app.use(new contactRouter().getRouter())
		app.use(new campaignRouter().getRouter())
	}
}

export { Router }
