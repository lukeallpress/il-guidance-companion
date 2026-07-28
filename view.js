/* Full-document viewer for the ISBE Artificial Intelligence Guidance.
   Continuous scroll with lazy per-page rendering via PDF.js, so opening
   "p. 144" in a new tab always shows the page — even on managed browsers
   configured to download PDFs instead of displaying them. */
(function () {
  var PDF_FILE = 'AIGuidance.pdf';
  var PDFJS_VER = '3.11.174';
  var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/' + PDFJS_VER + '/';

  var docEl = document.getElementById('doc');
  var input = document.getElementById('pageinput');
  var totalEl = document.getElementById('total');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');

  var pdf = null, slots = [], total = 0, current = 1;
  var zoom = 1, observer = null, suppressScrollSync = false;

  function targetPage() {
    var m = /[?&]page=(\d+)/.exec(location.search) || /#p=(\d+)/.exec(location.hash);
    return m ? +m[1] : 1;
  }

  function baseWidth() {
    var avail = docEl.clientWidth - 24;
    return Math.max(280, Math.min(avail, 900));
  }
  function applyWidth() {
    docEl.style.setProperty('--pgw', Math.round(baseWidth() * zoom) + 'px');
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function fail() {
    docEl.innerHTML = '<div class="fallback">This viewer could not load. ' +
      'You can still <a href="' + PDF_FILE + '" target="_blank" rel="noopener">open the source PDF</a> ' +
      'or <a href="index.html">return to the reading paths</a>.</div>';
  }

  function build() {
    var frag = document.createDocumentFragment();
    for (var i = 1; i <= total; i++) {
      var d = document.createElement('div');
      d.className = 'pg';
      d.setAttribute('data-page', i);
      frag.appendChild(d);
      slots.push({ el: d, state: 'idle', task: null });
    }
    docEl.appendChild(frag);

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var n = +e.target.getAttribute('data-page');
        if (e.isIntersecting) render(n);
        else unload(n);
      });
    }, { root: null, rootMargin: '150% 0px', threshold: 0 });

    slots.forEach(function (s) { observer.observe(s.el); });
  }

  function render(n) {
    var s = slots[n - 1];
    if (!s || s.state !== 'idle') return;
    s.state = 'loading';
    pdf.getPage(n).then(function (page) {
      if (s.state !== 'loading') return;
      var vp1 = page.getViewport({ scale: 1 });
      s.el.style.aspectRatio = vp1.width + ' / ' + vp1.height;
      var cssW = s.el.clientWidth || baseWidth() * zoom;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var vp = page.getViewport({ scale: (cssW / vp1.width) * dpr });
      var canvas = document.createElement('canvas');
      canvas.width = vp.width;
      canvas.height = vp.height;
      s.task = page.render({ canvasContext: canvas.getContext('2d'), viewport: vp });
      return s.task.promise.then(function () {
        s.task = null;
        if (s.state !== 'loading') return;
        s.el.textContent = '';
        s.el.appendChild(canvas);
        s.el.classList.add('is-done');
        s.state = 'done';
      });
    }).catch(function () {
      if (s.state === 'loading') s.state = 'idle';
    });
  }

  function unload(n) {
    var s = slots[n - 1];
    if (!s || s.state === 'idle') return;
    if (s.task) { try { s.task.cancel(); } catch (_) {} s.task = null; }
    s.el.textContent = '';
    s.el.classList.remove('is-done');
    s.state = 'idle';
  }

  function goTo(n, smooth) {
    n = Math.min(Math.max(1, n | 0 || 1), total);
    var near = smooth !== false && Math.abs(n - current) <= 2;
    current = n;
    syncBar();
    render(n); if (n > 1) render(n - 1); if (n < total) render(n + 1);
    suppressScrollSync = true;
    slots[n - 1].el.scrollIntoView({ behavior: near ? 'smooth' : 'instant', block: 'start' });
    setTimeout(function () { suppressScrollSync = false; }, near ? 700 : 120);
    try { history.replaceState(null, '', '#p=' + n); } catch (_) {}
  }

  function syncBar() {
    if (document.activeElement !== input) input.value = current;
    prevBtn.disabled = current <= 1;
    nextBtn.disabled = current >= total;
  }

  /* Track which page is under the top of the viewport while scrolling */
  var scrollT;
  window.addEventListener('scroll', function () {
    if (suppressScrollSync) return;
    clearTimeout(scrollT);
    scrollT = setTimeout(function () {
      var probe = 100, best = current, bestDist = Infinity;
      slots.forEach(function (s, i) {
        var r = s.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var dist = Math.abs(r.top - probe);
        if (dist < bestDist) { bestDist = dist; best = i + 1; }
      });
      if (best !== current) { current = best; syncBar();
        try { history.replaceState(null, '', '#p=' + best); } catch (_) {} }
    }, 90);
  }, { passive: true });

  /* Re-render at the new size when zoom or viewport changes */
  function reflow() {
    applyWidth();
    slots.forEach(function (s, i) {
      if (s.state !== 'idle') { unload(i + 1); }
    });
    var r = slots[current - 1].el.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) goTo(current);
    slots.forEach(function (s, i) {
      var b = s.el.getBoundingClientRect();
      if (b.bottom > -window.innerHeight && b.top < window.innerHeight * 2) render(i + 1);
    });
  }

  document.getElementById('zoomin').addEventListener('click', function () {
    zoom = Math.min(zoom * 1.25, 3); reflow();
  });
  document.getElementById('zoomout').addEventListener('click', function () {
    zoom = Math.max(zoom / 1.25, 0.5); reflow();
  });
  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });
  input.addEventListener('change', function () { goTo(+input.value); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { goTo(+input.value); input.blur(); } });

  document.addEventListener('keydown', function (e) {
    if (e.target === input) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goTo(current + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'Home') { e.preventDefault(); goTo(1); }
    if (e.key === 'End') { e.preventDefault(); goTo(total); }
  });

  var resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(reflow, 250);
  });

  /* ---------- Boot ---------- */
  applyWidth();
  loadScript(CDN + 'pdf.min.js').then(function () {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN + 'pdf.worker.min.js';
    return window.pdfjsLib.getDocument(PDF_FILE).promise;
  }).then(function (doc) {
    pdf = doc;
    total = doc.numPages;
    totalEl.textContent = total;
    build();
    var start = targetPage();
    render(start);
    goTo(start);
  }).catch(fail);
})();
