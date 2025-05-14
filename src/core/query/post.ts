import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../../types/core'
const post = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { apiName } = allParams
  const data = ctx.db.getRepository(model)
  const res = await ctx.db.getRepository(model).find()
  ctx.body = {
    code: 0,
    msg: 'success',
    data: res,
  }
}

export default post
