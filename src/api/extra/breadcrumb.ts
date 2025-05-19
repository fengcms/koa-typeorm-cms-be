/*
  面包屑接口
*/
import { getItem, getList } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { objToStr, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const cacheKey = `breadcrumb-${objToStr(params)}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 100000 * 60 * 10) {
    ctx.body = succ(cache.data)
    return
  }

  const channelId = Number(params.channel_id)
  const siteInfo = await getItem(ctx, 'Site', 'first')
  if ('err' in siteInfo) ctx.throw(500, '获取站点信息失败')
  const { name } = siteInfo
  const res = [{ value: '/', label: name, type: 'home' }]
  if (channelId) {
    // 从栏目表拿出所有的栏目数据
    const ChannelInfo = await getList(ctx, 'Channel', { pagesize: -1 })
    if ('err' in ChannelInfo) ctx.throw(500, '获取栏目数据失败')
    const { list } = ChannelInfo
    // 递归函数
    const makeTree = (channelId: number) => {
      const self = list.find((i) => i.id === channelId)
      if (self.pid !== 0) makeTree(self.pid)
      res.push({ value: self.id as string, label: self.name as string, type: 'channel' })
    }
    // 得到结果并返回
    makeTree(channelId)
  }
  global.cache[cacheKey] = { data: res, time: Date.now() }
  ctx.body = succ(res)
}
