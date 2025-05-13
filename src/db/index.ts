import 'reflect-metadata'
import { DataSource } from 'typeorm'

import * as models from '../models'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: '192.168.8.6',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'koa_cms',
  synchronize: true,
  logging: false,
  entities: Object.values(models),
  subscribers: [],
})

export default AppDataSource
