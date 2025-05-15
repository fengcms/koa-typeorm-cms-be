import path = require('node:path')

export const ApiPrefix = '/api/v1/'

export const HostConfig = {
  port: 3000,
  host: '0.0.0.0',
}

// 系统目录设置
export const APP_DIR = {
  TMP_DIR: path.resolve(process.cwd(), './tmp'),
  LOG_DIR: path.resolve(process.cwd(), './log'),
}

export const JWT_SECRET = 'secret-key'

export const RSA_KEY = {
  RSA_PRIVATE_KEY_PATH: path.resolve(process.cwd(), './src/config/key/rsa_private_key.pem'),
  RSA_PUBLIC_KEY_PATH: path.resolve(process.cwd(), './src/config/key/rsa_public_key.pem'),
}
