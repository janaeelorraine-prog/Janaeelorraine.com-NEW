// ═══════════════════════════════════════════════════════════
// SACRED SCRIPTURE BOOK OVERLAY
// window.openBook(lesson, module, opts)
// ═══════════════════════════════════════════════════════════
(function(){
  let currentLesson = null;
  let currentModule = null;
  let pages = [];           // array of HTML strings (one per page)
  let pageIdx = 0;          // index of LEFT page in current spread (desktop) / current page (mobile)
  let totalPages = 0;
  let isMobile = window.matchMedia('(max-width: 880px)').matches;
  let onComplete = null;    // callback when "mark complete" pressed
  let storageKey = '';      // for journal/highlights/bookmarks per lesson

  // ─── persisted state per lesson ───────────────────────────
  function loadState() {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch(e) { return {}; }
  }
  function saveState(s) {
    try { localStorage.setItem(storageKey, JSON.stringify(s)); } catch(e){}
  }

  // ═══════════════════════════════════════════════════════════
  // BUILD OVERLAY DOM (once)
  // ═══════════════════════════════════════════════════════════
  function buildOverlay() {
    if (document.getElementById('book-overlay')) return;
    const html = `
<div id="book-overlay" data-fontsize="m">
  <button id="bk-close" title="Close (Esc)">✕</button>
  <div id="bk-crumb">
    <span id="bk-crumb-mod">Module</span>
    <span class="bk-crumb-sep">·</span>
    <span id="bk-crumb-les">Lesson</span>
  </div>

  <div id="book-controls">
    <button class="bk-ctrl" id="bk-tab-toc" title="Table of Contents"><span class="bk-ctrl-icon">☰</span></button>
    <div class="bk-ctrl-divider"></div>
    <button class="bk-ctrl" id="bk-bookmark-btn" title="Bookmark this page"><span class="bk-ctrl-icon">⚑</span></button>
    <button class="bk-ctrl" id="bk-highlight-btn" title="Highlight selected text"><span class="bk-ctrl-icon">✦</span></button>
    <div class="bk-ctrl-divider"></div>
    <button class="bk-ctrl" id="bk-fs-down" title="Smaller text">A−</button>
    <button class="bk-ctrl" id="bk-fs-up" title="Larger text">A+</button>
    <div class="bk-ctrl-divider"></div>
    <button class="bk-ctrl" id="bk-tts" title="Read aloud"><span class="bk-ctrl-icon">♪</span></button>
    <div class="bk-ctrl-divider"></div>
    <button class="bk-ctrl" id="bk-journal-btn" title="Open journal"><span class="bk-ctrl-icon">✎</span></button>
  </div>

  <div id="book">
    <div class="bk-page-wrap left">
      <div class="bk-page left" id="bk-page-left">
        <div class="bk-corner bk-corner-tl"></div>
        <div class="bk-corner bk-corner-bl"></div>
        <div class="bk-page-inner" id="bk-content-left"></div>
      </div>
    </div>
    <div class="bk-page-wrap right">
      <div class="bk-page right" id="bk-page-right">
        <div class="bk-corner bk-corner-tr"></div>
        <div class="bk-corner bk-corner-br"></div>
        <div class="bk-bookmark" id="bk-bookmark-ribbon"></div>
        <div class="bk-page-inner" id="bk-content-right"></div>
      </div>
    </div>

    <button class="bk-nav-arrow" id="bk-prev" title="Previous page">◀</button>
    <button class="bk-nav-arrow" id="bk-next" title="Next page">▶</button>

    <!-- video pane (overlay, switched via tab) -->
    <div class="bk-video-pane" id="bk-video">
      <div class="bk-video-frame">
        <div class="bk-video-play"></div>
        <div class="bk-video-meta">
          <div class="bk-video-meta-title" id="bk-video-title">Video Teaching</div>
          <div class="bk-video-meta-sub" id="bk-video-sub">Tap to Play</div>
        </div>
      </div>
    </div>

    <div class="bk-tabs">
      <button class="bk-tab active" data-pane="read"><span class="bk-tab-icon">❦</span>Read</button>
      <button class="bk-tab" data-pane="video"><span class="bk-tab-icon">▶</span>Watch</button>
      <button class="bk-tab" data-pane="journal"><span class="bk-tab-icon">✎</span>Reflect</button>
    </div>
  </div>

  <div id="bk-progress">
    <span class="bk-prog-text" id="bk-prog-page">1 / 1</span>
    <div class="bk-prog-track"><div class="bk-prog-fill" id="bk-prog-fill" style="width:0%"></div></div>
    <button class="bk-ctrl" id="bk-complete" title="Mark this lesson complete">Mark Complete</button>
  </div>

  <!-- TOC modal -->
  <div id="bk-toc">
    <button class="bk-toc-close" id="bk-toc-close">✕</button>
    <div class="bk-toc-eyebrow">Table of Contents</div>
    <div class="bk-toc-title" id="bk-toc-title">Module</div>
    <div class="bk-toc-rule"></div>
    <div class="bk-toc-list" id="bk-toc-list"></div>
  </div>
</div>

<!-- Journal companion (sits outside book) -->
<div id="bk-journal">
  <div class="bk-j-head">
    <div class="bk-j-eyebrow">Companion</div>
    <div class="bk-j-title" id="bk-j-title">Journal & Highlights</div>
    <div class="bk-j-prompt" id="bk-j-prompt">What is rising for you in this teaching?</div>
  </div>
  <div class="bk-j-tabs">
    <button class="bk-j-tab active" data-jpane="write">✎ Write</button>
    <button class="bk-j-tab" data-jpane="highlights">✦ Highlights</button>
    <button class="bk-j-tab" data-jpane="notes">⌘ Notes</button>
  </div>
  <div class="bk-j-body">
    <div class="bk-j-pane show" data-jpane="write">
      <textarea class="bk-j-area" id="bk-j-area" placeholder="The page is yours. Speak to your ancestors."></textarea>
      <button class="bk-j-save" id="bk-j-save">Save Reflection</button>
      <div class="bk-j-saved" id="bk-j-saved">✦ Saved to your journal</div>
    </div>
    <div class="bk-j-pane" data-jpane="highlights">
      <div id="bk-h-list"></div>
    </div>
    <div class="bk-j-pane" data-jpane="notes">
      <div id="bk-n-list"></div>
    </div>
  </div>
</div>`;
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
    bindEvents();
  }

  // ═══════════════════════════════════════════════════════════
  // PAGINATE LESSON CONTENT INTO PAGES
  // ═══════════════════════════════════════════════════════════
  function buildPages(lesson, mod) {
    const pgs = [];

    // Page 1 — chapter title page
    pgs.push(`
      <div class="bk-page-eyebrow">Chapter · ${mod.num} · ${esc(mod.name)}</div>
      <div class="bk-chapter-title">${esc(lesson.name)}</div>
      <div class="bk-chapter-rule"></div>
      ${lesson.lead ? `<p class="lead">${lesson.lead}</p>` : `<p class="lead">${esc(lesson.prompt || 'Sit with what comes. The work is in the listening.')}</p>`}
      ${lesson.excerpt ? `<div class="bk-body"><p class="dropcap no-indent">${lesson.excerpt}</p></div>` : ''}
    `);

    // Pages 2..N — from lesson.pages array (array of HTML strings)
    if (Array.isArray(lesson.pages) && lesson.pages.length) {
      lesson.pages.forEach(p => {
        pgs.push(`<div class="bk-page-eyebrow">${esc(lesson.name)}</div><div class="bk-body">${p}</div>`);
      });
    } else {
      // fallback - generic placeholder pages
      pgs.push(`<div class="bk-page-eyebrow">${esc(lesson.name)}</div>
        <div class="bk-body">
          <p class="dropcap no-indent">This sacred page awaits Mama Janaee's teaching. In the live edition of <em>${esc(mod.name)}</em>, the full written lesson — drawn from oral tradition, scripture, and lived practice — will be inscribed here for you to read at your own pace, alongside the video teaching and your reflection page.</p>
          <div class="bk-quote">"${esc(lesson.prompt || 'The work is in the listening.')}"</div>
          <p>Use the controls above to bookmark this page, highlight passages that move you, adjust the type to your eyes, or have the page read aloud. Open the <strong>Reflect</strong> companion to journal as you read.</p>
        </div>
      `);
      pgs.push(`<div class="bk-page-eyebrow">${esc(lesson.name)}</div>
        <div class="bk-body">
          <h3>A Note for the Reader</h3>
          <p>You may move through this teaching in any order — read first, watch first, or write first. The book is yours. When you have sat with the lesson long enough that something has shifted, return to this overlay and press <strong>Mark Complete</strong>. Your progress is held in your journey log and visible only to you and to Mama Janaee.</p>
          <p>Each lesson includes <strong>recorded video</strong>, a <strong>written teaching</strong>, and a <strong>reflection prompt</strong>. Together, these are the three doorways. Pick the one that calls to you today.</p>
        </div>
      `);
    }

    // Final page — reflection / completion
    pgs.push(`
      <div class="bk-page-eyebrow">Closing</div>
      <h3 style="margin-top:40px;">Sit with What Comes</h3>
      <div class="bk-quote">"${esc(lesson.prompt || 'The work is in the listening.')}"</div>
      <div class="bk-body" style="text-align:center; margin-top:20px;">
        <p class="no-indent">When the page has loosened something in you — a memory, a knowing, a question — open the <strong>Reflect</strong> companion and let it travel to the page.</p>
        <p class="no-indent" style="margin-top:30px;color:#6a3a14;font-style:italic;">Àṣẹ.</p>
      </div>
    `);

    return pgs;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  // ═══════════════════════════════════════════════════════════
  // RENDER CURRENT SPREAD
  // ═══════════════════════════════════════════════════════════
  function render(direction) {
    isMobile = window.matchMedia('(max-width: 880px)').matches;
    const left = document.getElementById('bk-content-left');
    const right = document.getElementById('bk-content-right');
    const leftWrap = document.querySelector('.bk-page-wrap.left');

    if (isMobile) {
      // single page mode - show only right
      if (leftWrap) leftWrap.style.display = 'none';
      const pageHTML = pages[pageIdx] || '';
      right.innerHTML = pageHTML + pageFooter(pageIdx + 1);
    } else {
      if (leftWrap) leftWrap.style.display = '';
      const lp = pages[pageIdx] || '';
      const rp = pages[pageIdx + 1] || '';
      left.innerHTML = lp + pageFooter(pageIdx + 1);
      right.innerHTML = rp ? (rp + pageFooter(pageIdx + 2)) : '';
    }

    // progress
    const cur = isMobile ? (pageIdx + 1) : Math.min(pageIdx + 2, totalPages);
    document.getElementById('bk-prog-page').textContent = `${cur} / ${totalPages}`;
    const pct = totalPages > 1 ? (cur / totalPages) * 100 : 100;
    document.getElementById('bk-prog-fill').style.width = pct + '%';

    // arrows
    document.getElementById('bk-prev').classList.toggle('disabled', pageIdx === 0);
    const lastIdx = isMobile ? totalPages - 1 : Math.max(0, totalPages - 2);
    document.getElementById('bk-next').classList.toggle('disabled', pageIdx >= lastIdx);

    // bookmark ribbon
    const state = loadState();
    const isBookmarked = (state.bookmarks || []).includes(pageIdx);
    document.getElementById('bk-bookmark-ribbon').classList.toggle('show', isBookmarked);
    document.getElementById('bk-bookmark-btn').classList.toggle('active', isBookmarked);

    // re-apply highlights from state
    applyHighlights();
    refreshHighlightsList();
  }

  function pageFooter(num) {
    return `<div class="bk-page-foot">
      <span>~</span><span class="bk-page-foot-ornament">❦</span><span>${num}</span><span class="bk-page-foot-ornament">❦</span><span>~</span>
    </div>`;
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE FLIP ANIMATION
  // ═══════════════════════════════════════════════════════════
  function flipPage(dir) {
    // dir: 'next' or 'prev'
    const book = document.getElementById('book');
    const flipper = document.createElement('div');
    flipper.className = 'bk-flipper ' + (dir === 'next' ? 'from-right' : 'from-left');
    flipper.innerHTML = '<div class="bk-flipper-face front"></div><div class="bk-flipper-face back"></div>';
    book.appendChild(flipper);

    setTimeout(() => {
      if (dir === 'next') pageIdx += isMobile ? 1 : 2;
      else pageIdx -= isMobile ? 1 : 2;
      pageIdx = Math.max(0, pageIdx);
      render(dir);
      flipper.remove();
    }, 850);
  }

  function goNext() {
    const lastIdx = isMobile ? totalPages - 1 : Math.max(0, totalPages - 2);
    if (pageIdx >= lastIdx) return;
    flipPage('next');
  }
  function goPrev() {
    if (pageIdx === 0) return;
    flipPage('prev');
  }
  function goToPage(idx) {
    // round to even page (left page) on desktop
    if (!isMobile && idx % 2 === 1) idx -= 1;
    pageIdx = Math.max(0, Math.min(idx, totalPages - 1));
    render();
  }

  // ═══════════════════════════════════════════════════════════
  // HIGHLIGHTS
  // ═══════════════════════════════════════════════════════════
  function highlightSelection() {
    const sel = window.getSelection();
    if (!sel || !sel.toString().trim()) {
      flash('Select text first to highlight');
      return;
    }
    const text = sel.toString().trim();
    if (text.length < 3) return;
    const state = loadState();
    state.highlights = state.highlights || [];
    if (!state.highlights.find(h => h.text === text)) {
      state.highlights.push({ text, page: pageIdx, at: Date.now() });
      saveState(state);
    }
    sel.removeAllRanges();
    applyHighlights();
    refreshHighlightsList();
    flash('✦ Highlighted');
  }

  function applyHighlights() {
    const state = loadState();
    const hl = state.highlights || [];
    if (!hl.length) return;
    document.querySelectorAll('.bk-page-inner .bk-body').forEach(body => {
      hl.forEach(h => {
        const safeText = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp('(' + safeText + ')', 'g');
        // walk text nodes only to avoid breaking HTML
        walkText(body, node => {
          if (node.parentElement.classList.contains('bk-highlight')) return;
          if (re.test(node.nodeValue)) {
            const span = document.createElement('span');
            span.innerHTML = node.nodeValue.replace(re, '<span class="bk-highlight">$1</span>');
            node.replaceWith(...span.childNodes);
          }
        });
      });
    });
  }

  function walkText(root, fn) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n; while (n = walker.nextNode()) nodes.push(n);
    nodes.forEach(fn);
  }

  function refreshHighlightsList() {
    const list = document.getElementById('bk-h-list');
    if (!list) return;
    const state = loadState();
    const hl = state.highlights || [];
    if (!hl.length) {
      list.innerHTML = '<div class="bk-h-empty">No highlights yet. Select any passage and tap ✦ in the book to mark it.</div>';
      return;
    }
    list.innerHTML = hl.map((h, i) => `
      <div class="bk-h-item">
        <div class="bk-h-item-text">${esc(h.text)}</div>
        <div class="bk-h-item-meta">Page ${h.page + 1}</div>
        <button class="bk-h-item-del" data-i="${i}">✕</button>
      </div>
    `).join('');
    list.querySelectorAll('.bk-h-item-del').forEach(b => {
      b.onclick = e => {
        const i = +e.target.dataset.i;
        const s = loadState();
        s.highlights.splice(i, 1);
        saveState(s);
        refreshHighlightsList();
        applyHighlights();
      };
    });
  }

  // ═══════════════════════════════════════════════════════════
  // BOOKMARKS
  // ═══════════════════════════════════════════════════════════
  function toggleBookmark() {
    const state = loadState();
    state.bookmarks = state.bookmarks || [];
    const i = state.bookmarks.indexOf(pageIdx);
    if (i >= 0) state.bookmarks.splice(i, 1);
    else state.bookmarks.push(pageIdx);
    saveState(state);
    render();
    flash(i >= 0 ? 'Bookmark removed' : '⚑ Bookmarked');
  }

  // ═══════════════════════════════════════════════════════════
  // TTS
  // ═══════════════════════════════════════════════════════════
  let ttsActive = false; let ttsUtter = null;
  function toggleTTS() {
    const btn = document.getElementById('bk-tts');
    if (ttsActive) {
      window.speechSynthesis.cancel();
      ttsActive = false; btn.classList.remove('active');
      return;
    }
    const text = (document.getElementById('bk-content-left')?.innerText || '') +
                 ' ' + (document.getElementById('bk-content-right')?.innerText || '');
    if (!text.trim()) return;
    ttsUtter = new SpeechSynthesisUtterance(text);
    ttsUtter.rate = 0.92; ttsUtter.pitch = 1.0;
    ttsUtter.onend = () => { ttsActive = false; btn.classList.remove('active'); };
    ttsUtter.onerror = ttsUtter.onend;
    window.speechSynthesis.speak(ttsUtter);
    ttsActive = true; btn.classList.add('active');
  }

  // ═══════════════════════════════════════════════════════════
  // FONT SIZE
  // ═══════════════════════════════════════════════════════════
  const fontSizes = ['s','m','l','xl'];
  function adjustFont(delta) {
    const ov = document.getElementById('book-overlay');
    const cur = ov.dataset.fontsize || 'm';
    let i = fontSizes.indexOf(cur);
    i = Math.max(0, Math.min(fontSizes.length - 1, i + delta));
    ov.dataset.fontsize = fontSizes[i];
    try { localStorage.setItem('bk_fontsize', fontSizes[i]); } catch(e){}
  }

  // ═══════════════════════════════════════════════════════════
  // FLASH HELPER
  // ═══════════════════════════════════════════════════════════
  function flash(msg) {
    let f = document.getElementById('bk-flash');
    if (!f) {
      f = document.createElement('div');
      f.id = 'bk-flash';
      f.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(8,5,2,0.95);border:1px solid #c9a84c;color:#f1e8d0;padding:10px 18px;font-family:Cinzel,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;z-index:200;pointer-events:none;transition:opacity 0.3s;';
      document.body.appendChild(f);
    }
    f.textContent = msg;
    f.style.opacity = '1';
    clearTimeout(f._t);
    f._t = setTimeout(() => f.style.opacity = '0', 1800);
  }

  // ═══════════════════════════════════════════════════════════
  // TABS (Read / Watch / Reflect)
  // ═══════════════════════════════════════════════════════════
  function switchPane(name) {
    document.querySelectorAll('.bk-tab').forEach(t => t.classList.toggle('active', t.dataset.pane === name));
    const video = document.getElementById('bk-video');
    if (name === 'video') video.classList.add('show');
    else video.classList.remove('show');
    if (name === 'journal') {
      document.getElementById('bk-journal').classList.add('show');
    }
  }

  function switchJPane(name) {
    document.querySelectorAll('.bk-j-tab').forEach(t => t.classList.toggle('active', t.dataset.jpane === name));
    document.querySelectorAll('.bk-j-pane').forEach(p => p.classList.toggle('show', p.dataset.jpane === name));
    if (name === 'highlights') refreshHighlightsList();
    if (name === 'notes') refreshNotesList();
  }

  function refreshNotesList() {
    const list = document.getElementById('bk-n-list');
    if (!list) return;
    const state = loadState();
    const notes = state.notes || [];
    if (!notes.length) {
      list.innerHTML = '<div class="bk-h-empty">No margin notes yet. (Coming soon — long-press a paragraph in the book to attach a note.)</div>';
      return;
    }
    list.innerHTML = notes.map(n => `
      <div class="bk-h-item">
        <div class="bk-h-item-text">${esc(n.text)}</div>
        <div class="bk-h-item-meta">Page ${n.page + 1}</div>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════════════════════
  // TOC
  // ═══════════════════════════════════════════════════════════
  function showTOC() {
    const toc = document.getElementById('bk-toc');
    document.getElementById('bk-toc-title').textContent = currentModule.name;
    const list = document.getElementById('bk-toc-list');
    list.innerHTML = currentModule.lessons.map((l, i) => `
      <div class="bk-toc-item${l.id === currentLesson.id ? ' current' : ''}" data-id="${l.id}">
        <div class="bk-toc-num">${String(i+1).padStart(2,'0')}</div>
        <div class="bk-toc-name">${esc(l.name)}</div>
        <div class="bk-toc-pages">${esc(l.time || '')}</div>
      </div>
    `).join('');
    list.querySelectorAll('.bk-toc-item').forEach(it => {
      it.onclick = () => {
        const id = it.dataset.id;
        const lesson = currentModule.lessons.find(x => x.id === id);
        if (lesson) {
          toc.classList.remove('show');
          window.openBook(lesson, currentModule, { onComplete });
        }
      };
    });
    toc.classList.add('show');
  }

  // ═══════════════════════════════════════════════════════════
  // JOURNAL SAVE
  // ═══════════════════════════════════════════════════════════
  function saveJournal() {
    const state = loadState();
    state.journal = document.getElementById('bk-j-area').value;
    state.journal_at = Date.now();
    saveState(state);
    const saved = document.getElementById('bk-j-saved');
    saved.classList.add('show');
    setTimeout(() => saved.classList.remove('show'), 2200);
    // also bridge to existing per-module journal storage if foundations.html uses it
    try {
      const sharedKey = 'ntas98_journal_' + currentModule.id + '_' + currentLesson.id;
      localStorage.setItem(sharedKey, state.journal || '');
    } catch(e){}
    // sync to Supabase via course-app's exposed helper
    try {
      if (window.__ntasCourseSync && window.__ntasCourseSync.saveJournalToServer) {
        window.__ntasCourseSync.saveJournalToServer(currentModule.id, currentLesson.id, state.journal);
      }
    } catch(e){}
  }

  // ═══════════════════════════════════════════════════════════
  // BIND EVENTS (once)
  // ═══════════════════════════════════════════════════════════
  function bindEvents() {
    document.getElementById('bk-close').onclick = closeBook;
    document.getElementById('bk-prev').onclick = goPrev;
    document.getElementById('bk-next').onclick = goNext;
    document.getElementById('bk-bookmark-btn').onclick = toggleBookmark;
    document.getElementById('bk-highlight-btn').onclick = highlightSelection;
    document.getElementById('bk-fs-up').onclick = () => adjustFont(1);
    document.getElementById('bk-fs-down').onclick = () => adjustFont(-1);
    document.getElementById('bk-tts').onclick = toggleTTS;
    document.getElementById('bk-journal-btn').onclick = () => {
      const j = document.getElementById('bk-journal');
      j.classList.toggle('show');
    };
    document.getElementById('bk-tab-toc').onclick = showTOC;
    document.getElementById('bk-toc-close').onclick = () => document.getElementById('bk-toc').classList.remove('show');
    document.getElementById('bk-complete').onclick = () => {
      if (typeof onComplete === 'function') onComplete(currentLesson);
      const btn = document.getElementById('bk-complete');
      btn.textContent = '✓ Completed';
      btn.classList.add('active');
      flash('✓ Lesson Complete');
    };
    document.getElementById('bk-j-save').onclick = saveJournal;

    document.querySelectorAll('.bk-tab').forEach(t => {
      t.onclick = () => switchPane(t.dataset.pane);
    });
    document.querySelectorAll('.bk-j-tab').forEach(t => {
      t.onclick = () => switchJPane(t.dataset.jpane);
    });

    // keyboard
    document.addEventListener('keydown', e => {
      if (!document.getElementById('book-overlay').classList.contains('show')) return;
      if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === 'Escape') closeBook();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    });

    // restore font size
    try {
      const fs = localStorage.getItem('bk_fontsize');
      if (fs && fontSizes.includes(fs)) document.getElementById('book-overlay').dataset.fontsize = fs;
    } catch(e){}

    // resize
    window.addEventListener('resize', () => {
      const wasMobile = isMobile;
      isMobile = window.matchMedia('(max-width: 880px)').matches;
      if (wasMobile !== isMobile) render();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // OPEN / CLOSE
  // ═══════════════════════════════════════════════════════════
  function closeBook() {
    document.getElementById('book-overlay').classList.remove('show');
    document.getElementById('bk-journal').classList.remove('show');
    if (ttsActive) { window.speechSynthesis.cancel(); ttsActive = false; }
  }

  window.openBook = function(lesson, mod, opts) {
    buildOverlay();
    currentLesson = lesson;
    currentModule = mod;
    onComplete = opts && opts.onComplete;
    storageKey = 'bk_' + mod.id + '_' + lesson.id;

    pages = buildPages(lesson, mod);
    totalPages = pages.length;
    pageIdx = 0;

    // breadcrumb
    document.getElementById('bk-crumb-mod').textContent = `Module ${mod.num} · ${mod.name}`;
    document.getElementById('bk-crumb-les').textContent = lesson.name;

    // video
    document.getElementById('bk-video-title').textContent = lesson.name;
    document.getElementById('bk-video-sub').textContent = (lesson.time || '12 min') + ' · Tap to Play';

    // journal
    const state = loadState();
    document.getElementById('bk-j-area').value = state.journal || '';
    document.getElementById('bk-j-prompt').textContent = lesson.prompt || 'What is rising for you in this teaching?';
    document.getElementById('bk-j-title').textContent = 'Reflection · ' + lesson.name;

    // hydrate journal from Supabase (overrides local if server has newer copy)
    if (window.__ntasCourseSync && window.__ntasCourseSync.userEmail) {
      const sync = window.__ntasCourseSync;
      fetch('/.netlify/functions/journal-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'load',
          userEmail: sync.userEmail,
          courseId: sync.courseId,
          moduleId: mod.id,
          lessonId: lesson.id
        })
      }).then(r => r.json()).then(j => {
        if (j && j.success && j.entry && j.entry !== state.journal) {
          // Server has content the local copy doesn't — hydrate
          document.getElementById('bk-j-area').value = j.entry;
          const s = loadState();
          s.journal = j.entry; saveState(s);
        }
      }).catch(()=>{});
    }

    // complete state
    const completeBtn = document.getElementById('bk-complete');
    if (opts && opts.completed) {
      completeBtn.textContent = '✓ Completed';
      completeBtn.classList.add('active');
    } else {
      completeBtn.textContent = 'Mark Complete';
      completeBtn.classList.remove('active');
    }

    // reset to read pane
    switchPane('read');
    document.getElementById('bk-journal').classList.remove('show');
    document.getElementById('bk-toc').classList.remove('show');
    document.getElementById('book-overlay').classList.add('show');

    render();
  };
})();
