import { promises as fs } from 'node:fs'
import { readFile } from 'node:fs/promises'
import * as path from 'node:path'
import { RSA_KEY } from '@/config'
import * as forge from 'node-forge'

const { RSA_PRIVATE_KEY_PATH, RSA_PUBLIC_KEY_PATH } = RSA_KEY

// 生成RSA密钥对
export const generateRSAKeyPair = async () => {
  try {
    // 检查密钥文件是否已存在
    const [privateExists, publicExists] = await Promise.all([
      fs
        .access(RSA_PRIVATE_KEY_PATH)
        .then(() => true)
        .catch(() => false),
      fs
        .access(RSA_PUBLIC_KEY_PATH)
        .then(() => true)
        .catch(() => false),
    ])

    if (privateExists && publicExists) {
      console.log('RSA key pair already exists')
      return
    }

    // 确保目标目录存在
    await fs.mkdir(path.dirname(RSA_PRIVATE_KEY_PATH), { recursive: true })

    // 生成新的密钥对
    const keypair = forge.pki.rsa.generateKeyPair(2048)
    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey)
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey)

    // 保存密钥对到文件
    await Promise.all([
      fs.writeFile(RSA_PRIVATE_KEY_PATH, privateKeyPem),
      fs.writeFile(RSA_PUBLIC_KEY_PATH, publicKeyPem),
    ])

    console.log('RSA key pair generated successfully')
    return { privateKeyPem, publicKeyPem }
  } catch (error) {
    console.error('Failed to generate RSA key pair:', error)
    throw error
  }
}

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
export const decrypt = (str: string): Promise<string> => {
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
