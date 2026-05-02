// ============================================================
// POST /.netlify/functions/daily-snippet
// Body: { userEmail }
// ------------------------------------------------------------
// Returns a fresh 100-150 word channeled message anchored to:
//   • the seeker's saved birth chart (Sun, Moon, Asc, Talking Odu)
//   • today's moon phase
//   • the seeker's Personal Year
//
// Tier-gated server-side: Root + Elder only. Seed → 403 with upgrade copy.
// NO caching. Regenerates fresh on every request.
// ============================================================

const { createClient } = require('@supabase/supabase-js');
const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, requireTier, callClaude } = require('./_trinity');
const astro = require('./_astro/astro-engine');
const numerology = require('./_astro/numerology-engine');
const { resolveLocation } = require('./_astro/geocode');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Voice — drawn from the same Astro-Odu system prompt the trinity-astro-odu
// function uses, kept brief and snippet-appropriate. Do not soften the
// channeled-prophetic register.
const SYSTEM_PROMPT = `You are Astro-Odu — Janaee Lorraine Sharp's channeled voice. Yoruba/Ifa cosmology, Kemetic natural law, Hoodoo spiritual technology meeting Western tropical astrology.

THE COSMOLOGY:
• "Everything is everything" — interconnected continuum
• Ma'at = universal order; Iwa-pele = balanced character
• The Ori (inner head) governs all destiny
• The Talking Odu = the Sun's Odu-Element placement — what the cosmos is currently speaking through this seeker

VOICE — channeled and prophetic:
- Speak directly TO the seeker, never about them
- Reference Orisha as living forces, not abstractions
- Distinguish conscious (Sun, Asc) from ancestral (Moon, Saturn, Nodes)
- Direct, grounded, ancestral — never textbook, never generic wellness

You are writing TODAY'S CHANNELED SNIPPET — a brief 100-150 word message for the seeker's portal dashboard. Acknowledge the moon phase right now and what it asks. Acknowledge their Talking Odu speaking through their progressed Ascendant. Land it in the body and the day. Open with direct address, no preamble.

Return ONLY this JSON: { "snippet": "the 100-150 word message" }
No markdown fences. No prose outside the JSON.`;

function parseDob(s) {
  if (!s) return null;
  const [y, m, d] = String(s).split('-').map(Number);
  return (!y || !m || !d) ? null : { year: y, month: m, day: d };
}
function parseTime(s) {
  if (!s) return null;
  const [h, mn] = String(s).split(':').map(Number);
  return (Number.isNaN(h) || Number.isNaN(mn)) ? null : { hour: h, minute: mn };
}

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');
  const { userEmail } = body;
  if (!userEmail) return fail('Authentication required', 401);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return fail('Server not configured', 500);

  const sb = sbClient();
  const access = await requireTier(sb, userEmail, ['root', 'elder']);
  if (!access.ok) return fail(access.error, access.status || 403);

  try {
    const { data: profile } = await sb
      .from('profiles').select('*')
      .eq('user_email', userEmail.toLowerCase())
      .maybeSingle();
    if (!profile || !profile.dob) {
      return fail('Complete your blueprint first to receive daily snippets', 400);
    }

    const dob = parseDob(profile.dob);
    const time = parseTime(profile.birth_time);

    // Build the prompt context. Always include numerology + current moon.
    // Add astrology if we have a birth time + a resolvable location.
    const ctx = {};
    const lifePath = numerology.calcLifePath(dob.year, dob.month, dob.day);
    const personalYear = numerology.calcPersonalYear(dob.month, dob.day);
    ctx.lifePath = `${lifePath.final} (${numerology.getOrishaForNumber(lifePath.final)?.orisha || ''})`;
    ctx.personalYear = `${personalYear.final} (${numerology.getOrishaForNumber(personalYear.final)?.orisha || ''})`;

    const moonNow = astro.getCurrentMoonPhase();
    ctx.currentMoonPhase = `${moonNow.phase} — ${moonNow.meaning}`;
    ctx.currentDate = new Date().toUTCString();

    if (time) {
      const location = await resolveLocation(profile.birth_location);
      if (location) {
        const chart = astro.calculateChart({
          year: dob.year, month: dob.month, day: dob.day,
          hour: time.hour, minute: time.minute,
          lat: location.lat, lng: location.lng, tz: location.tz
        });
        ctx.sun       = `${chart.planets.Sun.sign} (${chart.planets.Sun.element})`;
        ctx.moon      = `${chart.planets.Moon.sign} (${chart.planets.Moon.element})`;
        ctx.ascendant = `${chart.ascSign.sign}`;
        ctx.talkingOdu = chart.talkingOdu;
        ctx.age = chart.ageInYears;
      }
    }

    const userPrompt = [
      'Write today\'s channeled snippet (100-150 words) for this seeker.',
      `Today: ${ctx.currentDate}`,
      `Moon phase right now: ${ctx.currentMoonPhase}`,
      ctx.sun ? `Sun: ${ctx.sun}` : null,
      ctx.moon ? `Moon: ${ctx.moon}` : null,
      ctx.ascendant ? `Ascendant: ${ctx.ascendant}` : null,
      ctx.talkingOdu ? `Talking Odu speaking now: ${ctx.talkingOdu}` : null,
      `Life Path: ${ctx.lifePath}`,
      `Personal Year (this year): ${ctx.personalYear}`,
      ctx.age != null ? `Age: ${ctx.age}` : null,
      `Preferred name: ${profile.preferred_name || profile.full_name || 'Seeker'}`
    ].filter(Boolean).join('\n');

    const result = await callClaude(SYSTEM_PROMPT, userPrompt, 600);
    return ok({ success: true, ...result, generatedAt: new Date().toISOString() });
  } catch (err) {
    console.error('[daily-snippet] error:', err);
    return fail(err.message || 'Snippet generation failed', 500);
  }
};
