import * as Router from '@koa/router'
import type { Context } from 'koa'

import { ApiPrefix } from '../config'

const router = new Router({
  prefix: ApiPrefix,
})

// 通配符路由
router.all('(.*)', (ctx: Context) => {
  ctx.body = {
    code: 0,
    msg: 'Koa server is 22222',
  }
})

export default router
