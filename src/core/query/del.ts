import type { Context, Next } from 'koa'
import type { ModelType, RequestParamsType } from '../../types/core'

const del = async (ctx: Context, model: ModelType, params: any, id?: string) => {
  if (!id) ctx.throw(412, '删除操作必须提供 id')

  const repository = ctx.db.getRepository(model)
  const res = { succ: [], fail: [] }
  const ids = id.split(',')

  // 先验证所有 ID 是否为有效数字
  const validIds: number[] = []
  const invalidIds: string[] = []

  for (const id of ids) {
    const numId = Number(id)
    if (Number.isNaN(numId)) {
      invalidIds.push(id)
    } else {
      validIds.push(numId)
    }
  }

  // 如果存在无效 ID，直接返回错误信息
  if (invalidIds.length > 0) {
    ctx.throw(412, `包含无效的 ID 参数 ${invalidIds.join(',')}`)
  }

  // 只处理有效的 ID
  await Promise.all(
    validIds.map(async (id) => {
      try {
        const record = await repository.findOne({
          where: { id },
        })

        if (record) {
          await repository.remove(record)
          res.succ.push(id)
        } else {
          res.fail.push(id)
        }
      } catch (err) {
        res.fail.push(id)
      }
    }),
  )

  return res
}

export default del
