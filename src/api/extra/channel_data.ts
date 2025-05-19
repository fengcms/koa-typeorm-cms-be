import { getList } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { objToStr, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const cacheKey = `channel-data-${objToStr(params)}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 1000 * 60 * 10) {
    ctx.body = succ(cache.data)
  }

  const channelData = await getList(ctx, 'Channel', { ...params, pagesize: -1, sort: '-sort,-id' })
  if ('err' in channelData) ctx.throw(500, '获取栏目数据失败')
  const { list: childChannelData } = channelData
  global.cache[cacheKey] = { data: { childChannelData }, time: Date.now() }
  ctx.body = succ({ childChannelData })
}
