// 定义控制方法
const ls = 'ls'
const get = 'get'
const put = 'put'
const post = 'post'
const del = 'del'
// 定义默认权限组
const nil = []
const anyone = [ls, get]
const user = [ls, get]
const editor = [ls, get, put, post]
const admin = [ls, get, put, post, del]

const normal = { anyone, user, editor, admin }
const onlyRead = { anyone: [ls], user: [ls], editor: [ls], admin: [ls] }
const onlyPost = { anyone: [post], user: [post], editor: [post], admin: [post] }
// 导出接口权限
export default {
  article: { anyone, user: editor, editor, admin },
  channel: normal,
  single: normal,
  complaint: { anyone: nil, user: editor, editor, admin },
  show: normal,
  manages: { anyone: nil, user: nil, editor: nil, admin },
  flink: { anyone, user: anyone, editor: anyone, admin },
  site: {
    anyone: [ls],
    user: [ls],
    editor: [ls],
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
