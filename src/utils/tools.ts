import { createHash } from 'node:crypto'
/*
  公共工具方法集合
*/
import * as fs from 'node:fs'
import * as path from 'node:path'
import xss from 'xss'
import { XSS_WHITE_LIST } from '../config/xss-white-list'
// 精确判断数据类型
export const toType = (obj: any) => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// 获取某文件夹下全部 js 文件
export const getJSFile = (filePath: string) => {
  const srcPath = path.resolve(__dirname, filePath)
  const JSFile = []
  const result = fs.readdirSync(srcPath)
  for (const r of result) {
    const JSFileName = r.split('.')[0]
    JSFileName && JSFile.push(JSFileName)
  }
  return JSFile
}
// 成功返回数据方法
export const succ = (data: any) => {
  return {
    status: 0,
    data,
  }
}

// 失败返回数据方法
export const fail = (msg: string, status = 1) => {
  return {
    status,
    msg,
  }
}
// 检查操作目录是否在项目根目录下
export const isInRootPath = (path: string) => {
  const rootPath = process.cwd()
  const pathPre = path.substring(0, rootPath.length)
  return rootPath === pathPre
}
// 读取文本文件
export const readTextFile = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

// 删除文件
export const deleteFile = (path: string) => {
  return new Promise((resolve, reject) => {
    if (!isInRootPath(path)) {
      reject(new Error('不支持在项目根目录以外删除文件或文件夹！'))
    }
    fs.unlink(path, (err) => {
      if (err) reject(err)
      resolve('succ')
    })
  })
}

// 检查文件夹是否存在，若不存在则创建
export const makeDir = (dirPath: string) => {
  // const dirPathPre = dirPath.substring(0, rootPath.length)
  return new Promise((resolve, reject) => {
    // 这里设定仅允许在项目根目录以内建立文件夹，若项目有其他需求，可调整这边的判断逻辑
    // 不建议移除该判断，否则调用该方法可以在硬盘任意地方新建文件夹，可能会不小心干了点啥对吧
    if (!isInRootPath(dirPath)) {
      reject(new Error('不支持在项目根目录以外创建文件夹！'))
    }
    fs.access(dirPath, (err) => {
      if (err) {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
          if (err) {
            reject(new Error(String(err)))
          } else {
            resolve(true)
          }
        })
      } else {
        resolve(true)
      }
    })
  })
}
// 移动文件或文件夹方法
export const moveFile = (sourcePath: string, targetPath: string) => {
  return new Promise((resolve, reject) => {
    if (!isInRootPath(sourcePath) || !isInRootPath(targetPath)) {
      reject(new Error('不支持操作项目根目录以外的文件或文件夹！'))
    }
    fs.rename(sourcePath, targetPath, (err) => {
      if (err) {
        reject(new Error(String(err)))
      } else {
        fs.stat(targetPath, (err) => {
          if (err) {
            reject(new Error(String(err)))
          } else {
            resolve(true)
          }
        })
      }
    })
  })
}
// 对象键名转小写 （目前用于转化 url params 对象）
export const objKeyLower = (o: any) => {
  const res = {}
  for (const i in o) res[i.toLocaleLowerCase()] = o[i]
  return res
}

// 睡眠函数
export const sleep = async (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

// 过滤 html 标签
export const filterStrHtml = (htmlStr: string) => {
  return htmlStr
    .replace(/<.*?>/g, '')
    .replace(/[\r\n]/g, ' ')
    .replace(/&.*?;/g, '')
    .trim()
}

export const filterObjectXss = (o: { [key: string]: any }) => {
  for (const i of Object.keys(o)) {
    o[i] = toType(o) === 'string' ? xss(o[i], { whiteList: XSS_WHITE_LIST }) : o[i]
  }
  return o
}

export const objToStr = (obj: { [key: string]: string }) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}-${value}`)
    .join('_')
}

export const makeSalt = () => {
  return Math.random().toString(36).substring(2, 10)
}

// 计算密码哈希值
export const calcSha256Hash = (str: string) => {
  const hash = createHash('sha256')
  hash.update(str)
  return hash.digest('hex')
}
