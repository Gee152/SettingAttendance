import { DataSource } from 'typeorm'
import { UserEntity } from './infra/database/entity/user.entity'
import { ContactEntity } from './infra/database/entity/contact.entity'
import { CampaignEntity } from './infra/database/entity/campaign.entity'
import { MessageEntity } from './infra/database/entity/message.entity'
import { ProposalModel } from './infra/database/entity/proposal.entity'
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'messaging_app',
  entities: [UserEntity, ContactEntity, MessageEntity, CampaignEntity, ProposalModel],
  migrations: ['src/migration/*.ts'],
  synchronize: false, // Only for development true!
  dropSchema: false,
  logging: false,
})

async function initializeDataSource() {
  try {
    await AppDataSource.initialize()
    console.log('DB conectado!')
  } catch (err) {
    console.error('Erro ao conectar no DB', err)
  }
}

initializeDataSource()