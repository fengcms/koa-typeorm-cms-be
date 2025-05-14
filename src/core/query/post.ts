import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../../types/core'
import { succ } from '../../utils/tools'
const post = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { params } = allParams
  const repository = ctx.db.getRepository(model)
  console.log(repository)
  // 新增数据
  // @ts-ignor
  await repository.save(params).catch((err: any) => {
    ctx.throw(500, err)
  })
  ctx.body = succ(true)
  // const res = await ctx.db.getRepository(model).find()
  // ctx.body = {
  //   code: 0,
  //   msg: 'success',
  //   data: res,
  // }
}

export default post
