import { getItem, postItem } from '@/core/query'
import { calcSha256Hash, makeSalt, succ } from '@/utils/tools'
import type { Context } from 'koa'

export default async (ctx: Context) => {
  const hasManage = await getItem(ctx, 'Manages', 'first')
  const res = {
    manage: '已存在',
    site: '已存在',
    channel: '已存在',
  }
  if ('err' in hasManage) {
    const passwordStr = 'admin888'
    const passwordHash = calcSha256Hash(`${passwordStr}`)
    const salt = makeSalt()
    const password = calcSha256Hash(`${passwordHash}${salt}`)
    postItem(ctx, 'Manages', {
      account: 'admin',
      name: 'admin',
      password,
      email: 'web@web.com',
      mark: '系统初始管理员账号',
      salt,
    }).then(() => {
      console.log('初始管理员账号添加完成 admin:admin888')
      res.manage = '初始管理员账号添加完成 admin:admin888'
    })
  }

  const hasSite = await getItem(ctx, 'Site', 'first')
  if ('err' in hasSite) {
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
  if ('err' in hasChan) {
    const calcchannelMockDat = (pid, pre = '顶级') => {
      return 'leo'.split('').map((i, index) => {
        return { pid, name: `${pre}栏目${pid}${index}`, status: 'NORMAL' }
      })
    }
    const postData = await postItem(ctx, 'Channel', calcchannelMockDat(0))
    if ('err' in postData) return
    const { id } = postData
    for (const i of id) {
      const sData = await postItem(ctx, 'Channel', calcchannelMockDat(i, '二级'))
      if ('err' in sData) return
      const { id: secondLevelIds } = sData
      for (const i of secondLevelIds) {
        await postItem(ctx, 'Channel', calcchannelMockDat(i, '三级'))
      }
    }
    res.channel = '初始测试栏目数据完成'
  }
  ctx.body = succ(res)
}
