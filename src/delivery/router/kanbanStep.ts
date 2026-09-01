import express from 'express'
import {
    CreateKanbanStepController,
    GetKanbanStepController,
    UpdateKanbanStepController,
    DeleteKanbanStepController,
    ListKanbanStepController
} from "../controller/kanbanStep"

class kanbanStepRouter {
    private _router = express.Router()

    constructor() {
        this._router.post('/createKanbanStep', new CreateKanbanStepController().create)
        this._router.post('/getKanbanStep', new GetKanbanStepController().get)
        this._router.post('/listKanbanStep', new ListKanbanStepController().list)
        this._router.post('/updateKanbanStep', new UpdateKanbanStepController().update)
        this._router.post('/deleteKanbanStep', new DeleteKanbanStepController().delete)
    }

    public getRouter(): express.Router {
        return this._router
    }
}

export { kanbanStepRouter }
