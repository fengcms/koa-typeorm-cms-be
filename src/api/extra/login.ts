import { JWT_SECRET } from '@/config'
import { succ } from '@/utils/tools'
import * as jwt from 'jsonwebtoken'
import type { Context } from 'koa'

export default async (ctx: Context, { params }) => {
  const token = jwt.sign({ role: 'admin', account: 'fungleo', id: 1 }, JWT_SECRET, { expiresIn: '1d' })
  console.log(token)
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err)
    }
    console.log(user)
  })
  ctx.body = succ({ token: true })
}
