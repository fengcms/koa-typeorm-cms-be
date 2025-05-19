import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import type { TokenPayloadTypes } from '../types/core'

export const createToken = (payload: TokenPayloadTypes): string => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
  return token
}
export const verifyToken = (token: string) => {
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayloadTypes
    } catch (error) {
      return false
    }
  }
  return false
}
