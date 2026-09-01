/* import { ListProposalRepository } from "../repository/proposal"
import { ProposalAssociation } from "../association/proposal"
import * as fastcsv from 'fast-csv'
import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import path from 'path'

export class ExportProposalCSVUseCase {
    constructor(
        private repository: ListProposalRepository = new ListProposalRepository()
    ) {}

    async execute(): Promise<string> {
        const proposals = await this.repository.listProposal()
        
        const data = proposals.map(p => ({
            'ID': p.proposalID,
            'Número': p.proposalNumber,
            'Titular': p.holder,
            'CPF': p.cpf,
            'WhatsApp': p.whatsapp,
            'Email': p.email,
            'Plano': p.plan,
            'Preço': p.contractPrice,
            'Status': p.status,
            'Corretor': p.broker,
            'Data': p.createdAt.toLocaleDateString('pt-BR')
        }))

        return new Promise((resolve, reject) => {
            let csvData = ''
            const stream = fastcsv.format({ headers: true })
            stream.on('data', chunk => csvData += chunk)
            stream.on('end', () => resolve(csvData))
            stream.on('error', reject)

            data.forEach(row => stream.write(row))
            stream.end()
        })
    }
}

export class ExportProposalPDFUseCase {
    constructor(
        private repository: ListProposalRepository = new ListProposalRepository()
    ) {}

    async execute(): Promise<Buffer> {
        const proposals = await this.repository.listProposal()
        
        // Count by status for "graphic" summary
        const statusCount: Record<string, number> = {}
        const planCount: Record<string, number> = {}
        proposals.forEach(p => {
            statusCount[p.status] = (statusCount[p.status] || 0) + 1
            planCount[p.plan] = (planCount[p.plan] || 0) + 1
        })

        const fonts = {
            Roboto: {
                normal: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf'),
                bold: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf'),
                italics: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf'),
                bolditalics: path.join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf')
            }
        }

        const printer = new PdfPrinter(fonts)

        const docDefinition: TDocumentDefinitions = {
            content: [
                { text: 'Relatório de Propostas', style: 'header' },
                { text: '\n' },
                { 
                    columns: [
                        {
                            width: '*',
                            stack: [
                                { text: 'Resumo por Status', style: 'subheader' },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*', 'auto'],
                                        body: [
                                            [{ text: 'Status', style: 'tableHeader' }, { text: 'Qtd', style: 'tableHeader' }],
                                            ...Object.entries(statusCount).map(([status, count]) => [status, count.toString()])
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            width: '*',
                            stack: [
                                { text: 'Resumo por Plano', style: 'subheader' },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*', 'auto'],
                                        body: [
                                            [{ text: 'Plano', style: 'tableHeader' }, { text: 'Qtd', style: 'tableHeader' }],
                                            ...Object.entries(planCount).map(([plan, count]) => [plan, count.toString()])
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                { text: '\n' },
                { text: 'Lista Detalhada', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'Número', style: 'tableHeader' }, 
                                { text: 'Titular', style: 'tableHeader' }, 
                                { text: 'Plano', style: 'tableHeader' }, 
                                { text: 'Preço', style: 'tableHeader' }, 
                                { text: 'Status', style: 'tableHeader' }
                            ],
                            ...proposals.map(p => [
                                p.proposalNumber, 
                                p.holder, 
                                p.plan, 
                                `R$ ${Number(p.contractPrice).toFixed(2)}`, 
                                p.status
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

        const pdfDoc = printer.createPdfKitDocument(docDefinition)
        
        return new Promise((resolve, reject) => {
            const chunks: any[] = []
            pdfDoc.on('data', chunk => chunks.push(chunk))
            pdfDoc.on('end', () => resolve(Buffer.concat(chunks)))
            pdfDoc.on('error', reject)
            pdfDoc.end()
        })
    }
}
 */