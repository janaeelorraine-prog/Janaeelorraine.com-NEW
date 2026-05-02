// ============================================================
// POST /api/trinity-human-design
// Body: { userEmail, chart, part:1|2|3|4 }
// ============================================================

const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, checkAccess, callClaude, saveReading } = require('./_trinity');

const SYSTEM_PROMPT = `You are Astro-Odu Human Design — sister system to Astro-Odu astrology and Astro-Odu Numerology — Janaee Lorraine Sharp's sovereign synthesis reading the body's design through Yoruba/Ifa cosmology, Kemetic natural law, and Hoodoo spiritual technology.

THE COSMOLOGY (shared):
• "Everything is everything" — interconnected continuum
• Ma'at = universal order; Iwa-pele = balanced character
• The Ori (inner head) governs all destiny
• Sankofa: reach back to fetch ancestral wisdom

THE FRAMEWORK:
• Two timestamps: Personality (birth, conscious) and Design (88 days before birth, unconscious, ancestral inheritance)
• 64 Gates re-rooted to 16 Major Odu × 4 elemental quadrants. Each Gate named "Odu-Element". 16 Odu: Ogbe, Oyeku, Iwori, Odi, Irosun, Owonrin, Obara, Okanran, Ogunda, Osa, Ika, Oturupon, Otura, Irete, Oshe, Ofun.
• 9 Centers, each governed by an Orisha:
  Head — Eshu/Elegua | Ajna — Oya | Throat — Obatala | G — The Ori
  Heart — Shango | Solar Plexus — Yemoja | Sacral — Oshun | Spleen — Osoosi | Root — Ogun
• 5 Types: Manifestor (Eshu) | Generator (Ogun) | Manifesting Generator (Ogun-Eshu) | Projector (Obatala) | Reflector (Yemoja master)
• Authorities: Emotional=Yemoja, Sacral=Oshun, Splenic=Osoosi, Ego=Shango, G Self-Projected=Ori, Mental=Eshu, Lunar=Yemoja master
• Profile: 2 lines — conscious Personality Sun line / unconscious Design Sun line
• Lines: 1 Investigator, 2 Hermit, 3 Martyr, 4 Opportunist, 5 Heretic, 6 Role Model
• Incarnation Cross: 4 gates (Pers Sun + Pers Earth + Design Sun + Design Earth) = soul's specific mission

VOICE — channeled, prophetic:
- Speak directly to the seeker
- The body is sacred technology, a living altar
- Reference Orisha by name as living forces
- Distinguish Personality (conscious) from Design (ancestral body inheritance)
- When citing a gate, use the Astro-Odu Odu-Element name first

Always return ONLY valid JSON. No preamble. No markdown fences.`;

const TYPE_TO_ORISHA = {
  'Manifestor': { orisha: 'Eshu', strategy: 'Inform before acting', notSelf: 'Anger', signature: 'Peace' },
  'Generator': { orisha: 'Ogun', strategy: 'Wait to respond', notSelf: 'Frustration', signature: 'Satisfaction' },
  'Manifesting Generator': { orisha: 'Ogun-Eshu', strategy: 'Wait to respond, then inform', notSelf: 'Frustration & Anger', signature: 'Satisfaction & Peace' },
  'Projector': { orisha: 'Obatala', strategy: 'Wait for the invitation', notSelf: 'Bitterness', signature: 'Success' },
  'Reflector': { orisha: 'Yemoja', strategy: 'Wait a lunar cycle (28 days)', notSelf: 'Disappointment', signature: 'Surprise' }
};
const AUTHORITY_TO_ORISHA = {
  'Emotional': 'Yemoja', 'Sacral': 'Oshun', 'Splenic': 'Osoosi', 'Ego': 'Shango',
  'G Self-Projected': 'The Ori', 'Mental': 'Eshu', 'Lunar': 'Yemoja (master)'
};

function chartSummary(chart) {
  const lines = [];
  const b = chart.birthData;
  if (b) lines.push(`Born ${b.year}-${String(b.month).padStart(2,'0')}-${String(b.day).padStart(2,'0')} ${String(b.hour).padStart(2,'0')}:${String(b.minute).padStart(2,'0')}`);
  if (chart.designDate) {
    const d = chart.designDate;
    lines.push(`Design (88° before): ${d.year}-${String(d.month).padStart(2,'0')}-${String(d.day).padStart(2,'0')}`);
  }
  if (chart.sect) lines.push(`Sect: ${chart.sect} chart`);
  if (chart.type) {
    const t = TYPE_TO_ORISHA[chart.type] || {};
    lines.push(`TYPE: ${chart.type} (${t.orisha || ''})`);
    lines.push(`STRATEGY: ${t.strategy || ''}`);
    lines.push(`NOT-SELF: ${t.notSelf} | TRUE: ${t.signature}`);
  }
  if (chart.authority) lines.push(`AUTHORITY: ${chart.authority} (${AUTHORITY_TO_ORISHA[chart.authority] || ''})`);
  if (chart.profile)   lines.push(`PROFILE: ${chart.profile} ${chart.profileNames?.conscious || ''} / ${chart.profileNames?.unconscious || ''}`);
  if (chart.definition) lines.push(`DEFINITION: ${chart.definition} (${chart.groupCount} group${chart.groupCount !== 1 ? 's' : ''})`);
  if (chart.definedCenters) lines.push(`DEFINED CENTERS: ${[...chart.definedCenters].join(', ') || 'none'}`);
  if (chart.definedChannels) lines.push(`DEFINED CHANNELS: ${chart.definedChannels.map(c => c.name).join(', ') || 'none'}`);
  if (chart.personality) {
    lines.push('PERSONALITY ACTIVATIONS:');
    for (const [src, a] of Object.entries(chart.personality)) lines.push(`  ${src}: ${a.astroGate} (HD ${a.hdGate}.${a.line})`);
  }
  if (chart.design) {
    lines.push('DESIGN ACTIVATIONS:');
    for (const [src, a] of Object.entries(chart.design)) lines.push(`  ${src}: ${a.astroGate} (HD ${a.hdGate}.${a.line})`);
  }
  if (chart.incarnationCross) {
    const ic = chart.incarnationCross;
    lines.push('INCARNATION CROSS:');
    lines.push(`  P Sun: ${ic.personalitySun.astroGate} (HD ${ic.personalitySun.hdGate}.${ic.personalitySun.line})`);
    lines.push(`  P Earth: ${ic.personalityEarth.astroGate} (HD ${ic.personalityEarth.hdGate}.${ic.personalityEarth.line})`);
    lines.push(`  D Sun: ${ic.designSun.astroGate} (HD ${ic.designSun.hdGate}.${ic.designSun.line})`);
    lines.push(`  D Earth: ${ic.designEarth.astroGate} (HD ${ic.designEarth.hdGate}.${ic.designEarth.line})`);
  }
  return lines.join('\n');
}

const PART_PROMPTS = {
  1: (s, c) => `${s}\n\nReturn ONLY this JSON:\n{\n  "body_speaks": "180-220 words. Open the reading. Body as living altar — frozen at the Djet moment. Dual recording: Personality (conscious) and Design (88 days before, ancestral inheritance). Channeled, prophetic.",\n  "type_and_strategy": "220-260 words. Seeker is ${c.type}. The sacred mechanism of how this body works. Strategy. True signature vs Not-Self.",\n  "authority": "200-240 words. Authority is ${c.authority}. The sacred decision seat. How to listen, wait, trust. Warn against using head/mind."\n}`,
  2: (s, c) => `${s}\n\nReturn ONLY this JSON:\n{\n  "profile": "200-240 words. Profile ${c.profile}: ${c.profileNames?.conscious || ''} (conscious) over ${c.profileNames?.unconscious || ''} (unconscious). Soul's chosen way of walking.",\n  "defined_centers": "200-240 words. Defined centers — Orisha calibrated and consistent. Reliability. Gift and responsibility of each defined Orisha.",\n  "open_centers": "240-280 words. Open centers — permeable, conditioning portals. Wisdom-portals AND conditioning-traps. Speak to 2-3 most significant."\n}`,
  3: (s, c) => `${s}\n\nReturn ONLY this JSON:\n{\n  "channels": "240-280 words. Defined channels are Astro-Odu rivers between Orisha seats. Read 2-4 most significant prophetically.",\n  "active_gates": "240-280 words. Read 4-6 most significant active gates by their Astro-Odu Odu-Element names. Reference center (Orisha) and Personality vs Design.",\n  "definition": "200-240 words. Definition: ${c.definition}. Spiritual coherence type — whether Orisha forces speak together or in separate streams needing integration."\n}`,
  4: (s, c) => `${s}\n\nReturn ONLY this JSON:\n{\n  "incarnation_cross": "260-300 words. Incarnation Cross — soul's specific mission, the 4-gate signature. Synthesize into one unified mission statement. Channeled, prophetic.",\n  "living_your_design": "200-240 words. Practical guidance for daily Iwa-pele aligned with this design. Reference Type strategy, Authority, Profile. 2-3 daily practices.",\n  "sankofa": "180-220 words. Closing benediction. Reach back — Design side is ancestral inheritance. Specific Sankofa practice tied to Type Orisha and Authority Orisha. Seal."\n}`
};

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');

  const { userEmail, chart, part } = body;
  if (!userEmail) return fail('Authentication required', 401);
  if (!chart)     return fail('Chart data required');
  if (!part || !PART_PROMPTS[part]) return fail('Invalid part');

  const sb = sbClient();

  if (part === 1) {
    const access = await checkAccess(sb, userEmail, 'human-design');
    if (!access.ok) return fail(access.error, access.status || 403);
  }

  try {
    const summary = chartSummary(chart);
    const prompt = PART_PROMPTS[part](summary, chart);
    const result = await callClaude(SYSTEM_PROMPT, prompt, 1500);

    if (part === 4) {
      await saveReading(sb, {
        userEmail,
        tool: 'human-design',
        inputs: chart.birthData || null,
        chart,
        output: { ...(chart.allParts || {}), part4: result },
        hdType: chart.type || null
      });
    }

    return ok(result);
  } catch (err) {
    console.error('Human Design error:', err);
    return fail(err.message || 'Reading failed', 500);
  }
};
