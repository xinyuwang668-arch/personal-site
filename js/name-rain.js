/* 名字弹幕：从视频里的游戏主角名里挑出来的，飘在页面背后。
   新增名字只要往 GAMES 里加一行 [主角名, 游戏简称]。 */
(function () {
  'use strict';

  var GAMES = [
    ['维尔汀', '1999'],
    ['空', '原神'],
    ['荧', '原神'],
    ['开拓者', '星穹铁道'],
    ['琪亚娜', '崩坏3'],
    ['漂泊者', '鸣潮'],
    ['指挥官', '碧蓝航线'],
    ['佑树', '公主连结'],
    ['管理员', '深空之眼'],
    ['执行者', '幻塔'],
    ['店长', '双生视界'],
    ['比良坂夜露', '机甲爱丽丝'],
    ['骑士', '坎特伯雷'],
    ['探求者', '悠久之树'],
    ['班长', '魂器学院'],
    ['少主', '食物语'],
    ['调查员', '猫之城'],
    ['老板', '异界事务所'],
    ['七濑胡桃', '胡桃日记'],
    ['唐三', '斗罗大陆'],
    ['桐人', '刀剑神域'],
    ['奥尔菲斯', '第五人格'],
    ['史蒂夫', '我的世界'],
    ['卡卡', '迷你世界'],
    ['威尔逊', '饥荒']
  ];

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

  pool.forEach(function (entry) {
    var el = document.createElement('span');
    el.className = 'name-rain__item';

    var name = document.createElement('b');
    name.textContent = entry[0];
    var game = document.createElement('i');
    game.textContent = entry[1];

    el.appendChild(name);
    el.appendChild(game);

    var dur = 32 + Math.random() * 46;
    el.style.top = (2 + Math.random() * 93).toFixed(2) + '%';
    el.style.animationDuration = dur.toFixed(1) + 's';
    el.style.animationDelay = (-Math.random() * dur).toFixed(1) + 's';
    el.style.fontSize = (small ? 9 + Math.random() * 4 : 12.5 + Math.random() * 6.5).toFixed(1) + 'px';
    el.style.opacity = (small ? 0.28 + Math.random() * 0.34 : 0.30 + Math.random() * 0.45).toFixed(2);
    if (Math.random() < 0.45) el.style.animationDirection = 'reverse';

    layer.appendChild(el);
  });

  document.body.appendChild(layer);
})();
