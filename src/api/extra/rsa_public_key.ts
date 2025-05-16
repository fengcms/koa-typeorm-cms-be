import { RSA_KEY } from '@/config'
import { readTextFile, succ } from '@/utils/tools'
import type { Context } from 'koa'

const { RSA_PUBLIC_KEY_PATH } = RSA_KEY

export default async (ctx: Context) => {
  const publicKey = await readTextFile(RSA_PUBLIC_KEY_PATH)
  ctx.body = succ(publicKey)
}
