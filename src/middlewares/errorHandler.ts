import type { Context, Next } from 'koa'

interface KoaError extends Error {
  status?: number
  message: string
}

const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (err: unknown) {
    const error = err as KoaError
    ctx.status = error.status || 500
    ctx.body = {
      code: -1,
      msg: error.message,
    }
  }
}

export default errorHandler
