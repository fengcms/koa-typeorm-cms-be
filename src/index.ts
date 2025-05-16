import * as Koa from 'koa'
import { koaBody } from 'koa-body'
import { HostConfig } from './config'
import { koaBodyConfig } from './config/koaBody'
import { initDB } from './db'
import errorHandler from './middlewares/errorHandler'
import logger from './middlewares/logger'
import router from './router'
const app = new Koa()
// 初始化数据库
initDB()
// 错误处理中间件
app.use(errorHandler)
app.use(logger())
// 使用 bodyParser 中间件解析 JSON 请求体
app.use(koaBody(koaBodyConfig))

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(HostConfig.port, () => {
  console.log(`Server running on http://localhost:${HostConfig.port}`)
})
