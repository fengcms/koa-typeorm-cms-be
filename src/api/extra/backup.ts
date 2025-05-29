import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { DBConfig } from '@/config'
import type { RequestParamsType } from '@/types/core'
import { MySQLBackup } from '@/utils/backup'
import { fail, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context, allParams: RequestParamsType) => {
  const { method, id: fileName } = allParams
  const backDir = './backups'
  if (method === 'post') await backupDB(ctx, backDir)
  if (method === 'ls') await listBackupData(ctx, backDir)
  if (method === 'get') await downloadBackupData(ctx, backDir, fileName)
  if (method === 'del') await deleteBackupData(ctx, backDir, fileName)
}

const backupDB = async (ctx: Context, backDir: string) => {
  try {
    const backup = new MySQLBackup({
      host: DBConfig.host,
      user: DBConfig.username,
      password: DBConfig.password,
      database: DBConfig.database,
      outputDir: backDir,
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

const listBackupData = async (ctx: Context, backDir: string) => {
  try {
    const files = await fs.readdir(backDir)
    const backupFiles = await Promise.all(
      files
        .filter((file) => file.endsWith('.sql'))
        .map(async (file) => {
          const filePath = path.join(backDir, file)
          const stats = await fs.stat(filePath)
          return {
            fileName: file,
            fileSize: stats.size,
            fileCreateTime: stats.birthtime,
          }
        }),
    )
    const list = backupFiles.sort((a, b) => new Date(b.fileCreateTime).getTime() - new Date(a.fileCreateTime).getTime())
    ctx.body = succ({ list, pageSize: list.length, page: 0, count: list.length })
  } catch (error) {
    ctx.status = 500
    ctx.body = fail('获取备份列表失败', 500)
  }
}

const downloadBackupData = async (ctx: Context, backDir: string, fileName: string) => {
  try {
    const filePath = path.join(backDir, fileName)
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false)

    if (!fileExists) {
      ctx.status = 404
      ctx.body = fail('备份文件不存在', 404)
      return
    }

    const stats = await fs.stat(filePath)
    const fileContent = await fs.readFile(filePath)

    ctx.set({
      'Content-Type': 'application/sql',
      'Content-Disposition': `attachment; filename=${encodeURIComponent(fileName)}`,
      'Content-Length': stats.size.toString(),
    })

    ctx.body = fileContent
  } catch (error) {
    ctx.status = 500
    ctx.body = fail('下载备份文件失败', 500)
  }
}

const deleteBackupData = async (ctx: Context, backDir: string, fileName: string) => {
  try {
    const filePath = path.join(backDir, fileName)
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false)
    if (!fileExists) {
      ctx.status = 404
      ctx.body = fail('备份文件不存在', 404)
    }
    // 删除文件
    await fs.unlink(filePath)
    ctx.body = succ({ succ: [fileName] })
  } catch (error) {
    ctx.status = 500
    ctx.body = fail('删除备份文件失败', 500)
  }
}
