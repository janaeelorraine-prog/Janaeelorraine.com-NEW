// ═══════════════════════════════════════════════════════════════
// COURSE QUIZ ENGINE
//   • Renders MC / TF / Fill / Match questions
//   • 80% pass gate
//   • Retake-after-reread flow
//   • Persists to Supabase via window.saveQuizResult (course-app.js)
//   • Falls back to localStorage if offline
// ═══════════════════════════════════════════════════════════════
(function(){
  let currentQuiz = null;       // { title, subtitle?, questions, passThreshold }
  let currentScope = null;      // 'lesson:l1' | 'exam:cosmology'
  let currentLesson = null;
  let currentModule = null;
  let onPassCallback = null;
  let answers = [];             // per-question response
  let qIndex = 0;

  // ─── INJECT CSS ──────────────────────────────────────────────
  if (!document.querySelector('link[href="course-quiz.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = 'course-quiz.css?v=2';
    document.head.appendChild(link);
  }

  // ─── BUILD OVERLAY DOM ───────────────────────────────────────
  function ensureOverlay() {
    if (document.getElementById('quiz-overlay')) return;
    const div = document.createElement('div');
    div.id = 'quiz-overlay';
    div.innerHTML = `
      <button class="qz-close" id="qz-close" title="Close (Esc)">✕</button>
      <div class="qz-shell" id="qz-shell"></div>
    `;
    document.body.appendChild(div);
    document.getElementById('qz-close').onclick = closeQuiz;
    document.addEventListener('keydown', (e) => {
      if (!div.classList.contains('show')) return;
      if (e.key === 'Escape') closeQuiz();
    });
  }

  function closeQuiz() {
    const ov = document.getElementById('quiz-overlay');
    if (ov) ov.classList.remove('show');
  }

  // ─── PUBLIC ENTRY POINTS ─────────────────────────────────────

  // ─── MODULE → QUIZ-BANK DISPATCHER ───────────────────────────
  // Maps module.id to its quiz bank object on window. Add a new
  // entry here when a new module's quiz file ships.
  const MODULE_QUIZ_BANKS = {
    'cosmology': () => window.MODULE_1_QUIZZES,
    'ancestry':  () => window.MODULE_2_QUIZZES,
    'orisha':    () => window.MODULE_3_QUIZZES,
    'divination':() => window.MODULE_4_QUIZZES,
    'ritual':    () => window.MODULE_5_QUIZZES,
    'herbology': () => window.MODULE_6_QUIZZES,
    'diaspora':  () => window.MODULE_7_QUIZZES,
  };

  function getBankFor(moduleObj) {
    const fn = MODULE_QUIZ_BANKS[moduleObj.id];
    return fn ? fn() : null;
  }

  // Open per-lesson check-in. Returns true if the quiz exists for this lesson.
  window.openLessonQuiz = function(moduleObj, lessonObj, opts) {
    const bankRoot = getBankFor(moduleObj);
    if (!bankRoot) return false;
    const bank = bankRoot.lessons || {};
    const quiz = bank[lessonObj.id];
    if (!quiz) return false;
    currentQuiz = quiz;
    currentScope = 'lesson:' + lessonObj.id;
    currentLesson = lessonObj;
    currentModule = moduleObj;
    onPassCallback = (opts && opts.onPass) || null;
    startQuiz();
    return true;
  };

  // Open end-of-module exam.
  window.openModuleExam = function(moduleObj, opts) {
    const bankRoot = getBankFor(moduleObj);
    if (!bankRoot) return false;
    const exam = bankRoot.exam;
    if (!exam) return false;
    currentQuiz = exam;
    currentScope = 'exam:' + moduleObj.id;
    currentLesson = null;
    currentModule = moduleObj;
    onPassCallback = (opts && opts.onPass) || null;
    startQuiz();
    return true;
  };

  // ─── START / RESET ───────────────────────────────────────────
  function startQuiz() {
    ensureOverlay();
    answers = currentQuiz.questions.map(() => null);
    qIndex = 0;
    renderShell();
    document.getElementById('quiz-overlay').classList.add('show');
    document.getElementById('quiz-overlay').scrollTop = 0;
  }

  function renderShell() {
    const shell = document.getElementById('qz-shell');
    const total = currentQuiz.questions.length;
    const answered = answers.filter(a => a && a.submitted).length;
    const pct = Math.round((answered/total)*100);

    const eyebrow = currentScope.startsWith('exam:') ? 'End-of-Module Exam' : 'Lesson Check-In';
    const subtitleHtml = currentQuiz.subtitle
      ? `<p class="qz-subtitle">${currentQuiz.subtitle}</p>` : '';

    shell.innerHTML = `
      <div class="qz-eyebrow">${eyebrow}</div>
      <h1 class="qz-title">${currentQuiz.title}</h1>
      ${subtitleHtml}
      <div class="qz-progress"><div class="qz-progress-fill" style="width:${pct}%"></div></div>
      <div id="qz-questions"></div>
      <div id="qz-result-mount"></div>
    `;
    renderAllQuestions();
  }

  function renderAllQuestions() {
    const mount = document.getElementById('qz-questions');
    mount.innerHTML = '';
    currentQuiz.questions.forEach((q, i) => {
      mount.appendChild(renderQuestion(q, i));
    });
  }

  // ─── RENDER A SINGLE QUESTION CARD ───────────────────────────
  function renderQuestion(q, i) {
    const card = document.createElement('div');
    card.className = 'qz-card';
    card.dataset.qindex = i;

    const num = `<div class="qz-qnum">Question ${i+1} of ${currentQuiz.questions.length}</div>`;
    const qHtml = `<div class="qz-q">${q.q}</div>`;

    let body = '';
    if (q.type === 'mc') {
      body = renderMC(q, i);
    } else if (q.type === 'tf') {
      body = renderTF(q, i);
    } else if (q.type === 'fill') {
      body = renderFill(q, i);
    } else if (q.type === 'match') {
      body = renderMatch(q, i);
    }

    card.innerHTML = num + qHtml + body +
      `<div class="qz-rationale" data-rationale="${i}"><strong>Note:</strong> ${q.rationale || ''}</div>` +
      `<div class="qz-actions"><button class="qz-btn" data-submit="${i}">Submit</button></div>`;

    // Bind handlers after innerHTML
    setTimeout(() => bindQuestion(card, q, i), 0);
    return card;
  }

  function renderMC(q, i) {
    const letters = ['A','B','C','D','E','F'];
    return `<div class="qz-choices">
      ${q.choices.map((c, ci) =>
        `<button class="qz-choice" data-ci="${ci}">
           <span class="qz-bullet">${letters[ci]}</span>
           <span>${c}</span>
         </button>`
      ).join('')}
    </div>`;
  }

  function renderTF(q, i) {
    return `<div class="qz-tf-row">
      <button class="qz-choice" data-ci="1">
        <span class="qz-bullet">T</span><span>True</span>
      </button>
      <button class="qz-choice" data-ci="0">
        <span class="qz-bullet">F</span><span>False</span>
      </button>
    </div>`;
  }

  function renderFill(q, i) {
    return `<input type="text" class="qz-fill-input" data-fill="${i}" placeholder="Type your answer..." autocomplete="off"/>`;
  }

  function renderMatch(q, i) {
    // Left column = fixed term order. Right column = shuffled definitions.
    const lefts = q.pairs.map(p => p[0]);
    const rights = q.pairs.map((p, idx) => ({ text: p[1], correctIdx: idx }));
    // Stable shuffle by hash of question index so users see same shuffle on retry
    const shuffled = rights.slice().sort((a,b) => ((a.correctIdx*7 + i*3) % 11) - ((b.correctIdx*7 + i*3) % 11));
    return `
      <div class="qz-match-grid">
        <div>
          <div class="qz-match-col-label">Term</div>
          ${lefts.map((t, li) =>
            `<div class="qz-match-item" data-side="L" data-li="${li}">${t}</div>`
          ).join('')}
        </div>
        <div>
          <div class="qz-match-col-label">Description</div>
          ${shuffled.map((r) =>
            `<div class="qz-match-item" data-side="R" data-correct="${r.correctIdx}">${r.text}</div>`
          ).join('')}
        </div>
      </div>
    `;
  }

  // ─── BIND HANDLERS PER QUESTION ──────────────────────────────
  function bindQuestion(card, q, i) {
    const submitBtn = card.querySelector(`[data-submit="${i}"]`);

    if (q.type === 'mc' || q.type === 'tf') {
      const choices = card.querySelectorAll('.qz-choice');
      let selected = null;
      choices.forEach(el => {
        el.onclick = () => {
          if (el.classList.contains('locked')) return;
          choices.forEach(c => c.classList.remove('selected'));
          el.classList.add('selected');
          selected = parseInt(el.dataset.ci, 10);
          answers[i] = { type:q.type, value:selected, submitted:false };
        };
      });
      submitBtn.onclick = () => {
        if (selected == null) { flashBtn(submitBtn,'Select an answer'); return; }
        const correct = (selected === q.answer);
        choices.forEach(c => {
          c.classList.add('locked');
          const ci = parseInt(c.dataset.ci,10);
          if (ci === q.answer) c.classList.add('correct');
          else if (ci === selected) c.classList.add('incorrect');
        });
        answers[i] = { type:q.type, value:selected, correct, submitted:true };
        showRationale(i);
        submitBtn.disabled = true;
        afterAnswer();
      };
    }
    else if (q.type === 'fill') {
      const input = card.querySelector(`[data-fill="${i}"]`);
      input.oninput = () => {
        answers[i] = { type:'fill', value:input.value, submitted:false };
      };
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitBtn.click();
      });
      submitBtn.onclick = () => {
        const val = (input.value || '').trim();
        if (!val) { flashBtn(submitBtn,'Type an answer'); return; }
        const norm = val.toLowerCase().replace(/[\s\-_]/g,'').replace(/[ạáàảãâầấẩẫậăằắẳẵặ]/g,'a').replace(/[ẹéèẻẽêềếểễệẽ]/g,'e').replace(/[ịíìỉĩ]/g,'i').replace(/[ọóòỏõôồốổỗộơờớởỡợ]/g,'o').replace(/[ụúùủũưừứửữự]/g,'u').replace(/[ỳýỷỹỵ]/g,'y').replace(/[ǹńň]/g,'n').replace(/[șşṣ]/g,'s').replace(/[ẹ̀ẹ́]/g,'e');
        const correct = q.accept.some(a => {
          const an = a.toLowerCase().replace(/[\s\-_]/g,'').replace(/[ạáàảãâầấẩẫậăằắẳẵặ]/g,'a').replace(/[ẹéèẻẽêềếểễệẽ]/g,'e').replace(/[ịíìỉĩ]/g,'i').replace(/[ọóòỏõôồốổỗộơờớởỡợ]/g,'o').replace(/[ụúùủũưừứửữự]/g,'u').replace(/[ỳýỷỹỵ]/g,'y').replace(/[ǹńň]/g,'n').replace(/[șşṣ]/g,'s');
          return norm === an;
        });
        input.classList.add(correct ? 'correct' : 'incorrect');
        input.disabled = true;
        answers[i] = { type:'fill', value:val, correct, submitted:true };
        showRationale(i);
        submitBtn.disabled = true;
        afterAnswer();
      };
    }
    else if (q.type === 'match') {
      const lefts = card.querySelectorAll('[data-side="L"]');
      const rights = card.querySelectorAll('[data-side="R"]');
      let activeLeft = null;
      const matched = {}; // leftIdx -> { rightEl, correctIdx }

      lefts.forEach(el => {
        el.onclick = () => {
          if (el.classList.contains('matched')) return;
          if (activeLeft) activeLeft.classList.remove('active');
          activeLeft = el;
          el.classList.add('active');
        };
      });
      rights.forEach(el => {
        el.onclick = () => {
          if (el.classList.contains('matched')) return;
          if (!activeLeft) return;
          const li = parseInt(activeLeft.dataset.li, 10);
          const correctIdx = parseInt(el.dataset.correct, 10);
          // Pair them visually
          const pairNum = Object.keys(matched).length + 1;
          activeLeft.classList.remove('active');
          activeLeft.classList.add('matched');
          el.classList.add('matched');
          activeLeft.innerHTML = `<span class="qz-match-tag">${pairNum}</span>` + activeLeft.textContent;
          el.innerHTML = `<span class="qz-match-tag">${pairNum}</span>` + el.textContent;
          matched[li] = { correctIdx };
          activeLeft = null;
          answers[i] = { type:'match', value:matched, submitted:false };
        };
      });

      submitBtn.onclick = () => {
        if (Object.keys(matched).length !== q.pairs.length) {
          flashBtn(submitBtn, `Match all ${q.pairs.length} pairs`);
          return;
        }
        let allRight = true;
        Object.keys(matched).forEach(li => {
          const expected = parseInt(li,10);
          if (matched[li].correctIdx !== expected) allRight = false;
        });
        // Visually mark each row as correct/incorrect
        lefts.forEach(el => {
          const li = parseInt(el.dataset.li,10);
          const ok = matched[li] && matched[li].correctIdx === li;
          el.classList.add(ok ? 'locked-correct' : 'locked-incorrect');
        });
        rights.forEach(el => {
          const ci = parseInt(el.dataset.correct,10);
          // Find which leftIdx claimed this right
          let claimedBy = null;
          Object.keys(matched).forEach(li => {
            if (matched[li].correctIdx === ci) claimedBy = parseInt(li,10);
          });
          const ok = (claimedBy === ci);
          el.classList.add(ok ? 'locked-correct' : 'locked-incorrect');
        });
        answers[i] = { type:'match', value:matched, correct:allRight, submitted:true };
        showRationale(i);
        submitBtn.disabled = true;
        afterAnswer();
      };
    }
  }

  function flashBtn(btn, msg) {
    const orig = btn.textContent;
    btn.textContent = msg;
    btn.style.opacity = '.7';
    setTimeout(() => { btn.textContent = orig; btn.style.opacity = ''; }, 1100);
  }

  function showRationale(i) {
    const r = document.querySelector(`[data-rationale="${i}"]`);
    if (r) r.classList.add('show');
  }

  function afterAnswer() {
    // Update progress bar
    const total = currentQuiz.questions.length;
    const answered = answers.filter(a => a && a.submitted).length;
    const pct = Math.round((answered/total)*100);
    const fill = document.querySelector('.qz-progress-fill');
    if (fill) fill.style.width = pct + '%';

    // If all submitted, show result
    if (answered === total) {
      setTimeout(showResult, 600);
    } else {
      // Auto-scroll to next unanswered card
      setTimeout(() => {
        const next = document.querySelector(`.qz-card[data-qindex="${nextUnanswered()}"]`);
        if (next) {
          const ov = document.getElementById('quiz-overlay');
          ov.scrollTo({ top: next.offsetTop - 40, behavior:'smooth' });
        }
      }, 700);
    }
  }
  function nextUnanswered() {
    for (let i=0; i<answers.length; i++) {
      if (!answers[i] || !answers[i].submitted) return i;
    }
    return answers.length - 1;
  }

  // ─── RESULT SCREEN ───────────────────────────────────────────
  function showResult() {
    const total = currentQuiz.questions.length;
    const correct = answers.filter(a => a && a.correct).length;
    const score = correct / total;
    const pass = score >= (currentQuiz.passThreshold || 0.8);

    // Persist
    persistResult({
      scope: currentScope,
      score, correct, total, pass,
      passThreshold: currentQuiz.passThreshold || 0.8,
      timestamp: new Date().toISOString()
    });

    const mount = document.getElementById('qz-result-mount');
    const glyph = pass ? '✦' : '◌';
    const titleTxt = pass
      ? (currentScope.startsWith('exam:') ? 'Module Passed' : 'Check-In Passed')
      : 'Not Yet';
    const msg = pass
      ? (currentScope.startsWith('exam:')
          ? 'You have walked the full Cosmology. The next module — Ancestral Veneration — is open to you.'
          : 'You have integrated this lesson. Mark it complete and continue when you are ready.')
      : `You scored below the ${Math.round((currentQuiz.passThreshold||0.8)*100)}% threshold. Return to the reading. The teaching is patient — you may retake when you have sat with the material again.`;

    // Missed-question review
    const missList = answers.map((a, i) => ({ a, q: currentQuiz.questions[i], i }))
                            .filter(x => !x.a || !x.a.correct);
    const review = missList.length ? `
      <div class="qz-review">
        <div class="qz-review-title">Return to these (${missList.length})</div>
        ${missList.map(x =>
          `<div class="qz-review-item miss">
             <div class="qz-review-q">${stripTags(x.q.q)}</div>
             <div style="margin-top:6px;font-size:14px;opacity:.85;">${x.q.rationale||''}</div>
           </div>`
        ).join('')}
      </div>
    ` : '';

    mount.innerHTML = `
      <div class="qz-result ${pass?'pass':'fail'}">
        <div class="qz-result-glyph">${glyph}</div>
        <h2 class="qz-result-title">${titleTxt}</h2>
        <div class="qz-result-score"><strong>${correct}/${total}</strong> &middot; ${Math.round(score*100)}%</div>
        <p class="qz-result-msg">${msg}</p>
        <div class="qz-result-actions">
          ${pass
            ? `<button class="qz-btn" id="qz-continue">${currentScope.startsWith('exam:') ? 'Enter Next Module' : 'Mark Lesson Complete'}</button>`
            : `<button class="qz-btn qz-btn-ghost" id="qz-back">Return to Reading</button>
               <button class="qz-btn" id="qz-retry">Retake After Re-reading</button>`
          }
        </div>
        ${review}
      </div>
    `;

    // Hide question stack (keep DOM but visually collapse)
    document.getElementById('qz-questions').style.display = 'none';
    document.querySelector('.qz-progress').style.display = 'none';

    // Scroll to result
    document.getElementById('quiz-overlay').scrollTo({ top:0, behavior:'smooth' });

    if (pass) {
      const btn = document.getElementById('qz-continue');
      btn.onclick = () => {
        closeQuiz();
        if (typeof onPassCallback === 'function') onPassCallback({ score, correct, total });
      };
    } else {
      document.getElementById('qz-back').onclick = closeQuiz;
      document.getElementById('qz-retry').onclick = () => {
        // Require user to "have re-read" — simple gate: show confirm with brief delay
        const ok = confirm('Have you returned to the reading and sat with the missed teachings? The retake works best when the material is fresh.');
        if (!ok) return;
        // Reset
        document.getElementById('qz-questions').style.display = '';
        document.querySelector('.qz-progress').style.display = '';
        startQuiz();
      };
    }
  }

  function stripTags(s) {
    return (s||'').replace(/<[^>]+>/g,'');
  }

  // ─── PERSISTENCE ─────────────────────────────────────────────
  function persistResult(rec) {
    // Local fallback
    try {
      const key = 'quiz_results_foundations';
      const cur = JSON.parse(localStorage.getItem(key) || '{}');
      cur[rec.scope] = rec;
      localStorage.setItem(key, JSON.stringify(cur));
    } catch(e) {}

    // Push to Supabase (course-app.js exposes saveQuizResult if logged in)
    if (typeof window.saveQuizResult === 'function') {
      try { window.saveQuizResult(rec); } catch(e) { console.warn('quiz sync', e); }
    }
  }

  // Public: read latest score for a scope
  window.getQuizResult = function(scope) {
    try {
      const cur = JSON.parse(localStorage.getItem('quiz_results_foundations') || '{}');
      return cur[scope] || null;
    } catch(e) { return null; }
  };
  window.hasPassedQuiz = function(scope) {
    const r = window.getQuizResult(scope);
    return !!(r && r.pass);
  };
})();
