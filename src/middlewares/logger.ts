import * as fs from 'node:fs'
import * as path from 'node:path'
import { APP_DIR, ENABLE_REQUEST_LOGGING } from '@/config'
import * as koaLogger from 'koa-logger'

// 确保日志目录存在
const logDir = APP_DIR.LOG_DIR
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

// 创建日志写入流
const getLogStream = () => {
  const date = new Date().toISOString().split('T')[0]
  const logFile = path.join(logDir, `${date}.log`)
  return fs.createWriteStream(logFile, { flags: 'a' })
}

// 自定义日志格式
const customLogger = koaLogger({
  // 自定义日志格式，移除颜色代码
  transporter: (str, args) => {
    if (!ENABLE_REQUEST_LOGGING) return
    const [_, method, url, status, time] = args
    console.log(str)
    if (!status) return
    // 构建纯文本日志
    const logText = `${method} ${url} ${status || '-'} ${time || '-'}`
    // 写入文件
    const stream = getLogStream()
    stream.write(`${logText}\n`)
  },
})

// 导出中间件
export default () => customLogger
