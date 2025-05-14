import type { Context, Next } from 'koa'
import { fail } from '../utils/tools'

interface KoaError extends Error {
  statusCode?: number
  status?: number
  message: string
}

const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (err: unknown) {
    const error = err as KoaError
    ctx.status = error.statusCode || error.status || 500
    ctx.body = fail(error.message, ctx.status)
  }
}

export default errorHandler
