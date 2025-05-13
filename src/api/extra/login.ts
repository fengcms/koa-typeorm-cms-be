import { succ } from '../../utils/tools'

export default async (ctx, { params }, next) => {
  ctx.body = succ({ token: true })
}
