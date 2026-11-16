/* 徽章指针：走现实时间，时区跟着界面语言切换。
   语言 → 时区：中 Asia/Shanghai、英 UTC、日 Asia/Tokyo、韩 Asia/Seoul。
   指针由 JS 直接写 transform，不再用 CSS 动画，所以切语言时能立刻换时区。 */
(function () {
  'use strict';

  var TZ = { zh: 'Asia/Shanghai', en: 'UTC', ja: 'Asia/Tokyo', ko: 'Asia/Seoul' };

  var minHand = document.querySelector('.emblem__hand--min');
  var hourHand = document.querySelector('.emblem__hand--hour');
  if (!minHand || !hourHand || typeof Intl === 'undefined') return;

  var fmt = null;
  var fmtZone = '';

  function parts(zone) {
    if (!fmt || fmtZone !== zone) {
      try {
        fmt = new Intl.DateTimeFormat('en-GB', {
          timeZone: zone, hour12: false,
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        fmtZone = zone;
      } catch (e) {
        fmt = null;
      }
    }

    if (!fmt) {
      var d = new Date();
      return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() };
    }

    var out = { h: 0, m: 0, s: 0 };
    fmt.formatToParts(new Date()).forEach(function (p) {
      if (p.type === 'hour') out.h = (+p.value) % 24;
      if (p.type === 'minute') out.m = +p.value;
      if (p.type === 'second') out.s = +p.value;
    });
    return out;
  }

  function currentZone() {
    var lang = (window.WXI18N && window.WXI18N.lang) || document.documentElement.dataset.lang || 'zh';
    return TZ[lang] || TZ.zh;
  }

  function tick() {
    var t = parts(currentZone());
    var minDeg = (t.m + t.s / 60) * 6;
    var hourDeg = ((t.h % 12) + t.m / 60 + t.s / 3600) * 30;
    minHand.style.transform = 'rotate(' + minDeg.toFixed(2) + 'deg)';
    hourHand.style.transform = 'rotate(' + hourDeg.toFixed(2) + 'deg)';
  }

  tick();
  setInterval(tick, 1000);
  document.addEventListener('languagechange', tick);
})();
