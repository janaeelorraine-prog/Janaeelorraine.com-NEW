// ──────────────────────────────────────────────────────────
// COURSE APP — orchestrates HUD, modules panel, altar interior,
// lesson scroll, and Supabase progress sync.
//
// TIER-GATING (current model):
//   Seed  → Module I (Cosmology) only
//   Root  → All 7 modules
//   Elder → All 7 modules + Council Chamber (8th room)
// ──────────────────────────────────────────────────────────
(function() {
  const M = window.COURSE.modules;
  const P = window.PROGRESS;
  const D = window.LESSON_DONE;

  // ─── TIER RESOLUTION ────────────────────────────────────
  // Single source of truth for what the user can access.
  // Read from auth localStorage (set on login by portal-member.html).
  const userEmail = localStorage.getItem('ntas98_user');
  let userData = {};
  try {
    userData = JSON.parse(localStorage.getItem('ntas98_userdata_' + userEmail) || '{}');
  } catch(e) {}
  const userTier = userData.portal_tier || 'seed'; // 'seed' | 'root' | 'elder'

  // Module IDs in order — Cosmology is the intro module unlocked at every tier.
  const SEED_UNLOCKED_MODULES = new Set(['cosmology']);

  function isModuleUnlocked(moduleId) {
    if (userTier === 'root' || userTier === 'elder') return true;
    return SEED_UNLOCKED_MODULES.has(moduleId);
  }

  // Re-apply unlocked flags so PROGRESS reflects the live tier instead of the
  // hardcoded mock values in course-data.js. (We keep completed counts as-is.)
  M.forEach(m => {
    if (!P[m.id]) P[m.id] = { completed: 0, total: m.lessons.length };
    P[m.id].unlocked = isModuleUnlocked(m.id);
  });

  // member from localStorage (set by portal-member.html on login)
  const member = JSON.parse(localStorage.getItem('ntas98_member') || '{}');
  const memberName = member.name || userData.name || 'Beloved Initiate';
  const memberLevel = member.level || 3;
  const memberXP = member.xp || 640;
  const memberXPNext = 1200;

  // ─── HUD ───────────────────────────────────────────────
  document.getElementById('hud-name').textContent = memberName;
  document.getElementById('hud-glyph').textContent = memberName.charAt(0).toUpperCase();
  document.getElementById('hud-level').textContent = `Level ${memberLevel}`;
  document.getElementById('hud-xp').textContent = memberXP;
  document.getElementById('hud-bar-fill').style.width = ((memberXP / memberXPNext) * 100) + '%';

  // HUD tier label — Initiate · Seed | Initiate · Root | Elder · Council
  const tierLabel = userTier === 'elder' ? 'Elder · Council'
                  : userTier === 'root'  ? 'Initiate · Root'
                                         : 'Initiate · Seed';
  document.getElementById('hud-tier').textContent = tierLabel;

  function refreshHUDProgress() {
    const totalLessons = M.reduce((s, m) => s + m.lessons.length, 0);
    const totalDone = M.reduce((s, m) => s + (P[m.id]?.completed || 0), 0);
    const pct = Math.round((totalDone / totalLessons) * 100);
    document.getElementById('wheel-pct').textContent = pct + '%';
    const circ = 2 * Math.PI * 26;
    document.getElementById('wheel-fg').setAttribute('stroke-dasharray', circ);
    document.getElementById('wheel-fg').setAttribute('stroke-dashoffset', circ * (1 - pct/100));
  }
  refreshHUDProgress();

  // ─── MODULES PANEL ─────────────────────────────────────
  const modpList = document.getElementById('modp-list');
  function renderModulesPanel() {
    modpList.innerHTML = '';
    M.forEach(m => {
      const p = P[m.id];
      const item = document.createElement('div');
      item.className = 'modp-item' + (p.unlocked ? '' : ' locked');
      const lockBadge = p.unlocked
        ? `<div class="modp-prog">${p.completed}/${p.total}</div>`
        : `<div class="modp-prog" style="color:rgba(212,175,60,0.55);font-size:9px;letter-spacing:2px">ROOT ▸</div>`;
      item.innerHTML = `
        <div class="modp-num">${m.num}</div>
        <div class="modp-info">
          <div class="modp-name">${m.name}</div>
          <div class="modp-meta">${m.tag} · ${m.lessons.length} lessons</div>
        </div>
        ${lockBadge}
      `;
      if (p.unlocked) {
        item.addEventListener('click', () => openModule(m));
      } else {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => showUpgradePrompt(m));
      }
      modpList.appendChild(item);
    });

    // Elder-only: Council Chamber row at the bottom of the panel
    if (userTier === 'elder') {
      const council = document.createElement('div');
      council.className = 'modp-item';
      council.style.borderColor = 'rgba(212,175,60,0.5)';
      council.style.background = 'linear-gradient(90deg, rgba(212,175,60,0.06), transparent)';
      council.innerHTML = `
        <div class="modp-num" style="color:#fff">✦</div>
        <div class="modp-info">
          <div class="modp-name" style="color:#fff">Council Chamber</div>
          <div class="modp-meta">Mama Janaee · Elder access only</div>
        </div>
        <div class="modp-prog" style="color:#d4af3c">VIII</div>
      `;
      council.addEventListener('click', () => openCouncil());
      modpList.appendChild(council);
    }
  }
  renderModulesPanel();

  // Update the modp-count line to reflect tier
  const modpCount = document.getElementById('modp-count');
  if (modpCount) {
    if (userTier === 'elder') modpCount.textContent = '7 Modules + Council · 35 Lessons';
    else if (userTier === 'root') modpCount.textContent = '7 Modules · 35 Lessons';
    else modpCount.textContent = '1 Unlocked · 6 Locked';
  }

  // Upgrade prompt overlay (shown when Seed clicks a locked module)
  function showUpgradePrompt(m) {
    const existing = document.getElementById('upgrade-prompt');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.id = 'upgrade-prompt';
    overlay.style.cssText = 'position:fixed; inset:0; z-index:300; background:rgba(6,8,13,0.92); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; animation: upFade 0.4s ease both;';
    overlay.innerHTML = `
      <style>@keyframes upFade { from { opacity:0 } to { opacity:1 } }</style>
      <div style="max-width:440px; padding:48px 40px; border:1px solid rgba(212,175,60,0.4); background:rgba(6,8,13,0.95); text-align:center;">
        <div style="font-family:'Cinzel Decorative',serif; font-size:36px; color:#d4af3c; margin-bottom:18px;">✦</div>
        <div style="font-family:'Cinzel',serif; font-size:11px; letter-spacing:4px; color:#d4af3c; text-transform:uppercase; margin-bottom:16px;">Module ${m.num} · ${m.name}</div>
        <div style="font-family:'Cinzel Decorative',serif; font-size:22px; color:#fff; letter-spacing:2px; margin-bottom:16px;">A Root Tier Threshold</div>
        <div style="font-size:15px; color:rgba(240,238,232,0.65); line-height:1.7; font-family:'Cormorant Garamond',serif; font-style:italic; margin-bottom:28px;">
          This chamber opens to those who walk the full curriculum. Step into Root tier to enter all seven sacred spaces — Cosmology, Ancestry, Orisha, Divination, Ritual, Herbology, and Diaspora.
        </div>
        <a href="../portal.html" style="display:inline-block; padding:14px 32px; background:#d4af3c; color:#06080d; text-decoration:none; font-family:'Cinzel Decorative',serif; font-size:10px; letter-spacing:4px; text-transform:uppercase;">Upgrade to Root</a>
        <div style="margin-top:18px;">
          <button id="upgrade-close" style="background:none; border:none; color:rgba(240,238,232,0.4); font-family:'Cinzel',serif; font-size:10px; letter-spacing:3px; cursor:pointer; text-transform:uppercase;">— Close —</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    document.getElementById('upgrade-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }

  // Council Chamber overlay (Elder only)
  function openCouncil() {
    const existing = document.getElementById('council-overlay');
    if (existing) existing.remove();
    const o = document.createElement('div');
    o.id = 'council-overlay';
    o.style.cssText = 'position:fixed; inset:0; z-index:300; background:radial-gradient(ellipse at center, #0c1218 0%, #06080d 80%); display:flex; align-items:center; justify-content:center; animation: upFade 0.5s ease both;';
    o.innerHTML = `
      <style>
        @keyframes upFade { from { opacity:0 } to { opacity:1 } }
        @keyframes councilGlow { 0%,100% { opacity:0.4 } 50% { opacity:0.85 } }
      </style>
      <button id="council-back" style="position:absolute; top:30px; left:30px; background:none; border:none; color:rgba(240,238,232,0.6); font-family:'Cinzel',serif; font-size:11px; letter-spacing:3px; cursor:pointer; text-transform:uppercase;">← Return to Sacred Center</button>
      <div style="max-width:600px; padding:60px 50px; text-align:center; position:relative;">
        <div style="font-family:'Cinzel Decorative',serif; font-size:64px; color:#d4af3c; margin-bottom:24px; animation: councilGlow 4s ease-in-out infinite;">✦</div>
        <div style="font-family:'Cinzel',serif; font-size:11px; letter-spacing:5px; color:#d4af3c; text-transform:uppercase; margin-bottom:18px;">Module VIII · Elder Tier</div>
        <div style="font-family:'Cinzel Decorative',serif; font-size:36px; color:#fff; letter-spacing:3px; margin-bottom:24px;">The Council Chamber</div>
        <div style="font-size:17px; color:rgba(240,238,232,0.75); line-height:1.85; font-family:'Cormorant Garamond',serif; font-style:italic; margin-bottom:36px;">
          A private room where Mama Janaee meets her Elder council — the women walking the full curriculum who have stepped into deeper apprenticeship. Live transmissions, 1:1 sessions, ancestral working circles, and direct access live here. Your next gathering will be announced through the portal and the new-moon transmission.
        </div>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:30px;">
          <div style="padding:18px 14px; border:1px solid rgba(212,175,60,0.25);">
            <div style="font-family:'Cinzel',serif; font-size:10px; letter-spacing:3px; color:#d4af3c; margin-bottom:6px;">NEXT</div>
            <div style="font-size:13px; color:#fff;">Council Circle</div>
            <div style="font-size:11px; color:rgba(240,238,232,0.5); margin-top:4px;">First Sunday · 7pm CT</div>
          </div>
          <div style="padding:18px 14px; border:1px solid rgba(212,175,60,0.25);">
            <div style="font-family:'Cinzel',serif; font-size:10px; letter-spacing:3px; color:#d4af3c; margin-bottom:6px;">YOUR 1:1</div>
            <div style="font-size:13px; color:#fff;">Quarterly Reading</div>
            <div style="font-size:11px; color:rgba(240,238,232,0.5); margin-top:4px;">Book via portal</div>
          </div>
          <div style="padding:18px 14px; border:1px solid rgba(212,175,60,0.25);">
            <div style="font-family:'Cinzel',serif; font-size:10px; letter-spacing:3px; color:#d4af3c; margin-bottom:6px;">DM</div>
            <div style="font-size:13px; color:#fff;">Direct Access</div>
            <div style="font-size:11px; color:rgba(240,238,232,0.5); margin-top:4px;">Mama responds in 48hr</div>
          </div>
        </div>
        <div style="font-size:12px; color:rgba(240,238,232,0.4); letter-spacing:2px; font-style:italic;">— Full chamber experience coming online next moon —</div>
      </div>`;
    document.body.appendChild(o);
    document.getElementById('council-back').addEventListener('click', () => o.remove());
  }

  // ─── BACK TO PORTAL ────────────────────────────────────
  document.getElementById('nav-back').addEventListener('click', () => {
    window.location.href = '../portal-member.html';
  });

  // ─── 3D STAGE ──────────────────────────────────────────
  const stage = document.getElementById('stage');
  // create a label container that overlays the canvas
  const labelLayer = document.createElement('div');
  labelLayer.style.position = 'absolute';
  labelLayer.style.inset = '0';
  labelLayer.style.pointerEvents = 'none';
  labelLayer.style.zIndex = '4';
  stage.appendChild(labelLayer);
  // children inside labelLayer get pointer-events:auto via .portal-label

  // hide loader once Three is ready
  setTimeout(() => {
    document.getElementById('loader').classList.add('gone');
    // tag modules with their locked state so the 3D scene can dim them
    const sceneModules = M.map(m => ({ ...m, locked: !P[m.id]?.unlocked }));
    window.SacredScene.init({
      stage,
      labelContainer: labelLayer,
      modules: sceneModules,
      onClick: (m) => {
        if (P[m.id]?.unlocked) openModule(m);
        else showUpgradePrompt(m);
      }
    });
  }, 1400);

  // ─── PARTICLES (gold dust) ─────────────────────────────
  const partCanvas = document.getElementById('particles');
  const pctx = partCanvas.getContext('2d');
  let pw, ph, parts = [];
  function resizeParticles() {
    pw = partCanvas.width = window.innerWidth;
    ph = partCanvas.height = window.innerHeight;
  }
  resizeParticles();
  window.addEventListener('resize', resizeParticles);
  for (let i = 0; i < 60; i++) {
    parts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.3 - 0.05,
      life: Math.random()
    });
  }
  function tickParticles() {
    pctx.clearRect(0, 0, pw, ph);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.life += 0.005;
      if (p.y < -10 || p.x < -10 || p.x > pw + 10) {
        p.x = Math.random() * pw; p.y = ph + 10; p.life = 0;
      }
      const alpha = Math.sin(p.life * Math.PI) * 0.6;
      pctx.fillStyle = `rgba(212,175,60,${alpha})`;
      pctx.beginPath();
      pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pctx.fill();
    });
    requestAnimationFrame(tickParticles);
  }
  tickParticles();

  // ─── BEGIN BUTTON → opens Ancestry module ──────────────
  document.getElementById('begin-btn').addEventListener('click', () => {
    // Open first unlocked module: Ancestry for Root/Elder, Cosmology for Seed.
    const targetId = (userTier === 'seed') ? 'cosmology' : 'ancestry';
    const target = M.find(m => m.id === targetId);
    if (target && P[target.id]?.unlocked) openModule(target);
  });

  // ─── MODULE INTERIOR ───────────────────────────────────
  let activeModule = null;
  let activeLessonId = null;

  // ─── PER-MODULE INTERIOR LAYOUTS ───────────────────────
  // Each module's chamber gets a hand-tuned layout + module-specific decor.
  // Positions are %-based against the .mi-stage element.
  const INTERIOR_LAYOUTS = {
    // Cosmology — three concentric orbital paths around the central sun.
    // Lessons sit on the orbits like planets.
    cosmology: [
      { x:50, y:24, scale:1.1 },   // l1 — Three Worlds (top, near sun)
      { x:23, y:42, scale:1.0 },   // l2 — Ori (left orbit)
      { x:78, y:42, scale:1.0 },   // l3 — Egungun (right orbit)
      { x:30, y:72, scale:0.95 },  // l4 — Time is a River (lower-left)
      { x:70, y:72, scale:0.95 }   // l5 — Cosmic Body (lower-right)
    ],
    // Orisha — five waters arranged like rising/falling tides across a horizon.
    orisha: [
      { x:50, y:32, scale:1.05 },  // What is an Orisha (high center)
      { x:18, y:54, scale:1.0 },   // Yemoja/Oshun/Oya (river left)
      { x:82, y:54, scale:1.0 },   // Esu (crossroads right)
      { x:32, y:74, scale:0.95 },  // Lwa & cousins (lower-left tide)
      { x:68, y:74, scale:0.95 }   // Finding your crown (lower-right tide)
    ],
    // Divination — concentric cowrie ring; lessons placed at the cardinal+diag spots.
    divination: [
      { x:50, y:30, scale:1.05 },  // Why we throw (north)
      { x:24, y:48, scale:1.0 },   // Ifá in Brief (NW)
      { x:76, y:48, scale:1.0 },   // Astro-Odu (NE)
      { x:32, y:74, scale:0.95 },  // Reading for self (SW)
      { x:68, y:74, scale:0.95 }   // When not to read (SE)
    ],
    // Ritual — fire pit center; lessons arc around the flame on a half-circle.
    ritual: [
      { x:50, y:28, scale:1.05 },  // What makes a ritual real
      { x:22, y:48, scale:1.0 },   // Bath work
      { x:78, y:48, scale:1.0 },   // Candle magic
      { x:34, y:72, scale:0.95 },  // Honoring the cycle
      { x:66, y:72, scale:0.95 }   // Closing the working
    ],
    // Herbology — a hanging-shelf grove. Lessons in two rows like jars on shelves.
    herbology: [
      { x:24, y:44, scale:1.0 },   // Plants are ancestors (shelf left)
      { x:50, y:38, scale:1.05 },  // Florida Water (shelf center, slightly higher)
      { x:76, y:44, scale:1.0 },   // Bath herbs (shelf right)
      { x:34, y:72, scale:0.95 },  // Simples (lower shelf left)
      { x:66, y:72, scale:0.95 }   // Garden as altar (lower shelf right)
    ],
    // Diaspora — Atlantic horizon. Lessons placed like vessels crossing the water,
    // left (West Africa) → right (Americas), descending then rising.
    diaspora: [
      { x:18, y:50, scale:1.0 },   // Atlantic & The Veil (departure shore)
      { x:36, y:62, scale:0.95 },  // Hoodoo (mid-passage low)
      { x:54, y:54, scale:1.0 },   // Vodou/Santería/Candomblé (mid-crossing)
      { x:72, y:60, scale:0.95 },  // Black Church (approaching shore)
      { x:88, y:46, scale:1.05 }   // Returning the inheritance (arrival)
    ]
  };

  // Decor SVG/HTML injected behind sacred-objs for each module.
  function buildModuleDecor(m) {
    const decor = document.createElement('div');
    decor.id = 'module-decor';
    decor.style.cssText = 'position:absolute; inset:0; pointer-events:none; z-index:1;';

    if (m.id === 'cosmology') {
      // Three concentric orbital ellipses + a few stars
      decor.innerHTML = `
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.55">
          <defs>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#f5d678" stop-opacity="1"/>
              <stop offset="60%" stop-color="#d4af3c" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#a87cd9" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="500" cy="300" rx="220" ry="80" fill="none" stroke="#a87cd9" stroke-opacity="0.35" stroke-width="0.6"/>
          <ellipse cx="500" cy="300" rx="320" ry="120" fill="none" stroke="#f5d678" stroke-opacity="0.28" stroke-width="0.6"/>
          <ellipse cx="500" cy="300" rx="420" ry="160" fill="none" stroke="#7ec0e8" stroke-opacity="0.22" stroke-width="0.6"/>
          <circle cx="500" cy="300" r="48" fill="url(#sunGrad)"/>
          <circle cx="500" cy="300" r="14" fill="#fff7d8"/>
        </svg>`;
    }

    else if (m.id === 'orisha') {
      // Three flowing water bands (Yemoja=blue, Oshun=gold, Oya=rose)
      decor.innerHTML = `
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.55">
          <path d="M 0,360 Q 250,330 500,360 T 1000,360" fill="none" stroke="#7ec0e8" stroke-opacity="0.55" stroke-width="2"/>
          <path d="M 0,400 Q 250,370 500,400 T 1000,400" fill="none" stroke="#e0a448" stroke-opacity="0.45" stroke-width="2"/>
          <path d="M 0,440 Q 250,410 500,440 T 1000,440" fill="none" stroke="#e08fb8" stroke-opacity="0.50" stroke-width="2"/>
          <path d="M 0,470 Q 250,445 500,470 T 1000,470" fill="none" stroke="#7ec0e8" stroke-opacity="0.30" stroke-width="1.5"/>
          <path d="M 0,500 Q 250,475 500,500 T 1000,500" fill="none" stroke="#e08fb8" stroke-opacity="0.25" stroke-width="1.5"/>
        </svg>`;
    }

    else if (m.id === 'divination') {
      // Concentric cowrie-mat rings on the floor + scattered shell dots
      const dots = [];
      const ringRs = [180, 230, 280];
      ringRs.forEach((r, ri) => {
        const count = 12 + ri * 4;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + (ri * 0.2);
          const x = 500 + Math.cos(a) * r;
          const y = 360 + Math.sin(a) * r * 0.55; // perspective squish
          dots.push(`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="2.4" fill="#f5e8c8" opacity="${0.3 + ri*0.08}"/>`);
        }
      });
      decor.innerHTML = `
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.6">
          <defs>
            <radialGradient id="matGrad" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stop-color="#a87cd9" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#a87cd9" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="500" cy="360" rx="320" ry="180" fill="url(#matGrad)"/>
          <ellipse cx="500" cy="360" rx="180" ry="100" fill="none" stroke="#a87cd9" stroke-opacity="0.35"/>
          <ellipse cx="500" cy="360" rx="230" ry="125" fill="none" stroke="#a87cd9" stroke-opacity="0.25"/>
          <ellipse cx="500" cy="360" rx="280" ry="155" fill="none" stroke="#f5d678" stroke-opacity="0.20"/>
          ${dots.join('')}
        </svg>`;
    }

    else if (m.id === 'ritual') {
      // Central fire pit with flame plumes + scattered embers; arc of stones
      const stones = [];
      for (let i = 0; i < 9; i++) {
        const a = -Math.PI + (i / 8) * Math.PI; // half circle facing up
        const x = 500 + Math.cos(a) * 230;
        const y = 410 + Math.sin(a) * 90;
        stones.push(`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="14" ry="6" fill="#3a1e14" opacity="0.7"/>`);
      }
      decor.innerHTML = `
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.7">
          <defs>
            <radialGradient id="fireGrad" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stop-color="#ffd47a" stop-opacity="0.9"/>
              <stop offset="40%" stop-color="#d97a7a" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#3a0e08" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="500" cy="430" rx="120" ry="32" fill="#1a0808" opacity="0.8"/>
          ${stones.join('')}
          <ellipse cx="500" cy="395" rx="80" ry="60" fill="url(#fireGrad)"/>
          <path d="M 470,420 Q 478,360 500,340 Q 522,360 530,420 Z" fill="#ffd47a" opacity="0.55">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.4s" repeatCount="indefinite"/>
          </path>
          <path d="M 484,420 Q 490,380 500,365 Q 510,380 516,420 Z" fill="#fff5d8" opacity="0.7"/>
        </svg>`;
    }

    else if (m.id === 'herbology') {
      // Two horizontal shelf lines with hanging herb-bundle silhouettes
      const bundles = [];
      const shelfY = [180, 360];
      const xs = [150, 300, 450, 600, 750, 900];
      shelfY.forEach((sy, si) => {
        xs.forEach((x, xi) => {
          if ((si + xi) % 2 === 0) {
            bundles.push(`<line x1="${x}" y1="${sy}" x2="${x}" y2="${sy+24}" stroke="#5a3a1a" stroke-width="1" opacity="0.55"/>`);
            bundles.push(`<ellipse cx="${x}" cy="${sy+50}" rx="14" ry="28" fill="#2a4a30" opacity="0.55"/>`);
            bundles.push(`<path d="M ${x-10},${sy+30} L ${x+10},${sy+30}" stroke="#5a3a1a" stroke-width="2" opacity="0.5"/>`);
          }
        });
      });
      decor.innerHTML = `
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.65">
          <line x1="60" y1="180" x2="940" y2="180" stroke="#48b48c" stroke-opacity="0.4" stroke-width="1.5"/>
          <line x1="60" y1="360" x2="940" y2="360" stroke="#48b48c" stroke-opacity="0.35" stroke-width="1.5"/>
          ${bundles.join('')}
        </svg>`;
    }

    else if (m.id === 'diaspora') {
      // Atlantic horizon: gold sun on right horizon, water bands, faint vessel silhouettes
      decor.innerHTML = `
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.6">
          <defs>
            <linearGradient id="hzGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#0e2a52"/>
              <stop offset="60%" stop-color="#0e2a52"/>
              <stop offset="100%" stop-color="#d4af3c" stop-opacity="0.7"/>
            </linearGradient>
          </defs>
          <line x1="0" y1="320" x2="1000" y2="320" stroke="url(#hzGrad)" stroke-width="1.5" opacity="0.65"/>
          <circle cx="900" cy="320" r="36" fill="#f5d678" opacity="0.7"/>
          <circle cx="900" cy="320" r="60" fill="#f5d678" opacity="0.18"/>
          <path d="M 0,400 Q 250,380 500,400 T 1000,400" fill="none" stroke="#7ec0e8" stroke-opacity="0.40" stroke-width="1.5"/>
          <path d="M 0,440 Q 250,420 500,440 T 1000,440" fill="none" stroke="#7ec0e8" stroke-opacity="0.30" stroke-width="1.5"/>
          <path d="M 0,480 Q 250,460 500,480 T 1000,480" fill="none" stroke="#7ec0e8" stroke-opacity="0.22" stroke-width="1.5"/>
          <!-- ghost vessels -->
          <path d="M 220,318 L 240,318 L 235,310 L 225,310 Z M 230,310 L 230,295" stroke="#f5e8c8" stroke-opacity="0.4" fill="none"/>
          <path d="M 540,316 L 560,316 L 555,308 L 545,308 Z M 550,308 L 550,293" stroke="#f5e8c8" stroke-opacity="0.4" fill="none"/>
        </svg>`;
    }

    return decor;
  }

  // Render lessons into the chamber using a per-module layout.
  function renderCustomInterior(m, altarEl) {
    const stage = document.querySelector('.mi-stage');
    if (stage) {
      const decor = buildModuleDecor(m);
      stage.appendChild(decor);
    }
    const layout = INTERIOR_LAYOUTS[m.id];
    m.lessons.forEach((l, i) => {
      const pos = (layout && layout[i]) || { x: 50, y: 50, scale: 1 };
      const obj = document.createElement('div');
      obj.className = 'sacred-obj' + (D[l.id] ? ' done' : '');
      obj.style.left = pos.x + '%';
      obj.style.top = pos.y + '%';
      obj.style.transform = `translate(-50%, -50%) scale(${pos.scale || 1})`;
      obj.style.setProperty('--obj-scale', pos.scale || 1);
      // glyph color tinted by module
      const tint = m.color || 'var(--gold)';
      obj.innerHTML = `
        <div class="sacred-glyph" style="color:${tint}; text-shadow:0 0 16px ${tint}55">${l.glyph || m.glyph}</div>
        <div class="sacred-name">${l.name}</div>
        <div class="sacred-status ${D[l.id] ? 'done' : ''}">${D[l.id] ? '\u2713 Tended' : (l.time || '')}</div>
      `;
      obj.addEventListener('click', () => openLesson(l));
      altarEl.appendChild(obj);
    });
  }

  function openModule(m) {
    activeModule = m;
    document.getElementById('mi-eyebrow').textContent = `Module ${m.num}`;
    document.getElementById('mi-title').textContent = m.name;
    const p = P[m.id];
    document.getElementById('mi-progress').textContent = `${p.completed} / ${p.total} Lessons`;

    // apply theme class to the module interior
    const mi = document.getElementById('module-interior');
    mi.className = '';
    if (m.theme) mi.classList.add('theme-' + m.theme);
    // Ancestry keeps the static figure/glyphs/floor-glow; other modules hide them
    // so the per-module decor reads cleanly.
    mi.classList.toggle('hide-ancestry-decor', !m.altar);

    // render lesson list
    const list = document.getElementById('mil-items');
    list.innerHTML = '';
    m.lessons.forEach(l => {
      const item = document.createElement('div');
      item.className = 'mil-item';
      const done = D[l.id];
      item.innerHTML = `
        <div class="mil-check ${done ? 'done' : ''}"></div>
        <div class="mil-text">${l.name}<div style="font-size:11px;color:var(--muted);margin-top:2px">${l.time || ''}</div></div>
      `;
      item.addEventListener('click', () => openLesson(l));
      list.appendChild(item);
    });

    // render altar (Ancestry has hand-placed altar; others get custom layouts)
    const altarEl = document.getElementById('sacred-objs');
    altarEl.innerHTML = '';

    // remove any prior module-decor element
    const oldDecor = document.getElementById('module-decor');
    if (oldDecor) oldDecor.remove();

    if (m.altar) {
      m.lessons.forEach(l => {
        const obj = document.createElement('div');
        obj.className = 'sacred-obj' + (D[l.id] ? ' done' : '');
        obj.style.left = l.x;
        obj.style.top = l.y;
        obj.innerHTML = `
          <div class="sacred-glyph">${l.glyph}</div>
          <div class="sacred-name">${l.name}</div>
          <div class="sacred-status ${D[l.id] ? 'done' : ''}">${D[l.id] ? '\u2713 Tended' : 'Untouched'}</div>
        `;
        obj.addEventListener('click', () => openLesson(l));
        altarEl.appendChild(obj);
      });
    } else {
      // Custom interior per module: each gets its own positions + decor.
      renderCustomInterior(m, altarEl);
    }

    mi.classList.add('show');
  }

  document.getElementById('mi-back').addEventListener('click', () => {
    document.getElementById('module-interior').classList.remove('show');
    activeModule = null;
  });

  // ─── REFLECTION JOURNAL (per module) ───────────────────
  const mnArea = document.getElementById('mn-area');
  const mnPrompt = document.getElementById('mn-prompt');
  const mnSaved = document.getElementById('mn-saved');

  function loadJournal(moduleId, lessonId) {
    const key = `ntas98_journal_${moduleId}_${lessonId}`;
    mnArea.value = localStorage.getItem(key) || '';
  }

  document.getElementById('mn-save').addEventListener('click', async () => {
    if (!activeModule) return;
    const key = `ntas98_journal_${activeModule.id}_${activeLessonId || 'general'}`;
    localStorage.setItem(key, mnArea.value);
    // mirror to Supabase if available
    if (window.NTAS_SUPA && member.id) {
      try {
        await fetch('/.netlify/functions/save-journal', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            member_id: member.id,
            course_id: 'foundations',
            module_id: activeModule.id,
            lesson_id: activeLessonId,
            entry: mnArea.value
          })
        });
      } catch(e) { /* offline-tolerant */ }
    }
    mnSaved.classList.add('show');
    setTimeout(() => mnSaved.classList.remove('show'), 2200);
  });

  // ─── LESSON BOOK OVERLAY ───────────────────────────────
  const ls = document.getElementById('lesson-scroll'); // legacy fallback
  function openLesson(l) {
    if (!activeModule) return;
    activeLessonId = l.id;

    // Use the new sacred scripture book overlay
    if (typeof window.openBook === 'function') {
      window.openBook(l, activeModule, {
        completed: !!D[l.id],
        onComplete: async (lesson) => {
          // ─── QUIZ GATE ─────────────────────────────────────
          // For Module I (Cosmology): "Mark Complete" → opens lesson check-in.
          // Lesson is only marked complete after passing the quiz.
          // If already passed (retake) or no quiz exists, complete directly.
          const alreadyPassed = window.hasPassedQuiz && window.hasPassedQuiz('lesson:' + lesson.id);
          if (!alreadyPassed && typeof window.openLessonQuiz === 'function') {
            const opened = window.openLessonQuiz(activeModule, lesson, {
              onPass: async () => {
                await markLessonComplete(lesson);
                maybePromptExam();
              }
            });
            if (opened) return; // Quiz handled the completion path
          }
          // No quiz available (other modules) or already passed → mark direct
          await markLessonComplete(lesson);
          maybePromptExam();
        }
      });
      // also load the legacy module journal area in case user opens module view
      loadJournal(activeModule.id, l.id);
      mnPrompt.textContent = l.prompt || 'What is rising for you in this teaching?';
      return;
    }

    // ── legacy scroll fallback (kept for safety) ──
    document.getElementById('ls-eyebrow').textContent = `Lesson · ${activeModule.name}`;
    document.getElementById('ls-title').textContent = l.name;
    document.getElementById('ls-meta').textContent = `${l.time || '12 min'} · Module ${activeModule.num} · ${activeModule.name}`;
    document.getElementById('ls-video-label').textContent = `Video Teaching · ${l.time || '12 min'}`;
    document.getElementById('ls-prompt').textContent = l.prompt || `Reflect on what surfaces from this teaching.`;
    document.getElementById('ls-text').innerHTML = `
      <p>${l.excerpt || `This is where the lesson teaching for "${l.name}" will live.`}</p>
      <div class="scroll-quote">"${l.prompt || 'Sit with what comes. The work is in the listening.'}"</div>
    `;
    const btn = document.getElementById('ls-complete');
    if (D[l.id]) { btn.textContent = '✓ Completed'; btn.classList.add('done'); }
    else { btn.textContent = 'Mark Complete'; btn.classList.remove('done'); }
    loadJournal(activeModule.id, l.id);
    mnPrompt.textContent = l.prompt || 'What is rising for you in this teaching?';
    ls.classList.add('show');
  }

  // Extracted completion logic so the book can call it via callback
  async function markLessonComplete(lesson) {
    if (!lesson || !activeModule) return;
    D[lesson.id] = true;
    const p = P[activeModule.id];
    p.completed = activeModule.lessons.filter(x => D[x.id]).length;
    const miProg = document.getElementById('mi-progress');
    if (miProg) miProg.textContent = `${p.completed} / ${p.total} Lessons`;
    renderModulesPanel();
    refreshHUDProgress();
    openModule(activeModule);
    // localStorage mirror — used by the portal dashboard card
    try {
      const key = 'ntas98_course_progress_' + (userEmail || 'anon');
      const map = JSON.parse(localStorage.getItem(key) || '{}');
      map[`${activeModule.id}::${lesson.id}`] = { completed: true, at: Date.now() };
      localStorage.setItem(key, JSON.stringify(map));
    } catch(e){}
    // Supabase sync
    await saveProgressToServer(activeModule.id, lesson.id, true);
    // bump XP
    const newXP = memberXP + 40;
    document.getElementById('hud-xp').textContent = newXP;
    document.getElementById('hud-bar-fill').style.width = ((newXP / memberXPNext) * 100) + '%';
  }

  // ─── SUPABASE SYNC HELPERS ─────────────────────────────
  async function saveProgressToServer(moduleId, lessonId, completed) {
    if (!userEmail) return;
    try {
      await fetch('/.netlify/functions/course-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          userEmail,
          courseId: 'foundations',
          moduleId, lessonId, completed: !!completed
        })
      });
    } catch(e) { /* offline-tolerant */ }
  }

  async function loadProgressFromServer() {
    if (!userEmail) return;
    try {
      const r = await fetch('/.netlify/functions/course-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'load', userEmail, courseId: 'foundations' })
      });
      const j = await r.json();
      if (j && j.success && Array.isArray(j.progress)) {
        j.progress.forEach(row => {
          if (row.completed) D[row.lesson_id] = true;
        });
        // recompute counts
        M.forEach(m => {
          if (P[m.id]) P[m.id].completed = m.lessons.filter(l => D[l.id]).length;
        });
        renderModulesPanel();
        refreshHUDProgress();
      }
    } catch(e) { console.warn('Progress load failed (using local cache):', e); }
  }

  async function saveJournalToServer(moduleId, lessonId, entry) {
    if (!userEmail) return;
    try {
      await fetch('/.netlify/functions/journal-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          userEmail,
          courseId: 'foundations',
          moduleId, lessonId, entry: entry || ''
        })
      });
    } catch(e){}
  }

  // ─── QUIZ: SUPABASE + EXAM PROMPTING ──────────────────
  // Persist a quiz result. Called by course-quiz.js → window.saveQuizResult.
  async function saveQuizResultToServer(rec) {
    if (!userEmail) return;
    try {
      await fetch('/.netlify/functions/course-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveQuiz',
          userEmail,
          courseId: 'foundations',
          scope: rec.scope,
          score: rec.score,
          correct: rec.correct,
          total: rec.total,
          passed: rec.pass,
          passThreshold: rec.passThreshold,
          ts: rec.timestamp
        })
      });
    } catch(e) { /* local copy already saved by quiz engine */ }
  }
  // Expose to course-quiz.js
  window.saveQuizResult = saveQuizResultToServer;

  // After a lesson is completed, check if the whole module is done.
  // If yes (and exam not yet passed), prompt the end-of-module exam.
  function maybePromptExam() {
    if (!activeModule) return;
    const allDone = activeModule.lessons.every(l => D[l.id]);
    if (!allDone) return;
    const examScope = 'exam:' + activeModule.id;
    if (window.hasPassedQuiz && window.hasPassedQuiz(examScope)) return;
    if (typeof window.openModuleExam !== 'function') return;
    // Brief delay so user sees their lesson-complete confetti first
    setTimeout(() => {
      window.openModuleExam(activeModule, {
        onPass: async () => {
          // Future: unlock next module, award XP bonus, etc.
          const xpBonus = 200;
          const newXP = memberXP + xpBonus;
          document.getElementById('hud-xp').textContent = newXP;
          document.getElementById('hud-bar-fill').style.width = ((newXP / memberXPNext) * 100) + '%';
        }
      });
    }, 900);
  }
  // Expose so a "Take the Exam" button could call it manually if desired.
  window.openCurrentModuleExam = () => {
    if (activeModule && typeof window.openModuleExam === 'function') {
      window.openModuleExam(activeModule, {});
    }
  };

  // expose for course-book.js
  window.__ntasCourseSync = {
    saveJournalToServer,
    saveProgressToServer,
    courseId: 'foundations',
    userEmail
  };

  // hydrate progress on init
  loadProgressFromServer();

  document.getElementById('ls-close').addEventListener('click', () => ls.classList.remove('show'));
  ls.addEventListener('click', e => { if (e.target === ls) ls.classList.remove('show'); });

  document.getElementById('ls-complete').addEventListener('click', async () => {
    if (!activeLessonId) return;
    const lesson = activeModule.lessons.find(l => l.id === activeLessonId);
    if (!lesson) return;
    await markLessonComplete(lesson);
    document.getElementById('ls-complete').textContent = '✓ Completed';
    document.getElementById('ls-complete').classList.add('done');
  });

  // prev / next
  document.getElementById('ls-next').addEventListener('click', () => {
    const idx = activeModule.lessons.findIndex(l => l.id === activeLessonId);
    const next = activeModule.lessons[(idx + 1) % activeModule.lessons.length];
    openLesson(next);
  });
  document.getElementById('ls-prev').addEventListener('click', () => {
    const idx = activeModule.lessons.findIndex(l => l.id === activeLessonId);
    const prev = activeModule.lessons[(idx - 1 + activeModule.lessons.length) % activeModule.lessons.length];
    openLesson(prev);
  });

  // ESC closes overlays
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (ls.classList.contains('show')) { ls.classList.remove('show'); return; }
      const mi = document.getElementById('module-interior');
      if (mi.classList.contains('show')) mi.classList.remove('show');
    }
  });
})();
