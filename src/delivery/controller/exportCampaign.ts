import { Request, Response } from 'express'
import { ExportCampaignCSVUseCase, ExportCampaignPDFUseCase } from "../../domain/usecase/ExportCampaignUseCase"

class ExportCampaignController {
    async exportCSV(req: Request, res: Response): Promise<void> {
        try {
            const usecase = new ExportCampaignCSVUseCase()
            const csvData = await usecase.execute()

            res.setHeader('Content-Type', 'text/csv')
            res.setHeader('Content-Disposition', 'attachment; filename=campanhas.csv')
            res.status(200).send(csvData)
        } catch (error: any) {
            console.error('Error exporting CSV:', error)
            res.status(500).json({ error: { code: 500, message: error.message } })
        }
    }

    async exportPDF(req: Request, res: Response): Promise<void> {
        try {
            const usecase = new ExportCampaignPDFUseCase()
            const pdfBuffer = await usecase.execute()

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'attachment; filename=campanhas.pdf')
            res.status(200).send(pdfBuffer)
        } catch (error: any) {
            console.error('Error exporting PDF:', error)
            res.status(500).json({ error: { code: 500, message: error.message } })
        }
    }
}

export { ExportCampaignController }
