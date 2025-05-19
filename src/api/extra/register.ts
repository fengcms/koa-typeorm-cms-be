import { getItem, postItem } from '@/core/query'
import { createToken } from '@/core/session'
import type { RequestParamsType } from '@/types/core'
import { decrypt } from '@/utils/rsa'
import { calcSha256Hash, makeSalt, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params } = allParams
  const { account, password } = params
  // 校验传参是否为空
  if (!account || !password) ctx.throw(400, '请输入用户名密码')
  // 校验用户名是否存在
  const dbUser = await getItem(ctx, 'User', { account })
  if (!('err' in dbUser)) ctx.throw(400, '用户名已存在')
  // 校验传入密码是否能解密，如能解密则赋值 reqPw
  const reqPw = decrypt(password).catch((e) => ctx.throw(400, '密码RSA加密错误'))

  // 为用户赋值密码和盐
  const salt = makeSalt()
  params.password = calcSha256Hash(reqPw + salt)
  params.salt = salt
  // 为用户赋值状态
  params.status = 'PENDING'
  params.editor = 'RICHEDITOR'
  const userData = await postItem(ctx, 'User', params)
  if ('err' in userData) ctx.throw(500, '注册用户失败')
  const { id } = userData

  const token = createToken({ role: 'user', account, id, time: new Date() })

  ctx.body = succ(token)
}
