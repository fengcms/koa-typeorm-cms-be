/*
  根据 token 获取或更新个人信息接口
*/

import { getItem, putItem } from '@/core/query'
import { verifyToken } from '@/core/session'
import type { RequestParamsType } from '@/types/core'
import { succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType, next) => {
  const { params, method, token } = allParams
  if (!token) ctx.throw(401, '请重新登录')
  const tokenData = verifyToken(token)
  if (!tokenData) ctx.throw(401, '请重新登录')
  // 校验 token 信息
  const { role, account, id } = tokenData
  if (!role || !account) ctx.throw(401, '请重新登录')
  // 获取个人信息
  const sheet = {
    admin: 'Manages',
    user: 'User',
    editor: 'Editor',
  }
  const modelKey = sheet[role]
  if (['ls', 'get'].includes(method)) {
    // 读取账户信息
    const userInfo = await getItem(ctx, modelKey, id)
    if ('err' in userInfo) ctx.throw(500, '账户数据存在异常')
    // 如果会员注册超过24小时，并且尚未审核，则自动调整为通过审核状态
    if (role === 'user' && userInfo.status === 'PENDING' && +new Date() - userInfo.time > 1000 * 60 * 60 * 24) {
      await putItem(ctx, 'User', { status: 'NORMAL' }, id)
      userInfo.status = 'NORMAL'
    }
    // 删除密码信息并返回其他信息
    userInfo.password = undefined
    userInfo.salt = undefined
    userInfo.role = role
    ctx.body = succ(userInfo)
  }
  // 更新个人信息
  if (['post', 'put'].includes(method)) {
    if (params.account !== account) ctx.throw(400, '个人账号不允许修改')
    const { password, editor } = params
    if (password) ctx.throw(400, '如果更改密码，请通过 change_password 接口')
    if (editor && !['MARKDOWN', 'RICHEDITOR'].includes(editor)) ctx.throw(400, '个人编辑器参数有误')

    // 个人用户修改信息时的特殊管理
    const userInfo = await getItem(ctx, modelKey, id)
    if ('err' in userInfo) ctx.throw(500, '账户数据存在异常')
    if (role === 'user') {
      if (userInfo.name != null && params.name !== userInfo.name) ctx.throw(400, '用户名称不允许修改')
      params.status = userInfo.status
    }
    // 通过校验
    const putRes = await putItem(ctx, modelKey, params, id)
    if ('err' in putRes) ctx.throw(500, '账户更新失败')
    ctx.body = succ('个人信息更新成功')
  }
}
