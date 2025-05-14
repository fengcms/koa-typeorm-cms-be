import type { ListDataTypes } from '../../../types/core'

export default {
  ls: (data: ListDataTypes) => {
    data.list.map((r) => {
      r.content = undefined
      r.markdown = undefined
    })
    return data
  },
}
