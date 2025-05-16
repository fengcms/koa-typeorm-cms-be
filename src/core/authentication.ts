import PERMISSION from '@/config/permission'
import { verifyToken } from '@/core/session'
import type { MethodTypes, UserRoleTypes } from '@/types/core'
import type { Context } from 'koa'

export const authentication = async (ctx: Context, apiName: string, method: MethodTypes) => {
  // 获取 token 并从 token 获取用户角色
  const token = ctx.header.authorization?.split(' ')[1] || ''
  const tokenData = verifyToken(token)
  const tokenRole = tokenData ? tokenData.role : ''
  const currentRole: UserRoleTypes =
    ['editor', 'admin', 'user'].includes(tokenRole) && tokenRole !== '' ? tokenRole : 'anyone'
  // 从权限配置名单中，读取对应接口的权限配置
  const permissionConfig = PERMISSION[apiName]
  if (permissionConfig) {
    const rolePermissions = permissionConfig[currentRole]
    console.log('rolePermissions', permissionConfig, rolePermissions, method)
    if (!rolePermissions) ctx.throw(500, '服务端接口权限配置有误')
    if (!rolePermissions.includes(method)) {
      if (currentRole === 'anyone') {
        ctx.throw(401, '请登录后操作')
      } else {
        ctx.throw(403, '您没有权限操作')
      }
    }
  } else {
    /*
      如权限配置内未配置的接口名称，当前放走，交由路由层面处理
      也可在此直接 返回 404
      ctx.throw(404)
    */
  }
  return { currentRole, token }
}
