import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../types/core'
import { getJSFile, succ } from '../utils/tools'
import Query from './query'

const beforeHandle = getJSFile('../api/restful/before')

export const Core = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { method, apiName } = allParams
  // 如有前处理，加载前处理
  if (beforeHandle.includes(apiName)) {
    const handle = require(`../api/restful/before/${apiName}`).default[method]
    if (handle) allParams.params = await handle(ctx, model, allParams)
    // 在前处理中如果没有返回任何值，则终止后续操作
    if (!allParams.params) return
  }
  const data = await Query[method](ctx, model, allParams, next)
  ctx.body = succ(data)
}
