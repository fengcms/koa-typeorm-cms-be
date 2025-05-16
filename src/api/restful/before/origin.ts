import type { RequestParamsType } from '@/types/core'
import type { Context } from 'koa'
export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { name } = params
    // 校验必填参数
    if (!name) ctx.throw(400, '来源名称不能为空')
    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { name } = params
    // 校验必填参数
    if (!name) ctx.throw(400, '来源名称不能为空')
    return params
  },
}
