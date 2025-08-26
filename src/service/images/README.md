# 图片服务 (Image Service)

一个功能完整的图片处理服务，支持图片上传、动态缩放、格式转换、缓存优化等功能。

## 🚀 功能特性

### 核心功能
- **图片上传处理**：支持单张和批量图片上传
- **格式支持**：JPEG、PNG、GIF、BMP、WEBP
- **自动优化**：智能压缩和格式转换
- **动态缩放**：实时生成不同尺寸的缩略图
- **缓存机制**：缩略图自动缓存，提高性能
- **错误处理**：友好的错误图片返回
- **尺寸限制**：可配置的缩略图尺寸白名单

### 技术特性
- **高性能**：基于 Sharp 库的图片处理
- **智能存储**：MD5 去重，避免重复存储
- **模块化设计**：清晰的代码结构，易于维护
- **类型安全**：完整的 TypeScript 类型定义

## 📁 项目结构

```
src/service/images/
├── config.ts          # 配置文件 - 枚举、接口、常量
├── utils.ts           # 工具函数 - MD5、路径生成、验证等
├── processor.ts       # 图片处理核心 - 检测、处理、缩放、上传
├── upload.ts          # 上传处理 - 文件上传逻辑
├── request.ts         # 请求处理 - 图片请求和错误处理
├── index.ts           # 主入口 - 统一导出接口
├── error/             # 错误图片目录
│   ├── 400.gif        # 客户端错误图片
│   ├── 404.gif        # 资源不存在图片
│   └── 500.gif        # 服务器错误图片
└── README.md          # 说明文档
```

## 🔧 配置说明

### 基础配置

```typescript
// 图片存储配置
export const UPLOAD_DIR = '/static/upfiles'     // 存储目录
export const PUBLIC_PREFIX = '/upfiles'         // 公开访问前缀
export const MAX_SIZE = 1000                    // 默认最大尺寸

// 允许的缩略图尺寸
export const ALLOWED_THUMBNAIL_SIZES = [
  { width: 820, height: 400 },  // 大图
  { width: 150, height: 100 },  // 小图
  { width: 310, height: 140 },  // 中图
]
```

### 图片类型支持

```typescript
enum ImageType {
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  BMP = 'bmp',
  WEBP = 'webp',
}
```

### 缩放模式

```typescript
enum ScaleMode {
  STRETCH = 'stretch',  // 拉伸到指定尺寸
  COVER = 'cover',      // 等比例缩放，完全覆盖
  CONTAIN = 'contain',  // 等比例缩放，完全包含
}
```

## 📝 API 使用指南

### 图片上传

**接口地址：** `POST /api/v1/upload`

**请求参数：**
- `image`: 图片文件（必需）
- `resize`: 是否启用缩放（可选，默认 true）
- `maxSize`: 最大尺寸（可选，默认 1000）

**单张上传示例：**
```bash
curl -X POST http://localhost:3000/api/v1/upload \
  -F "file=@photo.jpg"
```

**批量上传示例：**
```bash
curl -X POST http://localhost:3000/api/v1/upload \
  -F "file1=@photo1.jpg" \
  -F "file2=@photo2.jpg" \
  -F "file3=@photo3.jpg"
```

**带参数上传：**
```bash
curl -X POST http://localhost:3000/api/v1/upload \
  -F "file=@photo.jpg" \
  -F "resize=true" \
  -F "maxSize=800"
```

**返回格式：**
```json
{
  "status": 0,
  "data": {
    "path": "/upfiles/12/34567890abcdef.jpg"
  }
}
```

### 图片访问

**直接访问：**
```bash
# 原图
GET /upfiles/12/34567890abcdef.jpg

# 缩略图
GET /upfiles/12/34567890abcdef.jpg?w=200&h=200&mode=cover
```

**API 访问：**
```bash
# 通过 API 接口访问
GET /api/images?path=/upfiles/12/34567890abcdef.jpg&w=200&h=200&mode=cover
```

**缩放参数：**
- `w`: 宽度（像素）
- `h`: 高度（像素）
- `mode`: 缩放模式（stretch/cover/contain，默认 cover）

## 🏗️ 架构设计

### 文件存储结构

```
/static/upfiles/
├── 12/
│   ├── 34567890abcdef.jpg                    # 原图
│   ├── 34567890abcdef_200x200_cover.jpg      # 缩略图缓存
│   └── 34567890abcdef_150x100_contain.jpg    # 其他尺寸缓存
├── ab/
│   └── cdef1234567890abcdef.png
└── ...
```

### 处理流程

#### 上传流程
1. **文件接收**：通过 koa-body 接收上传文件
2. **类型检测**：使用 Sharp 检测图片格式
3. **格式转换**：BMP 自动转为 JPEG
4. **尺寸处理**：超过限制时等比例缩放
5. **MD5 计算**：生成唯一文件名
6. **存储保存**：按 MD5 分目录存储
7. **返回路径**：返回公开访问路径

#### 请求流程
1. **参数解析**：解析路径和缩放参数
2. **尺寸验证**：检查是否在允许范围内
3. **缓存检查**：查找已存在的缩略图
4. **动态生成**：不存在时实时生成
5. **缓存保存**：保存生成的缩略图
6. **内容返回**：返回图片内容

### 错误处理

服务采用**图片化错误处理**，所有错误都返回对应的错误图片：

- **400 错误**：参数错误、尺寸不支持 → 返回 `400.gif`
- **404 错误**：图片不存在 → 返回 `404.gif`
- **500 错误**：服务器错误 → 返回 `500.gif`

这种设计让前端可以统一处理所有图片请求，无需区分正常图片和错误响应。

## 🔍 代码示例

### 基础使用

```typescript
import { handleImageUpload, handleImageRequest } from '@/service/images'

// 在路由中使用
router.post('/upload', handleImageUpload)
router.get('/images', handleImageRequest)
```

### 直接调用核心函数

```typescript
import { uploadImage, getImage } from '@/service/images'

// 上传图片
const imagePath = await uploadImage(buffer, {
  resize: true,
  maxSize: 800
})

// 获取图片
const { buffer, contentType } = await getImage('/upfiles/12/34567890abcdef.jpg', {
  w: 200,
  h: 200,
  mode: 'cover'
})
```

### 自定义配置

```typescript
import { ALLOWED_THUMBNAIL_SIZES } from '@/service/images/config'

// 修改允许的尺寸
ALLOWED_THUMBNAIL_SIZES.push({ width: 400, height: 300 })
```

## ⚡ 性能优化

### 缓存策略
- **缩略图缓存**：生成的缩略图自动保存到磁盘
- **智能更新**：原图更新时缓存自动失效
- **HTTP 缓存**：设置长期缓存头（1年）

### 存储优化
- **MD5 去重**：相同内容的图片只存储一份
- **分目录存储**：避免单目录文件过多
- **格式优化**：BMP 自动转为更小的 JPEG

### 处理优化
- **Sharp 加速**：使用高性能的 Sharp 库
- **流式处理**：大文件采用流式处理
- **并发控制**：批量上传时控制并发数

## 🛡️ 安全特性

### 文件安全
- **类型检测**：严格的文件类型验证
- **尺寸限制**：防止恶意大文件上传
- **路径安全**：防止路径遍历攻击

### 访问控制
- **尺寸白名单**：只允许预定义的缩略图尺寸
- **错误图片**：敏感错误信息不暴露给前端
- **资源限制**：防止服务器资源滥用

## 🔧 部署配置

### 环境要求
- Node.js >= 18.17.0
- Sharp 库（自动安装）
- 足够的磁盘空间用于图片存储

### 目录权限
确保应用有权限创建和写入存储目录：
```bash
mkdir -p /path/to/static/upfiles
chmod 755 /path/to/static/upfiles
```

### Nginx 配置
建议通过 Nginx 直接提供静态文件服务：
```nginx
location /upfiles/ {
    alias /path/to/static/upfiles/;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🐛 故障排除

### 常见问题

**1. 上传失败**
- 检查文件大小是否超过限制
- 确认文件类型是否支持
- 验证存储目录权限

**2. 缩略图不生成**
- 检查 Sharp 库是否正确安装
- 确认原图文件是否存在
- 查看服务器错误日志

**3. 访问 404**
- 确认图片路径是否正确
- 检查静态文件服务配置
- 验证文件是否真实存在

### 调试模式

开启详细日志：
```typescript
// 在 processor.ts 中添加调试日志
console.log('Processing image:', { imageType, options })
```

## 📈 监控指标

建议监控以下指标：
- 上传成功率
- 平均处理时间
- 存储空间使用量
- 缓存命中率
- 错误率分布

## 🔄 版本更新

### v1.0.0
- 基础图片上传和处理功能
- 动态缩放支持
- 缓存机制
- 错误图片返回
- 模块化重构

---

## 📞 技术支持

如有问题或建议，请联系开发团队或提交 Issue。