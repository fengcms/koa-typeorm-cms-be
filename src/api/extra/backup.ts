import { DBConfig } from '@/config'
import type { RequestParamsType } from '@/types/core'
import { MySQLBackup } from '@/utils/backup'
import { fail, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  try {
    const backup = new MySQLBackup({
      host: DBConfig.host,
      user: DBConfig.username,
      password: DBConfig.password,
      database: DBConfig.database,
    })
    await backup.connect()
    const result = await backup.fullBackup()

    if (result.success) {
      ctx.body = succ('数据库备份成功')
    } else {
      ctx.status = 500
      ctx.body = fail(result.error || '数据库备份失败', 500)
    }
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = fail('数据库备份失败', 500)
  }
}
