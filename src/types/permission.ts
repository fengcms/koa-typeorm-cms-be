import type { MethodTypes, UserRoleTypes } from './core'

// 定义权限方法类型
export type PermissionMethodType = MethodTypes

// 定义权限组类型
export type PermissionGroupType = PermissionMethodType[]

// 定义角色权限配置类型
export type RolePermissionType = Record<UserRoleTypes, PermissionGroupType>

// 定义API权限配置类型
export type PermissionConfigType = Record<string, RolePermissionType>
