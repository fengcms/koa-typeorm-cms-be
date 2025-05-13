import * as Koa from 'koa'
import { HostConfig } from './config'
import DB from './db'
import errorHandler from './middlewares/errorHandler'
import router from './router'
const app = new Koa()

DB.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

// 注册路由
app.use(router.routes())
app.use(router.allowedMethods())

// 错误处理中间件
app.use(errorHandler)

app.listen(HostConfig.port, () => {
  console.log(`Server running on http://localhost:${HostConfig.port}`)
})
