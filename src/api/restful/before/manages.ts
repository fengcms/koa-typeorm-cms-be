import { getItem } from '@/core/query'
import type { ModelType, RequestParamsType } from '@/types/core'
import { decrypt, encrypt } from '@/utils/rsa'
import { calcSha256Hash, makeSalt } from '@/utils/tools'
import type { Context } from 'koa'

export default {
  post: async (ctx: Context, model: ModelType, allParams: RequestParamsType) => {
    const { params } = allParams
    const { account, password } = params
    if (!account || !password) {
      ctx.throw(401, '账号或密码不能为空')
    }
    const hasManage = await getItem(ctx, 'Manages', { account })
    if (hasManage) {
      ctx.throw(401, '账号已存在')
    }
    const dePassword = await decrypt(password)
    const salt = makeSalt()
    const hashedPassword = calcSha256Hash(`${dePassword}${salt}`)
    // 将原始密码替换为哈希后的密码
    params.password = hashedPassword
    params.salt = salt

    return params
  },
  ls: async (ctx: Context, model: ModelType, allParams: RequestParamsType) => {
    const { params } = allParams
    const { account, password } = params

    const dePassword = await encrypt(password)
    console.log(dePassword)

    return params
  },
}
