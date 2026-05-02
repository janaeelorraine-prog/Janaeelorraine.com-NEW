// ============================================================
// POST /api/trinity-numerology
// Body: { userEmail, chart, part:1|2|3|4 }
// ============================================================

const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, checkAccess, callClaude, saveReading } = require('./_trinity');

const SYSTEM_PROMPT = `You are Astro-Odu Numerology — sister to Astro-Odu astrology — Janaee Lorraine Sharp's sovereign synthesis. You read the numbers (Chaldean + Pythagorean) through Yoruba/Ifa cosmology, Kemetic natural law, and Hoodoo spiritual technology.

THE COSMOLOGY (shared):
• "Everything is everything" — interconnected continuum
• Ma'at = universal order; Iwa-pele = balanced character
• The Ori (inner head) governs all destiny
• Sankofa: reach back

THE NUMBERS as Orisha:
1=Eshu-Elegba (gateway, catalyst), 2=Ibeji (twin, balance), 3=Ogun (pathmaker, iron), 4=Osoosi (tracker, foundation), 5=Oshun (sensual, diplomat), 6=Shango (king, transformer), 7=Yemoja (cosmic mother), 8=Obatala (architect, Iwa-pele), 9=Oya (tempest, transition).

MASTER NUMBERS: 11=Ancestral Channel (Eshu deeper), 22=Master Builder of Ma'at (Obatala master), 33=Master Healer-Sanctuary (Yemoja master).

KARMIC NUMBERS (debts to repay): 13, 14, 16, 19, 26 — each carries its specific past-life lesson.

VOICE — channeled, prophetic:
- Speak directly to the seeker
- Numbers are not abstractions; they are the proverbial Odu the soul came to study
- Reference Orisha by name as living forces
- Distinguish core (Life Path, Expression, Soul Urge, Personality, Birthday) from cycles (Personal Year, Pinnacles, Challenges)

Always return ONLY valid JSON. No preamble. No markdown fences.`;

function chartSummary(chart) {
  const lines = [];
  if (chart.fullName) lines.push(`Name: ${chart.fullName}`);
  if (chart.dob) lines.push(`Born: ${chart.dob}`);
  if (chart.core) {
    lines.push('CORE NUMBERS:');
    for (const [k, v] of Object.entries(chart.core)) {
      lines.push(`  ${k}: ${v.final}${v.compound ? ` (compound ${v.compound})` : ''}${v.master ? ' MASTER' : ''}${v.karmic ? ' KARMIC' : ''}`);
    }
  }
  if (chart.cycles) {
    lines.push('CYCLES:');
    for (const [k, v] of Object.entries(chart.cycles)) {
      if (Array.isArray(v)) lines.push(`  ${k}: ${v.join(', ')}`);
      else lines.push(`  ${k}: ${v}`);
    }
  }
  if (chart.karmicLessons) lines.push(`Karmic Lessons (missing letters): ${chart.karmicLessons.join(', ') || 'none'}`);
  if (chart.hiddenPassion) lines.push(`Hidden Passion: ${chart.hiddenPassion}`);
  return lines.join('\n');
}

const PART_PROMPTS = {
  1: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "opening": "200-240 words. Open the reading. Numbers as the proverbial Odu the soul studies. Name what's about to be unveiled.",\n  "life_path": "260-300 words. Life Path is the script — the path the soul came to walk. Read its number as Orisha. Reference compound number meaning if present. Reference karmic or master designation if applicable.",\n  "expression": "240-280 words. Expression / Destiny number — the gift the soul came to give the world. The full-name calculation. Read as Orisha-shaped vocation."\n}`,
  2: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "soul_urge": "240-280 words. Soul Urge / Heart's Desire — what the heart secretly aches for. The vowels-only calculation. Read prophetically.",\n  "personality": "220-260 words. Personality — the masque others meet first. The consonants-only calculation. How the world reads them before they speak.",\n  "birthday": "200-240 words. Birthday number — the gift packed in the day itself. The unique Odu-imprint of arrival."\n}`,
  3: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "personal_year": "240-280 words. Current Personal Year cycle. What this year is teaching, what it is asking for. Specific guidance for the months ahead.",\n  "pinnacles_challenges": "260-300 words. The four Pinnacles (life chapters) and four Challenges (the lessons inside each). Read the current Pinnacle and current Challenge most directly.",\n  "karmic_pattern": "220-260 words. Karmic lessons (missing letters in the name) and Hidden Passion (most-frequent letter). What the soul has come to study and what it can't help expressing."\n}`,
  4: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "synthesis": "260-300 words. Bring all the numbers together as one Odu portrait. The dominant Orisha pattern. The integrated mission.",\n  "iwa_pele_practice": "200-240 words. Practical guidance — how to walk these numbers daily. Number-aligned offerings, days, colors, hours. Direct, actionable.",\n  "sankofa_blessing": "180-220 words. Closing benediction. Reach back. Seal the reading with a specific Sankofa practice tied to the dominant numbers."\n}`
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
    const access = await checkAccess(sb, userEmail, 'numerology');
    if (!access.ok) return fail(access.error, access.status || 403);
  }

  try {
    const summary = chartSummary(chart);
    const prompt = PART_PROMPTS[part](summary);
    const result = await callClaude(SYSTEM_PROMPT, prompt, 1500);

    if (part === 4) {
      await saveReading(sb, {
        userEmail,
        tool: 'numerology',
        inputs: { fullName: chart.fullName, dob: chart.dob },
        chart,
        output: { ...(chart.allParts || {}), part4: result }
      });
    }

    return ok(result);
  } catch (err) {
    console.error('Numerology error:', err);
    return fail(err.message || 'Reading failed', 500);
  }
};
