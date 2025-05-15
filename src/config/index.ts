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

export const SESSION_TYPE = 'memory'
