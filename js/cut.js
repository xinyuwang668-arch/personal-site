/* =========================================================
   dada: cut it up
   - 帽子里的词：24 个词池，一次只摆 8 个
   - 词卡可以拖到页面任意位置（不在帽子里打转了）
   - CUT HERE 的剪刀会一张一合，偶尔飘出一句「剪开看看吧。」
   - 真的剪下去：下面的纸被揉成球、扔进垃圾桶，然后浮出几句按时间变的吐槽
   ========================================================= */
(function () {
  'use strict';

  var doc = document;
  var hat = doc.getElementById('hatWords');
  var cutLine = doc.getElementById('cutLine');
  var cutBtn = doc.getElementById('cutBtn');
  var bubble = doc.getElementById('cutBubble');
  var dice = doc.getElementById('rollDice');
  if (!hat || !cutLine || !cutBtn) return;

  var section = doc.getElementById('dada');
  var inner = section ? section.querySelector('.dada__inner') : null;
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 词池 ---------- */

  var POOL = [
    'karawane', 'zanzibar', 'bumbum', 'gadji', 'beri', 'toto', 'rimbaud', 'tralala',
    'voltaire', 'tzara', 'merz', 'simultan',
    '剪刀', '胶水', '车票', '偶然', '报纸', '图钉', '午夜', '打字机', '印章', '胶带', '邮票', '碎纸'
  ];
  var SHOWN = 8;
  var state = { cut: false };

  function shuffled(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function tilt() { return (Math.random() * 7.4 - 3.7).toFixed(2) + 'deg'; }

  function fillHat() {
    var words = shuffled(POOL).slice(0, SHOWN);
    hat.textContent = '';
    words.forEach(function (w) {
      var chip = doc.createElement('span');
      chip.className = 'hat__word';
      chip.textContent = w;
      chip.style.setProperty('--r', tilt());
      hat.appendChild(chip);
    });
  }

  /* ---------- 2. 拖到任意位置 ---------- */

  var layer = doc.createElement('div');
  layer.className = 'cut-layer';
  doc.body.appendChild(layer);

  var drag = null;

  function chipFrom(target) {
    return target && target.closest ? target.closest('.hat__word') : null;
  }

  function loosed() {
    return Array.prototype.slice.call(layer.children);
  }

  function release(chip) {
    if (chip.parentNode !== layer) return;
    chip.classList.remove('is-loose');
    chip.style.left = '';
    chip.style.top = '';
    chip.style.transform = '';
    hat.appendChild(chip);
  }

  function onDown(e) {
    if (state.cut || e.button === 2 || !e.isPrimary) return;
    var chip = chipFrom(e.target);
    if (!chip) return;
    var box = chip.getBoundingClientRect();
    drag = {
      chip: chip,
      dx: e.clientX - box.left,
      dy: e.clientY - box.top,
      x0: e.clientX,
      y0: e.clientY,
      rot: chip.style.getPropertyValue('--r') || '0deg',
      moved: false
    };
    if (chip.setPointerCapture) chip.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function lift() {
    var chip = drag.chip;
    var box = chip.getBoundingClientRect();
    layer.appendChild(chip);
    chip.classList.add('is-loose');
    chip.style.transform = 'rotate(' + drag.rot + ')';
    chip.style.left = (box.left + window.pageXOffset) + 'px';
    chip.style.top = (box.top + window.pageYOffset) + 'px';
    drag.moved = true;
  }

  function onMove(e) {
    if (!drag) return;
    if (!drag.moved) {
      if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) < 4) return;
      lift();
    }
    var w = drag.chip.offsetWidth, h = drag.chip.offsetHeight;
    var maxX = Math.max(0, doc.documentElement.scrollWidth - w);
    var maxY = Math.max(0, doc.documentElement.scrollHeight - h);
    var x = Math.min(maxX, Math.max(0, e.pageX - drag.dx));
    var y = Math.min(maxY, Math.max(0, e.pageY - drag.dy));
    drag.chip.style.left = x + 'px';
    drag.chip.style.top = y + 'px';
  }

  function onUp(e) {
    if (!drag) return;
    var chip = drag.chip;
    if (chip.releasePointerCapture && e && e.pointerId !== undefined) {
      try { chip.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    chip.classList.remove('is-held');
    if (drag.moved) {
      chip.classList.remove('is-loose-drag');
      chip.style.zIndex = String(10 + Math.floor(Math.random() * 20));
    }
    drag = null;
  }

  hat.addEventListener('pointerdown', onDown);
  layer.addEventListener('pointerdown', onDown);
  doc.addEventListener('pointermove', onMove, { passive: true });
  doc.addEventListener('pointerup', onUp);
  doc.addEventListener('pointercancel', onUp);

  /* ---------- 3. 掷骰子 ---------- */

  function roll() {
    if (state.cut) return;
    loosed().forEach(release);
    fillHat();
    hat.classList.remove('is-shuffled');
    void hat.offsetWidth;
    hat.classList.add('is-shuffled');
    if (dice) {
      dice.classList.remove('is-rolling');
      void dice.offsetWidth;
      dice.classList.add('is-rolling');
      setTimeout(function () { dice.classList.remove('is-rolling'); }, 520);
    }
  }

  if (dice) dice.addEventListener('click', roll);
  fillHat();

  /* ---------- 4. 剪刀与小纸条 ---------- */

  var bubbleTimer = null;
  var bubbleHide = null;
  var seen = false;

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen = en.isIntersecting; });
    }, { threshold: 0.28 }).observe(cutLine);
  } else {
    seen = true;
  }

  function hideBubble() {
    if (!bubble) return;
    bubble.classList.remove('is-on');
  }

  function planBubble() {
    clearTimeout(bubbleTimer);
    if (state.cut || !bubble) return;
    var wait = 5000 + Math.random() * 5000;          // 5–10 秒一次
    bubbleTimer = setTimeout(function () {
      if (!seen || state.cut) { planBubble(); return; }
      if (Math.random() < 0.62) {                     // 不一定出现
        bubble.classList.add('is-on');
        clearTimeout(bubbleHide);
        bubbleHide = setTimeout(hideBubble, 3600);
      }
      planBubble();
    }, wait);
  }
  planBubble();

  /* ---------- 5. 剪 ---------- */

  function el(tag, cls, text) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function hourTsk() {
    var h = new Date().getHours();
    if (h < 5) return '凌晨 ' + h + ' 点，剪它做什么！';
    if (h < 9) return '天刚亮，纸先没了。';
    if (h < 12) return '上午的课剪掉了，下午的呢？';
    if (h < 14) return '午饭时间也不放过一张纸。';
    if (h < 18) return '下午 ' + h + ' 点，一事无成，只剪了张纸。';
    if (h < 23) return '晚自习该写的东西，被你剪成了球。';
    return h + ' 点了，剪了做什么！';
  }

  var JOKES = [
    '纸问剪刀：你为什么总张着嘴？剪刀说：因为我不会说话。',
    '把网页揉成球，体积小了，毛病一个没少——这叫压缩。',
    '垃圾桶：今天就一页？我：其余的在 CDN 里缓存着。',
    '我问纸疼不疼，它说不疼，反正也没什么内容。'
  ];

  function tskLines() {
    return [hourTsk(), '：（', JOKES[Math.floor(Math.random() * JOKES.length)]];
  }

  function makeBin() {
    var wrap = el('div', 'cut-bin');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<svg viewBox="0 0 84 108" aria-hidden="true">' +
      '<g class="cut-bin__lid"><rect x="6" y="20" width="72" height="7" rx="1.5"/>' +
      '<path d="M34 14h16"/></g>' +
      '<path class="cut-bin__body" d="M13 28h58l-6 66H19Z"/>' +
      '<path class="cut-bin__rib" d="M27 44v36M42 38v48M57 44v36"/>' +
      '</svg>';
    return wrap;
  }

  function cutNow() {
    if (state.cut) return;
    state.cut = true;
    clearTimeout(bubbleTimer);
    clearTimeout(bubbleHide);
    hideBubble();
    cutBtn.classList.add('is-snipping');
    cutBtn.setAttribute('aria-disabled', 'true');
    setTimeout(crumple, calm ? 0 : 470);
  }

  function crumple() {
    if (!inner) return;

    /* 先把要藏起来的版块记下来——必须赶在包裹挂到 body 之前，
       否则新挂上去的 .crumple 也会被当成“后面的版块”一起藏掉 */
    var gone = [];
    var sib = section.nextElementSibling;
    while (sib) { gone.push(sib); sib = sib.nextElementSibling; }
    var mainEl = doc.getElementById('main');
    if (mainEl) {
      var s = mainEl.nextElementSibling;
      while (s) { gone.push(s); s = s.nextElementSibling; }
    }

    var box = inner.getBoundingClientRect();
    var lineBottom = cutLine.getBoundingClientRect().bottom + window.pageYOffset;

    /* 把切线以下的东西收进一个包裹：宽度和位置跟原来的 .container 对齐，不会错位 */
    var wrap = el('div', 'crumple');
    wrap.style.left = (box.left + window.pageXOffset) + 'px';
    wrap.style.width = box.width + 'px';
    wrap.style.top = lineBottom + 'px';
    doc.body.appendChild(wrap);

    Array.prototype.slice.call(inner.children).forEach(function (kid) {
      if (kid !== cutLine) wrap.appendChild(kid);
    });
    loosed().forEach(function (chip) { wrap.appendChild(chip); });

    /* 切线以下的其它版块：立刻收走——它们本来就在屏幕外，留着只会把布局撑起来 */
    gone.forEach(function (n) { n.style.display = 'none'; });

    section.classList.add('is-cut');

    /* 空出来的地方：垃圾桶 + 吐槽 */
    var bin = makeBin();
    var echo = el('div', 'cut-echo');
    tskLines().forEach(function (text, i) {
      echo.appendChild(el('p', 'cut-echo__line' + (i === 1 ? ' cut-echo__line--face' : ''), text));
    });
    echo.appendChild(el('p', 'cut-echo__hint', '刷新一下，纸还能长回来。'));
    inner.appendChild(bin);
    inner.appendChild(echo);

    if (calm) {
      wrap.style.display = 'none';
      section.classList.add('is-done');
      return;
    }

    /* 把切线顶到视口上方一点，让“空”露出来 */
    var lineTop = cutLine.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo(0, Math.max(0, lineTop - 78));

    var binBox = bin.getBoundingClientRect();
    var target = {
      x: binBox.left + binBox.width / 2 + window.pageXOffset,
      y: binBox.top + binBox.height * 0.62 + window.pageYOffset
    };

    /* 揉 */
    doc.documentElement.dataset.cutStage = 'squeeze';
    wrap.classList.add('is-squeezing');
    setTimeout(function () {
      var cx = window.pageXOffset + window.innerWidth / 2;
      var cy = window.pageYOffset + window.innerHeight * 0.42;

      var wad = el('div', 'cut-wad');
      wad.style.left = cx + 'px';
      wad.style.top = cy + 'px';
      doc.body.appendChild(wad);
      wad.getBoundingClientRect();          /* 先落一次布局，让 opacity 从 0 过渡上来 */
      wad.style.opacity = '1';
      doc.documentElement.dataset.cutStage = 'wad';

      wrap.classList.add('is-gone');

      setTimeout(function () {
        wrap.style.display = 'none';
        doc.documentElement.dataset.cutStage = 'fly';
        wad.style.transform = 'translate(' + (target.x - cx) + 'px,' + (target.y - cy) + 'px) scale(.95) rotate(200deg)';
        setTimeout(function () {
          wad.style.transform = 'translate(' + (target.x - cx) + 'px,' + (target.y - cy) + 'px) scale(.45) rotate(228deg)';
          wad.style.opacity = '0';
          bin.classList.add('is-fed');
          section.classList.add('is-done');
          doc.documentElement.dataset.cutStage = 'done';
          setTimeout(function () { wad.style.display = 'none'; }, 260);
        }, 640);
      }, 420);
    }, 520);
  }

  cutBtn.addEventListener('click', cutNow);
})();
