/* Alpader · first-visit intro.
   Seal assembles, bursts into small seals, they bounce off the viewport
   edges, fade out. Self-contained: no assets, no dependencies. */
(function () {
  'use strict';

  var KEY = 'alpader-intro-v1';
  var done = function () { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} };

  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}
  if (!window.requestAnimationFrame || !window.Path2D) { done(); return; }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { done(); return; }

  var startWall = Date.now();

  var PAPER = '#ede4d0', INK = '#17352e', BRASS = '#b08442';

  // Bodoni A, outlined from the mark (128-unit grid, baseline at y=97)
  var A_PATH = new Path2D('M18.392 -20.548V-22.264H46.024V-20.548ZM37.620 -67.276 60.324 -1.716H67.144V0.000H38.764V-1.716H46.992L30.360 -53.196L12.364 -1.716H21.692V0.000H2.288V-1.716H10.340L33.484 -67.276Z');

  var T = {
    ring:    { start: 100, dur: 520 },
    letter:  { start: 200, dur: 300 },
    dashed:  { start: 460, dur: 320 },
    dots:    { start: 560, step: 70, dur: 240 },
    breathe: { start: 820, dur: 300 },
    boom:    1180
  };
  var BOOM_DUR = 180, SHOCK_DUR = 380, FLIGHT_END = 2980, FADE_OUT = 320;
  var PARTICLES = 28;

  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeIn = function (t) { return t * t * t; };
  var clamp01 = function (t) { return t < 0 ? 0 : t > 1 ? 1 : t; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  // ---- stage ----------------------------------------------------------
  var wrap = document.createElement('div');
  wrap.setAttribute('aria-hidden', 'true');
  wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;background:' + PAPER +
    ';transition:opacity ' + FADE_OUT + 'ms ease;will-change:opacity;';

  var cv = document.createElement('canvas');
  cv.style.cssText = 'display:block;width:100%;height:100%;';
  wrap.appendChild(cv);
  (document.body || document.documentElement).appendChild(wrap);

  var ctx = cv.getContext('2d');
  var W = 0, H = 0, DPR = 1, unit = 1, lastT = 0, parts = [], raf = 0, t0 = 0, finished = false;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth || document.documentElement.clientWidth;
    H = window.innerHeight || document.documentElement.clientHeight;
    cv.width = Math.round(W * DPR);
    cv.height = Math.round(H * DPR);
    unit = Math.min(W, H) / 720;
  }

  function spawn() {
    var r = rng(20261117), i, a, speed, d, off;
    var cx = W / 2, cy = H / 2;
    parts = [];
    for (i = 0; i < PARTICLES; i++) {
      // one seal per sector, jittered inside it: even coverage without a tidy rosette
      a = ((i + r() * 0.86) / PARTICLES) * Math.PI * 2;
      speed = (560 + r() * 880) * unit;
      d = (34 + r() * 62) * unit;
      off = (26 + r() * 104) * unit;
      parts.push({
        x: cx + Math.cos(a) * off, y: cy + Math.sin(a) * off,
        x0: cx + Math.cos(a) * off, y0: cy + Math.sin(a) * off,
        r: d / 2,
        vx: Math.cos(a) * speed, vy: Math.sin(a) * speed,
        rot: (r() - 0.5) * 0.5, vr: (r() - 0.5) * 0.28,
        d: d, fade: 1930 + r() * 520,
        brass: r() < 0.28
      });
    }
  }

  function drawSeal(cx, cy, d, o) {
    o = o || {};
    var k = d / 128;
    var alpha = o.alpha == null ? 1 : o.alpha;
    var ring = o.ring == null ? 1 : o.ring;
    var dashA = o.dash == null ? 1 : o.dash;
    var dotA = o.dots == null ? 1 : o.dots;
    var ink = o.ink || INK, brass = o.brass || BRASS;

    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(cx, cy);
    ctx.rotate(o.rot || 0);
    ctx.scale(k, k);
    ctx.translate(-64, -64);

    if (ring > 0) {
      ctx.beginPath();
      ctx.arc(64, 64, 60, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring);
      ctx.strokeStyle = ink;
      ctx.lineWidth = Math.max(2.2, 1.15 * 128 / d);   // never thinner than ~1 px on screen
      ctx.lineCap = 'butt';
      ctx.stroke();
    }

    if (dashA > 0.002 && d > 52) {
      ctx.save();
      ctx.globalAlpha *= dashA;
      ctx.beginPath();
      ctx.arc(64, 64, 54, 0, Math.PI * 2);
      ctx.setLineDash([1.6, 5]);
      ctx.strokeStyle = brass;
      ctx.lineWidth = 0.9;
      ctx.stroke();
      ctx.restore();
    }

    if (dotA > 0.002) {
      ctx.save();
      ctx.globalAlpha *= dotA;
      ctx.fillStyle = brass;
      var dr = Math.max(1.6, 1.2 * 128 / d);
      var pts = [[64, 4], [124, 64], [64, 124], [4, 64]];
      for (var n = 0; n < 4; n++) {
        ctx.beginPath(); ctx.arc(pts[n][0], pts[n][1], dr, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }

    var letter = o.letter == null ? 1 : o.letter;
    if (letter > 0.002) {
      ctx.save();
      ctx.globalAlpha *= letter;
      var ls = o.letterScale == null ? 1 : o.letterScale;
      if (ls !== 1) {
        ctx.translate(64, 64); ctx.scale(ls, ls); ctx.translate(-64, -64);
      }
      ctx.translate(29.284, 97.000);
      ctx.fillStyle = ink;
      ctx.fill(A_PATH);
      ctx.restore();
    }
    ctx.restore();
  }

  function drawShock(t) {
    var p = clamp01((t - T.boom) / SHOCK_DUR);
    if (p <= 0 || p >= 1) return;
    var r = lerp(70 * unit, 620 * unit, easeOut(p));
    ctx.save();
    ctx.globalAlpha = (1 - p) * 0.5;
    ctx.strokeStyle = BRASS;
    ctx.lineWidth = lerp(3.2, 0.4, p) * unit;
    ctx.beginPath(); ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  function render(t) {
    lastT = t;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, W, H);

    var cx = W / 2, cy = H / 2, base = 340 * unit, i, p;

    if (t < T.boom) {
      var ring = easeOut(clamp01((t - T.ring.start) / T.ring.dur));
      var lp = clamp01((t - T.letter.start) / T.letter.dur);
      var dash = easeOut(clamp01((t - T.dashed.start) / T.dashed.dur));
      var dots = 0;
      for (i = 0; i < 4; i++) {
        dots = Math.max(dots, easeOut(clamp01((t - (T.dots.start + i * T.dots.step)) / T.dots.dur)));
      }
      var breathe = 1 + Math.sin(clamp01((t - T.breathe.start) / T.breathe.dur) * Math.PI) * 0.018;

      drawSeal(cx, cy, base * breathe, {
        ring: ring, dash: dash * 0.95, dots: dots,
        letter: easeOut(lp), letterScale: lerp(0.9, 1, easeOut(lp))
      });
      return;
    }

    if (!parts.length) spawn();

    var bp = clamp01((t - T.boom) / BOOM_DUR);
    if (bp < 1) {
      drawSeal(cx, cy, base * lerp(1, 1.38, easeIn(bp)), {
        ring: 1, dash: (1 - bp) * 0.95, dots: 1 - bp, letter: 1 - bp
      });
    }
    drawShock(t);

    var dt = 1 / 60;
    var steps = Math.min(Math.round((t - T.boom) / (1000 / 60)), 400);
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      p.x = p.x0; p.y = p.y0;
      var vx = p.vx, vy = p.vy;
      for (var s = 0; s < steps; s++) {
        p.x += vx * dt; p.y += vy * dt;
        if (p.x - p.r < 0) { p.x = p.r; vx = -vx; }
        if (p.x + p.r > W) { p.x = W - p.r; vx = -vx; }
        if (p.y - p.r < 0) { p.y = p.r; vy = -vy; }
        if (p.y + p.r > H) { p.y = H - p.r; vy = -vy; }
      }
    }

    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      var fade = clamp01((t - p.fade) / 500);
      if (fade >= 1) continue;
      drawSeal(p.x, p.y, p.d, {
        alpha: 1 - fade,
        dash: clamp01((p.d / unit - 46) / 30) * 0.95,
        dots: p.brass ? 0 : 1,
        ink: p.brass ? BRASS : INK,
        rot: p.rot + p.vr * ((t - T.boom) / 1000)
      });
    }
  }

  // ---- playback -------------------------------------------------------
  var skipEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'];

  function teardown() {
    cancelAnimationFrame(raf);
    raf = 0;
    for (var i = 0; i < skipEvents.length; i++) {
      window.removeEventListener(skipEvents[i], skip, true);
      document.removeEventListener(skipEvents[i], skip, true);
    }
    window.removeEventListener('resize', onResize);
    if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }

  function finish(fast) {
    if (finished) return;
    finished = true;
    done();
    wrap.style.opacity = '0';
    setTimeout(teardown, fast ? 60 : FADE_OUT + 20);
  }

  function skip(e) {
    // browsers restore scroll position on load; do not treat that as "skip"
    if (e && e.type === 'scroll' && Date.now() - startWall < 500) return;
    finish(true);
  }

  function onResize() {
    resize();
    if (raf) render(lastT);          // resizing a canvas clears it
  }

  function frame(now) {
    if (!t0) t0 = now;
    var t = now - t0;
    render(t);
    if (t < FLIGHT_END && !finished) {
      raf = requestAnimationFrame(frame);
    } else {
      raf = 0;
      finish(false);
    }
  }

  resize();

  // never replay inside the same tab session, even if the visitor bails early
  done();

  for (var i = 0; i < skipEvents.length; i++) {
    window.addEventListener(skipEvents[i], skip, true);
  }
  window.addEventListener('resize', onResize);

  raf = requestAnimationFrame(frame);
})();
