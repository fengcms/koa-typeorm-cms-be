import * as fs from 'node:fs'
import * as path from 'node:path'
import * as sharp from 'sharp'
import type { ImageProcessOptions, ImageRequestParams } from './config'
import { ImageType, ScaleMode, MAX_SIZE, UPLOAD_DIR, PUBLIC_PREFIX } from './config'
import { getMD5, generateFilePath, ensureDir, generateThumbnailPath, getContentType } from './utils'

/**
 * 检测图片类型
 */
export const detectImageType = async (buffer: Buffer): Promise<ImageType> => {
  try {
    const metadata = await sharp(buffer).metadata()
    return metadata.format as ImageType
  } catch (error) {
    throw new Error('无法识别的图片格式')
  }
}

/**
 * 处理图片
 */
export const processImage = async (
  buffer: Buffer,
  imageType: ImageType,
  options: ImageProcessOptions = {}
): Promise<{ processedBuffer: Buffer; outputFormat: string }> => {
  const { resize = true, maxSize = MAX_SIZE } = options
  let sharpInstance = sharp(buffer)
  let outputFormat = imageType

  // GIF图片不处理，直接返回
  if (imageType === ImageType.GIF) {
    return { processedBuffer: buffer, outputFormat: 'gif' }
  }

  // BMP转换为JPEG
  if (imageType === ImageType.BMP) {
    outputFormat = ImageType.JPEG
    sharpInstance = sharpInstance.jpeg({ quality: 90 })
  }

  // 处理尺寸调整
  if (resize && (imageType === ImageType.JPEG || imageType === ImageType.PNG || imageType === ImageType.BMP)) {
    const metadata = await sharpInstance.metadata()
    const { width = 0, height = 0 } = metadata

    if (width > maxSize || height > maxSize) {
      // 等比例缩放
      sharpInstance = sharpInstance.resize(maxSize, maxSize, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }
  }

  const processedBuffer = await sharpInstance.toBuffer()
  
  // 统一将jpeg后缀替换为jpg
  const finalFormat = outputFormat === 'jpeg' ? 'jpg' : outputFormat
  
  return { processedBuffer, outputFormat: finalFormat }
}

/**
 * 缩放图片
 */
export const scaleImage = async (buffer: Buffer, width?: number, height?: number, mode: ScaleMode = ScaleMode.COVER): Promise<Buffer> => {
  let sharpInstance = sharp(buffer)
  
  if (width || height) {
    let resizeOptions: sharp.ResizeOptions = {}
    
    switch (mode) {
      case ScaleMode.STRETCH:
        resizeOptions = {
          fit: 'fill'
        }
        break
      case ScaleMode.COVER:
        resizeOptions = {
          fit: 'cover',
          position: 'center'
        }
        break
      case ScaleMode.CONTAIN:
        resizeOptions = {
          fit: 'inside',
          withoutEnlargement: true
        }
        break
    }
    
    sharpInstance = sharpInstance.resize(width, height, resizeOptions)
  }
  
  return await sharpInstance.toBuffer()
}

/**
 * 上传并处理图片
 */
export const uploadImage = async (buffer: Buffer, options: ImageProcessOptions = {}): Promise<string> => {
  try {
    // 检测图片类型
    const imageType = await detectImageType(buffer)
    
    // 处理图片
    const { processedBuffer, outputFormat } = await processImage(buffer, imageType, options)
    
    // 计算MD5
    const md5 = getMD5(processedBuffer)
    
    // 生成文件路径
    const { fullPath, publicPath } = generateFilePath(md5, outputFormat)
    
    // 确保目录存在
    const dir = path.dirname(fullPath)
    ensureDir(dir)
    
    // 如果文件已存在，直接返回路径
    if (fs.existsSync(fullPath)) {
      return publicPath
    }
    
    // 保存文件
    fs.writeFileSync(fullPath, processedBuffer)
    
    return publicPath
  } catch (error) {
    throw new Error(`图片处理失败: ${error.message}`)
  }
}

/**
 * 获取图片并支持动态缩放（带缓存）
 */
export const getImage = async (
  imagePath: string,
  params: ImageRequestParams = {},
): Promise<{ buffer: Buffer; contentType: string }> => {
  try {
    // 构建完整文件路径
    const fullPath = path.join(process.cwd(), UPLOAD_DIR, imagePath.replace(PUBLIC_PREFIX, ''))

    // 检查原始文件是否存在
    if (!fs.existsSync(fullPath)) {
      throw new Error('图片不存在')
    }

    const ext = path.extname(fullPath).toLowerCase().substring(1)

    // 如果没有缩放参数，直接返回原图
    if (!params.w && !params.h) {
      const originalBuffer = fs.readFileSync(fullPath)
      return {
        buffer: originalBuffer,
        contentType: getContentType(ext),
      }
    }

    // 验证缩放模式
    if (params.mode && !Object.values(ScaleMode).includes(params.mode)) {
      throw new Error('不支持的缩放模式')
    }

    // 默认缩放模式为cover
    const mode = params.mode || ScaleMode.COVER

    // 生成缩略图文件路径
    const thumbnailPath = generateThumbnailPath(fullPath, params.w, params.h, mode)

    // 检查缩略图是否已存在
    if (fs.existsSync(thumbnailPath)) {
      // 检查缩略图是否比原图新
      const originalStat = fs.statSync(fullPath)
      const thumbnailStat = fs.statSync(thumbnailPath)
      
      if (thumbnailStat.mtime >= originalStat.mtime) {
        // 缩略图存在且是最新的，直接返回
        const thumbnailBuffer = fs.readFileSync(thumbnailPath)
        return {
          buffer: thumbnailBuffer,
          contentType: getContentType(ext),
        }
      }
    }

    // 缩略图不存在或已过期，需要生成新的
    const originalBuffer = fs.readFileSync(fullPath)
    const scaledBuffer = await scaleImage(originalBuffer, params.w, params.h, mode)

    // 保存缩略图到磁盘
    try {
      const thumbnailDir = path.dirname(thumbnailPath)
      ensureDir(thumbnailDir)
      fs.writeFileSync(thumbnailPath, scaledBuffer)
    } catch (saveError) {
      console.warn('保存缩略图失败:', saveError)
      // 即使保存失败，也返回生成的缩略图
    }

    return {
      buffer: scaledBuffer,
      contentType: getContentType(ext),
    }
  } catch (error) {
    throw new Error(`获取图片失败: ${error.message}`)
  }
}