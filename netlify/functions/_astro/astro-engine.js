// ============================================================
// Astro-Odu Astrology Engine
// Extracted verbatim from astro-odu.html (the live trinity tool).
// All math is unchanged — only packaging differs.
// CommonJS module — usable from any Netlify Function.
// ============================================================

const SIGNS = [
  { name: 'Aries',       glyph: '♈', element: 'Fire',  mode: 'Cardinal' },
  { name: 'Taurus',      glyph: '♉', element: 'Earth', mode: 'Fixed'    },
  { name: 'Gemini',      glyph: '♊', element: 'Air',   mode: 'Mutable'  },
  { name: 'Cancer',      glyph: '♋', element: 'Water', mode: 'Cardinal' },
  { name: 'Leo',         glyph: '♌', element: 'Fire',  mode: 'Fixed'    },
  { name: 'Virgo',       glyph: '♍', element: 'Earth', mode: 'Mutable'  },
  { name: 'Libra',       glyph: '♎', element: 'Air',   mode: 'Cardinal' },
  { name: 'Scorpio',     glyph: '♏', element: 'Water', mode: 'Fixed'    },
  { name: 'Sagittarius', glyph: '♐', element: 'Fire',  mode: 'Mutable'  },
  { name: 'Capricorn',   glyph: '♑', element: 'Earth', mode: 'Cardinal' },
  { name: 'Aquarius',    glyph: '♒', element: 'Air',   mode: 'Fixed'    },
  { name: 'Pisces',      glyph: '♓', element: 'Water', mode: 'Mutable'  }
];

const PLANET_LIST = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
const PERSONAL_PLANETS = ['Sun','Moon','Mercury','Venus','Mars'];

const ODU_NAMES = ['Ogbe','Oyeku','Iwori','Odi','Irosun','Owonrin','Obara','Okanran','Ogunda','Osa','Ika','Oturupon','Otura','Irete','Oshe','Ofun'];

const PI = Math.PI, RAD = PI / 180, DEG = 180 / PI;
const rev = a => ((a % 360) + 360) % 360;
const sind = a => Math.sin(a * RAD);
const cosd = a => Math.cos(a * RAD);
const tand = a => Math.tan(a * RAD);
const atan2d = (y, x) => Math.atan2(y, x) * DEG;

function julianDay(year, month, day, hour, minute, tzOffset) {
  const utHour = hour + minute / 60 - tzOffset;
  let y = year, m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5 + utHour / 24;
}

function solveKepler(M, e) {
  let E = M + e * DEG * sind(M) * (1 + e * cosd(M));
  for (let i = 0; i < 8; i++) {
    const dE = (E - e * DEG * sind(E) - M) / (1 - e * cosd(E));
    E -= dE;
    if (Math.abs(dE) < 0.0001) break;
  }
  return E;
}

function sunPosition(d) {
  const w = 282.9404 + 4.70935e-5 * d;
  const e = 0.016709 - 1.151e-9 * d;
  const M = rev(356.0470 + 0.9856002585 * d);
  const E = solveKepler(M, e);
  const xv = cosd(E) - e;
  const yv = Math.sqrt(1 - e * e) * sind(E);
  return { lon: rev(atan2d(yv, xv) + w), r: Math.sqrt(xv * xv + yv * yv) };
}

function moonPosition(d) {
  const N = rev(125.1228 - 0.0529538083 * d);
  const i = 5.1454, w = rev(318.0634 + 0.1643573223 * d);
  const a = 60.2666, e = 0.054900;
  const M = rev(115.3654 + 13.0649929509 * d);
  const E = solveKepler(M, e);
  const xv = a * (cosd(E) - e);
  const yv = a * Math.sqrt(1 - e * e) * sind(E);
  const v = atan2d(yv, xv);
  const xh = (cosd(N) * cosd(v + w) - sind(N) * sind(v + w) * cosd(i));
  const yh = (sind(N) * cosd(v + w) + cosd(N) * sind(v + w) * cosd(i));
  let lon = rev(atan2d(yh, xh));
  const Ms = rev(356.0470 + 0.9856002585 * d);
  const ws = 282.9404 + 4.70935e-5 * d;
  const Ls = rev(Ms + ws);
  const Lm = rev(M + w + N);
  const D = rev(Lm - Ls);
  lon += -1.274 * sind(M - 2 * D) + 0.658 * sind(2 * D) - 0.186 * sind(Ms)
    - 0.059 * sind(2 * M - 2 * D) - 0.057 * sind(M - 2 * D + Ms)
    + 0.053 * sind(M + 2 * D) + 0.046 * sind(2 * D - Ms)
    + 0.041 * sind(M - Ms) - 0.035 * sind(D) - 0.031 * sind(M + Ms);
  return rev(lon);
}

function planetPosition(planet, d) {
  if (planet === 'Pluto') {
    const P = (238.95 + 0.003968789 * d);
    return rev(238.9508 + 0.00400703 * d
      - 19.799 * sind(P) + 19.848 * cosd(P)
      + 0.897 * sind(2*P) - 4.956 * cosd(2*P)
      + 0.610 * sind(3*P) + 1.211 * cosd(3*P)
      - 0.341 * sind(4*P) - 0.190 * cosd(4*P)
      + 0.128 * sind(5*P) - 0.034 * cosd(5*P)
      - 0.038 * sind(6*P) + 0.031 * cosd(6*P));
  }
  const elements = {
    Mercury: { N: 48.3313 + 3.24587e-5 * d, i: 7.0047, w: 29.1241 + 1.01444e-5 * d, a: 0.387098, e: 0.205635, M: rev(168.6562 + 4.0923344368 * d) },
    Venus:   { N: 76.6799 + 2.46590e-5 * d, i: 3.3946, w: 54.8910 + 1.38374e-5 * d, a: 0.723330, e: 0.006773, M: rev(48.0052 + 1.6021302244 * d) },
    Mars:    { N: 49.5574 + 2.11081e-5 * d, i: 1.8497, w: 286.5016 + 2.92961e-5 * d, a: 1.523688, e: 0.093405, M: rev(18.6021 + 0.5240207766 * d) },
    Jupiter: { N: 100.4542 + 2.76854e-5 * d, i: 1.3030, w: 273.8777 + 1.64505e-5 * d, a: 5.20256, e: 0.048498, M: rev(19.8950 + 0.0830853001 * d) },
    Saturn:  { N: 113.6634 + 2.38980e-5 * d, i: 2.4886, w: 339.3939 + 2.97661e-5 * d, a: 9.55475, e: 0.055546, M: rev(316.9670 + 0.0334442282 * d) },
    Uranus:  { N: 74.0005 + 1.3978e-5 * d, i: 0.7733, w: 96.6612 + 3.0565e-5 * d, a: 19.18171, e: 0.047318, M: rev(142.5905 + 0.011725806 * d) },
    Neptune: { N: 131.7806 + 3.0173e-5 * d, i: 1.7700, w: 272.8461, a: 30.05826, e: 0.008606, M: rev(260.2471 + 0.005995147 * d) }
  };
  const el = elements[planet];
  if (!el) return 0;
  const E = solveKepler(el.M, el.e);
  const xv = el.a * (cosd(E) - el.e);
  const yv = el.a * Math.sqrt(1 - el.e * el.e) * sind(E);
  const v = atan2d(yv, xv);
  const r = Math.sqrt(xv * xv + yv * yv);
  const xh = r * (cosd(el.N) * cosd(v + el.w) - sind(el.N) * sind(v + el.w) * cosd(el.i));
  const yh = r * (sind(el.N) * cosd(v + el.w) + cosd(el.N) * sind(v + el.w) * cosd(el.i));
  const sun = sunPosition(d);
  return rev(atan2d(yh + sun.r * sind(sun.lon), xh + sun.r * cosd(sun.lon)));
}

function meanNodePosition(d) { return rev(125.0445550 - 0.05295377 * d); }

function calculateAscendant(jd, lat, lng) {
  const T = (jd - 2451545.0) / 36525;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
  gmst = rev(gmst);
  const lst = rev(gmst + lng);
  const eps = 23.4392911 - 0.0130041667 * T;
  const num = -cosd(lst);
  const den = sind(lst) * cosd(eps) + tand(lat) * sind(eps);
  const asc = rev(atan2d(num, den));
  const mc  = rev(atan2d(sind(lst), cosd(lst) * cosd(eps)));
  return { asc, mc };
}

function getSignFromLongitude(lon) {
  const idx = Math.floor(lon / 30);
  const degInSign = lon % 30;
  return {
    sign: SIGNS[idx].name, glyph: SIGNS[idx].glyph,
    element: SIGNS[idx].element, mode: SIGNS[idx].mode,
    degree: Math.floor(degInSign), minute: Math.floor((degInSign % 1) * 60),
    fullDegree: degInSign, signIndex: idx
  };
}

function getHouseFromLongitude(lon, ascLon) {
  const ascIdx = Math.floor(ascLon / 30);
  const planetIdx = Math.floor(lon / 30);
  return ((planetIdx - ascIdx + 12) % 12) + 1;
}

function calculateAspects(planets) {
  const aspects = [];
  const types = [
    { name: 'Conjunction', angle: 0,   orb: 8, category: 'unifying', symbol: '☌' },
    { name: 'Opposition',  angle: 180, orb: 8, category: 'karmic',   symbol: '☍' },
    { name: 'Square',      angle: 90,  orb: 7, category: 'karmic',   symbol: '☐' },
    { name: 'Trine',       angle: 120, orb: 7, category: 'flowing',  symbol: '△' },
    { name: 'Sextile',     angle: 60,  orb: 5, category: 'flowing',  symbol: '⚹' }
  ];
  const names = Object.keys(planets);
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      let diff = Math.abs(planets[names[i]].longitude - planets[names[j]].longitude);
      if (diff > 180) diff = 360 - diff;
      for (const t of types) {
        if (Math.abs(diff - t.angle) <= t.orb) {
          aspects.push({ p1: names[i], p2: names[j], type: t.name, category: t.category, symbol: t.symbol, orb: parseFloat(Math.abs(diff - t.angle).toFixed(2)) });
          break;
        }
      }
    }
  }
  return aspects;
}

function getMoonPhase(sunLon, moonLon) {
  const elong = rev(moonLon - sunLon);
  if (elong < 22.5  || elong >= 337.5) return { phase: 'New Moon',         direction: 'waxing',      meaning: 'planting intentions, beginnings' };
  if (elong < 67.5)                    return { phase: 'Waxing Crescent',  direction: 'waxing',      meaning: 'drawing in, building, attraction' };
  if (elong < 112.5)                   return { phase: 'First Quarter',    direction: 'waxing',      meaning: 'action, decision, momentum' };
  if (elong < 157.5)                   return { phase: 'Waxing Gibbous',   direction: 'waxing',      meaning: 'refinement, manifestation' };
  if (elong < 202.5)                   return { phase: 'Full Moon',        direction: 'culmination', meaning: 'fullness, illumination, release' };
  if (elong < 247.5)                   return { phase: 'Waning Gibbous',   direction: 'waning',      meaning: 'gratitude, dissemination' };
  if (elong < 292.5)                   return { phase: 'Last Quarter',     direction: 'waning',      meaning: 'banishing, breaking patterns' };
  return                                      { phase: 'Waning Crescent',  direction: 'waning',      meaning: 'surrender, ancestral connection' };
}

// Talking Odu — derive from progressed Ascendant degree
function deriveTalkingOdu(progressedAscLon) {
  const idx = Math.floor(progressedAscLon / 22.5) % 16;
  const elemIdx = Math.floor(progressedAscLon / 30) % 12;
  return `${ODU_NAMES[idx]}-${SIGNS[elemIdx].element}`;
}

// Returns the current moon phase for "right now" — used by the dashboard's
// Today's Channeled Snippet. Does not depend on the seeker's birth chart.
function getCurrentMoonPhase(now = new Date()) {
  const jd = julianDay(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), 0);
  const d = jd - 2451543.5;
  const sunLon = sunPosition(d).lon;
  const moonLon = moonPosition(d);
  return { ...getMoonPhase(sunLon, moonLon), sunLongitude: sunLon, moonLongitude: moonLon };
}

function calculateChart(birthData) {
  const { year, month, day, hour, minute, lat, lng, tz } = birthData;
  const jd = julianDay(year, month, day, hour, minute, tz);
  const d = jd - 2451543.5;
  const { asc, mc } = calculateAscendant(jd, lat, lng);
  const sun = sunPosition(d);
  const moonLon = moonPosition(d);
  const nodeLon = meanNodePosition(d);
  const southNodeLon = rev(nodeLon + 180);
  const planets = {
    Sun:  { longitude: sun.lon, ...getSignFromLongitude(sun.lon),  house: getHouseFromLongitude(sun.lon, asc) },
    Moon: { longitude: moonLon, ...getSignFromLongitude(moonLon),  house: getHouseFromLongitude(moonLon, asc) }
  };
  for (const p of ['Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto']) {
    const lon = planetPosition(p, d);
    planets[p] = { longitude: lon, ...getSignFromLongitude(lon), house: getHouseFromLongitude(lon, asc) };
  }
  const northNode = { longitude: nodeLon,      ...getSignFromLongitude(nodeLon),      house: getHouseFromLongitude(nodeLon, asc) };
  const southNode = { longitude: southNodeLon, ...getSignFromLongitude(southNodeLon), house: getHouseFromLongitude(southNodeLon, asc) };
  const aspects = calculateAspects(planets);
  const moonPhase = getMoonPhase(sun.lon, moonLon);
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  const ageInYears = (today - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
  const progressedASC = rev(asc + ageInYears);
  const progressedASCSign = getSignFromLongitude(progressedASC);
  const talkingOdu = deriveTalkingOdu(progressedASC);
  return {
    asc, mc,
    ascSign: getSignFromLongitude(asc),
    mcSign: getSignFromLongitude(mc),
    planets, northNode, southNode, aspects, moonPhase,
    progressedASC, progressedASCSign,
    ageInYears: Math.floor(ageInYears),
    karmicAspects: aspects.filter(a => a.category === 'karmic'),
    flowingAspects: aspects.filter(a => a.category === 'flowing'),
    birthData,
    talkingOdu
  };
}

module.exports = {
  SIGNS, PLANET_LIST, PERSONAL_PLANETS, ODU_NAMES,
  julianDay, solveKepler,
  sunPosition, moonPosition, planetPosition, meanNodePosition,
  calculateAscendant, getSignFromLongitude, getHouseFromLongitude,
  calculateAspects, getMoonPhase, getCurrentMoonPhase,
  deriveTalkingOdu, calculateChart,
  rev, sind, cosd, tand, atan2d
};
