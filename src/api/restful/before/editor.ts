import { getItem } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { decrypt } from '@/utils/rsa'
import { calcSha256Hash, makeSalt } from '@/utils/tools'
import type { Context } from 'koa'

const checkParams = async (ctx: Context, { account, name, password, editor }) => {
  // 校验必填参数
  if (!account) ctx.throw(400, '小编账号不能为空')
  if (!name) ctx.throw(400, '小编姓名不能为空')

  // 校验编辑器参数
  if (editor && !['MARKDOWN', 'RICHEDITOR'].includes(editor)) ctx.throw(400, '个人编辑器参数有误')
}

export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { password, account } = params
    // 校验必填参数
    if (!password) ctx.throw(400, '小编登录密码不能为空')

    // 公共校验方法
    await checkParams(ctx, params)

    // 校验账号是否唯一
    const editInfo = await getItem(ctx, 'Editor', { account })
    if (editInfo) ctx.throw(400, '小编账号已经存在')
    const reqPw = await decrypt(password).catch((e) => ctx.throw(400, '密码RSA加密错误'))
    // 为用户赋值密码和盐
    const salt = makeSalt()
    params.password = calcSha256Hash(reqPw + salt)
    params.salt = salt
    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params, id } = allParams
    // 公共校验方法
    await checkParams(ctx, params)

    // 校验账号是否唯一
    const { account, password } = params
    const editInfo = await getItem(ctx, 'Editor', id)
    if ('err' in editInfo) ctx.throw(400, '小编账号异常')
    if (!editInfo) ctx.throw(404, '您要更新信息的小编账号不存在')
    if (editInfo.account !== account) ctx.throw(400, '小编账号不允许修改')
    if (password) {
      const salt = editInfo.salt
      // 校验传入密码是否能解密，如能解密则赋值 reqPw
      const reqPw = await decrypt(password).catch((e) => ctx.throw(400, '密码RSA加密错误'))
      // 为用户赋值密码和盐
      params.password = calcSha256Hash(reqPw + salt)
      params.salt = salt
    }
    return params
  },
}
