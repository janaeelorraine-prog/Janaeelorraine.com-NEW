// ============================================================
// POST /.netlify/functions/course-progress
// Body: { action: 'load'|'save', userEmail, courseId, ... }
// ------------------------------------------------------------
// Schema (public.course_progress):
//   user_email | course_id | module_id | lesson_id | completed | updated_at
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

  const { action, userEmail: emailRaw, courseId, moduleId, lessonId, completed } = body;
  const userEmail = (emailRaw || '').trim().toLowerCase();

  if (!action || !userEmail || !courseId) return fail('Missing fields');

  try {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    if (action === 'load') {
      const { data, error } = await sb
        .from('course_progress')
        .select('module_id, lesson_id, completed, updated_at')
        .eq('user_email', userEmail)
        .eq('course_id', courseId);
      if (error) throw error;
      return ok({ success: true, progress: data || [] });
    }

    if (action === 'save') {
      if (!moduleId || !lessonId) return fail('Missing moduleId/lessonId');
      const { error } = await sb.from('course_progress').upsert({
        user_email: userEmail,
        course_id: courseId,
        module_id: moduleId,
        lesson_id: lessonId,
        completed: !!completed,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_email,course_id,module_id,lesson_id' });
      if (error) throw error;
      return ok({ success: true });
    }

    return fail('Invalid action');
  } catch (err) {
    console.error('Course progress error:', err);
    return fail('Course progress failed: ' + err.message, 500);
  }
};
