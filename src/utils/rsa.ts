import { readFile } from 'node:fs/promises'
import { RSA_KEY } from '@/config'
import * as NodeRSA from 'node-rsa'

const { RSA_PRIVATE_KEY_PATH, RSA_PUBLIC_KEY_PATH } = RSA_KEY
// 公钥加密方法
export const encrypt = (str: string) => {
  return new Promise((resolve, reject) => {
    readFile(RSA_PUBLIC_KEY_PATH).then((data) => {
      const Rsa = new NodeRSA(data)
      Rsa.setOptions({ encryptionScheme: 'pkcs1_oaep' })
      try {
        const res = Rsa.encrypt(str, 'base64')
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
  })
}
// 私钥解密方法
export const decrypt = (str) => {
  return new Promise((resolve, reject) => {
    readFile(RSA_PRIVATE_KEY_PATH).then((data) => {
      const Rsa = new NodeRSA(data)
      Rsa.setOptions({ encryptionScheme: 'pkcs1_oaep' })
      try {
        const res = Rsa.decrypt(str, 'utf8')
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
  })
}
