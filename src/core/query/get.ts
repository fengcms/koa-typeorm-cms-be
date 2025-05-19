import type { CoreErrorTypes, DetailDataTypes, ModelType } from '@/types/core'
import { err } from '@/utils/tools'
import type { Context } from 'koa'

const get = async (
  ctx: Context,
  model: ModelType,
  params: any,
  id?: string,
): Promise<DetailDataTypes | CoreErrorTypes> => {
  const repository = ctx.db.getRepository(model)

  // 获取第一条数据
  if (id === 'first') {
    const record = await repository.findOne({
      where: {},
      order: { id: 'ASC' },
    })
    if (!record) return err(404, '没有找到数据')
    return record as DetailDataTypes
  }

  // 通过 ID 获取单条数据
  if (id) {
    const record = await repository.findOne({
      where: { id: Number.parseInt(id) },
    })
    if (!record) return err(404, '没有找到数据')
    return record as DetailDataTypes
  }

  return err(400, '不支持的获取方式')
}

export default get
