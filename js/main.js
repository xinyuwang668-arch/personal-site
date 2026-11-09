/* =========================================================
   王欣宇 · 个人档案 — interaction layer
   No dependencies.
   ========================================================= */
(function () {
  'use strict';

  var doc = document;
  var header = doc.getElementById('header');
  var progress = doc.getElementById('progress');
  var toggle = doc.getElementById('menuToggle');
  var nav = doc.getElementById('site-nav');
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a'));
  var sections = Array.prototype.slice.call(
    doc.querySelectorAll('main section[id]')
  ).filter(function (section) { return section.id !== 'dada'; });

  /* ---------- scroll: header state + progress bar ---------- */

  var ticking = false;

  function onScroll() {
    var y = window.scrollY || doc.documentElement.scrollTop;
    var max = doc.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(y / max, 1) : 0;

    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (progress) progress.style.width = (ratio * 100).toFixed(2) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  /* ---------- mobile menu ---------- */

  function label(zh) {
    return window.WXI18N ? window.WXI18N.t(zh) : zh;
  }

  function setMenu(open) {
    doc.body.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? label('关闭菜单') : label('打开菜单'));
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!doc.body.classList.contains('nav-open'));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && doc.body.classList.contains('nav-open')) {
      setMenu(false);
      if (toggle) toggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) setMenu(false);
  });

  /* ---------- reveal on scroll ---------- */

  var reveals = doc.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { revealObserver.observe(el); });

    /* elements already in view on load (hero) */
    window.requestAnimationFrame(function () {
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) el.classList.add('is-in');
      });
    });

    /* ---------- active nav ---------- */

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          var active = link.getAttribute('data-nav') === id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { navObserver.observe(section); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- placeholder links ---------- */

  doc.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href="#"]') : null;
    if (a) e.preventDefault();
  });

  /* ---------- mailto: copy the address, in case no mail app is set ---------- */

  var toast = doc.getElementById('mailToast');
  var toastTimer;

  function legacyCopy(text) {
    var ta = doc.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-100px';
    doc.body.appendChild(ta);
    ta.select();
    try { doc.execCommand('copy'); } catch (err) { /* ignore */ }
    doc.body.removeChild(ta);
  }

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 5000);
  }

  doc.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="mailto:"]') : null;
    if (!a) return;

    var addr = (a.getAttribute('href') || '').replace(/^mailto:/, '').split('?')[0];
    var done = function () { showToast(label('邮箱已复制：') + addr); };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(addr).then(done, function () {
        legacyCopy(addr);
        done();
      });
    } else {
      legacyCopy(addr);
      done();
    }
  });

  /* ---------- footer year ---------- */

  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- dada: cut-up dice ---------- */

  var dice = doc.getElementById('rollDice');
  var hat = doc.getElementById('hatWords');
  if (hat) {
    /* 每一次打开，帽子里的词先自己掉出来一次 */
    var opening = Array.prototype.slice.call(hat.children);
    for (var k = opening.length - 1; k > 0; k--) {
      var m = Math.floor(Math.random() * (k + 1));
      var swap = opening[k];
      opening[k] = opening[m];
      opening[m] = swap;
    }
    opening.forEach(function (w) { hat.appendChild(w); });

    /* 词卡可以拖着换位置 */
    var dragEl = null, startX = 0, startY = 0, moved = false;
    hat.addEventListener('pointerdown', function (e) {
      var chip = e.target.closest ? e.target.closest('.hat__word') : null;
      if (!chip) return;
      dragEl = chip; startX = e.clientX; startY = e.clientY; moved = false;
      chip.classList.add('is-dragging');
      if (chip.setPointerCapture) chip.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    hat.addEventListener('pointermove', function (e) {
      if (!dragEl) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      dragEl.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
    function dropChip(e) {
      if (!dragEl) return;
      var chip = dragEl; dragEl = null;
      chip.classList.remove('is-dragging');
      chip.style.transform = '';
      if (!moved) return;
      var stack = doc.elementsFromPoint ? doc.elementsFromPoint(e.clientX, e.clientY) : [];
      var target = null;
      for (var s = 0; s < stack.length; s++) {
        var found = stack[s].closest ? stack[s].closest('.hat__word') : null;
        if (found && found !== chip) { target = found; break; }
      }
      if (target) {
        var box = target.getBoundingClientRect();
        if (e.clientX > box.left + box.width / 2) target.after(chip);
        else target.before(chip);
      }
      hat.classList.remove('is-shuffled');
      void hat.offsetWidth;
      hat.classList.add('is-shuffled');
    }
    hat.addEventListener('pointerup', dropChip);
    hat.addEventListener('pointercancel', function () {
      if (!dragEl) return;
      dragEl.classList.remove('is-dragging');
      dragEl.style.transform = '';
      dragEl = null;
    });
  }
  if (dice && hat) {
    dice.addEventListener('click', function () {
      var words = Array.prototype.slice.call(hat.children);
      for (var i = words.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = words[i];
        words[i] = words[j];
        words[j] = tmp;
      }
      words.forEach(function (w) { hat.appendChild(w); });
      hat.classList.remove('is-shuffled');
      void hat.offsetWidth;
      hat.classList.add('is-shuffled');
      dice.classList.remove('is-rolling');
      void dice.offsetWidth;
      dice.classList.add('is-rolling');
      setTimeout(function () { dice.classList.remove('is-rolling'); }, 520);
    });
  }

  /* ---------- surreal: the eye follows ---------- */

  var portraitSvg = doc.querySelector('.portrait__frame svg');
  var eyePupil = doc.getElementById('eyePupil');
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (portraitSvg && eyePupil && !calm) {
    portraitSvg.addEventListener('pointermove', function (e) {
      var box = portraitSvg.getBoundingClientRect();
      var x = (e.clientX - box.left) / box.width * 600;
      var y = (e.clientY - box.top) / box.height * 800;
      var dx = x - 160, dy = y - 210;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var reach = Math.min(6, d / 18);
      eyePupil.setAttribute('cx', (dx / d * reach).toFixed(2));
      eyePupil.setAttribute('cy', (dy / d * reach).toFixed(2));
    });
    portraitSvg.addEventListener('pointerleave', function () {
      eyePupil.setAttribute('cx', '0');
      eyePupil.setAttribute('cy', '0');
    });
  }

  /* ---------- console ---------- */

  if (window.console && console.log) {
    console.log('%c WANG XINYU %c personal archive / 2027 ',
      'background:#17352e;color:#ede4d0;padding:6px 10px;font-family:monospace',
      'background:#b08442;color:#0f2721;padding:6px 10px;font-family:monospace');
    console.log('%c 档案在控制台留了一盏灯。', 'color:#8a7d5e;font-size:11px;letter-spacing:.14em');
  }

  onScroll();
})();

