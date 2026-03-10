import { campaignRouter } from "./campaign"
import { contactRouter } from "./contact"
import { MessageRouter } from "./message"
import { userRouter } from "./user"
import { proposalRouter } from "./proposal"
import express from 'express'

class Router {
	constructor(app: express.Router) {
		app.use(new userRouter().getRouter())
		app.use(new MessageRouter().getRouter())
		app.use(new contactRouter().getRouter())
		app.use(new campaignRouter().getRouter())
		app.use(new proposalRouter().getRouter())
	}
}

export { Router }
