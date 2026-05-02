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

  const { adminEmail, adminPassword } = body;
  if (!adminEmail || !adminPassword) return fail('Credentials required', 401);

  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const admin = await authenticateAdmin(sb, adminEmail, adminPassword);
    if (!admin) return fail('Unauthorized', 401);

    const { data: users } = await sb.from('users')
      .select('email, name, portal_tier, courses, is_admin, created_at')
      .order('created_at', { ascending: false });

    const { data: profiles } = await sb.from('profiles')
      .select('user_email, preferred_name, dob, birth_location, blood_type, updated_at');

    const { data: codes } = await sb.from('access_codes')
      .select('*').order('created_at', { ascending: false });

    return ok({
      success: true,
      users: users || [],
      profiles: profiles || [],
      access_codes: codes || []
    });
  } catch (err) {
    console.error('Admin-data error:', err);
    return fail('Failed to load admin data', 500);
  }
};
