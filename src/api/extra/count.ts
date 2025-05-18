import { getList } from '@/core/query'
import { succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context) => {
  const { count: article } = await getList(ctx, 'Article', { pagesize: 1, page: 0 })
  const { count: checkArticle } = await getList(ctx, 'Article', { pagesize: 1, page: 0, status: 'PENDING' })
  const { count: user } = await getList(ctx, 'User', { pagesize: 1, page: 0 })
  const { count: checkUser } = await getList(ctx, 'User', { pagesize: 1, page: 0, status: 'PENDING' })
  const { count: complaint } = await getList(ctx, 'Complaint', { pagesize: 1, page: 0 })
  const { count: checkComplaint } = await getList(ctx, 'Complaint', { pagesize: 1, page: 0, status: 'PENDING' })
  const res = {
    checkArticle,
    checkUser,
    checkComplaint,
    checkApply: 0,
    article,
    user,
    complaint,
    apply: 0,
  }
  ctx.body = succ(res)
}
