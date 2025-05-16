import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../types/core'
import { getJSFile, succ } from '../utils/tools'
import Query from './query'

const beforeHandle = getJSFile('../api/restful/before')
const afterHandle = getJSFile('../api/restful/after')

export const Core = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { method, apiName, params, id } = allParams
  if (beforeHandle.includes(apiName)) {
    // 如有前处理，加载前处理
    const handle = require(`../api/restful/before/${apiName}`).default[method]
    if (handle) allParams.params = await handle(ctx, allParams.params, id)
    // 在前处理中如果没有返回任何值，则终止后续操作
    if (!allParams.params) return
  }
  let data = await Query[method](ctx, model, params, id)
  // 如有后处理，对查询结果进行处理
  if (afterHandle.includes(apiName)) {
    const handle = require(`../api/restful/after/${apiName}`).default[method]
    if (handle) data = await handle(data, ctx, allParams)
  }
  ctx.body = succ(data)
}
