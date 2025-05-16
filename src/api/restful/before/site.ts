import { getItem } from '@/core/query'
import { succ } from '@/utils/tools'
import type { Context } from 'koa'
export default {
  ls: async (ctx: Context) => {
    const res = await getItem(ctx, 'Site', 'first')
    ctx.body = succ(res)
  },
}
