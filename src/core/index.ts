import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../types/core'
import Query from './query'

export const Core = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { method } = allParams
  console.log('model', Query[method])
  await Query[method](ctx, model, allParams)
  // ctx.body = {
  //   code: 0,
  //   msg: 'Koa server is 22222',
  // }
}
