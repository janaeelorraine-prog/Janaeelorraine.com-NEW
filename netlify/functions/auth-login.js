const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const { ok, fail, handlePreflight, parseBody } = require('./_shared');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');

  const email = (body.email || '').trim().toLowerCase();
  const { password } = body;

  if (!email || !password) return fail('Email and password required');
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return fail('Server not configured', 500);

  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: user } = await sb
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    const hashToCompare = user ? user.password_hash : '$2a$10$xxxxxxxxxxxxxxxxxxxxxx';
    const valid = await bcrypt.compare(password, hashToCompare);

    if (!user || !valid) return fail('Invalid credentials', 401);

    return ok({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        portal_tier: user.portal_tier,
        courses: user.courses || [],
        is_admin: !!user.is_admin
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return fail('Login failed', 500);
  }
};
