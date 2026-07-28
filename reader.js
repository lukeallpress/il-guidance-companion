/* Illinois AI Guidance Companion — in-page PDF reader.
   Continuous scroll with lazy per-page rendering (PDF.js from CDN, loaded on
   first open), so reading flows without page-button presses. Knows the
   selected role's path: shows which stop you're in, offers "Next stop", and
   resumes at your last position between visits. */
(function () {
  var D = window.IL_DATA;
  var PDFJS_VER = '3.11.174';
  var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + PDFJS_VER + '/';
  var POS_KEY = 'il-reader-pos';

  var pagesEl = document.getElementById('reader-pages');
  var input = document.getElementById('pagenum');
  var openAt = document.getElementById('open-at-page');
  var prevBtn = document.getElementById('prevpage');
  var nextBtn = document.getElementById('nextpage');
  var routeEl = document.getElementById('reader-route');
  var routePos = document.getElementById('rr-pos');
  var routeLabel = document.getElementById('rr-label');
  var stopBtn = document.getElementById('nextstop');
  var panel = document.getElementById('read');

  var total = D.meta.pageCount;
  document.getElementById('pagecount').textContent = total;

  var pdf = null, slots = [], current = 1, started = false;
  var stops = [], explicitTarget = null, suppressSync = false;

  function msg(html) { pagesEl.innerHTML = '<div class="reader-msg">' + html + '</div>'; }

  function fail() {
    msg('The in-page reader couldn’t load here. ' +
      '<a href="' + D.meta.pdfFile + '" target="_blank" rel="noopener">Open the source PDF</a> instead.');
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function savedPage() {
    try {
      var v = JSON.parse(localStorage.getItem(POS_KEY) || 'null');
      return v && v.page >= 1 && v.page <= total ? v.page : null;
    } catch (_) { return null; }
  }
  function savePage(n) {
    try { localStorage.setItem(POS_KEY, JSON.stringify({ page: n, ts: Date.now() })); } catch (_) {}
  }

  function ensure() {
    if (started) return;
    started = true;
    msg('Loading the guidance…');
    loadScript(CDN + 'pdf.min.js').then(function () {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN + 'pdf.worker.min.js';
      return window.pdfjsLib.getDocument(D.meta.pdfFile).promise;
    }).then(function (doc) {
      pdf = doc;
      total = doc.numPages;
      document.getElementById('pagecount').textContent = total;
      build();
      var start = explicitTarget || savedPage() || 1;
      explicitTarget = null;
      render(start);
      goTo(start, false);
    }).catch(fail);
  }

  function build() {
    pagesEl.innerHTML = '';
    slots = [];
    var frag = document.createDocumentFragment();
    for (var i = 1; i <= total; i++) {
      var d = document.createElement('div');
      d.className = 'rpg';
      d.setAttribute('data-page', i);
      frag.appendChild(d);
      slots.push({ el: d, state: 'idle', task: null });
    }
    pagesEl.appendChild(frag);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var n = +e.target.getAttribute('data-page');
        if (e.isIntersecting) render(n); else unload(n);
      });
    }, { rootMargin: '150% 0px', threshold: 0 });
    slots.forEach(function (s) { io.observe(s.el); });
  }

  function pageWidth() {
    return Math.max(280, Math.min(pagesEl.clientWidth - 36, 860));
  }

  function render(n) {
    var s = slots[n - 1];
    if (!s || s.state !== 'idle' || !pdf) return;
    s.state = 'loading';
    pdf.getPage(n).then(function (page) {
      if (s.state !== 'loading') return;
      var vp1 = page.getViewport({ scale: 1 });
      s.el.style.aspectRatio = vp1.width + ' / ' + vp1.height;
      var cssW = s.el.clientWidth || pageWidth();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var vp = page.getViewport({ scale: (cssW / vp1.width) * dpr });
      var canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
      s.task = page.render({ canvasContext: canvas.getContext('2d'), viewport: vp });
      return s.task.promise.then(function () {
        s.task = null;
        if (s.state !== 'loading') return;
        s.el.textContent = '';
        s.el.appendChild(canvas);
        s.el.classList.add('is-done');
        s.state = 'done';
      });
    }).catch(function () { if (s.state === 'loading') s.state = 'idle'; });
  }

  function unload(n) {
    var s = slots[n - 1];
    if (!s || s.state === 'idle') return;
    if (s.task) { try { s.task.cancel(); } catch (_) {} s.task = null; }
    s.el.textContent = '';
    s.el.classList.remove('is-done');
    s.state = 'idle';
  }

  /* Long jumps go instantly (smooth-scrolling across tens of thousands of
     pixels animates through dozens of pages); only near moves are smooth. */
  function instantScroll(el) {
    var h = document.documentElement, prev = h.style.scrollBehavior;
    h.style.scrollBehavior = 'auto';
    el.scrollIntoView({ block: 'start' });
    h.style.scrollBehavior = prev;
  }

  function goTo(n, smooth) {
    n = Math.min(Math.max(1, n | 0 || 1), total);
    if (!pdf) { explicitTarget = n; ensure(); setCurrent(n); return; }
    var near = Math.abs(n - current) <= 2 && smooth !== false;
    setCurrent(n);
    /* Render the target eagerly — the observer catches up for the rest */
    render(n); if (n > 1) render(n - 1); if (n < total) render(n + 1);
    suppressSync = true;
    if (near) slots[n - 1].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else instantScroll(slots[n - 1].el);
    setTimeout(function () { suppressSync = false; }, near ? 700 : 150);
  }

  function setCurrent(n) {
    current = n;
    if (document.activeElement !== input) input.value = n;
    openAt.href = 'view.html?page=' + n;
    prevBtn.disabled = n <= 1;
    nextBtn.disabled = n >= total;
    savePage(n);
    syncRoute();
    try { history.replaceState(null, '', '#p=' + n); } catch (_) {}
  }

  /* ---------- Route awareness ---------- */
  function setStops(list) {
    stops = list || [];
    syncRoute();
  }
  function stopIndex() {
    var idx = -1;
    for (var i = 0; i < stops.length; i++) if (stops[i].page <= current) idx = i;
    return idx;
  }
  function syncRoute() {
    if (!stops.length) { routeEl.hidden = true; return; }
    routeEl.hidden = false;
    var idx = stopIndex();
    if (idx < 0) {
      routePos.textContent = 'Your first pass';
      routeLabel.textContent = stops[0].label;
      stopBtn.disabled = false;
      stopBtn.textContent = 'Start › p. ' + stops[0].page;
    } else {
      routePos.textContent = 'Stop ' + (idx + 1) + ' of ' + stops.length;
      routeLabel.textContent = stops[idx].label;
      var next = stops[idx + 1];
      stopBtn.disabled = !next;
      stopBtn.textContent = next ? 'Next stop › p. ' + next.page : 'First pass done ✓';
    }
  }
  stopBtn.addEventListener('click', function () {
    var idx = stopIndex();
    var next = idx < 0 ? stops[0] : stops[idx + 1];
    if (next) goTo(next.page);
  });

  /* ---------- Scroll position → current page ---------- */
  var scrollT;
  window.addEventListener('scroll', function () {
    if (suppressSync || panel.hidden || !pdf) return;
    clearTimeout(scrollT);
    scrollT = setTimeout(function () {
      var best = current, bestDist = Infinity;
      for (var i = 0; i < slots.length; i++) {
        var r = slots[i].el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        var dist = Math.abs(r.top - 110);
        if (dist < bestDist) { bestDist = dist; best = i + 1; }
      }
      if (best !== current) setCurrent(best);
    }, 90);
  }, { passive: true });

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });
  input.addEventListener('change', function () { goTo(+input.value); });

  var resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      if (!pdf || panel.hidden) return;
      for (var i = 0; i < slots.length; i++) if (slots[i].state !== 'idle') unload(i + 1);
      goTo(current, false);
    }, 250);
  });

  window.ILReader = { ensure: ensure, goTo: goTo, setStops: setStops };
  if (window.IL_routeStops) setStops(window.IL_routeStops);
})();
