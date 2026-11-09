/* =========================================================
   王欣宇 · 个人档案 — i18n module
   中文是源语言；英/日/韩三份词典按「中文原文」匹配，
   改文案时记得同步改字典（见 README「多语言」一节）。
   ========================================================= */
(() => {
  'use strict';

  const STORAGE_KEY = 'wx-lang';
  const LANGS = ['zh', 'en', 'ja', 'ko'];
  const HTML_LANG = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko' };

  const EN = {
    /* ---- 导航 / 通用 ---- */
    '跳到主要内容': 'Skip to main content',
    '关于': 'About',
    '作品': 'Works',
    '器物': 'Gear',
    '手记': 'Notes',
    '年表': 'Timeline',
    '联系': 'Contact',

    /* ---- 首屏 ---- */
    '把时间折成纸飞机，': 'Fold time into a paper plane,',
    '投向还没到来的 2027。': 'and throw it toward 2027.',
    '高三学生，白天上课，晚上写 Python。做桌面小工具和本地服务——把 QQ 语音转成 WAV、把压缩包藏进图片、把一段视频变成 GIF。相信东西要先做出来，再慢慢做好看。':
      'A high-school senior: classes by day, Python by night. I build small desktop tools and local services: turning QQ voice into WAV, hiding zips inside images, cutting clips into GIFs. Get it working first, then make it beautiful.',
    '查看作品': 'View works',
    '写封信': 'Write to me',
    '现居': 'Based in',
    '暂时保密': 'Undisclosed',
    '身份': 'Role',
    '高三学生 / 开发者': 'High-school senior / Developer',
    '状态': 'Status',
    '在写新东西': 'Building something',
    'FIG. 00 — 时间守护者徽记 / 手绘于 2026 年冬': "FIG. 00 — Timekeeper's emblem / drawn in the winter of 2026",
    'THE PAST IS A FOREIGN COUNTRY — 未来尚未发生，过去仍在生长':
      'THE PAST IS A FOREIGN COUNTRY — the past is still growing.',

    /* ---- 跑马灯 ---- */
    '桌面工具': 'desktop tools',
    '本地服务': 'local services',
    '打包 exe': 'packaged exe',
    '深色界面': 'dark UI',
    '压缩包藏图': 'zips in images',
    '视频转 GIF': 'video to GIF',

    /* ---- 关于 ---- */
    '在题海与终端之间，': 'Between exam papers and the terminal,',
    '造一些自己用得上的东西。': 'I build things I actually need.',
    '王欣宇，中国，2026': 'Wang Xinyu, China, 2026',
    '我是王欣宇，一个高三学生，也是这些工具的作者。':
      "I'm Wang Xinyu, a high-school senior and the author of these tools.",
    '写代码是从一个小脚本开始的：想批量转 QQ 语音，就去看 SILK 格式； 想给朋友分享一段视频，就去学 Flask。后来慢慢学会做界面、打包 exe、 写安装包，也学会了在凌晨一点和报错对视。':
      'It started with a small script: I wanted to batch-convert QQ voice messages, so I read up on the SILK format; I wanted to share a video with a friend, so I learned Flask. Later came interfaces, exe packaging and installers — and staring down error messages at one in the morning.',
    '我关心「做完」：一个工具不该停在 .py，它应该有图标、有安装包、有更新说明； 界面喜欢深色，文档喜欢写到半年后自己还能看懂。这个站也一样， 材料是纸、黄铜，和一点点不合时宜。':
      "I care about finishing: a tool shouldn't stop at a .py file — it deserves an icon, an installer, release notes. I like dark interfaces, and docs written so I can still follow them six months later. This site is the same: paper, brass, and a little out of step with its time.",
    '项目': 'Projects',
    '个': '',
    '从脚本写到安装包': 'from script to installer',
    '成品': 'Shipped',
    '能双击运行的 exe': 'double-clickable exe files',
    '硬盘': 'Disk',
    '存着源码、录屏和没剪的素材': 'source, screen recordings, unedited footage',

    /* ---- 作品 ---- */
    '做过的一些东西': "Some things I've built",
    '2026 — 至今': '2026 — now',
    '共 9 件 / 下面挑了 6 件': '9 in total / 6 shown here',
    '藏图': 'Hide-Zip Image',
    '把压缩包藏进一张图片里：选图、选包、设密码，导出的图片照常能看，提取时一键还原。支持 ZIP / RAR / 7Z、批量处理、AES-256 加密、日志与自检更新。':
      'Hides an archive inside an image: pick an image, pick an archive, set a password. The exported picture still looks normal; extraction restores everything in one click. ZIP / RAR / 7Z, batch jobs, AES-256, logs and update checks.',
    '临时视频链接': 'Video Link Server',
    '把本地视频变成一条会过期的链接：Flask 起服务，cloudflared 打隧道，32 位随机 token，30 分钟后自动失效，也可以随时撤销。':
      'Turns a local video into a link that expires: Flask serves it, cloudflared opens the tunnel, a 32-character token guards it, and the link dies after 30 minutes — or the moment you revoke it.',
    '喵喵秘藏': 'NekoVault',
    '手办、卡牌、海报的数字藏品柜。深紫夜色界面，封面、附件、搜索、网格视图，快照备份与回收站，还能导出加密的 .nvault 单件包。':
      'A digital cabinet for figures, cards and posters. Deep-purple night UI, covers and attachments, search, grid view, snapshot backups and a recycle bin — plus encrypted single-item .nvault exports.',
    '拖进一段视频，选好起止时间、帧率和宽度，导出带调色板的 GIF。内置 FFmpeg，深色界面，打包成单个 exe，双击就能用。':
      'Drop in a clip, choose start/end, frame rate and width, export a GIF with a proper palette. FFmpeg bundled, dark interface, wrapped in a single exe you can just double-click.',
    '语音转换器': 'Voice Converter',
    '把 QQ 的 .silk 语音拖进窗口，批量转成能听的 WAV。保留原文件，已经转过的自动跳过，文件夹整个拖进来也行。':
      'Drag QQ .silk voice files into the window and batch-convert them to playable WAV. Originals are kept, finished files are skipped, and you can drop whole folders in.',
    '拖放': 'Drag & drop',
    '在线语音转换': 'Voice Converter Web',
    '语音转换器的网页版：浏览器里上传、解码、批量打包成 zip 下载。没有客户端，打开网页就能用，部署在 Render 上。':
      'The web version: upload in the browser, decode, download everything as a zip. No client to install, deployed on Render.',
    '另外还有：': 'Also in the drawer: ',
    '超大整数幂计算器': 'Big-Power Calculator',
    '（在窗口里算 2 的十万次方）、': ' (2^100000 in a window), ',
    '扫雷': 'Minesweeper',
    '贪吃蛇': 'Snake',
    '——都在硬盘里，也都打包成了 exe。': ' — all on the disk, all packaged as exe.',

    /* ---- 器物 ---- */
    '这台机器里住着什么': 'What lives inside this machine',
    '一次不太严谨的清点': 'a not-very-rigorous inventory',
    '工具': 'Tools',
    '14 件': '14 items',
    '修图、合成、做封面，从 2013 年用到现在': 'Retouching, compositing, covers — in use since 2013',
    '画草图和临摹，开源的，笔刷很听话': 'Sketches and studies; open source, and the brushes behave',
    '本地跑图，显卡一天里最忙的时候': 'Local image generation — the busiest the GPU gets all day',
    '声音克隆和模型微调的小实验，成功率一半': 'Small experiments in voice cloning and fine-tuning; about a 50% success rate',
    '和角色聊天，顺便研究对话到底该怎么写': 'Chatting with characters, and studying how dialogue should be written',
    '写代码的地方，以及后悔药': 'Where code gets written, and where undo lives',
    '两个随叫随到的运行时，版本号永远记不住': 'Two runtimes always on call; I never remember the version numbers',
    '剪音频、降噪、给视频做片头': 'Trimming audio, noise reduction, intros for videos',
    '一个负责放片子，一个负责让桌面动起来': 'One plays the video, one makes the desktop move',
    'Telegram / QQ / 哔哩哔哩': 'Telegram / QQ / Bilibili',
    '与世界保持连接的三根线': 'Three wires keeping me connected to the world',
    '老派下载三件套，再战十年没问题': 'The old-school download trio — good for another ten years',
    '火绒': 'Huorong',
    '安静的安全软件，不弹窗的那种': "A quiet security tool; the kind that doesn't pop up ads",
    '把 .py 变成别人电脑上能双击的安装包': "Turns a .py into an installer someone else can double-click",
    '所有跟视频、音频打交道的地方都绕不开它': 'Unavoidable anywhere video or audio is involved',
    '游戏': 'Games',
    '重返未来：1999': 'Reverse: 1999',
    '在 MuMu 里玩了两年，抽卡手气一般': 'Two years in MuMu; my luck with pulls is about average',
    '12 款': '12 titles',
    '赛博朋克 2077': 'Cyberpunk 2077',
    '夜之城，第三次通关进行中': 'Night City — third playthrough in progress',
    '地铁 2033 / 最后的曙光 / 离去': 'Metro 2033 / Last Light / Exodus',
    '末世里最像「家」的一部': "The most home-like chapter of the post-apocalypse",
    '寂静岭 f': 'Silent Hill f',
    '刚放下手柄，还在想那个结局': 'Just put the controller down; still thinking about that ending',
    '生化危机 2 / 3 重制版': 'Resident Evil 2 / 3 Remake',
    '浣熊市的老熟人了，路线倒背如流': 'An old regular of Raccoon City; I know the routes by heart',
    '极限竞速：地平线 4': 'Forza Horizon 4',
    '英国乡下，没有目的地地开': 'The English countryside, driving with no destination',
    '古墓丽影：崛起': 'Rise of the Tomb Raider',
    '西伯利亚的雪，和一把很好用的弓': 'Siberian snow, and a very good bow',
    '三角洲行动 / CS2': 'Delta Force / CS2',
    '和朋友开黑，输赢都行，主要是聊天': "Squad nights with friends; win or lose, it's mostly for the talk",
    '战争雷霆': 'War Thunder',
    '飞机的仪表盘比游戏本身好看': 'The cockpit dials look better than the game itself',
    '饥荒联机版': "Don't Starve Together",
    '活过第一个冬天就算赢': 'Surviving the first winter counts as a win',
    '恶魔轮盘 / 买个可乐饼吧': 'Buckshot Roulette / Buy a Croquette',
    '小体量，后劲很大，适合一个晚上': 'Small games with a long aftertaste — good for one evening',
    'VRChat': 'VRChat',
    '虚拟客厅，偶尔去坐一会儿': 'A virtual living room I drop into now and then',
    '清单整理于 2026 年秋 · 已略去驱动、运行库，以及那些装了再没打开过的软件。':
      'Compiled in autumn 2026. Drivers, runtimes, and software I installed once and never opened are left out.',
    '清点方式：注册表 + Steam 库 + 一遍肉眼复核': 'Method: registry + Steam library + one pass of eyeballing',

    /* ---- 手记 ---- */
    '开发时的一些小记': 'Notes from building things',
    '全部文章': 'All posts',
    '把 QQ 的 SILK 语音拆开，再拼成 WAV': "Taking QQ's SILK voice apart and putting it back together as WAV",
    '笔记 · 7 分钟': 'Notes · 7 min',
    '一张图片里，最多能藏下多大的压缩包': 'How big a zip can hide inside one image',
    '技术 · 9 分钟': 'Tech · 9 min',
    '用 cloudflared 给本地视频开一扇临时的门': 'Opening a temporary door to local video with cloudflared',
    '实践 · 6 分钟': 'Practice · 6 min',
    '从 .py 到安装包：PyInstaller 与 Inno Setup 踩坑记': 'From .py to installer: PyInstaller and Inno Setup field notes',
    '打包 · 12 分钟': 'Packaging · 12 min',
    '为什么我的每个小工具都是深色的': 'Why every little tool I make is dark',
    '设计 · 4 分钟': 'Design · 4 min',

    /* ---- 年表 ---- */
    '这些东西出生的顺序': 'The order in which these were born',
    '2026.11 — 现在': '2026.11 — now',
    '/ 桌面版与网页版': '/ desktop and web',
    '桌面版拖进来批量转，网页版上传后打包下载。同一件事，两种用法；也第一次把同一个工具写了两遍。':
      'Drag files into the desktop app for batch conversion; upload in the browser and download a zip. Same job, two shapes — the first time I wrote one tool twice.',
    '给自己的手办和卡牌做一个柜子。深紫夜色、快照备份、回收站，还有一套能换肤的主题系统——这次界面做得最久。':
      'A cabinet for my figures and cards. Deep-purple nights, snapshot backups, a recycle bin, and a theme system — this one took the longest on the interface.',
    '/ VideoLinkServer': '/ VideoLinkServer',
    'Flask 起一个只监听本机的服务，cloudflared 把门开到公网；32 位 token，三十分钟后自动关门，也能随时撤销。':
      'Flask runs a localhost-only server; cloudflared opens the door to the internet. A 32-character token, a door that closes after thirty minutes, revocable at any time.',
    '/ BigPower': '/ BigPower',
    '一个能算 2 的十万次方的窗口。实时显示阶段、耗时、速度和结果位数，算完把完整数字存进 TXT。':
      'A window that can compute 2 to the hundred-thousandth. Stage, elapsed time, speed and digit count update live; the full number is saved to a TXT.',
    '第一批 exe': 'The first exe files',
    '/ GIF Studio、藏图、扫雷、贪吃蛇': '/ GIF Studio, Hide-Zip, Minesweeper, Snake',
    '第一次把 .py 打包成能双击的东西，也是第一次知道图标、路径和杀毒软件都能让人卡上一整天。':
      'The first time a .py became something you could double-click — and the first time I learned that icons, paths and antivirus software can each eat a whole day.',

    /* ---- 联系 ---- */
    '如果你也在等一封': "If you're also waiting for a letter",
    '来自 2027 年的信。': 'from the year 2027.',
    '想聊聊某个工具、发现了一个 bug，或者只是想说句话，都可以写信给我。':
      'Want to talk about a tool, report a bug, or just say hello? Write to me.',
    '我通常会在两个工作日内回信——如果没回，大概率是在考试。':
      "I usually reply within two working days — if I don't, I'm probably sitting an exam.",
    '邮箱': 'Email',
    '写一封信': 'Send a letter',
    '王欣宇 · 本站由手写 HTML 与一点耐心构成': 'Wang Xinyu · handwritten HTML and a little patience',

    /* ---- 无障碍 ---- */
    '回到首页': 'Back to top',
    '主导航': 'Main navigation',
    '打开菜单': 'Open menu',
    '关闭菜单': 'Close menu',
    '向下滚动': 'Scroll down',
    '装饰艺术风格的档案徽章：同心圆、刻度与星形': 'Art-deco archive emblem: concentric circles, ticks and a star',
    '复古海报风格的超现实插画：拱门、落日、漂浮的门与一只眼': 'Surreal retro poster: an arch, a setting sun, a floating door and an eye',

    /* ---- 标题与描述 ---- */
    '王欣宇 · 个人档案 / Wang Xinyu': 'Wang Xinyu · Personal Archive',
    '王欣宇，高三学生，写 Python 小工具。作品、开发笔记、项目年表，以及一个把时间折成纸飞机的个人站。':
      'Wang Xinyu is a high-school senior in China who builds small Python tools. Projects, dev notes, a timeline of builds, and a personal site that folds time into a paper plane.',

    /* ---- 达达插页 ---- */
    '把句子剪碎，': 'Cut the sentence up,',
    '再让骰子决定。': 'then let the dice decide.',
    '不相信杰作。相信剪刀、胶水、车票和一次掷骰子。':
      'No masterpieces. Just scissors, glue, a ticket, and one roll of the dice.',
    '掷一次骰子': 'Roll the dice',
    '从帽子里抽出的词，每掷一次就换一个顺序。': 'Words pulled from a hat; every roll reshuffles them.',
    'FIG. 02 — 无题（报纸、邮票与一次偶然）': 'FIG. 02 — Untitled (newspaper, stamp, and a coincidence)',
    '门在等一个房间': 'A door is waiting for a room.',
  };

  const JA = {
    '跳到主要内容': 'メインコンテンツへスキップ',
    '关于': '概要',
    '作品': '作品',
    '器物': '道具',
    '手记': '手記',
    '年表': '年表',
    '联系': '連絡',

    '把时间折成纸飞机，': '時間を紙飛行機に折って、',
    '投向还没到来的 2027。': 'まだ来ない2027へ投げる。',
    '高三学生，白天上课，晚上写 Python。做桌面小工具和本地服务——把 QQ 语音转成 WAV、把压缩包藏进图片、把一段视频变成 GIF。相信东西要先做出来，再慢慢做好看。':
      '高校3年生。昼は授業、夜はPython。小さなデスクトップツールとローカルサービスを作っています——QQの音声をWAVに、zipを画像の中に、動画をGIFに。まず動くものを作り、それから少しずつ美しく。',
    '查看作品': '作品を見る',
    '写封信': '手紙を書く',
    '现居': '居住地',
    '暂时保密': '非公開',
    '身份': '身分',
    '高三学生 / 开发者': '高校3年生 / 開発者',
    '状态': '状態',
    '在写新东西': '制作中',
    'FIG. 00 — 时间守护者徽记 / 手绘于 2026 年冬': 'FIG. 00 — タイムキーパーの記章 / 2026年冬に手描き',
    'THE PAST IS A FOREIGN COUNTRY — 未来尚未发生，过去仍在生长':
      'THE PAST IS A FOREIGN COUNTRY — 過去はまだ育っている。',

    '桌面工具': 'デスクトップツール',
    '本地服务': 'ローカルサービス',
    '打包 exe': 'exe化',
    '深色界面': 'ダークUI',
    '压缩包藏图': '画像にzipを隠す',
    '视频转 GIF': '動画からGIF',

    '在题海与终端之间，': '問題集とターミナルのあいだで、',
    '造一些自己用得上的东西。': '自分に必要なものを作る。',
    '王欣宇，中国，2026': '王欣宇、中国、2026',
    '我是王欣宇，一个高三学生，也是这些工具的作者。':
      '王欣宇です。高校3年生で、ここにあるツールの作者でもあります。',
    '写代码是从一个小脚本开始的：想批量转 QQ 语音，就去看 SILK 格式； 想给朋友分享一段视频，就去学 Flask。后来慢慢学会做界面、打包 exe、 写安装包，也学会了在凌晨一点和报错对视。':
      '始まりは小さなスクリプトでした。QQの音声をまとめて変換したくてSILK形式を調べ、友人に動画を共有したくてFlaskを覚えました。それからUI、exe化、インストーラ作りを少しずつ覚え、午前1時にエラーメッセージと睨めっこする術も覚えました。',
    '我关心「做完」：一个工具不该停在 .py，它应该有图标、有安装包、有更新说明； 界面喜欢深色，文档喜欢写到半年后自己还能看懂。这个站也一样， 材料是纸、黄铜，和一点点不合时宜。':
      'こだわっているのは「完成させること」。ツールは.pyのままで終わるべきではなく、アイコン、インストーラ、更新履歴があるべきだと思っています。UIは暗い色が好きで、ドキュメントは半年後の自分にも読めるように書きます。このサイトも同じで、素材は紙と真鍮、それから少しの時代遅れ。',
    '项目': 'プロジェクト',
    '个': '個',
    '从脚本写到安装包': 'スクリプトからインストーラまで',
    '成品': '完成品',
    '能双击运行的 exe': 'ダブルクリックで動くexe',
    '硬盘': 'ハードディスク',
    '存着源码、录屏和没剪的素材': 'ソース、録画、未編集の素材',

    '做过的一些东西': '作ってきたもの',
    '2026 — 至今': '2026 — 現在',
    '共 9 件 / 下面挑了 6 件': '全9件 / ここに6件',
    '藏图': '画像に隠す',
    '把压缩包藏进一张图片里：选图、选包、设密码，导出的图片照常能看，提取时一键还原。支持 ZIP / RAR / 7Z、批量处理、AES-256 加密、日志与自检更新。':
      'zipを1枚の画像に隠す：画像とアーカイブを選び、パスワードを設定。書き出した画像は普通に表示でき、取り出すときはワンクリック。ZIP / RAR / 7Z、一括処理、AES-256、ログ、更新チェックに対応。',
    '临时视频链接': '期限付き動画リンク',
    '把本地视频变成一条会过期的链接：Flask 起服务，cloudflared 打隧道，32 位随机 token，30 分钟后自动失效，也可以随时撤销。':
      'ローカル動画を、期限付きのリンクに変える：Flaskでサーバーを立て、cloudflaredでトンネルを開く。32桁のランダムtoken、30分で自動失効、いつでも取り消し可能。',
    '喵喵秘藏': 'にゃんにゃん秘蔵',
    '手办、卡牌、海报的数字藏品柜。深紫夜色界面，封面、附件、搜索、网格视图，快照备份与回收站，还能导出加密的 .nvault 单件包。':
      'フィギュアやカード、ポスターのデジタル収蔵庫。深い紫の夜のUI、表紙・添付・検索・グリッド表示、スナップショットとゴミ箱、暗号化した.nvault書き出しも。',
    '拖进一段视频，选好起止时间、帧率和宽度，导出带调色板的 GIF。内置 FFmpeg，深色界面，打包成单个 exe，双击就能用。':
      '動画をドラッグし、開始・終了時刻、フレームレート、幅を選んで、パレット付きGIFを書き出す。FFmpeg内蔵、ダークUI、単体exeでダブルクリックですぐ使える。',
    '语音转换器': '音声コンバーター',
    '把 QQ 的 .silk 语音拖进窗口，批量转成能听的 WAV。保留原文件，已经转过的自动跳过，文件夹整个拖进来也行。':
      'QQの.silk音声をウィンドウにドラッグすると、まとめてWAVに変換。元ファイルは残し、変換済みは自動でスキップ。フォルダごとドラッグもOK。',
    '拖放': 'ドラッグ＆ドロップ',
    '在线语音转换': 'オンライン音声変換',
    '语音转换器的网页版：浏览器里上传、解码、批量打包成 zip 下载。没有客户端，打开网页就能用，部署在 Render 上。':
      '音声変換器のWeb版。ブラウザでアップロード、デコード、zipにまとめてダウンロード。クライアント不要、Renderにデプロイ。',
    '另外还有：': 'ほかにも：',
    '超大整数幂计算器': '巨大累乗計算機',
    '（在窗口里算 2 的十万次方）、': '（2の10万乗を窓の中で）、',
    '扫雷': 'マインスイーパー',
    '贪吃蛇': 'スネーク',
    '——都在硬盘里，也都打包成了 exe。': '——全部ハードディスクの中、どれもexeに。',

    '这台机器里住着什么': 'このマシンに住んでいるもの',
    '一次不太严谨的清点': 'ちょっと大雑把な棚卸し',
    '工具': 'ツール',
    '14 件': '14点',
    '修图、合成、做封面，从 2013 年用到现在': 'レタッチ、合成、表紙づくり。2013年からずっと',
    '画草图和临摹，开源的，笔刷很听话': 'ラフと模写。オープンソースで、筆は素直',
    '本地跑图，显卡一天里最忙的时候': 'ローカルで画像生成。GPUが一日で一番忙しい時間',
    '声音克隆和模型微调的小实验，成功率一半': '音声クローンと微調整の小実験。成功率は5割',
    '和角色聊天，顺便研究对话到底该怎么写': 'キャラクターと会話しつつ、会話文の書き方を研究',
    '写代码的地方，以及后悔药': 'コードを書く場所、そして後悔薬',
    '两个随叫随到的运行时，版本号永远记不住': 'いつでも呼べる2つのランタイム。バージョンは覚えられない',
    '剪音频、降噪、给视频做片头': '音声のカット、ノイズ除去、動画のオープニング',
    '一个负责放片子，一个负责让桌面动起来': 'ひとつは映像を、ひとつはデスクトップを動かす',
    'Telegram / QQ / 哔哩哔哩': 'Telegram / QQ / bilibili',
    '与世界保持连接的三根线': '世界とつながる3本の線',
    '老派下载三件套，再战十年没问题': '昔ながらのダウンロード三点セット。あと10年は戦える',
    '火绒': 'Huorong',
    '安静的安全软件，不弹窗的那种': '静かなセキュリティソフト。広告を出さない種類',
    '把 .py 变成别人电脑上能双击的安装包': '.pyを、他人のPCでダブルクリックできるインストーラに',
    '所有跟视频、音频打交道的地方都绕不开它': '映像と音声が絡む場所では必ずお世話になる',
    '游戏': 'ゲーム',
    '重返未来：1999': 'リバース：1999',
    '在 MuMu 里玩了两年，抽卡手气一般': 'MuMu で2年。ガチャ運はまあまあ',
    '12 款': '12本',
    '赛博朋克 2077': 'サイバーパンク2077',
    '夜之城，第三次通关进行中': 'ナイトシティ、3周目を進行中',
    '地铁 2033 / 最后的曙光 / 离去': 'メトロ2033 / ラストライト / エクソダス',
    '末世里最像「家」的一部': '終末ものの中で一番「家」に近い一作',
    '寂静岭 f': 'サイレントヒル f',
    '刚放下手柄，还在想那个结局': 'コントローラを置いたばかり。あの結末をまだ考えている',
    '生化危机 2 / 3 重制版': 'バイオハザード RE:2 / RE:3',
    '浣熊市的老熟人了，路线倒背如流': 'ラクーンシティの常連。ルートは暗記済み',
    '极限竞速：地平线 4': 'Forza Horizon 4',
    '英国乡下，没有目的地地开': 'イギリスの田舎を、目的地もなく走る',
    '古墓丽影：崛起': 'Rise of the Tomb Raider',
    '西伯利亚的雪，和一把很好用的弓': 'シベリアの雪と、とても使いやすい弓',
    '三角洲行动 / CS2': 'デルタフォース / CS2',
    '和朋友开黑，输赢都行，主要是聊天': '友人とパーティ。勝ち負けより、たぶん会話',
    '战争雷霆': 'War Thunder',
    '飞机的仪表盘比游戏本身好看': '飛行機の計器盤がゲーム本体より美しい',
    '饥荒联机版': "Don't Starve Together",
    '活过第一个冬天就算赢': '最初の冬を越せたら勝ち',
    '恶魔轮盘 / 买个可乐饼吧': 'Buckshot Roulette / コロッケを買おう',
    '小体量，后劲很大，适合一个晚上': '小さいのに余韻が長い。一夜向き',
    'VRChat': 'VRChat',
    '虚拟客厅，偶尔去坐一会儿': 'バーチャルの居間。たまに座りに行く',
    '清单整理于 2026 年秋 · 已略去驱动、运行库，以及那些装了再没打开过的软件。':
      '2026年秋に整理 · ドライバ、ランタイム、一度入れて開かなかったソフトは省略。',
    '清点方式：注册表 + Steam 库 + 一遍肉眼复核': '方法：レジストリ + Steamライブラリ + 目視で一巡',

    '开发时的一些小记': '開発中の小さな記録',
    '全部文章': 'すべての記事',
    '把 QQ 的 SILK 语音拆开，再拼成 WAV': 'QQのSILK音声を分解して、WAVに組み直す',
    '笔记 · 7 分钟': 'ノート · 7分',
    '一张图片里，最多能藏下多大的压缩包': '1枚の画像に、どこまで大きなzipを隠せるか',
    '技术 · 9 分钟': '技術 · 9分',
    '用 cloudflared 给本地视频开一扇临时的门': 'cloudflaredでローカル動画に一時的な扉を開ける',
    '实践 · 6 分钟': '実践 · 6分',
    '从 .py 到安装包：PyInstaller 与 Inno Setup 踩坑记': '.pyからインストーラへ：PyInstallerとInno Setupのつまずき記録',
    '打包 · 12 分钟': 'パッケージ · 12分',
    '为什么我的每个小工具都是深色的': 'なぜ自分の小さなツールは全部ダークなのか',
    '设计 · 4 分钟': 'デザイン · 4分',

    '这些东西出生的顺序': 'これらが生まれた順番',
    '2026.11 — 现在': '2026.11 — 現在',
    '/ 桌面版与网页版': '/ デスクトップ版とWeb版',
    '桌面版拖进来批量转，网页版上传后打包下载。同一件事，两种用法；也第一次把同一个工具写了两遍。':
      'デスクトップ版はドラッグで一括変換、Web版はアップロードしてzipでダウンロード。同じことを2つの形で。同じツールを2回書いたのは初めてでした。',
    '给自己的手办和卡牌做一个柜子。深紫夜色、快照备份、回收站，还有一套能换肤的主题系统——这次界面做得最久。':
      'フィギュアとカードのための棚。深い紫の夜、スナップショット、ゴミ箱、テーマ切替まで——今回はUIに一番時間をかけました。',
    'Flask 起一个只监听本机的服务，cloudflared 把门开到公网；32 位 token，三十分钟后自动关门，也能随时撤销。':
      'Flaskでローカルだけを監視するサーバーを立て、cloudflaredで外に扉を開く。32桁のtoken、30分で自動で閉じ、いつでも取り消せる。',
    '一个能算 2 的十万次方的窗口。实时显示阶段、耗时、速度和结果位数，算完把完整数字存进 TXT。':
      '2の10万乗を計算できるウィンドウ。段階、経過時間、速度、桁数をリアルタイム表示し、計算後は完全な数字をTXTに保存。',
    '第一批 exe': '最初のexe',
    '/ GIF Studio、藏图、扫雷、贪吃蛇': '/ GIF Studio、画像に隠す、マインスイーパー、スネーク',
    '第一次把 .py 打包成能双击的东西，也是第一次知道图标、路径和杀毒软件都能让人卡上一整天。':
      '.pyを初めてダブルクリックで動くものにした日。アイコン、パス、ウイルス対策ソフトのどれもが一日を溶かすと知った日でもあります。',

    '如果你也在等一封': 'もし一通の手紙を待っているなら',
    '来自 2027 年的信。': '2027年からの手紙を。',
    '想聊聊某个工具、发现了一个 bug，或者只是想说句话，都可以写信给我。':
      '道具の話、見つけたバグ、あるいはただ一言。どれも手紙でどうぞ。',
    '我通常会在两个工作日内回信——如果没回，大概率是在考试。':
      'たいてい2営業日以内に返します——返事がなければ、たぶん試験中です。',
    '邮箱': 'メール',
    '写一封信': '手紙を送る',
    '王欣宇 · 本站由手写 HTML 与一点耐心构成': '王欣宇 · 手書きのHTMLと少しの忍耐でできています',

    '回到首页': 'トップへ戻る',
    '主导航': 'メインナビゲーション',
    '打开菜单': 'メニューを開く',
    '关闭菜单': 'メニューを閉じる',
    '向下滚动': '下へスクロール',
    '装饰艺术风格的档案徽章：同心圆、刻度与星形': 'アールデコ風のアーカイブ記章：同心円、目盛り、星',
    '复古海报风格的超现实插画：拱门、落日、漂浮的门与一只眼': 'レトロポスター風の超現実的な挿絵：アーチ、落日、浮かぶ扉、そして一つの眼',

    '王欣宇 · 个人档案 / Wang Xinyu': '王欣宇 · 個人アーカイブ / Wang Xinyu',
    '王欣宇，高三学生，写 Python 小工具。作品、开发笔记、项目年表，以及一个把时间折成纸飞机的个人站。':
      '王欣宇は中国の高校3年生。Pythonで小さなツールを作っています。作品、開発ノート、制作年表、そして時間を紙飛行機に折る個人サイト。',

    /* ---- ダダの挿入ページ ---- */
    '把句子剪碎，': '文を切り刻んで、',
    '再让骰子决定。': 'あとは賽の目に任せる。',
    '不相信杰作。相信剪刀、胶水、车票和一次掷骰子。':
      '傑作は信じない。ハサミ、糊、切符、賽。',
    '掷一次骰子': '賽を振る',
    '从帽子里抽出的词，每掷一次就换一个顺序。': '帽子から引いた言葉。振るたびに順番が変わる。',
    'FIG. 02 — 无题（报纸、邮票与一次偶然）': 'FIG. 02 — 無題（新聞、切手、そして一つの偶然）',
    '门在等一个房间': '扉は部屋を待っている。',
  };

  const KO = {
    '跳到主要内容': '본문으로 건너뛰기',
    '关于': '소개',
    '作品': '작업',
    '器物': '장비',
    '手记': '노트',
    '年表': '연표',
    '联系': '연락',

    '把时间折成纸飞机，': '시간을 종이비행기로 접어',
    '投向还没到来的 2027。': '아직 오지 않은 2027년으로.',
    '高三学生，白天上课，晚上写 Python。做桌面小工具和本地服务——把 QQ 语音转成 WAV、把压缩包藏进图片、把一段视频变成 GIF。相信东西要先做出来，再慢慢做好看。':
      '고3 학생. 낮에는 수업, 밤에는 Python. 작은 데스크톱 도구와 로컬 서비스를 만듭니다 — QQ 음성을 WAV로, zip을 이미지 속에, 영상을 GIF로. 먼저 돌아가게 만들고, 그다음 예쁘게.',
    '查看作品': '작업 보기',
    '写封信': '편지 쓰기',
    '现居': '거주지',
    '暂时保密': '비공개',
    '身份': '신분',
    '高三学生 / 开发者': '고3 / 개발자',
    '状态': '상태',
    '在写新东西': '새것 만드는 중',
    'FIG. 00 — 时间守护者徽记 / 手绘于 2026 年冬': 'FIG. 00 — 타임키퍼의 휘장 / 2026년 겨울에 그리다',
    'THE PAST IS A FOREIGN COUNTRY — 未来尚未发生，过去仍在生长':
      'THE PAST IS A FOREIGN COUNTRY — 과거는 아직 자란다.',

    '桌面工具': '데스크톱 도구',
    '本地服务': '로컬 서비스',
    '打包 exe': 'exe 패키징',
    '深色界面': '다크 UI',
    '压缩包藏图': '이미지에 zip 숨기기',
    '视频转 GIF': '영상에서 GIF',

    '在题海与终端之间，': '문제집과 터미널 사이에서,',
    '造一些自己用得上的东西。': '내게 필요한 것을 만든다.',
    '王欣宇，中国，2026': '왕신우, 중국, 2026',
    '我是王欣宇，一个高三学生，也是这些工具的作者。':
      '저는 왕신우입니다. 고3 학생이자 이 도구들을 만든 사람입니다.',
    '写代码是从一个小脚本开始的：想批量转 QQ 语音，就去看 SILK 格式； 想给朋友分享一段视频，就去学 Flask。后来慢慢学会做界面、打包 exe、 写安装包，也学会了在凌晨一点和报错对视。':
      '시작은 작은 스크립트 하나였습니다. QQ 음성을 한 번에 변환하고 싶어 SILK 포맷을 찾아봤고, 친구에게 영상을 보여주고 싶어 Flask를 배웠습니다. 그다음 UI, exe 패키징, 설치 파일 만들기를 익혔고, 새벽 한 시에 에러 메시지와 눈싸움하는 법도 익혔습니다.',
    '我关心「做完」：一个工具不该停在 .py，它应该有图标、有安装包、有更新说明； 界面喜欢深色，文档喜欢写到半年后自己还能看懂。这个站也一样， 材料是纸、黄铜，和一点点不合时宜。':
      '제가 신경 쓰는 건 「끝까지 만드는 것」입니다. 도구가 .py에서 멈추면 안 되고, 아이콘과 설치 파일, 업데이트 노트가 있어야 한다고 생각합니다. UI는 어두운 색을 좋아하고, 문서는 반년 뒤의 제가 읽어도 이해되게 씁니다. 이 사이트도 같습니다. 재료는 종이, 놋쇠, 그리고 조금의 시대착오.',
    '项目': '프로젝트',
    '个': '개',
    '从脚本写到安装包': '스크립트에서 설치 파일까지',
    '成品': '결과물',
    '能双击运行的 exe': '더블클릭으로 실행되는 exe',
    '硬盘': '하드디스크',
    '存着源码、录屏和没剪的素材': '소스, 녹화, 편집 안 한 소재',

    '做过的一些东西': '만들어 온 것들',
    '2026 — 至今': '2026 — 현재',
    '共 9 件 / 下面挑了 6 件': '총 9개 / 아래 6개',
    '藏图': '이미지 속 숨기기',
    '把压缩包藏进一张图片里：选图、选包、设密码，导出的图片照常能看，提取时一键还原。支持 ZIP / RAR / 7Z、批量处理、AES-256 加密、日志与自检更新。':
      'zip을 이미지 한 장에 숨깁니다. 이미지와 압축 파일을 고르고 비밀번호를 설정하면, 내보낸 사진은 평소처럼 보이고 추출은 한 번에. ZIP / RAR / 7Z, 일괄 처리, AES-256, 로그와 업데이트 확인까지.',
    '临时视频链接': '임시 영상 링크',
    '把本地视频变成一条会过期的链接：Flask 起服务，cloudflared 打隧道，32 位随机 token，30 分钟后自动失效，也可以随时撤销。':
      '로컬 영상을 만료되는 링크로: Flask가 서버를 열고, cloudflared가 터널을 뚫고, 32자리 랜덤 token이 지킵니다. 30분 뒤 자동으로 닫히고, 언제든 취소할 수 있습니다.',
    '喵喵秘藏': '냥냥 비장',
    '手办、卡牌、海报的数字藏品柜。深紫夜色界面，封面、附件、搜索、网格视图，快照备份与回收站，还能导出加密的 .nvault 单件包。':
      '피규어, 카드, 포스터를 담는 디지털 수납장. 짙은 보라색 밤 UI, 표지와 첨부, 검색, 그리드 보기, 스냅샷 백업과 휴지통, 암호화된 .nvault 내보내기까지.',
    '拖进一段视频，选好起止时间、帧率和宽度，导出带调色板的 GIF。内置 FFmpeg，深色界面，打包成单个 exe，双击就能用。':
      '영상을 끌어다 놓고 시작·끝 시간, 프레임레이트, 너비를 고른 뒤 팔레트가 적용된 GIF로 내보냅니다. FFmpeg 내장, 다크 UI, 단일 exe라 더블클릭하면 바로.',
    '语音转换器': '음성 변환기',
    '把 QQ 的 .silk 语音拖进窗口，批量转成能听的 WAV。保留原文件，已经转过的自动跳过，文件夹整个拖进来也行。':
      'QQ .silk 음성을 창에 끌어다 놓으면 한 번에 들을 수 있는 WAV로 변환합니다. 원본은 남기고, 이미 변환된 파일은 건너뛰고, 폴더째로 넣어도 됩니다.',
    '拖放': '드래그 앤 드롭',
    '在线语音转换': '온라인 음성 변환',
    '语音转换器的网页版：浏览器里上传、解码、批量打包成 zip 下载。没有客户端，打开网页就能用，部署在 Render 上。':
      '음성 변환기의 웹 버전. 브라우저에서 업로드하고 디코딩해 zip으로 묶어 내려받습니다. 클라이언트 없이 웹페이지만 열면 되고, Render에 배포했습니다.',
    '另外还有：': '그 밖에도: ',
    '超大整数幂计算器': '거대 거듭제곱 계산기',
    '（在窗口里算 2 的十万次方）、': ' (2의 10만 제곱을 창에서), ',
    '扫雷': '지뢰찾기',
    '贪吃蛇': '뱀 게임',
    '——都在硬盘里，也都打包成了 exe。': ' — 모두 하드디스크에 있고, 모두 exe로 포장했습니다.',

    '这台机器里住着什么': '이 기계 안에 사는 것들',
    '一次不太严谨的清点': '그리 엄밀하지 않은 목록',
    '工具': '도구',
    '14 件': '14개',
    '修图、合成、做封面，从 2013 年用到现在': '보정, 합성, 표지 작업. 2013년부터 지금까지',
    '画草图和临摹，开源的，笔刷很听话': '스케치와 모작. 오픈소스이고 붓이 말을 잘 듣는다',
    '本地跑图，显卡一天里最忙的时候': '로컬 이미지 생성. GPU가 하루 중 가장 바쁜 시간',
    '声音克隆和模型微调的小实验，成功率一半': '음성 복제와 미세조정 실험. 성공률은 절반',
    '和角色聊天，顺便研究对话到底该怎么写': '캐릭터와 대화하며 대사가 어떻게 쓰여야 하는지 연구',
    '写代码的地方，以及后悔药': '코드를 쓰는 곳, 그리고 후회약',
    '两个随叫随到的运行时，版本号永远记不住': '언제든 부를 수 있는 두 런타임. 버전은 늘 못 외운다',
    '剪音频、降噪、给视频做片头': '오디오 자르기, 노이즈 제거, 영상 인트로',
    '一个负责放片子，一个负责让桌面动起来': '하나는 영상을, 하나는 바탕화면을 움직인다',
    'Telegram / QQ / 哔哩哔哩': 'Telegram / QQ / 빌리빌리',
    '与世界保持连接的三根线': '세상과 연결된 세 가닥의 선',
    '老派下载三件套，再战十年没问题': '구식 다운로드 3종 세트. 10년은 더 간다',
    '火绒': 'Huorong',
    '安静的安全软件，不弹窗的那种': '조용한 보안 프로그램. 광고가 뜨지 않는 종류',
    '把 .py 变成别人电脑上能双击的安装包': '.py를 남의 컴퓨터에서 더블클릭할 수 있는 설치 파일로',
    '所有跟视频、音频打交道的地方都绕不开它': '영상과 오디오가 얽힌 곳엔 어디든 등장한다',
    '游戏': '게임',
    '重返未来：1999': '리버스: 1999',
    '在 MuMu 里玩了两年，抽卡手气一般': 'MuMu에서 2년. 가챠 운은 평범한 편',
    '12 款': '12종',
    '赛博朋克 2077': '사이버펑크 2077',
    '夜之城，第三次通关进行中': '나이트 시티, 세 번째 클리어 진행 중',
    '地铁 2033 / 最后的曙光 / 离去': '메트로 2033 / 라스트 라이트 / 엑소더스',
    '末世里最像「家」的一部': '종말물 중 가장 「집」 같은 작품',
    '寂静岭 f': '사일런트 힐 f',
    '刚放下手柄，还在想那个结局': '컨트롤러를 막 내려놓았다. 그 결말을 아직 생각하는 중',
    '生化危机 2 / 3 重制版': '바이오하자드 RE:2 / RE:3',
    '浣熊市的老熟人了，路线倒背如流': '라쿤 시티의 오랜 손님. 루트는 외우고 있다',
    '极限竞速：地平线 4': 'Forza Horizon 4',
    '英国乡下，没有目的地地开': '영국 시골, 목적지 없이 달린다',
    '古墓丽影：崛起': 'Rise of the Tomb Raider',
    '西伯利亚的雪，和一把很好用的弓': '시베리아의 눈, 그리고 아주 좋은 활',
    '三角洲行动 / CS2': '델타 포스 / CS2',
    '和朋友开黑，输赢都行，主要是聊天': '친구들과 파티 플레이. 이기고 져도 결국은 수다',
    '战争雷霆': 'War Thunder',
    '飞机的仪表盘比游戏本身好看': '비행기 계기판이 게임 본체보다 예쁘다',
    '饥荒联机版': "Don't Starve Together",
    '活过第一个冬天就算赢': '첫 겨울만 넘기면 이긴 것',
    '恶魔轮盘 / 买个可乐饼吧': 'Buckshot Roulette / 콜로켓 사러 가자',
    '小体量，后劲很大，适合一个晚上': '작지만 여운이 길다. 하룻밤에 딱',
    'VRChat': 'VRChat',
    '虚拟客厅，偶尔去坐一会儿': '가상의 거실. 가끔 앉으러 간다',
    '清单整理于 2026 年秋 · 已略去驱动、运行库，以及那些装了再没打开过的软件。':
      '2026년 가을 정리 · 드라이버, 런타임, 설치만 하고 열지 않은 소프트웨어는 제외.',
    '清点方式：注册表 + Steam 库 + 一遍肉眼复核': '방법: 레지스트리 + Steam 라이브러리 + 눈으로 한 번 확인',

    '开发时的一些小记': '만들면서 쓴 작은 기록',
    '全部文章': '전체 글',
    '把 QQ 的 SILK 语音拆开，再拼成 WAV': 'QQ의 SILK 음성을 뜯어서 WAV로 다시 조립하기',
    '笔记 · 7 分钟': '노트 · 7분',
    '一张图片里，最多能藏下多大的压缩包': '이미지 한 장에 얼마나 큰 zip을 숨길 수 있을까',
    '技术 · 9 分钟': '기술 · 9분',
    '用 cloudflared 给本地视频开一扇临时的门': 'cloudflared로 로컬 영상에 임시 문을 열기',
    '实践 · 6 分钟': '실전 · 6분',
    '从 .py 到安装包：PyInstaller 与 Inno Setup 踩坑记': '.py에서 설치 파일까지: PyInstaller와 Inno Setup 삽질기',
    '打包 · 12 分钟': '패키징 · 12분',
    '为什么我的每个小工具都是深色的': '내 작은 도구는 왜 전부 어두운 색일까',
    '设计 · 4 分钟': '디자인 · 4분',

    '这些东西出生的顺序': '이것들이 태어난 순서',
    '2026.11 — 现在': '2026.11 — 현재',
    '/ 桌面版与网页版': '/ 데스크톱과 웹',
    '桌面版拖进来批量转，网页版上传后打包下载。同一件事，两种用法；也第一次把同一个工具写了两遍。':
      '데스크톱은 끌어다 놓으면 일괄 변환, 웹은 업로드하고 zip으로 내려받습니다. 같은 일을 두 가지 모양으로. 한 도구를 두 번 짠 건 처음이었습니다.',
    '给自己的手办和卡牌做一个柜子。深紫夜色、快照备份、回收站，还有一套能换肤的主题系统——这次界面做得最久。':
      '피규어와 카드를 위한 수납장. 짙은 보라 밤, 스냅샷 백업, 휴지통, 테마 전환까지 — 이번엔 UI에 가장 오래 공을 들였습니다.',
    'Flask 起一个只监听本机的服务，cloudflared 把门开到公网；32 位 token，三十分钟后自动关门，也能随时撤销。':
      'Flask로 로컬만 감시하는 서버를 열고, cloudflared로 바깥에 문을 냅니다. 32자리 token, 30분 뒤 자동으로 닫히고, 언제든 취소할 수 있습니다.',
    '一个能算 2 的十万次方的窗口。实时显示阶段、耗时、速度和结果位数，算完把完整数字存进 TXT。':
      '2의 10만 제곱을 계산하는 창. 단계, 경과 시간, 속도, 자릿수를 실시간으로 보여주고 계산이 끝나면 전체 숫자를 TXT로 저장합니다.',
    '第一批 exe': '첫 exe',
    '/ GIF Studio、藏图、扫雷、贪吃蛇': '/ GIF Studio, 이미지 속 숨기기, 지뢰찾기, 뱀 게임',
    '第一次把 .py 打包成能双击的东西，也是第一次知道图标、路径和杀毒软件都能让人卡上一整天。':
      '.py를 처음으로 더블클릭해서 실행되는 것으로 만든 날. 아이콘, 경로, 백신 프로그램이 각각 하루를 잡아먹을 수 있다는 걸 알게 된 날이기도 합니다.',

    '如果你也在等一封': '당신도 한 통의 편지를 기다린다면',
    '来自 2027 年的信。': '2027년에서 온 편지를.',
    '想聊聊某个工具、发现了一个 bug，或者只是想说句话，都可以写信给我。':
      '도구 이야기, 발견한 버그, 혹은 그냥 한마디. 뭐든 편지로 보내 주세요.',
    '我通常会在两个工作日内回信——如果没回，大概率是在考试。':
      '보통 두 영업일 안에 답장합니다 — 답이 없으면 아마 시험 중일 겁니다.',
    '邮箱': '이메일',
    '写一封信': '편지 보내기',
    '王欣宇 · 本站由手写 HTML 与一点耐心构成': '왕신우 · 손으로 쓴 HTML과 약간의 인내로 만듦',

    '回到首页': '맨 위로',
    '主导航': '주 내비게이션',
    '打开菜单': '메뉴 열기',
    '关闭菜单': '메뉴 닫기',
    '向下滚动': '아래로 스크롤',
    '装饰艺术风格的档案徽章：同心圆、刻度与星形': '아르데코 아카이브 휘장: 동심원, 눈금, 별',
    '复古海报风格的超现实插画：拱门、落日、漂浮的门与一只眼': '레트로 포스터풍 초현실 삽화: 아치, 지는 해, 떠 있는 문, 그리고 하나의 눈',

    '王欣宇 · 个人档案 / Wang Xinyu': '왕신우 · 개인 아카이브 / Wang Xinyu',
    '王欣宇，高三学生，写 Python 小工具。作品、开发笔记、项目年表，以及一个把时间折成纸飞机的个人站。':
      '왕신우는 중국의 고3 학생으로 작은 Python 도구를 만듭니다. 작업물, 개발 노트, 제작 연표, 그리고 시간을 종이비행기로 접는 개인 사이트.',

    /* ---- 다다 삽입면 ---- */
    '把句子剪碎，': '문장을 잘라 흩뿌리고,',
    '再让骰子决定。': '이제 주사위가 정하게.',
    '不相信杰作。相信剪刀、胶水、车票和一次掷骰子。':
      '걸작은 믿지 않는다. 가위와 풀, 표 한 장, 주사위 한 번.',
    '掷一次骰子': '주사위 던지기',
    '从帽子里抽出的词，每掷一次就换一个顺序。': '모자에서 꺼낸 단어들. 던질 때마다 순서가 바뀐다.',
    'FIG. 02 — 无题（报纸、邮票与一次偶然）': 'FIG. 02 — 무제 (신문, 우표, 그리고 한 번의 우연)',
    '门在等一个房间': '문이 방을 기다리고 있다.',
  };

  const DICTS = { en: EN, ja: JA, ko: KO };
  const textCache = new WeakMap();
  const attrCache = new WeakMap();
  const metaCache = new WeakMap();
  let titleZh = document.title;
  let lang = 'zh';

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  function translatedText(zh, dict) {
    if (!dict) return zh;
    const key = norm(zh);
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : zh;
  }

  function applyText(dict) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest('.brand__cn, .hero__name, .lang, script, style')) continue;
      if (!/[\u4e00-\u9fff]/.test(node.nodeValue) && !textCache.has(node)) continue;

      let zh = textCache.get(node);
      if (zh === undefined) {
        zh = node.nodeValue;
        textCache.set(node, zh);
      }
      const lead = zh.match(/^\s*/)[0];
      const trail = zh.match(/\s*$/)[0];
      const out = translatedText(zh, dict);
      node.nodeValue = lead + out + trail;
    }
  }

  function applyAttrs(dict) {
    document.querySelectorAll('[aria-label], [title], [alt]').forEach((el) => {
      ['aria-label', 'title', 'alt'].forEach((attr) => {
        const now = el.getAttribute(attr);
        if (now === null) return;
        let store = attrCache.get(el);
        if (!store) { store = {}; attrCache.set(el, store); }
        if (store[attr] === undefined) store[attr] = now;
        const zh = store[attr];
        if (!/[\u4e00-\u9fff]/.test(zh)) return;
        el.setAttribute(attr, translatedText(zh, dict));
      });
    });
  }

  function applyMeta(dict) {
    const items = [document.querySelector('meta[name="description"]'),
      document.querySelector('meta[property="og:title"]'),
      document.querySelector('meta[property="og:description"]')].filter(Boolean);
    items.forEach((el) => {
      if (!metaCache.has(el)) metaCache.set(el, el.getAttribute('content'));
      const zh = metaCache.get(el);
      el.setAttribute('content', translatedText(zh, dict));
    });
    document.title = translatedText(titleZh, dict);
  }

  function apply(next) {
    lang = LANGS.includes(next) ? next : 'zh';
    const dict = DICTS[lang] || null;
    applyText(dict);
    applyAttrs(dict);
    applyMeta(dict);
    document.documentElement.lang = HTML_LANG[lang];
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      const on = btn.dataset.lang === lang;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('is-active', on);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  function add(dicts) {
    Object.keys(dicts || {}).forEach((code) => {
      if (!DICTS[code]) return;
      Object.assign(DICTS[code], dicts[code]);
    });
    apply(lang);
  }

  function t(zh) {
    return translatedText(zh, DICTS[lang] || null);
  }

  function init() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!saved) {
      const nav = (navigator.language || 'zh').toLowerCase();
      saved = nav.startsWith('zh') ? 'zh' : nav.startsWith('ja') ? 'ja' : nav.startsWith('ko') ? 'ko' : 'en';
    }
    titleZh = document.title;
    apply(saved);
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => apply(btn.dataset.lang));
    });
    document.addEventListener('languagechange', () => {
      const toggle = document.getElementById('menuToggle');
      if (toggle) {
        const open = document.body.classList.contains('nav-open');
        toggle.setAttribute('aria-label', t(open ? '关闭菜单' : '打开菜单'));
      }
    });
  }

  window.WXI18N = { apply, add, t, get lang() { return lang; } };
  init();
})();
