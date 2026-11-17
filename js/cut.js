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

  /* 文案走 i18n：中文原文当 key，切语言时自己重写一遍 */
  function t(zh) {
    return window.WXI18N && window.WXI18N.t ? window.WXI18N.t(zh) : zh;
  }

  function hourTpl() {
    var h = new Date().getHours();
    if (h < 5) return '凌晨 {h} 点，剪它做什么！';
    if (h < 9) return '天刚亮，纸先没了。';
    if (h < 12) return '上午的课剪掉了，下午的呢？';
    if (h < 14) return '午饭时间也不放过一张纸。';
    if (h < 18) return '下午 {h} 点，一事无成，只剪了张纸。';
    if (h < 23) return '晚自习该写的东西，被你剪成了球。';
    return '{h} 点了，剪了做什么！';
  }

  function hourLine() {
    return t(hourTpl()).replace('{h}', String(new Date().getHours()));
  }

  /* 投进 / 投不进 的说法：[中, en, ja, ko]，各 30 条，抽完一轮才回池 */
  var VOICE = {
    hit: [
      ['进了。就这一次。', 'In. Just this once.', '入った。今回だけ。', '들어갔다. 이번만.'],
      ['嗯，进了。', 'Mm. In.', 'うん、入った。', '음, 들어갔다.'],
      ['篮子接住了。', 'The basket caught it.', 'かごが受け止めた。', '바구니가 받아냈다.'],
      ['运气不错。', 'Lucky.', '運がいい。', '운이 좋네.'],
      ['手还稳。', 'Steady hand.', '手はまだしっかりしてる。', '손은 아직 안정적이다.'],
      ['干净的一投。', 'Clean throw.', 'きれいな一投。', '깔끔한 투구.'],
      ['这下安静了。', 'Quiet now.', 'これで静かになった。', '이제 조용해졌다.'],
      ['归档成功。', 'Filed.', 'アーカイブ完了。', '아카이브 완료.'],
      ['它在里面了。', "It's in there.", '中に入った。', '안에 들어갔다.'],
      ['抛物线是对的。', 'The arc was right.', '放物線は正しかった。', '포물선은 맞았다.'],
      ['没浪费纸。', 'Not a wasted page.', '紙の無駄にはならなかった。', '종이를 낭비하지 않았다.'],
      ['一次就够。', 'Once is enough.', '一度で十分。', '한 번이면 충분하다.'],
      ['手感回来了。', 'The feel is back.', '感覚が戻った。', '감각이 돌아왔다.'],
      ['及格。', 'Passing grade.', '合格。', '합격.'],
      ['好球。', 'Good throw.', 'いい球。', '좋은 투구.'],
      ['收工。', "That's a wrap.", '終了。', '끝.'],
      ['纸团终于找到家了。', 'The ball finally found home.', '紙の玉はようやく家を見つけた。', '종이 뭉치가 드디어 집을 찾았다.'],
      ['垃圾桶没躲。', "The bin didn't dodge.", 'ゴミ箱は避けなかった。', '쓰레기통은 피하지 않았다.'],
      ['这一投有教养。', 'A well-mannered throw.', '行儀のいい一投。', '예의 바른 투구.'],
      ['可以了。', "That'll do.", 'それでいい。', '그걸로 됐다.'],
      ['落点在正中间。', 'Dead centre.', 'ど真ん中。', '정중앙.'],
      ['没有弹出来。', "Didn't bounce out.", '跳ね返らなかった。', '튕겨 나오지 않았다.'],
      ['比上次好。', 'Better than last time.', '前よりいい。', '지난번보다 낫다.'],
      ['轻轻地，进去了。', 'Softly in.', 'そっと、入った。', '살며시, 들어갔다.'],
      ['你赢了这一回合。', 'You win this round.', 'このラウンドは君の勝ち。', '이번 판은 네 승리.'],
      ['精准。', 'Precise.', '正確。', '정확하다.'],
      ['大概是算过的。', 'Probably calculated.', 'たぶん計算ずく。', '아마 계산한 거겠지.'],
      ['桶盖都不用开太大。', 'The lid barely had to open.', 'ふたはほとんど開かなくて済んだ。', '뚜껑은 거의 열 필요도 없었다.'],
      ['这个准头，留着。', 'Keep that aim.', 'その狙い、取っておいて。', '그 조준, 남겨 둬.'],
      ['进了。剩下的纸不多了。', 'In. Not much paper left.', '入った。残りの紙はもう少ない。', '들어갔다. 남은 종이는 얼마 없다.'],
      ['一投就中，今天状态不错。', 'First try. Good day.', '一発で入った。今日は調子がいい。', '한 번에 들어갔다. 오늘 컨디션 좋네.'],
      ['桶里多了一页历史。', 'One more page of history in the bin.', 'ゴミ箱に歴史が一ページ増えた。', '쓰레기통에 역사가 한 장 늘었다.'],
      ['手起纸落。', 'Hand up, paper down.', '手が上がり、紙が落ちる。', '손이 오르고 종이가 내려간다.'],
      ['这球有点职业。', 'That looked professional.', 'その球、ちょっとプロっぽい。', '그 공, 좀 프로 같았다.'],
      ['安静地落进去了。', 'It went in quietly.', '静かに入っていった。', '조용히 들어갔다.'],
      ['垃圾桶点头了。', 'The bin nodded.', 'ゴミ箱がうなずいた。', '쓰레기통이 고개를 끄덕였다.'],
      ['抛物线吻了一下桶口。', 'The arc kissed the rim.', '放物線が縁にキスした。', '포물선이 입구에 입 맞췄다.'],
      ['这一下很省事。', 'That was efficient.', 'その一投、手間いらず。', '이번은 간단했다.'],
      ['你没浪费第二次。', 'No second try needed.', '二投目はいらなかった。', '두 번째는 필요 없었다.'],
      ['稳稳的。', 'Steady.', '安定してる。', '안정적이다.'],
      ['纸团认路了。', 'The ball knows the way now.', '紙の玉は道を覚えた。', '종이 뭉치가 길을 안다.'],
      ['有点像练过。', 'Looks like you practiced.', '少し練習したみたいだ。', '좀 연습한 것 같다.'],
      ['桶：欢迎。', 'Bin: welcome.', 'ゴミ箱：ようこそ。', '쓰레기통: 환영.'],
      ['落点干净。', 'Clean landing.', '着地がきれい。', '착지가 깔끔하다.'],
      ['没弹，没滚，没丢人。', 'No bounce, no roll, no shame.', '跳ねず、転がらず、恥もかかず。', '튕기지도, 굴러가지도, 창피하지도 않았다.'],
      ['这一投可以写进年表。', 'Worth a line in the timeline.', 'この一投は年表に書ける。', '이 투구는 연표에 쓸 만하다.'],
      ['手感这东西，来了就来了。', 'Feel arrives when it arrives.', '感覚って、来るときは来る。', '감각이란, 올 때 온다.'],
      ['力度刚好。', 'Just the right force.', 'ちょうどいい力加減。', '힘이 딱 맞았다.'],
      ['轻轻一送就进去了。', 'A gentle push was enough.', 'そっと送るだけで入った。', '살짝 밀었을 뿐인데 들어갔다.'],
      ['进了。今天到此为止。', 'In. That is enough for today.', '入った。今日はここまで。', '들어갔다. 오늘은 여기까지.']
    ],
    miss: [
      ['没进。手抖了？', 'Missed. Hands shaking?', '外れ。手が震えてる？', '빗나갔다. 손 떨려?'],
      ['垃圾桶：就这？', 'Bin: that all?', 'ゴミ箱：それだけ？', '쓰레기통: 그게 다야?'],
      ['弹出来了，像你的计划。', 'Bounced out, like your plans.', '跳ね返った。君の計画みたいに。', '튕겨 나왔다. 네 계획처럼.'],
      ['这抛物线有点自信。', 'That arc was overconfident.', 'その放物線、自信過剰だ。', '그 포물선, 자신감이 넘쳤다.'],
      ['差一点点——差的是准头。', 'So close — just missing the aim.', 'あと少し——足りないのは狙いだけ。', '아깝다——모자란 건 조준이다.'],
      ['这球我替你尴尬。', 'I am embarrassed for you.', 'その球、代わりに恥ずかしい。', '그 공, 대신 창피하다.'],
      ['垃圾桶躲了一下。', 'The bin flinched.', 'ゴミ箱が身をかわした。', '쓰레기통이 피했다.'],
      ['你投的是旁边的空气。', 'You threw at the air next to it.', '隣の空気に投げたね。', '옆의 공기에 던졌구나.'],
      ['又没进。', 'Missed again.', 'また外れ。', '또 빗나갔다.'],
      ['这叫投掷？这叫放手。', 'A throw? That was letting go.', 'これが投擲？ただ手を離しただけ。', '이게 투구야? 그냥 놓은 거지.'],
      ['纸团在外面，你在里面。', 'The ball is outside, you are inside.', '紙の玉は外、君は中。', '종이 뭉치는 밖, 너는 안.'],
      ['垃圾桶说它不需要练习。', 'The bin says it needs no practice.', 'ゴミ箱は練習はいらないと言っている。', '쓰레기통은 연습 필요 없다고 한다.'],
      ['你把它吓跑了。', 'You scared it away.', '君が驚かせて逃がした。', '네가 놀라게 해서 도망갔다.'],
      ['目标是桶，不是月亮。', 'The target is the bin, not the moon.', '狙うのはゴミ箱で、月じゃない。', '목표는 쓰레기통이지 달이 아니다.'],
      ['准星呢？', 'Where is your sight?', '照準はどこ？', '조준경은 어디 갔어?'],
      ['很像随手一扔。', 'Looked like a casual toss.', '気軽に放った感じだ。', '아무렇게나 던진 것 같다.'],
      ['落点：大概在心里。', 'Landing point: somewhere in your heart.', '着地点：たぶん心の中。', '착지점: 아마 마음속.'],
      ['桶：我可以等。', 'Bin: I can wait.', 'ゴミ箱：待てるよ。', '쓰레기통: 기다릴 수 있어.'],
      ['手滑还是心虚？', 'Slippery hands, or a guilty mind?', '手が滑った？それとも後ろめたい？', '손이 미끄러졌어, 아니면 마음이?'],
      ['纸团拒绝被归档。', 'The ball refuses to be filed.', '紙の玉はアーカイブを拒否した。', '종이 뭉치가 아카이브를 거부했다.'],
      ['力量有了，方向没有。', 'Power yes, direction no.', '力はある、方向はない。', '힘은 있다, 방향은 없다.'],
      ['差三厘米，差一整年。', 'Three centimetres off, a whole year late.', '三センチのずれ、一年の遅れ。', '3센티 차이, 1년의 지연.'],
      ['垃圾桶开始怀疑人生。', 'The bin is questioning its existence.', 'ゴミ箱が人生を疑い始めた。', '쓰레기통이 인생을 의심하기 시작했다.'],
      ['你的手在犹豫。', 'Your hand hesitated.', '君の手がためらった。', '네 손이 망설였다.'],
      ['有想法，没结果。', 'Good idea, no result.', '発想はある、結果はない。', '생각은 있다, 결과는 없다.'],
      ['球在桶外，人生在桶里。', 'The ball is outside; life is inside.', '玉は外、人生は中。', '공은 밖, 인생은 안.'],
      ['桶盖都没动。', 'The lid did not even move.', 'ふたは微動だにしなかった。', '뚜껑조차 움직이지 않았다.'],
      ['用力过猛，或者根本没用力。', 'Too much force, or none at all.', '力みすぎ、あるいは力が入っていない。', '너무 힘줬거나, 아예 안 줬거나.'],
      ['再来一次，反正纸不值钱。', 'Again. Paper is cheap.', 'もう一回。紙は安い。', '다시. 종이는 싸다.'],
      ['这次投给了空气。', 'That one was for the air.', '今回は空気に投げた。', '이번엔 공기에 던졌다.'],
      ['桶口那么大，你偏要投旁边。', 'The mouth is huge. You aimed beside it.', '口はあんなに大きいのに、隣へ投げた。', '입구가 저렇게 큰데 옆에 던졌다.'],
      ['这一投，空气都让开了。', 'Even the air stepped aside.', 'その一投、空気まで避けた。', '그 투구에 공기마저 비켜섰다.'],
      ['你手上有风。', 'There is wind in your hands.', '君の手には風がある。', '네 손에는 바람이 있다.'],
      ['抛物线在半路改了主意。', 'The arc changed its mind halfway.', '放物線が途中で気が変わった。', '포물선이 중간에 마음을 바꿨다.'],
      ['球权还在你手里。', 'You still have the ball.', 'まだ球は君の手にある。', '공은 아직 네 손에 있다.'],
      ['差一点，和每次都差一点。', 'So close, like every time.', 'あと少し。毎回あと少し。', '아깝다. 매번 아깝다.'],
      ['垃圾桶往里缩了缩。', 'The bin shrank back a little.', 'ゴミ箱が少し引っ込んだ。', '쓰레기통이 조금 움츠러들었다.'],
      ['这不是投，是通知。', 'That was not a throw, it was a notice.', 'それは投擲じゃなくて通知だ。', '그건 투구가 아니라 통보였다.'],
      ['你把它扔给了明天。', 'You threw it at tomorrow.', '明日に向かって投げたね。', '내일에게 던졌구나.'],
      ['手感今天请假了。', 'Your touch took the day off.', '今日は感覚が休暇を取っている。', '감각이 오늘 휴가를 갔다.'],
      ['桶：我在下面。', 'Bin: I am down here.', 'ゴミ箱：下にいるよ。', '쓰레기통: 아래에 있어.'],
      ['球擦着桶边过去了，像很多事。', 'It grazed the rim, like so many things.', '縁をかすめて過ぎた。多くのことのように。', '테두리를 스쳐 지나갔다. 많은 일들처럼.'],
      ['没进，但姿势不错。', 'Missed, but the form was nice.', '外れだけど、フォームは悪くない。', '빗나갔지만 자세는 좋았다.'],
      ['用力了，也偏了。', 'You used force. And missed.', '力は入った。そして外れた。', '힘은 들어갔다. 그리고 빗나갔다.'],
      ['站那么近还投不进。', 'That close, and still missed.', 'こんなに近いのに外す。', '이렇게 가까운데 놓쳤다.'],
      ['你需要的不是力气。', 'Force is not what you need.', '必要なのは力じゃない。', '필요한 건 힘이 아니다.'],
      ['纸团在空中犹豫了一下。', 'The ball hesitated mid-air.', '紙の玉が空中でためらった。', '종이 뭉치가 공중에서 망설였다.'],
      ['这一投很诚恳，桶没感动。', 'A sincere throw. The bin was unmoved.', '誠実な一投。ゴミ箱は動じなかった。', '진심인 투구. 쓰레기통은 감동하지 않았다.'],
      ['落地的声音比进球响。', 'The landing was louder than a score.', '着地の音のほうが大きかった。', '착지 소리가 골인보다 컸다.'],
      ['又一份没归档的青春。', 'Another unarchived piece of youth.', 'またひとつ、アーカイブされない青春。', '또 하나, 아카이브되지 못한 청춘.']
    ]
  };

  /* 一副牌：投进 + 投不进 一共 60 句，洗好了一张张抽，抽完才回池——
     这样连着玩 50 轮也不会重样 */
  var pool = [];
  function refillPool() {
    pool = [];
    VOICE.hit.forEach(function (_, i) { pool.push({ k: 'hit', i: i }); });
    VOICE.miss.forEach(function (_, i) { pool.push({ k: 'miss', i: i }); });
    pool = shuffled(pool);
  }
  function pickLine(kind) {
    if (!pool.length) refillPool();
    var at = -1, i;
    for (i = 0; i < pool.length; i++) if (pool[i].k === kind) { at = i; break; }
    if (at < 0) {
      refillPool();
      for (i = 0; i < pool.length; i++) if (pool[i].k === kind) { at = i; break; }
    }
    var pick = pool.splice(at, 1)[0];
    return VOICE[pick.k][pick.i];
  }

  var LANG_IX = { zh: 0, en: 1, ja: 2, ko: 3 };
  function t4(row) {
    var lang = (window.WXI18N && window.WXI18N.lang) || 'zh';
    return row[LANG_IX[lang] || 0] || row[0];
  }

  function fillEcho(echo) {
    while (echo.firstChild) echo.removeChild(echo.firstChild);
    echo.appendChild(el('p', 'cut-echo__line', hourLine()));
    echo.appendChild(el('p', 'cut-echo__line cut-echo__line--face', '：（'));
    if (state.line) echo.appendChild(el('p', 'cut-echo__line', t4(state.line)));
    echo.appendChild(el('p', 'cut-echo__hint', t('刷新一下，纸还能长回来。')));
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
    inner.appendChild(bin);
    inner.appendChild(echo);

    if (calm) {
      wrap.style.display = 'none';
      state.line = pickLine('hit');
      fillEcho(echo);
      section.classList.add('is-done');
      return;
    }

    /* 把切线顶到视口上方一点，让“空”露出来 */
    var lineTop = cutLine.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo(0, Math.max(0, lineTop - 78));

    /* 揉：先收紧，再压扁起皱，最后缩成一颗球——球落在视线中心，纸团从那里接着来 */
    var cx = window.pageXOffset + window.innerWidth / 2;
    var cy = window.pageYOffset + window.innerHeight * 0.42;

    wrap.style.transformOrigin =
      ((cx - (box.left + window.pageXOffset)) | 0) + 'px ' +
      (Math.max(0, cy - lineBottom) | 0) + 'px';

    doc.documentElement.dataset.cutStage = 'crush';
    wrap.classList.add('is-gather');

    setTimeout(function () {
      wrap.classList.add('is-wrinkle', 'is-crush');
      setTimeout(function () {
        wrap.classList.add('is-ball');
        var wad = el('div', 'cut-wad');
        wad.style.left = cx + 'px';
        wad.style.top = cy + 'px';
        doc.body.appendChild(wad);
        wad.getBoundingClientRect();          /* 先落一次布局，让 opacity 从 0 过渡上来 */
        wad.style.opacity = '1';
        doc.documentElement.dataset.cutStage = 'wad';

        setTimeout(function () {
          wrap.style.display = 'none';
          showThrow(wad, bin, echo, cx, cy);
        }, 400);
      }, 470);
    }, 250);
  }

  /* ---------- 7. 投纸团：按住蓄力，松开投出 ---------- */

  function showThrow(wad, bin, echo, cx, cy) {
    doc.documentElement.dataset.cutStage = 'throw';

    var ui = el('div', 'cut-throw');
    ui.innerHTML =
      '<button class="cut-throw__btn" type="button"></button>' +
      '<span class="cut-throw__bar"><span class="cut-throw__fill"></span></span>' +
      '<span class="cut-throw__hint"></span>';
    ui.querySelector('.cut-throw__btn').textContent = t('按住投出');
    ui.querySelector('.cut-throw__hint').textContent = t('按住蓄力，松开投出');
    inner.appendChild(ui);
    ui.getBoundingClientRect();
    ui.classList.add('is-on');

    var btn = ui.querySelector('.cut-throw__btn');
    var fillBar = ui.querySelector('.cut-throw__fill');
    var charging = null;
    var raf = 0;
    var thrown = false;

    function chargeLoop() {
      if (!charging) return;
      var p = Math.min(1, (performance.now() - charging.t0) / 1150);
      charging.p = p;
      fillBar.style.width = (p * 100) + '%';
      wad.style.transform = 'scale(' + (1 + p * 0.18) + ') rotate(' + (p * 9) + 'deg)';
      raf = requestAnimationFrame(chargeLoop);
    }

    function start(e) {
      if (thrown) return;
      if (e && e.preventDefault) e.preventDefault();
      charging = { t0: performance.now(), p: 0 };
      wad.style.transition = 'none';      /* 蓄力和飞行都要逐帧改，不能让它自己补间 */
      ui.classList.add('is-charging');
      if (e && e.pointerId != null && btn.setPointerCapture) {
        try { btn.setPointerCapture(e.pointerId); } catch (err) {}
      }
      raf = requestAnimationFrame(chargeLoop);
    }

    function release(e) {
      if (!charging || thrown) return;
      var p = charging.p || 0;
      charging = null;
      cancelAnimationFrame(raf);
      if (e && e.preventDefault) e.preventDefault();
      ui.classList.remove('is-charging');
      ui.classList.add('is-thrown');
      thrown = true;
      if (p < 0.08) p = 0.3;                 /* 轻点一下算小力，不至于直接飞不动 */
      launch(p);
    }

    btn.addEventListener('pointerdown', start);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
    /* 键盘：空格/回车直接按“中等力道”投 */
    btn.addEventListener('keydown', function (e) {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      e.preventDefault();
      start(e);
      setTimeout(function () { release(e); }, 520);
    });

    function launch(p) {
      var sweet = p >= 0.55 && p <= 0.85;
      var hit = Math.random() < (sweet ? 0.9 : 0.42);

      var b = bin.getBoundingClientRect();
      var mouth = {
        x: b.left + b.width / 2 + window.pageXOffset,
        y: b.top + b.height * 0.16 + window.pageYOffset
      };
      var missSpot = {
        x: b.left - 58 - Math.random() * 46 + window.pageXOffset,
        y: b.bottom + 4 + window.pageYOffset
      };
      var from = { x: cx, y: cy };

      doc.documentElement.dataset.cutStage = 'fly';

      arc(wad, from, hit ? mouth : missSpot, 620, function () {
        if (hit) {
          /* 落进桶里 */
          wad.style.transition = 'transform .26s ease, opacity .26s ease';
          wad.style.left = mouth.x + 'px';
          wad.style.top = (mouth.y + 34) + 'px';
          wad.style.transform = 'scale(.42) rotate(240deg)';
          wad.style.opacity = '0';
          bin.classList.add('is-fed');
          setTimeout(function () { wad.style.display = 'none'; }, 240);
          finish(true);
        } else {
          /* 磕在桶沿上，弹开、滚两下，然后淡出 */
          wad.style.transition = 'left .22s ease-out, top .22s ease-out, transform .22s ease-out, opacity .3s ease';
          wad.style.left = missSpot.x + 'px';
          wad.style.top = missSpot.y + 'px';
          wad.style.transform = 'scale(.86) rotate(300deg)';
          bin.classList.add('is-bumped');
          setTimeout(function () { bin.classList.remove('is-bumped'); }, 420);
          setTimeout(function () {
            wad.style.left = (missSpot.x - 52) + 'px';
            wad.style.top = (missSpot.y - 10) + 'px';
            wad.style.transform = 'scale(.66) rotate(392deg)';
            setTimeout(function () { wad.style.opacity = '0'; }, 220);
            setTimeout(function () { wad.style.display = 'none'; }, 700);
          }, 230);
          finish(false);
        }
      });
    }

    function finish(hit) {
      state.line = pickLine(hit ? 'hit' : 'miss');
      fillEcho(echo);
      setTimeout(function () {
        section.classList.add('is-done');
        doc.documentElement.dataset.cutStage = 'done';
        doc.documentElement.dataset.cutHit = hit ? '1' : '0';
        ui.classList.remove('is-on');
        setTimeout(function () { if (ui.parentNode) ui.parentNode.removeChild(ui); }, 400);
      }, 220);
    }
  }

  /* 抛物线：起点、终点、中间抬一点 */
  function arc(node, from, to, dur, done) {
    var t0 = performance.now();
    var lift = Math.max(90, Math.abs(to.x - from.x) * 0.28);
    var ctrl = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - lift };

    function step(t) {
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 2.1);      /* 出手快、接近时慢 */
      var x = (1 - e) * (1 - e) * from.x + 2 * (1 - e) * e * ctrl.x + e * e * to.x;
      var y = (1 - e) * (1 - e) * from.y + 2 * (1 - e) * e * ctrl.y + e * e * to.y;
      node.style.left = x + 'px';
      node.style.top = y + 'px';
      node.style.transform = 'scale(' + (1 - 0.18 * e) + ') rotate(' + (e * 210) + 'deg)';
      if (k < 1) requestAnimationFrame(step);
      else if (done) done();
    }
    requestAnimationFrame(step);
  }

  /* ---------- 6. 沿着虚线拖剪刀 ---------- */

  var runner = cutLine.querySelector('.cut-runner');
  var fill = cutLine.querySelector('.cut-fill');
  var icon = cutBtn.querySelector('.cut-btn__icon');
  var cutting = null;

  function fleck(x) {
    if (!cutLine || calm) return;
    var bit = el('span', 'cut-fleck');
    bit.style.left = Math.round(x) + 'px';
    bit.style.top = '0';
    bit.style.setProperty('--fx', (Math.random() * 16 - 8).toFixed(1) + 'px');
    bit.style.setProperty('--fr', (Math.random() * 120 - 60).toFixed(0) + 'deg');
    cutLine.appendChild(bit);
    setTimeout(function () {
      if (bit.parentNode) bit.parentNode.removeChild(bit);
    }, 760);
  }

  function setProgress(p) {
    if (!cutting) return;
    cutting.p = p;
    fill.style.width = Math.round(p * cutting.w) + 'px';
    runner.style.transform = 'translateX(' + (p * cutting.travel).toFixed(1) + 'px)';
  }

  function beginCut(e) {
    if (state.cut || cutting) return;
    var box = cutLine.getBoundingClientRect();
    var ir = icon.getBoundingClientRect();
    var left = ir.left - box.left;

    if (!runner.firstChild && icon) runner.appendChild(icon.cloneNode(true));
    runner.style.left = left + 'px';
    runner.style.top = (ir.top - box.top) + 'px';
    runner.classList.add('is-on');
    cutBtn.classList.add('is-cutting');
    cutLine.classList.add('is-cutting');

    cutting = {
      w: box.width,
      x0: box.left,
      travel: Math.max(0, box.width - left - ir.width),
      p: 0,
      fleckAt: -1
    };
    if (cutBtn.setPointerCapture) {
      try { cutBtn.setPointerCapture(e.pointerId); } catch (err) {}
    }
    e.preventDefault();
    moveCut(e);
  }

  function moveCut(e) {
    if (!cutting) return;
    var box = cutLine.getBoundingClientRect();   /* 每帧重新量，改窗口大小也不会错位 */
    if (box.width) { cutting.w = box.width; cutting.x0 = box.left; }
    var p = (e.clientX - cutting.x0) / cutting.w;
    p = p < 0 ? 0 : (p > 1 ? 1 : p);
    setProgress(p);
    if (p - cutting.fleckAt > 0.045) {
      cutting.fleckAt = p;
      fleck(p * cutting.w + 6);
    }
  }

  function endCut(e) {
    if (!cutting) return;
    if (cutBtn.releasePointerCapture && e && e.pointerId !== undefined) {
      try { cutBtn.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    var p = cutting.p;
    cutLine.classList.remove('is-cutting');

    if (p >= 0.94) {
      setProgress(1);
      cutting = null;
      cutNow();
      return;
    }

    /* 没剪到头：纸又合上了 */
    cutLine.classList.add('is-retracting');
    setProgress(0);
    setTimeout(function () {
      cutLine.classList.remove('is-retracting');
      runner.classList.remove('is-on');
      cutBtn.classList.remove('is-cutting');
      fill.style.width = '0px';
      cutting = null;
    }, 500);
  }

  if (window.PointerEvent) {
    cutLine.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target === bubble) return;
      beginCut(e);
    });
    doc.addEventListener('pointermove', moveCut, { passive: true });
    doc.addEventListener('pointerup', endCut);
    doc.addEventListener('pointercancel', endCut);

    /* 键盘（回车/空格）产生的 click 没有坐标，直接剪开 */
    cutBtn.addEventListener('click', function (e) {
      if (e.detail === 0) cutNow();
    });
  } else {
    cutBtn.addEventListener('click', cutNow);
  }

  /* 换语言时，把已经浮现的吐槽重新写一遍 */
  doc.addEventListener('languagechange', function () {
    var echo = inner && inner.querySelector('.cut-echo');
    if (echo) fillEcho(echo);
  });
})();
