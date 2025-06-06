import { readFile } from 'node:fs/promises'
import { RSA_KEY } from '@/config'
import { succ } from '@/utils/tools'
import type { Context } from 'koa'

const { RSA_PUBLIC_KEY_PATH } = RSA_KEY

export default async (ctx: Context) => {
  const publicKey = await readFile(RSA_PUBLIC_KEY_PATH, 'utf-8')
  ctx.body = succ(publicKey)
}
