// ══════════════════════════════════════════════════════════════
// MODULE VII — THE DIASPORA: HOW WE CARRIED IT ACROSS WATER · QUIZ BANK
//   • 5 per-lesson check-ins (6 questions each, ≥80% to advance)
//   • 1 end-of-module final exam (12 questions, ≥80% to certify)
//   • Schema: { lessons: { p1..p5 }, exam: { ... } }
//   • Question fields: type, q, choices/answer/rationale (mc),
//                       answer/rationale (tf), accept/rationale (fill),
//                       pairs/rationale (match)
// ══════════════════════════════════════════════════════════════
window.MODULE_7_QUIZZES = {

  lessons: {

    // ─── p1 — The Atlantic & The Veil ────────────────────────
    p1: {
      title: 'Lesson 1 Check-in — The Atlantic & The Veil',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The conservative estimate of African captives carried across the Atlantic between roughly 1500 and the late 1800s is:',
          choices:[
            'About 100,000',
            'Around one million',
            'Approximately twelve million, with two million more dying in the holds',
            'Fewer than five thousand'
          ],
          answer:2,
          rationale:'The number is meant to be sat with. Twelve million crossed; another two million were buried in the salt before reaching the Americas.'
        },
        { type:'mc',
          q:'In the Africana frame, the diaspora is best understood as:',
          choices:[
            'A clean break that destroyed the African traditions',
            'A wound — a tearing that, over generations, became a place where medicine grows',
            'An unimportant historical footnote',
            'A purely European achievement'
          ],
          answer:1,
          rationale:'The traditions were not destroyed. They were hidden, distorted, driven underground, and creolized — and they survived.'
        },
        { type:'tf',
          q:'The Yoruba concept of "the veil" refers ONLY to the racial veil Du Bois described.',
          answer:false,
          rationale:'There are at least three veils: the cosmological veil (between spirit world and physical), Du Bois\'s racial veil, AND the generational veil opened by the Middle Passage. All three apply to descendants.'
        },
        { type:'match',
          q:'Match each survival vehicle to what it carried across:',
          pairs:[
            ['Catholic saints','Hidden names of Orisha (Òṣun → Lady of Charity, Ṣàngó → Saint Barbara)'],
            ['Drum patterns','Specific rhythms sacred to specific Orisha (bata, rada, agogô)'],
            ['Cooking pots & home pharmacies','Plant-spirit relationships and simples'],
            ['Cowrie shells & cards','Divination forms — nearly intact in Cuba and Brazil']
          ],
          rationale:'Saints, drums, plants, and cowries each acted as a carrier. The drum was the most stubborn, but every channel mattered.'
        },
        { type:'fill',
          q:'The pull a descendant feels toward Africana practices — even multiple generations into severance — is, in this teaching, the <strong>______</strong> that survived where conscious knowledge did not.',
          accept:['cord','longing','line','thread'],
          rationale:'They tore the veil but could not cut the cord. The longing IS the cord, alive in the body of the descendant.'
        },
        { type:'mc',
          q:'The honest position taught by this module about diasporic traditions like Hoodoo, Vodou, Lucumí, and Candomblé is that they are:',
          choices:[
            '"Broken" or "diluted" versions of the West African originals',
            'Identical to pre-contact African religion',
            'Real, coherent, creolized SIBLINGS to the original traditions — not lesser, not the same, but legitimate in their own right',
            'Imitations made up by enslaved people'
          ],
          answer:2,
          rationale:'The diaspora\'s traditions are siblings to the originals — born of the same mothers, with different lives. Not lesser. Not the same.'
        }
      ]
    },

    // ─── p2 — Hoodoo: The Survival Tradition ─────────────────
    p2: {
      title: 'Lesson 2 Check-in — Hoodoo: The Survival Tradition',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'Hoodoo is most accurately described as:',
          choices:[
            'A religion with priests, dogma, and initiated clergy',
            'A folk-magic survival tradition — a practical methodology of the kitchen, garden, and bedside, with West/Central African roots and Black Southern soil',
            'A modern New Age invention',
            'Identical to Voodoo (the Haitian religion)'
          ],
          answer:1,
          rationale:'Hoodoo is not a religion — it is a survival technology of practical workings, used by Black women and men across the American South, with a creolized West/Central African root.'
        },
        { type:'tf',
          q:'Hoodoo and Vodou are the same tradition under different spellings.',
          answer:false,
          rationale:'Vodou (Haiti) is a religion with priests (houngan/mambo), congregations, initiations, and a developed theology. Hoodoo (American South) is folk-magical practice — different in scope, structure, and lineage.'
        },
        { type:'match',
          q:'Match each Hoodoo working to its purpose:',
          pairs:[
            ['Mojo bag (gris-gris)','A small charm bag carrying focused intent — protection, drawing, road-opening'],
            ['Honey jar','Sweetening a stuck or sour relationship'],
            ['Goofer dust','A heavy-handed working — generally for crossing or harm; not introductory work'],
            ['Foot track magic','Working with the dust where someone has walked — an old technology of personal essence']
          ],
          rationale:'Each is a recognized form in the Hoodoo tradition. The mojo bag and honey jar are introductory; goofer dust and foot-track magic are advanced and ethically sensitive.'
        },
        { type:'fill',
          q:'The Hoodoo practice of pouring or sprinkling water (sometimes Florida Water, sometimes plain) before stepping out of the house in the morning is a continuation of the West African practice of <strong>______</strong> — pouring offering before any major action.',
          accept:['libation','mojuba','libations','pouring libation'],
          rationale:'Mojuba — libation — survived in Black Southern households as the small splash of water at the threshold, the spilled beer "for the homies," the drink poured on the ground.'
        },
        { type:'mc',
          q:'A foundational ethic of legitimate Hoodoo practice is:',
          choices:[
            'Use working aggressively against anyone who annoys you',
            'Never work for free — money is the only seal',
            'Match the working to the actual situation, take responsibility for outcomes, and remember that what you send returns',
            'Hide all working from any community oversight'
          ],
          answer:2,
          rationale:'The grandmothers taught responsibility. What you send returns. Match the working to the truth of the situation, not to your wounded ego.'
        },
        { type:'tf',
          q:'Most Hoodoo practitioners historically have been Black women working from kitchen tables, gardens, and bedsides — not professional priests.',
          answer:true,
          rationale:'The grandmothers, aunts, and root-women have always carried Hoodoo. The professional rootworker was the exception; kitchen-table practice was (and is) the rule.'
        }
      ]
    },

    // ─── p3 — Vodou, Santería, Candomblé ─────────────────────
    p3: {
      title: 'Lesson 3 Check-in — Vodou, Santería, Candomblé',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'Haitian Vodou is best characterized as:',
          choices:[
            'A version of Catholicism with African flavoring',
            'A creolized Haitian religion combining Fon-Ewe, Kongo, and other West/Central African traditions with Catholic elements, with its own theology and clergy',
            'Black magic invented to harm slave owners',
            'Identical to American Hoodoo'
          ],
          answer:1,
          rationale:'Vodou is its own religion — Haitian — with houngan and mambo clergy, peristyles, a developed pantheon (the Lwa), and a sophisticated theology.'
        },
        { type:'mc',
          q:'In Cuban Lucumí (Santería), Òṣun is most often masked publicly as:',
          choices:[
            'Saint Peter',
            'Saint Barbara',
            'La Virgen de la Caridad del Cobre (Our Lady of Charity)',
            'Saint Anthony'
          ],
          answer:2,
          rationale:'Òṣun ↔ Our Lady of Charity. The mask was put on so that what would have been punished publicly could continue privately. The Orisha was always underneath.'
        },
        { type:'match',
          q:'Match each Lwa or Orisha to its diaspora-tradition origin:',
          pairs:[
            ['Papa Legba','Haitian Vodou — gatekeeper Lwa (sibling concept to Eshu)'],
            ['Erzulie Freda','Haitian Vodou — Lwa of love, beauty, longing'],
            ['Iemanjá','Brazilian Candomblé — ocean orisha (Yemoja)'],
            ['Changó','Cuban Lucumí — Yoruba Ṣàngó preserved nearly intact']
          ],
          rationale:'Each tradition kept the same metaphysical category (gatekeeper, love-spirit, ocean mother, lightning king) but creolized the names and shapes.'
        },
        { type:'tf',
          q:'Within Lucumí (Santería), syncretism with Catholic saints was a strategic survival decoy — the names changed publicly, but priests and initiates always knew the saint was an outer mask for the inner Orisha.',
          answer:true,
          rationale:'The priesthood always knew. The "Saint" was the public face; the Orisha was the actual being addressed in working. After the late 20th century, many lineages began moving back toward un-masked Yoruba names.'
        },
        { type:'fill',
          q:'Brazilian <strong>______</strong> preserves Yoruba (Ketu nation), Fon (Jeje), and Bantu (Angola) traditions — three distinct ritual lineages within one Brazilian religion.',
          accept:['candomble','candomblé'],
          rationale:'Candomblé is the Brazilian umbrella; the "nations" are Ketu (Yoruba-rooted), Jeje (Fon-rooted), and Angola (Bantu-rooted) — each with distinct ritual languages and protocols.'
        },
        { type:'mc',
          q:'The respectful posture toward these sister traditions, for someone outside their formal lineage, is:',
          choices:[
            'Practice them freely without studying',
            'Dismiss them as outdated',
            'Approach them with reverence, study them through their own teachers, and do not claim initiations or titles you have not formally earned within their lineages',
            'Take what you want and discard the theology'
          ],
          answer:2,
          rationale:'Respect means: study under the tradition\'s own teachers, do not claim initiations you have not received, and do not collapse Vodou/Lucumí/Candomblé into a single "African" thing — each is distinct.'
        }
      ]
    },

    // ─── p4 — The Black Church as Hush Harbor ───────────────
    p4: {
      title: 'Lesson 4 Check-in — The Black Church as Hush Harbor',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The Black Church, in the lens of this module, is best understood as:',
          choices:[
            'A simple adoption of European Protestant Christianity',
            'A creolized institution where African theological habits — embodied worship, call-and-response, drum-as-clap, possession, ancestral memory — survived inside Christian liturgical forms',
            'An institution with no African content',
            'Always identical to the white Protestant church'
          ],
          answer:1,
          rationale:'The Black Church is creolized. The doctrines are Christian; the worship body is African. The shout, the catch, the call-and-response, the holy-ghost dance — all carry the older theology in plain sight.'
        },
        { type:'fill',
          q:'A "<strong>______</strong>" was a hidden gathering — often in woods, swamps, or covered with overturned pots to absorb sound — where enslaved people held their own worship and preserved their traditions away from the slaver\'s gaze.',
          accept:['hush harbor','hush harbour','brush arbor','brush arbour'],
          rationale:'The hush harbor was a foundational diaspora institution. The pot turned upside down (to absorb sound) is itself a remembered Kongo technology.'
        },
        { type:'tf',
          q:'The "shout" or "holy-ghost dance" in some Black Christian traditions is best understood as a continuation of West African possession-mediumship within a Christian frame.',
          answer:true,
          rationale:'The same body that, before captivity, would have been ridden by an Orisha, now becomes "filled with the Holy Ghost." The theology shifted; the technology of embodied possession did not.'
        },
        { type:'match',
          q:'Match each Black Christian liturgical element to its African parallel:',
          pairs:[
            ['Tambourine','The drum — repackaged when drumming was forbidden'],
            ['Hand-clapping in patterns','Polyrhythmic ancestral percussion'],
            ['Call-and-response sermon','West African call-and-response storytelling'],
            ['Anointing with oil','The Yoruba/Bantu tradition of consecrating with herbal oils']
          ],
          rationale:'These pairings are not coincidence — they are continuity. The forms shifted to satisfy the slaveholder; the substance stayed African.'
        },
        { type:'mc',
          q:'A descendant who grew up in the Black Church and is now reconnecting to West African traditions should understand that:',
          choices:[
            'The Black Church was a betrayal — the proper move is to reject it entirely',
            'The two traditions are entirely separate with no shared ground',
            'The Black Church was itself a survival vehicle for African theology — your grandmother\'s shout was older than the King James Bible — and the recovery is layered, not zero-sum',
            'Only one of the two can be authentic'
          ],
          answer:2,
          rationale:'The grandmother\'s shout is older than the church she shouted in. Reconnection is layered; one need not reject what carried the line forward to also reclaim what came before.'
        },
        { type:'tf',
          q:'Drumming was banned in many slaveholding regions because slaveholders specifically understood it as a coordinated communication and spiritual technology, not just music.',
          answer:true,
          rationale:'The Stono Rebellion (1739) led to drumming bans across the Carolinas. The slaveholders feared the drum because they knew it could organize, communicate, and summon. The drum survived in clap, foot, and tambourine.'
        }
      ]
    },

    // ─── p5 — Returning the Inheritance ──────────────────────
    p5: {
      title: 'Lesson 5 Check-in — Returning the Inheritance',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The closing teaching of this curriculum frames the descendant\'s relationship to the inheritance as:',
          choices:[
            'A burden to carry reluctantly',
            'A theft to relitigate',
            'A claim to make — the descendant is "the answer to a prayer somebody made in a slave ship hold"',
            'An optional hobby'
          ],
          answer:2,
          rationale:'You are the answer to a prayer made under conditions you cannot imagine. The inheritance comes with that weight — and that dignity.'
        },
        { type:'tf',
          q:'A descendant returning to the tradition must wait until they can travel to West Africa or be formally initiated by an elder priest before any practice is legitimate.',
          answer:false,
          rationale:'The grandmothers in cabins, kitchens, and tenements never had access to West Africa or formal initiation. The household practice — altar, libation, simple, bath, prayer, naming — has always been legitimate. Initiations are deepening, not gatekeeping.'
        },
        { type:'fill',
          q:'The closing instruction asks the student to commit to one specific <strong>______</strong> — small and faithful, repeated daily — over any elaborate one-time ceremony, because relationship over time is the only thing that builds real authority.',
          accept:['practice','daily practice','simple','discipline','daily discipline'],
          rationale:'A single faithful daily practice — three minutes a day — outranks a once-a-year elaborate ceremony. The repetition is what builds the line.'
        },
        { type:'mc',
          q:'The student who has finished this curriculum is ethically charged to:',
          choices:[
            'Begin teaching the material publicly to others immediately',
            'Sit with the material, deepen private practice, find competent elders for further work, and resist the impulse to claim authority before relationship has been built',
            'Move on to other spiritual systems',
            'Set the curriculum aside as completed'
          ],
          answer:1,
          rationale:'The curriculum is a beginning, not a credential. Practice deepens. Find elders. Earn relationship before claiming authority — the elders watch carefully for the student who confuses information with initiation.'
        },
        { type:'match',
          q:'Match each diaspora descendant\'s common situation to the foundational starting practice:',
          pairs:[
            ['Lost the family\'s names — only knows the slave-era surname','Ancestor bucket / Bwiti reliquary practice from Module II'],
            ['Cannot tell which Orisha is theirs','Build relationship with all seven over a year; let the Orisha reveal themselves'],
            ['Was raised in the Black Church and feels conflicted','Honor what carried the line forward; layer the recovery; do not force a rupture'],
            ['Lives in an apartment with no outdoor space','Windowsill garden, kitchen-pantry pharmacy, indoor altar — the diaspora has always practiced this way']
          ],
          rationale:'Each common situation has a recognized opening move. The tradition has answers for all of them — none disqualifies the descendant.'
        },
        { type:'mc',
          q:'The graduating teaching of the entire NTAS-98 Foundations curriculum is that mastery here is best understood as:',
          choices:[
            'Memorization of names and concepts',
            'Successful completion of an exam',
            'Becoming someone whose name will be spoken with warmth after they go — building, in this lifetime, the kind of character (Iwa-pẹlẹ) that makes you, eventually, a venerated ancestor',
            'Acquisition of expensive ceremonial items'
          ],
          answer:2,
          rationale:'The final exam is the way you live. Build the character now that, generations from now, will turn YOU into the ancestor a great-great-grandchild lights a candle for. The curriculum was always pointing at this.'
        }
      ]
    }

  },

  // ─────────────────────────────────────────────────────────────
  // END-OF-MODULE FINAL EXAM (12 questions, ≥80% to certify)
  // ─────────────────────────────────────────────────────────────
  exam: {
    title: 'Module VII Final Exam — The Diaspora',
    subtitle: 'How We Carried It Across Water',
    passThreshold: 0.8,
    questions: [
      { type:'mc',
        q:'Which statement best captures the foundational claim of this module?',
        choices:[
          'The Middle Passage destroyed the African spiritual traditions',
          'The Middle Passage tore the veil but could not cut the cord — the traditions survived, creolized, in unexpected vessels',
          'The diaspora is spiritually identical to pre-contact West Africa',
          'No African content survived in the Americas'
        ],
        answer:1,
        rationale:'The veil was torn; the cord held. What survived survived because the people refused — against every instruction — to forget.'
      },
      { type:'fill',
        q:'In Cuba, the Yoruba Orisha <strong>Ṣàngó</strong> was publicly masked behind <strong>______ ______</strong> — a Catholic saint whose feast day, sword, and red-and-white colors aligned with his profile.',
        accept:['saint barbara','santa barbara'],
        rationale:'Saint Barbara — feast day, sword, lightning, and the red-and-white. The mask let the worship continue while the slaveholders were watching the saint.'
      },
      { type:'match',
        q:'Match each diasporic tradition to its homeland and lineage character:',
        pairs:[
          ['Hoodoo','American South — folk-magical survival technology, primarily Black women\'s practice'],
          ['Haitian Vodou','Haiti — full religion with priests (houngan/mambo), Fon-Ewe and Kongo roots'],
          ['Lucumí (Santería)','Cuba — Yoruba-rooted religion, creolized with Catholic saint masking'],
          ['Candomblé','Brazil — three nations (Ketu/Jeje/Angola) preserving Yoruba, Fon, and Bantu lineages']
        ],
        rationale:'Each is a real, distinct, creolized survival tradition. They are siblings to the African originals and to one another — not interchangeable.'
      },
      { type:'tf',
        q:'Hoodoo and Vodou are the same tradition under different spellings.',
        answer:false,
        rationale:'Vodou (Haitian) is a religion with developed clergy and theology. Hoodoo (American South) is folk-magical practice without formal clergy. They share roots but are not the same thing.'
      },
      { type:'mc',
        q:'A "hush harbor" was:',
        choices:[
          'A type of slave ship',
          'A hidden gathering place — woods, swamps, or rooms with overturned pots to absorb sound — where enslaved people held their own worship outside the slaveholder\'s gaze',
          'A geographical region in West Africa',
          'A modern term with no historical referent'
        ],
        answer:1,
        rationale:'The hush harbor was the seed of what later became the Black Church. The pot turned upside down to muffle sound is itself a remembered Kongo technology.'
      },
      { type:'mc',
        q:'The "shout" or "holy-ghost dance" in some Black Christian traditions is best understood as:',
        choices:[
          'A modern emotional excess unrelated to African practice',
          'A continuation of West African possession-mediumship within a Christian theological frame',
          'A purely European Pentecostal invention',
          'A theatrical performance with no spiritual content'
        ],
        answer:1,
        rationale:'The body that, before captivity, would have been ridden by an Orisha is now "filled with the Holy Ghost." The theology shifted; the embodied technology did not.'
      },
      { type:'fill',
        q:'The Hoodoo practice of pouring a small splash of water at the threshold, or spilling a bit of every drink onto the ground before drinking, is a survival of the West African practice of <strong>______</strong> — libation.',
        accept:['mojuba','libation','pouring libation','libations'],
        rationale:'Mojuba traveled. The grandmother who throws salt over her shoulder, the uncle who pours a drop of liquor on the ground — these are diasporic mojuba in plain disguise.'
      },
      { type:'mc',
        q:'Drumming was banned in many slaveholding regions of the Americas because:',
        choices:[
          'The slaveholders thought drums were ugly',
          'The drums broke too easily',
          'Slaveholders correctly understood the drum as a tool of communication, organization, and spiritual summoning — feared after revolts like Stono (1739)',
          'There were no drums available'
        ],
        answer:2,
        rationale:'The drum was banned because it worked. It carried information, coordinated action, and summoned spirit. Where drums were forbidden, the rhythm survived in hand-clap, foot-stomp, and tambourine.'
      },
      { type:'tf',
        q:'A descendant raised in the Black Church who is now reconnecting to Yoruba/Hoodoo/Lucumí practice must reject the church entirely to be authentic.',
        answer:false,
        rationale:'The Black Church was itself a creolized survival vehicle for African theology. The grandmother\'s shout is older than the King James Bible. Recovery is layered — not zero-sum.'
      },
      { type:'mc',
        q:'The respectful posture for an outsider engaging Vodou, Lucumí, or Candomblé is:',
        choices:[
          'Practice them all freely without study',
          'Dismiss them as inferior to West African originals',
          'Approach with reverence, study under each tradition\'s own teachers, and refrain from claiming initiations or titles not formally received within that lineage',
          'Collapse them all into a single generic "African religion"'
        ],
        answer:2,
        rationale:'The traditions are distinct. Each has its own protocols, clergy, and authority structure. Respect means studying within and not claiming what has not been given.'
      },
      { type:'mc',
        q:'The closing teaching of the entire NTAS-98 Foundations curriculum holds that the true graduation marker is:',
        choices:[
          'Passing the final exam',
          'Memorizing the names of all the Orisha',
          'Living such that your name will be spoken with warmth after you go — building the character (Iwa-pẹlẹ) that turns you, eventually, into a venerated ancestor for the next generations',
          'Owning expensive ceremonial materials'
        ],
        answer:2,
        rationale:'The curriculum is not a credential — it is preparation for a life. The final exam IS the life. Become someone the next generation will tend.'
      },
      { type:'tf',
        q:'You are, in the language of this curriculum, "the answer to a prayer somebody made in a slave ship hold" — the inheritance is yours to claim by birth, deepen through practice, and pass forward.',
        answer:true,
        rationale:'They prayed forward. You are the prayer answered. The inheritance is real. The work now is to be worthy of it — which the elders insist is fully within your reach, beginning today.'
      }
    ]
  }

};
