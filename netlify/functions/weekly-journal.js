// ============================================================
// POST /.netlify/functions/weekly-journal
// Body: { userEmail, action: 'save' | 'list' | 'get' | 'current',
//         weekStart?, mood?, practices?, otherPractice?, dreams?, reflection? }
// ------------------------------------------------------------
// Members fill out the Weekly Reflection journal. One entry per ISO
// week (Monday-start, UTC). The current week is editable; past weeks
// are sealed by the server — writes targeting any week_start other
// than the current Monday are rejected.
//
// Available to all tiers (no tier gate).
//
// Actions:
//   save     — upsert the current week's entry. Body must include
//              weekStart === thisMondayUTC().
//   current  — fetch the current week's entry (or {} if none yet)
//   get      — fetch a specific past entry by weekStart (read-only)
//   list     — list all past entry summaries for the member,
//              most recent first
// ============================================================

const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, getUserTier } = require('./_trinity');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Allow-list for the mood radio. Free-form input is rejected so a
// stray client-side bug can't corrupt the dropdown.
const MOOD_VALUES = ['heavy', 'tender', 'steady', 'lit', 'untethered'];

// Allow-list for the practice checkboxes. The client also sends an
// "other_practice" free-text field, which is permitted separately.
const PRACTICE_VALUES = [
  'meditation', 'divination', 'ancestor_offerings', 'ritual_bath',
  'candle_work', 'journaling', 'movement_dance', 'fasting'
];

const TEXT_MAX = 5000;        // hard cap on each free-text field

// Monday of the current ISO week, in UTC, as a 'YYYY-MM-DD' string.
function thisMondayUTC(now = new Date()) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay() || 7;     // Sunday=0 → 7 so Monday=1
  d.setUTCDate(d.getUTCDate() - (day - 1));
  return d.toISOString().slice(0, 10);
}

function isValidDateString(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function sanitizeText(s) {
  if (s == null) return null;
  const t = String(s);
  return t.length > TEXT_MAX ? t.slice(0, TEXT_MAX) : t;
}

function sanitizePractices(list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const out = [];
  for (const v of list) {
    if (typeof v !== 'string') continue;
    const norm = v.toLowerCase();
    if (PRACTICE_VALUES.includes(norm) && !seen.has(norm)) {
      seen.add(norm);
      out.push(norm);
    }
  }
  return out;
}

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');
  const { userEmail, action } = body;
  if (!userEmail) return fail('Authentication required', 401);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return fail('Server not configured', 500);

  const sb = sbClient();
  const emailLc = userEmail.toLowerCase();

  // Confirm the user exists. (Open to all tiers, no upgrade gate.)
  const tierInfo = await getUserTier(sb, userEmail);
  if (!tierInfo) return fail('Member account not found', 404);

  try {
    if (action === 'current') {
      const wk = thisMondayUTC();
      const { data } = await sb
        .from('weekly_journal_entries')
        .select('*')
        .eq('user_email', emailLc).eq('week_start', wk)
        .maybeSingle();
      return ok({ success: true, weekStart: wk, entry: data || null });
    }

    if (action === 'list') {
      const { data, error } = await sb
        .from('weekly_journal_entries')
        .select('week_start, mood, updated_at')
        .eq('user_email', emailLc)
        .order('week_start', { ascending: false });
      if (error) return fail('Could not load journal entries', 503);
      return ok({ success: true, entries: data || [], currentWeek: thisMondayUTC() });
    }

    if (action === 'get') {
      const { weekStart } = body;
      if (!isValidDateString(weekStart)) return fail('Invalid weekStart');
      const { data } = await sb
        .from('weekly_journal_entries')
        .select('*')
        .eq('user_email', emailLc).eq('week_start', weekStart)
        .maybeSingle();
      if (!data) return fail('Entry not found', 404);
      return ok({ success: true, entry: data });
    }

    if (action === 'save') {
      const { weekStart, mood, practices, otherPractice, dreams, reflection } = body;
      const thisMonday = thisMondayUTC();

      if (!isValidDateString(weekStart)) return fail('Invalid weekStart');
      // Server-side seal: only this week's entry is editable.
      if (weekStart !== thisMonday) {
        return fail('Past entries are sealed for historical accuracy. Only the current week is editable.', 403);
      }

      const moodNorm = mood ? String(mood).toLowerCase() : null;
      if (moodNorm && !MOOD_VALUES.includes(moodNorm)) return fail('Invalid mood value');

      const row = {
        user_email:    emailLc,
        week_start:    weekStart,
        mood:          moodNorm,
        practices:     sanitizePractices(practices),
        other_practice: sanitizeText(otherPractice),
        dreams:        sanitizeText(dreams),
        reflection:    sanitizeText(reflection),
        updated_at:    new Date().toISOString()
      };

      const { error } = await sb
        .from('weekly_journal_entries')
        .upsert(row, { onConflict: 'user_email,week_start' });
      if (error) {
        console.error('[weekly-journal] upsert error:', error);
        return fail('Could not save entry', 503);
      }
      return ok({ success: true, weekStart, savedAt: row.updated_at });
    }

    return fail('Unknown action');
  } catch (err) {
    console.error('[weekly-journal] error:', err);
    return fail(err.message || 'Journal service error', 500);
  }
};
