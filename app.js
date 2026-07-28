/* Illinois AI Guidance Companion — view logic. Vanilla JS, no dependencies.
   All content comes from data.js (window.IL_DATA). */
(function () {
  var D = window.IL_DATA;

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function firstPage(s) { var m = String(s).match(/\d+/); return m ? +m[0] : 1; }
  function pill(pages) {
    if (!pages) return '';
    return '<button type="button" class="pagepill" data-page="' + firstPage(pages) +
      '" title="Open the guidance at p. ' + esc(pages) + '">' + esc(pages) + '</button>';
  }
  function roleById(id) { return D.roles.filter(function (r) { return r.id === id; })[0]; }

  var ICONS = {
    compass: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4 6-2.5 5.5L8 16l2.5-5.5L16 8z"/>',
    shield: '<path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4z"/>',
    layers: '<path d="m12 2 10 6-10 6L2 8l10-6zm-7.5 10.5L12 17l7.5-4.5L22 14l-10 6-10-6 2.5-1.5z"/>',
    building: '<path d="M4 21V5l8-3 8 3v16h-5v-5h-6v5H4zm5-11h2v2H9v-2zm4 0h2v2h-2v-2zM9 7h2v2H9V7zm4 0h2v2h-2V7z"/>',
    pencil: '<path d="M3 17.2V21h3.8L17.9 9.9l-3.8-3.8L3 17.2zM20.7 7.1a1 1 0 0 0 0-1.4l-2.4-2.4a1 1 0 0 0-1.4 0l-1.8 1.8 3.8 3.8 1.8-1.8z"/>',
    heart: '<path d="M12 21s-7.5-4.7-9.7-9A5.6 5.6 0 0 1 12 6.3 5.6 5.6 0 0 1 21.7 12c-2.2 4.3-9.7 9-9.7 9z"/>',
    star: '<path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8L2.2 9.1l6.9-.8L12 2z"/>',
    people: '<path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm8 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM1.5 20a6.5 6.5 0 0 1 13 0v1h-13v-1zm14.9 1a8 8 0 0 0-2-5.2A5.5 5.5 0 0 1 22.5 20v1h-6.1z"/>',
    home: '<path d="m12 3 9 8h-3v9h-4v-6h-4v6H6v-9H3l9-8z"/>',
    gavel: '<path d="m14.6 3 6.4 6.4-2.1 2.1-1.1-1-6.9 6.9-3.2-3.2 6.9-6.9-1.1-1.1L14.6 3zM3 21l6-2-4-4-2 6z"/>',
    megaphone: '<path d="M20 4v12l-8-3H6a3 3 0 0 1 0-6h6l8-3zM7 15h3l1 6H8l-1-6z"/>'
  };
  function icon(name) {
    return '<span class="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      (ICONS[name] || ICONS.star) + '</svg></span>';
  }

  /* ---------------- Hero ---------------- */
  $('#stats').innerHTML = D.meta.stats.map(function (s) {
    return '<div class="stat"><b>' + esc(s.figure) + '</b><span>' + esc(s.label) + '</span></div>';
  }).join('');
  $('#tenets').innerHTML = D.meta.tenets.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
  $('#orientation').innerHTML = '<b>Every path starts here:</b> ' +
    D.meta.orientation.map(function (s) { return esc(s.label) + ' ' + pill(s.pages); })
      .join(' <span class="arrow" aria-hidden="true">→</span> ');
  $('#foot-official').href = D.meta.officialLanding;
  $('#foot-landing').href = D.meta.officialLanding;
  $('#foot-faq').href = D.meta.officialFaq;
  $('#foot-resnote').innerHTML = '<b>On resources.</b> ' + esc(D.meta.resourceNote);

  /* ---------------- Role cards ---------------- */
  var topRoles = D.roles.filter(function (r) { return !r.parent; });
  var state = { role: null, band: null };

  function renderRoleGrid() {
    $('#rolegrid').innerHTML = topRoles.map(function (r) {
      var active = state.role === r.id || (r.branches && r.branches.indexOf(state.role) >= 0);
      return '<button class="rolecard" data-role="' + r.id + '" aria-pressed="' + !!active + '">' +
        icon(r.icon) + '<h3>' + esc(r.name) + '</h3><p>' + esc(r.includes) + '</p></button>';
    }).join('');
  }

  function stageBody(id, r, band) {
    if (id === 'start') {
      var h = '<ul class="faq-list">' + (r.faq || []).map(function (f) {
        return '<li><span class="faq-q">' + esc(f.q) + '</span><span class="rl-label">' + esc(f.title) + '</span>' + pill(f.pages) + '</li>';
      }).join('') + '</ul>';
      if (r.faqNote) h += '<p class="faq-note">' + esc(r.faqNote) + '</p>';
      h += '<p class="faq-note">These are ISBE’s official Quick Start FAQ questions for this audience — read the full answers on pp. 4–21 or the <a href="' + esc(D.meta.officialFaq) + '" target="_blank" rel="noopener">official FAQ page</a>.</p>';
      return h;
    }
    var items =
      id === 'first' ? r.firstPass :
      id === 'deep' ? r.deepDive :
      id === 'shelf' ? r.shelf : [];

    if (id === 'send') {
      return '<div class="send-grid">' + (r.sendAlong || []).map(function (s) {
        return '<div class="sendcard"><b>' + esc(s.to) + '</b><p>' + esc(s.label) + '</p>' +
          '<span class="pages">pp. ' + esc(s.pages) + '</span>' +
          '<div class="sendcard__actions">' +
            (s.role ? '<button class="mini-btn mini-btn--solid" data-openrole="' + s.role + '">Open their path</button>' : '') +
            (s.role ? '<button class="mini-btn" data-copylink="' + s.role + '">Copy link</button>' : '') +
          '</div></div>';
      }).join('') + '</div>';
    }

    if (!items || !items.length) return '<p class="faq-note">This path leans on the Deep Dive above — no separate shelf.</p>';

    var hasRes = items.some(function (it) { return it.note === 'resources'; });
    var html = '<ul class="route-list">' + items.map(function (it) {
      var pages = it.pages;
      var sub = '';
      if (it.gradeBandKey && band) {
        var vals = it.gradeBandKey.map(function (k) { return band[k]; }).filter(Boolean);
        if (vals.length) { pages = vals.join(', '); sub = '<span class="rl-sub">' + esc(band.label) + ' pages</span>'; }
      } else if (it.gradeBandKey && !band) {
        sub = '<span class="rl-sub">Pick a grade band above for exact pages</span>';
      }
      return '<li><span class="rl-label">' + esc(it.label) + sub + '</span>' + pill(pages) + '</li>';
    }).join('') + '</ul>';

    if (id === 'first' && r.populations) {
      html += '<p class="faq-note" style="margin-top:14px"><b>Population-specific anchors:</b></p><div class="pop-grid">' +
        r.populations.map(function (p) { return '<span class="pop-chip">' + esc(p.label) + pill(p.pages) + '</span>'; }).join('') + '</div>';
    }
    if (hasRes) html += '<div class="resnote">⚖️ <span>' + esc(D.meta.resourceNote) + '</span></div>';
    return html;
  }

  function renderRole(id, opts) {
    opts = opts || {};
    var r = roleById(id);
    var detail = $('#roledetail');
    if (!r) { detail.innerHTML = ''; return; }
    state.role = id;
    renderRoleGrid();

    /* Branching card (Family, Board & Community) */
    if (r.branches) {
      detail.innerHTML = '<div class="branch"><h3>' + esc(r.name) + ' — three distinct paths</h3>' +
        '<p>These readers share some orientation material but shouldn’t get one undifferentiated path. Which fits you best?</p>' +
        '<div class="branch__opts">' + r.branches.map(function (bid) {
          var b = roleById(bid);
          return '<button class="rolecard" data-role="' + b.id + '">' + icon(b.icon) +
            '<h3>' + esc(b.name) + '</h3><p>' + esc(b.includes) + '</p></button>';
        }).join('') + '</div></div>';
      if (!opts.noScroll) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.replaceState(null, '', '#role=' + id); } catch (_) {}
      return;
    }

    var band = r.hasGradeBands ? (D.gradeBands.filter(function (b) { return b.id === state.band; })[0] || null) : null;
    var back = r.parent ? '<a class="backlink" href="#role=' + r.parent + '" data-openrole="' + r.parent + '">‹ Family, Board &amp; Community</a>' : '';

    var bandsHtml = '';
    if (r.hasGradeBands) {
      bandsHtml = '<div class="gradebands"><b>Grade band:</b>' + D.gradeBands.map(function (b) {
        return '<button class="gbbtn" data-band="' + b.id + '" aria-pressed="' + (band && band.id === b.id) + '">' + esc(b.label) + '</button>';
      }).join('') + '</div>';
    }

    detail.innerHTML =
      '<div class="role-banner">' + back +
        '<h3>' + esc(r.name) + '</h3>' +
        '<p class="includes">' + esc(r.includes) + '</p>' +
      '</div>' +
      '<div class="role-body">' + bandsHtml +
        D.stages.map(function (st, i) {
          var open = opts.openAll || i < 2; /* Start Here + First Pass open by default */
          return '<div class="stage' + (open ? ' is-open' : '') + '" data-stage="' + st.id + '">' +
            '<button class="stage__head" aria-expanded="' + open + '">' +
              '<span class="stage__num">' + (i + 1) + '</span>' +
              '<span class="stage__title"><h4>' + esc(st.name) + '</h4><p>' + esc(st.blurb) + '</p></span>' +
              '<svg class="stage__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
            '</button>' +
            '<div class="stage__body">' + stageBody(st.id, r, band) + '</div>' +
          '</div>';
        }).join('') +
      '</div>';

    if (!opts.noScroll) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try { history.replaceState(null, '', '#role=' + id); } catch (_) {}
    /* reader.js loads after app.js, so it picks up IL_routeStops at boot */
    window.IL_routeStops = routeStops(r, band);
    if (window.ILReader) window.ILReader.setStops(window.IL_routeStops);
  }

  /* First-pass stops for the reader toolbar */
  function routeStops(r, band) {
    if (!r || r.branches) return [];
    return (r.firstPass || []).filter(function (it) { return it.pages; }).map(function (it) {
      return { label: it.label, page: firstPage(it.pages) };
    });
  }

  /* ---------------- Explore ---------------- */
  function secRow(s, isSub) {
    return '<div class="sec' + (isSub ? ' is-sub' : '') + '"><span class="rl-label">' + esc(s.title) + '</span>' + pill(s.pages) + '</div>';
  }
  function renderExplore(q) {
    q = (q || '').trim().toLowerCase();
    function match(s) { return !q || s.title.toLowerCase().indexOf(q) >= 0; }
    var groups = [
      { name: 'Main guidance', items: D.sections.filter(match).map(function (s) { return secRow(s, false); }) },
      { name: 'Key subsections', items: D.subsections.filter(match).map(function (s) { return secRow(s, true); }) },
      { name: 'Appendices', items: D.appendices.filter(match).map(function (s) { return secRow(s, false); }) }
    ];
    var html = groups.map(function (g) {
      if (!g.items.length) return '';
      return '<div class="chapter"><h3>' + esc(g.name) + '</h3><div class="sec-grid">' + g.items.join('') + '</div></div>';
    }).join('');
    $('#explorelist').innerHTML = html || '<div class="empty">No sections match “' + esc(q) + '.”</div>';
  }
  $('#search').addEventListener('input', function (e) { renderExplore(e.target.value); });

  /* ---------------- Bundles ---------------- */
  $('#bundlegrid').innerHTML = D.bundles.map(function (b) {
    var r = roleById(b.role);
    return '<div class="sendcard"><b>' + esc(b.label) + '</b>' +
      '<p>Opens the ' + esc(r ? r.name : b.role) + ' path</p>' +
      '<span class="pages">pp. ' + esc(b.pages) + '</span>' +
      '<div class="sendcard__actions">' +
        '<button class="mini-btn mini-btn--solid" data-openrole="' + b.role + '">Open the path</button>' +
        '<button class="mini-btn" data-copylink="' + b.role + '">Copy link</button>' +
      '</div></div>';
  }).join('');

  /* ---------------- Tabs ---------------- */
  function setTab(name) {
    $all('.tab').forEach(function (t) { t.setAttribute('aria-selected', String(t.getAttribute('data-tab') === name)); });
    $all('.panel').forEach(function (p) { var on = p.id === name; p.classList.toggle('is-active', on); p.hidden = !on; });
    if (name === 'read' && window.ILReader) window.ILReader.ensure();
  }
  $all('.tab').forEach(function (t) { t.addEventListener('click', function () { setTab(t.getAttribute('data-tab')); }); });
  $all('[data-go]').forEach(function (b) {
    b.addEventListener('click', function () {
      setTab(b.getAttribute('data-go'));
      $('.nav').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------------- Global click handling ---------------- */
  document.addEventListener('click', function (e) {
    var pp = e.target.closest('.pagepill');
    if (pp) {
      setTab('read');
      window.ILReader.goTo(+pp.getAttribute('data-page'));
      $('.nav').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    var rc = e.target.closest('.rolecard[data-role]');
    if (rc && !rc.closest('#roledetail') ) { renderRole(rc.getAttribute('data-role')); return; }
    if (rc) { renderRole(rc.getAttribute('data-role')); return; }
    var or_ = e.target.closest('[data-openrole]');
    if (or_) {
      e.preventDefault();
      setTab('paths');
      renderRole(or_.getAttribute('data-openrole'));
      return;
    }
    var cl = e.target.closest('[data-copylink]');
    if (cl) {
      var url = location.origin + location.pathname + '#role=' + cl.getAttribute('data-copylink');
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () {
        var old = cl.textContent; cl.textContent = 'Copied ✓';
        setTimeout(function () { cl.textContent = old; }, 1400);
      });
      return;
    }
    var gb = e.target.closest('.gbbtn');
    if (gb) {
      state.band = gb.getAttribute('data-band');
      renderRole(state.role, { noScroll: true, openAll: true });
      return;
    }
    var sh = e.target.closest('.stage__head');
    if (sh) {
      var stg = sh.parentElement;
      var open = stg.classList.toggle('is-open');
      sh.setAttribute('aria-expanded', String(open));
    }
  });

  /* ---------------- Init ---------------- */
  renderRoleGrid();
  renderExplore('');
  var role = (/role=([\w-]+)/.exec(location.hash) || [])[1];
  var page = (/p=(\d+)/.exec(location.hash) || [])[1];
  if (role && roleById(role)) renderRole(role, { noScroll: true });
  if (page) { setTab('read'); window.addEventListener('load', function () { window.ILReader.goTo(+page); }); }
})();
