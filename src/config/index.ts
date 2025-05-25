import path = require('node:path')

export const ApiPrefix = '/api/v1/'

export const HostConfig = {
  port: 3000,
  host: '0.0.0.0',
}

export const DBConfig = {
  type: 'mysql',
  host: '192.168.8.6',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'koa_cms',
}

// 系统目录设置
export const APP_DIR = {
  TMP_DIR: path.resolve(process.cwd(), './tmp'),
  LOG_DIR: path.resolve(process.cwd(), './log'),
}

export const JWT_SECRET = 'secret-key'

export const ENABLE_REQUEST_LOGGING = false

export const RSA_KEY = {
  RSA_PRIVATE_KEY_PATH: path.resolve(process.cwd(), './src/config/key/rsa_private_key.pem'),
  RSA_PUBLIC_KEY_PATH: path.resolve(process.cwd(), './src/config/key/rsa_public_key.pem'),
}
