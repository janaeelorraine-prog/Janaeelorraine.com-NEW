-- ============================================================
-- MIGRATION: Quiz Results Table
-- Run this in Supabase SQL Editor.
-- Safe to re-run: uses "if not exists".
-- ============================================================
-- Adds the public.quiz_results table used by Module I check-ins
-- and end-of-module exams. The course-progress.js Netlify
-- function writes here via action: 'saveQuiz'.
--
-- If you don't run this migration, the front-end still works —
-- quiz results persist to the user's localStorage. Running it
-- gives you cross-device sync and admin visibility.
-- ============================================================

create table if not exists public.quiz_results (
  user_email      text not null references public.users(email) on delete cascade,
  course_id       text not null,
  scope           text not null,        -- e.g. 'lesson:l1' or 'exam:cosmology'
  score           numeric,              -- 0..1
  correct         int,
  total           int,
  passed          boolean default false,
  pass_threshold  numeric default 0.8,
  attempts        int default 1,
  updated_at      timestamptz default now(),
  primary key (user_email, course_id, scope)
);

create index if not exists idx_quiz_results_user
  on public.quiz_results(user_email, course_id);

-- updated_at trigger (re-uses helper from main schema)
drop trigger if exists trg_quiz_results_updated on public.quiz_results;
create trigger trg_quiz_results_updated
  before update on public.quiz_results
  for each row execute function public.set_updated_at();

-- RLS
alter table public.quiz_results enable row level security;

drop policy if exists "service role full access quiz_results" on public.quiz_results;
create policy "service role full access quiz_results"
  on public.quiz_results
  for all
  to service_role
  using (true) with check (true);

-- ============================================================
-- Done. Verify in Table Editor: public.quiz_results should now
-- exist with the columns above.
-- ============================================================
