import { getItem, getList } from '@/core/query'
import type { ListDataTypes, RequestParamsType } from '@/types/core'
import { succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { id } = allParams
  const cacheKey = `article-detail-${id}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 100000 * 60 * 10) {
    ctx.body = succ(cache.data)
    return
  }

  const detail = await getItem(ctx, 'Article', { id })
  if (!detail || 'err' in detail) ctx.throw(404, '404')
  const { channel_id } = detail
  const { list: nextList } = (await getList(ctx, 'Article', {
    pagesize: 1,
    channel_id,
    'id-gt': id,
    sort: '-id',
  })) as ListDataTypes

  const next = nextList[0] || null
  const { list: prevList } = (await getList(ctx, 'Article', {
    pagesize: 1,
    channel_id,
    'id-lt': id,
    sort: 'id',
  })) as ListDataTypes
  const prev = prevList[0] || null

  global.cache[cacheKey] = { data: { detail, next, prev }, time: Date.now() }
  ctx.body = succ({ detail, next, prev })
}
