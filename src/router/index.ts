import * as Router from '@koa/router'
import type { Context, Next } from 'koa'

import { ApiPrefix } from '@/config'
import { Core } from '@/core'
import { authentication } from '@/core/authentication'
import AppDataSource from '@/db'
import * as models from '@/models'
import type { MethodTypes, ModelType, RequestParamsType } from '@/types/core'
import { getJSFile, objKeyLower } from '@/utils/tools'
const extraAPI = getJSFile('../api/extra')

const router = new Router({
  prefix: ApiPrefix,
})

const calcMethodAndCheckUrl = (id: string, ctx: Context) => {
  const { method } = ctx.request
  let reqMethod = method.toLocaleLowerCase()
  if (id) {
    if (method === 'POST') ctx.throw(405)
    if (method === 'DELETE') reqMethod = 'del'
  } else {
    if (['DELETE', 'PUT'].includes(method)) ctx.throw(405)
    if (method === 'GET') reqMethod = 'ls'
  }
  return reqMethod as MethodTypes
}

// 通配符路由
router.all('(.*)', async (ctx: Context, next: Next) => {
  // 将 DataSource 挂载到上下文
  ctx.db = AppDataSource
  const reqPath = ctx.request.path.replace(new RegExp(ApiPrefix), '')
  const [apiName, id, errPath] = reqPath.split('/').map((i) => i.toLowerCase())
  if (errPath) ctx.throw(400, '请求路径不支持')

  // 根据请求计算内置请求方法
  const method = calcMethodAndCheckUrl(id, ctx)
  const { currentRole, token } = await authentication(ctx, apiName, method)

  // 根据请求方法整理参数
  const params = method === 'ls' ? objKeyLower(ctx.request.query) : ctx.request.body
  const modelKey = Object.keys(models).find((key) => key.toLowerCase() === apiName)

  const allParams: RequestParamsType = { apiName, params, method, id, currentRole, token }

  if (extraAPI.includes(apiName)) {
    // 扩展接口直接调用扩展文件并执行
    await require(`../api/extra/${apiName}`).default(ctx, allParams, next)
  } else if (modelKey) {
    const model: ModelType = models[modelKey]
    // 内置接口调用核心处理函数
    await Core(ctx, model, allParams, next)
  } else {
    ctx.throw(404, '接口不存在')
  }
})

export default router
