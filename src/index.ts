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

app.listen(HostConfig.port, () => {
  console.log(`Server running on http://localhost:${HostConfig.port}`)
})
