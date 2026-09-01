import express from 'express';
import { StepProspectoController } from '../controller/stepProspecto';

class stepProspectoRouter {
    private _router = express.Router();
    private _controller = new StepProspectoController();

    constructor() {
        this._router.post('/createStepProspecto', (req, res) => this._controller.create(req, res));
        this._router.post('/getStepProspecto', (req, res) => this._controller.get(req, res));
        this._router.post('/listStepProspecto', (req, res) => this._controller.list(req, res));
        this._router.post('/updateStepProspecto', (req, res) => this._controller.update(req, res));
        this._router.post('/deleteStepProspecto', (req, res) => this._controller.delete(req, res));
    }

    public getRouter(): express.Router {
        return this._router;
    }
}

export { stepProspectoRouter };
