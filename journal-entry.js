// ============================================================
// POST /.netlify/functions/journal-entry
// Body: { action: 'load'|'save'|'list', userEmail, courseId, ... }
// ------------------------------------------------------------
// Schema (public.journal_entries):
//   user_email | course_id | module_id | lesson_id | entry | updated_at
// ============================================================

const { createClient } = require('@supabase/supabase-js');
const { ok, fail, handlePreflight, parseBody } = require('./_shared');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');

  const { action, userEmail: emailRaw, courseId, moduleId, lessonId, entry } = body;
  const userEmail = (emailRaw || '').trim().toLowerCase();

  if (!action || !userEmail) return fail('Missing fields');

  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // List ALL entries for a user/course (used to hydrate the book on open)
    if (action === 'list') {
      if (!courseId) return fail('Missing courseId');
      const { data, error } = await sb
        .from('journal_entries')
        .select('module_id, lesson_id, entry, updated_at')
        .eq('user_email', userEmail)
        .eq('course_id', courseId);
      if (error) throw error;
      return ok({ success: true, entries: data || [] });
    }

    // Load a single entry
    if (action === 'load') {
      if (!courseId || !moduleId || !lessonId) return fail('Missing fields');
      const { data, error } = await sb
        .from('journal_entries')
        .select('entry, updated_at')
        .eq('user_email', userEmail)
        .eq('course_id', courseId)
        .eq('module_id', moduleId)
        .eq('lesson_id', lessonId)
        .maybeSingle();
      if (error) throw error;
      return ok({ success: true, entry: data ? data.entry : '', updated_at: data && data.updated_at });
    }

    // Save (upsert) a single entry
    if (action === 'save') {
      if (!courseId || !moduleId || !lessonId) return fail('Missing fields');
      const { error } = await sb.from('journal_entries').upsert({
        user_email: userEmail,
        course_id: courseId,
        module_id: moduleId,
        lesson_id: lessonId,
        entry: entry || '',
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_email,course_id,module_id,lesson_id' });
      if (error) throw error;
      return ok({ success: true });
    }

    return fail('Invalid action');
  } catch (err) {
    console.error('Journal entry error:', err);
    return fail('Journal entry failed: ' + err.message, 500);
  }
};
