export type MethodTypes = 'ls' | 'post' | 'put' | 'del' | 'get'
export type ModelType = typeof import('../models/index')[keyof typeof import('../models/index')]
export interface RequestParamsType {
  apiName: string
  method: MethodTypes
  id: string
  params?: any
}
