import type { UserRoleTypes } from '@/types/core'
import type { PermissionConfigType, PermissionMethodType, RolePermissionType } from '@/types/permission'

// 定义控制方法
const ls: PermissionMethodType = 'ls'
const get: PermissionMethodType = 'get'
const put: PermissionMethodType = 'put'
const post: PermissionMethodType = 'post'
const del: PermissionMethodType = 'del'
// 定义默认权限组
const nil: PermissionMethodType[] = []
const anyone: PermissionMethodType[] = [ls, get]
const user: PermissionMethodType[] = [ls, get]
const editor: PermissionMethodType[] = [ls, get, put, post]
const admin: PermissionMethodType[] = [ls, get, put, post, del]

const normal: RolePermissionType = { anyone, user, editor, admin }
const onlyRead: RolePermissionType = { anyone: [ls], user: [ls], editor: [ls], admin: [ls] }
const onlyPost: RolePermissionType = { anyone: [post], user: [post], editor: [post], admin: [post] }
// 导出接口权限
const permission: PermissionConfigType = {
  article: { anyone, user: editor, editor, admin },
  channel: normal,
  single: normal,
  complaint: { anyone: nil, user: editor, editor, admin },
  show: normal,
  manages: { anyone: nil, user: nil, editor: nil, admin },
  flink: { anyone, user: anyone, editor: anyone, admin },
  site: {
    anyone: [ls, get],
    user: [ls, get],
    editor: [ls, get],
    admin: [ls, get, put],
  },
  author: normal,
  origin: normal,
  editor: normal,
  user: { anyone: [get], user: [get], editor: [ls, get], admin },
  tags: normal,
  log: { anyone: nil, user: nil, editor: nil, admin },
  upload: { anyone: nil, user: [post], editor: [post], admin: [post] },
  login: onlyPost,
  logout: onlyRead,
  tree_channel: onlyRead,
  rsa_public_key: onlyRead,
  profile: { anyone: nil, user: editor, editor: editor, admin: editor },
  change_password: { anyone: nil, user: [post], editor: [post], admin: [post] },
  channel_article: onlyRead,
  article_prev_next: onlyRead,
  breadcrumb: { anyone: [ls], user: [ls], editor: [ls], admin: [ls] },
  seo: { anyone: [ls], user: [ls], editor: [ls], admin: [ls] },
  count: { anyone: [ls], user: [ls], editor: [ls], admin: [ls] },
  register: { anyone: [post], user: nil, editor: nil, admin: nil },
  reporter: { anyone: [get], user: [get], editor: [get], admin },
  get_reporter: { anyone: [ls], user: [ls], editor: [ls], admin: [ls] },
}

export const getPermission = (apiName: string) => permission[apiName] ?? false
export const getRolePermission = (permission: RolePermissionType, role: UserRoleTypes) => permission[role] ?? false
export default permission
