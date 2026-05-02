-- ============================================================
-- NTAS98 — Trinity (Divination Sanctuary) Migration
-- ============================================================
-- Adds:
--   • trinity_readings — stores every Astro-Odu, Numerology, and Human Design reading
--   • profiles.last_talking_odu — surfaced on the member portal Sacred Center
--
-- Safe to re-run. Idempotent.
-- ============================================================

-- 1. TRINITY READINGS ----------------------------------------
-- One row per completed reading. JSONB holds chart inputs + AI output.
create table if not exists public.trinity_readings (
  id            uuid primary key default gen_random_uuid(),
  user_email    text not null references public.users(email) on delete cascade,
  tool          text not null check (tool in ('astro-odu','numerology','human-design')),
  inputs        jsonb,           -- birth data, name, etc.
  chart         jsonb,           -- computed chart (placements, gates, numbers)
  output        jsonb,           -- the AI-generated reading sections
  talking_odu   text,            -- denormalized for fast Sacred Center read (astro-odu only)
  created_at    timestamptz not null default now()
);

create index if not exists idx_trinity_user_tool
  on public.trinity_readings(user_email, tool, created_at desc);

create index if not exists idx_trinity_user_recent
  on public.trinity_readings(user_email, created_at desc);

-- 2. PROFILE EXTENSIONS --------------------------------------
-- Cache the latest Talking Odu directly on the profile for instant Sacred Center load.
alter table public.profiles add column if not exists last_talking_odu        text;
alter table public.profiles add column if not exists last_talking_odu_at     timestamptz;
alter table public.profiles add column if not exists last_human_design_type  text;

-- 3. RLS -----------------------------------------------------
alter table public.trinity_readings enable row level security;
-- No policies = no anon access. Service role still has full access.
