// ═══════════════════════════════════════════════════════════════
// MODULE II — ANCESTRAL VENERATION: Quiz Bank
//   • Per-lesson check-ins (4–5 questions)
//   • End-of-module exam (12 questions)
//   • Question types: mc, tf, fill, match
// ═══════════════════════════════════════════════════════════════
window.MODULE_2_QUIZZES = {

  // ─────────────────────────────────────────────────────────────
  // PER-LESSON CHECK-INS
  // ─────────────────────────────────────────────────────────────
  lessons: {

    // ─── A1: The Altar as Threshold ─────────────────────────
    'a1': {
      title: 'Check-In: The Altar as Threshold',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'In Africana traditions, the altar is best described as:',
          choices:[
            'A stage for petitioning the gods',
            'A threshold — a doorway where the seen and unseen worlds meet',
            'A decorative shrine for honoring famous ancestors',
            'A storage place for sacred objects'
          ],
          answer:1,
          rationale:'The lesson teaches the altar is not a stage for performance — it is a threshold, a doorway where the living and the long-departed share breath, water, and the unhurried business of remembering.'
        },
        { type:'fill',
          q:'In Yoruba, the altar is called <strong>ojúbọ</strong> — literally, "the face of ______."',
          accept:['worship','meeting','face','god'],
          rationale:'Ojúbọ literally means "the face of worship," but the older meaning the grandmothers carry is closer to "face-of-meeting" — where two faces look at each other across the veil.'
        },
        { type:'mc',
          q:'The "living-dead" refers to:',
          choices:[
            'Spirits of those who died violently and now haunt the living',
            'Ghosts trapped between worlds, unable to elevate',
            'Spirits of those who lived morally upright lives, died a "good death," and were given proper funerary honors',
            'A Yoruba term for dangerous ancestors'
          ],
          answer:2,
          rationale:'The living-dead are spirits who lived morally upright, died well, and received proper funeral honors. They reside in transcendence between Olodumare and humankind, available as guides and intercessors.'
        },
        { type:'tf',
          q:'In African thought, the ancestor is best understood as <strong>more alive</strong> than the living — they have shed the body\'s distractions and see further.',
          answer:true,
          rationale:'Correct. Across nearly every African tradition, the elders insist: the ancestor is the elder, always. The Western sense that the dead are diminished is a stolen idea that does not belong to the lineage.'
        },
        { type:'mc',
          q:'The teaching that the modern person\'s restlessness is a symptom of:',
          choices:[
            'Insufficient career success',
            'A broken relationship with their ancestors — being severed from the larger ancestral body',
            'Too much spiritual practice',
            'Lack of physical exercise'
          ],
          answer:1,
          rationale:'You are not fundamentally an isolated individual — you are a cell in a larger ancestral body. When the cell is severed, it becomes restless and prone to forgetting its purpose. Altar work is reattachment medicine.'
        }
      ]
    },

    // ─── A2: White Cloth & Clear Water ──────────────────────
    'a2': {
      title: 'Check-In: White Cloth & Clear Water',
      passThreshold: 0.8,
      questions: [
        { type:'match',
          q:'Match each foundational altar element to its function:',
          pairs:[
            ['White cloth',     'The color of the ancestors — clean canvas for the unseen to land'],
            ['Clear water',     'A mirror, a filter, and a cooling agent for restless spirits'],
            ['Single white candle', 'The messenger — fire carries the prayer between worlds'],
            ['Black-eyed peas in four corners', 'Spiritual hinges of the home — invite luck, release stagnant energy']
          ],
          rationale:'These are the bones of an ancestral altar that has lived in Black kitchens, closets, and corners across the diaspora for four centuries. The simplicity is the point.'
        },
        { type:'fill',
          q:'The pouring of libation to the ancestors before any major endeavor — saying "before I move, I acknowledge those who made my movement possible" — is called the <strong>______</strong>.',
          accept:['mojuba','mojúba','mọjúbà'],
          rationale:'The Mojuba is the central act of African and Africana ancestor reverence. Daily Mojuba rewires the modern self away from individualism and back toward lineage.'
        },
        { type:'tf',
          q:'When extinguishing the altar candle, you should always blow it out — your breath carries the prayer skyward.',
          answer:false,
          rationale:'False. The traditional teaching is that breath blows the prayer back at you and scatters the message. Use a snuffer, a metal lid, or your fingers. The folk explanation: "you would not blow into your grandmother\'s face."'
        },
        { type:'mc',
          q:'Why is fresh water on the altar essential — and what does stagnant water represent?',
          choices:[
            'Stagnant water is fine; the ancestors do not notice',
            'Fresh water is decorative; only the candle matters',
            'Stagnant water is forgetting; fresh water is the heartbeat of the practice',
            'Water should be replaced once a year'
          ],
          answer:2,
          rationale:'Refreshing the water — at least weekly — is the most important act of altar tending. Stagnant water is forgetting. Fresh water is the heartbeat of the practice.'
        },
        { type:'mc',
          q:'If a student lives in a household where open ancestor work would create conflict, the elders teach:',
          choices:[
            'They must wait until they live alone',
            'Their altar can be small enough to fit in a drawer — the grandmothers worked under worse conditions',
            'They should give up altar work entirely',
            'They need formal initiation first'
          ],
          answer:1,
          rationale:'The altar travels because we traveled. The altar hides because we had to hide. A folded handkerchief, a small glass, a name on a slip of paper — closed at sunrise, opened at night. The work still gets done.'
        }
      ]
    },

    // ─── A3: Speaking Their Names & The Bridge of Bones ─────
    'a3': {
      title: 'Check-In: Speaking Their Names',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The Bridge of Bones teaches that — unlike European folk belief that links spirits to <em>locations</em> — Africana traditions hold that the dead remain reachable primarily through:',
          choices:[
            'The houses where they died',
            'Physical remains and the matter that knew them: bones, hair, and especially the dirt their body returned to',
            'The same churches where they were buried',
            'Photographs only'
          ],
          answer:1,
          rationale:'In African understanding, physical remains are conduits. The body retains a resonance with the soul that wore it. Graveyard dirt is not symbolic — it is operative.'
        },
        { type:'tf',
          q:'You may take graveyard dirt without making any offering, as long as your intention is good.',
          answer:false,
          rationale:'False. To take without exchange is theft, and the ancestor whose dirt you stole will know — and will not help you. You must always "buy" the dirt with liquor, coins (often silver dimes), tobacco, or a flower, poured at the head of the grave.'
        },
        { type:'fill',
          q:'A name spoken aloud <strong>______</strong> times carries the weight of summons rather than mere recognition.',
          accept:['three','3','three (3)'],
          rationale:'Once is recognition. Twice is greeting. Three times is summons. Spoken slowly with a full breath between each, the name calls the ancestor into the room.'
        },
        { type:'mc',
          q:'For students whose ancestors were renamed under enslavement and whose African names were lost, the teaching is:',
          choices:[
            'They cannot do ancestor work without recovering the original names',
            'They must invent African names to replace the lost ones',
            'The ancestors will accept the names they have — Polly will come if you call Polly. The cord was made harder to find, not broken',
            'They must convert to a specific tradition first'
          ],
          answer:2,
          rationale:'The slave traders did not have the power to break the cord — only to make it harder to find. Speak the names you know with love, and the older names will, in time, introduce themselves.'
        },
        { type:'mc',
          q:'When matching graveyard dirt to a working, the elders insist:',
          choices:[
            'Any dirt works for any purpose — the dead lose their character after death',
            'You must match the working to the soul: a gentle grandmother\'s dirt is not for harm; a fierce protector\'s dirt is for protection',
            'Older graves are always more powerful',
            'The graveyard\'s denomination determines the working'
          ],
          answer:1,
          rationale:'The soul retains its character after death. A grandmother who never harmed anyone in life will not harm anyone for you in death. Match the working to the soul.'
        }
      ]
    },

    // ─── A4: Tending Without Fear & Healing the Lineage ─────
    'a4': {
      title: 'Check-In: Tending Without Fear',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'According to the lesson, the modern Black person\'s fear of ancestor work is best understood as:',
          choices:[
            'A natural and appropriate caution about the spirit world',
            'The result of a four-hundred-year campaign to slander the ancestors and make our people ungovernable',
            'Evidence that the ancestors are dangerous',
            'A sign that one is not ready for the work'
          ],
          answer:1,
          rationale:'A people in conversation with their ancestors is ungovernable. The slander of the ancestors as demons, ghosts, and "voodoo" is among the most successful spiritual heists in modern history — and it is being reversed in your kitchen.'
        },
        { type:'tf',
          q:'The "Separate Altar Rule" means you should not place ancestors who oppressed your line on the same altar as those they harmed — the altar\'s effectiveness depends on its coherence.',
          answer:true,
          rationale:'Correct. To force a great-great-grandmother to share altar space with the man who raped her is to make the altar a place of continued violation. Build her her own clean place.'
        },
        { type:'mc',
          q:'The elders teach that <strong>unelevated dead</strong> — those who died in trauma or without proper rites — are:',
          choices:[
            'In torment forever',
            'Beyond reach; nothing can be done',
            'Suspended at "the side of the road," and can be elevated by the living, even four hundred years late',
            'Reincarnated immediately and unaffected'
          ],
          answer:2,
          rationale:'You, the living, can elevate them. Today. Four hundred years late. Restless ancestors at rest mean restless descendants at peace. This is among the most reparative spiritual labors a Black person can perform.'
        },
        { type:'fill',
          q:'When you do not know where your oldest ancestors are buried, the elders prescribe building a <strong>______</strong> — a vessel (often a bucket or large bowl) filled with crossroads dirt and cemetery dirt, tended daily until the soul recognizes it as home.',
          accept:['reliquary','ancestor bucket','bwiti reliquary','blackhawk in the bucket','blackhawk-in-the-bucket'],
          rationale:'The Bwiti reliquary (Gabon) / Blackhawk-in-the-Bucket (New Orleans) / ancestor bucket is the diaspora\'s answer to the lost grave. Over approximately one year, the soul moves into the vessel.'
        },
        { type:'mc',
          q:'The basic form of the elevation working for an unelevated ancestor lasts:',
          choices:[
            'A single night',
            'Three weeks',
            'Nine consecutive nights — fresh water, white candle, Psalms or elder prayers, and a final goodbye on the ninth night',
            'A full year'
          ],
          answer:2,
          rationale:'Nine consecutive nights of fresh water, lit candle, and prayer. On the ninth night, say goodbye and pour the bowl out to the earth. The working is complete; the soul has risen.'
        }
      ]
    },

    // ─── A5: When They Speak Back & Iwa-pẹlẹ as Inheritance ─
    'a5': {
      title: 'Check-In: When They Speak Back',
      passThreshold: 0.8,
      questions: [
        { type:'match',
          q:'Match each ancestral communication channel to its description:',
          pairs:[
            ['Dreams',                  'The most universal channel — defenses are down; warnings and counsel arrive most clearly'],
            ['Animals & birds',         'Repeating creatures who cross your path are messengers; pay attention to who keeps showing up'],
            ['Music & sudden sound',    'A song the deceased loved at a moment of decision; chimes ringing on a still day'],
            ['The body\'s sudden knowing', 'Warmth in the chest, hair rising, a gentler voice forming sentences in your mind']
          ],
          rationale:'The ancestors were never silent. The receiver was simply tuned to the wrong frequency. The body is the most honest receiver — it has not learned to lie.'
        },
        { type:'tf',
          q:'When in doubt about whether a "coincidence" was an ancestral sign, the elders counsel choosing to <strong>believe</strong> — the cost of dismissing a real letter is higher than the cost of over-listening.',
          answer:true,
          rationale:'Correct. If you believe a hawk was a message and you were wrong — you spent a quiet moment of attention, nothing was lost. If you believe a hawk was nothing and you were wrong — you missed a letter from someone who loved you. Choose the more loving error.'
        },
        { type:'fill',
          q:'The Yoruba concept of <strong>______-______</strong> — balanced character — is what travels with the soul across the threshold and what determines whether you become a venerated ancestor in turn.',
          accept:['iwa-pele','iwa pele','iwapele','iwa-pẹlẹ','iwa pẹlẹ'],
          rationale:'Iwa-pẹlẹ is the only thing that travels with you across the threshold. The work is reciprocal: you tend them; they shaped you; you become someone the next generation can tend.'
        },
        { type:'mc',
          q:'The Thirteen Guidelines of Iwa-pẹlẹ are best understood as:',
          choices:[
            'Commandments enforced by punishment',
            'Optional suggestions for the spiritually advanced',
            'Practical daily disciplines that build the kind of character making a soul rise easily and remain available to the lineage',
            'A list of forbidden activities only'
          ],
          answer:2,
          rationale:'The Thirteen are coaching, not commandment. The ancestors are not punishers — they are coaches watching the same scoreboard, rooting for you. Over weeks, you find one or two are your persistent edge: that is your work this lifetime.'
        },
        { type:'mc',
          q:'The thirteenth and culminating guideline — the "final exam" of Iwa-pẹlẹ — is:',
          choices:[
            'Never speak ill of anyone',
            'Live in such a way that your name will be spoken with warmth after you go',
            'Donate ten percent of your income',
            'Visit a graveyard monthly'
          ],
          answer:1,
          rationale:'This is the final exam. The veneration you are giving your ancestors is the veneration you are training the next generation to give you. Every act of altar tending is also a rehearsal of your own future.'
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // END-OF-MODULE EXAM (12 questions)
  // ─────────────────────────────────────────────────────────────
  exam: {
    title: 'Module II Exam — Ancestral Veneration',
    subtitle: 'The Bridge of Bones',
    passThreshold: 0.8,
    questions: [
      { type:'mc',
        q:'Which statement best captures the core teaching of this module?',
        choices:[
          'The dead should be kept at a respectful distance',
          'You are not an isolated individual — you are a cell in a larger ancestral body, and the altar is the medicine that reattaches you',
          'Ancestor work requires formal initiation to be safe',
          'Only Africans by blood may tend ancestors'
        ],
        answer:1,
        rationale:'The whole module rests on this. Restlessness is severance; tending is reattachment. The altar does not require initiation — it requires recognition.'
      },
      { type:'match',
        q:'Match each foundational altar element to its traditional meaning:',
        pairs:[
          ['White cloth',  'The color of the ancestors — recognized across the diaspora as the cloth of crossing'],
          ['Clear water',  'Mirror, filter, and cooling agent — water the ancestors look up at you through'],
          ['White candle', 'The messenger — fire carries the prayer between the seen and unseen worlds'],
          ['Photograph or written name', 'A guest list — names invited; the unnamed are not summoned']
        ],
        rationale:'These four elements have lived in Black kitchens, closets, and altar corners across the diaspora for four centuries. The simplicity is the point.'
      },
      { type:'fill',
        q:'The pouring of libation — water, beer, or whiskey — to the ancestors before any major endeavor is called the <strong>______</strong>.',
        accept:['mojuba','mọjúbà','mojúba'],
        rationale:'Before I move, I acknowledge those who made my movement possible. Daily Mojuba is the central act of African ancestor reverence — and it rewires the modern self away from individualism, back toward lineage.'
      },
      { type:'tf',
        q:'In Africana cosmology, the dead haunt physical <strong>locations</strong> (houses, castles, crossroads) the way European ghosts do — that is the principal way to find them.',
        answer:false,
        rationale:'False. Africana traditions emphasize physical remains and matter — bones, hair, and especially the dirt the body decomposed in. This is the Bridge of Bones; it distinguishes our ancestral cosmology from European folk belief.'
      },
      { type:'mc',
        q:'The protocol for "buying" graveyard dirt requires:',
        choices:[
          'Taking only at midnight under a full moon',
          'Pouring an offering (liquor, coins, tobacco, or a flower) at the head of the grave, speaking your purpose, and waiting for consent',
          'Permission from the cemetery groundskeeper',
          'Saying nothing — silence is required'
        ],
        answer:1,
        rationale:'You buy the dirt with offering and consent — and you may feel a refusal. The dead have agency. They are not vending machines. Always pour to the head, never to the foot.'
      },
      { type:'fill',
        q:'A name spoken aloud <strong>three</strong> times carries the weight of summons. <strong>Once</strong> is recognition. <strong>Twice</strong> is ______.',
        accept:['greeting','greet'],
        rationale:'Once: recognition. Twice: greeting. Three times: summons. Spoken with a full breath between each, the third utterance changes the room.'
      },
      { type:'mc',
        q:'The "Separate Altar Rule" exists to:',
        choices:[
          'Save space in small homes',
          'Prevent the altar from becoming a place of continued violation when oppressors and the people they harmed cannot share clean space',
          'Distinguish blood relatives from non-blood',
          'Mark the altar as private'
        ],
        answer:1,
        rationale:'An altar\'s effectiveness depends on its coherence. Force her to share space with her violator and the altar becomes the violation continued. Build him a separate, lower place where reconciliation work can happen without contaminating the line.'
      },
      { type:'tf',
        q:'In Africana understanding, an ancestor who was not properly grieved or who died in violence cannot be helped — their fate is sealed.',
        answer:false,
        rationale:'False. The unelevated dead can be elevated by the living, even four hundred years late. The nine-night working — fresh water, white candle, Psalms or elder prayer, goodbye on the ninth night — is the standard form. Restless ancestors at rest mean restless descendants at peace.'
      },
      { type:'fill',
        q:'For students who do not know where their oldest ancestors are buried, the elders prescribe building a <strong>______</strong> — a vessel filled with crossroads dirt and cemetery dirt, tended daily for approximately one year until the soul recognizes it as home.',
        accept:['reliquary','ancestor bucket','blackhawk in the bucket','bwiti reliquary'],
        rationale:'The Bwiti reliquary (from Gabon) and the New Orleans Blackhawk-in-the-Bucket are the same technology. It is the diaspora\'s answer to the lost grave.'
      },
      { type:'mc',
        q:'The five principal channels through which ancestors most frequently speak are:',
        choices:[
          'Sermons, scripture, prayer, fasting, and song',
          'Dreams, animals/birds, music & sudden sound, numbers/coincidence, and the body\'s sudden knowing',
          'Only dreams and only when the moon is full',
          'Mediums, oracles, tarot, runes, and pendulums'
        ],
        answer:1,
        rationale:'Across Africana traditions, these five channels recur. The dead are fond of audio. The body is the most honest receiver. The Western mind calls it coincidence; the African mind calls it conversation.'
      },
      { type:'mc',
        q:'When a student notices a sign — a hawk, a dream, a song — the elders teach the appropriate reply is:',
        choices:[
          'To immediately solve or interpret it',
          'To dismiss it unless three signs come together',
          'A small acknowledgment at the altar: "I saw the hawk. Thank you. I am listening" — the visit acknowledged invites another',
          'To say nothing; the ancestors prefer silence'
        ],
        answer:2,
        rationale:'The ancestors are not waiting to be solved — they are waiting to be acknowledged. Polite, consistent acknowledgment of the messages already arriving is how the conversation deepens.'
      },
      { type:'mc',
        q:'The thirteenth and culminating guideline of Iwa-pẹlẹ — the "final exam" — teaches that:',
        choices:[
          'Spiritual mastery is measured by ritual proficiency',
          'You should live in such a way that your name will be spoken with warmth after you go',
          'Wealth at death determines ancestral status',
          'Only those formally initiated can become ancestors'
        ],
        answer:1,
        rationale:'The veneration you give the ancestors is the veneration you are training the next generation to give you. Every act of altar tending is also a rehearsal of your own future. This is why the work is reciprocal — and why it heals both ways.'
      }
    ]
  }
};
