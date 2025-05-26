import { DataSource } from 'typeorm'
import { UserEntity } from './infra/database/entity/user.entity'
import { ContactEntity } from './infra/database/entity/contact.entity'
import { CampaignEntity } from './infra/database/entity/campaign.entity'
import { MessageEntity } from './infra/database/entity/message.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'messaging_app',
  entities: [UserEntity, ContactEntity, MessageEntity, CampaignEntity],
  migrations: ['src/migration/*.ts'],
  synchronize: true, // Apenas para desenvolvimento!
  logging: false,
})

async function initializeDataSource() {
  try {
    await AppDataSource.initialize()
    console.log('DB conectado!')
  }catch(err) {
    console.error('Erro ao conectar no DB', err)
  }
}

initializeDataSource()