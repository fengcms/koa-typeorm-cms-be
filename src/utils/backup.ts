import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as dayjs from 'dayjs'
import * as mysql from 'mysql2/promise'

interface BackupConfig {
  host: string
  user: string
  password: string
  database: string
  outputDir?: string
}

export class MySQLBackup {
  private connection: mysql.Connection | null = null

  constructor(private config: BackupConfig) {
    this.config.outputDir = config.outputDir || './backups'
  }

  async connect() {
    this.connection = await mysql.createConnection({
      host: this.config.host,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
    })
  }

  async getTableNames(): Promise<string[]> {
    const [rows] = await this.connection.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema = ?`,
      [this.config.database],
    )
    return (rows as any[]).map((row) => row.TABLE_NAME)
  }

  async backupTable(table: string): Promise<string> {
    // 获取时区设置
    const [timezone] = await this.connection.query('SELECT @@session.time_zone AS tz')
    const tz = (timezone as any)[0].tz || '+00:00'
    if (!this.connection) throw new Error('Not connected to database')
    // 获取表结构和数据
    // 执行查询并获取结果
    // 获取建表语句
    const [createTable] = await this.connection.query(`SHOW CREATE TABLE \`${table}\``)

    // 获取数据并格式化为标准SQL
    const [rows] = await this.connection.query(`SELECT * FROM \`${table}\``)

    let sql = `SET time_zone = '${tz}';\n\n`
    sql += `-- DROP TABLE IF EXISTS \`${table}\`;\n`
    sql += `${(createTable as any)[0]['Create Table']};\n\n`

    if ((rows as any[]).length > 0) {
      sql += `INSERT INTO \`${table}\` VALUES\n`
      sql += `${(rows as any[])
        .map((row) => {
          const values = Object.values(row)
            .map((v) => {
              if (v === null) return 'NULL'
              if (v instanceof Date) {
                // 使用时区修正后的本地时间
                const adjustedDate = new Date(v.getTime() - v.getTimezoneOffset() * 60000)
                return `'${adjustedDate.toISOString().slice(0, 19).replace('T', ' ')}'`
              }
              if (typeof v === 'string') return mysql.escape(v)
              return v
            })
            .join(',')
          return `(${values})`
        })
        .join(',\n')};\n\n`
    }

    return sql
  }

  async fullBackup() {
    try {
      await fs.mkdir(this.config.outputDir, { recursive: true })
      const backupName = dayjs().format('YYYY-MM-DD')
      const backupFile = path.join(this.config.outputDir, `${backupName}.sql`)

      const tables = await this.getTableNames()
      let backupContent = `-- MySQL Backup\n-- Database: ${this.config.database}\n-- Date: ${backupName}\n\n`

      for (const table of tables) {
        backupContent += await this.backupTable(table)
      }

      await fs.writeFile(backupFile, backupContent)
      const stats = await fs.stat(backupFile)
      return {
        success: true,
        fileName: `${backupName}.sql`,
        filePath: backupFile,
        fileSize: stats.size,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '备份失败',
      }
    } finally {
      if (this.connection) await this.connection.end()
    }
  }
}

export default MySQLBackup
