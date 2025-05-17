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
        const res = publicK.encrypt(str, 'RSA-OAEP')
        const Base64Res = forge.util.encode64(res)
        resolve(Base64Res)
      } catch (e) {
        reject(new Error(e))
      }
    })
  })
}
// 私钥解密方法
export const decrypt = (str: string) => {
  return new Promise((resolve, reject) => {
    readFile(RSA_PRIVATE_KEY_PATH, 'utf-8').then((data) => {
      const privateK = forge.pki.privateKeyFromPem(data)
      try {
        const base64Str = forge.util.decode64(str)
        const res = privateK.decrypt(base64Str, 'RSA-OAEP')
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
  })
}
