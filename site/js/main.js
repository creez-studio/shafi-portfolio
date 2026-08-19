/* ============================================================
   Muhammad Shafi S — Portfolio runtime
   Vanilla reimplementation of the approved Claude Design logic.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     REELS
     Only finished, published reels are listed here. To add one,
     drop the file in assets/reels/ and append an entry with its
     `src` (+ optional `poster`). `ratio: '16:9'` if the reel is
     landscape, otherwise 9:16 is assumed.
  --------------------------------------------------------- */
  var R = 'assets/reels/';
  var REELS = [
    // Current work — PR team of M. M. Naseer, MLA (Chadayamangalam)
    { title: 'SCHOOL PARK — INAUGURATION',        catKey: 'MLA WORKS', cat: 'M. M. Naseer, MLA — Chadayamangalam', slug: 'mla/mla-school-park-inauguration' },
    { title: 'KADAKKAL TALUK HOSPITAL REVIEW',    catKey: 'MLA WORKS', cat: 'M. M. Naseer, MLA — Chadayamangalam', slug: 'mla/mla-taluk-hospital-review' },
    { title: 'VATTATHIL THANGAL WATERFALLS',      catKey: 'MLA WORKS', cat: 'M. M. Naseer, MLA — Chadayamangalam', slug: 'mla/mla-tourism-waterfalls' },
    { title: 'CHITHARA — KANNANKODE SETTLEMENT',  catKey: 'MLA WORKS', cat: 'M. M. Naseer, MLA — Chadayamangalam', slug: 'mla/mla-chithara-settlement' },
    { title: 'JANASAMPARKAM',                     catKey: 'MLA WORKS', cat: 'M. M. Naseer, MLA — Chadayamangalam', slug: 'mla/mla-janasamparkam' },
    { title: 'WORLD ANTI-DRUG DAY PROGRAM',       catKey: 'MLA WORKS', cat: 'M. M. Naseer, MLA — Chadayamangalam', slug: 'mla/mla-anti-drug-day' },
    { title: 'VELINALLOOR — AMBALAMKUNNU',        catKey: 'MLA WORKS', cat: 'M. M. Naseer, MLA — Chadayamangalam', slug: 'mla/mla-velinalloor-settlement' },

    // Remakes — cinematic film references
    { title: 'JUNGLE MOVIE REF',   catKey: 'REMAKES', cat: 'Cinematic Remake', slug: 'remakes/jungle-movie-ref',   ratio: '16:9' },
    { title: 'VADACHENNAI',        catKey: 'REMAKES', cat: 'Cinematic Remake', slug: 'remakes/vadachennai-remake', ratio: '16:9' },
    { title: 'SIBLING LOVE',       catKey: 'REMAKES', cat: 'Cinematic Remake', slug: 'remakes/sibling-love' },
    { title: 'LET YOUR SMILE BE YOUR SIGNATURE', catKey: 'REMAKES', cat: 'Cinematic Remake', slug: 'remakes/smile-signature' },

    { title: 'ALDEEK CAFE',        catKey: 'PROMOTIONAL',  cat: 'Promotional Video', slug: 'aldeek/aldeek-01' },
    { title: 'ALDEEK CAFE',        catKey: 'SOCIAL MEDIA', cat: 'Social Media',      slug: 'aldeek/aldeek-02' },
    { title: 'ALDEEK CAFE',        catKey: 'SOCIAL MEDIA', cat: 'Social Media',      slug: 'aldeek/aldeek-03' },

    { title: 'ULSAVAM',            catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ulsavam' },
    { title: 'KOURAVA — EDIT',     catKey: 'CINEMATIC',    cat: 'Cinematic',         slug: 'kourava-edit' },
    { title: 'TKM BROTHERS',       catKey: 'CINEMATIC',    cat: 'Cinematic',         slug: 'tkm-brothers' },

    { title: 'AYZAAN — BIRTHDAY',  catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ayzaan-birthday' },
    { title: 'FADI — 1ST BIRTHDAY',catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'fadi-1st-birthday' },
    { title: 'MEHRU — BIRTHDAY',   catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'mehru-birthday' },
    { title: 'AMEEN — BIRTHDAY',   catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ameen-birthday' },
    { title: 'AYASH — BIRTHDAY',   catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ayash-birthday' },

    { title: 'BSOFT — SHOWREEL',             catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'bsoft-showreel' },
    { title: 'BSOFT — BOOTCAMP ANNOUNCEMENT',catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'bsoft-bootcamp-announcement' },
    { title: 'BSOFT — AI CREATION',          catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'bsoft-ai-creation' },
    { title: 'BSOFT — INNOVATE YOUR FUTURE', catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'bsoft-innovate-your-future' },
    { title: 'BSOFT — YOUR FUTURE',          catKey: 'PROMOTIONAL', cat: 'Promotional Video', slug: 'bsoft-your-future' },
    { title: 'BSOFT — GTA EXPLAINER',        catKey: 'CINEMATIC',   cat: 'Cinematic',         slug: 'bsoft-gta-explainer' },
    { title: 'BSOFT — RETRO EDIT',           catKey: 'CINEMATIC',   cat: 'Cinematic',         slug: 'bsoft-retro-edit' },
    { title: 'BSOFT — IT INNOVATOR SUMMIT',  catKey: 'EVENTS',      cat: 'Event Coverage',    slug: 'bsoft-it-innovator-summit' },
    { title: "BSOFT — VALENTINE'S DAY",      catKey: 'SOCIAL MEDIA',cat: 'Social Media',      slug: 'bsoft-valentines-day' },
    { title: "BSOFT — WOMEN'S DAY",          catKey: 'SOCIAL MEDIA',cat: 'Social Media',      slug: 'bsoft-womens-day' },
    { title: 'BSOFT — FEEDBACK 01',          catKey: 'SOCIAL MEDIA',cat: 'Social Media',      slug: 'bsoft-feedback-01' },
    { title: 'BSOFT — FEEDBACK 02',          catKey: 'SOCIAL MEDIA',cat: 'Social Media',      slug: 'bsoft-feedback-02' },

    { title: 'AMITHA — FYP',  catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'amitha-fyp' },
    { title: 'NAZI — FYP',    catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'nazi-fyp' },
    { title: 'NASIYA — FYP',  catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'nasiya-fyp' }
  ].map(function (r, i) {
    r.n = String(i + 1).padStart(2, '0');
    r.src = R + r.slug + '.mp4';
    r.poster = R + r.slug + '.jpg';
    return r;
  });

  // Category order + display metadata (also drives filter chips)
  var CATEGORIES = [
    { key: 'MLA WORKS',    label: 'MLA WORKS',    tag: 'CURRENT PROJECT' },
    { key: 'REMAKES',      label: 'REMAKES',      tag: 'CINEMATIC REFERENCES' },
    { key: 'EVENTS',       label: 'EVENTS',       tag: 'EVENT COVERAGE' },
    { key: 'PROMOTIONAL',  label: 'PROMOTIONAL',  tag: 'BRAND & PROMO' },
    { key: 'CINEMATIC',    label: 'CINEMATIC',    tag: 'CINEMATIC EDITS' },
    { key: 'SOCIAL MEDIA', label: 'SOCIAL MEDIA', tag: 'FEED & REELS' }
  ];
  var CATS = ['ALL'].concat(CATEGORIES.map(function (c) { return c.key; }));

  var SKILLS = [
    'Cinematic Editing', 'Social Media Content Creation', 'Video Shooting', 'Framing',
    'Composition', 'Mobile Post-Production', 'Storytelling', 'Pacing',
    'Music & Visual Synchronization', 'Transitions', 'Audience Engagement'
  ];

  var TOP  = [['01','WORK','work'],['02','ABOUT','about'],['03','SKILLS','skills'],['04','CONTACT','contact']];
  var SIDE = [['01','HOME','home'],['02','ABOUT','about'],['03','SKILLS','skills'],['04','WORK','work'],['05','CONTACT','contact']];
  var PAGES = ['home', 'about', 'skills', 'work', 'contact'];

  var BREAK = 860;
  var CURSOR_FX = false;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = {
    page: null, filter: 'ALL', menu: false, about: false, sent: false,
    w: window.innerWidth,
    stackActive: {},         // { catKey: activeIndex }
    modalOpen: false
  };

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  }); };
  var pad2 = function (n) { return String(n).padStart(2, '0'); };
  var catSlug = function (k) { return k.toLowerCase().replace(/[^a-z0-9]+/g, '-'); };

  /* ---------- data-hover / data-focus runtime ---------- */
  function parseDecl(str) {
    var out = [];
    (str || '').split(';').forEach(function (pair) {
      var i = pair.indexOf(':');
      if (i === -1) return;
      var k = pair.slice(0, i).trim();
      var v = pair.slice(i + 1).trim();
      if (k) out.push([k, v]);
    });
    return out;
  }
  function applyDecl(el, decls, storeKey) {
    var prev = {};
    decls.forEach(function (kv) {
      prev[kv[0]] = el.style.getPropertyValue(kv[0]);
      el.style.setProperty(kv[0], kv[1]);
    });
    el[storeKey] = prev;
  }
  function restoreDecl(el, storeKey) {
    var prev = el[storeKey];
    if (!prev) return;
    Object.keys(prev).forEach(function (k) {
      if (prev[k]) el.style.setProperty(k, prev[k]);
      else el.style.removeProperty(k);
    });
    el[storeKey] = null;
  }
  function bindInteractions(root) {
    (root || document).querySelectorAll('[data-hover]').forEach(function (el) {
      if (el.__hoverBound) return;
      el.__hoverBound = true;
      var decls = parseDecl(el.getAttribute('data-hover'));
      el.addEventListener('mouseenter', function () { applyDecl(el, decls, '__hoverPrev'); });
      el.addEventListener('mouseleave', function () { restoreDecl(el, '__hoverPrev'); });
    });
    (root || document).querySelectorAll('[data-focus]').forEach(function (el) {
      if (el.__focusBound) return;
      el.__focusBound = true;
      var decls = parseDecl(el.getAttribute('data-focus'));
      el.addEventListener('focus', function () { applyDecl(el, decls, '__focusPrev'); });
      el.addEventListener('blur', function () { restoreDecl(el, '__focusPrev'); });
    });
  }

  /* ---------- nav builders ---------- */
  function topNavHTML(page) {
    return TOP.map(function (it) {
      var n = it[0], label = it[1], p = it[2];
      if (p === page) {
        return '<div data-nav="' + p + '" tabindex="0" role="link" aria-current="page" style="cursor:pointer">' +
          '<div style="font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:.16em;color:#EE1B24">' + n + '</div>' +
          '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:16px;letter-spacing:.14em;color:#EE1B24;margin-top:4px">' + label + '</div>' +
          '<div style="height:2px;background:#EE1B24;margin-top:6px;transform-origin:left;animation:lineX .35s cubic-bezier(.16,1,.3,1) both"></div>' +
          '</div>';
      }
      return '<div data-nav="' + p + '" tabindex="0" role="link" data-hover="color:#fff" style="cursor:pointer;color:rgba(255,255,255,.78);transition:color .18s">' +
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:.16em;color:rgba(255,255,255,.34)">' + n + '</div>' +
        '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:16px;letter-spacing:.14em;margin-top:4px">' + label + '</div>' +
        '</div>';
    }).join('');
  }

  function railNavHTML(page) {
    return SIDE.map(function (it) {
      var n = it[0], label = it[1], p = it[2];
      if (p === page) {
        return '<div data-nav="' + p + '" tabindex="0" role="link" aria-current="page" style="cursor:pointer;position:relative;padding:14px 26px;background:linear-gradient(90deg, rgba(238,27,36,.16), rgba(238,27,36,0));border-top:1px solid rgba(238,27,36,.28);border-bottom:1px solid rgba(238,27,36,.28)">' +
          '<div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:#EE1B24"></div>' +
          '<div style="font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:.16em;color:#EE1B24">' + n + '</div>' +
          '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:16px;letter-spacing:.16em;color:#EE1B24;margin-top:2px">' + label + '</div>' +
          '</div>';
      }
      return '<div data-nav="' + p + '" tabindex="0" role="link" data-hover="background:rgba(255,255,255,.04);padding-left:32px" style="cursor:pointer;padding:14px 26px;transition:background .2s,padding-left .2s">' +
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:.16em;color:rgba(255,255,255,.34)">' + n + '</div>' +
        '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:16px;letter-spacing:.16em;color:rgba(255,255,255,.78);margin-top:2px">' + label + '</div>' +
        '</div>';
    }).join('');
  }

  function menuNavHTML(page) {
    return SIDE.map(function (it) {
      var n = it[0], label = it[1], p = it[2];
      var color = p === page ? '#EE1B24' : '#F2F2F2';
      return '<div data-nav="' + p + '" tabindex="0" role="link" style="cursor:pointer;display:flex;align-items:baseline;gap:16px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08)">' +
        '<span style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:#EE1B24">' + n + '</span>' +
        '<span style="font-family:\'Big Shoulders Display\',sans-serif;font-weight:800;font-size:38px;letter-spacing:.01em;color:' + color + '">' + label + '</span>' +
        '</div>';
    }).join('');
  }

  /* ---------- skills ---------- */
  function buildSkills() {
    $('skillsGrid').innerHTML = SKILLS.map(function (label, i) {
      var n = pad2(i + 1);
      return '<div data-hover="padding-left:6px" style="display:flex;align-items:baseline;gap:12px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.07);transition:padding-left .18s">' +
        '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;color:rgba(238,27,36,.85)">' + n + '</span>' +
        '<span style="font-family:\'Barlow Condensed\',sans-serif;font-weight:500;font-size:15.5px;letter-spacing:.06em;color:rgba(255,255,255,.82);line-height:1.3">' + esc(label) + '</span>' +
        '</div>';
    }).join('');
    bindInteractions($('skillsGrid'));
  }

  /* ---------- reel media (poster / video / placeholder) ---------- */
  function reelMediaHTML(r) {
    var fit = r.ratio === '16:9' ? 'contain' : 'cover';
    if (r.src) {
      return '<video src="' + esc(r.src) + '"' + (r.poster ? ' poster="' + esc(r.poster) + '"' : '') +
        ' muted loop playsinline preload="none" style="position:absolute;inset:0;width:100%;height:100%;object-fit:' + fit + ';background:#000"></video>';
    }
    if (r.poster) {
      return '<img src="' + esc(r.poster) + '" alt="' + esc(r.title) + '" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:' + fit + ';background:#000" />';
    }
    return '<div style="position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 0%, rgba(238,27,36,.10), rgba(0,0,0,0) 60%),repeating-linear-gradient(135deg, rgba(255,255,255,.02) 0 8px, rgba(0,0,0,0) 8px 16px), #101010;display:flex;align-items:center;justify-content:center"><div style="font-family:\'Big Shoulders Display\',sans-serif;font-weight:800;font-size:clamp(40px,10vw,64px);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.14)">' + r.n + '</div></div>';
  }

  function playOverlayHTML(active) {
    var opacity = active ? '.92' : '0';
    return '<div class="reel-play" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:' + opacity + ';transition:opacity .25s">' +
      '<div style="width:54px;height:54px;border-radius:50%;background:rgba(6,6,6,.5);border:1px solid rgba(255,255,255,.6);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M7 4l13 8-13 8z"/></svg></div></div>';
  }

  /* ---------- Work page — stacked/fanned decks per category ---------- */

  // Given an offset from the active card, compute the CSS-var values that
  // position it in the fan. Cards farther from center get more X-offset,
  // smaller scale, and lower opacity. Card 0 = center.
  function cardVars(offset) {
    var abs = Math.abs(offset);
    return {
      offset: offset,
      scale: Math.max(0.55, 1 - abs * 0.12),
      opacity: Math.max(0.28, 1 - abs * 0.22),
      z: 20 - abs,
      dim: abs === 0 ? 1 : Math.max(0.55, 1 - abs * 0.18)
    };
  }
  function cardStyle(offset) {
    var v = cardVars(offset);
    return '--offset:' + v.offset + ';--scale:' + v.scale + ';--opacity:' + v.opacity + ';--z:' + v.z + ';--dim:' + v.dim + ';';
  }

  function renderDeckCard(r, i, active, cat) {
    var idx = REELS.indexOf(r);
    var offset = i - active;
    var abs = Math.abs(offset);
    // hide cards far outside the fan
    var visible = abs <= 3;
    var isActive = offset === 0;
    return '<div class="deck-card' + (isActive ? ' is-active' : '') + '" ' +
      'data-stack-card="' + esc(cat) + ':' + i + '" ' +
      'tabindex="' + (isActive ? '0' : '-1') + '" role="button" ' +
      'aria-label="' + (isActive ? 'Play ' : 'Focus ') + esc(r.title) + '" ' +
      'style="' + cardStyle(offset) + (visible ? '' : 'visibility:hidden;pointer-events:none;') + '">' +
      '<div class="deck-card-media">' +
        reelMediaHTML(r) +
        (r.ratio === '16:9' ? '<div class="deck-card-ratio">16:9</div>' : '') +
        playOverlayHTML(isActive) +
      '</div>' +
      '<div class="deck-card-foot">' +
        '<span class="deck-card-n">' + pad2(i + 1) + '</span>' +
        '<span class="deck-card-title">' + esc(r.title) + '</span>' +
      '</div>' +
    '</div>';
  }

  function renderStackSection(cat, meta, reels) {
    var active = state.stackActive[cat] || 0;
    if (active >= reels.length) active = 0;
    var r = reels[active];
    var total = reels.length;
    return '<section class="stack" id="stack-' + catSlug(cat) + '" data-stack="' + esc(cat) + '">' +
      '<header class="stack-head">' +
        '<div class="stack-tag">' + esc(meta.tag) + '</div>' +
        '<div class="stack-title-row">' +
          '<h3 class="stack-title">' + esc(meta.label) + '</h3>' +
          '<div class="stack-count">' + total + ' REEL' + (total === 1 ? '' : 'S') + '</div>' +
        '</div>' +
      '</header>' +
      '<div class="deck" data-deck="' + esc(cat) + '">' +
        reels.map(function (rr, i) { return renderDeckCard(rr, i, active, cat); }).join('') +
      '</div>' +
      '<div class="deck-info">' +
        '<div class="deck-info-main">' +
          '<div class="deck-active-cat">' + esc(r.cat) + '</div>' +
          '<div class="deck-active-title">' + esc(r.title) + '</div>' +
        '</div>' +
        '<div class="deck-nav">' +
          '<button type="button" class="deck-arrow" data-stack-prev="' + esc(cat) + '" aria-label="Previous reel">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 6l-6 6 6 6"/></svg>' +
          '</button>' +
          '<span class="deck-counter">' + pad2(active + 1) + ' / ' + pad2(total) + '</span>' +
          '<button type="button" class="deck-arrow" data-stack-next="' + esc(cat) + '" aria-label="Next reel">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>' +
          '</button>' +
          '<button type="button" class="deck-play" data-stack-play="' + esc(cat) + '" data-hover="background:#EE1B24;color:#fff">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>' +
            'PLAY' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function buildStacks() {
    var byCat = {};
    REELS.forEach(function (r) { (byCat[r.catKey] = byCat[r.catKey] || []).push(r); });

    var sections = CATEGORIES.filter(function (c) {
      if (!byCat[c.key] || !byCat[c.key].length) return false;
      if (state.filter === 'ALL') return true;
      return c.key === state.filter;
    });

    if (!sections.length) {
      $('workStacks').innerHTML = '<div class="stack-empty">NO REELS IN THIS CATEGORY YET</div>';
      return;
    }

    $('workStacks').innerHTML = sections.map(function (c) {
      return renderStackSection(c.key, c, byCat[c.key]);
    }).join('');
    bindInteractions($('workStacks'));
    attachDeckSwipe();
  }

  // Touch-swipe on decks: horizontal drag advances prev/next.
  function attachDeckSwipe() {
    document.querySelectorAll('.deck').forEach(function (deck) {
      if (deck.__swipeBound) return;
      deck.__swipeBound = true;
      var startX = 0, startY = 0, dx = 0, active = false;
      deck.addEventListener('touchstart', function (e) {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX; startY = e.touches[0].clientY;
        dx = 0; active = true;
      }, { passive: true });
      deck.addEventListener('touchmove', function (e) {
        if (!active) return;
        dx = e.touches[0].clientX - startX;
        var dy = e.touches[0].clientY - startY;
        if (Math.abs(dy) > Math.abs(dx)) active = false; // vertical scroll wins
      }, { passive: true });
      deck.addEventListener('touchend', function () {
        if (!active) return;
        active = false;
        if (Math.abs(dx) < 40) return;
        var cat = deck.getAttribute('data-deck');
        stackShift(cat, dx < 0 ? 1 : -1);
      }, { passive: true });
    });
  }

  function stackShift(cat, delta) {
    var reels = REELS.filter(function (r) { return r.catKey === cat; });
    if (!reels.length) return;
    var active = (state.stackActive[cat] || 0) + delta;
    if (active < 0) active = reels.length - 1;
    if (active >= reels.length) active = 0;
    state.stackActive[cat] = active;
    updateDeck(cat);
  }

  // Fast in-place update of a deck without re-parsing HTML.
  function updateDeck(cat) {
    var section = document.getElementById('stack-' + catSlug(cat));
    if (!section) return;
    var reels = REELS.filter(function (r) { return r.catKey === cat; });
    var active = state.stackActive[cat] || 0;
    var cards = section.querySelectorAll('.deck-card');
    cards.forEach(function (el, i) {
      var offset = i - active;
      var abs = Math.abs(offset);
      var v = cardVars(offset);
      el.style.setProperty('--offset', v.offset);
      el.style.setProperty('--scale', v.scale);
      el.style.setProperty('--opacity', v.opacity);
      el.style.setProperty('--z', v.z);
      el.style.setProperty('--dim', v.dim);
      el.classList.toggle('is-active', offset === 0);
      el.setAttribute('tabindex', offset === 0 ? '0' : '-1');
      var visible = abs <= 3;
      if (visible) {
        el.style.visibility = '';
        el.style.pointerEvents = '';
      } else {
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      }
      // sync the play overlay opacity
      var play = el.querySelector('.reel-play');
      if (play) play.style.opacity = offset === 0 ? '.92' : '0';
    });
    var r = reels[active];
    var infoT = section.querySelector('.deck-active-title');
    var infoC = section.querySelector('.deck-active-cat');
    var counter = section.querySelector('.deck-counter');
    if (infoT) infoT.textContent = r.title;
    if (infoC) infoC.textContent = r.cat;
    if (counter) counter.textContent = pad2(active + 1) + ' / ' + pad2(reels.length);
  }

  function buildFilters() {
    $('workFilters').innerHTML = CATS.map(function (label) {
      var isAll = label === 'ALL';
      var target = isAll ? 'ALL' : label;
      if (state.filter === label) {
        return '<button type="button" class="filter is-active" data-filter="' + esc(label) + '" aria-pressed="true">' + esc(label) + '</button>';
      }
      return '<button type="button" class="filter" data-filter="' + esc(label) + '" aria-pressed="false" data-hover="color:#fff;border-color:rgba(255,255,255,.34)">' + esc(label) + '</button>';
    }).join('');
    bindInteractions($('workFilters'));
  }

  /* ---------- modal (9:16 or 16:9) with back-gesture support ---------- */
  var lastFocus = null;
  var PROCESS_VIDEO = {
    title: 'TIMELINE — RAW — RENDER', cat: 'CapCut · One App, Start to Finish', n: '',
    src: 'assets/reels/process/timeline-raw-render.mp4',
    poster: 'assets/reels/process/timeline-raw-render.jpg',
    ratio: '16:9'
  };

  function openMedia(item) {
    if (!item) return;
    lastFocus = document.activeElement;
    var body = $('reelModalBody');
    if (item.src) {
      body.innerHTML = '<video src="' + esc(item.src) + '"' + (item.poster ? ' poster="' + esc(item.poster) + '"' : '') +
        ' controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;background:#000"></video>';
    } else {
      body.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:24px;background:radial-gradient(120% 80% at 50% 0%, rgba(238,27,36,.12), rgba(0,0,0,0) 60%), #0A0A0A">' +
        '<div style="font-family:\'Big Shoulders Display\',sans-serif;font-weight:800;font-size:clamp(44px,14vw,80px);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.16)">' + esc(item.n || '') + '</div>' +
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:11px;letter-spacing:.22em;color:rgba(255,255,255,.5)">VIDEO COMING SOON</div>' +
        '</div>';
    }
    $('reelModalTitle').textContent = item.title + '  ·  ' + item.cat;

    var frame = $('reelModalFrame'), badge = $('reelModalBadge');
    if (item.ratio === '16:9') {
      frame.style.aspectRatio = '16/9';
      frame.style.width = 'min(92vw, 960px)';
      frame.style.height = 'auto';
      frame.style.maxWidth = 'min(92vw, 960px)';
      frame.style.maxHeight = '86vh';
      badge.textContent = '16:9';
    } else {
      frame.style.aspectRatio = '9/16';
      frame.style.height = 'min(86vh, calc((100vw - 40px) * 16 / 9))';
      frame.style.width = 'auto';
      frame.style.maxWidth = 'calc(100vw - 40px)';
      frame.style.maxHeight = '';
      badge.textContent = '9:16';
    }

    var m = $('reelModal');
    m.hidden = false;
    state.modalOpen = true;
    document.body.style.overflow = 'hidden';

    // Push a history entry so the browser/OS back gesture closes the modal
    // instead of navigating away. We tag it so popstate can recognize it.
    try {
      history.pushState({ modal: true, page: state.page || 'home' }, '', location.hash || '#work');
    } catch (e) {}

    var closeBtn = m.querySelector('[data-action="closeReel"]');
    if (closeBtn) { closeBtn.setAttribute('tabindex', '0'); closeBtn.focus(); }
  }
  function openReel(idx) { openMedia(REELS[idx]); }

  function closeReel(fromPop) {
    var m = $('reelModal');
    if (m.hidden) return;
    var v = m.querySelector('video');
    if (v) { try { v.pause(); } catch (e) {} }
    $('reelModalBody').innerHTML = '';
    m.hidden = true;
    state.modalOpen = false;
    document.body.style.overflow = '';
    // Pop the history entry the modal pushed, unless popstate already did it for us.
    if (!fromPop) {
      try {
        if (history.state && history.state.modal) history.back();
      } catch (e) {}
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- render (visibility + nav state) ---------- */
  function render() {
    var page = state.page || 'home';
    var w = state.w;
    var wide = w >= BREAK;
    var isWC = (page === 'work' || page === 'contact');
    var rail = isWC && wide;
    var showTopNav = !rail && !isWC;
    var railMobileHeader = !rail && isWC;

    document.body.classList.toggle('is-narrow', !wide);

    $('rail').hidden = !rail;
    if (rail) { $('railNav').innerHTML = railNavHTML(page); bindInteractions($('railNav')); }

    $('topnav').hidden = !showTopNav;
    if (showTopNav) {
      $('topNavWide').innerHTML = topNavHTML(page);
      bindInteractions($('topNavWide'));
      $('topNavWide').hidden = !wide;
      $('topCta').hidden = !wide;
      $('topBurger').hidden = wide;
    }

    $('railMobileHeader').hidden = !railMobileHeader;

    var menuEl = $('mobileMenu');
    menuEl.hidden = !state.menu;
    if (state.menu) { $('menuNav').innerHTML = menuNavHTML(page); bindInteractions($('menuNav')); }
    document.body.style.overflow = state.menu || state.modalOpen ? 'hidden' : '';

    PAGES.forEach(function (p) {
      var el = $('page-' + p);
      if (el) el.hidden = (p !== page);
    });

    document.querySelectorAll('.about-extra').forEach(function (el) { el.hidden = !state.about; });
    document.querySelectorAll('.about-cta-label').forEach(function (el) { el.textContent = state.about ? 'LESS ABOUT ME' : 'MORE ABOUT ME'; });

    $('contactSent').hidden = !state.sent;
    $('contactForm').hidden = state.sent;

    var wc = $('workCta');
    if (wc) wc.hidden = !wide;
    if (page === 'work') { buildFilters(); buildStacks(); }
  }

  /* ---------- navigation with transition ---------- */
  function setPage(p, fromPop) {
    if (PAGES.indexOf(p) === -1) p = 'home';
    var same = (state.page || 'home') === p;
    state.menu = false;
    if (same) { render(); return; }

    var stage = $('stage');
    var commit = function () {
      state.page = p;
      render();
      try { window.scrollTo(0, 0); } catch (e) {}
      requestAnimationFrame(function () { stage.classList.remove('is-exiting'); });
      if (!fromPop) {
        try { history.pushState({ page: p }, '', '#' + p); } catch (e) {}
      }
    };

    if (reduceMotion) { commit(); return; }
    stage.classList.add('is-exiting');
    setTimeout(commit, 200);
  }

  function smoothScrollTo(el) {
    if (!el) return;
    // Account for the sticky mobile header if any
    var top = el.getBoundingClientRect().top + window.pageYOffset - 12;
    try {
      window.scrollTo({ top: top, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, top);
    }
  }

  /* ---------- events ---------- */
  function onActivate(target) {
    var nav = target.closest('[data-nav]');
    if (nav) { setPage(nav.getAttribute('data-nav')); return true; }

    var act = target.closest('[data-action]');
    if (act) {
      var a = act.getAttribute('data-action');
      if (a === 'menu') { state.menu = !state.menu; render(); }
      else if (a === 'about') { state.about = !state.about; render(); }
      else if (a === 'reset') { state.sent = false; render(); }
      else if (a === 'closeReel') { closeReel(); }
      return true;
    }

    var filt = target.closest('[data-filter]');
    if (filt) {
      var f = filt.getAttribute('data-filter');
      state.filter = f;
      render();
      // scroll to the section after render
      if (f !== 'ALL') {
        requestAnimationFrame(function () {
          smoothScrollTo(document.getElementById('stack-' + catSlug(f)));
        });
      } else {
        requestAnimationFrame(function () {
          smoothScrollTo($('workStacks'));
        });
      }
      return true;
    }

    var prev = target.closest('[data-stack-prev]');
    if (prev) { stackShift(prev.getAttribute('data-stack-prev'), -1); return true; }
    var next = target.closest('[data-stack-next]');
    if (next) { stackShift(next.getAttribute('data-stack-next'), +1); return true; }
    var play = target.closest('[data-stack-play]');
    if (play) {
      var cat = play.getAttribute('data-stack-play');
      var reels = REELS.filter(function (r) { return r.catKey === cat; });
      openMedia(reels[state.stackActive[cat] || 0]);
      return true;
    }

    var card = target.closest('[data-stack-card]');
    if (card) {
      var parts = card.getAttribute('data-stack-card').split(':');
      var ccat = parts[0], idx = parseInt(parts[1], 10);
      var reels2 = REELS.filter(function (r) { return r.catKey === ccat; });
      var currentActive = state.stackActive[ccat] || 0;
      if (idx === currentActive) {
        openMedia(reels2[idx]);
      } else {
        state.stackActive[ccat] = idx;
        updateDeck(ccat);
      }
      return true;
    }

    var process = target.closest('[data-process]');
    if (process) { openMedia(PROCESS_VIDEO); return true; }

    return false;
  }

  document.addEventListener('click', function (e) {
    if (e.target === $('reelModal')) { closeReel(); return; }
    onActivate(e.target);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (state.modalOpen) { closeReel(); return; }
      if (state.menu) { state.menu = false; render(); return; }
    }
    if (e.key === 'Enter' || e.key === ' ') {
      var el = e.target;
      if (el && (el.hasAttribute('data-nav') || el.hasAttribute('data-action') ||
                 el.hasAttribute('data-filter') || el.hasAttribute('data-reel') ||
                 el.hasAttribute('data-process') || el.hasAttribute('data-stack-card') ||
                 el.hasAttribute('data-stack-prev') || el.hasAttribute('data-stack-next') ||
                 el.hasAttribute('data-stack-play'))) {
        e.preventDefault();
        onActivate(el);
      }
    }
    // Arrow-key deck navigation when a card in a deck has focus
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      var focused = document.activeElement;
      if (focused && focused.hasAttribute && focused.hasAttribute('data-stack-card')) {
        var cat = focused.getAttribute('data-stack-card').split(':')[0];
        stackShift(cat, e.key === 'ArrowLeft' ? -1 : 1);
        e.preventDefault();
      }
    }
  });

  // Contact form
  var CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/shafishams08@gmail.com';
  $('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var btn = $('contactSubmit');
    var label = $('contactSubmitLabel');
    var errorBox = $('contactError');
    errorBox.hidden = true;
    btn.disabled = true;
    label.textContent = 'SENDING…';
    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim() || 'New message from the portfolio site',
      message: form.message.value.trim(),
      _subject: 'Portfolio contact: ' + (form.subject.value.trim() || form.name.value.trim())
    };
    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { if (!res.ok) throw new Error('Request failed'); return res.json(); })
      .then(function () { state.sent = true; render(); try { form.reset(); } catch (err) {} })
      .catch(function () { errorBox.hidden = false; })
      .finally(function () {
        btn.disabled = false;
        label.textContent = 'SEND MESSAGE';
      });
  });

  // Resize (debounced)
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      var nw = window.innerWidth;
      if (nw !== state.w) { state.w = nw; render(); }
    }, 120);
  });

  // History — supports both page nav and modal close
  window.addEventListener('popstate', function (e) {
    if (state.modalOpen) {
      closeReel(true);
      return;
    }
    var p = (location.hash || '#home').slice(1);
    if (PAGES.indexOf(p) === -1) p = 'home';
    setPage(p, true);
  });

  // Optional custom cursor
  if (CURSOR_FX && state.w >= BREAK && !reduceMotion) {
    var dot = $('cursorDot');
    dot.hidden = false;
    window.addEventListener('pointermove', function (e) {
      dot.style.transform = 'translate(' + (e.clientX - 13) + 'px,' + (e.clientY - 13) + 'px)';
    });
  }

  /* ---------- init ---------- */
  function init() {
    buildSkills();
    bindInteractions(document);
    var start = (location.hash || '#home').slice(1);
    if (PAGES.indexOf(start) === -1) start = 'home';
    state.page = start;
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
