// ============================================================
// POST /.netlify/functions/guidance-bot
// Body: { userEmail, conversationId?, message }
// ------------------------------------------------------------
// Multi-turn chat with the Astro-Odu Guidance Bot.
//   • Seed tier  — 3 user messages per UTC calendar month, then 402.
//   • Root + Elder — unlimited.
// All gating server-side via _trinity.js / checkBotUsage().
//
// On each call:
//   1. Verify tier + monthly cap.
//   2. Load the seeker's profile + the last 20 turns of the named
//      conversation (or create a new conversation if no id supplied).
//   3. Build the Astro-Odu system prompt with the chart snapshot
//      injected (see _astro/bot-prompt.js — single source of voice).
//   4. Call Claude (via _trinity.js callClaudeChat).
//   5. Append the user message + assistant reply to the conversation;
//      bump the conversation's updated_at.
//   6. Return { conversationId, reply, usage:{used,limit,remaining} }.
// ============================================================

const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, checkBotUsage, callClaudeChat } = require('./_trinity');
const { buildSystemPrompt } = require('./_astro/bot-prompt');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const HISTORY_WINDOW = 20;     // last N turns sent to Claude (cost guard)
const TITLE_MAX = 80;          // chars of first user message used as title
const MESSAGE_MAX = 4000;      // hard cap on a single user message

function shortTitle(s) {
  const cleaned = String(s || '').trim().replace(/\s+/g, ' ');
  if (cleaned.length <= TITLE_MAX) return cleaned;
  return cleaned.slice(0, TITLE_MAX - 1).trimEnd() + '…';
}

// Best-effort identity fetch for the system prompt. If compute-identity
// hasn't been run for this member yet, the prompt builder gracefully
// uses "unspecified" markers — the bot will not invent.
async function loadIdentitySnapshot(sb, profile) {
  // We re-read what's denormalized on the profile row rather than calling
  // compute-identity here (avoids a second lambda hop for every chat msg).
  const numerology = require('./_astro/numerology-engine');
  const identity = { astrology: {}, numerology: {}, humanDesign: {} };

  if (profile.dob) {
    const [y, m, d] = String(profile.dob).split('-').map(Number);
    if (y && m && d) {
      const lp = numerology.calcLifePath(y, m, d);
      identity.numerology.lifePath = { ...lp, ...numerology.getOrishaForNumber(lp.final) };
      const py = numerology.calcPersonalYear(m, d);
      identity.numerology.personalYear = { ...py, ...numerology.getOrishaForNumber(py.final) };
    }
  }

  // Cached natal placements on the profile row (filled by compute-identity).
  if (profile.moon_sign)  identity.astrology.moon = { sign: profile.moon_sign };
  if (profile.ascendant)  identity.astrology.ascendant = { sign: profile.ascendant };
  if (profile.last_talking_odu) identity.astrology.talkingOdu = profile.last_talking_odu;

  // Sun sign from DOB (cheap, deterministic) — pulled lazily through the
  // astro engine to avoid duplicating the table here.
  if (profile.dob) {
    try {
      const astro = require('./_astro/astro-engine');
      const [y, m, d] = String(profile.dob).split('-').map(Number);
      const jd = astro.julianDay(y, m, d, 12, 0, 0);
      const sunLon = astro.sunPosition(jd - 2451543.5).lon;
      identity.astrology.sun = astro.getSignFromLongitude(sunLon);
    } catch (_) {}
  }

  if (profile.hd_type) {
    const hd = require('./_astro/human-design-engine');
    const typeMeta = hd.TYPE_TO_ORISHA[profile.hd_type] || {};
    const authMeta = hd.AUTHORITY_TO_ORISHA[profile.hd_authority] || {};
    identity.humanDesign = {
      type: profile.hd_type,
      typeOrisha:    typeMeta.orisha,
      typeStrategy:  typeMeta.strategy,
      typeSignature: typeMeta.signature,
      authority:     profile.hd_authority,
      authorityOrisha: authMeta.orisha
    };
  }

  return identity;
}

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');
  const { userEmail, conversationId, message } = body;

  if (!userEmail) return fail('Authentication required', 401);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return fail('Server not configured', 500);

  const trimmed = String(message || '').trim();
  if (!trimmed) return fail('Empty message');
  if (trimmed.length > MESSAGE_MAX) return fail(`Message too long (max ${MESSAGE_MAX} chars)`, 400);

  const sb = sbClient();
  const access = await checkBotUsage(sb, userEmail);
  if (!access.ok) return fail(access.error, access.status || 403);

  const emailLc = userEmail.toLowerCase();

  try {
    // 1. Load the seeker's profile (best effort — if missing, we still
    //    answer; the system prompt will mark fields "unspecified").
    let profile = null;
    try {
      const { data } = await sb.from('profiles').select('*').eq('user_email', emailLc).maybeSingle();
      profile = data || null;
    } catch (_) {}

    // 2. Resolve the conversation: existing one (verify ownership) or
    //    create a fresh one. The first user message becomes the title.
    let convId = conversationId;
    let isNewConvo = false;
    if (convId) {
      const { data: existing } = await sb
        .from('bot_conversations').select('id, user_email')
        .eq('id', convId).maybeSingle();
      if (!existing || existing.user_email !== emailLc) {
        return fail('Conversation not found', 404);
      }
    } else {
      const { data: created, error: cErr } = await sb
        .from('bot_conversations')
        .insert({ user_email: emailLc, title: shortTitle(trimmed) })
        .select('id').single();
      if (cErr) {
        console.error('[bot] conversation create error:', cErr);
        return fail('Could not start a new conversation', 503);
      }
      convId = created.id;
      isNewConvo = true;
    }

    // 3. Load the recent history for this conversation (chronological).
    const { data: history } = await sb
      .from('bot_messages')
      .select('role, content, created_at')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
      .limit(HISTORY_WINDOW);

    const priorMessages = (history || []).map(m => ({ role: m.role, content: m.content }));

    // 4. Build the system prompt (framework + chart snapshot) and call.
    const identity = profile ? await loadIdentitySnapshot(sb, profile) : null;
    const systemPrompt = buildSystemPrompt({ profile, identity });
    const messages = [...priorMessages, { role: 'user', content: trimmed }];

    const replyText = await callClaudeChat(systemPrompt, messages, 1024);

    // 5. Persist both turns. We persist EVEN ON model failure of the
    //    user message? — no. We only persist if Claude returned something.
    //    The user message + assistant reply land together so usage
    //    counting (rows where role='user') reflects only billed messages.
    const { error: insErr } = await sb.from('bot_messages').insert([
      { conversation_id: convId, user_email: emailLc, role: 'user', content: trimmed },
      { conversation_id: convId, user_email: emailLc, role: 'assistant', content: replyText }
    ]);
    if (insErr) console.error('[bot] message insert error:', insErr);

    // Bump conversation updated_at so the dropdown sorts correctly.
    try {
      await sb.from('bot_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', convId);
    } catch (_) {}

    // 6. Recompute usage so the UI can disable the input at the cap.
    const after = await checkBotUsage(sb, userEmail);

    return ok({
      success: true,
      conversationId: convId,
      isNewConversation: isNewConvo,
      reply: replyText,
      usage: {
        tier:      after.tier ?? access.tier,
        used:      after.used ?? null,
        limit:     after.limit === Infinity ? null : (after.limit ?? null),
        remaining: after.remaining === Infinity ? null : (after.remaining ?? null)
      }
    });
  } catch (err) {
    console.error('[guidance-bot] error:', err);
    return fail(err.message || 'The channel is quiet right now.', 500);
  }
};
