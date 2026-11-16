/* 名字弹幕：从视频里的游戏主角名里挑出来的，飘在页面背后，按彩虹色散开。
   每行格式：[中文主角名, 游戏简称, 英文名, 日文名, 韩文名]
   日/韩/英留空时回落到中文名；加新名字只要往 GAMES 里加一行。
   切换语言时（i18n.js 派发 languagechange）整层会换成对应语言的名字。 */
(function () {
  'use strict';

  var GAMES = [
    ['维尔汀', '1999', 'Vertin', 'ヴァーティン', '버틴'],
    ['空', '原神', 'Aether', '空', '에테르'],
    ['荧', '原神', 'Lumine', '蛍', '루미네'],
    ['开拓者', '星穹铁道', 'Trailblazer', '開拓者', '개척자'],
    ['琪亚娜', '崩坏3', 'Kiana', 'キアナ', '키아나'],
    ['漂泊者', '鸣潮', 'Rover', '漂泊者', '방랑자'],
    ['指挥官', '碧蓝航线', 'Commander', '指揮官', '지휘관'],
    ['佑树', '公主连结', 'Yuki', 'ユウキ', '유키'],
    ['管理员', '深空之眼', 'Administrator', '管理者', '관리자'],
    ['执行者', '幻塔', 'Executor', '執行者', '집행자'],
    ['店长', '双生视界', 'Manager', '店長', '점장'],
    ['比良坂夜露', '机甲爱丽丝', 'Hirasaka Yoru', '比良坂夜露', '히라사카 요루'],
    ['骑士', '坎特伯雷', 'Knight', '騎士', '기사'],
    ['探求者', '悠久之树', 'Seeker', '探求者', '탐구자'],
    ['班长', '魂器学院', 'Class Monitor', '班長', '반장'],
    ['少主', '食物语', 'Young Master', '若様', '도련님'],
    ['调查员', '猫之城', 'Investigator', '調査員', '조사원'],
    ['老板', '异界事务所', 'Boss', '社長', '사장'],
    ['七濑胡桃', '胡桃日记', 'Nanase Kurumi', '七瀬くるみ', '나나세 쿠루미'],
    ['唐三', '斗罗大陆', 'Tang San', '唐三', '탕싼'],
    ['桐人', '刀剑神域', 'Kirito', 'キリト', '키리토'],
    ['奥尔菲斯', '第五人格', 'Orpheus', 'オルフェウス', '오르페우스'],
    ['史蒂夫', '我的世界', 'Steve', 'スティーブ', '스티브'],
    ['卡卡', '迷你世界', 'Kaka', 'カカ', '카카'],
    ['威尔逊', '饥荒', 'Wilson', 'ウィルソン', '윌슨']
  ];

  /* 语言 -> 在 GAMES 一行里的下标 */
  var NAME_INDEX = { zh: 0, en: 2, ja: 3, ko: 4 };

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var small = window.innerWidth < 760;
  var pool = [];
  var count = small ? 16 : 36;
  while (pool.length < count) pool = pool.concat(shuffle(GAMES.slice()));
  pool = pool.slice(0, count);

  var layer = document.createElement('div');
  layer.className = 'name-rain';
  layer.setAttribute('aria-hidden', 'true');

  var items = pool.map(function (entry, i) {
    var el = document.createElement('span');
    el.className = 'name-rain__item';

    var name = document.createElement('b');
    var game = document.createElement('i');
    game.textContent = entry[1];

    el.appendChild(name);
    el.appendChild(game);

    /* 黄金角散布色相，一圈下来正好铺满彩虹，再加一点抖动避免太整齐 */
    var hue = (i * 137.508 + Math.random() * 26) % 360;
    el.style.setProperty('--rain-hue', hue.toFixed(1));
    el.style.setProperty('--rain-hue-2', ((hue + 34 + Math.random() * 20) % 360).toFixed(1));

    var dur = 32 + Math.random() * 46;
    el.style.top = (2 + Math.random() * 93).toFixed(2) + '%';
    el.style.animationDuration = dur.toFixed(1) + 's';
    el.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's';
    el.style.fontSize = (small ? 10 + Math.random() * 3.5 : 13.5 + Math.random() * 6).toFixed(1) + 'px';
    el.style.opacity = (small ? 0.78 + Math.random() * 0.20 : 0.86 + Math.random() * 0.14).toFixed(2);
    if (Math.random() < 0.45) el.style.animationDirection = 'reverse';

    layer.appendChild(el);
    return { entry: entry, name: name };
  });

  document.body.appendChild(layer);

  function render(lang) {
    var idx = NAME_INDEX[lang];
    if (idx === undefined) idx = 0;
    items.forEach(function (item) {
      item.name.textContent = item.entry[idx] || item.entry[0];
    });
  }

  function currentLang() {
    if (window.WXI18N && window.WXI18N.lang) return window.WXI18N.lang;
    var attr = document.documentElement.dataset.lang;
    return NAME_INDEX[attr] !== undefined ? attr : 'zh';
  }

  render(currentLang());
  document.addEventListener('languagechange', function (e) {
    render((e.detail && e.detail.lang) || currentLang());
  });
})();
