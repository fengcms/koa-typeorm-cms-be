import { getItem, putItem } from '@/core/query'
import type { ListDataTypes } from '@/types/core'
import type { Context } from 'koa'

export default {
  ls: (data: ListDataTypes) => {
    data.list.map((r) => {
      r.content = undefined
      r.markdown = undefined
    })
    return data
  },
  get: async (data: any, ctx: Context, { roleName, id }) => {
    const channel = await getItem(ctx, 'Channel', data.channel_id)
    if (roleName === 'anyone') putItem(ctx, 'Article', { hits: data.hits + 1 }, id)
    data.channel_name = 'err' in channel ? '归属栏目错误' : channel.name
    return data
  },
}
