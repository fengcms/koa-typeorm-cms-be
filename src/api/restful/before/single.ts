import { getItem } from '@/core/query'
import { verifyToken } from '@/core/session'
import type { MethodTypes, RequestParamsType, UserRoleTypes } from '@/types/core'
import { filterStrHtml } from '@/utils/tools'
import type { Context } from 'koa'
import { marked } from 'marked'

const articleHandle = async (ctx: Context, params: any) => {
  const { title, content, markdown, description } = params

  if (!title) ctx.throw(400, '文章标题不能为空')
  if (!content && !markdown) ctx.throw(400, '文章正文不能为空')
  // 如果有 markdown 则将 markdown 转成 html 并存放到 content
  if (markdown && !content) {
    params.content = marked(markdown)
  }
  // 如果没有简介，则从正文中提取前200个字符作为简介
  if (!description) {
    params.description = filterStrHtml(params.content).substring(0, 200)
  }
  return params
}

export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    return await articleHandle(ctx, params)
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    return await articleHandle(ctx, params)
  },
}
