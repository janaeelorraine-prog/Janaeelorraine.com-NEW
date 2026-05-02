// ============================================================
// POST /.netlify/functions/admin-member-detail
// Body: { adminEmail, adminPassword, memberEmail }
// Returns: { success, user, profile, course_progress }
// ============================================================
// Lets admin view the full blueprint + profile for one member.

const { createClient } = require('@supabase/supabase-js');
const { ok, fail, handlePreflight, parseBody } = require('./_shared');
const { authenticateAdmin } = require('./_admin-auth');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');

  const { adminEmail, adminPassword, memberEmail: rawMember } = body;
  if (!adminEmail || !adminPassword) return fail('Admin credentials required', 401);
  if (!rawMember) return fail('memberEmail required');

  const memberEmail = String(rawMember).trim().toLowerCase();

  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const admin = await authenticateAdmin(sb, adminEmail, adminPassword);
    if (!admin) return fail('Unauthorized', 401);

    const { data: user } = await sb
      .from('users')
      .select('email, name, portal_tier, courses, is_admin, created_at, updated_at')
      .eq('email', memberEmail)
      .maybeSingle();

    if (!user) return fail('Member not found', 404);

    const { data: profile } = await sb
      .from('profiles')
      .select('*')
      .eq('user_email', memberEmail)
      .maybeSingle();

    const { data: progress } = await sb
      .from('course_progress')
      .select('*')
      .eq('user_email', memberEmail);

    const { data: journals } = await sb
      .from('journal_entries')
      .select('course_id, module_id, lesson_id, entry, updated_at')
      .eq('user_email', memberEmail)
      .order('updated_at', { ascending: false });

    return ok({
      success: true,
      user,
      profile: profile || null,
      course_progress: progress || [],
      journal_entries: journals || []
    });
  } catch (err) {
    console.error('Admin-member-detail error:', err);
    return fail('Failed to load member', 500);
  }
};

