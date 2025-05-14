import type { DataSource } from 'typeorm'

// 定义 ModelType 类型
declare module 'koa' {
  interface DefaultContext {
    db: DataSource
  }
}
