import type { RequestParamsType } from '@/types/core'
import { decrypt, encrypt } from '@/utils/rsa'
import { calcSha256Hash, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const a = calcSha256Hash('admin888')
  const b = (await encrypt(a)) as string
  const c = await decrypt(b)
  const d = `${c}0his6chu`
  const e = calcSha256Hash(d)
  ctx.body = succ({ a, b, c, d, e })
}
