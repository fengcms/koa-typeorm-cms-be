import { putItem } from '@/core/query'
import type { ListDataTypes, RequestParamsType } from '@/types/core'
import type { Context } from 'koa'
export default {
  ls: (data: ListDataTypes) => {
    data.list.map((r) => {
      r.content = undefined
      r.markdown = undefined
    })
    return data
  },
  get: async (data: any, ctx: Context, allParams: RequestParamsType) => {
    const { currentRole, id } = allParams
    if (currentRole === 'anyone') putItem(ctx, 'Single', { hits: data.hits + 1 }, id)
    return data
  },
}
