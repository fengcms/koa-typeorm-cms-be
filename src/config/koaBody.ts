import { APP_DIR } from '@/config'
import { makeDir } from '@/utils/tools'
import type { HttpMethodEnum } from 'koa-body'
const { TMP_DIR } = APP_DIR
// 检查临时文件夹是否存在，若不存在则新建
makeDir(TMP_DIR)

export const koaBodyConfig = {
  multipart: true,
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'] as HttpMethodEnum[],
  formidable: {
    uploadDir: TMP_DIR,
    hashAlgorithm: 'md5',
    maxFieldsSize: 2 * 1024 * 1024,
    maxFileSize: 2 * 1024 * 1024,
    onFileBegin(name: string, file: any) {
      console.log(`name: ${name}`)
      console.log(file)
      global.tmpFileUrl = global.tmpFileUrl || 0
      file.filepath = `${TMP_DIR}/upfile_${global.tmpFileUrl}`
      global.tmpFileUrl = global.tmpFileUrl >= 10 ? 0 : global.tmpFileUrl + 1
    },
    keepExtensions: false,
  },
  onError(_, ctx) {
    ctx.throw(413, '文件超过限制大小！')
  },
}
