import { DataSource } from 'typeorm'
import { UserEntity } from './entity/user.entity'
import { Contact } from './entity/contact.entity'
import { Campaign } from './entity/campaign.entity'
import { Message } from './entity/message.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'messaging_app',
  entities: [UserEntity, Contact, Message, Campaign],
  migrations: ['src/migration/*.ts'],
  synchronize: true, // Apenas para desenvolvimento!
  logging: true,
});

async function initializeDataSource() {
  try {
    await AppDataSource.initialize()
    console.log('DB conectado!')
  }catch(err) {
    console.error('Erro ao conectar no DB', err)
  }
}

initializeDataSource()