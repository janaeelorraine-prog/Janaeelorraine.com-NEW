// ============================================================
// POST /.netlify/functions/bot-conversations
// Body: { userEmail, action: 'list' | 'get' | 'usage', conversationId? }
// ------------------------------------------------------------
// Read-only helper for the dashboard's chat UI:
//   • action='list'   — recent conversation summaries (id, title, dates)
//   • action='get'    — full message thread for a conversation
//   • action='usage'  — current month's usage counter for the seed cap
//
// Open to all logged-in members for their own data only.
// (Conversations are scoped by user_email; the function refuses to
// return another member's data.)
// ============================================================

const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { sbClient, checkBotUsage, getUserTier } = require('./_trinity');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const LIST_LIMIT = 20;

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');
  const { userEmail, action, conversationId } = body;
  if (!userEmail) return fail('Authentication required', 401);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return fail('Server not configured', 500);

  const sb = sbClient();
  const emailLc = userEmail.toLowerCase();

  // Verify the user actually exists before exposing any data.
  const tierInfo = await getUserTier(sb, userEmail);
  if (!tierInfo) return fail('Member account not found', 404);

  try {
    if (action === 'list') {
      const { data, error } = await sb
        .from('bot_conversations')
        .select('id, title, created_at, updated_at')
        .eq('user_email', emailLc)
        .order('updated_at', { ascending: false })
        .limit(LIST_LIMIT);
      if (error) return fail('Could not load conversations', 503);
      return ok({ success: true, conversations: data || [] });
    }

    if (action === 'get') {
      if (!conversationId) return fail('conversationId required');
      // Confirm ownership first.
      const { data: convo } = await sb
        .from('bot_conversations')
        .select('id, user_email, title, created_at, updated_at')
        .eq('id', conversationId).maybeSingle();
      if (!convo || convo.user_email !== emailLc) return fail('Conversation not found', 404);

      const { data: messages, error } = await sb
        .from('bot_messages')
        .select('id, role, content, created_at')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      if (error) return fail('Could not load messages', 503);

      return ok({ success: true, conversation: convo, messages: messages || [] });
    }

    if (action === 'usage') {
      const u = await checkBotUsage(sb, userEmail);
      // Even when ok=false (cap reached), the UI wants the numbers.
      return ok({
        success: true,
        tier:      u.tier,
        used:      u.used ?? 0,
        limit:     u.limit === Infinity ? null : (u.limit ?? null),
        remaining: u.remaining === Infinity ? null : (u.remaining ?? null),
        capped:    !u.ok && u.status === 402
      });
    }

    return fail('Unknown action');
  } catch (err) {
    console.error('[bot-conversations] error:', err);
    return fail('Conversations service error', 500);
  }
};
