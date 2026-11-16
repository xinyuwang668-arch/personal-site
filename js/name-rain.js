/* 名字钟面：把视频里的游戏主角名摆成几圈同心环，像钟表一样各自转向。
   每行格式：[中文主角名, 游戏简称, 英文名, 日文名, 韩文名]
   日/韩/英留空时回落到中文名；加新名字只要往 GAMES 里加一行。
   切语言时（i18n.js 派发 languagechange）整层会换成对应语言的名字。 */
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

  var layer = document.createElement('div');
  layer.className = 'name-rain';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  var items = [];
  var lang = currentLang();

  function currentLang() {
    if (window.WXI18N && window.WXI18N.lang) return window.WXI18N.lang;
    var attr = document.documentElement.dataset.lang;
    return NAME_INDEX[attr] !== undefined ? attr : 'zh';
  }

  function render(code) {
    var idx = NAME_INDEX[code];
    if (idx === undefined) idx = 0;
    items.forEach(function (item) {
      item.name.textContent = item.entry[idx] || item.entry[0];
    });
  }

  /* 徽章的圆心就是钟面的圆心；没有徽章的页面（404）用窗口中心 */
  function center() {
    var emblem = document.querySelector('.emblem');
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var er = Math.min(window.innerWidth, window.innerHeight) * 0.3;
    if (emblem) {
      var box = emblem.getBoundingClientRect();
      if (box.width > 40) {
        cx = box.left + box.width / 2;
        cy = box.top + box.height / 2;
        er = box.width / 2;
      }
    }
    return { x: cx, y: cy, r: er };
  }

  function build() {
    layer.textContent = '';
    items = [];

    var c = center();
    var small = window.innerWidth < 760;
    var counts = small ? [5, 7] : [6, 8, 10];
    var factors = small ? [0.62, 0.86] : [0.55, 0.75, 0.92];
    var durs = small ? [85, 125] : [90, 130, 175];
    var total = counts.reduce(function (a, b) { return a + b; }, 0);

    /* 名字当钟面刻度：半径按徽章半径取比例，最外圈不出徽章 */
    var base = c.r;

    var pool = [];
    while (pool.length < total) pool = pool.concat(shuffle(GAMES.slice()));
    pool = pool.slice(0, total);

    var gi = 0;
    counts.forEach(function (count, k) {
      var ring = document.createElement('div');
      ring.className = 'name-rain__ring';
      ring.style.left = c.x.toFixed(1) + 'px';
      ring.style.top = c.y.toFixed(1) + 'px';
      ring.style.animationDuration = durs[k] + 's';
      ring.style.animationDirection = (k % 2) ? 'reverse' : 'normal';

      var step = 360 / count;
      var radius = base * factors[k];

      for (var j = 0; j < count; j++) {
        var entry = pool[gi++];
        var angle = k * 31 + j * step + (Math.random() - 0.5) * step * 0.3;

        var arm = document.createElement('div');
        arm.className = 'name-rain__arm';
        arm.style.transform =
          'rotate(' + angle.toFixed(2) + 'deg) ' +
          'translateY(' + (-radius * (0.96 + Math.random() * 0.08)).toFixed(1) + 'px) ' +
          'rotate(' + (-angle).toFixed(2) + 'deg)';

        var cent = document.createElement('div');
        cent.className = 'name-rain__center';

        var el = document.createElement('span');
        el.className = 'name-rain__item';

        var name = document.createElement('b');
        var game = document.createElement('i');
        game.textContent = entry[1];

        el.appendChild(name);
        el.appendChild(game);

        /* 黄金角散布色相，一圈下来正好铺满彩虹，再加一点抖动避免太整齐 */
        var hue = (gi * 137.508 + Math.random() * 26) % 360;
        el.style.setProperty('--rain-hue', hue.toFixed(1));
        el.style.setProperty('--rain-hue-2', ((hue + 34 + Math.random() * 20) % 360).toFixed(1));

        el.style.fontSize = (small ? 9 + Math.random() * 2.5 : 11 + Math.random() * 3).toFixed(1) + 'px';
        el.style.opacity = (small ? 0.62 + Math.random() * 0.24 : 0.64 + Math.random() * 0.26).toFixed(2);

        /* 反向自转抵消整圈的旋转，名字始终是正的 */
        el.style.animationDuration = durs[k] + 's';
        el.style.animationDirection = (k % 2) ? 'normal' : 'reverse';

        cent.appendChild(el);
        arm.appendChild(cent);
        ring.appendChild(arm);

        items.push({ entry: entry, name: name });
      }

      layer.appendChild(ring);
    });

    render(lang);
  }

  build();

  document.addEventListener('languagechange', function (e) {
    lang = (e.detail && e.detail.lang) || currentLang();
    render(lang);
  });

  var resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 220);
  });
})();
