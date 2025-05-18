import { getItem, postItem } from '@/core/query'
import type { RequestParamsType } from '@/types/core'
import { decrypt, encrypt } from '@/utils/rsa'
import { calcSha256Hash, makeSalt, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context) => {
  const hasManage = await getItem(ctx, 'Manages', 'first')
  console.log('hasManage', hasManage)
  const res = {
    manage: '已存在',
    site: '已存在',
    channel: '已存在',
  }
  if (!hasManage) {
    // const password = await rsa.encrypt('123456')
    const passwordStr = 'admin888'
    const password = calcSha256Hash(`${passwordStr}`)
    postItem(ctx, 'Manages', {
      account: 'admin',
      name: 'admin',
      password,
      email: 'web@web.com',
      mark: '系统初始管理员账号',
    }).then(() => {
      console.log('初始管理员账号添加完成 admin:admin888')
      res.manage = '初始管理员账号添加完成 admin:admin888'
    })
  }

  const hasSite = await getItem(ctx, 'Site', 'first')
  console.log('hasSite', hasSite)
  if (!hasSite) {
    postItem(ctx, 'Site', {
      name: 'FengCMS By FungLeo',
      title: 'FengCMS By FungLeo',
      keywords: 'FengCMS,RESTFul,CMS,koa',
      copyright: 'By FungLeo',
    }).then(() => {
      console.log('初始系统信息数据完成')
      res.site = '初始系统信息数据完成'
    })
  }
  const hasChan = await getItem(ctx, 'Channel', 'first')
  if (!hasChan) {
    const calcchannelMockDat = (pid, pre = '顶级') => {
      return 'leo'.split('').map((i, index) => {
        return { pid, name: `${pre}栏目${pid}${index}` }
      })
    }
    const { id } = await postItem(ctx, 'Channel', calcchannelMockDat(0))
    for (const i of id) {
      const { id: secondLevelIds } = await postItem(ctx, 'Channel', calcchannelMockDat(i, '二级'))
      for (const i of secondLevelIds) {
        await postItem(ctx, 'Channel', calcchannelMockDat(i, '三级'))
      }
    }
    console.log('初始测试栏目数据完成')
    res.channel = '初始测试栏目数据完成'
  }
  ctx.body = succ(res)
}
