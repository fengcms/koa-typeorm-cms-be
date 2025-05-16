import { getItem } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import type { Context } from 'koa'

export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { account, name } = params
    const oldUser1 = await getItem(ctx, 'User', { account })
    if (oldUser1) ctx.throw(400, '登录账号已被占用')
    const oldUser2 = await getItem(ctx, 'User', { name })
    if (oldUser2) ctx.throw(400, '昵称已被占用')
    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params, id } = allParams
    const { account } = params
    const oldUser = await getItem(ctx, 'User', id)
    if (oldUser.account !== account) ctx.throw(400, '登录账号不能修改！')

    return params
  },
}
