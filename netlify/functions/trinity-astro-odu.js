// ============================================================
// POST /api/trinity-astro-odu
// Body: { userEmail, chart, part:1|2|3|4 }
// Returns one of 4 reading parts. The chart (planetary positions
// computed in the browser) is passed straight through; we only
// gate access, persist, and call Claude with the right prompt.
// ============================================================

const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, checkAccess, callClaude, saveReading } = require('./_trinity');

const SYSTEM_PROMPT = `You are Astro-Odu — the channeled voice of Janaee Lorraine Sharp's sovereign synthesis of Yoruba/Ifa cosmology, Kemetic natural law, and Hoodoo spiritual technology applied to Western tropical astrology.

THE COSMOLOGY:
• "Everything is everything" — interconnected continuum
• Ma'at = universal order; Iwa-pele = balanced character
• The Ori (inner head) governs all destiny
• Sankofa: reach back to fetch ancestral wisdom

THE FRAMEWORK:
• 16 Major Odu × 4 Elemental Quadrants = 64 sacred positions on the zodiacal wheel
• Sun = the Ori in the cosmos (divine identity)
• Moon = ancestral memory, the unconscious mother
• Ascendant = the masque worn into this incarnation
• Each planet is an Orisha aspect (Mercury=Eshu speech, Venus=Oshun magnetism, Mars=Ogun forge, Jupiter=Obatala expansion, Saturn=Egungun elder bone, Uranus=Oya wind, Neptune=Yemoja deep, Pluto=Olokun underworld)
• The Talking Odu = the Sun's Odu-Element placement — what the cosmos is currently speaking through this seeker

VOICE — channeled and prophetic:
- Speak directly to the seeker
- Reference Orisha as living forces
- Distinguish conscious (Sun, Asc) from ancestral (Moon, Saturn, Nodes)
- When citing a placement, use the Odu-Element name first, then the conventional sign

Always return ONLY valid JSON. No preamble. No markdown fences.`;

function chartSummary(chart) {
  const lines = [];
  if (chart.birthData) {
    const b = chart.birthData;
    lines.push(`Born: ${b.year}-${String(b.month).padStart(2,'0')}-${String(b.day).padStart(2,'0')} ${String(b.hour).padStart(2,'0')}:${String(b.minute).padStart(2,'0')}`);
  }
  if (chart.sect) lines.push(`Sect: ${chart.sect} chart`);
  if (chart.talkingOdu) lines.push(`TALKING ODU: ${chart.talkingOdu}`);
  if (chart.placements) {
    lines.push('PLACEMENTS:');
    for (const [body, p] of Object.entries(chart.placements)) {
      lines.push(`  ${body}: ${p.astroName || p.sign || ''} (${p.degree?.toFixed?.(2) ?? p.lon ?? '?'}°)`);
    }
  }
  if (chart.aspects && chart.aspects.length) {
    lines.push('KEY ASPECTS:');
    for (const a of chart.aspects.slice(0, 8)) {
      lines.push(`  ${a.bodies?.join('-') || a.label}: ${a.type || ''}`);
    }
  }
  return lines.join('\n');
}

const PART_PROMPTS = {
  1: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "opening": "200-240 words. Open the reading. Name the seeker's Talking Odu. Speak prophetically about this moment of consultation. Reference Ifa's tradition of consultation and what it means to sit before the chart.",\n  "ori_and_sun": "240-280 words. Read the Sun placement as the Ori in the cosmos — divine identity, the I-AM, the inner head's signature. Reference the Odu-Element by name, then the conventional sign. Speak to gift, to mission, to royal seat.",\n  "moon_and_ancestral": "240-280 words. Read the Moon as ancestral memory — what was inherited through the womb, what the unconscious carries from the lineage. Reference Yemoja's amniotic sea and the egungun line of mothers."\n}`,
  2: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "ascendant_and_masque": "220-260 words. Read the Ascendant — the masque worn into this incarnation, the body's first impression, the rising point of the Ori in this lifetime.",\n  "mercury_venus_mars": "260-300 words. Read Mercury (Eshu's speech), Venus (Oshun's magnetism), and Mars (Ogun's forge) as the personal Orisha trio. How the seeker thinks, loves, fights.",\n  "jupiter_saturn": "240-280 words. Read Jupiter (Obatala's expansion) and Saturn (Egungun's elder bone) — the social Orisha pair. Where wisdom expands; where the ancestor's discipline holds the line."\n}`,
  3: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "outer_planets": "240-280 words. Read Uranus (Oya's wind), Neptune (Yemoja's deep), Pluto (Olokun's underworld) — generational Orisha forces. The cohort the seeker belongs to and how these forces work on them personally.",\n  "nodes_and_destiny": "240-280 words. Read the North Node (the destiny pull, the unfamiliar shore) and South Node (the ancestral comfort, the talent already carried). The soul's curriculum.",\n  "key_aspects": "240-280 words. Read the 2-3 most spiritually significant aspects in the chart. Each aspect is a conversation between Orisha — name them and the dialogue they're having."\n}`,
  4: (s) => `${s}\n\nReturn ONLY this JSON:\n{\n  "current_movement": "200-240 words. What is the cosmos asking right now, given this Talking Odu? What is the working of the moment?",\n  "iwa_pele_practice": "200-240 words. Practical guidance for daily Iwa-pele aligned to this chart. Concrete practices — offering, posture, food, day-of-week, hour-of-day. Direct, actionable.",\n  "sankofa_blessing": "180-220 words. Closing benediction. Reach back to the ancestors with a specific Sankofa practice tied to this chart. End with a blessing. Seal the reading."\n}`
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

  // Only gate on part 1 — once started, let the seeker complete.
  if (part === 1) {
    const access = await checkAccess(sb, userEmail, 'astro-odu');
    if (!access.ok) return fail(access.error, access.status || 403);
  }

  try {
    const summary = chartSummary(chart);
    const prompt = PART_PROMPTS[part](summary);
    const result = await callClaude(SYSTEM_PROMPT, prompt, 1500);

    // Persist the FINAL part as the canonical reading record (only once per session).
    if (part === 4) {
      await saveReading(sb, {
        userEmail,
        tool: 'astro-odu',
        inputs: chart.birthData || null,
        chart,
        output: { ...(chart.allParts || {}), part4: result },
        talkingOdu: chart.talkingOdu || null
      });
    }

    return ok(result);
  } catch (err) {
    console.error('Astro-Odu error:', err);
    return fail(err.message || 'Reading failed', 500);
  }
};
