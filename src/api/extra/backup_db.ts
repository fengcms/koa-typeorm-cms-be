import { writeFile } from 'node:fs/promises'
import { DBConfig } from '@/config'
import { runCommand } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFileName = `backup-${timestamp}.sql`

  try {
    const { stdout: aaa } = await runCommand('whoami', [])
    const { stdout, stderr } = await runCommand(
      'docker exec mysql mysqldump -h 192.168.8.6 -u root -p123456 koa_cms --single-transaction --routines --triggers --events',
      [],
    )
    console.log(aaa)
    // const { stdout, stderr } = await runCommand('/usr/bin/docker exec mysql mysqldump', [
    //   '-h',
    //   DBConfig.host,
    //   '-u',
    //   DBConfig.username,
    //   `-p${DBConfig.password}`,
    //   DBConfig.database,
    //   '--single-transaction',
    //   '--routines',
    //   '--triggers',
    //   '--events',
    // ])

    if (stderr) {
      throw new Error(stderr)
    }

    await writeFile(`backups/${backupFileName}`, stdout)

    ctx.body = {
      success: true,
      message: '数据库备份成功',
      file: backupFileName,
      size: stdout.length,
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      success: false,
      message: '数据库备份失败',
      error: error.message,
    }
  }
}
