import { getList } from '@/core/query'
/*
  树形栏目菜单接口
*/
import type { RequestParamsType } from '@/types/core'
import { objToStr, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const cacheKey = `channel_tree_${objToStr(params)}`
  const cache = global.cache[cacheKey]
  if (cache && cache.time > Date.now() - 100000 * 60 * 10) {
    ctx.body = succ(cache.data)
    return
  }
  // 从栏目表拿出所有的栏目数据
  const channelData = await getList(ctx, 'Channel', { pagesize: -1, sort: '-sort,-id', ...params })
  if ('err' in channelData) ctx.throw(500, '获取栏目数据失败')
  const { list } = channelData
  // 递归函数
  const makeTree = (pid: number, arr: any[]) => {
    const res = []
    for (const i of arr) {
      // 直接构型成 element 等 vue 框架的默认数据格式，避免前端需要转化
      const obj = { value: i.id, label: i.name } as { value: number; label: string; children?: any[] }
      if (i.pid === pid) {
        const child = makeTree(i.id, arr)
        if (child.length) obj.children = child
        res.push(obj)
      }
    }
    return res
  }
  // 得到结果并返回
  const tree = makeTree(0, list)
  global.cache[cacheKey] = { data: tree, time: Date.now() }
  ctx.body = succ(tree)
}
