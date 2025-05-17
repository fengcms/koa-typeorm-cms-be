declare global {
  // 直接扩展 globalThis 类型
  var cache: Record<string, any>
  var tmpFileUrl: number
}

export {}
