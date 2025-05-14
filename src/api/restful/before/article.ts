import type { Context } from 'koa'
import type { ModelType, RequestParamsType } from '../../../types/core'

export default {
  ls: (ctx: Context, model: ModelType, allParams: RequestParamsType) => {
    const { params } = allParams
    const { channel_id: channelId } = params
    if (!channelId) {
      ctx.throw(412, '缺少 channel_id 参数')
    }
    return params
  },
}
