import { getItem, putItem } from '@/core/query'
import { verifyToken } from '@/core/session'
import type { RequestParamsType } from '@/types/core'
import { decrypt } from '@/utils/rsa'
import { calcSha256Hash, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { params, token } = allParams
  // 校验token是否存在
  if (!token) ctx.throw(401, '请重新登录')
  // 校验 token 信息
  const tokenData = verifyToken(token)
  if (!tokenData) ctx.throw(401, '请重新登录')
  const { role, account, id } = tokenData
  if (!role || !account) ctx.throw(401, '请重新登录')

  // 校验入参
  const { oldPassword, newPassword } = params
  if (!oldPassword && !newPassword) ctx.throw(400, '请输入原密码以及新密码')

  // 校验传入密码是否可以解密
  const oldPw = await decrypt(oldPassword).catch((e) => ctx.throw(400, '原密码有误，请检查客户端RSA配置'))
  const newPw = await decrypt(newPassword).catch((e) => ctx.throw(400, '新密码有误，请检查客户端RSA配置'))

  const sheet = {
    admin: 'Manages',
    user: 'User',
    editor: 'Editor',
  }
  // 读取账户信息
  const model = sheet[role]
  const userInfo = await getItem(ctx, model, id)
  if ('err' in userInfo) ctx.throw(500, '账户数据存在异常')
  const { password, salt } = userInfo
  const oldSaltPw = calcSha256Hash(`${oldPw}${salt}`)
  if (oldSaltPw !== password) ctx.throw(400, '原密码不正确')
  const newSaltPw = calcSha256Hash(`${newPw}${salt}`)
  // 从账户信息中获取密码并解密

  // 通过校验
  await putItem(ctx, model, { password: newSaltPw }, id)
  ctx.body = succ('密码修改成功')
}
