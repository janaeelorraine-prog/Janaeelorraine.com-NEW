# Janaeelorraine.com — NTAS98 Project Memory

## Owner
Janaee Lorraine Sharp. Founder of NTAS98 (Nature, Trap, Soul, 1998).
Spiritual practitioner, diviner, author, and artist rooted in Yoruba/Ifa, Kemetic science, and Hoodoo traditions.
Manifesting Generator 6/2 (Human Design), Aries Sun, Aquarius Moon, Libra Rising, born March 23, 1998 in Columbus, Ohio.
Legally blind, has ADHD and autism. Works in 10-minute focused intervals.

## Brand: NTAS98
Three pillars: Nature (earth as healer), Trap (energetic bondage and the pursuit of freedom through balance), Soul (the soul inhabits the physical; even a damaged soul can heal).

Palette:
- White: #f5f1e8
- Black: #050403, #0a0908
- Gold: #d4af37 (primary), #f4d03f (bright), #a8852a (deep)
- Element accents: Fire #c4592f, Earth #8b7955, Air #e4d19e, Water #5f8296

Typography:
- Cormorant Garamond — body text, italics for prophetic voice
- Cinzel — display labels, tracked uppercase

Symbol: The ankh is the central sacred sigil. Do not replace.

Aesthetic: Ritual luxury, dark academia, mystical-editorial, sovereign grounded mystical.

Avoid: Neon, generic wellness, corporate blues, low-contrast text, motion-heavy distractions, glossy tech-startup energy.

## Voice
Direct, kind but real, conversational — never AI-sounding. Uses contractions and natural rhythm over formal polish.
Channeled and prophetic when delivering readings — speaks as if delivering wisdom from beyond linear time.
Address the seeker directly: "Your soul...", "The Ori knows...", "Hear this..."

Signature vocabulary: "reclaim," "this is medicine," "your body already knows," and Yoruba/Ifa and Kemetic terminology used with reverence.

Important: Janaee does NOT like the word "sovereign" applied to herself. She prefers "rooted." Use "sovereign" for systems and frameworks, never for her personally.

Avoid: clinical detachment, generic wellness language, performative self-help energy, generic Western astrology vocabulary.

## The Astro-Odu Trinity (front and center of NTAS98)
Three sister spiritual divination systems built on a shared cosmology. These ARE the brand experience now.

### Shared Cosmology (across all three)
- "Everything is everything" — interconnected continuum
- Ma'at = universal order, divine balance
- Iwa-pele = balanced character, the axis of belonging
- The Ori = inner head, divine seat of personal destiny
- Sankofa = reach back to fetch ancestral wisdom
- Neheh and Djet = cyclical celestial time and frozen suspension at first breath
- The seeker is a conscious co-worker with the universe, never a slave of fate

### 1. Astro-Odu (astrology)
Synthesis of Kemetic natural law, Ifa divination, and Hoodoo spiritual technology.
- Planets are "Vowels" — internal faculties of the soul
- Zodiac Signs are "Consonants" — environmental windows / houses
- 16 Major Odu Ifa: Ogbe, Oyeku, Iwori, Odi, Irosun, Owonrin, Obara, Okanran, Ogunda, Osa, Ika, Oturupon, Otura, Irete, Oshe, Ofun
- Internal Engine — 7 Orisha mapped to chakras: Eshu/Crown, Oya/Third Eye, Obatala/Throat, Oshun/Heart, Ogun/Solar Plexus, Yemoja/Sacral, Shango/Root
- Mathematical Calibration: progressed Ascendant moves 1° per year of life — the "Talking Odu" speaking now
- Squares (90°) and Oppositions (180°) = Karmic Work Orders, Isfet requiring active remediation
- North Node = soul's growth direction; South Node = ancestral inheritance and Sankofa gift
- Spiritual Technology: Hoodoo + Ebo via Three-Ingredient Principle (mineral + liquid + herb)

### 2. Astro-Odu Numerology (Chaldean method)
- Letters carry values 1-8; the number 9 is sacred and unspoken in letters but appears as a sum
- Numbers 1-9 mapped to 9 Orisha:
  1 = Eshu-Elegba (Gateway, Catalyst)
  2 = Ibeji (Duality, Partnership)
  3 = Ogun (Pathmaker, Builder)
  4 = Osoosi (Tracker, Stability)
  5 = Oshun (Diplomat, Sensualist)
  6 = Shango (King, Transformer)
  7 = Yemoja (Cosmic Mother, Mystic)
  8 = Obatala (Architect, Law, Iwa-pele)
  9 = Oya (Tempest, Transition)
- Master numbers are sovereign and never reduced: 11 (Ancestral Channel), 22 (Master Builder of Ma'at), 33 (Master Healer-Sanctuary)
- Karmic numbers (Chaldean): 13, 14, 16, 19, 26 — flagged as Isfet requiring active remediation
- Compound numbers (10+) carry meaning beneath the reduced single digit — read both layers
- Birth name = soul's frozen vibration; chosen name = active expression — read both when present

### 3. Astro-Odu Human Design
- 64 Gates re-rooted as 16 Major Odu × 4 Elemental Quadrants (Fire, Earth, Air, Water). Gate names: "Odu-Element"
- 9 Centers governed by Orisha: Head/Eshu, Ajna/Oya, Throat/Obatala, G/The Ori, Heart/Shango, Solar Plexus/Yemoja, Sacral/Oshun, Spleen/Osoosi, Root/Ogun
- 5 Types each carry an Orisha governance:
  Manifestor = Eshu (Strategy: inform; Signature: Peace)
  Generator = Ogun (Strategy: wait to respond; Signature: Satisfaction)
  Manifesting Generator = Ogun-Eshu (Strategy: respond, then inform; Signature: Satisfaction & Peace)
  Projector = Obatala (Strategy: wait for invitation; Signature: Success)
  Reflector = Yemoja master (Strategy: wait a lunar cycle; Signature: Surprise)
- 7 Authorities: Emotional/Yemoja, Sacral/Oshun, Splenic/Osoosi, Ego/Shango, G Self-Projected/The Ori, Mental/Eshu, Lunar/Yemoja master
- Two timestamps: Personality (birth, conscious) and Design (88° before birth, unconscious ancestral inheritance)
- Profile = conscious Personality Sun line / unconscious Design Sun line
- Incarnation Cross = 4 gates (P Sun + P Earth + D Sun + D Earth) = soul's specific mission

Three HTML tools currently exist (astro-odu.html, astro-odu-numerology.html, astro-odu-human-design.html) with full calculation engines and reading-generation logic. Reuse this code rather than rewriting.

## Tech Stack
- Static site deployed via Netlify
- GitHub repository for source control
- Netlify Functions in /netlify/functions (15 functions including auth-login, auth-register, course-progress, get-profile, generate-blueprint, trinity-* readings)
- Anthropic API integration via Netlify Functions for channeled reading generation
- Course content in /courses/

## Conventions
- Always preserve NTAS98 brand standards (palette, typography, ankh, voice)
- Always create a feature branch and push for review — never commit directly to main
- Use clear conventional commit messages (feat:, fix:, refactor:, docs:, chore:)
- Mobile-first responsive design
- Accessibility: large readable serif typography, high contrast, minimal animation, no flashing
- Print-to-PDF support where reading content is generated
- Always propose plans in plain language BEFORE writing code on substantial tasks

## Member System Goals
Members area must show DIFFERENT content based on user state — never the same thing every visit.

Three states:
1. First-time login (no saved profile) → onboarding flow collecting birth name, chosen name, birth date, birth time, birth location
2. Returning login (profile saved, not yet active subscriber) → personalized dashboard with saved Astro-Odu trinity preview, locked content with subscribe CTAs
3. Active subscriber → full personalized dashboard with daily Talking Odu, current moon phase, Personal Year energy, channeled daily message, full course access

Every member's profile runs all three Astro-Odu frameworks (Astro-Odu astrology, Numerology, Human Design) on their saved birth data.

Subscription tiers determine what content unlocks.

## Course System
- Lives at /courses/ (recently consolidated from three duplicate copies)
- Course access controlled by subscription level
- Lesson format: mix of video embeds, written content, and downloadable resources
- Course progress tracking via /netlify/functions/course-progress (currently not wired into the frontend — needs follow-up)

## Critical Rules
- The cosmology, Orisha mappings, and framework structures are Janaee's intellectual property. Never modify framework data without her direct approval.
- The channeled-prophetic voice in readings is intentional. Never soften it to clinical or generic wellness language.
- Do not expose any API keys in client-side code. All Anthropic API calls go through Netlify Functions.
- When generating readings, use the system prompts already established in the three Astro-Odu HTML tools — do not rewrite them without approval.
- For accessibility (legally blind owner): always maintain high contrast, large readable serif fonts, no flashing or motion-heavy distractions.
