export type MethodTypes = 'ls' | 'post' | 'put' | 'del' | 'get'
export type ModelType = typeof import('../models/index')[keyof typeof import('../models/index')]
export interface RequestParamsType {
  apiName: string
  method: MethodTypes
  id: string
  params?: any
}

export interface ListDataTypes {
  list: any[]
  count: number
  page: number
  pageSize: number
}

export interface TokenPayloadTypes {
  account: string
  role: 'admin' | 'user' | 'editor'
}
