/* Illinois AI Guidance Companion — in-page PDF reader.
   Renders one page at a time from the locally hosted AIGuidance.pdf via PDF.js
   (loaded lazily from CDN the first time the reader is opened), so the
   408-page document stays fast on mobile. Falls back to a direct PDF link
   if PDF.js can't load. */
(function () {
  var D = window.IL_DATA;
  var PDFJS_VER = '3.11.174';
  var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + PDFJS_VER + '/';

  var state = { doc: null, page: 1, rendering: false, pending: null, started: false };
  var canvas = document.getElementById('pdfcanvas');
  var msg = document.getElementById('reader-msg');
  var stage = document.getElementById('reader-stage');
  var input = document.getElementById('pagenum');
  var openAt = document.getElementById('open-at-page');
  var total = D.meta.pageCount;
  document.getElementById('pagecount').textContent = total;

  function setMsg(html) { msg.innerHTML = html; msg.hidden = !html; }

  function fail() {
    canvas.hidden = true;
    setMsg('The in-page reader couldn’t load here. ' +
      '<a href="' + D.meta.pdfFile + '#page=' + state.page + '" target="_blank" rel="noopener">Open the guidance PDF directly</a> — ' +
      'it will land on p. ' + state.page + ' in most browsers.');
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function ensure() {
    if (state.started) return;
    state.started = true;
    setMsg('Loading the guidance…');
    loadScript(CDN + 'pdf.min.js').then(function () {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN + 'pdf.worker.min.js';
      return window.pdfjsLib.getDocument(D.meta.pdfFile).promise;
    }).then(function (doc) {
      state.doc = doc;
      total = doc.numPages;
      document.getElementById('pagecount').textContent = total;
      render(state.page);
    }).catch(fail);
  }

  function render(n) {
    n = Math.min(Math.max(1, n | 0 || 1), total);
    state.page = n;
    input.value = n;
    openAt.href = D.meta.pdfFile + '#page=' + n;
    document.getElementById('prevpage').disabled = n <= 1;
    document.getElementById('nextpage').disabled = n >= total;
    try { history.replaceState(null, '', '#p=' + n); } catch (_) {}
    if (!state.doc) return;
    if (state.rendering) { state.pending = n; return; }
    state.rendering = true;
    state.doc.getPage(n).then(function (page) {
      var maxW = Math.min(stage.clientWidth - 36, 860);
      var vp1 = page.getViewport({ scale: 1 });
      var scale = maxW / vp1.width;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var vp = page.getViewport({ scale: scale * dpr });
      canvas.width = vp.width; canvas.height = vp.height;
      canvas.style.width = (vp.width / dpr) + 'px';
      canvas.hidden = false;
      setMsg('');
      return page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    }).then(done, function () { state.rendering = false; fail(); });
    function done() {
      state.rendering = false;
      if (state.pending != null && state.pending !== state.page) {
        var p = state.pending; state.pending = null; render(p);
      } else { state.pending = null; }
    }
  }

  function goTo(n) { ensure(); render(n); }

  /* Route stops shown in the toolbar for the selected role */
  function setStops(stops) {
    var el = document.getElementById('reader-stops');
    if (!stops || !stops.length) { el.innerHTML = ''; return; }
    el.innerHTML = '<span>Your first pass:</span>' + stops.map(function (s) {
      return '<button type="button" class="pagepill" data-page="' + s.page + '" title="' +
        String(s.label).replace(/"/g, '&quot;') + '">' + s.page + '</button>';
    }).join('');
  }

  document.getElementById('prevpage').addEventListener('click', function () { goTo(state.page - 1); });
  document.getElementById('nextpage').addEventListener('click', function () { goTo(state.page + 1); });
  input.addEventListener('change', function () { goTo(+input.value); });
  document.addEventListener('keydown', function (e) {
    if (document.getElementById('read').hidden || e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') goTo(state.page - 1);
    if (e.key === 'ArrowRight') goTo(state.page + 1);
  });
  var resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { if (state.doc && !canvas.hidden) render(state.page); }, 200);
  });

  window.ILReader = { ensure: ensure, goTo: goTo, setStops: setStops };
})();
