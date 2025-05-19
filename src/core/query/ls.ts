import type { CoreErrorTypes, ListDataTypes, ModelType } from '@/types/core'
import { err } from '@/utils/tools'
import type { Context } from 'koa'
import { In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not } from 'typeorm'

// 从请求参数中找出非标准参数并输出为对象
const getArgs = (params: Record<string, any>) => {
  const args: Record<string, any> = {}
  for (const i in params) {
    if (!['pagesize', 'page', 'time', 'sort'].includes(i)) args[i] = params[i]
  }
  return args
}

// 非标配置项处理字典
const ArgHandle = {
  like: (arg: string) => Like(`%${arg}%`), // 模糊查询
  neq: (arg: string) => Not(arg), // 不等查询
  gt: (arg: string) => MoreThan(arg), // 大于查询
  gteq: (arg: string) => MoreThanOrEqual(arg), // 大于等于查询
  lt: (arg: string) => LessThan(arg), // 小于查询
  lteq: (arg: string) => LessThanOrEqual(arg), // 小于等于查询
  in: (arg: string) => In(arg.split(',')), // in 查询
  nin: (arg: string) => Not(In(arg.split(','))), // notIn 查询
  nil: () => IsNull(), // 空值查询
  nnil: () => Not(IsNull()), // 非空查询
}

const ls = async (
  ctx: Context,
  model: ModelType,
  params: any,
  id?: string,
): Promise<CoreErrorTypes | ListDataTypes> => {
  const repository = ctx.db.getRepository(model)
  const PAGE_SIZE = 10 // 默认分页大小

  const { pagesize = PAGE_SIZE, page = 0, time } = params

  // 校验分页参数
  if (Number.isNaN(Number(pagesize)) || Number.isNaN(Number(page)))
    return err(412, '参数非法, pagesize 和 page 只能是数字')

  const PSize = Number(pagesize)

  // 构建基础查询条件
  const queryBuilder = repository.createQueryBuilder()

  // 处理分页
  if (PSize !== -1) {
    queryBuilder.skip(Number(page) * PSize).take(PSize)
  }

  // 处理排序
  if (params.sort) {
    const sortArr = params.sort.split(',')
    for (const i of sortArr) {
      let sortField = i
      let sortOrder: 'ASC' | 'DESC' = 'DESC'
      if (i.startsWith('-')) {
        sortField = i.substring(1)
        sortOrder = 'ASC'
      }
      queryBuilder.addOrderBy(sortField, sortOrder)
    }
  } else {
    queryBuilder.orderBy('id', 'DESC')
  }

  // 处理时间参数
  if (time) {
    const timeArr = time.split('-')
    const timeArrLen = timeArr.length
    let st: Date
    let et: Date

    if (timeArrLen > 2) return err(412, 'time参数有误')
    if (timeArr.some((i: string) => Number.isNaN(Number(i)))) return err(412, 'time参数只接受时间戳数字')

    if (timeArrLen === 1) {
      const t = +timeArr[0]
      st = new Date(t - (t % 86400000))
      et = new Date(st.getTime() + 86400000)
    } else {
      st = new Date(Number(timeArr[0]))
      et = new Date(Number(timeArr[1]))
    }

    queryBuilder.andWhere('time BETWEEN :st AND :et', { st, et })
  }

  // 处理非标参数
  const args = getArgs(params)
  for (const i in args) {
    const [fieldName, argConf] = i.split('-')

    if (!argConf) {
      // 处理普通查询
      const argArr = String(args[i]).split(',')
      if (argArr.length === 1) {
        queryBuilder.andWhere(`${fieldName} = :${fieldName}`, { [fieldName]: args[i] })
      } else {
        queryBuilder.andWhere(`${fieldName} IN (:...${fieldName})`, { [fieldName]: argArr })
      }
    } else {
      // 处理特殊查询
      if (ArgHandle[argConf]) {
        const condition = ArgHandle[argConf](args[i])
        queryBuilder.andWhere({ [fieldName]: condition })
      } else {
        return err(412, `${i} 请求参数配置不被支持`)
      }
    }
  }

  // 执行查询
  const [list, count] = await queryBuilder.getManyAndCount()

  return {
    page: Number(page),
    list,
    count,
    pageSize: PSize,
  }
}

export default ls
