import { getList } from '@/core/query'
import { succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context) => {
  const articleData = await getList(ctx, 'Article', { pagesize: 1, page: 0 })
  if ('err' in articleData) ctx.throw(500, '获取文章数据失败')
  const { count: article } = articleData
  const checkArticleData = await getList(ctx, 'Article', { pagesize: 1, page: 0, status: 'PENDING' })
  if ('err' in checkArticleData) ctx.throw(500, '获取文章数据失败')
  const { count: checkArticle } = checkArticleData
  const userData = await getList(ctx, 'User', { pagesize: 1, page: 0 })
  if ('err' in userData) ctx.throw(500, '获取用户数据失败')
  const { count: user } = userData
  const checkUserData = await getList(ctx, 'User', { pagesize: 1, page: 0, status: 'PENDING' })
  if ('err' in checkUserData) ctx.throw(500, '获取用户数据失败')
  const { count: checkUser } = checkUserData
  const complaintData = await getList(ctx, 'Complaint', { pagesize: 1, page: 0 })
  if ('err' in complaintData) ctx.throw(500, '获取投诉数据失败')
  const { count: complaint } = complaintData
  const checkComplaintData = await getList(ctx, 'Complaint', { pagesize: 1, page: 0, status: 'PENDING' })
  if ('err' in checkComplaintData) ctx.throw(500, '获取投诉数据失败')
  const { count: checkComplaint } = checkComplaintData

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
