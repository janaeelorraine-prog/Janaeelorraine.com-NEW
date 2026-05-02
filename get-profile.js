const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const { userEmail } = JSON.parse(event.body || '{}');

    if (!userEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'User email required.' })
      };
    }

    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { data, error } = await sb
      .from('profiles')
      .select('*')
      .eq('user_email', userEmail)
      .single();

    if (error || !data) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, profile: null })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, profile: data })
    };

  } catch (err) {
    console.error('Get profile error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Server error.' })
    };
  }
};
