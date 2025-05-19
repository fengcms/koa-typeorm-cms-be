/*
  根据栏目ID，将当前栏目ID所有子栏目的文章一并返回
*/
import { getList } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { objToStr, succ } from '@/utils/tools'
import type { Context } from 'koa'
export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const cacheKey = `channel-article-${objToStr(params)}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 100000 * 60 * 10) {
    ctx.body = succ(cache.data)
    return
  }

  const channelId = Number(params.channel_id) || 0
  params.channel_id = undefined
  const getArtilce = async (ids = {}) => {
    const articleList = await getList(ctx, 'Article', { ...params, ...ids, sort: 'istop,id' })
    if ('err' in articleList) ctx.throw(500, '获取文章数据失败')
    articleList.list = articleList.list.map((i) => {
      i.content = undefined
      i.markdown = undefined
      return i
    })
    return articleList
  }
  if (channelId) {
    // 从栏目表拿出所有的栏目数据
    const channelData = await getList(ctx, 'Channel', { pagesize: -1, sort: '-sort,-id' })
    if ('err' in channelData) ctx.throw(500, '获取栏目数据失败')
    const { list } = channelData
    const res = [channelId]
    // 递归函数
    const makeTree = (channelId: number) => {
      const child = list.filter((i) => i.pid === channelId).map((i) => i.id)
      for (const i of child) makeTree(i)
      res.push(...child)
    }
    // 得到结果并返回
    makeTree(channelId)
    const data = await getArtilce({ 'channel_id-in': res.join(',') })
    global.cache[cacheKey] = { data, time: Date.now() }
    ctx.body = succ(data)
  } else {
    const data = await getArtilce()
    global.cache[cacheKey] = { data, time: Date.now() }
    ctx.body = succ(data)
  }
}
