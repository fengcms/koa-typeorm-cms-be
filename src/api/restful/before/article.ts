import { getItem } from '@/core/query'
import { verifyToken } from '@/core/session'
import type { MethodTypes, RequestParamsType, UserRoleTypes } from '@/types/core'
import { filterStrHtml } from '@/utils/tools'
import type { Context } from 'koa'
import { marked } from 'marked'

const articleHandle = async (
  ctx: Context,
  params: any,
  roleName: UserRoleTypes,
  method: MethodTypes,
  token: string,
  id?: string,
) => {
  const tokenData = verifyToken(token)
  if (!tokenData) ctx.throw(400, 'token 无效')
  const { id: userId } = tokenData

  if (method === 'put') {
    const sArticle = await getItem(ctx, 'Article', id)
    if (!sArticle) ctx.throw(400, '您要编辑的文章不存在')
    const { status } = sArticle
    if (status === 'PENDING') ctx.throw(400, '该文章正在审核中，审核通过后才能修改')
    if (status === 'FAILURE') ctx.throw(400, '该文章审核未通过，无法修改')
    if (roleName === 'user') {
      const { user_id: articleUserId } = await getItem(ctx, 'Article', id)
      if (Number(userId) !== articleUserId) ctx.throw(400, '您没有权限修改别人的文章')
    }
  }

  if (roleName === 'user') {
    // 针对会员的权限特殊处理
    const { name, status } = await getItem(ctx, 'User', userId)
    if (status === 'PENDING') ctx.throw(400, '你的账号还没有通过审核，通过审核后，才能投稿哦！')
    if (status === 'FAILURE') ctx.throw(400, '你的账号已被禁用！')
    if (status !== 'NORMAL') ctx.throw(400, '你的账号状态异常！')

    if (method === 'post') params.author = name
    params.status = 'PENDING'
    params.user_id = Number(userId)
  }

  // 针对编辑的特殊权限处理
  if (roleName === 'editor') {
    const { name } = await getItem(ctx, 'Editor', userId)
    params.editor = name
  }

  const { title, channel_id: channelId, content, markdown, description } = params

  if (!title) ctx.throw(400, '文章标题不能为空')
  if (!channelId) ctx.throw(400, '文章归属栏目不能为空')
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
    const { params, currentRole, method, token } = allParams
    return await articleHandle(ctx, params, currentRole, method, token)
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params, currentRole, method, token, id } = allParams
    return await articleHandle(ctx, params, currentRole, method, token, id)
  },
}
