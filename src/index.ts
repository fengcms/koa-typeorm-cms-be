import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { HostConfig } from './config'
import { initDB } from './db'
import errorHandler from './middlewares/errorHandler'
import router from './router'
const app = new Koa()
// 初始化数据库
initDB()
// 使用 bodyParser 中间件解析 JSON 请求体
app.use(bodyParser())

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())

// 错误处理中间件
app.use(errorHandler)

app.listen(HostConfig.port, () => {
  console.log(`Server running on http://localhost:${HostConfig.port}`)
})
