import * as path from 'node:path'
import * as dotenv from 'dotenv'
// 加载环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import * as Koa from 'koa'
import { koaBody } from 'koa-body'
import * as koaStatic from 'koa-static'
import { HostConfig } from './config'
import { koaBodyConfig } from './config/koaBody'
import { initDB } from './db'
import errorHandler from './middlewares/errorHandler'
import logger from './middlewares/logger'
import router from './router'
import { findAvailablePort } from './utils/port'
const app = new Koa()
// 初始化数据库
initDB()
// 引入缓存
global.cache = {}
// 错误处理中间件
app.use(errorHandler)
app.use(logger())
app.use(koaStatic(path.resolve(process.cwd(), './static')))
// 使用 bodyParser 中间件解析 JSON 请求体
app.use(koaBody(koaBodyConfig))

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())
// 静态资源服务

// 启动服务器，自动查找可用端口
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(HostConfig.port)
    
    app.listen(availablePort, () => {
      console.log(`Server is running on http://${HostConfig.host}:${availablePort}`)
      
      if (availablePort !== HostConfig.port) {
        console.log(`Note: Original port ${HostConfig.port} is occupied, automatically switched to port ${availablePort}`)
      }
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
