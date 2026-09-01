import { Request, Response } from 'express'
//import { ExportProposalCSVUseCase, ExportProposalPDFUseCase } from "../../domain/usecase/ExportProposalUseCase"

/* class ExportProposalController {
    async exportCSV(req: Request, res: Response): Promise<void> {
        try {
            const usecase = new ExportProposalCSVUseCase()
            const csvData = await usecase.execute()

            res.setHeader('Content-Type', 'text/csv')
            res.setHeader('Content-Disposition', 'attachment; filename=propostas.csv')
            res.status(200).send(csvData)
        } catch (error: any) {
            console.error('Error exporting CSV:', error)
            res.status(500).json({ error: { code: 500, message: error.message } })
        }
    }

    async exportPDF(req: Request, res: Response): Promise<void> {
        try {
            const usecase = new ExportProposalPDFUseCase()
            const pdfBuffer = await usecase.execute()

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'attachment; filename=propostas.pdf')
            res.status(200).send(pdfBuffer)
        } catch (error: any) {
            console.error('Error exporting PDF:', error)
            res.status(500).json({ error: { code: 500, message: error.message } })
        }
    }
} */

/* export { ExportProposalController } */
