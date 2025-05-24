import { getItem, getList } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { objToStr, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const cacheKey = `barData-${objToStr(params)}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 100000 * 60 * 10) {
    ctx.body = succ(cache.data)
    return
  }
  const site = await getItem(ctx, 'Site', 'first')
  if (!site || 'err' in site) ctx.throw(500, '500')

  const zhaoShengXinXi = await getList(ctx, 'Article', { pagesize: 6, status: 'NORMAL', channel_id: 4 })
  if (!zhaoShengXinXi || 'err' in zhaoShengXinXi) ctx.throw(500, '500')

  const zhuangBiaoShiPin = await getList(ctx, 'Article', { pagesize: 3, status: 'NORMAL', channel_id: 6 })
  if (!zhuangBiaoShiPin || 'err' in zhuangBiaoShiPin) ctx.throw(500, '500')

  const wangZhanGongGao = await getList(ctx, 'Article', { pagesize: 6, status: 'NORMAL', channel_id: 9 })
  if (!wangZhanGongGao || 'err' in wangZhanGongGao) ctx.throw(500, '500')

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
    zhaoShengXinXi: calcList(zhaoShengXinXi.list),
    zhuangBiaoShiPin: calcList(zhuangBiaoShiPin.list),
    wangZhanGongGao: calcList(wangZhanGongGao.list),
    contact: site?.contact,
  })
}
