import 'reflect-metadata'
import { DBConfig } from '@/config'
import { DataSource, type DataSourceOptions } from 'typeorm'

import * as models from '../models'

const dataSourceConfig = {
  ...DBConfig,
  synchronize: true,
  logging: false,
  entities: Object.values(models),
  subscribers: [],
} as DataSourceOptions

export const AppDataSource = new DataSource(dataSourceConfig)

export const initDB = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err)
    })
}

export default AppDataSource
