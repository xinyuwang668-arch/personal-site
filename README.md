# 王欣宇 · 个人档案 / Wang Xinyu

一个「复古未来主义打底、达达拼贴为主、少量超现实」的单页个人网站。
Art Deco 的纸色与黄铜、1960s 太空时代的拱门与徽章是底色；报纸剪贴、错位字母、
火车票与一次掷骰子把它撕开；关于区那张插画里则多了一扇漂浮的门和一只云里的眼睛。
纯静态、零依赖，把 `personal-site/` 整个目录丢到任何静态托管上就能跑。

**线上地址**：https://alpader.lol/
（GitHub Pages，仓库 `personal-site`，`main` 分支根目录）

> 姓名、项目、时间线、邮箱、作品详情页与手记都已按真实信息填过；
> 只剩少数项目截图与「手记」正文还值得继续补。视觉系统可以整套保留。

---

## 预览

```bash
# 方式一：Python
cd personal-site
python -m http.server 8765
# 打开 http://127.0.0.1:8765/

# 方式二：Node
npx serve personal-site
```

直接双击 `index.html` 也能看，但 `file://` 下的字体与锚点行为不如本地服务器稳定，建议用上面的方式。

---

## 文件结构

```
personal-site/
├── index.html          # 首页结构与中文原文
├── notes.html          # 开发手记列表页（5 篇短文 + 锚点）
├── 404.html            # 没有归档的页面
├── feed.xml            # RSS 2.0（5 篇手记）
├── sitemap.xml         # 8 个可索引 URL
├── works/              # 6 个项目详情页
│   ├── hide-zip.html
│   ├── video-link.html
│   ├── nekovault.html
│   ├── gif-studio.html
│   ├── silk2wav.html
│   └── qqvoice.html
├── assets/
│   ├── og.png          # 分享卡 2400×1260
│   └── shots/          # 项目页面里的运行截图与演示 GIF
├── css/style.css       # 设计系统、版式、动效、响应式、打印样式
├── js/i18n.js          # 中 / 英 / 日 / 韩 词典与切换逻辑
├── js/doc-i18n.js      # 详情页（项目页 + 手记）的英 / 日 / 韩补充词条
├── js/main.js          # 滚动进度、导航高亮、移动菜单、进场动画、掷骰子与拖拽、彩蛋
├── tools/set-site-url.py  # 一键把 og / RSS / sitemap 指到正式地址
├── .site-url           # 上一步记住的地址（脚本自己生成）
├── favicon.svg
└── README.md
```

- 无构建步骤、无框架、无 npm 依赖。
- 字体从 Google Fonts 渐进加载（Cormorant Garamond + Noto Serif SC）；加载失败会回落到
  Georgia / 宋体，版式不会塌。
- 装饰全部是内联 SVG 与 CSS：噪点、暗角、六列竖网格、跑马灯、Art Deco 徽章、拱门插画、邮戳，
  以及达达段的报纸拼贴、半调网点、胶带与错位纸片。

### 详情页怎么改

项目页和手记页共用 `doc-header / doc / doc__meta / doc__body / doc__nav / doc-footer` 这套样式
（在 `style.css` 末尾，约 1750 行以后）。

- 一个项目页包含：`PROJECT 0x — 类型`、标题 + 英文小字、一句 lead、四列 meta、正文（它做什么 /
  怎么做的 / 踩过的坑 / 引用）、上一个下一个链接。
- 手记页每条是 `<article class="note-entry" id="...">`，id 与首页的 `notes.html#...` 对应；
  加一条就复制一个 article、改 id 和日期。
- 改完之后记得同步首页卡片的 `href`：作品卡指向 `works/xxx.html`，手记指向
  `notes.html#slug`，「全部文章」指向 `notes.html`。
- 详情页同样支持中 / 英 / 日 / 韩：页面末尾依次加载 `js/i18n.js` 与 `js/doc-i18n.js`，
  头部有同一组「中 / EN / 日 / 한」。`doc-i18n.js` 通过 `WXI18N.add()` 注册详情页词条，
  改详情页文案时要同步它的键（见下面「多语言」一节）。

---

## 替换清单

### 1. 姓名与品牌

| 位置 | 现在的内容 | 说明 |
| --- | --- | --- |
| `<title>` / `<meta name="description">` | 王欣宇 · 个人档案 | 浏览器标题与搜索结果摘要 |
| `<meta property="og:*">` | 同上 | 分享到社交平台时的标题与描述 |
| `.brand__cn` / `.brand__en` | 王欣宇 / WANG XINYU | 左上角标志 |
| `.hero__name` | 王欣宇 | 首屏大字 |
| `.hero__latin` | Wang Xinyu · Student Developer | 名字的拉丁转写与身份 |

### 2. 文案

- 首屏：`.hero__tagline`（主标语）、`.hero__desc`（一段自述）、`.hero__meta`（现居 / 身份 / 状态）。
  现居写的是「暂时保密」，想公开就改成城市。
- 关于：`#about` 下的 `.sec-title`、`.lead`、两段正文与 `.stats` 三个数字。
- 联系：`.contact__title`、`.contact__desc`、`.contact__mail`。
- 页脚：`.footer` 的版权行、档案编号与邮戳年份。

> 首屏徽章外圈的 `WANG XINYU · PERSONAL ARCHIVE · EST. 2026 · CHINA`
> 在 `#ringPath` 后的 `<textPath>` 里，改文案时注意路径长度，太长会被裁掉。

### 3. 达达插页（#dada）

夹在跑马灯和「关于」之间的一段无页码插页。故意不写「DADA」这个词：
用剪断的纸、错位的印刷行、一张车票和一次掷骰子来表达，而不是把流派名贴上去。

- 顶部三张叠起来的碎报纸是 `.dada__strip .strip`，纯 CSS 画的印刷行与胶带；
  换角度、换纸色改 `.strip--1/2/3`。
- 标题、说明、按钮：`.dada__title`（中间有 `<br>`，i18n 里对应两条键）、`.dada__desc`、`.dada__roll`。
- 「掷一次骰子」会重排右侧卡片的八个词：`js/main.js` 里 `#rollDice` 的 Fisher-Yates。
  换词直接改 HTML 的八个 `<span class="hat__word">`——它们同时是词典键，三份要一起改。
- 右侧深绿卡片 `.dada__hat`，顶部胶带是 `::before`；`FIG. 02` 是可改的图注。
- 「1916 / ZÜRICH」圆章、半调网点、虚线剪切线都是装饰性的，已 `aria-hidden`，屏幕阅读器不读。

### 4. 作品（6 张卡片 + 一行补充）

`#works` 里每张卡片：

```html
<a class="work" href="works/hide-zip.html">
  <span class="work__index">01</span>
  <h3 class="work__title">藏图 <em>Hide Zip Image</em></h3>
  <p class="work__desc">一句话说明它是什么、解决了什么。</p>
  <ul class="work__tags"><li>Python</li><li>PyInstaller</li></ul>
  <span class="work__arrow">↗</span>
</a>
```

- 6 张卡片按两列排三行；想加减就复制 / 删除节点，并同步 `works/` 里的页面。
- 现在 6 张卡都指向站内详情页；项目页里再按需链到 GitHub（只有「藏图」有公开仓库）。
- 网格下方的 `.works__more` 是「另外还有：超大整数幂、扫雷、贪吃蛇」那行，可自由改写。

### 5. 器物志（本机软件与游戏清单）

`#inventory` 两栏：A 工具 14 件、B 游戏 12 款。每条：

```html
<li class="inv"><span class="inv__i">01</span><span class="inv__name">Adobe Photoshop 2026</span><span class="inv__note">修图、合成、做封面</span></li>
```

- 编号、名称、一句话备注都可以改；条目数量自由，列高会自动撑开。
- 清单来自这台机器的注册表、Steam 库与安装目录，是一次快照；换机器后建议重写。
- 两栏的计数（`14 件` / `12 款`）是手写的，改条目后记得同步。

### 6. 开发笔记（5 条）

`#notes` 每行是「日期 / 标题 / 栏目 · 阅读时长 / 箭头」，都跳到 `notes.html` 对应锚点。
正文在 `notes.html` 的 `<article class="note-entry" id="...">` 里，改标题时两处一起改；
想接站外博客，把 `href` 换掉即可。

### 7. 项目年表

`#journey` 的 `.timeline` 是 `<ol>`，每条：

```html
<li class="tl">
  <p class="tl__year">2026.10</p>
  <div class="tl__body"><h3>喵喵秘藏 <span>/ NekoVault</span></h3><p>做了什么。</p></div>
</li>
```

现在按文件夹修改时间排（2026.06 / .09 / .10 / .11），从新到旧；换项目时连同月份一起改。

### 8. 联系方式与社交

- 邮箱：`xinyuwang668@gmail.com`，全站五处（两处 `mailto:`、两处可见文字、移动菜单一处），
  换地址时一起替换。点击邮箱链接会照常唤起邮件应用，同时把地址复制到剪贴板并在底部提示；
  电脑上没装邮件客户端也不会「点了没反应」。
- GitHub 已指向 `https://github.com/xinyuwang668-arch`；要加 B 站 / 博客，复制一行 `.link` 即可。
- `.links` 是两列网格，删到只剩一条也不会错位。

### 9. 配色与字体

`css/style.css` 顶部的 `:root` 是整套设计令牌：

```css
--paper: #ede4d0;      /* 纸色底 */
--paper-warm: #e7dbc2; /* 暖纸色 */
--ink: #21241f;        /* 墨色 */
--green: #17352e;      /* 主深绿 */
--brass: #b08442;      /* 黄铜 */
--rust: #9c3f2a;       /* 锈红强调 */
```

只改这几个变量就能整体换气质；标题字体在 `--font-serif`，正文与标签在 `--font-sans`。

### 10. 图标与分享图

- favicon 是 `favicon.svg`（纸底 + 绿圆 + 黄铜虚线环 + 四角星），所有页面都已用 `<link rel="icon">` 引入；
  换颜色直接改里面的十六进制值。
- 分享大图是 `assets/og.png`（2400×1260），首页与 7 个详情页的 `og:image` 都已指向它。
  换图时保持 2:1，或同步改 `<meta property="og:image:width/height">`。
  现在的地址是 `https://alpader.lol/assets/og.png`（绝对地址）；
  换部署地址时跑 `tools/set-site-url.py`，它会一起改掉。
- 首页另有 `JSON-LD` 的 `Person` 结构化数据（姓名、身份、GitHub），改社交账号时记得一起改。

### 11. 站点附件：404 / RSS / sitemap / 打印

- `404.html` 是给静态托管用的错误页：GitHub Pages、Netlify、Cloudflare Pages 会自动识别根目录的 `404.html`。
- `feed.xml` 是 5 篇手记的 RSS 2.0，`sitemap.xml` 收录 8 个 URL。
  两者现在指向 `https://alpader.lol`；
  换地址时跑一次 `tools/set-site-url.py`，不要手改。
- 首页 `<head>` 有 `<link rel="alternate" type="application/rss+xml">`，页脚也放了 RSS 入口。
- `@media print` 会去掉噪点、导航、邮戳与胶带，改成白底黑字，并给章节分页；
  打印详情页时，外链后面会补出 URL。

---

## 多语言（中 / 英 / 日 / 韩）

右上角（手机端在菜单底部）有 `中 EN 日 한` 四个按钮，切换时不刷新页面。
选择存在 `localStorage` 的 `wx-lang` 键里，下次打开保持；第一次访问按浏览器语言猜：
`zh*` → 中文，`ja*` → 日文，`ko*` → 韩文，其余 → 英文。

**工作方式**：中文是唯一源语言。`js/i18n.js` 里 `EN` / `JA` / `KO` 三份词典的键，
就是页面上中文文本节点「把连续空白折叠成一个空格、去掉首尾空格」后的原文。
切换时遍历文本节点、按原文查表替换；原文用 `WeakMap` 存着，所以能随时切回中文。
`document.title`、`meta description`、`og:title`、`og:description` 以及
`aria-label` / `title` / `alt` 走同一套逻辑。

详情页（6 个项目页 + 手记页）复用同一套机制：各自页尾加载 `js/i18n.js` 后，再加载
`js/doc-i18n.js`；后者把详情页的三语词条用 `WXI18N.add({ en, ja, ko })` 合并进同一份词典，
头部也有一组「中 / EN / 日 / 한」。所以改详情页中文后，要同步改 `js/doc-i18n.js` 里的键。

改文案的规则：

1. 直接改 `index.html` 里的中文；
2. 打开 `js/i18n.js`，把三份词典里对应的**旧中文键**改成新中文（详情页的文案改
   `js/doc-i18n.js`）；
3. 如果只改中文、忘了改键，那一句在英 / 日 / 韩下会原样显示中文（不会报错，但会露馅）。

加新文案：先在页面里写中文，再往三份词典各加一条 `'中文原文': '译文'`。
注意键要跟页面里的文本**完全一致**（包括标点、空格），改完用浏览器控制台自查：

```js
// 切到英文后，页面上还有哪些中文（应为空）
[...document.querySelectorAll('body *')]
  .filter(el => !el.closest('.brand__cn,.hero__name,.lang'))
  .map(el => [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.nodeValue).join(''))
  .filter(t => /[\u4e00-\u9fff]/.test(t));
```

故意不翻译的部分：

- 品牌名「王欣宇」、首屏大字与徽章上的 `WANG XINYU`（名字保持一致，做视觉锚点）；
- 语言按钮本身；
- 作品卡标题后的英文小字（英文界面下自动隐藏，避免重复）。

小细节：韩文用 `word-break: keep-all`，只在空格处换行，不会把「데스크톱」拆两半；
英 / 日 / 韩的文案长度都按 1440 / 1100 / 768 / 390 / 320 五档宽度核过，没有横向溢出。

---

## 没有域名怎么办

不买域名也完全能上线。静态托管送的二级域名就是一个正式地址，HTTPS、`og:image`、RSS 都能用。

**方案一：GitHub Pages（推荐，零成本）**

1. 新建一个 **public** 仓库，名字比如 `personal-site`；
2. 把 `personal-site/` 里的内容推到仓库根目录；
3. 仓库 Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`；
4. 等一分钟，地址就是 `https://alpader.lol/`。

**方案二：Netlify / Cloudflare Pages**

把整个文件夹拖进去，得到一个 `xxx.netlify.app` 或 `xxx.pages.dev`。
GitHub Pages 在国内偶尔不稳，可以拿这两个当备份。

**方案三：等以后想「更像自己的」再买**

`.top` / `.xyz` 首年通常几十块，`.com` 约七十。没有特别必要就先不买。

拿到地址后，在 `personal-site/` 里跑一次：

```bash
python tools/set-site-url.py https://xinyuwang668-arch.github.io/personal-site
```

它会把 8 个页面的 `og:image` / `twitter:image`、`feed.xml`、`sitemap.xml` 一起改成绝对地址，
并把地址记在 `.site-url`。以后换域名再跑一次，会从旧地址迁移，不会留下两套。

> 改完要重新部署；社交平台的分享卡有缓存，必要时用各家的调试器强制刷新一次。
> 只在本机预览时不用跑这个脚本，站内链接全是相对路径，`file://` 之外都正常。

---

## 部署

任选其一，都是上传 `personal-site/` 里的内容即可：

- **GitHub Pages**：推到仓库 → Settings → Pages → Deploy from branch → 选 `main` 与 `/ (root)`。
- **Netlify / Vercel / Cloudflare Pages**：拖入文件夹或连仓库，构建命令留空，输出目录填 `personal-site`。
- **自己的服务器 / 对象存储**：把 `index.html`、`css/`、`js/`、`assets/` 上传到站点根目录。

上线后如果换了地址，回到上面「没有域名怎么办」跑一次 `set-site-url.py` 即可。

---

## 已知取舍

- **没有深色模式**：整站就是一套纸色 / 深绿的双色世界，强行反色会破坏气质，故未做。
- **Google Fonts 在部分地区较慢**：可把字体文件下载到 `fonts/` 自托管，并把 `<link>` 换成
  `@font-face`；版面已按 Georgia / 宋体做过回落测试。
- **进场动画**：`IntersectionObserver` 触发，`prefers-reduced-motion` 下自动关闭；
  若以后加长页面，新节点记得带 `class="reveal"` 和可选的 `style="--d:.06s"` 延迟。
- **截图是真实运行画面**：Tk 应用的截图分辨率与系统缩放有关，换机器重截时保持宽度一致即可；
  项目页的图注也在 `doc-i18n.js` 里有三语词条。
- **器物志是快照**：清单一经写入就不会自动更新，属于「某一年的机器考古」。

---

## 浏览器支持

Chrome / Edge / Firefox / Safari 近两年版本；使用了 `clamp()`、`dvh`、`backdrop-filter`、
`IntersectionObserver`。IE 不支持。
