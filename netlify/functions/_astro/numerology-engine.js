// ============================================================
// Astro-Odu Numerology Engine (Chaldean method)
// Extracted verbatim from astro-odu-numerology.html (the live trinity tool).
// All math is unchanged — only packaging differs.
// CommonJS module — usable from any Netlify Function.
// ============================================================

const CHALDEAN_VALUES = {
  A:1, I:1, J:1, Q:1, Y:1, B:2, K:2, R:2, C:3, G:3, L:3, S:3,
  D:4, M:4, T:4, E:5, H:5, N:5, X:5, U:6, V:6, W:6, O:7, Z:7, F:8, P:8
};

const VOWELS = new Set(['A','E','I','O','U','Y']);

const ORISHA_NUMBERS = [
  { num: 1, orisha: 'Eshu-Elegba', archetype: 'Gateway · Catalyst',     domain: 'The initial spark, opening, communication, Ashe',                glyph: '◉' },
  { num: 2, orisha: 'Ibeji',       archetype: 'Duality · Partnership',  domain: 'The twin force, balance, dual aspect of the cosmos',             glyph: '⊞' },
  { num: 3, orisha: 'Ogun',        archetype: 'Pathmaker · Builder',    domain: 'Iron, technology, clearing the path, civilization',              glyph: '⚒' },
  { num: 4, orisha: 'Osoosi',      archetype: 'Tracker · Stability',    domain: 'The hunter, focused direction, foundation of the pyramid',       glyph: '⫯' },
  { num: 5, orisha: 'Oshun',       archetype: 'Diplomat · Sensualist',  domain: 'Sensuality, fine arts, love, money, the senses',                 glyph: '✦' },
  { num: 6, orisha: 'Shango',      archetype: 'King · Transformer',     domain: 'Royal harmony, justice, transmuting base into pure',             glyph: '⚡' },
  { num: 7, orisha: 'Yemoja',      archetype: 'Cosmic Mother · Mystic', domain: 'Ocean depths, mother of all, amniotic universe',                 glyph: '◯' },
  { num: 8, orisha: 'Obatala',     archetype: 'Architect · Law',        domain: "Iwa-pele, ethical purity, ritual whiteness, moulder of form",    glyph: '◈' },
  { num: 9, orisha: 'Oya',         archetype: 'Tempest · Transition',   domain: 'Storms, cemetery, end of cycle, rebirth',                        glyph: '❋' }
];

const MASTER_NUMBERS = {
  11: { name: 'Ancestral Channel',          orisha: 'Eshu (deeper)',    meaning: 'You are a vessel — the ancestors speak through your tongue. The veil thins around you. Test: do not be possessed by the message; remain the vessel, not the voice.' },
  22: { name: "Master Builder of Ma'at",    orisha: 'Obatala (master)', meaning: 'Architect of order on Earth. The temple is yours to raise. Build sanctuaries, build systems that hold across generations.' },
  33: { name: 'Master Healer-Sanctuary',    orisha: 'Yemoja (master)',  meaning: "The rarest channel. Healer of souls, sanctuary in the body. Yemoja's deep waters move through you. Tend yourself first, or you cannot tend others." }
};

const KARMIC_NUMBERS = {
  13: { name: 'Karmic — Upheaval',            meaning: 'Power through transformation. What dies makes way for what is true. Misused authority in another life requires labor in this one.' },
  14: { name: 'Karmic — Temptation',          meaning: 'Constant change. Guard against moral compromise, sensual excess, broken promises. Past freedoms misused.' },
  16: { name: 'Karmic — The Tower',           meaning: 'Sudden fall as teaching. Build only on truth, never on illusion. Past pride or false structures must collapse.' },
  19: { name: 'Karmic — Sun Through Cloud',   meaning: 'Success carries ancestral debt. Honor the lineage openly. Past abuse of power requires service in this incarnation.' },
  26: { name: 'Karmic — Partnership Warning', meaning: 'Beware false allies and hidden agendas. Past betrayal, in either direction, asks for discernment now.' }
};

function reduceWithCompound(sum) {
  if (sum === 0) return { final: 0, compound: null, karmic: false, master: false };
  if (sum === 11 || sum === 22 || sum === 33) return { final: sum, compound: null, karmic: false, master: true };
  if (sum <= 9) return { final: sum, compound: null, karmic: false, master: false };
  const isKarmic = [13, 14, 16, 19, 26].includes(sum);
  const compound = sum;
  let n = sum;
  while (n > 9) {
    if (n === 11 || n === 22 || n === 33) return { final: n, compound: sum > n ? sum : null, karmic: isKarmic, master: true };
    n = String(n).split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return { final: n, compound, karmic: isKarmic, master: false };
}

function reduceSimple(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = String(n).split('').map(Number).reduce((a, b) => a + b, 0);
  return n;
}

function nameValues(name) {
  const words = (name || '').toUpperCase().trim().split(/\s+/).filter(Boolean);
  const wordData = words.map(w => {
    const cleaned = w.replace(/[^A-Z]/g, '');
    return cleaned.split('').map(ch => ({ letter: ch, value: CHALDEAN_VALUES[ch] || 0, isVowel: VOWELS.has(ch) }));
  });
  const flat = wordData.flat();
  const vowelSum     = flat.filter(l =>  l.isVowel).reduce((a, l) => a + l.value, 0);
  const consonantSum = flat.filter(l => !l.isVowel).reduce((a, l) => a + l.value, 0);
  return {
    name: words.join(' '), words: wordData,
    soulUrge:    reduceWithCompound(vowelSum),
    personality: reduceWithCompound(consonantSum),
    expression:  reduceWithCompound(vowelSum + consonantSum)
  };
}

function calcLifePath(year, month, day) {
  const sum = `${month}${day}${year}`.split('').map(Number).reduce((a, b) => a + b, 0);
  return reduceWithCompound(sum);
}

function calcBirthday(day) { return reduceWithCompound(day); }

function calcPersonalYear(month, day, currentYear = new Date().getFullYear()) {
  const sum = `${month}${day}${currentYear}`.split('').map(Number).reduce((a, b) => a + b, 0);
  return { ...reduceWithCompound(sum), forYear: currentYear };
}

function calcPinnaclesChallenges(year, month, day, lifePathFinal) {
  const m = reduceSimple(month), dr = reduceSimple(day), yr = reduceSimple(year);
  const p1 = reduceWithCompound(m + dr);
  const p2 = reduceWithCompound(dr + yr);
  const p3 = reduceWithCompound((p1.master ? p1.final : reduceSimple(p1.final)) + (p2.master ? p2.final : reduceSimple(p2.final)));
  const p4 = reduceWithCompound(m + yr);
  const c1 = Math.abs(m - dr), c2 = Math.abs(dr - yr), c3 = Math.abs(c1 - c2), c4 = Math.abs(m - yr);
  const lpRed = lifePathFinal > 9 ? reduceSimple(lifePathFinal) : lifePathFinal;
  const firstAge = 36 - lpRed;
  return {
    pinnacles: [
      { ...p1, ageStart: 0,             ageEnd: firstAge,      name: 'First Pinnacle' },
      { ...p2, ageStart: firstAge + 1,  ageEnd: firstAge + 9,  name: 'Second Pinnacle' },
      { ...p3, ageStart: firstAge + 10, ageEnd: firstAge + 18, name: 'Third Pinnacle' },
      { ...p4, ageStart: firstAge + 19, ageEnd: 99,            name: 'Fourth Pinnacle' }
    ],
    challenges: [
      { value: c1, name: 'First Challenge' },
      { value: c2, name: 'Second Challenge' },
      { value: c3, name: 'Third Challenge' },
      { value: c4, name: 'Fourth Challenge' }
    ]
  };
}

// Look up the Orisha governing a number. Master numbers fall back to their
// reduced root (11→2 Ibeji, 22→4 Osoosi, 33→6 Shango) for governance, but
// the Master designation is preserved on the source number's metadata.
function getOrishaForNumber(num) {
  const root = num === 11 ? 2 : num === 22 ? 4 : num === 33 ? 6 : num;
  const ref = ORISHA_NUMBERS.find(o => o.num === root);
  if (!ref) return null;
  return {
    number: num,
    orisha: ref.orisha,
    archetype: ref.archetype,
    domain: ref.domain,
    glyph: ref.glyph,
    isMaster: !!MASTER_NUMBERS[num],
    masterTitle: MASTER_NUMBERS[num] ? MASTER_NUMBERS[num].name : null
  };
}

module.exports = {
  CHALDEAN_VALUES, VOWELS, ORISHA_NUMBERS, MASTER_NUMBERS, KARMIC_NUMBERS,
  reduceWithCompound, reduceSimple, nameValues,
  calcLifePath, calcBirthday, calcPersonalYear, calcPinnaclesChallenges,
  getOrishaForNumber
};
