-- ============================================================
-- NTAS98 — Daily Snippet & Weekly Deep Dive: history + dominant element
-- ============================================================
-- WHAT THIS DOES
--   Adds the data plumbing the new content framework needs:
--
--   1. profiles.dominant_element       — cached Fire/Earth/Air/Water
--      computed once per profile by compute-identity.js, used to look
--      up the user's profile-element Orisha for daily snippets.
--
--   2. profiles.trines                  — cached JSONB array of the
--      user's natal trine pairings (e.g. ["sun-moon","mars-pluto"]).
--      Computed once per profile by compute-identity.js so the daily
--      snippet and weekly deep dive can pick from this pool without
--      recomputing the chart on every page load.
--
--   3. snippet_history                  — table tracking which Trine
--      or Orisha entry was shown to which user, when, in which feature.
--      Lets daily-snippet.js and weekly-deep-dive.js avoid repeating a
--      pick within a 14-day (daily) or 14-week (weekly) window.
--
-- Idempotent: every statement uses IF NOT EXISTS, so safe to re-run.
-- Nothing is renamed or removed.
--
-- HOW TO RUN
--   1. Open Supabase → SQL Editor → New Query
--   2. Paste this entire file
--   3. Run. Should report "Success. No rows returned."
--   4. Confirm in Table Editor that:
--        - profiles has columns: dominant_element, trines
--        - snippet_history exists
-- ============================================================

-- 1. PROFILE COLUMNS -----------------------------------------
alter table public.profiles
  add column if not exists dominant_element text;

-- Constrain dominant_element to the four valid values. We add the
-- check separately so re-running the migration after data is present
-- doesn't reject legitimate rows.
do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
     where table_schema='public'
       and table_name='profiles'
       and constraint_name='profiles_dominant_element_check'
  ) then
    alter table public.profiles
      add constraint profiles_dominant_element_check
      check (dominant_element is null or dominant_element in ('Fire','Earth','Air','Water'));
  end if;
end $$;

-- Cached trine pool: array of trine ids like ["sun-moon","venus-mars"].
-- Stored as jsonb so we can query it cheaply later if needed.
alter table public.profiles
  add column if not exists trines jsonb;


-- 2. SNIPPET HISTORY TABLE -----------------------------------
create table if not exists public.snippet_history (
  id           uuid primary key default gen_random_uuid(),
  user_email   text not null references public.users(email) on delete cascade,
  feature      text not null check (feature in ('daily-snippet','weekly-deep-dive')),
  source_type  text not null check (source_type in ('trine','orisha')),
  source_id    text not null,        -- e.g. "sun-moon" or "1-3-fire"
  source_name  text,                 -- e.g. "Sun-Moon Trine" — denormalized for log readability
  shown_at     timestamptz not null default now()
);

-- Lookup pattern: "what did this user see in feature X within the last
-- N days/weeks?" — covered by this composite index.
create index if not exists idx_snippet_history_user_feature_recent
  on public.snippet_history(user_email, feature, shown_at desc);


-- 3. ROW LEVEL SECURITY --------------------------------------
-- Match the rest of the schema: enable RLS, no policies. The Netlify
-- functions use the SUPABASE_SERVICE_KEY which bypasses RLS entirely.
-- Enabling without policies prevents accidental anon-key reads.
alter table public.snippet_history enable row level security;


-- 4. SANITY CHECKS (read-only — run after migration to verify) --
--
--   Confirm new columns exist on profiles:
--
--     select column_name, data_type
--       from information_schema.columns
--      where table_schema='public' and table_name='profiles'
--        and column_name in ('dominant_element','trines')
--      order by column_name;
--
--   Confirm snippet_history table:
--
--     select column_name, data_type, is_nullable
--       from information_schema.columns
--      where table_schema='public' and table_name='snippet_history'
--      order by ordinal_position;
--
--   Confirm the recency index:
--
--     select indexname from pg_indexes
--      where schemaname='public' and tablename='snippet_history';
-- ============================================================
