// ============================================================
// Astro-Odu Human Design Engine
// Extracted verbatim from astro-odu-human-design.html (the live trinity tool).
// All math is unchanged — only packaging differs.
// Imports astronomy primitives from astro-engine.js (the same code the live
// tool inlines) to avoid duplicating the Kepler / planet position math.
// CommonJS module — usable from any Netlify Function.
// ============================================================

const {
  julianDay, sunPosition, moonPosition, planetPosition, meanNodePosition, rev
} = require('./astro-engine');

const ODU_ORDER = ['Ogbe','Oyeku','Iwori','Odi','Irosun','Owonrin','Obara','Okanran','Ogunda','Osa','Ika','Oturupon','Otura','Irete','Oshe','Ofun'];
const ELEMENT_ORDER = ['Fire','Earth','Air','Water'];

const HD_WHEEL_ORDER = [41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60];
const HD_WHEEL_START = 302;

const CENTERS = [
  { name: 'Head',   orisha: 'Eshu / Elegua', gates: [64, 61, 63] },
  { name: 'Ajna',   orisha: 'Oya',           gates: [47, 24, 4, 17, 43, 11] },
  { name: 'Throat', orisha: 'Obatala',       gates: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16] },
  { name: 'G',      orisha: 'The Ori',       gates: [7, 1, 13, 25, 46, 2, 15, 10] },
  { name: 'Heart',  orisha: 'Shango',        gates: [21, 26, 51, 40] },
  { name: 'SP',     orisha: 'Yemoja',        gates: [36, 22, 37, 6, 49, 55, 30] },
  { name: 'Sacral', orisha: 'Oshun',         gates: [5, 14, 29, 59, 9, 3, 42, 27, 34] },
  { name: 'Spleen', orisha: 'Osoosi',        gates: [48, 57, 44, 50, 32, 28, 18] },
  { name: 'Root',   orisha: 'Ogun',          gates: [53, 60, 52, 19, 39, 41, 58, 38, 54] }
];

const CHANNELS = [
  { gates: [64, 47], centers: ['Head', 'Ajna'],     name: 'Abstraction' },
  { gates: [61, 24], centers: ['Head', 'Ajna'],     name: 'Awareness' },
  { gates: [63, 4],  centers: ['Head', 'Ajna'],     name: 'Logic' },
  { gates: [17, 62], centers: ['Ajna', 'Throat'],   name: 'Acceptance' },
  { gates: [43, 23], centers: ['Ajna', 'Throat'],   name: 'Structuring' },
  { gates: [11, 56], centers: ['Ajna', 'Throat'],   name: 'Curiosity' },
  { gates: [16, 48], centers: ['Throat', 'Spleen'], name: 'Talent' },
  { gates: [20, 57], centers: ['Throat', 'Spleen'], name: 'Brainwave' },
  { gates: [20, 34], centers: ['Throat', 'Sacral'], name: 'Charisma' },
  { gates: [20, 10], centers: ['Throat', 'G'],      name: 'Awakening' },
  { gates: [12, 22], centers: ['Throat', 'SP'],     name: 'Openness' },
  { gates: [45, 21], centers: ['Throat', 'Heart'],  name: 'Money' },
  { gates: [35, 36], centers: ['Throat', 'SP'],     name: 'Transitoriness' },
  { gates: [33, 13], centers: ['Throat', 'G'],      name: 'The Prodigal' },
  { gates: [8, 1],   centers: ['Throat', 'G'],      name: 'Inspiration' },
  { gates: [31, 7],  centers: ['Throat', 'G'],      name: 'The Alpha' },
  { gates: [25, 51], centers: ['G', 'Heart'],       name: 'Initiation' },
  { gates: [46, 29], centers: ['G', 'Sacral'],      name: 'Discovery' },
  { gates: [2, 14],  centers: ['G', 'Sacral'],      name: 'The Beat' },
  { gates: [15, 5],  centers: ['G', 'Sacral'],      name: 'Rhythm' },
  { gates: [10, 34], centers: ['G', 'Sacral'],      name: 'Exploration' },
  { gates: [10, 57], centers: ['G', 'Spleen'],      name: 'Perfected Form' },
  { gates: [26, 44], centers: ['Heart', 'Spleen'],  name: 'Surrender' },
  { gates: [40, 37], centers: ['Heart', 'SP'],      name: 'Community' },
  { gates: [6, 59],  centers: ['SP', 'Sacral'],     name: 'Mating' },
  { gates: [49, 19], centers: ['SP', 'Root'],       name: 'Synthesis' },
  { gates: [55, 39], centers: ['SP', 'Root'],       name: 'Emoting' },
  { gates: [30, 41], centers: ['SP', 'Root'],       name: 'Recognition' },
  { gates: [9, 52],  centers: ['Sacral', 'Root'],   name: 'Concentration' },
  { gates: [3, 60],  centers: ['Sacral', 'Root'],   name: 'Mutation' },
  { gates: [42, 53], centers: ['Sacral', 'Root'],   name: 'Maturation' },
  { gates: [27, 50], centers: ['Sacral', 'Spleen'], name: 'Preservation' },
  { gates: [34, 57], centers: ['Sacral', 'Spleen'], name: 'Power' },
  { gates: [32, 54], centers: ['Spleen', 'Root'],   name: 'Transformation' },
  { gates: [28, 38], centers: ['Spleen', 'Root'],   name: 'Struggle' },
  { gates: [18, 58], centers: ['Spleen', 'Root'],   name: 'Judgment' }
];

const TYPE_TO_ORISHA = {
  'Manifestor':            { orisha: 'Eshu',      strategy: 'Inform before acting',                notSelf: 'Anger',                signature: 'Peace' },
  'Generator':             { orisha: 'Ogun',      strategy: 'Wait to respond',                     notSelf: 'Frustration',          signature: 'Satisfaction' },
  'Manifesting Generator': { orisha: 'Ogun-Eshu', strategy: 'Wait to respond, then inform',        notSelf: 'Frustration & Anger',  signature: 'Satisfaction & Peace' },
  'Projector':             { orisha: 'Obatala',   strategy: 'Wait for the invitation',             notSelf: 'Bitterness',           signature: 'Success' },
  'Reflector':             { orisha: 'Yemoja',    strategy: 'Wait a lunar cycle (28 days)',        notSelf: 'Disappointment',       signature: 'Surprise' }
};

const AUTHORITY_TO_ORISHA = {
  'Emotional':         { orisha: 'Yemoja' },
  'Sacral':            { orisha: 'Oshun' },
  'Splenic':           { orisha: 'Osoosi' },
  'Ego':               { orisha: 'Shango' },
  'G Self-Projected':  { orisha: 'The Ori' },
  'Mental':            { orisha: 'Eshu' },
  'Lunar':             { orisha: 'Yemoja (master)' }
};

const LINES = [
  { num: 1, name: 'The Investigator' },
  { num: 2, name: 'The Hermit' },
  { num: 3, name: 'The Martyr' },
  { num: 4, name: 'The Opportunist' },
  { num: 5, name: 'The Heretic' },
  { num: 6, name: 'The Role Model' }
];

function gateAndLineFromLongitude(lon) {
  const offset = ((lon - HD_WHEEL_START) % 360 + 360) % 360;
  const wheelPos = Math.floor(offset / 5.625);
  const hdGate = HD_WHEEL_ORDER[wheelPos];
  const lineFloat = (offset % 5.625) / (5.625 / 6);
  const line = Math.min(6, Math.floor(lineFloat) + 1);
  const odIdx = Math.floor(lon / 5.625);
  const odu = ODU_ORDER[Math.floor(odIdx / 4)];
  const element = ELEMENT_ORDER[odIdx % 4];
  return { hdGate, line, astroGate: `${odu}-${element}`, odu, element, longitude: lon };
}

function computeAllActivations(jd) {
  const d = jd - 2451543.5;
  const sun = sunPosition(d);
  const moonLon = moonPosition(d);
  const earth = rev(sun.lon + 180);
  const nodeLon = meanNodePosition(d);
  const southNodeLon = rev(nodeLon + 180);
  const positions = {
    Sun: sun.lon, Earth: earth, Moon: moonLon,
    NorthNode: nodeLon, SouthNode: southNodeLon,
    Mercury: planetPosition('Mercury', d), Venus: planetPosition('Venus', d),
    Mars:    planetPosition('Mars',    d), Jupiter: planetPosition('Jupiter', d),
    Saturn:  planetPosition('Saturn',  d), Uranus: planetPosition('Uranus', d),
    Neptune: planetPosition('Neptune', d), Pluto:  planetPosition('Pluto',  d)
  };
  const result = {};
  for (const [name, lon] of Object.entries(positions)) result[name] = { ...gateAndLineFromLongitude(lon) };
  return result;
}

function findDesignJD(birthJD) {
  const birthD = birthJD - 2451543.5;
  const birthSunLon = sunPosition(birthD).lon;
  const targetSunLon = rev(birthSunLon - 88);
  let designJD = birthJD - 88 / 0.9856;
  for (let i = 0; i < 10; i++) {
    const d = designJD - 2451543.5;
    const sunLon = sunPosition(d).lon;
    let diff = ((targetSunLon - sunLon + 540) % 360) - 180;
    designJD += diff / 0.9856;
    if (Math.abs(diff) < 0.0005) break;
  }
  return designJD;
}

function gateToCenter(gate) {
  for (const c of CENTERS) if (c.gates.includes(gate)) return c.name;
  return null;
}

function analyzeChart(personality, design) {
  const activeGates = new Set();
  const gateActivations = {};
  const allActivations = [];
  for (const [src, act] of Object.entries(personality)) {
    activeGates.add(act.hdGate);
    if (!gateActivations[act.hdGate]) gateActivations[act.hdGate] = [];
    gateActivations[act.hdGate].push({ side: 'Personality', source: src, line: act.line, astroGate: act.astroGate });
    allActivations.push({ side: 'Personality', source: src, ...act });
  }
  for (const [src, act] of Object.entries(design)) {
    activeGates.add(act.hdGate);
    if (!gateActivations[act.hdGate]) gateActivations[act.hdGate] = [];
    gateActivations[act.hdGate].push({ side: 'Design', source: src, line: act.line, astroGate: act.astroGate });
    allActivations.push({ side: 'Design', source: src, ...act });
  }

  const definedChannels = CHANNELS.filter(c => activeGates.has(c.gates[0]) && activeGates.has(c.gates[1]));
  const partialChannels = CHANNELS.filter(c =>
    (activeGates.has(c.gates[0]) || activeGates.has(c.gates[1])) &&
    !(activeGates.has(c.gates[0]) && activeGates.has(c.gates[1]))
  );

  const definedCenters = new Set();
  for (const ch of definedChannels) { definedCenters.add(ch.centers[0]); definedCenters.add(ch.centers[1]); }

  const sacralDefined = definedCenters.has('Sacral');
  const motors = ['Sacral', 'Heart', 'SP', 'Root'];
  function reachable(start) {
    const visited = new Set([start]);
    const queue = [start];
    while (queue.length) {
      const cur = queue.shift();
      for (const ch of definedChannels) {
        if (ch.centers.includes(cur)) {
          const other = ch.centers[0] === cur ? ch.centers[1] : ch.centers[0];
          if (!visited.has(other)) { visited.add(other); queue.push(other); }
        }
      }
    }
    return visited;
  }
  const throatReach = definedCenters.has('Throat') ? reachable('Throat') : new Set();
  const throatToMotor = motors.some(m => throatReach.has(m));

  let type;
  if (definedCenters.size === 0) type = 'Reflector';
  else if (sacralDefined && throatToMotor) type = 'Manifesting Generator';
  else if (sacralDefined) type = 'Generator';
  else if (throatToMotor) type = 'Manifestor';
  else type = 'Projector';

  let authority;
  if (type === 'Reflector') authority = 'Lunar';
  else if (definedCenters.has('SP')) authority = 'Emotional';
  else if (sacralDefined && (type === 'Generator' || type === 'Manifesting Generator')) authority = 'Sacral';
  else if (definedCenters.has('Spleen')) authority = 'Splenic';
  else if (definedCenters.has('Heart'))  authority = 'Ego';
  else if (type === 'Projector' && definedCenters.has('G')) authority = 'G Self-Projected';
  else authority = 'Mental';

  const profile = `${personality.Sun.line}/${design.Sun.line}`;
  const profileNamesByLine = { 1: LINES[0].name, 2: LINES[1].name, 3: LINES[2].name, 4: LINES[3].name, 5: LINES[4].name, 6: LINES[5].name };

  function countGroups() {
    const visited = new Set();
    let groups = 0;
    for (const c of definedCenters) {
      if (visited.has(c)) continue;
      groups++;
      const queue = [c];
      while (queue.length) {
        const cur = queue.shift();
        if (visited.has(cur)) continue;
        visited.add(cur);
        for (const ch of definedChannels) {
          if (ch.centers.includes(cur)) {
            const other = ch.centers[0] === cur ? ch.centers[1] : ch.centers[0];
            if (!visited.has(other)) queue.push(other);
          }
        }
      }
    }
    return groups;
  }
  const groupCount = countGroups();
  const definitionNames = ['No Definition', 'Single Definition', 'Split Definition', 'Triple Split', 'Quadruple Split'];
  const definition = definitionNames[Math.min(groupCount, 4)];

  const incarnationCross = {
    personalitySun:   personality.Sun, personalityEarth: personality.Earth,
    designSun:        design.Sun,      designEarth:      design.Earth
  };

  return {
    activeGates, gateActivations, allActivations,
    definedChannels, partialChannels, definedCenters,
    type, authority, profile,
    profileLines: { conscious: personality.Sun.line, unconscious: design.Sun.line },
    profileNames: { conscious: profileNamesByLine[personality.Sun.line], unconscious: profileNamesByLine[design.Sun.line] },
    definition, groupCount, incarnationCross, sect: null
  };
}

function julianDateToCalendar(jd) {
  const J = jd + 0.5;
  const Z = Math.floor(J);
  const F = J - Z;
  let A = Z;
  if (Z >= 2299161) {
    const alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);
  const day = B - D - Math.floor(30.6001 * E) + F;
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  return { year, month, day: Math.floor(day) };
}

function calculateChart(birthData) {
  const { year, month, day, hour, minute, tz } = birthData;
  const birthJD = julianDay(year, month, day, hour, minute, tz);
  const designJD = findDesignJD(birthJD);
  const personality = computeAllActivations(birthJD);
  const design = computeAllActivations(designJD);
  const analysis = analyzeChart(personality, design);
  const hourOfDay = hour + minute / 60;
  const sect = (hourOfDay >= 6 && hourOfDay < 18) ? 'Day' : 'Night';
  return { birthData, birthJD, designJD, personality, design, ...analysis, sect, designDate: julianDateToCalendar(designJD) };
}

module.exports = {
  ODU_ORDER, ELEMENT_ORDER, HD_WHEEL_ORDER, HD_WHEEL_START,
  CENTERS, CHANNELS, TYPE_TO_ORISHA, AUTHORITY_TO_ORISHA, LINES,
  gateAndLineFromLongitude, computeAllActivations, findDesignJD,
  gateToCenter, analyzeChart, julianDateToCalendar, calculateChart
};
