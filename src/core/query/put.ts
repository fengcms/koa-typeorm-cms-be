import type { Context, Next } from 'koa'
import { In } from 'typeorm'
import type { ModelType, RequestParamsType } from '../../types/core'
import { succ } from '../../utils/tools'

/*
  更新数据方法
  1. 支持未知ID单条数据修改
    URL:    /xxx/first
    DATA:   {...}
    此方法会找数据库第一条数据，进行对应修改，用于特殊用途
  2. 支持单ID数据修改
    URL: /xxx/:id
    DATA:   {...}
    正常使用，数据为需要修改的数据字典
  3. 支持多ID单数据修改
    URL: /xxx/1,2,3,4,5,6
    DATA:   {...}
    支持将多条数据的内容进行统一处理，例如批量加入回收站或者批量转移归属栏目等
  4. 支持多ID多数据修改
    URL: /xxx/batch
    DATA:   [{...}, {...}, {...}, {...}]
    将需要多条修改的数据构成数组传进来。
    每个数据里面必须包含 'id' 字段，否则参数错误
*/

const put = async (ctx: Context, model: ModelType, allParams: RequestParamsType, next: Next) => {
  const { params, id } = allParams
  const repository = ctx.db.getRepository(model)

  // 1. 未知ID单条数据修改 /xxx/first
  if (id === 'first') {
    const firstRecord = await repository.findOne({
      where: {},
      order: { id: 'ASC' }
    })
    if (!firstRecord) ctx.throw(404, '没有找到数据')
    const updateData = { ...firstRecord, ...params }
    const savedEntity = await repository.save(updateData).catch((err: any) => {
      ctx.throw(500, err)
    })
    ctx.body = succ({ id: savedEntity.id })
    return
  }

  // 2. 单ID数据修改 /xxx/:id
  if (id && !id.includes(',') && id !== 'batch') {
    const record = await repository.findOne({
      where: { id: Number.parseInt(id) },
    })
    if (!record) ctx.throw(404, '没有找到数据')
    const updateData = { ...record, ...params }
    const savedEntity = await repository.save(updateData).catch((err: any) => {
      ctx.throw(500, err)
    })
    ctx.body = succ({ id: savedEntity.id })
    return
  }

  // 3. 多ID单数据修改 /xxx/1,2,3,4,5,6
  if (id?.includes(',')) {
    const ids = id.split(',').map(Number)
    const records = await repository.findBy({ id: In(ids) })
    if (!records.length) ctx.throw(404, '没有找到数据')
    const updateData = records.map((record) => ({ ...record, ...params }))
    const savedEntities = await repository.save(updateData).catch((err: any) => {
      ctx.throw(500, err)
    })
    ctx.body = succ({ id: savedEntities.map((entity) => entity.id) })
    return
  }

  // 4. 多ID多数据修改 /xxx/batch
  if (id === 'batch') {
    if (!Array.isArray(params)) ctx.throw(400, '批量更新数据格式错误')
    // 检查每条数据是否包含id字段
    if (!params.every((item) => 'id' in item)) ctx.throw(400, '批量更新数据必须包含id字段')

    const ids = params.map((item) => item.id)
    const records = await repository.findBy({ id: In(ids) })
    if (!records.length) ctx.throw(404, '没有找到数据')

    // 将新数据与原数据合并
    const updateData = records.map((record) => {
      const newData = params.find((item) => item.id === record.id)
      return { ...record, ...newData }
    })

    const savedEntities = await repository.save(updateData).catch((err: any) => {
      ctx.throw(500, err)
    })
    ctx.body = succ({ id: savedEntities.map((entity) => entity.id) })
    return
  }

  ctx.throw(400, '不支持的更新方式')
}

export default put
