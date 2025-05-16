import type { ListDataTypes } from '@/types/core'

export default {
  ls(data: ListDataTypes) {
    data.list.map((r) => {
      r.password = undefined
      r.salt = undefined
    })
    return data
  },
  get(data: any) {
    data.password = undefined
    data.salt = undefined
    return data
  },
}
