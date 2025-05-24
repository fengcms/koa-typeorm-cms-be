import { getItem, getList } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { objToStr, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const cacheKey = `homeData-${objToStr(params)}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 100000 * 60 * 10) {
    ctx.body = succ(cache.data)
    return
  }

  const aboutUs = await getItem(ctx, 'Single', 1)
  if (!aboutUs || 'err' in aboutUs) ctx.throw(500, '500')
  const zhuangBiaoZhiShi = await getList(ctx, 'Article', { pagesize: 6, status: 'NORMAL', channel_id: 2 })
  if (!zhuangBiaoZhiShi || 'err' in zhuangBiaoZhiShi) ctx.throw(500, '500')

  const zhuangBiaoZaTan = await getList(ctx, 'Article', { pagesize: 6, status: 'NORMAL', channel_id: 3 })
  if (!zhuangBiaoZaTan || 'err' in zhuangBiaoZaTan) ctx.throw(500, '500')

  const zhuangBiaoZuoPin = await getList(ctx, 'Article', { pagesize: 8, status: 'NORMAL', channel_id: 5 })
  if (!zhuangBiaoZuoPin || 'err' in zhuangBiaoZuoPin) ctx.throw(500, '500')

  const xianChangJaoXue = await getList(ctx, 'Article', { pagesize: 8, status: 'NORMAL', channel_id: 7 })
  if (!xianChangJaoXue || 'err' in xianChangJaoXue) ctx.throw(500, '500')

  const calcList = (list: any[]) => {
    return list.map((item) => {
      item.content = undefined
      item.markdown = undefined
      item.description = undefined
      item.tags = undefined
      return item
    })
  }
  ctx.body = succ({
    aboutUs,
    zhuangBiaoZhiShi: calcList(zhuangBiaoZhiShi.list),
    zhuangBiaoZaTan: calcList(zhuangBiaoZaTan.list),
    zhuangBiaoZuoPin: calcList(zhuangBiaoZuoPin.list),
    xianChangJaoXue: calcList(xianChangJaoXue.list),
  })
}
