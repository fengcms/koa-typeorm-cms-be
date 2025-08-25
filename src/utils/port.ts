import * as net from 'node:net'

/**
 * 检查端口是否可用
 * @param port 端口号
 * @returns Promise<boolean> 端口是否可用
 */
export const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer()
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true)
      })
      server.close()
    })
    
    server.on('error', () => {
      resolve(false)
    })
  })
}

/**
 * 查找可用端口
 * @param startPort 起始端口号
 * @param maxAttempts 最大尝试次数
 * @returns Promise<number> 可用的端口号
 */
export const findAvailablePort = async (startPort = 3000, maxAttempts = 100): Promise<number> => {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i
    const available = await isPortAvailable(port)
    
    if (available) {
      return port
    }
  }
  
  throw new Error(`Unable to find available port, tried from ${startPort} to ${startPort + maxAttempts - 1}`)
}