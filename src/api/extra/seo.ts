import { getItem, getList } from '@/core/query'
import type { DetailDataTypes, ListDataTypes } from '@/types/core'
import { objToStr, succ } from '@/utils/tools'
import type { Context } from 'koa'

/*
  根据不同情况，返回页面的SEO信息
*/

const getBreadcrumb = async (ctx: Context, name: string, channelId?: number) => {
  const res = [{ value: '/', label: name, type: 'home' }]
  if (channelId) {
    // 从栏目表拿出所有的栏目数据
    const { list } = (await getList(ctx, 'Channel', { pagesize: -1 })) as ListDataTypes
    // 递归函数
    const makeTree = (channelId: number) => {
      const self = list.find((i) => i.id === channelId)
      if (self.pid !== 0) makeTree(self.pid)
      res.push({ value: self.id, label: self.name, type: 'channel' })
    }
    // 得到结果并返回
    makeTree(channelId)
  }
  return res
}

export default async (ctx: Context, { params }) => {
  let { channel_id: channelId, article_id: articleId, single_id: singleId } = params
  const cacheKey = `seo-${objToStr(params)}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 10000000 * 60 * 10) {
    ctx.body = succ(cache.data)
    return
  }

  const siteInfo = (await getItem(ctx, 'Site', 'first')) as DetailDataTypes
  const res = {
    breadcrumb: [],
    title: '',
    name: '',
    keywords: '',
    description: '',
    copyright: siteInfo.copyright,
    mobile_copyright: siteInfo.mobile_copyright,
    contact: siteInfo.contact,
    channelName: '',
  }
  if (!channelId && !articleId && !singleId) {
    const { name, title, keywords, description } = siteInfo
    res.breadcrumb = await getBreadcrumb(ctx, name)
    res.title = title
    res.keywords = keywords
    res.name = name
    res.description = description
  }
  if (channelId && articleId && singleId) {
    ctx.throw(400, 'SEO 接口不能同时接收多个参数')
  }
  if (channelId) {
    const { name } = siteInfo
    channelId = Number(channelId)
    if (Number.isNaN(channelId)) ctx.throw(400, '请求参数有误')
    const channel = (await getItem(ctx, 'Channel', channelId)) as DetailDataTypes
    if (!channel) ctx.throw(404, '404')
    const { keywords, description } = channel
    const breadcrumb = await getBreadcrumb(ctx, name, channelId)
    res.breadcrumb = breadcrumb
    const titleArr = [...breadcrumb].reverse().map((i) => i.label)
    res.channelName = channel.name
    res.title = titleArr.join(' - ')
    res.keywords = keywords || titleArr.join(',')
    res.description = description || `${titleArr.join('，')}。`
  }
  if (articleId) {
    const { name } = siteInfo
    articleId = Number(articleId)
    if (Number.isNaN(articleId)) ctx.throw(400, '请求参数有误')
    const article = (await getItem(ctx, 'Article', articleId)) as DetailDataTypes | null
    if (!article) ctx.throw(404, '404')
    const { id, title, tags, description, channel_id: cid } = article
    const channel = (await getItem(ctx, 'Channel', cid)) as DetailDataTypes
    const breadcrumb = await getBreadcrumb(ctx, name, cid)
    breadcrumb.push({ value: id, label: title, type: 'article' })
    res.breadcrumb = breadcrumb
    res.name = channel.name
    const titleArr = [...breadcrumb].reverse().map((i) => i.label)
    res.channelName = breadcrumb[breadcrumb.length - 2].label
    res.title = titleArr.join(' - ')
    res.keywords = tags || titleArr.join(',')
    res.description = description || `${titleArr.join('，')}。`
  }
  if (singleId) {
    articleId = Number(singleId)
    if (Number.isNaN(singleId)) ctx.throw(400, '请求参数有误')
    const single = (await getItem(ctx, 'Single', singleId)) as DetailDataTypes | null
    if (!single) ctx.throw(404, '404')
    const { id, title, tags, description } = single
    const breadcrumb = await getBreadcrumb(ctx, siteInfo.name)
    breadcrumb.push({ value: id, label: title, type: 'single' })
    res.name = title
    res.breadcrumb = breadcrumb
    const titleArr = [...breadcrumb].reverse().map((i) => i.label)
    res.title = titleArr.join(' - ')
    res.keywords = tags || titleArr.join(',')
    res.description = description || `${titleArr.join('，')}。`
  }
  global.cache[cacheKey] = { data: res, time: Date.now() }
  ctx.body = succ(res)
}
