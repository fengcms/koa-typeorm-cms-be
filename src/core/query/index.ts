import type { Context } from 'koa'
import * as models from '../../models'
import { toType } from '../../utils/tools'
import del from './del'
import get from './get'
import ls from './ls'
import post from './post'
import put from './put'

export const getList = async (ctx: Context, modelKey: string, params = {}) => {
  const model = models[modelKey]
  return await ls(ctx, model, params)
}

// 系统内部查询单条数据方法
export const getItem = async (ctx: Context, modelKey: string, params: any) => {
  const model = models[modelKey]
  if (toType(params) === 'object') {
    const res = await ls(ctx, model, params)
    if (res.list.length) {
      return res.list[0]
    }
    return null
  }
  return await get(ctx, model, null, params as string)
}

// 系统内部添加新数据方法
export const postItem = async (ctx: Context, modelKey: string, params: any) => {
  const model = models[modelKey]
  return await post(ctx, model, params)
}

// 系统内部修改数据方法
export const putItem = async (ctx: Context, modelKey: string, params: any, id: string | number) => {
  const model = models[modelKey]
  return await put(ctx, model, params, String(id))
}

export default { get, ls, post, put, del }
