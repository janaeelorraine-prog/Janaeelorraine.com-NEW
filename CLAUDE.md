# Janaeelorraine.com — NTAS98 Project Memory

> **Canon source of truth:** Notion — The Settled Foundations (locked Aug 10, 2026).
> This memory reflects the *Site Rebuild to Canon* spec. Anything on the old live
> site that conflicts with what's below is pre-canon and gets replaced — do not
> carry over old copy or old structure.

## Owner
Janaee Lorraine Sharp. Founder of NTAS98 (Nature, Trap, Soul, 1998).
Spiritual practitioner, diviner, author, and artist rooted in the full diaspora.
Aries Sun, Aquarius Moon, Libra Rising, born March 23, 1998 in Columbus, Ohio.
Legally blind, has ADHD and autism. Works in 10-minute focused intervals.

## Brand: NTAS98
Mark: **NTAS98 · Nature · Trap · Soul · 1998.**
Three pillars: Nature (earth as healer), Trap (energetic bondage and the pursuit of freedom through balance), Soul (the soul inhabits the physical; even a damaged soul can heal).

Palette (finalize exact tokens in the brand pass): **deep indigo, antique gold, forest green, warm brown / cream.**

Typography:
- **Cinzel** — display / headings, tracked uppercase
- **EB Garamond** — body text, italics for prophetic voice

Symbol: The ankh is the central sacred sigil. Do not replace.

Aesthetic: Ritual luxury, dark academia, mystical-editorial, rooted and grounded.

Avoid: Neon, generic wellness, corporate blues, low-contrast text, motion-heavy distractions, glossy tech-startup energy.

## Voice
Direct, kind but real, conversational — never AI-sounding. Uses contractions and natural rhythm over formal polish.
Channeled and prophetic when delivering readings — speaks as if delivering wisdom from beyond linear time.
Address the seeker directly: "Your soul...", "The Ori knows...", "Hear this..."

Signature vocabulary: "reclaim," "this is medicine," "your body already knows," and the full diaspora's terminology used with reverence.

Important: Janaee does NOT like the word "sovereign" applied to herself. She prefers "rooted." Use "sovereign" for systems and frameworks, never for her personally.

Avoid: clinical detachment, generic wellness language, performative self-help energy, generic Western astrology vocabulary.

## AstroOdu — the cosmology (front and center of NTAS98)
AstroOdu is a **lived cosmology and a way of life** — never a "framework," "system," or "proprietary framework" in the teaching or marketing voice. (IP / ownership language may appear only on legal / copyright pages.)

It draws on the **full diaspora**. Never reduce it to "Yoruba · Kemetic · Hoodoo," and never to "Yoruba Ifá + Western astrology + chakras." The breadth is the integrity.

### Shared cosmology
- "Everything is everything" — interconnected continuum
- Ma'at = universal order, divine balance
- Iwa-pele = balanced character, the axis of belonging
- The Ori = inner head, divine seat of personal destiny
- Sankofa = reach back to fetch ancestral wisdom
- Neheh and Djet = cyclical celestial time and frozen suspension at first breath
- The seeker is a conscious co-worker with the universe, never a slave of fate

### The Three Pillars
Nature · Trap · Soul, **carried as Astrology · Body · Numerology.**
The **Odu / Ifá is the master key that runs through all three** — it is *not* one of the three. Never frame the pillars as "Ifá / Astrology / Chakras."

- **Pillar I — Astrology (Nature):** the starry alphabet mapped to the body. Planets as "Vowels" (internal faculties of the soul); zodiac signs as "Consonants" (environmental windows / houses). 16 Major Odu Ifá: Ogbe, Oyeku, Iwori, Odi, Irosun, Owonrin, Obara, Okanran, Ogunda, Osa, Ika, Oturupon, Otura, Irete, Oshe, Ofun. Progressed Ascendant moves 1°/year — the "Talking Odu" speaking now. Squares (90°) and Oppositions (180°) = Karmic Work Orders (Isfet) requiring active remediation. North Node = growth direction; South Node = ancestral inheritance / Sankofa gift.
- **Pillar II — The Body:** the **Twelve Thrones**, read per person. NEVER "seven/nine chakra centers" or "Orisha-mapped chakras." Spirit selection is **mathematical (Resonance Score)** — a safety law. Never present the user a menu of spirits to choose from.
- **Pillar III — Numerology (Chaldean):** letters carry values 1–8; 9 is sacred and unspoken in letters but appears as a sum. Master numbers are never reduced: 11 (Ancestral Channel), 22 (Master Builder of Ma'at), 33 (Master Healer-Sanctuary). Karmic numbers: 13, 14, 16, 19, 26 (Isfet requiring remediation). Compound numbers (10+) carry meaning beneath the reduced digit — read both layers. Birth name = frozen vibration; chosen name = active expression — read both when present.

### The birthchart (member data)
Fed by the existing **Living Temple engine** (`astroodu.vercel.app`), which reads structured records from **Supabase** and living prose from **Notion**. The brand site's member area is the *door into* that engine — not a from-scratch chart build.
- Supabase (structured floor — gates, Odu, thrones, spirits, materia): project `kzmfcjhmpdffxhfjnkbu`.
- Chart layers to display:
  - **Surface Wheel — 48 gates.** Gate = `ceil(absolute_longitude / 7.5)`. **7.5° per gate. NEVER 64 or 72 gates.**
  - **Odu landings** per placement.
  - **Twelve Thrones** — spirit read per person (Resonance Score, never a menu).
  - **Reverse Wheel** — the ancestral / past-life chart, offset **−88°**.
- The wheel turns from the natal Moon (Ori-point) by the Living Sky. Planetary positions via Swiss Ephemeris (pyswisseph).

### Retired from the old cosmology (do NOT reintroduce)
- **Human Design** (types/authorities/9 centers/64 gates) — retired.
- **Chakra** language of any kind, incl. "Orisha-mapped chakras," "nine Orisha centers."
- **Carto astrology** and **blood-type nutrition** framing (old Root Portal).
- The **"Omo → Aborisa → Oshawala"** public rank ladder. (Oshawala is Janaee's own spiritual name, not a public tier.)
- "Proprietary framework" / "system" language in teaching or marketing voice.

## Site map (the rebuild — two sides under one roof)
**Public**
- `/` — NTAS98 front door: brand walk-in (Nature · Trap · Soul · 1998), About Janaee, a featured taste of the shop, one clear CTA into the member area.
- `/shop` — Divine Products: full apothecary catalogue + checkout.
- `/booking` — The Healing Corner: sessions / booking (Calendly). Stays public.

**Member (behind one login)**
- `/login` and the member home (`/member` or keep `/portal`) — holds everything deep:
  - Your **AstroOdu birthchart** (the reason to log in)
  - **AstroOdu** — the cosmology, correctly labeled
  - **The Keeping of Eko** — the school (courses)
  - **Practitioner track** — gated, application-based, above the school

**Retired / folded (do NOT rebuild as-is):** the standalone public `/astroodu` and `/courses` sales pages, `/trinity/*`, `/astroodu/initiation`, `/astroodu/certification` as separate purchase flows, and the old five-door layout on `/`. Their content moves inside the member house / Practitioner track.

## Membership & payments 🔒
- **One membership tier. No tiers.** Grants the full member house (birthchart + cosmology + full school).
- Price: **$22.22 / month** or **$222 / year** (annual ≈ 2 months free).
- Processor: **Stripe** (already connected). One product "AstroOdu Membership" with two recurring prices ($22.22/mo, $222/yr).
- The school (The Keeping of Eko) is **included** in membership — courses are never sold à la carte.
- **Retired:** PayPal-per-course one-time buys with hand-emailed access codes; the old Root Portal tiers (Seed / Root / Elder, ~$5.55–$14.14).

## Practitioner track 🔒
- One-time fee: **$399** (Stripe one-time charge).
- Gating: application + approval. Sits above the school.
- **Licensing rule — the license is held by the school.** To earn it: pass every course in the membership (The Keeping of Eko). To keep it: stay an active member with coursework completed. The license does not stand apart from the membership — if the membership lapses, the license does not hold.
- Implementation: `practitioner === (active_membership === true && all_courses_passed === true && practitioner_fee_paid === true)`. Re-check on every membership state change.

## The school — The Keeping of Eko
- Build the catalogue from **Notion**, not old hardcoded courses. Courses & Programs data source: `180c814e-5187-48a4-a999-07853bdfa9f1`.
- Progression: **Entry → Prereq → Seed → Branch → Mastery.**
- Module shape (five parts): **Teaching · Plain Words · Practice · Cautions · Sit With This.**
- Master Glossary DB (if surfaced in-course): `72d82894-09ee-42e0-8a00-58ce23792645`.
- **Retired:** the old four "Ancestral Studies" courses as standalone $111–$177 buys.

## Tech Stack
- Static site deployed via **Netlify** (publish = `.`); GitHub for source control.
- **Netlify Functions** in `/netlify/functions` — auth (Supabase + bcrypt), profile, blueprint, course-progress, bots, etc. All secrets are server-side env vars.
- **Auth/data:** Supabase (`users` table). Being migrated off the old `portal_tier` / `courses[]` model to single-membership + practitioner state.
- **Payments:** Stripe (membership + $399 practitioner). Booking uses **Calendly** (all session event types active on a paid plan).
- **Chart engine:** the Living Temple (`astroodu.vercel.app`) over Supabase `kzmfcjhmpdffxhfjnkbu` + Notion prose.
- Anthropic API (via Netlify Functions) for channeled reading generation. No keys in client code.

## Member system goals
The member area must show DIFFERENT content based on user state — never the same thing every visit.
- **Anonymous / public:** sees the public side + the invitation to join.
- **Active member:** full member house — birthchart, the AstroOdu cosmology, the full school (The Keeping of Eko), daily Talking Odu / moon / Personal Year, channeled daily message.
- **Lapsed member:** access closes; any earned practitioner license does not hold while lapsed.
Onboarding collects birth name, chosen name, birth date, birth time, birth location. Every member's chart runs through the Living Temple engine on that data.

## Conventions
- Always preserve NTAS98 brand standards (palette, typography, ankh, voice) and canon labeling.
- Always create a feature branch and push for review — never commit directly to main (unless Janaee explicitly says to deploy to main).
- Conventional commit messages (feat:, fix:, refactor:, docs:, chore:).
- Mobile-first responsive design.
- Accessibility: large readable serif typography, high contrast, minimal animation, no flashing.
- Print-to-PDF support where reading content is generated.
- Always propose plans in plain language BEFORE writing code on substantial tasks. Scaffold structure first; final copy (in Janaee's voice) is a separate pass.

## Canon labeling — MUST enforce everywhere (copy + UI)
These are locked. The old site breaks all of them.
1. AstroOdu is a **lived cosmology / way of life** — never "framework," "system," or "proprietary framework" in teaching/marketing voice.
2. **Full diaspora** — never the "Yoruba · Kemetic · Hoodoo" triple, never "Yoruba Ifá + Western astrology + chakras."
3. The body is the **Twelve Thrones, read per person** — never chakras, never "Orisha-mapped centers."
4. **Three Pillars = Nature · Trap · Soul** (carried as Astrology · Body · Numerology). Ifá / the Odu is the master key through all three, not one of them.
5. **Gate count = 48** (7.5°/gate). Never 64 or 72.
6. No Human Design, Carto astrology, or blood-type-nutrition framing. No "Omo → Aborisa → Oshawala" rank ladder.

## Critical Rules
- The cosmology, Odu / spirit mappings, and structures are Janaee's intellectual property. Never modify canon data without her direct approval.
- **Spirit selection is mathematical (Resonance Score) — a safety law.** Never build UI that hands the user a menu of spirits to choose from.
- The channeled-prophetic voice in readings is intentional. Never soften it to clinical or generic wellness language.
- Do not expose any API keys or payment secrets in client-side code. All Anthropic / Stripe / Supabase-service calls go through Netlify Functions.
- For accessibility (legally blind owner): always maintain high contrast, large readable serif fonts, no flashing or motion-heavy distractions.
