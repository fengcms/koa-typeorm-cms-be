import { getItem } from '@/core/query'
import { createToken } from '@/core/session'
import { decrypt, encrypt } from '@/utils/rsa'
import { calcSha256Hash, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams) => {
  const { params, method } = allParams
  const { account, password, role } = params
  console.log(111, method)

  // 校验传参是否为空
  if (!account || !password || !role) ctx.throw(400, '请输入用户名密码')

  // 校验登录角色参数
  if (!['admin', 'editor', 'user'].includes(role)) ctx.throw(400, '用户角色参数错误')

  // 校验传入密码是否能解密，如能解密则赋值 reqPw
  const reqPw = await decrypt(password).catch((e) => ctx.throw(400, '用户名密码错误'))
  // 从数据库存储用户信息，根据不同角色，从不同表内读取

  const sheet = {
    admin: 'Manages',
    user: 'User',
    editor: 'Editor',
  }
  const dbUser = await getItem(ctx, sheet[role], { account })
  // 校验传入用户名是否存在
  if (!dbUser) ctx.throw(400, '用户名密码错误')
  const hashedPassword = calcSha256Hash(`${reqPw}${dbUser.salt}`)

  // 校验密码是否正确
  if (dbUser.password !== hashedPassword) ctx.throw(400, '用户名密码错误')

  // 用户通过校验
  const token = createToken({ role, account, id: dbUser.id })
  // 移除 cookies 设置功能
  // ctx.cookies.set('token', token, { httpOnly: true })
  ctx.body = succ({ token })
}
