// ============================================================
// POST /.netlify/functions/weekly-deep-dive
// Body: { userEmail }
// ------------------------------------------------------------
// Returns a fresh 400-500 word reading anchored to the current ISO week.
// The week-anchor in the prompt makes the output naturally week-themed,
// while every fetch is a fresh Claude call (no caching).
//
// Tier-gated server-side: Root + Elder only. Seed → 403.
// ============================================================

const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, requireTier, callClaude } = require('./_trinity');
const astro = require('./_astro/astro-engine');
const numerology = require('./_astro/numerology-engine');
const { resolveLocation } = require('./_astro/geocode');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const SYSTEM_PROMPT = `You are Astro-Odu — Janaee Lorraine Sharp's channeled voice. Yoruba/Ifa cosmology, Kemetic natural law, Hoodoo spiritual technology meeting Western tropical astrology.

THE COSMOLOGY:
• "Everything is everything" — interconnected continuum
• Ma'at = universal order; Iwa-pele = balanced character
• The Ori (inner head) governs all destiny
• Sankofa: reach back to fetch ancestral wisdom
• The Talking Odu = the Sun's Odu-Element placement, speaking now through the seeker's progressed Ascendant

VOICE — channeled and prophetic:
- Speak directly TO the seeker, never about them
- Reference Orisha as living forces, not abstractions
- Distinguish conscious (Sun, Asc) from ancestral (Moon, Saturn, Nodes)
- Direct, grounded, ancestral — never textbook, never generic wellness
- Use signature vocabulary: "reclaim," "this is medicine," "your body already knows"

You are writing THIS WEEK'S DEEP DIVE — a 400-500 word channeled reading for the seeker's portal dashboard. Anchor it to the specific ISO week given in the input — the moon's movement across this week, the Sun's current sign-zone, what the Talking Odu is asking THIS WEEK. Move through three movements:

1) The week's medicine — what the cosmos is offering this week given the moon's phase movement
2) Where the seeker meets it — landing it in their Sun + Talking Odu + Personal Year
3) The week's iwa-pele practice — one concrete, embodied practice for the next 7 days. Day-of-week, time-of-day, gesture. No herbal prescriptions; refer them to Janaee for full rootwork.

Open with direct address. End with a benediction line.

Return ONLY this JSON: { "deepDive": "the 400-500 word reading" }
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

// ISO week number (Mon-start). Used to anchor the prompt.
function isoWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return { year: d.getUTCFullYear(), week: weekNo };
}

// Sample the moon's phase across this week (Mon → Sun) so the prompt
// knows which phase shifts the seeker will move through.
function weekMoonArc(now = new Date()) {
  const monday = new Date(now);
  const day = monday.getUTCDay() || 7;
  monday.setUTCDate(monday.getUTCDate() - (day - 1));
  monday.setUTCHours(12, 0, 0, 0);
  const samples = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday); d.setUTCDate(monday.getUTCDate() + i);
    samples.push({
      day: d.toUTCString().slice(0, 3),
      phase: astro.getCurrentMoonPhase(d).phase
    });
  }
  return samples;
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
      return fail('Complete your blueprint first to receive your weekly deep dive', 400);
    }

    const dob = parseDob(profile.dob);
    const time = parseTime(profile.birth_time);
    const week = isoWeek();
    const moonArc = weekMoonArc();

    const lifePath = numerology.calcLifePath(dob.year, dob.month, dob.day);
    const personalYear = numerology.calcPersonalYear(dob.month, dob.day);
    const ctx = {
      lifePath: `${lifePath.final} (${numerology.getOrishaForNumber(lifePath.final)?.orisha || ''})`,
      personalYear: `${personalYear.final} (${numerology.getOrishaForNumber(personalYear.final)?.orisha || ''})`
    };

    if (time) {
      const location = await resolveLocation(profile.birth_location);
      if (location) {
        const chart = astro.calculateChart({
          year: dob.year, month: dob.month, day: dob.day,
          hour: time.hour, minute: time.minute,
          lat: location.lat, lng: location.lng, tz: location.tz
        });
        ctx.sun = `${chart.planets.Sun.sign} (${chart.planets.Sun.element})`;
        ctx.moon = `${chart.planets.Moon.sign} (${chart.planets.Moon.element})`;
        ctx.ascendant = chart.ascSign.sign;
        ctx.talkingOdu = chart.talkingOdu;
      }
    }

    const userPrompt = [
      `Write THIS WEEK'S deep dive (400-500 words) for this seeker.`,
      `ISO week: ${week.year}-W${String(week.week).padStart(2,'0')}`,
      `Moon phase arc this week (Mon → Sun): ${moonArc.map(m => `${m.day}=${m.phase}`).join(', ')}`,
      ctx.sun ? `Seeker's Sun: ${ctx.sun}` : null,
      ctx.moon ? `Seeker's Moon: ${ctx.moon}` : null,
      ctx.ascendant ? `Seeker's Ascendant: ${ctx.ascendant}` : null,
      ctx.talkingOdu ? `Seeker's Talking Odu (progressed): ${ctx.talkingOdu}` : null,
      `Seeker's Life Path: ${ctx.lifePath}`,
      `Seeker's Personal Year: ${ctx.personalYear}`,
      `Preferred name: ${profile.preferred_name || profile.full_name || 'Seeker'}`
    ].filter(Boolean).join('\n');

    const result = await callClaude(SYSTEM_PROMPT, userPrompt, 1500);
    return ok({
      success: true,
      ...result,
      week: `${week.year}-W${String(week.week).padStart(2,'0')}`,
      generatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('[weekly-deep-dive] error:', err);
    return fail(err.message || 'Deep dive generation failed', 500);
  }
};
