-- ============================================================
-- NTAS98 — Identity Card Migration
-- ============================================================
-- WHAT THIS DOES
--   Adds a handful of nullable columns to the existing public.profiles
--   table so the new dashboard "Core Identity" card can persist its
--   computed values (Moon, Ascendant, HD Type, HD Authority, Personal
--   Year) and the resolved birth-location coordinates.
--
--   Nothing is renamed. Nothing is removed. Existing data is untouched.
--   The migration is idempotent — re-running it does nothing on the
--   second pass (every statement uses IF NOT EXISTS).
--
-- WHY EACH COLUMN EXISTS
--   moon_sign       — cached moon sign so the dashboard doesn't recompute
--                     the full natal chart on every page load.
--   ascendant       — cached rising sign, same reason.
--   hd_type         — cached Human Design Type ("Generator", "Projector",
--                     "Manifestor", "Manifesting Generator", or "Reflector").
--   hd_authority    — cached HD Authority ("Emotional", "Sacral", etc.).
--   personal_year   — the Chaldean Personal Year for the current calendar
--                     year, recomputed yearly. Cached for the dashboard's
--                     identity card and the daily snippet prompt.
--   latitude        — resolved latitude of the seeker's birth location
--                     (degrees; -90..90). Set by the geocoder.
--   longitude       — resolved longitude (degrees; -180..180).
--
--   These mirror values that already exist on `last_talking_odu` /
--   `last_human_design_type`, but expose them as first-class columns so
--   the dashboard can read a single row and render the full identity
--   without re-running any astrological math.
--
-- HOW TO RUN
--   1. Open Supabase → SQL Editor → New Query
--   2. Paste the full contents of this file
--   3. Run. You should see "Success. No rows returned."
--   4. (Optional) Confirm in Table Editor that profiles now has the
--      seven new columns at the bottom of its column list.
--
--   It is safe to run before deploying the new code, after deploying
--   it, or to re-run later — the new code tolerates these columns being
--   absent (the upsert silently skips them) but works best with them
--   in place.
-- ============================================================

alter table public.profiles add column if not exists moon_sign     text;
alter table public.profiles add column if not exists ascendant     text;
alter table public.profiles add column if not exists hd_type       text;
alter table public.profiles add column if not exists hd_authority  text;
alter table public.profiles add column if not exists personal_year int;
alter table public.profiles add column if not exists latitude      double precision;
alter table public.profiles add column if not exists longitude     double precision;

-- A light sanity check — run this query after the migration to confirm
-- the new columns exist:
--
--   select column_name, data_type
--     from information_schema.columns
--    where table_schema = 'public'
--      and table_name   = 'profiles'
--      and column_name in (
--        'moon_sign','ascendant','hd_type','hd_authority',
--        'personal_year','latitude','longitude'
--      )
--    order by column_name;
--
-- You should see 7 rows.
