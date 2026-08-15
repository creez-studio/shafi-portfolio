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
     `src` (+ optional `poster`). Aspect ratio is locked to exact
     9:16 everywhere the card/modal render it, regardless of the
     source clip's native aspect.
  --------------------------------------------------------- */
  var R = 'assets/reels/';
  var REELS = [
    { title: 'ALDEEK CAFE',        catKey: 'PROMOTIONAL',  cat: 'Promotional Video', slug: 'aldeek/aldeek-01' },
    { title: 'ALDEEK CAFE',        catKey: 'SOCIAL MEDIA', cat: 'Social Media',      slug: 'aldeek/aldeek-02' },
    { title: 'ALDEEK CAFE',        catKey: 'SOCIAL MEDIA', cat: 'Social Media',      slug: 'aldeek/aldeek-03' },

    { title: 'ULSAVAM',            catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ulsavam' },
    { title: 'KOURAVA — EDIT',     catKey: 'CINEMATIC',    cat: 'Cinematic',         slug: 'kourava-edit' },
    { title: 'TKM BROTHERS',       catKey: 'CINEMATIC',    cat: 'Cinematic',         slug: 'tkm-brothers' },

    { title: "AYZAAN — BIRTHDAY",  catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ayzaan-birthday' },
    { title: "FADI — 1ST BIRTHDAY",catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'fadi-1st-birthday' },
    { title: "MEHRU — BIRTHDAY",   catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'mehru-birthday' },
    { title: "AMEEN — BIRTHDAY",   catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ameen-birthday' },
    { title: "AYASH — BIRTHDAY",   catKey: 'EVENTS',       cat: 'Event Coverage',    slug: 'ayash-birthday' },

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

    { title: 'ACCHU — FYP',   catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'acchu-fyp' },
    { title: 'AFSAL — FYP',   catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'afsal-fyp' },
    { title: 'ALIDA — FYP',   catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'alida-fyp' },
    { title: 'AMITHA — FYP',  catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'amitha-fyp' },
    { title: 'ARCHA — FYP',   catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'archa-fyp' },
    { title: 'FADI — FYP',    catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'fadi-fyp' },
    { title: 'NAZI — FYP',    catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'nazi-fyp' },
    { title: 'NASIYA — FYP',  catKey: 'SOCIAL MEDIA', cat: 'Social Media', slug: 'nasiya-fyp' }
  ].map(function (r, i) {
    r.n = String(i + 1).padStart(2, '0');
    r.src = R + r.slug + '.mp4';
    r.poster = R + r.slug + '.jpg';
    return r;
  });

  var CATS = ['ALL', 'EVENTS', 'PROMOTIONAL', 'SOCIAL MEDIA', 'CINEMATIC'];

  var SKILLS = [
    'Cinematic Editing', 'Social Media Content Creation', 'Video Shooting', 'Framing',
    'Composition', 'Mobile Post-Production', 'Storytelling', 'Pacing',
    'Music & Visual Synchronization', 'Transitions', 'Audience Engagement'
  ];

  var TOP  = [['01','WORK','work'],['02','ABOUT','about'],['03','SKILLS','skills'],['04','CONTACT','contact']];
  var SIDE = [['01','HOME','home'],['02','ABOUT','about'],['03','SKILLS','skills'],['04','WORK','work'],['05','CONTACT','contact']];
  var PAGES = ['home', 'about', 'skills', 'work', 'contact'];

  var BREAK = 860;
  var CURSOR_FX = false;   // approved-design default
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = { page: null, filter: 'ALL', menu: false, about: false, sent: false, w: window.innerWidth };

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  }); };

  /* ---------- style-hover / style-focus runtime (design fidelity) ---------- */
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
      var n = String(i + 1).padStart(2, '0');
      return '<div data-hover="padding-left:6px" style="display:flex;align-items:baseline;gap:12px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.07);transition:padding-left .18s">' +
        '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;color:rgba(238,27,36,.85)">' + n + '</span>' +
        '<span style="font-family:\'Barlow Condensed\',sans-serif;font-weight:500;font-size:15.5px;letter-spacing:.06em;color:rgba(255,255,255,.82);line-height:1.3">' + esc(label) + '</span>' +
        '</div>';
    }).join('');
    bindInteractions($('skillsGrid'));
  }

  /* ---------- reel media (poster / video / placeholder) ---------- */
  function reelMediaHTML(r) {
    if (r.src) {
      return '<video src="' + esc(r.src) + '"' + (r.poster ? ' poster="' + esc(r.poster) + '"' : '') +
        ' muted loop playsinline preload="none" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>';
    }
    if (r.poster) {
      return '<img src="' + esc(r.poster) + '" alt="' + esc(r.title) + '" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />';
    }
    // graceful placeholder
    return '<div style="position:absolute;inset:0;background:' +
      'radial-gradient(120% 80% at 50% 0%, rgba(238,27,36,.10), rgba(0,0,0,0) 60%),' +
      'repeating-linear-gradient(135deg, rgba(255,255,255,.02) 0 8px, rgba(0,0,0,0) 8px 16px), #101010;' +
      'display:flex;align-items:center;justify-content:center">' +
      '<div style="font-family:\'Big Shoulders Display\',sans-serif;font-weight:800;font-size:clamp(40px,10vw,64px);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.14)">' + r.n + '</div>' +
      '</div>';
  }

  function playOverlayHTML() {
    return '<div class="reel-play" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">' +
      '<div style="width:52px;height:52px;border-radius:50%;background:rgba(6,6,6,.55);border:1px solid rgba(255,255,255,.5);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M7 4l13 8-13 8z"/></svg></div></div>';
  }

  function buildReels() {
    var grid = $('workGrid');
    var shown = state.filter === 'ALL' ? REELS : REELS.filter(function (r) { return r.catKey === state.filter; });
    $('workEmpty').hidden = shown.length !== 0;

    grid.innerHTML = shown.map(function (r) {
      var idx = REELS.indexOf(r);
      return '<div data-reel="' + idx + '" tabindex="0" role="button" aria-label="Play ' + esc(r.title) + ' (' + esc(r.cat) + ')" ' +
        'data-hover="transform:translateY(-6px);border-color:rgba(238,27,36,.75)" ' +
        'style="position:relative;border:1px solid rgba(255,255,255,.1);background:#0A0A0A;overflow:hidden;cursor:pointer;transition:transform .25s cubic-bezier(.16,1,.3,1),border-color .25s;animation:rise .5s ease both">' +
        '<div style="position:relative;aspect-ratio:9/16;overflow:hidden;background:#101010">' +
          reelMediaHTML(r) + playOverlayHTML() +
        '</div>' +
        '<div style="padding:14px 14px 16px">' +
          '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:15px;letter-spacing:.14em;color:#F0F0F0">' + esc(r.title) + '</div>' +
          '<div style="font-size:12.5px;color:rgba(255,255,255,.45);margin-top:4px">' + esc(r.cat) + '</div>' +
          '<div style="width:22px;height:2px;background:#EE1B24;margin-top:10px"></div>' +
        '</div>' +
        '<div style="position:absolute;top:12px;left:12px;font-family:\'JetBrains Mono\',monospace;font-size:10px;letter-spacing:.14em;color:rgba(255,255,255,.72);background:rgba(0,0,0,.6);padding:4px 8px;pointer-events:none">9:16</div>' +
      '</div>';
    }).join('');
    bindInteractions(grid);
  }

  function buildFilters() {
    $('workFilters').innerHTML = CATS.map(function (label) {
      if (state.filter === label) {
        return '<div data-filter="' + esc(label) + '" tabindex="0" role="button" aria-pressed="true" style="cursor:pointer;border:1px solid #EE1B24;color:#EE1B24;background:rgba(238,27,36,.1);padding:10px 18px;font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:13px;letter-spacing:.16em">' + esc(label) + '</div>';
      }
      return '<div data-filter="' + esc(label) + '" tabindex="0" role="button" aria-pressed="false" data-hover="color:#fff;border-color:rgba(255,255,255,.34)" style="cursor:pointer;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.62);padding:10px 18px;font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:13px;letter-spacing:.16em;transition:color .18s,border-color .18s">' + esc(label) + '</div>';
    }).join('');
    bindInteractions($('workFilters'));
  }

  /* ---------- 9:16 reel modal ---------- */
  var lastFocus = null;
  function openReel(idx) {
    var r = REELS[idx];
    if (!r) return;
    lastFocus = document.activeElement;
    var body = $('reelModalBody');
    if (r.src) {
      body.innerHTML = '<video src="' + esc(r.src) + '"' + (r.poster ? ' poster="' + esc(r.poster) + '"' : '') +
        ' controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;background:#000"></video>';
    } else {
      body.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:24px;' +
        'background:radial-gradient(120% 80% at 50% 0%, rgba(238,27,36,.12), rgba(0,0,0,0) 60%), #0A0A0A">' +
        '<div style="font-family:\'Big Shoulders Display\',sans-serif;font-weight:800;font-size:clamp(44px,14vw,80px);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.16)">' + r.n + '</div>' +
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:11px;letter-spacing:.22em;color:rgba(255,255,255,.5)">VIDEO COMING SOON</div>' +
        '<div data-nav="contact" style="cursor:pointer;margin-top:6px;border:1px solid rgba(238,27,36,.7);color:#EE1B24;padding:12px 22px;font-family:\'Barlow Condensed\',sans-serif;font-weight:600;font-size:13px;letter-spacing:.18em">REQUEST FULL REEL</div>' +
        '</div>';
    }
    $('reelModalTitle').textContent = r.title + '  ·  ' + r.cat;
    var m = $('reelModal');
    m.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = m.querySelector('[data-action="closeReel"]');
    if (closeBtn) { closeBtn.setAttribute('tabindex', '0'); closeBtn.focus(); }
  }
  function closeReel() {
    var m = $('reelModal');
    if (m.hidden) return;
    var v = m.querySelector('video');
    if (v) { try { v.pause(); } catch (e) {} }
    $('reelModalBody').innerHTML = '';
    m.hidden = true;
    document.body.style.overflow = '';
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

    // rail
    $('rail').hidden = !rail;
    if (rail) { $('railNav').innerHTML = railNavHTML(page); bindInteractions($('railNav')); }

    // top nav
    $('topnav').hidden = !showTopNav;
    if (showTopNav) {
      $('topNavWide').innerHTML = topNavHTML(page);
      bindInteractions($('topNavWide'));
      $('topNavWide').hidden = !wide;
      $('topCta').hidden = !wide;
      $('topBurger').hidden = wide;
    }

    // mobile rail header
    $('railMobileHeader').hidden = !railMobileHeader;

    // mobile menu
    var menuEl = $('mobileMenu');
    menuEl.hidden = !state.menu;
    if (state.menu) { $('menuNav').innerHTML = menuNavHTML(page); bindInteractions($('menuNav')); }
    document.body.style.overflow = state.menu ? 'hidden' : '';

    // active page
    PAGES.forEach(function (p) {
      var el = $('page-' + p);
      if (el) el.hidden = (p !== page);
    });

    // about expand
    $('aboutExtra').hidden = !state.about;
    $('aboutCta').textContent = state.about ? 'LESS ABOUT ME' : 'MORE ABOUT ME';

    // contact
    $('contactSent').hidden = !state.sent;
    $('contactForm').hidden = state.sent;

    // work
    var wc = $('workCta');
    if (wc) wc.hidden = !wide;               // design: CTA is desktop-only
    if (page === 'work') { buildFilters(); buildReels(); }
  }

  /* ---------- navigation with transition ---------- */
  function setPage(p, fromPop) {
    if (!PAGES.indexOf(p) && p !== 'home') { /* noop guard */ }
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
    if (filt) { state.filter = filt.getAttribute('data-filter'); render(); return true; }

    var reel = target.closest('[data-reel]');
    if (reel) { openReel(parseInt(reel.getAttribute('data-reel'), 10)); return true; }

    return false;
  }

  document.addEventListener('click', function (e) {
    // modal backdrop closes
    if (e.target === $('reelModal')) { closeReel(); return; }
    onActivate(e.target);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!$('reelModal').hidden) { closeReel(); return; }
      if (state.menu) { state.menu = false; render(); return; }
    }
    if (e.key === 'Enter' || e.key === ' ') {
      var el = e.target;
      if (el && (el.hasAttribute('data-nav') || el.hasAttribute('data-action') ||
                 el.hasAttribute('data-filter') || el.hasAttribute('data-reel'))) {
        e.preventDefault();
        onActivate(el);
      }
    }
  });

  // contact form
  $('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!e.target.checkValidity()) { e.target.reportValidity(); return; }
    state.sent = true;
    render();
    try { e.target.reset(); } catch (err) {}
  });

  // resize (debounced)
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      var nw = window.innerWidth;
      if (nw !== state.w) { state.w = nw; render(); }
    }, 120);
  });

  // history
  window.addEventListener('popstate', function () {
    var p = (location.hash || '#home').slice(1);
    if (PAGES.indexOf(p) === -1) p = 'home';
    setPage(p, true);
  });

  // optional custom cursor
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
