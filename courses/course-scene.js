// ──────────────────────────────────────────────────────────
// SACRED CENTER — Three.js scene
// A candlelit ritual circle with orbiting module portals.
// ──────────────────────────────────────────────────────────
window.SacredScene = (function() {
  let renderer, scene, camera, clock;
  let modulePortals = [];   // { mesh, light, data, screenPos }
  let centerLight, candleLights = [];
  let raycaster, mouse;
  let onPortalClick = null;
  let mounted = false;
  let stageEl, labelLayer;

  function init({ stage, labelContainer, modules, onClick }) {
    stageEl = stage;
    labelLayer = labelContainer;
    onPortalClick = onClick;

    scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x06080d, 0.035);

    const w = stage.clientWidth, h = stage.clientHeight;
    camera = new THREE.PerspectiveCamera(48, w/h, 0.1, 200);
    camera.position.set(0, 4.2, 13);
    camera.lookAt(0, 1.2, 0);

    renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    stage.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    buildScene(modules);
    bindEvents();
    mounted = true;
    animate();
  }

  function buildScene(modules) {
    // ambient atmosphere — slightly cooler now to let module colors pop
    scene.add(new THREE.AmbientLight(0x1a1428, 0.45));

    // central altar light (warm gold)
    centerLight = new THREE.PointLight(0xffb454, 5.5, 26, 1.6);
    centerLight.position.set(0, 1.8, 0);
    scene.add(centerLight);

    // upper indigo-violet rim light (twilight sky energy)
    const rim = new THREE.PointLight(0x5a3aaa, 3.0, 50, 2);
    rim.position.set(0, 9, -7);
    scene.add(rim);

    // emerald grove side light (life force)
    const emerald = new THREE.PointLight(0x2d8a6a, 2.0, 30, 2);
    emerald.position.set(-9, 3, 4);
    scene.add(emerald);

    // wine/rose ancestral side light
    const wine = new THREE.PointLight(0xa83a5a, 2.0, 30, 2);
    wine.position.set(9, 3, 4);
    scene.add(wine);

    // FLOOR — sacred geometry disk (deep indigo-black, not pure black)
    const floorGeo = new THREE.CircleGeometry(14, 96);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0e0a18, roughness: 0.85, metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // FLOOR — flower of life inner pattern (white-gold sigil)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const petal = new THREE.Mesh(
        new THREE.RingGeometry(1.4, 1.42, 64),
        new THREE.MeshBasicMaterial({ color: 0xf5e8c8, transparent: true, opacity: 0.32, side: THREE.DoubleSide })
      );
      petal.rotation.x = -Math.PI / 2;
      petal.position.set(Math.sin(a) * 1.4, 0.013, Math.cos(a) * 1.4);
      scene.add(petal);
    }
    // central circle of the flower
    addRing(0, 0.014, 0, 1.4, 1.42, 0xf5e8c8, 0.42);

    // FLOOR — gold ritual rings + accent rings in module colors
    addRing(0, 0.01, 0, 6.2, 6.4, 0xd4af3c, 0.9);
    addRing(0, 0.01, 0, 6.5, 6.55, 0xf5e8c8, 0.5);
    addRing(0, 0.01, 0, 8.6, 8.7, 0xd4af3c, 0.55);
    addRing(0, 0.01, 0, 11.0, 11.05, 0xd4af3c, 0.28);
    // a faint emerald ring and a faint wine ring for color depth
    addRing(0, 0.011, 0, 9.4, 9.45, 0x48b48c, 0.18);
    addRing(0, 0.011, 0, 10.2, 10.25, 0xd97a7a, 0.18);

    // FLOOR — eight radial spokes, color-cycling so the floor reads as a wheel of energies
    const spokeColors = [0xd4af3c, 0x7ce0a0, 0xa87cd9, 0xd97a7a, 0x48b48c, 0x5d8fb3, 0xf5e8c8, 0xc9a84c];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const spoke = new THREE.Mesh(
        new THREE.PlaneGeometry(0.06, 5),
        new THREE.MeshBasicMaterial({ color: spokeColors[i], transparent: true, opacity: 0.32 })
      );
      spoke.rotation.x = -Math.PI / 2;
      spoke.rotation.z = -a;
      spoke.position.set(Math.sin(a) * 5.5, 0.012, Math.cos(a) * 5.5);
      scene.add(spoke);
    }

    // CENTER ALTAR PEDESTAL
    const pedGeo = new THREE.CylinderGeometry(0.9, 1.1, 1.4, 32);
    const pedMat = new THREE.MeshStandardMaterial({
      color: 0x1a1208, roughness: 0.6, metalness: 0.3, emissive: 0x3a2410, emissiveIntensity: 0.4
    });
    const pedestal = new THREE.Mesh(pedGeo, pedMat);
    pedestal.position.y = 0.7;
    scene.add(pedestal);

    // CENTER FLAME — animated cone with point light
    const flameGeo = new THREE.ConeGeometry(0.18, 0.5, 12);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffd47a, transparent:true, opacity:0.95 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(0, 1.7, 0);
    flame.userData.kind = 'flame';
    scene.add(flame);

    // BACK PILLARS — gold-edged stone pillars
    for (let i = -1; i <= 1; i += 2) {
      const pillarGeo = new THREE.CylinderGeometry(0.35, 0.4, 7, 8);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x18130b, roughness: 0.7, metalness: 0.5, emissive: 0x2a1f10, emissiveIntensity: 0.25
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(i * 4.5, 3.5, -5.5);
      scene.add(pillar);

      // gold capital ring
      const cap = new THREE.Mesh(
        new THREE.TorusGeometry(0.45, 0.06, 8, 24),
        new THREE.MeshStandardMaterial({ color: 0xd4af3c, metalness: 1, roughness: 0.25, emissive: 0x6a4f10, emissiveIntensity: 0.6 })
      );
      cap.rotation.x = Math.PI / 2;
      cap.position.set(i * 4.5, 6.9, -5.5);
      scene.add(cap);
    }

    // BACKDROP — twilight indigo→plum→ember sky
    const skyGeo = new THREE.SphereGeometry(60, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec3 vWorld; void main(){ vWorld = (modelMatrix * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        varying vec3 vWorld;
        uniform float uTime;
        // simple star field
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        void main(){
          float h = clamp(vWorld.y / 60.0, 0.0, 1.0);
          // horizon: deep plum-rose; mid: indigo; zenith: near-black violet
          vec3 horizon = vec3(0.32, 0.12, 0.20);
          vec3 mid     = vec3(0.10, 0.08, 0.28);
          vec3 zenith  = vec3(0.03, 0.02, 0.10);
          vec3 col = mix(horizon, mid, smoothstep(0.0, 0.35, h));
          col = mix(col, zenith, smoothstep(0.35, 1.0, h));
          // ember glow at horizon
          float emberGlow = exp(-h * 5.0) * 0.5;
          col += vec3(0.85, 0.45, 0.18) * emberGlow;
          // gold-haze halo at altar direction
          vec2 dir = normalize(vWorld.xz);
          float halo = exp(-h * 3.0) * smoothstep(0.0, 1.0, 1.0 - abs(dir.x)) * 0.25;
          col += vec3(0.95, 0.7, 0.3) * halo;
          // stars
          vec2 sp = vWorld.xy * 0.5 + vWorld.zx * 0.3;
          float st = step(0.997, hash(floor(sp * 8.0)));
          col += vec3(st) * (0.6 + 0.4 * sin(uTime * 2.0 + hash(floor(sp * 8.0)) * 30.0)) * smoothstep(0.2, 1.0, h);
          gl_FragColor = vec4(col, 1.0);
        }`
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.userData.kind = 'sky';
    scene.add(sky);

    // CANDLES around the inner ring (mix of gold + colored votives)
    const candleColors = [0xffb454, 0xffb454, 0xff7aa0, 0xffb454, 0x7ce0a0, 0xffb454, 0xa87cd9, 0xffb454, 0xffb454, 0x7ce0a0, 0xff7aa0, 0xffb454];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r = 6.3;
      addCandle(Math.sin(a) * r, 0, Math.cos(a) * r, candleColors[i]);
    }

    // FLOATING SACRED GLYPHS — Adinkra-inspired symbols drifting in the air
    const glyphChars = ['☥', '☉', '◈', '⚜', '✦', '⏣', '◉', '☖', '☩', '⚘'];
    for (let i = 0; i < 14; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = 5 + Math.random() * 6;
      const yPos = 1.5 + Math.random() * 4;
      const sprite = makeGlyphSprite(glyphChars[i % glyphChars.length]);
      sprite.position.set(Math.sin(ang) * rad, yPos, Math.cos(ang) * rad);
      sprite.userData = { kind:'glyph', baseY: yPos, phase: Math.random() * Math.PI * 2, drift: Math.random() * 0.3 + 0.1 };
      scene.add(sprite);
    }

    // INCENSE SMOKE plumes from the altar (translucent ribbons rising)
    for (let i = 0; i < 3; i++) {
      const smoke = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 4),
        new THREE.MeshBasicMaterial({
          color: 0xc8a0d0, transparent: true, opacity: 0.08, depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      smoke.position.set((i - 1) * 0.4, 3.5, 0);
      smoke.userData = { kind:'smoke', phase: i * 1.4 };
      scene.add(smoke);
    }

    // MODULE PORTALS — orbital
    const portalRing = 8.6;
    modules.forEach((m, idx) => {
      const a = (m.angle * Math.PI) / 180 - Math.PI / 2; // rotate so 0deg = back
      const x = Math.sin(a) * portalRing;
      const z = Math.cos(a) * portalRing;
      const y = 1.6;

      // Glowing sphere as the portal core
      const isLocked = !!m.locked;
      const coreColor = isLocked ? new THREE.Color(0x4a4a52) : new THREE.Color(m.color);
      const portalMat = new THREE.MeshBasicMaterial({ color: coreColor, transparent:true, opacity: isLocked ? 0.4 : 0.85 });
      const portal = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 16), portalMat);
      portal.position.set(x, y, z);
      portal.userData = { kind:'portal', module:m, baseY:y, idx };
      scene.add(portal);

      // outer glow ring
      const glow = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.65, 32),
        new THREE.MeshBasicMaterial({ color: coreColor, transparent:true, opacity: isLocked ? 0.12 : 0.35, side:THREE.DoubleSide })
      );
      glow.position.copy(portal.position);
      glow.lookAt(camera.position);
      scene.add(glow);

      // point light at portal (dimmer if locked)
      const pl = new THREE.PointLight(coreColor.getHex(), isLocked ? 0.3 : 1.4, 6, 2);
      pl.position.set(x, y, z);
      scene.add(pl);

      // create the HTML label
      const label = document.createElement('div');
      label.className = 'portal-label' + (isLocked ? ' locked' : '');
      const labelColor = isLocked ? '#6b6b75' : m.color;
      label.innerHTML = `
        <div class="portal-icon" style="color:${labelColor}">${isLocked ? '\u26B0' : m.glyph}</div>
        <div class="portal-name" style="color:${labelColor}">${m.name}</div>
        <div class="portal-tag">${isLocked ? 'Root tier \u25B8' : m.tag}</div>
      `;
      label.addEventListener('click', () => onPortalClick && onPortalClick(m));
      labelLayer.appendChild(label);

      modulePortals.push({ mesh: portal, glow, light: pl, label, data: m, baseY: y });
    });
  }

  function addRing(x, y, z, rIn, rOut, color, opacity) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(rIn, rOut, 96),
      new THREE.MeshBasicMaterial({ color, transparent:true, opacity, side:THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, y, z);
    scene.add(ring);
  }

  function addCandle(x, y, z, flameColor = 0xffd47a) {
    const baseGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.35, 8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xe8d6a0, roughness: 0.6 });
    const candle = new THREE.Mesh(baseGeo, baseMat);
    candle.position.set(x, y + 0.18, z);
    scene.add(candle);

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 8, 6),
      new THREE.MeshBasicMaterial({ color: flameColor, transparent:true, opacity:0.95 })
    );
    flame.position.set(x, y + 0.42, z);
    flame.userData = { kind:'candleFlame', baseY: y + 0.42, phase: Math.random() * Math.PI * 2 };
    scene.add(flame);

    const cl = new THREE.PointLight(flameColor, 0.7, 3.5, 2);
    cl.position.set(x, y + 0.42, z);
    cl.userData = { phase: Math.random() * Math.PI * 2, base: 0.7 };
    candleLights.push(cl);
    scene.add(cl);
  }

  // build a glyph as a canvas-textured sprite that floats in the scene
  function makeGlyphSprite(char) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 128, 128);
    ctx.font = '700 96px "Cinzel Decorative", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(212,175,60,0.8)';
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#f5d678';
    ctx.fillText(char, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending });
    const s = new THREE.Sprite(mat);
    s.scale.set(0.7, 0.7, 0.7);
    return s;
  }

  function bindEvents() {
    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('click', onClickCanvas);
    renderer.domElement.addEventListener('mousemove', onMove);
  }

  function onResize() {
    if (!mounted) return;
    const w = stageEl.clientWidth, h = stageEl.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function onClickCanvas(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const meshes = modulePortals.map(p => p.mesh);
    const hits = raycaster.intersectObjects(meshes);
    if (hits.length && onPortalClick) {
      onPortalClick(hits[0].object.userData.module);
    }
  }

  function onMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) - 0.5;
    const ny = ((e.clientY - rect.top) / rect.height) - 0.5;
    // gentle parallax on camera
    camera.position.x += (nx * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (4.2 - ny * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 1.2, 0);
  }

  function projectToScreen(vec3) {
    const v = vec3.clone().project(camera);
    const w = stageEl.clientWidth, h = stageEl.clientHeight;
    return {
      x: (v.x * 0.5 + 0.5) * w,
      y: (-v.y * 0.5 + 0.5) * h,
      visible: v.z < 1
    };
  }

  function animate() {
    if (!mounted) return;
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // central flame flicker
    centerLight.intensity = 4.5 + Math.sin(t * 6) * 0.4 + Math.sin(t * 13) * 0.2;

    // candles flicker
    candleLights.forEach(cl => {
      cl.intensity = cl.userData.base + Math.sin(t * 5 + cl.userData.phase) * 0.15;
    });

    // portal hover bob + label position
    modulePortals.forEach((p, i) => {
      p.mesh.position.y = p.baseY + Math.sin(t * 1.2 + i) * 0.12;
      p.glow.position.copy(p.mesh.position);
      p.glow.lookAt(camera.position);
      p.light.position.copy(p.mesh.position);

      const screen = projectToScreen(p.mesh.position.clone().add(new THREE.Vector3(0, 0.9, 0)));
      p.label.style.left = screen.x + 'px';
      p.label.style.top  = screen.y + 'px';
      p.label.style.display = screen.visible ? '' : 'none';
    });

    // gentle camera orbit (very slow)
    camera.position.x += Math.sin(t * 0.05) * 0.002;

    // sky shader time
    scene.traverse(o => {
      if (o.userData && o.userData.kind === 'flame') {
        o.scale.y = 1 + Math.sin(t * 8) * 0.15;
        o.position.x = Math.sin(t * 4) * 0.03;
      }
      if (o.userData && o.userData.kind === 'candleFlame') {
        o.position.y = o.userData.baseY + Math.sin(t * 6 + o.userData.phase) * 0.02;
        o.scale.y = 1 + Math.sin(t * 7 + o.userData.phase) * 0.2;
      }
      if (o.userData && o.userData.kind === 'sky') {
        o.material.uniforms.uTime.value = t;
      }
      if (o.userData && o.userData.kind === 'glyph') {
        o.position.y = o.userData.baseY + Math.sin(t * o.userData.drift + o.userData.phase) * 0.4;
        o.material.opacity = 0.35 + Math.sin(t * 1.5 + o.userData.phase) * 0.25;
        o.material.rotation = Math.sin(t * 0.2 + o.userData.phase) * 0.3;
      }
      if (o.userData && o.userData.kind === 'smoke') {
        o.position.y = 3.2 + ((t * 0.3 + o.userData.phase) % 4);
        o.material.opacity = Math.max(0, 0.12 - ((t * 0.3 + o.userData.phase) % 4) * 0.03);
        o.lookAt(camera.position);
      }
    });

    renderer.render(scene, camera);
  }

  return { init };
})();
