export type MethodTypes = 'ls' | 'post' | 'put' | 'del' | 'get'
export type ModelType = typeof import('../models/index')[keyof typeof import('../models/index')]
export type UserRoleTypes = 'admin' | 'user' | 'editor' | 'anyone'

export interface RequestParamsType {
  apiName: string
  method: MethodTypes
  id: string
  params?: any
  currentRole?: UserRoleTypes
  token?: string
}

export interface ListDataTypes {
  list: any[]
  count: number
  page: number
  pageSize: number
}

export type DetailDataTypes = Record<string, any>

export interface CoreErrorTypes {
  err: {
    code: number
    msg: string
  }
}

export interface TokenPayloadTypes {
  account: string
  role: 'admin' | 'user' | 'editor'
  id: number | string
  time: Date
}
