---
title: "像素 × 维多利亚：设计语言的拼接实验"
draft: false
tags: ["设计", "前端", "CSS"]
---

两种风格乍看毫无关联——8-bit 的方格像素，与 19 世纪的繁复雕花。

但二者有一个共同的底层逻辑：**边界的仪式感**。

## 像素边框

像素风的核心是"步进"——所有变化都是离散的，没有圆滑过渡。CSS 实现方式：

```css
.pixel-box {
  border: 2px solid #c9a443;
  box-shadow: 4px 4px 0 0 #6e5618;
  transition: transform .1s steps(1);
}

.pixel-box:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 0 #6e5618;
}
```

`steps(1)` 让动画也变成离散的——悬停时位置瞬移，而不是平滑滑动。

## 维多利亚装饰

维多利亚风格的装饰语言可以用 CSS 伪元素 + Unicode 字符模拟：

```css
.ornament::before { content: '⸻ '; }
.ornament::after  { content: ' ⸻'; }

h2::before { content: '◆ '; color: var(--claude); }
```

## 配色逻辑

| 颜色 | 用途 |
|------|------|
| `#0b0804` | 背景，近黑带暖调 |
| `#e8703a` | Claude 橙，主强调色 |
| `#c9a443` | 维多利亚黄铜，边框与装饰 |
| `#f0e6d3` | 羊皮纸白，正文 |

三色足够，不需要更多。
