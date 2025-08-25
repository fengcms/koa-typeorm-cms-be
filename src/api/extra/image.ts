import { handleImageRequest } from '@/service/images'
import type { RequestParamsType } from '@/types/core'
import type { Context } from 'koa'

/**
 * 图片读取接口
 * GET /api/image
 */
export default async (ctx: Context, params: RequestParamsType) => {
  const { method } = params

  if (method === 'ls') {
    // 处理图片读取请求
    await handleImageRequest(ctx)
  } else {
    ctx.throw(405, '不支持的请求方法')
  }
}
