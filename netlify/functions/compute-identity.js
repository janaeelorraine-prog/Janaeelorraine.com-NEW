// ============================================================
// POST /.netlify/functions/compute-identity
// Body: { userEmail }
// ------------------------------------------------------------
// Returns the at-a-glance Core Identity card for the dashboard:
//   astrology  — Sun · Moon · Ascendant + current Talking Odu + moon phase
//   numerology — Life Path + Personal Year, both with Orisha governance
//   humanDesign — Type + Authority (with Orisha governance)
//
// Heavy fields (Moon, Ascendant, HD Type, HD Authority, Personal Year)
// are also written back to the profiles table so subsequent loads can
// skip the math entirely. Sun + Life Path always recomputed (cheap).
//
// Open to all authenticated members (Seed/Root/Elder). Identity is
// shown to every tier; the snippet and deep dive are gated separately.
// ============================================================

const { createClient } = require('@supabase/supabase-js');
const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const astro = require('./_astro/astro-engine');
const numerology = require('./_astro/numerology-engine');
const hd = require('./_astro/human-design-engine');
const { resolveLocation } = require('./_astro/geocode');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

function parseDob(dob) {
  if (!dob) return null;
  const [y, m, d] = String(dob).split('-').map(Number);
  if (!y || !m || !d) return null;
  return { year: y, month: m, day: d };
}

function parseTime(t) {
  if (!t) return null;
  const [h, mn] = String(t).split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(mn)) return null;
  return { hour: h, minute: mn };
}

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');
  const { userEmail } = body;
  if (!userEmail) return fail('Authentication required', 401);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return fail('Server not configured', 500);

  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: profile, error } = await sb
      .from('profiles').select('*')
      .eq('user_email', userEmail.toLowerCase())
      .maybeSingle();
    if (error) throw error;
    if (!profile) {
      return ok({ success: true, identity: null, reason: 'no-profile' });
    }

    const dob = parseDob(profile.dob);
    const time = parseTime(profile.birth_time);

    // ── Numerology — pure DOB / name; always computable ──────────────
    let numerologyOut = null;
    if (dob) {
      const lifePath = numerology.calcLifePath(dob.year, dob.month, dob.day);
      const personalYear = numerology.calcPersonalYear(dob.month, dob.day);
      numerologyOut = {
        lifePath: { ...lifePath, ...numerology.getOrishaForNumber(lifePath.final) },
        personalYear: { ...personalYear, ...numerology.getOrishaForNumber(personalYear.final) }
      };
    }

    // ── Astrology — needs lat/lng + birth time for Moon/Asc/Talking Odu ─
    let astrologyOut = null;
    let location = null;
    if (dob) {
      // Always compute Sun (only needs DOB, via existing engine seed)
      const sunOnlyJD = astro.julianDay(dob.year, dob.month, dob.day, 12, 0, 0); // noon UTC
      const sunOnlyLon = astro.sunPosition(sunOnlyJD - 2451543.5).lon;
      const sunSign = astro.getSignFromLongitude(sunOnlyLon);

      astrologyOut = { sun: sunSign };

      if (time) {
        location = await resolveLocation(profile.birth_location);
        if (location) {
          const chart = astro.calculateChart({
            year: dob.year, month: dob.month, day: dob.day,
            hour: time.hour, minute: time.minute,
            lat: location.lat, lng: location.lng, tz: location.tz
          });
          astrologyOut = {
            sun: chart.planets.Sun,
            moon: chart.planets.Moon,
            ascendant: chart.ascSign,
            talkingOdu: chart.talkingOdu,
            ageInYears: chart.ageInYears,
            location
          };
        }
      }

      // Always include the current moon phase ("today's moon"),
      // independent of birth chart. Useful for the Channeled Snippet.
      astrologyOut.currentMoonPhase = astro.getCurrentMoonPhase();
    }

    // ── Human Design — needs lat/lng + birth time for accurate Type/Auth ─
    let humanDesignOut = null;
    if (dob && time && location) {
      const hdChart = hd.calculateChart({
        year: dob.year, month: dob.month, day: dob.day,
        hour: time.hour, minute: time.minute,
        lat: location.lat, lng: location.lng, tz: location.tz
      });
      const typeMeta = hd.TYPE_TO_ORISHA[hdChart.type] || {};
      const authMeta = hd.AUTHORITY_TO_ORISHA[hdChart.authority] || {};
      humanDesignOut = {
        type: hdChart.type,
        typeOrisha: typeMeta.orisha,
        typeStrategy: typeMeta.strategy,
        typeSignature: typeMeta.signature,
        authority: hdChart.authority,
        authorityOrisha: authMeta.orisha,
        profile: hdChart.profile,
        definition: hdChart.definition
      };
    }

    // ── Persist computed values back to profile so we can skip recompute ─
    try {
      const patch = {
        user_email: userEmail.toLowerCase(),
        updated_at: new Date().toISOString()
      };
      if (astrologyOut?.moon) patch.moon_sign = astrologyOut.moon.sign;
      if (astrologyOut?.ascendant) patch.ascendant = astrologyOut.ascendant.sign;
      if (astrologyOut?.talkingOdu) {
        patch.last_talking_odu = astrologyOut.talkingOdu;
        patch.last_talking_odu_at = new Date().toISOString();
      }
      if (humanDesignOut?.type) {
        patch.hd_type = humanDesignOut.type;
        patch.last_human_design_type = humanDesignOut.type;
      }
      if (humanDesignOut?.authority) patch.hd_authority = humanDesignOut.authority;
      if (numerologyOut?.personalYear?.final != null) patch.personal_year = numerologyOut.personalYear.final;
      if (location?.lat != null) patch.latitude = location.lat;
      if (location?.lng != null) patch.longitude = location.lng;

      await sb.from('profiles').upsert(patch, { onConflict: 'user_email' });
    } catch (saveErr) {
      // Don't fail the response if migration hasn't been run yet — the new
      // columns may not exist. The reading still returns; persistence is best-effort.
      console.warn('[compute-identity] persist skipped:', saveErr.message);
    }

    return ok({
      success: true,
      identity: {
        astrology: astrologyOut,
        numerology: numerologyOut,
        humanDesign: humanDesignOut,
        meta: {
          hasBirthTime: !!time,
          hasLocation: !!location,
          locationSource: location?.source || null
        }
      }
    });
  } catch (err) {
    console.error('[compute-identity] error:', err);
    return fail('Identity computation failed', 500);
  }
};
