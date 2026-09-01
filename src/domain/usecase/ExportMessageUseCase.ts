import { ListMessageRepository } from "../repository/message"
import * as fastcsv from 'fast-csv'
import pdfMake from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import path from 'path'

export class ExportMessageCSVUseCase {
    constructor(
        private repository: ListMessageRepository = new ListMessageRepository()
    ) { }

    async execute(): Promise<string> {
        const messages = await this.repository.listMessage()

        const data = messages.map(m => ({
            'ID': m.messageID || '',
            'Conteúdo': m.content,
            'Status': m.status,
            'Criado Em': m.createdAt.toLocaleDateString('pt-BR')
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

export class ExportMessagePDFUseCase {
    constructor(
        private repository: ListMessageRepository = new ListMessageRepository()
    ) { }

    async execute(): Promise<Buffer> {
        const messages = await this.repository.listMessage()

        const statusCount: Record<string, number> = {}
        messages.forEach(m => {
            statusCount[m.status] = (statusCount[m.status] || 0) + 1
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
                { text: 'Relatório de Mensagens', style: 'header' },
                { text: '\n' },
                { text: 'Resumo por Status', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto'],
                        body: [
                            [{ text: 'Status', style: 'tableHeader' }, { text: 'Quantidade', style: 'tableHeader' }],
                            ...Object.entries(statusCount).map(([status, count]) => [{ text: status }, { text: count.toString() }])
                        ]
                    }
                },
                { text: '\n' },
                { text: 'Lista de Mensagens', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'ID', style: 'tableHeader' },
                                { text: 'Conteúdo', style: 'tableHeader' },
                                { text: 'Status', style: 'tableHeader' },
                                { text: 'Criado Em', style: 'tableHeader' }
                            ],
                            ...messages.map(m => [
                                { text: m.messageID || '' },
                                { text: m.content },
                                { text: m.status },
                                { text: m.createdAt.toLocaleDateString('pt-BR') }
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