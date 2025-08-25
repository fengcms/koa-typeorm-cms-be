import * as fs from 'node:fs'
import type { Context } from 'koa'
import { uploadImage } from './processor'

/**
 * 处理单个文件上传
 */
const processSingleFile = async (file: any, options: { resize: boolean; maxSize: number }) => {
  // 检查文件大小
  if (file.size === 0) {
    throw new Error(`文件 ${file.originalFilename} 为空`)
  }

  // 从文件路径读取文件内容
  const fileBuffer = fs.readFileSync(file.filepath)

  // 处理图片
  const imagePath = await uploadImage(fileBuffer, options)

  // 清理临时文件
  try {
    fs.unlinkSync(file.filepath)
  } catch (cleanupError) {
    console.warn('清理临时文件失败:', cleanupError)
  }

  return {
    path: imagePath,
    originalName: file.originalFilename,
    size: file.size,
    mimetype: file.mimetype,
  }
}

/**
 * 图片上传处理函数（支持单张和批量上传）
 */
export const handleImageUpload = async (ctx: Context) => {
  try {
    const files = (ctx.request as any).files
    if (!files || Object.keys(files).length === 0) {
      ctx.throw(400, '请选择要上传的图片')
    }

    // 获取处理选项
    const resize = ctx.request.body?.resize !== 'false' // 默认开启缩放
    const maxSize = Number.parseInt(ctx.request.body?.maxSize) || 1000
    const options = { resize, maxSize }

    // 收集所有图片文件
    const imageFiles: any[] = []

    // 处理不同的文件字段名
    for (const [fieldName, fileOrFiles] of Object.entries(files)) {
      if (fieldName.startsWith('file')) {
        if (Array.isArray(fileOrFiles)) {
          // 多个文件
          imageFiles.push(...fileOrFiles)
        } else {
          // 单个文件
          imageFiles.push(fileOrFiles)
        }
      }
    }

    if (imageFiles.length === 0) {
      ctx.throw(400, '请选择要上传的图片文件')
    }

    // 处理所有文件
    const results: any[] = []
    const errors: any[] = []

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      try {
        const result = await processSingleFile(file, options)
        results.push({
          index: i,
          success: true,
          data: result,
        })
      } catch (error) {
        errors.push({
          index: i,
          success: false,
          error: error.message,
          originalName: file.originalFilename,
        })

        // 清理失败的临时文件
        try {
          fs.unlinkSync(file.filepath)
        } catch (cleanupError) {
          console.warn('清理临时文件失败:', cleanupError)
        }
      }
    }

    // 构建简化的返回结果
    const paths: string[] = []

    // 按原始顺序构建路径数组
    for (let i = 0; i < imageFiles.length; i++) {
      const successResult = results.find((r) => r.index === i)
      if (successResult) {
        paths.push(successResult.data.path)
      } else {
        paths.push('error.jpg')
      }
    }

    // 根据文件数量决定返回格式
    ctx.body = {
      status: 0,
      data: {
        path: imageFiles.length === 1 ? paths[0] : paths,
      },
    }
  } catch (error) {
    ctx.throw(500, error.message)
  }
}
