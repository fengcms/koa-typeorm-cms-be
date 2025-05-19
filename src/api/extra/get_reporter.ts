import { getList } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { succ } from '@/utils/tools'
import type { Context } from 'koa'
export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const { name, code } = params
  // 校验传参是否为空
  if (!name || !code) ctx.throw(400, '请输入工作人员姓名和证件编号')

  const reporterData = await getList(ctx, 'Reporter', { name, code })
  if ('err' in reporterData) ctx.throw(500, '获取工作人员数据失败')

  const { list } = reporterData
  if (list.length === 0) ctx.throw(400, '查无此人，请核对人员姓名和证件编号')

  ctx.body = succ(list[0])
}
