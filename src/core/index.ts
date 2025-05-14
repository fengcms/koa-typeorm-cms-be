import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../types/core'
import Query from './query'

export const Core = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { method } = allParams
  await Query[method](ctx, model, allParams, next)
}
