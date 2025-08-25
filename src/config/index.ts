import path = require('node:path')

export const ApiPrefix = '/api/v1/'

export const HostConfig = {
  port: 3000,
  host: '0.0.0.0',
}

export const DBConfig = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'koa_cms',
}

// 系统目录设置
export const APP_DIR = {
  TMP_DIR: path.resolve(process.cwd(), './tmp'),
  LOG_DIR: path.resolve(process.cwd(), './log'),
}

export const CacheConfig = {
  enable: false,
  time: 100000 * 60 * 10,
}

export const JWT_SECRET = 'secret-key'

export const ENABLE_REQUEST_LOGGING = false

export const RSA_KEY = {
  RSA_PRIVATE_KEY_PATH: path.resolve(process.cwd(), './src/config/key/rsa_private_key.pem'),
  RSA_PUBLIC_KEY_PATH: path.resolve(process.cwd(), './src/config/key/rsa_public_key.pem'),
}
