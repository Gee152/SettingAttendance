import express from 'express'
import {
  CreateProposalController, GetProposalController, UpdateProposalController,
  DeleteProposalController, ListProposalController
} from "../controller/proposal"
//import { ExportProposalController } from "../controller/exportProposal"

class proposalRouter {
	private _router = express.Router()

	constructor() {
		this._router.post('/createProposal', new CreateProposalController().createProposal)
		this._router.post('/getProposal', new GetProposalController().getProposal)
		this._router.post('/listProposal', new ListProposalController().listProposal)
		this._router.post('/updatedProposal', new UpdateProposalController().updateProposal)
		this._router.post('/deleteProposal', new DeleteProposalController().deleteProposal)
		//this._router.post('/exportProposalCSV', new ExportProposalController().exportCSV)
		//this._router.post('/exportProposalPDF', new ExportProposalController().exportPDF)
	}

	public getRouter(): express.Router {
		return this._router
	}
}

export { proposalRouter }
