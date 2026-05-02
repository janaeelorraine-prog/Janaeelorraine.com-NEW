// ============================================================
// POST /.netlify/functions/auth-register
// Body: { email, password, name, accessCode }
// ============================================================

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const { ok, fail, handlePreflight, parseBody } = require('./_shared');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const FALLBACK_CODES = {
  'SEED777':     { code_type: 'portal',  tier: 'seed' },
  'ROOT1414':    { code_type: 'portal',  tier: 'root' },
  'AFRICANA111': { code_type: 'course',  course_id: 'africana' },
  'KEMETIC133':  { code_type: 'course',  course_id: 'kemetic' },
  'HEALING144':  { code_type: 'course',  course_id: 'healing' },
  'YORUBA177':   { code_type: 'course',  course_id: 'yoruba' }
};

async function resolveAccessCode(sb, codeRaw) {
  const code = String(codeRaw || '').trim().toUpperCase();
  if (!code) return null;
  try {
    const { data } = await sb.from('access_codes').select('*').eq('code', code).eq('active', true).maybeSingle();
    if (data) {
      if (data.max_uses != null && data.uses >= data.max_uses) return null;
      return data;
    }
  } catch (e) {}
  return FALLBACK_CODES[code] || null;
}

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');

  const { email: rawEmail, password, name, accessCode } = body;
  const email = (rawEmail || '').trim().toLowerCase();

  if (!email || !password || !name || !accessCode) {
    return fail('Missing required fields');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Please enter a valid email');
  if (typeof password !== 'string' || password.length < 8) return fail('Password must be at least 8 characters');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return fail('Server not configured', 500);

  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    const code = await resolveAccessCode(sb, accessCode);
    if (!code) return fail('Invalid or inactive access code', 400);

    const { data: existing } = await sb.from('users').select('email').eq('email', email).maybeSingle();
    if (existing) return fail('Email already registered', 409);

    const password_hash = await bcrypt.hash(password, 10);

    let portal_tier = null;
    let courses = [];
    if (code.code_type === 'portal') portal_tier = code.tier;
    if (code.code_type === 'course') courses = [code.course_id];

    const { data, error } = await sb.from('users').insert({
      email,
      name: name.trim(),
      password_hash,
      portal_tier,
      courses
    }).select().single();

    if (error) throw error;

    if (code.code) {
      try { await sb.from('access_codes').update({ uses: (code.uses || 0) + 1 }).eq('code', code.code); } catch {}
    }

    return ok({
      success: true,
      user: {
        email: data.email,
        name: data.name,
        portal_tier: data.portal_tier,
        courses: data.courses || [],
        is_admin: !!data.is_admin
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    return fail('Registration failed', 500);
  }
};
