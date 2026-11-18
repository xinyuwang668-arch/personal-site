/* =========================================================
   ART LAYER — 手法层
   1) 按钮的磁性：指针靠近时轻微吸附
   2) 徽章的视差：滚动时比页面慢一点
   3) 标题的逐行显影：给 .sec-title 里的每一行套一层
   全部可关：prefers-reduced-motion 或 body.no-art
   ========================================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var body = document.body;

  /* ---------- 1. 磁性按钮 ---------- */
  function magnetize(el, strength) {
    var raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;

    function render() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = 'translate(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px)';
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    }

    function kick() { if (!raf) raf = requestAnimationFrame(render); }

    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    });

    el.addEventListener('pointerleave', function () {
      tx = 0; ty = 0; kick();
    });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    Array.prototype.forEach.call(document.querySelectorAll('.btn'), function (b) {
      magnetize(b, 0.14);
    });
  }

  /* ---------- 2. 徽章视差 ---------- */
  var emblem = document.querySelector('.emblem');
  var hero = document.querySelector('.hero');
  if (emblem && hero && !body.classList.contains('no-art')) {
    var lastY = -1;
    var onScroll = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (y === lastY) return;
      lastY = y;
      // 只在前两屏内起作用，之后归零，避免整页滚动都在算
      var heroH = hero.offsetHeight || 1;
      var k = Math.max(0, Math.min(1, 1 - y / (heroH * 0.9)));
      emblem.style.setProperty('--pe', (y * 0.05).toFixed(2) + 'px');
      emblem.style.setProperty('--ps', (0.02 * k).toFixed(4));
    };
    emblem.style.transform = 'translate3d(0, var(--pe, 0px), 0) scale(calc(1 + var(--ps, 0)))';
    emblem.style.willChange = 'transform';
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 3. 标题逐行显影 ---------- */
  // 只处理带 <br> 的多行标题：把每行包成 span，让它们依次揭开
  var titles = document.querySelectorAll('.sec-title, .hero__name, .dada__title');
  Array.prototype.forEach.call(titles, function (title) {
    if (title.dataset.lines === '1') return;
    var html = title.innerHTML;
    if (html.indexOf('<br') === -1) return;

    var parts = html.split(/<br\s*\/?>/i);
    if (parts.length < 2) return;

    title.innerHTML = parts.map(function (line, i) {
      return '<span class="art-line" style="--i:' + i + '">' + line + '</span>';
    }).join('');
    title.dataset.lines = '1';
    title.classList.add('art-lines');
  });

  /* 逐行自下而上揭开：父层裁切，子层位移 */
  var lineTitles = document.querySelectorAll('.art-lines');
  Array.prototype.forEach.call(lineTitles, function (title) {
    if (title.classList.contains('is-in') || !('IntersectionObserver' in window)) {
      title.classList.add('is-in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        title.classList.add('is-in');
        io.unobserve(title);
      });
    }, { threshold: 0.25 });
    io.observe(title);
  });
})();
