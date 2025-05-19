import { succ } from '@/utils/tools'
import type { Context } from 'koa'
export default async (ctx: Context) => {
  ctx.body = succ('退出成功')
}
