/* Illinois AI Guidance Companion — in-page PDF reader.
   Shows exactly one page of the official document, so the reader sits inside
   the site instead of swallowing it: scroll past the page and the rest of the
   companion (your path, other routes) is right there. Route-aware — it knows
   which stop of your first pass you're in, and the path strip below the page
   moves you stop to stop. Position is saved and resumed between visits. */
(function () {
  var D = window.IL_DATA;
  var PDFJS_VER = '3.11.174';
  var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + PDFJS_VER + '/';
  var POS_KEY = 'il-reader-pos';

  var frame = document.getElementById('reader-frame');
  var input = document.getElementById('pagenum');
  var openAt = document.getElementById('open-at-page');
  var prevBtn = document.getElementById('prevpage');
  var nextBtn = document.getElementById('nextpage');
  var ptPrev = document.getElementById('pt-prev');
  var ptNext = document.getElementById('pt-next');
  var ptLabel = document.getElementById('pt-label');
  var routeEl = document.getElementById('reader-route');
  var routePos = document.getElementById('rr-pos');
  var routeLabel = document.getElementById('rr-label');
  var stopBtns = [document.getElementById('nextstop'), document.getElementById('nextstop2')];
  var strip = document.getElementById('pathstrip');
  var stripTitle = document.getElementById('ps-title');
  var stripList = document.getElementById('ps-list');
  var panel = document.getElementById('read');

  var total = D.meta.pageCount;
  document.getElementById('pagecount').textContent = total;

  var pdf = null, current = 1, started = false, stops = [];
  var explicitTarget = null, renderSeq = 0;

  function msg(html) { frame.innerHTML = '<div class="reader-msg">' + html + '</div>'; }

  function fail() {
    msg('The in-page reader couldn’t load here. ' +
      '<a href="view.html?page=' + current + '" target="_blank" rel="noopener">Open the full-document viewer</a> or ' +
      '<a href="' + D.meta.pdfFile + '" target="_blank" rel="noopener">the source PDF</a> instead.');
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
      goTo(explicitTarget || savedPage() || 1);
      explicitTarget = null;
    }).catch(fail);
  }

  function render(n) {
    if (!pdf) return;
    var seq = ++renderSeq;
    frame.classList.add('is-loading');
    pdf.getPage(n).then(function (page) {
      if (seq !== renderSeq) return;
      var vp1 = page.getViewport({ scale: 1 });
      frame.style.aspectRatio = vp1.width + ' / ' + vp1.height;
      var cssW = frame.clientWidth || 600;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var vp = page.getViewport({ scale: (cssW / vp1.width) * dpr });
      var canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
      return page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise.then(function () {
        if (seq !== renderSeq) return;
        frame.textContent = '';
        frame.appendChild(canvas);
        frame.classList.remove('is-loading');
      });
    }).catch(function () { if (seq === renderSeq) fail(); });
  }

  function goTo(n) {
    n = Math.min(Math.max(1, n | 0 || 1), total);
    current = n;
    if (document.activeElement !== input) input.value = n;
    ptLabel.textContent = 'Page ' + n + ' of ' + total;
    openAt.href = 'view.html?page=' + n;
    prevBtn.disabled = ptPrev.disabled = n <= 1;
    nextBtn.disabled = ptNext.disabled = n >= total;
    savePage(n);
    syncRoute();
    try { history.replaceState(null, '', '#p=' + n); } catch (_) {}
    if (!pdf) { explicitTarget = n; ensure(); return; }
    render(n);
  }

  /* ---------- Route awareness ---------- */
  function setStops(list, roleName) {
    stops = list || [];
    strip.dataset.roleName = roleName || '';
    syncRoute();
  }
  function stopIndex() {
    var idx = -1;
    for (var i = 0; i < stops.length; i++) if (stops[i].page <= current) idx = i;
    return idx;
  }
  function syncRoute() {
    var has = !!stops.length;
    routeEl.hidden = !has;
    strip.hidden = !has;
    if (!has) return;

    var idx = stopIndex();
    var next = idx < 0 ? stops[0] : stops[idx + 1];
    routePos.textContent = idx < 0 ? 'Your first pass' : 'Stop ' + (idx + 1) + ' of ' + stops.length;
    routeLabel.textContent = idx < 0 ? stops[0].label : stops[idx].label;
    stopBtns.forEach(function (b) {
      b.disabled = !next && idx >= 0;
      b.textContent = idx < 0 ? 'Start › p. ' + stops[0].page
        : next ? 'Next stop › p. ' + next.page
        : 'First pass done ✓';
    });

    stripTitle.textContent = (strip.dataset.roleName ? strip.dataset.roleName + ' — ' : '') + 'your first pass';
    stripList.innerHTML = stops.map(function (s, i) {
      var cls = i === idx ? ' is-current' : (i < idx ? ' is-past' : '');
      return '<li class="ps-stop' + cls + '">' +
        '<button type="button" class="ps-jump" data-page="' + s.page + '">' +
          '<span class="ps-n">' + (i + 1) + '</span>' +
          '<span class="ps-t">' + String(s.label).replace(/</g, '&lt;') + '</span>' +
          '<span class="ps-p">p. ' + s.page + '</span>' +
        '</button></li>';
    }).join('');
  }
  function advance() {
    var idx = stopIndex();
    var next = idx < 0 ? stops[0] : stops[idx + 1];
    if (next) { goTo(next.page); scrollToReader(); }
  }
  stopBtns.forEach(function (b) { b.addEventListener('click', advance); });
  stripList.addEventListener('click', function (e) {
    var b = e.target.closest('.ps-jump');
    if (b) { goTo(+b.getAttribute('data-page')); scrollToReader(); }
  });

  function scrollToReader() {
    document.querySelector('.reader-bar').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });
  ptPrev.addEventListener('click', function () { goTo(current - 1); });
  ptNext.addEventListener('click', function () { goTo(current + 1); });
  input.addEventListener('change', function () { goTo(+input.value); });
  document.addEventListener('keydown', function (e) {
    if (panel.hidden || e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  var resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { if (pdf && !panel.hidden) render(current); }, 250);
  });

  window.ILReader = { ensure: ensure, goTo: goTo, setStops: setStops };
  if (window.IL_routeStops) setStops(window.IL_routeStops.stops, window.IL_routeStops.roleName);
})();
