# 字体规划文档

> 路径：`themes/claudian/static/css/style.css`
> 字体文件：`static/fonts/`（自托管，无 Google Fonts 依赖）

---

## 字体角色分工

| CSS 变量 | 字体 | 风格 | 用途 |
|----------|------|------|------|
| `--font-display` | Pinyon Script | Victorian copperplate 花体草书 | 站点标题、文章标题、hero 标题 |
| `--font-serif` | IM Fell English | 古典衬线（17世纪风格） | 正文 body，文章散文 |
| `--font-pixel` | Press Start 2P | 像素点阵 | 导航、文章 h1–h4、UI 装饰文字 |
| `--font-mono` | Share Tech Mono | 等宽科技感 | 代码块、日期、元数据 |

---

## 各元素字号

| 元素 | 字体变量 | 字号 | 备注 |
|------|----------|------|------|
| `.site-title` | `--font-display` | `1.5rem` | 站点名 "Wvan's Blog" |
| `.site-title .crown` | `--font-display` | `0.9rem` | 副标题装饰行 |
| `.hero-title` | `--font-display` | `3rem` | 首页 hero 大标题 |
| `.post-card-title` | `--font-display` | `1.8rem` | 文章卡片标题 |
| `.post-single-title` | `--font-display` | `2.5rem` | 文章详情页标题 |
| `body` | `--font-serif` | `1.1rem` | 正文默认 |
| `.article-body h1` | `--font-pixel` | `0.85rem` | 文章内 h1（pixel 风格） |
| `.article-body h2` | `--font-pixel` | `0.72rem` | |
| `.article-body h3` | `--font-pixel` | `0.62rem` | |
| `.article-body h4` | `--font-pixel` | `0.55rem` | |
| 代码/日期 | `--font-mono` | `0.78rem` | |

> 注：Pinyon Script 是草书字体，需要大字号（≥1.5rem）才能显示笔触细节，小于 1rem 会失去辨识度。

---

## 自托管文件清单

> 所有文件放在 `static/fonts/`，通过 `/fonts/*.woff2` 访问。

| 文件 | 字体 | 变体 | 大小 | 状态 |
|------|------|------|------|------|
| `pinyon-script.woff2` | Pinyon Script | 400 latin | 38.1KB | ✅ 使用中 |
| `pinyon-script-ext.woff2` | Pinyon Script | 400 latin-ext | 35.3KB | ✅ 使用中 |
| `press-start-2p.woff2` | Press Start 2P | 400 latin | — | ✅ 使用中 |
| `press-start-2p-ext.woff2` | Press Start 2P | 400 latin-ext | — | ✅ 使用中 |
| `im-fell-english.woff2` | IM Fell English | 400 normal | — | ✅ 使用中 |
| `im-fell-english-italic.woff2` | IM Fell English | 400 italic | — | ✅ 使用中 |
| `share-tech-mono.woff2` | Share Tech Mono | 400 latin | — | ✅ 使用中 |
| `silkscreen-400.woff2` | Silkscreen | 400 latin | — | ⚠️ 冗余（未引用） |
| `silkscreen-400-ext.woff2` | Silkscreen | 400 latin-ext | — | ⚠️ 冗余（未引用） |
| `silkscreen-700.woff2` | Silkscreen | 700 latin | — | ⚠️ 冗余（未引用） |
| `silkscreen-700-ext.woff2` | Silkscreen | 700 latin-ext | — | ⚠️ 冗余（未引用） |

**待清理**：Silkscreen 的 `@font-face` 声明和 4 个 woff2 文件均可删除，`--font-pixel` 实际使用的是 Press Start 2P。

---

## 设计主题

**像素维多利亚** (Pixel Victorian)：
- 花体草书标题 → 维多利亚时代精英感
- 像素字体正文装饰 → 复古游戏质感
- 古典衬线正文 → 文艺气质
- 金色配色（`--gold: #c9a443`）+ 深棕背景（`--bg: #0b0804`）→ 羊皮纸/古书氛围

---

## 换字体流程（备忘）

1. 在 [Google Fonts](https://fonts.google.com) 找目标字体，记录字体名
2. 用以下命令获取 woff2 URL（替换字体名和 weights）：
   ```powershell
   Invoke-WebRequest -Uri "https://fonts.googleapis.com/css2?family=Font+Name:wght@400" `
     -Headers @{"User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0"} `
     | Select-Object -ExpandProperty Content
   ```
3. 从返回的 CSS 中提取 `src: url(...)` 里的 woff2 URL
4. 下载文件到 `static/fonts/`：
   ```powershell
   Invoke-WebRequest -Uri "<woff2-url>" -OutFile "C:/Users/hanwu/wvan24-blog/static/fonts/<name>.woff2"
   ```
5. 更新 `style.css` 顶部 `@font-face` 块
6. 修改 `--font-display` 变量值
7. 根据字体类型调整字号（草书需要大字号，几何/衬线可以小字号）
