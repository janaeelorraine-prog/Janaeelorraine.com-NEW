// ============================================================
// Shared helpers for Trinity (Divination Sanctuary) functions
// Tier gating + monthly rate limiting + persistence
// ============================================================

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

// Per-month allowance per tool, per tier
const TIER_LIMITS = {
  seed:  0,        // gated — must upgrade
  root:  3,        // 3 readings per tool per month
  elder: Infinity  // unlimited
};

function sbClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

// Look up the user's tier. Defaults to 'seed' if missing.
async function getUserTier(sb, userEmail) {
  if (!sb || !userEmail) return null;
  const { data: user } = await sb
    .from('users')
    .select('email, portal_tier, is_admin')
    .eq('email', userEmail.toLowerCase())
    .maybeSingle();
  if (!user) return null;
  // Admins get elder-tier privileges automatically.
  if (user.is_admin) return { tier: 'elder', user };
  return { tier: user.portal_tier || 'seed', user };
}

// Count this user's readings of a given tool in the current calendar month.
async function countMonthlyReadings(sb, userEmail, tool) {
  if (!sb) return 0;
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
  const { count } = await sb
    .from('trinity_readings')
    .select('id', { count: 'exact', head: true })
    .eq('user_email', userEmail.toLowerCase())
    .eq('tool', tool)
    .gte('created_at', monthStart);
  return count || 0;
}

// Enforce gating. Returns { ok: true } or { ok: false, error, status }.
async function checkAccess(sb, userEmail, tool) {
  if (!userEmail) return { ok: false, error: 'Authentication required', status: 401 };
  const tierInfo = await getUserTier(sb, userEmail);
  if (!tierInfo) return { ok: false, error: 'Member account not found', status: 404 };
  const { tier } = tierInfo;
  const limit = TIER_LIMITS[tier] ?? 0;
  if (limit === 0) {
    return {
      ok: false,
      status: 403,
      error: 'The Divination Sanctuary opens at the Root tier. Please upgrade to begin your readings.',
      tier
    };
  }
  if (limit === Infinity) return { ok: true, tier, remaining: Infinity };
  const used = await countMonthlyReadings(sb, userEmail, tool);
  if (used >= limit) {
    return {
      ok: false,
      status: 429,
      error: `You have used your ${limit} ${tool} readings for this month. Resets on the 1st.`,
      tier,
      used,
      limit
    };
  }
  return { ok: true, tier, used, limit, remaining: limit - used };
}

// Call Claude. Returns parsed JSON.
async function callClaude(systemPrompt, userPrompt, maxTokens = 1500) {
  if (!ANTHROPIC_KEY) throw new Error('Server missing ANTHROPIC_API_KEY');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error('Claude error:', res.status, txt);
    throw new Error(`Generation service returned ${res.status}`);
  }
  const data = await res.json();
  const text = data.content.map(i => i.text || '').join('').replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}

// Persist a reading. Best-effort — failures are logged but don't break the response.
async function saveReading(sb, { userEmail, tool, inputs, chart, output, talkingOdu, hdType }) {
  if (!sb || !userEmail) return;
  try {
    await sb.from('trinity_readings').insert({
      user_email: userEmail.toLowerCase(),
      tool,
      inputs: inputs || null,
      chart: chart || null,
      output: output || null,
      talking_odu: talkingOdu || null
    });
    // Cache denormalized values on the profile for fast Sacred Center reads.
    if (talkingOdu || hdType) {
      const patch = { user_email: userEmail.toLowerCase(), updated_at: new Date().toISOString() };
      if (talkingOdu) {
        patch.last_talking_odu = talkingOdu;
        patch.last_talking_odu_at = new Date().toISOString();
      }
      if (hdType) patch.last_human_design_type = hdType;
      await sb.from('profiles').upsert(patch, { onConflict: 'user_email' });
    }
  } catch (err) {
    console.error('Trinity save error:', err);
  }
}

// Lighter cousin of checkAccess(): just confirms the user holds one of the
// allowed tiers. No monthly metering. Used by unmetered features like the
// daily channeled snippet and weekly deep dive.
async function requireTier(sb, userEmail, allowed = ['root', 'elder']) {
  if (!userEmail) return { ok: false, error: 'Authentication required', status: 401 };
  const tierInfo = await getUserTier(sb, userEmail);
  if (!tierInfo) return { ok: false, error: 'Member account not found', status: 404 };
  const { tier } = tierInfo;
  if (!allowed.includes(tier)) {
    return {
      ok: false,
      status: 403,
      error: 'This is a Root and Elder member feature. Upgrade to unlock.',
      tier
    };
  }
  return { ok: true, tier };
}

// Per-month message allowance for the Astro-Odu Guidance Bot.
// Seed gets a small free taste; Root + Elder are unmetered.
const BOT_LIMITS = {
  seed:  3,
  root:  Infinity,
  elder: Infinity
};

// Confirms the user can post to the bot this month. Counts user-role
// messages in the bot_messages table since the start of the current
// UTC calendar month.
async function checkBotUsage(sb, userEmail) {
  if (!userEmail) return { ok: false, error: 'Authentication required', status: 401 };
  const tierInfo = await getUserTier(sb, userEmail);
  if (!tierInfo) return { ok: false, error: 'Member account not found', status: 404 };
  const { tier } = tierInfo;
  const limit = BOT_LIMITS[tier] ?? 0;
  if (limit === Infinity) return { ok: true, tier, limit, remaining: Infinity };

  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
  const { count, error } = await sb
    .from('bot_messages')
    .select('id', { count: 'exact', head: true })
    .eq('user_email', userEmail.toLowerCase())
    .eq('role', 'user')
    .gte('created_at', monthStart);
  if (error) return { ok: false, error: 'The channel is unreachable. Try again in a moment.', status: 503 };

  const used = count || 0;
  if (used >= limit) {
    return {
      ok: false, status: 402, tier, used, limit,
      error: `You've used your ${limit} bot messages for this month. Upgrade to Root for unlimited guidance, or wait until the 1st when the channel resets.`
    };
  }
  return { ok: true, tier, used, limit, remaining: limit - used };
}

// Multi-turn chat call to Claude — returns the assistant's plain text
// (not JSON-parsed). Used by the guidance bot.
async function callClaudeChat(systemPrompt, messages, maxTokens = 1024) {
  if (!ANTHROPIC_KEY) throw new Error('Server missing ANTHROPIC_API_KEY');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error('Claude chat error:', res.status, txt);
    throw new Error(`The channel returned ${res.status}.`);
  }
  const data = await res.json();
  return data.content.map(i => i.text || '').join('').trim();
}

module.exports = {
  sbClient, getUserTier, checkAccess, requireTier, checkBotUsage,
  callClaude, callClaudeChat, saveReading,
  TIER_LIMITS, BOT_LIMITS
};
