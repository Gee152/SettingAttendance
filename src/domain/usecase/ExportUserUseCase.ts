import { ListUserRepository } from "../repository/user"
import * as fastcsv from 'fast-csv'
import pdfMake from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import path from 'path'

export class ExportUserCSVUseCase {
    constructor(
        private repository: ListUserRepository = new ListUserRepository()
    ) { }

    async execute(): Promise<string> {
        const users = await this.repository.listUser()

        const data = users.map(u => ({
            'ID': u.userID || '',
            'Nome': u.name,
            'Email': u.email,
            'Role': u.role,
            'Ativo': u.isActive ? 'Sim' : 'Não',
            'Criado Em': u.createdAt.toLocaleDateString('pt-BR')
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

export class ExportUserPDFUseCase {
    constructor(
        private repository: ListUserRepository = new ListUserRepository()
    ) { }

    async execute(): Promise<Buffer> {
        const users = await this.repository.listUser()

        const roleCount: Record<string, number> = {}
        const activeCount: Record<string, number> = { 'Ativo': 0, 'Inativo': 0 }
        users.forEach(u => {
            roleCount[u.role] = (roleCount[u.role] || 0) + 1
            activeCount[u.isActive ? 'Ativo' : 'Inativo'] = (activeCount[u.isActive ? 'Ativo' : 'Inativo'] || 0) + 1
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
                { text: 'Relatório de Usuários', style: 'header' },
                { text: '\n' },
                { 
                    columns: [
                        {
                            width: '*',
                            stack: [
                                { text: 'Resumo por Role', style: 'subheader' },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*', 'auto'],
                                        body: [
                                            [{ text: 'Role', style: 'tableHeader' }, { text: 'Quantidade', style: 'tableHeader' }],
                                            ...Object.entries(roleCount).map(([role, count]) => [{ text: role }, { text: count.toString() }])
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            width: '*',
                            stack: [
                                { text: 'Resumo por Status', style: 'subheader' },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*', 'auto'],
                                        body: [
                                            [{ text: 'Status', style: 'tableHeader' }, { text: 'Quantidade', style: 'tableHeader' }],
                                            [{ text: 'Ativo', style: 'tableHeader' }, { text: activeCount['Ativo'].toString(), style: 'tableHeader' }],
                                            [{ text: 'Inativo', style: 'tableHeader' }, { text: activeCount['Inativo'].toString(), style: 'tableHeader' }]
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                { text: '\n' },
                { text: 'Lista de Usuários', style: 'subheader' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'ID', style: 'tableHeader' },
                                { text: 'Nome', style: 'tableHeader' },
                                { text: 'Email', style: 'tableHeader' },
                                { text: 'Role', style: 'tableHeader' },
                                { text: 'Criado Em', style: 'tableHeader' }
                            ],
                            ...users.map(u => [
                                { text: u.userID || '' },
                                { text: u.name },
                                { text: u.email },
                                { text: u.role },
                                { text: u.createdAt.toLocaleDateString('pt-BR') }
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