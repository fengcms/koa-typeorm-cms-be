import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../../types/core'

const get = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { id } = allParams
  const repository = ctx.db.getRepository(model)

  // 获取第一条数据
  if (id === 'first') {
    const record = await repository.findOne({
      where: {},
      order: { id: 'ASC' },
    })
    if (!record) ctx.throw(404, '没有找到数据')
    return record
  }

  // 通过 ID 获取单条数据
  if (id) {
    const record = await repository.findOne({
      where: { id: Number.parseInt(id) },
    })
    if (!record) ctx.throw(404, '没有找到数据')
    return record
  }

  ctx.throw(400, '不支持的获取方式')
}

export default get
