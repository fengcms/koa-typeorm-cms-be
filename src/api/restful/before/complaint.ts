import { getItem } from '@/core/query'
import { verifyToken } from '@/core/session'
import type { RequestParamsType } from '@/types/core'
import type { Context } from 'koa'

const handle = async (ctx: Context, params: any, token: string) => {
  const tokenData = verifyToken(token)
  if (tokenData) {
    const { id: userId } = tokenData
    const userDetail = await getItem(ctx, 'User', userId)
    if ('err' in userDetail) ctx.throw(400, '你的账号状态异常！')
    const { name, status } = userDetail
    if (status === 'PENDING') ctx.throw(400, '你的账号还没有通过审核，通过审核后，才能投诉建议哦！')
    if (status === 'FAILURE') ctx.throw(400, '你的账号已被禁用！')
    if (status !== 'NORMAL') ctx.throw(400, '你的账号状态异常！')
    params.user_name = name
    params.user_id = userId
    params.status = 'PENDING'
    return params
  }
  ctx.throw(400, 'token 无效')
}
export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params, currentRole, token } = allParams
    if (currentRole === 'user') {
      return await handle(ctx, params, token)
    }
    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params, currentRole, token, id } = allParams
    const complaintInfo = await getItem(ctx, 'Complaint', id)
    if ('err' in complaintInfo) ctx.throw(404, '404')
    const { status } = complaintInfo

    if (currentRole === 'user') {
      if (status === 'NORMAL') return { status: 'FINISH' }
      if (status === 'FINISH') ctx.throw(400, '已完成的投诉建议，不能再次编辑！')
      if (status === 'FAILURE') ctx.throw(400, '被驳回的投诉建议，不能再次编辑！')
      return await handle(ctx, params, token)
    }
    if (status === 'FAILURE') ctx.throw(404, '被驳回的投诉建议不能修改！')
    if (params.status !== 'FAILURE' && status !== 'FINISH') {
      params.status = 'NORMAL'
    }
    return params
  },
}
