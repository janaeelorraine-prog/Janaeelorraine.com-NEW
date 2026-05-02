// ══════════════════════════════════════════════════════════════
// MODULE VI — HERBOLOGY: THE GREEN INHERITANCE · QUIZ BANK
//   • 5 per-lesson check-ins (5-7 questions each, ≥80% to advance)
//   • 1 end-of-module exam (12 questions, ≥80% to certify)
//   • Schema: { lessons: { h1..h5 }, exam: { ... } }
//   • Question fields: type, q, choices/answer/rationale (mc),
//                       answer/rationale (tf), accept/rationale (fill),
//                       pairs/rationale (match)
// ══════════════════════════════════════════════════════════════
window.MODULE_6_QUIZZES = {

  lessons: {

    // ─── h1 — Plants Are Ancestors Too ───────────────────────
    h1: {
      title: 'Lesson 1 Check-in — Plants Are Ancestors Too',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'In Africana herbology, plants are best understood as:',
          choices:[
            'Inert raw materials selected for chemical effect',
            'Symbolic placeholders for psychological intentions',
            'Living elders with memory, lineage, and opinions about who may use them',
            'Decorations on the altar with no operative role'
          ],
          answer:2,
          rationale:'The Africana herbalist consults plants — she does not "use" them. They are participants, not ingredients.'
        },
        { type:'fill',
          q:'In Yoruba tradition, the Orisha of herbs and healing plants is <strong>______</strong>.',
          accept:['osanyin','ọsanyin','òṣanyìn','osain','ozain'],
          rationale:'Òṣanyìn (Osanyin) is the Orisha of the green tongue — the patron of all herbal knowledge.'
        },
        { type:'tf',
          q:'A rosemary plant on your windowsill that you have watered for two years carries more spiritual potency, in this tradition, than a fresh-cut sprig from a grocery store.',
          answer:true,
          rationale:'Plants carry lineage memory. Relationship over time builds potency that anonymous commercial herbs cannot match.'
        },
        { type:'match',
          q:'Match each plant to its traditional specialization:',
          pairs:[
            ['Rosemary','Memory, protection, clearing'],
            ['Basil','Attracting prosperity and sweetness'],
            ['Bay','Victory and uncrossing'],
            ['Hyssop','Deep purification']
          ],
          rationale:'Each plant has its particular work. Asking basil to do bay\'s work weakens the result — not because the plant refuses, but because you asked the wrong elder.'
        },
        { type:'mc',
          q:'The traditional way to introduce yourself to a new herb before significant working is to:',
          choices:[
            'Burn it immediately to assert the working',
            'Hold it, name yourself and your lineage, state the purpose, and acknowledge the plant could refuse',
            'Buy it from the most expensive supplier you can find',
            'Use it silently — speech disrupts the energy'
          ],
          answer:1,
          rationale:'You have not used a plant until you have greeted it as a person who could refuse. The introduction names you, your lineage, and the working.'
        },
        { type:'tf',
          q:'In the Africana frame, plants do not retain memory of the soil and hands that grew them — only their chemical compounds matter.',
          answer:false,
          rationale:'Plants remember the soil they were grown in, the hands that picked them, and the prayers said over them. Lineage memory is the heart of the practice.'
        }
      ]
    },

    // ─── h2 — Florida Water & Holy Smokes ────────────────────
    h2: {
      title: 'Lesson 2 Check-in — Florida Water & Holy Smokes',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'Florida Water is best described as:',
          choices:[
            'A perfume invented in Florida',
            'A 19th-century citrus-and-herb cologne (Murray & Lanman) that became a foundational diaspora spiritual water',
            'A modern New Age product with no traditional standing',
            'A medicinal tincture taken internally'
          ],
          answer:1,
          rationale:'Florida Water is the most democratic of holy waters — three dollars at the corner store, but used in serious work across Hoodoo, Espiritismo, Lukumí, and Vodou.'
        },
        { type:'fill',
          q:'In many Africana traditions, candle smoke and herb smoke are extinguished using a snuffer or lid — never <strong>______</strong> out — because breath sends the prayer back at you.',
          accept:['blown','blow'],
          rationale:'Blowing scatters the message. Snuff, lid, or pinch — never blow. (See Module II for the same teaching applied to altar candles.)'
        },
        { type:'mc',
          q:'The role of "holy smoke" (smudge, censer, incense) in working is:',
          choices:[
            'Decorative aromatherapy with no operative function',
            'A spiritual broom and a doorway — clearing the room and opening the channel between worlds',
            'A test of the practitioner\'s lung capacity',
            'Required only for elder priests'
          ],
          answer:1,
          rationale:'Smoke is the threshold material. It clears stagnant energy, marks the opening of sacred time, and carries prayer upward.'
        },
        { type:'tf',
          q:'White sage from California is the only herb suitable for smoke cleansing in Africana traditions.',
          answer:false,
          rationale:'White sage is a Native American practice that has been over-harvested. Africana traditions have their own roster: rosemary, bay, frankincense, copal, palo santo, sweetgrass, mugwort, hyssop. Use what your lineage uses.'
        },
        { type:'mc',
          q:'When using Florida Water on the body, the elders teach:',
          choices:[
            'Pour it directly into the eyes for vision',
            'Drink a small cup before bed',
            'Apply to crown, back of neck, palms, and soles — the body\'s primary thresholds',
            'Wait until a priest applies it for you'
          ],
          answer:2,
          rationale:'Crown, back of neck, palms, and soles are the body\'s thresholds. A few drops at each turns the body itself into a cleared room.'
        },
        { type:'mc',
          q:'A simple, traditional smoke-cleanse for a room follows this order:',
          choices:[
            'Center first, then walls, then exit',
            'Open windows or doors, smoke clockwise from threshold around the perimeter, return to threshold, name what is being cleared and what is being invited',
            'Smoke the ceiling only',
            'No order is needed — smoke is smoke'
          ],
          answer:1,
          rationale:'Open the room, work the perimeter, close at the threshold. Naming aloud what leaves and what enters seals the working.'
        }
      ]
    },

    // ─── h3 — Bath Herbs of the South ────────────────────────
    h3: {
      title: 'Lesson 3 Check-in — Bath Herbs of the South',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The Africana spiritual bath is fundamentally:',
          choices:[
            'A hygiene routine with herbs added for fragrance',
            'A ritual of removal and reception — washing off accumulated psychic residue and receiving a specific blessing',
            'A test of physical endurance',
            'Reserved only for full-moon nights'
          ],
          answer:1,
          rationale:'The bath is removal AND reception. You are not just clean — you have been re-blessed with whatever the herbs carry.'
        },
        { type:'match',
          q:'Match each Southern bath herb to its primary purpose:',
          pairs:[
            ['Hyssop','Deep cleansing — removes the heaviest residue'],
            ['Rosemary','Memory and protection — restores clarity'],
            ['Bay','Victory and uncrossing — opens stuck roads'],
            ['Sweet basil','Drawing prosperity and sweetness toward you']
          ],
          rationale:'Each herb does specific work. The bath formula reflects what you came for — cleanse only, or cleanse and draw.'
        },
        { type:'tf',
          q:'After a spiritual bath, you should towel-dry vigorously and resume normal activity immediately.',
          answer:false,
          rationale:'The traditional teaching is to AIR-DRY (or pat very lightly) so the herb water remains on the skin, and to rest quietly afterward — preferably go to bed. The bath is still working while you sleep.'
        },
        { type:'mc',
          q:'The traditional direction of washing in a cleansing bath is:',
          choices:[
            'Bottom to top — building energy upward',
            'Top to bottom — moving residue down and out, off the body',
            'In random order — direction does not matter',
            'Only the hands and feet are washed'
          ],
          answer:1,
          rationale:'Cleansing baths wash DOWNWARD — crown to soles — sending residue into the water. Drawing baths sometimes reverse direction. Always check the formula.'
        },
        { type:'fill',
          q:'After a cleansing bath, the used water is traditionally disposed of by pouring it at the <strong>______</strong> — the place where roads meet — to send the residue away from the home.',
          accept:['crossroads','crossroad','road','street','front door'],
          rationale:'Crossroads work in the Eshu tradition: residue cast there leaves with the next traveler. A front step or running drain works in apartment life.'
        },
        { type:'mc',
          q:'A practitioner who cannot afford rare imports should:',
          choices:[
            'Wait until they can afford ceremonial herbs',
            'Skip baths entirely',
            'Use what is in the kitchen — rosemary, basil, bay, hyssop, salt, lemon — exactly what the great-grandmothers used',
            'Use only commercial bath salts'
          ],
          answer:2,
          rationale:'The Southern grandmothers built their pharmacy from the spice cabinet and the back garden. The pantry IS the pharmacy.'
        }
      ]
    },

    // ─── h4 — Simples for the Spirit ─────────────────────────
    h4: {
      title: 'Lesson 4 Check-in — Simples for the Spirit',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'A "simple" in herbal tradition is:',
          choices:[
            'A remedy for simple-minded people',
            'A working that uses ONE herb, ONE purpose, and ONE prayer — the smallest unit of effective practice',
            'A formula with at least seven herbs',
            'A modern shortcut that elders disapprove of'
          ],
          answer:1,
          rationale:'A simple is the atomic unit: one herb, one purpose, one prayer. The grandmothers did most of their work this way.'
        },
        { type:'tf',
          q:'A complex 12-herb formula is always more powerful than a well-prayed single herb.',
          answer:false,
          rationale:'A clean simple done with full presence often outperforms an elaborate formula done absent-mindedly. Power lives in relationship and presence, not in ingredient count.'
        },
        { type:'fill',
          q:'A small jar of <strong>______</strong> on the front threshold — used in Hoodoo, Lukumí, and Black Southern practice alike — protects the household from heavy intent crossing the door.',
          accept:['salt','sea salt','black salt','kosher salt'],
          rationale:'Salt is the most universal simple. A small jar at the threshold (or a line poured across it) keeps unwanted energy from entering.'
        },
        { type:'mc',
          q:'Daily salt-water mouth rinse is traditionally used for:',
          choices:[
            'Whitening teeth only',
            'Clearing whatever entered the mouth — gossip, insult, food eaten in stress — before bed',
            'Improving athletic performance',
            'Replacing toothpaste'
          ],
          answer:1,
          rationale:'The mouth is a major spiritual gate. A simple salt rinse before bed clears what entered it during the day. One herb, one purpose, one prayer.'
        },
        { type:'match',
          q:'Match each common simple to its traditional working:',
          pairs:[
            ['Honey jar','Sweetening a stuck or sour relationship'],
            ['Cinnamon broom sweep','Drawing prosperity and abundance into the home'],
            ['Lemon working','Cutting and souring an aggressor or harmful tie'],
            ['Bay leaf burned','Petitioning a wish — write it, burn it, release it']
          ],
          rationale:'Each is a recognized simple in the broader Africana/Hoodoo lineage. One ingredient, one purpose, one prayer.'
        },
        { type:'tf',
          q:'A simple should still be introduced to with the same brief greeting used in Lesson 1 — even a pinch of salt or a single bay leaf is treated as a participant.',
          answer:true,
          rationale:'The respect does not scale down. A bay leaf and a complex formula are both elders. Greet either before working.'
        }
      ]
    },

    // ─── h5 — Garden as Altar ─────────────────────────────────
    h5: {
      title: 'Lesson 5 Check-in — Garden as Altar',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The teaching "your garden is an altar where prayers grow back as food" means:',
          choices:[
            'Gardening is a hobby unrelated to spiritual practice',
            'A plot tended with intention is a living altar — the prayers spoken over it return as harvested medicine and food',
            'Only commercial farms can be considered sacred',
            'Spiritual practice ends when the soil is touched'
          ],
          answer:1,
          rationale:'The garden is altar — soil, water, sun, hand, prayer, time, harvest. Prayers spoken over the bed return as the leaf you eventually harvest.'
        },
        { type:'tf',
          q:'A windowsill pot of basil cannot count as a sacred garden — only outdoor plots qualify.',
          answer:false,
          rationale:'A single windowsill pot, tended faithfully for a year, is a real sacred garden. Apartment dwellers and the housebound have always practiced this way. Scale does not determine sanctity; relationship does.'
        },
        { type:'fill',
          q:'In Yoruba tradition, before harvesting from any plant for working, the practitioner offers a small <strong>______</strong> — water, a coin, a verse — so the harvest is exchange, not extraction.',
          accept:['offering','libation','gift','exchange'],
          rationale:'Harvest must be exchange, not extraction. Even a few drops of water at the base of the plant fulfills the protocol.'
        },
        { type:'mc',
          q:'The most spiritually appropriate moment to harvest most herbs is:',
          choices:[
            'Hot midday when the sun is highest',
            'Late evening after dark',
            'Morning, after the dew has dried — the plant has just woken and is most awake',
            'It does not matter — plants are inert'
          ],
          answer:2,
          rationale:'Morning after the dew has lifted is the traditional window — the plant is awake and at full presence. Hot midday wilts both the leaf and the relationship.'
        },
        { type:'mc',
          q:'A garden built as altar typically includes, beyond the plants themselves:',
          choices:[
            'Only fertilizer and pest control',
            'A small element of the four ritual materials — water (a vessel or birdbath), fire (a candle on occasion), earth (the soil itself), and air (a hung bell or wind-chime); plus a place to greet',
            'Garden gnomes and decorations only',
            'A separate building entirely'
          ],
          answer:1,
          rationale:'The garden-altar holds the four ritual elements within the planted space, and a quiet place to enter and greet — turning the plot into a true working ground.'
        },
        { type:'tf',
          q:'The end-of-module teaching is that competent herbalism — the green tongue — is fluency, not formula: knowing the plants by their personalities, having relationships with them over years, and trusting what they teach you in the body.',
          answer:true,
          rationale:'Formulas are training wheels. Fluency is knowing rosemary the way you know an aunt — by smell, mood, and what she has done for you over years. That is the green tongue returning.'
        }
      ]
    }

  },

  // ─────────────────────────────────────────────────────────────
  // END-OF-MODULE EXAM (12 questions, ≥80% to certify)
  // ─────────────────────────────────────────────────────────────
  exam: {
    title: 'Module VI Final Exam — Herbology',
    subtitle: 'The Green Inheritance',
    passThreshold: 0.8,
    questions: [
      { type:'mc',
        q:'Which statement best captures Module VI\'s foundational teaching?',
        choices:[
          'Plants are chemical compounds; effective herbalism is biochemistry',
          'Plants are living elders with lineage and personality; effective herbalism is relationship over years',
          'Only initiated priests can work with plants',
          'African herbalism is identical to Western pharmacognosy'
        ],
        answer:1,
        rationale:'The Africana herbalist consults plants as elders. Relationship and presence — not ingredient lists — produce the work.'
      },
      { type:'fill',
        q:'The Yoruba Orisha of herbs and healing plants is <strong>______</strong>.',
        accept:['osanyin','ọsanyin','òṣanyìn','osain','ozain'],
        rationale:'Òṣanyìn — the green tongue itself, the patron of every leaf and root.'
      },
      { type:'match',
        q:'Match each plant to its traditional specialty:',
        pairs:[
          ['Rosemary','Memory and protection'],
          ['Bay','Victory and uncrossing'],
          ['Hyssop','Deep purification'],
          ['Basil','Drawing prosperity and sweetness']
        ],
        rationale:'These are core specialties in the Southern Black and Lukumí traditions. Asking the wrong plant for the wrong work weakens the result.'
      },
      { type:'mc',
        q:'The brief greeting offered to a plant before significant working serves to:',
        choices:[
          'Test the practitioner\'s memory',
          'Establish the plant\'s consent and the relationship — you have not used a plant until you have greeted it as a person who could refuse',
          'Lengthen the ritual for showmanship',
          'Make the herb taste better'
        ],
        answer:1,
        rationale:'The introduction is brief, simple, and changes the quality of the relationship. Within a week of beginning the practice, plants begin to respond differently.'
      },
      { type:'tf',
        q:'Florida Water — a 19th-century commercial cologne — is considered legitimate spiritual material in Hoodoo, Lukumí, Vodou, and Espiritismo.',
        answer:true,
        rationale:'Florida Water (Murray & Lanman, 1808) is the most democratic of the diaspora\'s holy waters. Cheap, available, and operative across multiple lineages.'
      },
      { type:'mc',
        q:'The correct order for a perimeter smoke-cleanse of a room is:',
        choices:[
          'Center, then ceiling, then floor',
          'Open windows/doors, smoke clockwise from threshold around the perimeter, close at threshold, name what leaves and what enters',
          'Just walk through with smoke; order does not matter',
          'Only the practitioner\'s body should be smoked'
        ],
        answer:1,
        rationale:'Open the room. Work the perimeter. Close at the threshold. Naming aloud seals the working.'
      },
      { type:'mc',
        q:'In a traditional cleansing bath, water is poured:',
        choices:[
          'Bottom to top — to build energy upward',
          'Top to bottom — moving accumulated residue downward and off the body',
          'Only on the hands',
          'Direction is irrelevant'
        ],
        answer:1,
        rationale:'Cleansing baths flow DOWN. Drawing baths sometimes reverse. The body becomes the surface from which residue is rinsed into the water.'
      },
      { type:'fill',
        q:'After a cleansing bath, the used herb water is traditionally disposed of at the <strong>______</strong>, sending the residue away from the home with the next traveler.',
        accept:['crossroads','crossroad','front step','threshold','running drain'],
        rationale:'The crossroads is Eshu\'s territory. Front-step disposal works for apartment life. The principle: do not pour bath residue back into household drains where it will collect.'
      },
      { type:'mc',
        q:'A "simple" in this tradition refers to:',
        choices:[
          'A remedy for the simple-minded',
          'One herb + one purpose + one prayer — the atomic unit of practice',
          'A complex multi-herb formula',
          'A modern shortcut elders dislike'
        ],
        answer:1,
        rationale:'Most of the grandmothers\' work was simples. A clean simple done with full presence outperforms a complex formula done absent-mindedly.'
      },
      { type:'tf',
        q:'A windowsill pot of basil, faithfully tended for one year, qualifies as a real sacred garden in this tradition.',
        answer:true,
        rationale:'Scale does not determine sanctity — relationship does. Apartment dwellers and the housebound have always practiced this way.'
      },
      { type:'mc',
        q:'The traditional time of day to harvest most herbs is:',
        choices:[
          'Hot midday',
          'Late evening after dark',
          'Morning, after the dew has dried — the plant is awake and at full presence',
          'Whenever convenient'
        ],
        answer:2,
        rationale:'Morning after the dew lifts is the traditional window. The plant is fresh, awake, and at full attention.'
      },
      { type:'mc',
        q:'The graduating teaching of Module VI is that mastery of the green tongue is best understood as:',
        choices:[
          'Memorization of formulas',
          'Fluency — knowing each plant by personality, building decade-long relationships, trusting what they teach you in the body',
          'Owning rare and expensive herbs',
          'Holding a formal certification'
        ],
        answer:1,
        rationale:'Formulas are training wheels. Fluency — recognizing rosemary the way you recognize an aunt — is the green tongue returning to a body that always knew how to read it.'
      }
    ]
  }

};
