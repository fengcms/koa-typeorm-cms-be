import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { UPLOAD_DIR, PUBLIC_PREFIX, ALLOWED_THUMBNAIL_SIZES, ScaleMode } from './config'

/**
 * 获取图片的MD5值
 */
export const getMD5 = (buffer: Buffer): string => {
  return crypto.createHash('md5').update(buffer).digest('hex')
}

/**
 * 根据MD5值生成文件路径
 */
export const generateFilePath = (md5: string, ext: string): { fullPath: string; publicPath: string } => {
  const dir = md5.substring(0, 2)
  const filename = `${md5.substring(2)}.${ext}`
  const fullPath = path.join(process.cwd(), UPLOAD_DIR, dir, filename)
  const publicPath = `${PUBLIC_PREFIX}/${dir}/${filename}`
  return { fullPath, publicPath }
}

/**
 * 确保目录存在
 */
export const ensureDir = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * 生成缩略图文件名
 */
export const generateThumbnailPath = (originalPath: string, width?: number, height?: number, mode?: ScaleMode): string => {
  const ext = path.extname(originalPath)
  const baseName = path.basename(originalPath, ext)
  const dir = path.dirname(originalPath)
  
  const suffix = `_${width || 'auto'}x${height || 'auto'}_${mode || ScaleMode.COVER}`
  return path.join(dir, `${baseName}${suffix}${ext}`)
}

/**
 * 获取内容类型
 */
export const getContentType = (ext: string): string => {
  const contentTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    webp: 'image/webp',
  }
  return contentTypes[ext] || 'application/octet-stream'
}

/**
 * 验证请求的尺寸是否在允许的范围内
 */
export const validateThumbnailSize = (width?: number, height?: number): boolean => {
  // 如果没有指定尺寸，允许返回原图
  if (!width && !height) {
    return true
  }
  
  // 检查是否匹配允许的尺寸
  return ALLOWED_THUMBNAIL_SIZES.some(size => 
    size.width === width && size.height === height
  )
}

/**
 * 获取错误图片
 */
export const getErrorImage = (statusCode: number): { buffer: Buffer; contentType: string } => {
  const errorImagePath = path.join(__dirname, 'error', `${statusCode}.gif`)
  
  try {
    if (fs.existsSync(errorImagePath)) {
      const buffer = fs.readFileSync(errorImagePath)
      return {
        buffer,
        contentType: 'image/gif'
      }
    }
  } catch (error) {
    console.warn(`无法读取错误图片: ${errorImagePath}`, error)
  }
  
  // 如果错误图片不存在，返回默认的错误图片内容
  const defaultErrorGif = Buffer.from('GIF89a\x01\x00\x01\x00\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02\x04\x01\x00;', 'binary')
  return {
    buffer: defaultErrorGif,
    contentType: 'image/gif'
  }
}