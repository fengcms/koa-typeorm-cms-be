import type { Context } from 'koa'
import type { ImageRequestParams, ScaleMode } from './config'
import { validateThumbnailSize, getErrorImage } from './utils'
import { getImage } from './processor'

/**
 * 图片请求处理函数
 */
export const handleImageRequest = async (ctx: Context) => {
  try {
    // 从查询参数或路径参数获取图片路径
    const imagePath = (ctx.query as any).path || ctx.params.path
    const { w, h, mode } = ctx.query as any

    if (!imagePath) {
      // 返回400错误图片
      const { buffer, contentType } = getErrorImage(400)
      ctx.status = 400
      ctx.set('Content-Type', contentType)
      ctx.body = buffer
      return
    }

    const params: ImageRequestParams = {}
    if (w) params.w = Number.parseInt(w)
    if (h) params.h = Number.parseInt(h)
    if (mode) params.mode = mode as ScaleMode

    // 验证请求的缩略图尺寸是否被允许
    if (!validateThumbnailSize(params.w, params.h)) {
      // 返回400错误图片
      const { buffer, contentType } = getErrorImage(400)
      ctx.status = 400
      ctx.set('Content-Type', contentType)
      ctx.body = buffer
      return
    }

    const { buffer, contentType } = await getImage(imagePath, params)

    ctx.set('Content-Type', contentType)
    ctx.set('Cache-Control', 'public, max-age=31536000') // 缓存一年
    ctx.body = buffer
  } catch (error) {
    let statusCode = 500
    
    if (error.message.includes('图片不存在')) {
      statusCode = 404
    } else if (error.message.includes('不支持的缩放模式')) {
      statusCode = 400
    }
    
    // 返回对应的错误图片
    const { buffer, contentType } = getErrorImage(statusCode)
    ctx.status = statusCode
    ctx.set('Content-Type', contentType)
    ctx.body = buffer
  }
}