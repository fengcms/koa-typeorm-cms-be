import { getItem, getList } from '@/core/query'
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
  // 校验传入密码是否能 RSA 解密
  if (password) {
    const dePassword = await decrypt(password).catch((e) =>
      ctx.throw(400, '超级管理员登录密码有误，请检查客户端RSA配置'),
    )
    return dePassword
  }
}

export default {
  post: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    const { account } = params
    const dePassword = await checkParams(ctx, params)
    if (!dePassword) {
      ctx.throw(400, '超级管理员密码不能为空')
    }
    const hasManage = await getItem(ctx, 'Manages', { account })
    if (hasManage) {
      ctx.throw(401, '账号已存在')
    }
    const salt = makeSalt()
    const hashedPassword = calcSha256Hash(`${dePassword}${salt}`)
    // 将原始密码替换为哈希后的密码
    params.password = hashedPassword
    params.salt = salt

    return params
  },
  put: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    params.password = undefined
    params.salt = undefined
    return params
  },
  ls: async (ctx: Context, allParams: RequestParamsType) => {
    const { params } = allParams
    // const { password } = params

    // const dePassword = await encrypt(password)
    // console.log(dePassword)

    return params
  },
  del: async (ctx: Context, allParams: RequestParamsType, id: string) => {
    const { params } = allParams
    // 校验是否是自己
    const userInfo = await getItem(ctx, 'Manages', id)
    if (userInfo.account === params.account) ctx.throw(400, '不能删除自己哦！')

    // 校验是否是最后一个超管账号
    const managesList = await getList(ctx, 'Manages')
    if (managesList.count <= 1) ctx.throw(400, '系统至少需要一个超级管理员账号')

    // 通过校验
    return params
  },
}
