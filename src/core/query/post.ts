import { err } from '@/utils/tools'
import type { Context } from 'koa'
import type { ModelType } from '../../types/core'

const post = async (ctx: Context, model: ModelType, params: any, id?: string) => {
  const repository = ctx.db.getRepository(model)

  // 判断是否为数组，支持批量添加
  const isArray = Array.isArray(params)
  const saveData = isArray ? params : [params]

  // 新增数据
  const savedEntities = await repository.save(saveData).catch((error: any) => {
    return err(500, error)
  })

  if ('err' in savedEntities) return savedEntities
  // 如果是单条数据，返回单个id，如果是批量，返回id数组
  const ids = savedEntities.map((entity: any) => entity.id)
  return { id: isArray ? ids : ids[0] }
}

export default post
