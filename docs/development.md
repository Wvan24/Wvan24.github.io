# 开发指南

> Wvan24.github.io — 基于 Hugo 的个人博客，主题 **claudian**，风格为"像素维多利亚"。

## 目录

- [快速上手](#快速上手)
- [项目结构](#项目结构)
- [本地开发](#本地开发)
- [写文章](#写文章)
- [主题架构](#主题架构)
- [部署流程](#部署流程)

---

## 快速上手

**环境要求：** Hugo Extended ≥ 0.145.0、Git

```bash
git clone https://github.com/Wvan24/Wvan24.github.io.git
cd Wvan24.github.io
hugo server        # http://localhost:1313
```

---

## 项目结构

```
Wvan24.github.io/
├── hugo.toml               # 站点配置（标题、菜单、参数）
├── content/                # Markdown 内容
│   ├── posts/              # 博客文章
│   └── about/              # 关于页
├── static/                 # 全局静态资源
│   ├── fonts/              # 自托管字体（woff2）
│   └── admin/              # Decap CMS 后台
├── themes/claudian/        # 自定义主题（不要改为其他主题目录外的结构）
│   ├── layouts/            # Hugo 模板
│   └── static/css/         # 样式表
├── oauth-worker/           # Cloudflare Worker（GitHub OAuth 代理）
├── archetypes/default.md   # hugo new 模板
├── .github/workflows/      # CI/CD
└── docs/                   # 本目录
```

---

## 本地开发

### 启动开发服务器

```bash
hugo server           # 自动热重载，草稿不可见
hugo server -D        # 包含草稿（draft: true）
```

### 修改配置

核心配置在 `hugo.toml`：

```toml
[params]
  author      = "Wvan"
  heroTitle   = "Hello world!"     # 首页大标题
  heroSub     = "吾生也有涯..."     # 首页副标题

[[menu.main]]
  name   = "文章"
  url    = "/posts/"
  weight = 2
```

### 修改样式

CSS 变量集中在 `themes/claudian/static/css/style.css` 顶部 `:root` 块：

```css
:root {
  --bg:    #0b0804;   /* 深棕背景 */
  --gold:  #c9a443;   /* 维多利亚金 */
  --text:  #f0e6d3;   /* 羊皮纸白 */
  --claude:#e8703a;   /* Anthropic 橙 */
}
```

修改这些变量即可全局换色，无需修改其他地方。

---

## 写文章

### 新建文章

```bash
hugo new posts/my-title.md
```

生成文件头：

```toml
+++
date  = '2024-05-02T...'
draft = true
title = 'My Title'
+++
```

发布前将 `draft = true` 改为 `draft = false`。

### 可用 Front Matter 字段

| 字段          | 类型     | 说明                          |
|---------------|----------|-------------------------------|
| `title`       | string   | 文章标题                      |
| `date`        | datetime | 发布日期                      |
| `draft`       | bool     | `true` 不发布                 |
| `tags`        | list     | 标签列表，如 `["Go", "工具"]` |
| `description` | string   | 摘要（列表页截取 120 字）     |
| `hideDate`    | bool     | 隐藏日期显示                  |

### 代码块语法高亮

需要指定语言 tag，否则不着色：

````markdown
```go
func main() {}
```
````

---

## 主题架构

### 模板继承关系

```
baseof.html              ← 所有页面的根模板
├── index.html           ← 首页（Hero + 文章列表）
├── _default/single.html ← 单篇文章
└── _default/list.html   ← 分类/标签列表页
```

每个模板都通过 partials 引入：

```
partials/
├── head.html    # <head>：meta、字体、CSS
├── header.html  # 顶栏：仪表盘、导航、主题切换
└── footer.html  # 底栏：齿轮动画、版权
```

### 字体系统

字体全部自托管于 `/static/fonts/`，CSS 变量映射：

| 变量              | 字体              | 用途              |
|-------------------|-------------------|-------------------|
| `--font-display`  | Pinyon Script     | 站点标题、文章标题 |
| `--font-serif`    | IM Fell English   | 正文              |
| `--font-pixel`    | Press Start 2P    | 导航、文章小标题  |
| `--font-mono`     | Share Tech Mono   | 代码、日期、元数据 |

详见 [fonts.md](./fonts.md)。

### JavaScript 功能

| 文件                | 功能                                      |
|---------------------|-------------------------------------------|
| `theme-toggle.js`   | 深/浅色切换，状态持久化到 localStorage    |
| `collapse.js`       | 文章内 h1–h6 点击折叠，用于长文导航      |

### 新增页面类型

在 `content/` 下新建目录，或在 `hugo.toml` 添加 taxonomy：

```toml
[taxonomies]
  tag      = "tags"
  category = "categories"
```

---

## 部署流程

推送到 `main` 分支后，GitHub Actions 自动执行：

1. 安装 Hugo 0.145.0（Extended）
2. `hugo --gc --minify --baseURL https://wvan24.github.io/`
3. 产物目录 `./public/` 发布到 GitHub Pages

无需手动操作，查看构建日志：GitHub → Actions 标签页。

### Decap CMS（可视化编辑）

访问 `https://wvan24.github.io/admin/`，通过 GitHub OAuth 登录。OAuth 代理由 Cloudflare Worker 提供（`oauth-worker/`），密钥配置在 Cloudflare Dashboard 中，不在代码库里。
