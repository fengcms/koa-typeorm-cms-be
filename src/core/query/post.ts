import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../../types/core'

const post = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { params } = allParams
  const repository = ctx.db.getRepository(model)

  // 判断是否为数组，支持批量添加
  const isArray = Array.isArray(params)
  const saveData = isArray ? params : [params]

  // 新增数据
  const savedEntities = await repository.save(saveData).catch((err: any) => {
    ctx.throw(500, err)
  })

  // 如果是单条数据，返回单个id，如果是批量，返回id数组
  const ids = savedEntities.map((entity: any) => entity.id)
  return { id: isArray ? ids : ids[0] }
}

export default post
