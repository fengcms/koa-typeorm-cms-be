import { readFile } from 'node:fs/promises'
import { RSA_KEY } from '@/config'
import * as forge from 'node-forge'

const { RSA_PRIVATE_KEY_PATH, RSA_PUBLIC_KEY_PATH } = RSA_KEY

// 公钥加密方法
export const encrypt = (str: string) => {
  return new Promise((resolve, reject) => {
    readFile(RSA_PUBLIC_KEY_PATH, 'utf-8').then((data) => {
      try {
        const publicK = forge.pki.publicKeyFromPem(data)
        const res = publicK.encrypt(str, 'RSA-OAEP', {
          md: forge.md.sha256.create(),
          mgf1: forge.md.sha256.create(),
        })
        const Base64Res = forge.util.encode64(res)
        resolve(Base64Res)
      } catch (e) {
        reject(new Error(`RSA加密失败: ${e.message || e}`))
      }
    })
  })
}

// 私钥解密方法
export const decrypt = (str: string) => {
  return new Promise((resolve, reject) => {
    if (!str || typeof str !== 'string') {
      return reject(new Error('RSA解密失败: 无效的输入'))
    }

    readFile(RSA_PRIVATE_KEY_PATH, 'utf-8').then((data) => {
      try {
        const privateK = forge.pki.privateKeyFromPem(data)
        const base64Str = forge.util.decode64(str)
        const res = privateK.decrypt(base64Str, 'RSA-OAEP', {
          md: forge.md.sha256.create(),
          mgf1: forge.md.sha256.create(),
        })
        resolve(res)
      } catch (e) {
        reject(new Error(`RSA解密失败: ${e.message || e}`))
      }
    })
  })
}
