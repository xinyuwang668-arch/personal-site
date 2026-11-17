# Alpader — 标识文件

印章式单字母标志：常青绿外环 + 黄铜虚线内环 + 四枚铜点，中央为 Bodoni Moda 大写 A；
字标为 Cormorant Garamond（已转曲，SVG 不依赖字体）。配色取自站点 `css/style.css`。

## 文件

| 文件 | 用途 |
| --- | --- |
| `alpader-mark.svg` | 符号 · 明底（纸色 #EDE4D0 / 常青 #17352E） |
| `alpader-mark-dark.svg` | 符号 · 暗底 |
| `alpader-mark-mono.svg` | 符号 · 单色墨（虚线 55%） |
| `alpader-logo.svg` | 横向组合 · 明底 |
| `alpader-logo-dark.svg` | 横向组合 · 暗底 |
| `alpader-logo-stacked.svg` | 竖向组合（封面 / 社交图） |
| `alpader-avatar.svg` | 头像（绿底 · 圆角安全） |
| `favicon.svg` | 16–32px 优化版（去掉虚线内环，环线 2.6） |
| `favicon-dark.svg` | 同上 · 暗底 |
| `alpader-mark-header.svg` | 44 单位内联版：主色 `currentColor`，虚线环与铜点用 `var(--brass, currentColor)` |
| `png/` | 位图导出：mark 1024/512/256、logo 2400（明/暗）、stacked 1200、avatar 1024、favicon 512/180/32 |
| `alpader-brand-sheet.png` | 品牌页总览 |

## 规格

- 符号画布 128×128，外环 `r=60` 线宽 2.2，虚线内环 `r=54` 线宽 0.9 `dasharray="1.6 5"`，
  四枚铜点 `r=1.6` 位于 (64,4)(124,64)(64,124)(4,64)。
- 横向组合：符号 176，字标 140（字距 .012），副标 17（字距 .34，黄铜）。
- 竖向组合：符号 180，字标 116，副标 15。
- 最小尺寸：符号 ≥ 20px；20px 以下用 `favicon.svg`；横向组合 ≥ 260px 宽（再小请只用符号）。

## 色彩

`#17352E` 常青 · `#0F2721` 深绿 · `#B08442` 黄铜 · `#D6B36A` 浅铜 · `#EDE4D0` 纸色 · `#21241F` 墨
