-- ============================================================
-- NTAS98 — Supabase Schema
-- ============================================================
-- Run this ENTIRE file in Supabase → SQL Editor → New Query.
-- Safe to re-run: everything is idempotent (IF NOT EXISTS).
--
-- After running, confirm in Table Editor that you have:
--   users, profiles, course_progress, journal_entries, access_codes
-- ============================================================

-- 1. USERS ---------------------------------------------------
create table if not exists public.users (
  id                       uuid primary key default gen_random_uuid(),
  email                    text unique not null,
  name                     text,
  password_hash            text not null,
  portal_tier              text check (portal_tier in ('seed','root','elder')) default null,
  courses                  text[] default '{}'::text[],   -- legacy / à la carte; primary access is now tier-driven
  is_admin                 boolean not null default false,
  subscription_status      text check (subscription_status in ('active','past_due','canceled','trialing')) default null,
  subscription_started_at  timestamptz,
  subscription_renews_at   timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists idx_users_email on public.users(email);

-- Migration safety: widen the portal_tier check on existing tables to include 'elder'
do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where table_schema='public' and table_name='users' and constraint_name='users_portal_tier_check'
  ) then
    alter table public.users drop constraint users_portal_tier_check;
  end if;
  alter table public.users
    add constraint users_portal_tier_check
    check (portal_tier in ('seed','root','elder')) not valid;
exception when others then null;
end $$;

-- Migration safety: add subscription columns to existing deployments
alter table public.users add column if not exists subscription_status     text;
alter table public.users add column if not exists subscription_started_at timestamptz;
alter table public.users add column if not exists subscription_renews_at  timestamptz;

-- 2. PROFILES (the cosmic blueprint) -------------------------
create table if not exists public.profiles (
  user_email        text primary key references public.users(email) on delete cascade,
  full_name         text,
  preferred_name    text,
  dob               date,
  birth_time        time,
  birth_location    text,
  current_city      text,
  blood_type        text,
  generated_output  jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- 3. COURSE PROGRESS -----------------------------------------
create table if not exists public.course_progress (
  user_email    text not null references public.users(email) on delete cascade,
  course_id     text not null,
  module_id     text not null,
  lesson_id     text not null,
  completed     boolean not null default false,
  updated_at    timestamptz not null default now(),
  primary key (user_email, course_id, module_id, lesson_id)
);

create index if not exists idx_course_progress_user
  on public.course_progress(user_email, course_id);

-- 4. JOURNAL ENTRIES (per-lesson reflections) ----------------
create table if not exists public.journal_entries (
  user_email    text not null references public.users(email) on delete cascade,
  course_id     text not null,
  module_id     text not null,
  lesson_id     text not null,
  entry         text,
  updated_at    timestamptz not null default now(),
  primary key (user_email, course_id, module_id, lesson_id)
);

create index if not exists idx_journal_entries_user
  on public.journal_entries(user_email, course_id);

-- 5. ACCESS CODES --------------------------------------------
-- Lets you add / revoke codes from the DB without redeploying.
-- The auth-register function falls back to hardcoded defaults
-- if this table is empty, so it's safe to leave empty at first.
create table if not exists public.access_codes (
  code          text primary key,
  code_type     text not null check (code_type in ('portal','course')),
  tier          text check (tier in ('seed','root','elder')),
  course_id     text,
  active        boolean not null default true,
  max_uses      int,       -- null = unlimited
  uses          int not null default 0,
  note          text,
  created_at    timestamptz not null default now()
);

-- Migration safety: widen access_codes.tier check to include 'elder'
do $$
begin
  if exists (
    select 1 from information_schema.table_constraints
    where table_schema='public' and table_name='access_codes' and constraint_name='access_codes_tier_check'
  ) then
    alter table public.access_codes drop constraint access_codes_tier_check;
  end if;
  alter table public.access_codes
    add constraint access_codes_tier_check
    check (tier in ('seed','root','elder')) not valid;
exception when others then null;
end $$;

-- Seed the 3-tier defaults (idempotent — won't overwrite existing rows).
-- Ancestral Studies is now tier-gated (Root unlocks all 7 modules; Seed sees intro only).
-- The legacy course-level codes remain in the table if you previously inserted them,
-- but new portal subscriptions should use the tier codes below.
insert into public.access_codes (code, code_type, tier, course_id, note) values
  ('SEED777',    'portal', 'seed',  null, 'Tier 1 — Cosmic Profile + Ancestral Studies preview'),
  ('ROOT1414',   'portal', 'root',  null, 'Tier 2 — Full Profile + Human Design + ALL Ancestral Studies'),
  ('ELDER2222',  'portal', 'elder', null, 'Tier 3 — Everything in Root + Council Chamber + 1:1 access')
on conflict (code) do nothing;

-- Deactivate the old course-level codes (safe no-op if rows don't exist).
update public.access_codes
   set active = false,
       note   = coalesce(note,'') || ' — retired (replaced by tier-gated access)'
 where code in ('AFRICANA111','KEMETIC133','HEALING144','YORUBA177')
   and active = true;

-- 6. UPDATED_AT TRIGGERS -------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_users_updated on public.users;
create trigger trg_users_updated
  before update on public.users
  for each row execute function public.set_updated_at();

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_course_progress_updated on public.course_progress;
create trigger trg_course_progress_updated
  before update on public.course_progress
  for each row execute function public.set_updated_at();

drop trigger if exists trg_journal_entries_updated on public.journal_entries;
create trigger trg_journal_entries_updated
  before update on public.journal_entries
  for each row execute function public.set_updated_at();

-- 7. ROW LEVEL SECURITY (belt + suspenders) ------------------
-- Your Netlify functions use the SERVICE_ROLE key which bypasses
-- RLS entirely — so these policies don't affect your backend.
-- But enabling RLS prevents accidental exposure if the ANON key
-- is ever used to query these tables directly from the browser.
alter table public.users            enable row level security;
alter table public.profiles         enable row level security;
alter table public.course_progress  enable row level security;
alter table public.journal_entries  enable row level security;
alter table public.access_codes     enable row level security;

-- No policies = no anon access. Service role still has full access.

-- ============================================================
-- BOOTSTRAP YOUR ADMIN ACCOUNT
-- ============================================================
-- 1. Register normally at /login.html with any access code.
-- 2. Come back to Supabase → SQL Editor and run:
--
--    update public.users set is_admin = true
--    where email = 'your@email.com';
--
-- 3. You can now log in to /admin.html
-- ============================================================
