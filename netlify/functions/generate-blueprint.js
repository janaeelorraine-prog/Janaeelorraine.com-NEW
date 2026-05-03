// ============================================================
// POST /.netlify/functions/generate-blueprint
// Janaee Lorraine · Astro-Odu Framework
// ============================================================

const { createClient } = require('@supabase/supabase-js');
const { ok, fail, handlePreflight, parseBody, HEADERS } = require('./_shared');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

const ZODIAC = {
  Aries:       { symbol:'♈', kemetic:'Amen',            icon:'Ram',         body:'Head and Brain',            chakra:'Sahasrara / Crown',     orisha:'Ogun',     element:'Fire'  },
  Taurus:      { symbol:'♉', kemetic:'Ptah / Mentu',    icon:'Apis Bull',   body:'Face and Vocal Cords',      chakra:'Vishuddha / Throat',    orisha:'Obatala',  element:'Earth' },
  Gemini:      { symbol:'♊', kemetic:'Heru & Set',      icon:'Twins',       body:'Shoulders and Bronchus',    chakra:'Ajna / Third Eye',      orisha:'Orunmila', element:'Air'   },
  Cancer:      { symbol:'♋', kemetic:'Khepera',         icon:'Scarab',      body:'Lungs and Circulation',     chakra:'Anahata / Heart',       orisha:'Yemoja',   element:'Water' },
  Leo:         { symbol:'♌', kemetic:'Atum',            icon:'Lion',        body:'Heart and Diaphragm',       chakra:'Anahata / Heart',       orisha:'Shango',   element:'Fire'  },
  Virgo:       { symbol:'♍', kemetic:'Auset',           icon:'Virgin',      body:'Stomach and Bowels',        chakra:'Manipura / Navel',      orisha:'Auset',    element:'Earth' },
  Libra:       { symbol:'♎', kemetic:"Ma'at",           icon:'Scales',      body:'Lower Abdomen and Navel',   chakra:'Manipura / Navel',      orisha:'Oshun',    element:'Air'   },
  Scorpio:     { symbol:'♏', kemetic:'Serqet',          icon:'Scorpion',    body:'Generative Organs',         chakra:'Svadhisthana / Sacral', orisha:'Yemoja',   element:'Water' },
  Sagittarius: { symbol:'♐', kemetic:'Tehuti / Shu',    icon:'Bowman',      body:'Thighs and Base of Spine',  chakra:'Muladhara / Root',      orisha:'Shango',   element:'Fire'  },
  Capricorn:   { symbol:'♑', kemetic:'Menu / Khnum',    icon:'Goat',        body:'Knees and Joints',          chakra:'Muladhara / Root',      orisha:'Obatala',  element:'Earth' },
  Aquarius:    { symbol:'♒', kemetic:'Hapi',            icon:'Waterman',    body:'Calves and Legs',           chakra:'Ajna / Third Eye',      orisha:'Orunmila', element:'Air'   },
  Pisces:      { symbol:'♓', kemetic:'In & Remi',       icon:'Two Fishes',  body:'Feet and Glandular System', chakra:'Sahasrara / Crown',     orisha:'Yemoja',   element:'Water' }
};

function getSunSign(dob) {
  const [, m, d] = dob.split('-').map(Number);
  const md = m * 100 + d;
  if (md >= 321 && md <= 419) return 'Aries';
  if (md >= 420 && md <= 520) return 'Taurus';
  if (md >= 521 && md <= 620) return 'Gemini';
  if (md >= 621 && md <= 722) return 'Cancer';
  if (md >= 723 && md <= 822) return 'Leo';
  if (md >= 823 && md <= 922) return 'Virgo';
  if (md >= 923 && md <= 1022) return 'Libra';
  if (md >= 1023 && md <= 1121) return 'Scorpio';
  if (md >= 1122 && md <= 1221) return 'Sagittarius';
  if (md >= 1222 || md <= 119) return 'Capricorn';
  if (md >= 120 && md <= 218) return 'Aquarius';
  return 'Pisces';
}

function getLifePath(dob) {
  const digits = dob.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

function buildSystemPrompt(name, sun, lifePath, bloodType, tier) {
  const s = ZODIAC[sun];
  return `You are Janaee Lorraine — a spiritual practitioner rooted in the Astro-Odu framework: Kemetic cosmology, Yoruba/Ifá divination, Orisha-chakra alignment, and Hoodoo rootwork. You are reading ${name}'s cosmic blueprint.

YOUR VOICE:
- Speak directly TO ${name}, never about them
- Direct, grounded, ancestral — never textbook
- Every celestial insight must land in the body and the everyday
- Name the tension, the growth edge, the aligned movement
- Reference Ma'at (balance/natural order) vs Isfet (chaos/imbalance) when appropriate

THE FRAMEWORK — ${name}'s core components:
• Sun in ${sun} (${s.kemetic}, ${s.symbol}) — governs ${s.body}, seated in ${s.chakra}, fueled by ${s.orisha}. This is their SPIRIT / Atma — the "I Am" presence.
• Life Path ${lifePath} — the numerological Odu script, the proverbial wisdom their soul came to study
• Blood Type ${bloodType || 'unspecified'} — the physical vessel carrying the script
• Tier: ${tier === 'root' || tier === 2 ? 'Root (full reading including Human Design)' : 'Seed (core reading, Human Design gated)'}

OUTPUT — Return ONLY valid JSON, no markdown, no fences. Match this exact structure:

{
  "tier": ${tier === 'root' || tier === 2 ? 2 : 1},
  "identity_overview": "Direct 2-3 sentence opening. Name them. Name what their chart actually is — a map, a script, a set of instructions. Set the tone.",
  "astrology": {
    "sun_sign": "${sun}",
    "symbol": "${s.symbol}",
    "element": "${s.element}",
    "kemetic_name": "${s.kemetic}",
    "reading": "3 paragraphs separated by \\n\\n. Paragraph 1: reframe what ${sun} ACTUALLY is in the Kemetic frame — reference ${s.kemetic} and what it governs (${s.body}). Paragraph 2: the default behavior and tension — where the energy goes sideways. Paragraph 3: the growth edge and aligned movement — how they're built to move when they trust the design. Work in the Orisha ${s.orisha} naturally, not as name-drop."
  },
  "numerology": {
    "life_path": ${lifePath},
    "title": "Short archetypal title for Life Path ${lifePath} (like 'The Architect of Power' or 'The Catalyst')",
    "reading": "3 paragraphs separated by \\n\\n. Treat Life Path ${lifePath} as the Odu script — the proverbial lesson their destiny is teaching. Paragraph 1: what the number actually governs (not just keywords). Paragraph 2: the trap and the lesson. Paragraph 3: the aligned expression."
  },
  "human_design": {
    "type": "Direction to get their exact chart (Type · Profile · Authority) from mybodygraph.com",
    "reading": "${tier === 'root' || tier === 2 ? '2 paragraphs. Explain how Human Design shows the MECHANICS of how they are designed to move, decide, and recharge. Name the frustration signal vs the flow signal. Direct them to mybodygraph.com for their exact Type · Profile · Authority.' : 'Brief — Root tier unlocks the full Human Design reading.'}"
  },
  "astrocartography": {
    "reading": "1 paragraph. How the energy of their birth location shaped their original imprint, and what their current city is either reinforcing or editing."
  },
  "blood_type": {
    "type": "${bloodType || 'unknown'}",
    "reading": "2 paragraphs. Physical blueprint — how ${bloodType || 'their body'} responds to food, movement, rest, stress. What it needs to stay regulated."
  },
  "archetype_overlay": {
    "title": "Spiritual archetype title for ${name} synthesizing Sun + Life Path + Orisha",
    "reading": "2 paragraphs. Closing. Bring it all together. Remind them nothing about them is random — it is structured and divine. Misalignment is not failure, it is information. End with the Orisha-chakra anchor: '${s.orisha} holds the ${s.chakra} center for you.'"
  },
  "remediation": {
    "reading": "1 short paragraph. Name the CATEGORY of Hoodoo remediation aligned to their chart — e.g. 'a Venus-day (Friday) drawing bath in waxing moon to soften your ${s.orisha} fire', 'a Saturn-day (Saturday) uncrossing bath in waning moon'. Do not prescribe specific herbs or full formulas. Close by recommending a 1:1 reading with Janaee for the full rootwork prescription."
  }
}

CRITICAL: Output must be pure valid JSON. No \`\`\` fences. No prose outside the JSON. Double-quote everything.`;
}

exports.handler = async (event) => {
  const pre = handlePreflight(event);
  if (pre) return pre;

  const body = parseBody(event);
  if (!body) return fail('Invalid request body');

  const {
    userEmail, name, fullName, birthDate, dob, birthTime,
    location, birthLocation, currentCity, bloodType, tier
  } = body;

  const memberName = name || fullName;
  const memberDob = birthDate || dob;
  const memberLocation = location || birthLocation;

  if (!memberName || !memberDob || !memberLocation) {
    return fail('Missing required fields');
  }
  if (!birthTime) {
    return fail('Birth time is required for your Ascendant (Ori) reading');
  }
  if (!ANTHROPIC_KEY) {
    return fail('Server missing ANTHROPIC_API_KEY', 500);
  }

  const sb = (userEmail && SUPABASE_URL && SUPABASE_SERVICE_KEY)
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    : null;

  // Persist birth data BEFORE the slow Claude call. The new dashboard
  // cards (Core Identity, Daily Snippet, Weekly Deep Dive) only need
  // dob/birth_time/birth_location to function — saving these first means
  // a Claude timeout doesn't leave the user with no working dashboard.
  //
  // supabase-js does NOT throw on RLS / FK / constraint violations — it
  // returns { data, error } with the error in the response object. Check
  // the error field explicitly; don't rely on try/catch alone.
  let persistedBirthData = false;
  if (sb) {
    const lcEmail = userEmail.toLowerCase();

    // Pre-check: profiles.user_email is a FK to users.email. If the
    // users row is missing or stored with different casing than what
    // we're querying with, the upsert will fail with FK violation.
    const { data: userRow, error: userLookupErr } = await sb
      .from('users')
      .select('email')
      .eq('email', lcEmail)
      .maybeSingle();

    if (userLookupErr) {
      console.error('[generate-blueprint] users lookup error:', JSON.stringify(userLookupErr));
      return fail('Could not verify your account — please try again.', 500);
    }
    if (!userRow) {
      console.error('[generate-blueprint] no users row for', lcEmail);
      return fail('Your account record is missing. Please contact Janaee — your member account needs to be relinked before your blueprint can save.', 409);
    }

    const upsertPayload = {
      user_email: lcEmail,
      full_name: fullName || memberName,
      preferred_name: memberName,
      dob: memberDob,
      birth_time: birthTime,
      birth_location: memberLocation,
      current_city: currentCity || null,
      blood_type: bloodType || null,
      updated_at: new Date().toISOString()
    };

    let upsertResult;
    try {
      upsertResult = await sb
        .from('profiles')
        .upsert(upsertPayload, { onConflict: 'user_email' })
        .select()
        .maybeSingle();
    } catch (sbErr) {
      console.error('[generate-blueprint] early upsert threw:', sbErr);
      return fail('Could not save your birth data — please try again.', 500);
    }

    console.log('[generate-blueprint] early upsert result:', JSON.stringify({
      data: upsertResult.data,
      error: upsertResult.error,
      status: upsertResult.status,
      statusText: upsertResult.statusText
    }));

    if (upsertResult.error) {
      return fail(
        `Could not save your birth data: ${upsertResult.error.message || 'database error'}`,
        500
      );
    }
    if (!upsertResult.data) {
      return fail('Birth data save returned no row — write may have been blocked by RLS or a missing column. Check Netlify logs.', 500);
    }
    persistedBirthData = true;
  }

  // Cap the Claude call well below Netlify's sync function timeout so
  // we always return a clean error instead of being killed mid-write.
  const CLAUDE_TIMEOUT_MS = 22000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CLAUDE_TIMEOUT_MS);

  try {
    const sun = getSunSign(memberDob);
    const lifePath = getLifePath(memberDob);
    const systemPrompt = buildSystemPrompt(memberName, sun, lifePath, bloodType, tier);

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2400,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: `Generate the cosmic profile for ${memberName}. Birth date: ${memberDob}. Birth time: ${birthTime}. Birth location: ${memberLocation}. Current city: ${currentCity || 'unspecified'}. Blood type: ${bloodType || 'unknown'}. Tier: ${tier}.`
        }]
      })
    });

    if (!claudeRes.ok) {
      const errText = await claudeRes.text();
      console.error('Claude API error:', claudeRes.status, errText);
      return {
        statusCode: 502,
        headers: HEADERS,
        body: JSON.stringify({
          error: 'Generation service error',
          persistedBirthData,
          persisted: false
        })
      };
    }

    const claudeData = await claudeRes.json();
    const text = claudeData.content.map(i => i.text || '').join('').replace(/```json|```/g, '').trim();
    const blueprint = JSON.parse(text);

    let persisted = false;
    if (sb) {
      let proseUpsert;
      try {
        proseUpsert = await sb
          .from('profiles')
          .upsert({
            user_email: userEmail.toLowerCase(),
            generated_output: blueprint,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_email' })
          .select()
          .maybeSingle();
      } catch (sbErr) {
        console.error('[generate-blueprint] blueprint upsert threw:', sbErr);
      }
      if (proseUpsert) {
        console.log('[generate-blueprint] blueprint upsert result:', JSON.stringify({
          hasData: !!proseUpsert.data,
          error: proseUpsert.error,
          status: proseUpsert.status
        }));
        if (proseUpsert.error) {
          console.error('[generate-blueprint] blueprint save error:', proseUpsert.error);
        } else if (proseUpsert.data) {
          persisted = true;
        }
      }
    }

    return ok({
      success: true,
      blueprint,
      persisted,
      persistedBirthData
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn('[generate-blueprint] Claude call aborted at timeout');
      return {
        statusCode: 504,
        headers: HEADERS,
        body: JSON.stringify({
          error: 'The reading is taking longer than usual to channel. Your birth data is saved — refresh to see your trinity card populate, then try generating the full reading again in a moment.',
          persistedBirthData,
          persisted: false
        })
      };
    }
    console.error('Blueprint error:', err);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({
        error: 'Profile generation failed',
        persistedBirthData,
        persisted: false
      })
    };
  } finally {
    clearTimeout(timeoutId);
  }
};
