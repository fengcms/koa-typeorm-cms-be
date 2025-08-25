// 图片类型枚举
export enum ImageType {
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  BMP = 'bmp',
  WEBP = 'webp',
}

// 缩放模式枚举
export enum ScaleMode {
  STRETCH = 'stretch',
  COVER = 'cover',
  CONTAIN = 'contain',
}

// 图片处理选项接口
export interface ImageProcessOptions {
  resize?: boolean // 是否需要缩放
  maxSize?: number // 最大尺寸，默认1000px
}

// 图片请求参数接口
export interface ImageRequestParams {
  w?: number // 宽度
  h?: number // 高度
  mode?: ScaleMode // 缩放模式
}

// 图片服务配置
export const UPLOAD_DIR = '/static/upfiles'
export const PUBLIC_PREFIX = '/upfiles'
export const MAX_SIZE = 1000

// 允许的缩略图尺寸配置
export const ALLOWED_THUMBNAIL_SIZES = [
  { width: 820, height: 400 },
  { width: 150, height: 100 },
  { width: 310, height: 140 },
  { width: 310, height: 205 },
  { width: 225, height: 150 },
]
