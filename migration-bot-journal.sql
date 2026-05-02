-- ============================================================
-- NTAS98 — Guidance Bot + Weekly Journal Migration
-- ============================================================
-- WHAT THIS DOES
--   Creates three new tables to support two new dashboard features:
--     1. The Astro-Odu Guidance Bot (chat) — bot_conversations + bot_messages
--     2. The Weekly Reflection journal     — weekly_journal_entries
--
--   Nothing existing is renamed or removed. The migration is idempotent:
--   re-running it is a no-op (every CREATE uses IF NOT EXISTS).
--
-- TABLE-BY-TABLE EXPLANATION
--
--   public.bot_conversations
--     One row per chat thread. A member can have many threads. The
--     dashboard shows the most recent thread by default and lists the
--     others in a "Past threads" dropdown.
--       id          — UUID, primary key
--       user_email  — owner; cascades on user delete
--       title       — auto-generated from the first user message,
--                     truncated. Used as the dropdown label. Editable
--                     server-side later if we add a rename action.
--       created_at  — when the thread started
--       updated_at  — bumped on every new message in this thread; lets
--                     us order the dropdown by most-recent-activity
--
--   public.bot_messages
--     The flat message log. Joined to a conversation. Order by
--     created_at to render the chat. Both the user's prompts and the
--     bot's replies live here.
--       id              — UUID, primary key
--       conversation_id — references bot_conversations(id), cascades
--       user_email      — denormalized for fast monthly-usage queries
--                         (the seed-tier 3-message cap counts rows
--                         where role='user' AND user_email=? AND
--                         created_at >= start_of_month). Avoids a join.
--       role            — 'user' or 'assistant'
--       content         — the message body, plain text
--       created_at      — when this message was saved
--     Index idx_bot_messages_user_month exists for the usage query.
--
--   public.weekly_journal_entries
--     One row per (member, ISO Monday). Members can edit the CURRENT
--     week's entry freely; past weeks are sealed by the server (the
--     write endpoint refuses to upsert when week_start ≠ this week's
--     Monday). The (user_email, week_start) primary key makes upserts
--     trivial.
--       user_email     — owner; cascades on user delete
--       week_start     — Monday of the ISO week this entry covers (UTC)
--       mood           — single value from the 5 mood radio buttons
--                        (Heavy / Tender / Steady / Lit / Untethered)
--       practices      — array of selected practice checkbox values
--                        (e.g. {meditation,divination,ritual_bath})
--       other_practice — free-text "other" field accompanying practices
--       dreams         — free-form dream notes for the week
--       reflection     — free-form weekly reflection
--       created_at     — when first saved
--       updated_at     — bumped on every save while the week is open
--
-- HOW TO RUN
--   1. Open Supabase → SQL Editor → New Query
--   2. Paste the full contents of this file
--   3. Run. You should see "Success. No rows returned."
--   4. Confirm in Table Editor that bot_conversations, bot_messages,
--      and weekly_journal_entries appear in the left sidebar.
--
--   Run order vs deploy: the new Netlify Functions tolerate the tables
--   not yet existing — they return a clean error message instead of
--   crashing — so it is safe to deploy the code first or run the
--   migration first. The features will only fully light up after both.
-- ============================================================

-- 1. BOT CONVERSATIONS ---------------------------------------
create table if not exists public.bot_conversations (
  id          uuid primary key default gen_random_uuid(),
  user_email  text not null references public.users(email) on delete cascade,
  title       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_bot_conversations_user_recent
  on public.bot_conversations(user_email, updated_at desc);

-- 2. BOT MESSAGES --------------------------------------------
create table if not exists public.bot_messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references public.bot_conversations(id) on delete cascade,
  user_email       text not null,
  role             text not null check (role in ('user','assistant')),
  content          text not null,
  created_at       timestamptz not null default now()
);

create index if not exists idx_bot_messages_conversation
  on public.bot_messages(conversation_id, created_at);

create index if not exists idx_bot_messages_user_month
  on public.bot_messages(user_email, created_at);

-- 3. WEEKLY JOURNAL ENTRIES ----------------------------------
create table if not exists public.weekly_journal_entries (
  user_email      text not null references public.users(email) on delete cascade,
  week_start      date not null,
  mood            text,
  practices       text[] default '{}'::text[],
  other_practice  text,
  dreams          text,
  reflection      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  primary key (user_email, week_start)
);

create index if not exists idx_weekly_journal_user_recent
  on public.weekly_journal_entries(user_email, week_start desc);

-- 4. UPDATED_AT TRIGGERS -------------------------------------
-- Reuses the public.set_updated_at() function defined in schema.sql.

drop trigger if exists trg_bot_conversations_updated on public.bot_conversations;
create trigger trg_bot_conversations_updated
  before update on public.bot_conversations
  for each row execute function public.set_updated_at();

drop trigger if exists trg_weekly_journal_updated on public.weekly_journal_entries;
create trigger trg_weekly_journal_updated
  before update on public.weekly_journal_entries
  for each row execute function public.set_updated_at();

-- 5. ROW LEVEL SECURITY (belt + suspenders) ------------------
-- Same posture as the rest of the schema: enable RLS but add no
-- policies, so only the service-role key (used by Netlify Functions)
-- can read/write these tables. The anon key has no access.

alter table public.bot_conversations       enable row level security;
alter table public.bot_messages            enable row level security;
alter table public.weekly_journal_entries  enable row level security;

-- ============================================================
-- VERIFICATION QUERY (run this after the migration to confirm)
-- ============================================================
-- select table_name
--   from information_schema.tables
--  where table_schema = 'public'
--    and table_name in (
--      'bot_conversations','bot_messages','weekly_journal_entries'
--    )
--  order by table_name;
--
-- You should see 3 rows.
-- ============================================================
