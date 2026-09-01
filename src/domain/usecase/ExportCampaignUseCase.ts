import { ListCampaignRepository } from "../repository/campaign"
import * as fastcsv from 'fast-csv'
import pdfMake from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import path from 'path'

export class ExportCampaignCSVUseCase {
    constructor(
        private repository: ListCampaignRepository = new ListCampaignRepository()
    ) { }

    async execute(): Promise<string> {
        const campaigns = await this.repository.listCampaign()

        const data = campaigns.map(c => ({
            'ID': c.campaignID,
            'Usuário': c.userName,
            'Mensagens': c.messages,
            'Agendado Para': c.scheduledAt ? c.scheduledAt.toLocaleDateString('pt-BR') : 'N/A',
            'Status': c.status,
            'Criado Em': c.createdAt.toLocaleDateString('pt-BR')
        }))

        return new Promise((resolve, reject) => {
            let csvData = ''
            const stream = fastcsv.format({ headers: true })
            stream.on('data', (chunk: string) => csvData += chunk)
            stream.on('end', () => resolve(csvData))
            stream.on('error', reject)

            data.forEach(row => stream.write(row))
            stream.end()
        })
    }
}

export class ExportCampaignPDFUseCase {
    constructor(
        private repository: ListCampaignRepository = new ListCampaignRepository()
    ) { }

    async execute(): Promise<Buffer> {
        const campaigns = await this.repository.listCampaign()

        // Count by status for "graphic" summary
        const statusCount: Record<string, number> = {}
        campaigns.forEach(c => {
            statusCount[c.status] = (statusCount[c.status] || 0) + 1
        })

        const fonts = {
            Roboto: {
                normal: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf'),
                bold: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf'),
                italics: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf'),
                bolditalics: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf')
            }
        }

        pdfMake.setFonts(fonts)

        const docDefinition: TDocumentDefinitions = {
            content: [
                { text: 'Relatório de Campanhas', style: 'header' },
                { text: '\n' },
                { text: 'Resumo por Status (Dados do Gráfico)', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto'],
                        body: [
                            [{ text: 'Status', style: 'tableHeader' }, { text: 'Quantidade', style: 'tableHeader' }],
                            ...Object.entries(statusCount).map(([status, count]) => [status, count.toString()])
                        ]
                    }
                },
                { text: '\n' },
                { text: 'Lista de Campanhas', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'Usuário', style: 'tableHeader' },
                                { text: 'Agendado', style: 'tableHeader' },
                                { text: 'Status', style: 'tableHeader' }
                            ],
                            ...campaigns.map(c => [
                                c.userName,
                                c.scheduledAt ? c.scheduledAt.toLocaleDateString('pt-BR') : 'N/A',
                                c.status
                            ])
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: 'black'
                }
            },
            defaultStyle: {
                font: 'Roboto'
            }
        }

        const pdfDoc = pdfMake.createPdf(docDefinition)
        return await pdfDoc.getBuffer()
    }
}

