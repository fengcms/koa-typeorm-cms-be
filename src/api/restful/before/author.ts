import type { RequestParamsType } from '@/types/core'
import type { Context } from 'koa'

export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    // 校验必填参数
    if (!params.name) ctx.throw(400, '作者姓名不能为空')
    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    // 校验必填参数
    if (!params.name) ctx.throw(400, '作者姓名不能为空')
    return params
  },
}
