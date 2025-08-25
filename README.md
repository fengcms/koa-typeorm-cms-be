# Koa CMS 2025 - 内容管理系统后端

一个基于 **Koa.js** + **TypeORM** 构建的现代化内容管理系统后端，提供完整的内容管理、用户管理、权限控制和图片处理功能。

## 🚀 项目特色

### 核心技术栈
- **框架**: Koa.js 3.0 - 轻量级、高性能的 Node.js Web 框架
- **ORM**: TypeORM 0.3.23 - 强大的 TypeScript ORM 框架
- **数据库**: MySQL - 稳定可靠的关系型数据库
- **语言**: TypeScript - 类型安全的 JavaScript 超集
- **认证**: JWT + RSA 加密 - 安全的身份验证机制
- **图片处理**: Sharp - 高性能图片处理库

### 架构特点
- **RESTful API 设计** - 标准化的接口规范
- **模块化架构** - 清晰的代码组织结构
- **类型安全** - 完整的 TypeScript 类型定义
- **自动端口检测** - 智能端口冲突处理
- **环境配置** - 灵活的环境变量管理
- **错误处理** - 统一的错误处理机制
- **日志记录** - 完善的请求日志系统

## 📁 项目结构

```
src/
├── api/                    # API 接口层
│   ├── extra/             # 扩展 API 接口
│   └── restful/           # RESTful API 接口
├── config/                # 配置文件
│   ├── index.ts          # 主配置文件
│   ├── key/              # RSA 密钥存储
│   ├── koaBody.ts        # 请求体解析配置
│   ├── permission.ts     # 权限配置
│   └── xss-white-list.ts # XSS 白名单配置
├── core/                  # 核心功能模块
│   ├── authentication.ts # 身份验证
│   ├── index.ts          # 核心处理逻辑
│   ├── query/            # 查询处理
│   └── session.ts        # 会话管理
├── db/                    # 数据库配置
│   └── index.ts          # 数据源配置
├── middlewares/           # 中间件
│   ├── errorHandler.ts   # 错误处理中间件
│   └── logger.ts         # 日志中间件
├── models/                # 数据模型
│   ├── Article.ts        # 文章模型
│   ├── User.ts           # 用户模型
│   ├── Manages.ts        # 管理员模型
│   ├── Channel.ts        # 频道模型
│   ├── Tags.ts           # 标签模型
│   └── ...               # 其他模型
├── router/                # 路由配置
│   └── index.ts          # 主路由文件
├── service/               # 业务服务层
│   └── images/           # 图片处理服务
├── types/                 # 类型定义
│   ├── core.ts           # 核心类型
│   ├── global.d.ts       # 全局类型
│   ├── koa.d.ts          # Koa 扩展类型
│   └── permission.ts     # 权限类型
├── utils/                 # 工具函数
│   ├── backup.ts         # 备份工具
│   ├── cache.ts          # 缓存工具
│   ├── port.ts           # 端口检测工具
│   ├── rsa.ts            # RSA 加密工具
│   └── tools.ts          # 通用工具
└── index.ts               # 应用入口文件
```

## 🎯 核心功能

### 1. 内容管理系统
- **文章管理**: 支持富文本编辑、Markdown 编辑、文章分类、标签管理
- **频道管理**: 多级频道分类、频道权限控制
- **媒体管理**: 图片上传、视频管理、文件存储
- **SEO 优化**: 自定义标题、描述、关键词

### 2. 用户权限系统
- **多角色管理**: 管理员、编辑、普通用户等角色
- **权限控制**: 基于角色的访问控制 (RBAC)
- **JWT 认证**: 安全的 Token 认证机制
- **RSA 加密**: 密码传输加密保护

### 3. 图片处理服务
- **智能上传**: 支持多种图片格式 (JPEG、PNG、GIF、BMP、WEBP)
- **动态缩放**: 实时生成不同尺寸的缩略图
- **格式转换**: 自动优化图片格式和质量
- **缓存机制**: 缩略图缓存，提高访问性能
- **MD5 去重**: 避免重复文件存储

### 4. RESTful API
- **标准化接口**: 遵循 REST 设计原则
- **自动路由**: 基于模型的自动 CRUD 接口
- **扩展接口**: 支持自定义业务逻辑接口
- **参数验证**: 自动参数校验和类型转换

## 📊 数据模型

### 核心实体
- **Article** - 文章实体，支持富文本内容、分类、标签、状态管理
- **User** - 用户实体，包含个人信息、权限、编辑器偏好
- **Manages** - 管理员实体，后台管理用户
- **Channel** - 频道实体，内容分类管理
- **Tags** - 标签实体，内容标签化管理
- **Site** - 站点配置实体
- **Log** - 操作日志实体
- **Flink** - 友情链接实体

### 数据关系
- 文章与频道：多对一关系
- 文章与标签：多对多关系
- 用户与文章：一对多关系
- 权限与角色：基于角色的权限控制

## 🔧 环境配置

### 环境要求
- Node.js >= 18.17.0
- MySQL >= 5.7
- TypeScript >= 5.8.2

### 安装依赖
```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 环境变量配置
```bash
# 复制环境变量模板
cp .env_exp .env

# 编辑环境变量
vim .env
```

环境变量说明：
```env
DB_NAME="koa_cms"          # 数据库名称
DB_USER="root"             # 数据库用户名
DB_PASS="123456"           # 数据库密码
DB_HOST="localhost"        # 数据库主机
DB_PORT=3306               # 数据库端口
```

### 启动项目
```bash
# 开发模式
pnpm run dev

# 生产模式
pnpm run start
```

## 🌐 API 接口

### 基础 URL
```
http://localhost:3000/api/v1/
```

### 核心接口

#### 认证接口
- `POST /login` - 用户登录
- `POST /logout` - 用户登出
- `POST /register` - 用户注册
- `GET /rsa_public_key` - 获取 RSA 公钥

#### 内容管理
- `GET /article` - 获取文章列表
- `POST /article` - 创建文章
- `PUT /article/:id` - 更新文章
- `DELETE /article/:id` - 删除文章
- `GET /article_detail/:id` - 获取文章详情

#### 用户管理
- `GET /user` - 获取用户列表
- `POST /user` - 创建用户
- `PUT /user/:id` - 更新用户信息
- `DELETE /user/:id` - 删除用户

#### 文件上传
- `POST /upload` - 文件上传
- `POST /image` - 图片上传（支持处理）
- `GET /image` - 图片访问（支持缩放）

#### 系统管理
- `GET /count` - 获取统计数据
- `GET /backup` - 数据备份
- `POST /init` - 系统初始化

### 请求示例

```bash
# 用户登录
curl -X POST http://localhost:3000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"account":"admin","password":"encrypted_password"}'

# 获取文章列表
curl -X GET http://localhost:3000/api/v1/article \
  -H "Authorization: Bearer your_jwt_token"

# 创建文章
curl -X POST http://localhost:3000/api/v1/article \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token" \
  -d '{"title":"文章标题","content":"文章内容"}'

# 上传图片
curl -X POST http://localhost:3000/api/v1/image \
  -F "image=@photo.jpg" \
  -H "Authorization: Bearer your_jwt_token"
```

## 🔒 安全特性

### 身份验证
- **JWT Token**: 无状态的身份验证
- **RSA 加密**: 密码传输加密
- **Token 过期**: 自动 Token 过期机制
- **权限验证**: 接口级权限控制

### 数据安全
- **XSS 防护**: 内容过滤和白名单机制
- **SQL 注入防护**: TypeORM 参数化查询
- **文件上传安全**: 文件类型和大小限制
- **敏感信息保护**: 密码加盐存储

## 🚀 高级特性

### 智能端口检测
系统支持自动端口检测，当默认端口被占用时，会自动尝试下一个可用端口：

```typescript
// 自动从 3000 端口开始检测
const availablePort = await findAvailablePort(3000)
```

### 图片处理服务
内置完整的图片处理服务，支持：
- 多格式支持 (JPEG、PNG、GIF、BMP、WEBP)
- 动态缩放和裁剪
- 智能缓存机制
- MD5 去重存储
- 错误图片返回

### 缓存系统
- 全局内存缓存
- 图片缩略图缓存
- 可配置缓存策略

### 日志系统
- 请求日志记录
- 错误日志追踪
- 操作审计日志

## 📈 性能优化

### 数据库优化
- 索引优化
- 查询优化
- 连接池管理

### 静态资源
- 静态文件服务
- 图片缓存策略
- CDN 支持准备

### 内存管理
- 全局缓存管理
- 临时文件清理
- 内存泄漏防护

## 🔧 开发工具

### 代码质量
- **Biome**: 代码格式化和 Lint 检查
- **TypeScript**: 静态类型检查
- **Nodemon**: 开发热重载

### 脚本命令
```bash
pnpm run dev      # 开发模式启动
pnpm run start    # 生产模式启动
pnpm run format   # 代码格式化
pnpm run lint     # 代码检查
pnpm run check    # 代码检查并自动修复
```

## 📝 部署指南

### 生产环境部署
1. 安装依赖：`pnpm install --production`
2. 配置环境变量：编辑 `.env` 文件
3. 数据库初始化：运行数据库迁移
4. 启动服务：`pnpm run start`

### Docker 部署
```dockerfile
# Dockerfile 示例
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Nginx 配置
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /upfiles/ {
        alias /path/to/static/upfiles/;
        expires 1y;
    }
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 技术支持

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件
- 技术交流群

---

**Koa CMS 2025** - 现代化的内容管理系统解决方案 🚀