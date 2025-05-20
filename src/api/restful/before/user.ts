import { getItem } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { decrypt } from '@/utils/rsa'
import { calcSha256Hash, makeSalt } from '@/utils/tools'
import type { Context } from 'koa'

export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { account, name, password } = params
    const oldUser1 = await getItem(ctx, 'User', { account })
    if (oldUser1) ctx.throw(400, '登录账号已被占用')
    const oldUser2 = await getItem(ctx, 'User', { name })
    if (oldUser2) ctx.throw(400, '昵称已被占用')

    // 校验传入密码是否能解密，如能解密则赋值 reqPw
    const reqPw = await decrypt(password).catch((e) => ctx.throw(400, '密码RSA加密错误'))

    // 为用户赋值密码和盐
    const salt = makeSalt()
    params.password = calcSha256Hash(reqPw + salt)
    params.salt = salt
    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params, id } = allParams
    const { account, password } = params
    const oldUser = await getItem(ctx, 'User', id)
    if ('err' in oldUser) ctx.throw(500, '服务器异常')
    if (oldUser.account !== account) ctx.throw(400, '登录账号不能修改！')
    const salt = oldUser.salt
    if (password) {
      // 校验传入密码是否能解密，如能解密则赋值 reqPw
      const reqPw = await decrypt(password).catch((e) => ctx.throw(400, '密码RSA加密错误'))
      // 为用户赋值密码和盐
      params.password = calcSha256Hash(reqPw + salt)
      params.salt = salt
    }
    return params
  },
}
