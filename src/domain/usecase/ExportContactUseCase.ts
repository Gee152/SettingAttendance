import { ListContactRepository } from "../repository/contact"
import * as fastcsv from 'fast-csv'
import pdfMake from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import path from 'path'

export class ExportContactCSVUseCase {
    constructor(
        private repository: ListContactRepository = new ListContactRepository()
    ) { }

    async execute(): Promise<string> {
        const contacts = await this.repository.listContact()

        const data = contacts.map(c => ({
            'ID': c.contactID,
            'Nome': c.name,
            'Telefone': c.phoneNumber,
            'Tags': c.tags?.join(', ') || 'N/A',
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

export class ExportContactPDFUseCase {
    constructor(
        private repository: ListContactRepository = new ListContactRepository()
    ) { }

    async execute(): Promise<Buffer> {
        const contacts = await this.repository.listContact()

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
                { text: 'Relatório de Contatos', style: 'header' },
                { text: '\n' },
                { text: `Total de Contatos: ${contacts.length}`, style: 'subheader' },
                { text: '\n' },
                { text: 'Lista de Contatos', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'ID', style: 'tableHeader' },
                                { text: 'Nome', style: 'tableHeader' },
                                { text: 'Telefone', style: 'tableHeader' },
                                { text: 'Tags', style: 'tableHeader' },
                                { text: 'Criado Em', style: 'tableHeader' }
                            ],
                            ...contacts.map(c => [
                                { text: c.contactID },
                                { text: c.name },
                                { text: c.phoneNumber },
                                { text: c.tags?.join(', ') || 'N/A' },
                                { text: c.createdAt.toLocaleDateString('pt-BR') }
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