---
title: "第一篇文章"
date: 2026-04-29T00:00:00+08:00
draft: false
tags: ["随笔", "Hugo"]
---

## 你好，世界

这是博客的第一篇文章。

博客用 **Hugo** 构建，使用自制的 *Claudian* 主题——像素风格 × 维多利亚暗色调。文章可以直接在浏览器里通过 `/admin/` 写作并保存，无需本地环境。

## 技术栈

- **构建**：Hugo
- **主题**：Claudian（自制，像素 + 维多利亚）
- **托管**：GitHub Pages
- **编辑器**：Decap CMS（`/admin/` 路由，浏览器内写作）
- **部署**：GitHub Actions，push 即发布

## 代码示例

```lua
-- 维多利亚风格的 Hello World
local function greet(name)
    print(string.format("✦ Greetings, %s ✦", name))
end

greet("World")
```

> 万事开头难，但第一步总要踏出去。
