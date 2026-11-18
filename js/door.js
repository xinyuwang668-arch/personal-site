/* 关于那块插画里的门：可以推倒，也可以走进去
   结构依赖 index.html 里的 .portrait__frame > svg > #doorSlab（拱门那一坨） */
(function () {
  'use strict';

  var frame = document.querySelector('.portrait__frame');
  var slab = document.getElementById('doorSlab');
  if (!frame || !slab) return;

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PIVOT = '300 780';          // 门底中轴（和 viewBox 一致）
  var MAX = 86;                   // 完全躺平的角度
  var angle = 0;
  var raf = 0;
  var dragging = false;
  var startX = 0;
  var startAngle = 0;
  var moved = 0;
  var toppled = false;
  var overlay = null;
  var lastFocus = null;
  var used = false;

  /* ---------- 角度动画 ---------- */
  function paint(a) {
    angle = a;
    /* 往「房间里面」倒：倒下去的同时缩小，才不会被画框裁掉 */
    var k = Math.min(1, Math.abs(a) / MAX);
    var sc = 1 - 0.55 * k;
    /* 倒下时抬一点：门躺平后厚度是 300*sc，底边正好落在画框里的地面上 */
    var lift = 54 * k;
    /* CSS 变换：先缩放、再旋转（原点 = 底边中点），最后整体上抬 */
    slab.style.transform =
      'translateY(' + (-lift).toFixed(1) + 'px) rotate(' + a.toFixed(2) + 'deg) ' +
      'scale(' + sc.toFixed(4) + ',' + (sc * (1 - 0.05 * k)).toFixed(4) + ')';
  }

  function stopRaf() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function easeOutBack(t) {          // 落下去时有一点回弹
    var c = 1.70158;
    return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
  }

  function tween(from, to, ms, ease, done) {
    stopRaf();
    if (calm || ms === 0) { paint(to); if (done) done(); return; }
    var t0 = performance.now();
    (function step(now) {
      var p = Math.min(1, (now - t0) / ms);
      paint(from + (to - from) * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
      else { raf = 0; if (done) done(); }
    })(t0);
  }

  /* ---------- 推倒 / 扶起来 ---------- */
  function settle() {
    if (Math.abs(angle) > 13) {
      toppled = true;
      tween(angle, angle < 0 ? -MAX : MAX, 540, easeOutBack, function () {
        frame.classList.add('is-toppled');
        frame.setAttribute('aria-label', '门被推倒了，点一下把它扶起来');
      });
    } else {
      tween(angle, 0, 420, easeOutCubic, function () {
        frame.classList.remove('is-toppled');
        toppled = false;
        frame.setAttribute('aria-label', '拖动可以推倒这扇门，点一下走进去');
      });
    }
  }

  function standUp() {
    toppled = false;
    frame.classList.remove('is-toppled');
    tween(angle, 0, 480, easeOutCubic, function () {
      frame.setAttribute('aria-label', '拖动可以推倒这扇门，点一下走进去');
    });
  }

  function markUsed() {
    if (used) return;
    used = true;
    frame.classList.add('is-used');
  }

  /* ---------- 走进去 ---------- */
  function doorCenter() {
    var r = frame.getBoundingClientRect();
    return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.76 };
  }

  function buildOverlay() {
    var box = document.createElement('div');
    box.className = 'door-over';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', '门里');
    box.innerHTML =
      '<div class="door-over__inner">' +
        '<p class="door-over__kicker">ROOM 01 · 里面</p>' +
        '<p class="door-over__line">里面只有一间很小的房间。</p>' +
        '<p class="door-over__sub">一张桌子，一盏灯，一台还在编译的机器。<br>' +
          '这里没有别的东西，你可以回去了。</p>' +
        '<button class="door-over__back" type="button">退回去</button>' +
      '</div>';
    document.body.appendChild(box);
    box.querySelector('.door-over__back').addEventListener('click', closeDoor);
    box.addEventListener('click', function (e) { if (e.target === box) closeDoor(); });
    return box;
  }

  function openDoor() {
    if (toppled) { standUp(); return; }
    markUsed();
    lastFocus = document.activeElement;
    if (!overlay) overlay = buildOverlay();
    var c = doorCenter();
    overlay.style.setProperty('--ox', c.x + 'px');
    overlay.style.setProperty('--oy', c.y + 'px');
    overlay.hidden = false;
    document.documentElement.classList.add('door-open');
    requestAnimationFrame(function () {
      overlay.classList.add('is-open');
      overlay.querySelector('.door-over__back').focus();
    });
  }

  function closeDoor() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.documentElement.classList.remove('door-open');
    var done = function () {
      overlay.hidden = true;
      overlay.removeEventListener('transitionend', done);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    if (calm) done();
    else overlay.addEventListener('transitionend', done, { once: true });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) closeDoor();
  });

  /* ---------- 指针 ---------- */
  frame.setAttribute('tabindex', '0');
  frame.setAttribute('role', 'button');
  frame.setAttribute('aria-label', '拖动可以推倒这扇门，点一下走进去');

  frame.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    if (overlay && overlay.classList.contains('is-open')) return;
    stopRaf();
    dragging = true;
    moved = 0;
    startX = e.clientX;
    startAngle = angle;
    frame.classList.add('is-dragging');
    if (frame.setPointerCapture) frame.setPointerCapture(e.pointerId);
  });

  frame.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    if (moved < 5) return;
    markUsed();
    var next = startAngle + dx * 0.44;
    paint(Math.max(-MAX, Math.min(MAX, next)));
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    frame.classList.remove('is-dragging');
    if (frame.releasePointerCapture && e && e.pointerId !== undefined) {
      try { frame.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    if (moved <= 5) {
      if (toppled) standUp();
      else openDoor();
    } else {
      settle();
    }
  }

  frame.addEventListener('pointerup', endDrag);
  frame.addEventListener('pointercancel', endDrag);

  frame.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (toppled) standUp();
      else openDoor();
    }
  });

  /* 关掉时别让页面还能滚 */
  var style = document.createElement('style');
  style.textContent = 'html.door-open,html.door-open body{overflow:hidden}';
  document.head.appendChild(style);
})();
