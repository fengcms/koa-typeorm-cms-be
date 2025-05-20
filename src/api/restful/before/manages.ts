import { getItem, getList } from '@/core/query'
import { verifyToken } from '@/core/session'
import type { RequestParamsType } from '@/types/core'
import { decrypt, encrypt } from '@/utils/rsa'
import { calcSha256Hash, makeSalt } from '@/utils/tools'
import type { Context } from 'koa'

const checkParams = async (ctx: Context, { account, name, password, editor }) => {
  // 校验必填参数
  if (!account) ctx.throw(400, '超级管理员账号不能为空')
  if (!password) ctx.throw(400, '超级管理员密码不能为空')
  if (!name) ctx.throw(400, '超级管理员姓名不能为空')
  // 校验编辑器参数
  if (editor && !['MARKDOWN', 'RICHEDITOR'].includes(editor)) ctx.throw(400, '个人编辑器参数有误')
}

export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { account, password } = params
    await checkParams(ctx, params)

    const hasManage = await getItem(ctx, 'Manages', { account })
    if (hasManage) {
      ctx.throw(401, '账号已存在')
    }
    const reqPw = await decrypt(password).catch((e) => ctx.throw(400, '密码RSA加密错误'))
    const salt = makeSalt()
    const hashedPassword = calcSha256Hash(`${reqPw}${salt}`)
    // 将原始密码替换为哈希后的密码
    params.password = hashedPassword
    params.salt = salt

    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { account, password } = params
    const manageInfo = await getItem(ctx, 'Manages', { account })
    if (!manageInfo) ctx.throw(404, '您要更新信息的小编账号不存在')
    if ('err' in manageInfo) ctx.throw(500, '服务器异常')
    if (password) {
      const salt = manageInfo.salt
      // 校验传入密码是否能解密，如能解密则赋值 reqPw
      const reqPw = await decrypt(password).catch((e) => ctx.throw(400, '密码RSA加密错误'))
      console.log(salt, reqPw, manageInfo)
      // 为用户赋值密码和盐
      params.password = calcSha256Hash(reqPw + salt)
      params.salt = salt
    }
    return params
  },

  del: async (ctx: Context, allParams: RequestParamsType, id: string) => {
    const { params, token } = allParams
    const tokenData = verifyToken(token)
    if (!tokenData) ctx.throw(401, 'token 无效')
    const { account } = tokenData

    // 校验是否是自己
    const userInfo = await getItem(ctx, 'Manages', id)
    if ('err' in userInfo) ctx.throw(500, '服务器异常')
    if (userInfo.account === account) ctx.throw(400, '不能删除自己哦！')

    // 校验是否是最后一个超管账号
    const managesList = await getList(ctx, 'Manages')
    if ('err' in managesList) ctx.throw(500, '服务器异常')
    if (managesList.count <= 1) ctx.throw(400, '系统至少需要一个超级管理员账号')

    // 通过校验
    return params
  },
}
