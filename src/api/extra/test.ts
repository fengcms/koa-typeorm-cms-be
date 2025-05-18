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
  const f = await decrypt(
    'c6surwClRXcMeAm+1HH8qtG0K185t+6tk5pUHfrzbfrOwPFs3B8u3SWut6Wv7HHHX8xvbe8SEEZRRvghwkGCfbRkgclpEfoWcYkHFUh2X1OplA4uDUV3eRpFJL4W/++X8onRIG+Wysi9A8W9wNtYfyJFNipJ7vqtzbuv/NnSPXOtc4LCDNVX8TU3zYGcFrAl4bFtzmPP7HRGXf8yQrNK2nfrkV/1CpyD1xpDL9dnzCGbL6LKRFb6IY7iy7CFEGjsIGAjbCHOwuvdJt/XWl9XrtFVy5C6pHODtWNhrEAycQKMDBCgIivKpczxq4ATagKy1wdLvi0DMjAANz0FGQGerg==',
  )

  console.log('e', e.length)
  ctx.body = succ({ a, b, c, d, e, f })
}
