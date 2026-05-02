// ═══════════════════════════════════════════════════════════════
// MODULE I — COSMOLOGY: Quiz Bank
//   • Per-lesson check-ins (3–5 questions)
//   • End-of-module exam (12 questions)
//   • Question types: mc (multiple choice), tf (true/false),
//                     fill (fill-in-blank), match (match pairs)
// ═══════════════════════════════════════════════════════════════
window.MODULE_1_QUIZZES = {

  // ─────────────────────────────────────────────────────────────
  // PER-LESSON CHECK-INS
  // ─────────────────────────────────────────────────────────────
  lessons: {

    // ─── L1: The Three Worlds ────────────────────────────────
    'l1': {
      title: 'Check-In: The Three Worlds',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'In Yoruba cosmology, the three worlds are best described as:',
          choices:[
            'A vertical hierarchy with heaven on top and underworld below',
            'Three braided realms that breathe into each other constantly',
            'Two worlds (physical and spiritual) with an empty middle space',
            'A linear progression from earth to heaven through ancestors'
          ],
          answer:1,
          rationale:'The lesson teaches that cosmos is a weave, not a ladder. Ọrun, Ayé, and Ile breathe into each other to maintain cosmic order.'
        },
        { type:'mc',
          q:'<strong>Aṣẹ</strong> is best understood as:',
          choices:[
            'A type of prayer said before meals',
            'A specific Òrìṣà worshipped at sunrise',
            'The inherent life-force and creative potential that flows between all three worlds',
            'The Yoruba word for "amen"'
          ],
          answer:2,
          rationale:'Aṣẹ is the activating life-force that saturates all three worlds. Saying "Àṣẹ" at the end of prayer invokes this current — it is much more than "amen."'
        },
        { type:'fill',
          q:'According to Yoruba teaching, what you carry across the threshold from Ayé back to Ọrun is not wealth or reputation, but your <strong>______ ______</strong> — your balanced character.',
          accept:['iwa-pele','iwa pele','iwapele','iwa-pẹlẹ','iwa pẹlẹ'],
          rationale:'Iwa-pẹlẹ — balanced character — is what travels with the soul. Wealth and reputation stay in the marketplace.'
        },
        { type:'tf',
          q:'In Yoruba thought, the human being in Ayé is composed of three components: Ara (body), Emi (breath/soul), and Ori (the destiny-self).',
          answer:true,
          rationale:'Correct. The human is a union of these three components, each with its own role. Spiritual practice keeps them aligned.'
        },
        { type:'mc',
          q:'The teaching that "the world is a marketplace; heaven is home" means:',
          choices:[
            'Earth is for buying things; heaven is for resting',
            'Ayé is a transient place where you came to fulfill a specific life-project before returning to Ọrun',
            'Worship should be more like commerce',
            'You should accumulate wealth before death'
          ],
          answer:1,
          rationale:'The marketplace metaphor reorganizes priorities — you came on a working trip, with a purpose to fulfill, and Ọrun is your true home.'
        }
      ]
    },

    // ─── L2: Ori — The Crown You Were Born With ─────────────
    'l2': {
      title: 'Check-In: Ori & The Crown',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The foundational teaching about Ori is:',
          choices:[
            'Your Ori is determined entirely by the Òrìṣà you worship',
            'Your Ori can be changed by any qualified priest',
            'No god blesses a person without the consent of their Ori',
            'Ori only matters after death, in Ọrun'
          ],
          answer:2,
          rationale:'This is the central teaching. Even the Òrìṣà must work in harmony with your Ori. The crown is the first authority.'
        },
        { type:'match',
          q:'Match each component of Ori to its function:',
          pairs:[
            ['Ori Ode',  'The physical head — the visible vehicle'],
            ['Ori Inu',  'The internal head — personality and character'],
            ['Ori Apere','The personal divinity — your unique destiny blueprint'],
            ['Iponri',   'The heavenly self that remained in Ọrun']
          ],
          rationale:'Ori is a tripartite metaphysical entity, with Iponri as the deeper celestial twin. Spiritual development is the gradual reunion of earthly Ori with heavenly Iponri.'
        },
        { type:'fill',
          q:'<strong>______</strong> is the destiny that the soul receives or selects before birth — the predetermined course that dictates the central tasks of the incoming life.',
          accept:['ayanmo','ayanmọ'],
          rationale:'Ayanmo is the contracted destiny chosen before birth. Forgetting is part of the design; the work of life is to remember the contract.'
        },
        { type:'mc',
          q:'Which of the following is NOT typically named as a "soul storm" that derails destiny?',
          choices:[
            'Anger held too long',
            'Jealousy',
            'Curiosity about new ideas',
            'Pride that closes the ear'
          ],
          answer:2,
          rationale:'Curiosity is not a soul storm. The named storms are anger, jealousy, fear-as-worldview, pride that closes the ear, and greed.'
        },
        { type:'tf',
          q:'Iwa-pẹlẹ (balanced character) and Ayanmo (destiny) are independent of each other — character has no bearing on whether destiny is fulfilled.',
          answer:false,
          rationale:'False. Destiny provides the blueprint; character actualizes it. A magnificent Ayanmo can fail to manifest if Iwa-pẹlẹ is not built. The two are inextricably linked.'
        }
      ]
    },

    // ─── L3: Egungun & The Unseen ────────────────────────────
    'l3': {
      title: 'Check-In: Egungun & The Unseen',
      passThreshold: 0.8,
      questions: [
        { type:'mc',
          q:'The Egungun mask is most accurately described as:',
          choices:[
            'A theatrical costume designed to entertain the village',
            'A doorway and protective tool that allows the human body to serve as a vehicle for the ancestor',
            'A symbol of the chief\'s political authority',
            'A children\'s toy used in storytelling'
          ],
          answer:1,
          rationale:'The covering is functional — it marks that a substitution has occurred (medium → ancestor) and creates a safe perimeter for the possession.'
        },
        { type:'tf',
          q:'In African sacred science, secrecy and spiritual power are directly related — full public disclosure can dilute a ritual\'s working.',
          answer:true,
          rationale:'Correct. Discretion is itself a spiritual practice. Part of the technology is the silence.'
        },
        { type:'mc',
          q:'One of the most important social functions of the Egungun in traditional contexts is:',
          choices:[
            'Collecting taxes for the chief',
            'Operating as a justice mechanism outside the political system — naming hidden wrongs that no living power can punish',
            'Predicting the weather',
            'Enforcing the slave trade'
          ],
          answer:1,
          rationale:'The Egungun can name corruption that the chief cannot punish, because to harm the masked ancestor would violate the entire cosmology.'
        },
        { type:'fill',
          q:'Diaspora traditions like Trinidad Carnival, Haitian Rara, and the "shouting" of the Black church preserve, often in altered form, the African tradition of <strong>______ ______</strong> — body-as-vessel for the ancestors and spirits.',
          accept:['possession mediumship','spirit possession','ancestral mediumship','possession-mediumship'],
          rationale:'The mask was abandoned in many diasporic forms, but the technology survived in the body. The cloth still moves; the figure still arrives.'
        }
      ]
    },

    // ─── L4: The River of Time ───────────────────────────────
    'l4': {
      title: 'Check-In: The River of Time',
      passThreshold: 0.8,
      questions: [
        { type:'match',
          q:'Match each Kemetic time-concept to its meaning:',
          pairs:[
            ['Neheh', 'Cyclical time — the time of becoming, motion, and renewal'],
            ['Djet',  'Stillness — the time of being, the immutable foundational state'],
            ['Sankofa','Going back to retrieve what was forgotten'],
            ['Atunwa','The return of an ancestral soul through reincarnation']
          ],
          rationale:'Neheh is the becoming (cyclical motion), Djet is the being (stillness). Sankofa retrieves; Atunwa returns.'
        },
        { type:'mc',
          q:'The Sankofa teaching insists that:',
          choices:[
            'The past should be forgotten so progress can occur',
            'Returning to the past is a necessary reclamation required to move forward',
            'Only elders are permitted to speak of the past',
            'History is a private matter, not a spiritual one'
          ],
          answer:1,
          rationale:'"It is not wrong to go back for that which you have forgotten." The bird turns its head while moving forward — this is the central charge.'
        },
        { type:'tf',
          q:'In the Africana cosmologies, time is best represented by a straight line moving from creation to apocalypse.',
          answer:false,
          rationale:'False. Africana time is a circle — often pictured as the Ouroboros — and is identified with events and cycles, not with the clock.'
        },
        { type:'fill',
          q:'The roughly 26,000-year cosmic cycle, observed by Egyptian and Dogon priest-astronomers, is called the <strong>______ ______</strong>.',
          accept:['great year'],
          rationale:'The Great Year is divided into twelve Astrological Ages of approximately 2,160 years each.'
        },
        { type:'mc',
          q:'Why do traditional teachings hold that the dead are "upstream" rather than "behind"?',
          choices:[
            'Because all rivers flow north',
            'Because they were buried in higher elevations',
            'Because in cyclical time, the dead are still flowing through the same waters as the living — present and active, not gone',
            'Because the dead live in the sky above the river'
          ],
          answer:2,
          rationale:'The cyclical-time worldview locates the dead as still in the river, available through dreams and ritual. They remain vigilant guardians.'
        }
      ]
    },

    // ─── L5: Reading the Cosmic Body ─────────────────────────
    'l5': {
      title: 'Check-In: Reading the Cosmic Body',
      passThreshold: 0.8,
      questions: [
        { type:'fill',
          q:'The somatic meditation practice that maps zodiacal signs onto specific regions of the human body is called <strong>______ ______</strong>.',
          accept:['nyasa vidya','nyasa-vidya'],
          rationale:'Nyasa Vidya is the sacred meditation of correspondences — astrology felt in the body, not just read on paper.'
        },
        { type:'match',
          q:'Match each chakra to the Òrìṣà (or principle) that governs it:',
          pairs:[
            ['Root chakra',         'Ṣàngó — wise application of force, courage'],
            ['Heart chakra',        'Ògún — inner strength, balance of armor and tenderness'],
            ['Throat chakra',       'Obatala — mastery of speech and self-expression'],
            ['Third Eye chakra',    'Orunmila — wisdom, divination, cosmic law'],
            ['Crown chakra',        'Ori — your direct line to Olodumare']
          ],
          rationale:'The chakras are the internal dwellings of the Òrìṣà. Calibrating the soul means keeping these "addresses" clean.'
        },
        { type:'mc',
          q:'The teaching about the "primary door" holds that:',
          choices:[
            'Everyone receives spiritual guidance the same way',
            'Each person was issued a primary entry point — and the work is to clean the apparatus you were given, not acquire someone else\'s',
            'Only the third eye is a legitimate place to receive guidance',
            'Doors only open after formal initiation'
          ],
          answer:1,
          rationale:'You receive the divine through one primary door — gut, heart, throat, crown, soles. The work is to recognize yours and tend it, not to chase another\'s.'
        },
        { type:'tf',
          q:'Iwa-pẹlẹ (balanced character) is the axis that holds the cosmic body coherent — without it, the body becomes unmoored from the larger cosmic order (Ma\'at).',
          answer:true,
          rationale:'Correct. Ethics and spirituality are the same concern viewed from different angles. Character is the spinal column of the spiritual life.'
        },
        { type:'mc',
          q:'In Africana spiritual anatomy, the Òrìṣà are best described as:',
          choices:[
            'Forces that exist only in the sky-realm',
            'Both external cosmic forces AND internal dwellings within the body\'s energy centers',
            'Symbolic figures with no direct relationship to the body',
            'Ancestors of specific Yoruba lineages'
          ],
          answer:1,
          rationale:'The Òrìṣà are not only "out there." They have addresses inside your body. The chakras are the rooms they live in.'
        }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // END-OF-MODULE EXAM (12 questions)
  // ─────────────────────────────────────────────────────────────
  exam: {
    title: 'Module I Exam — Cosmology',
    subtitle: 'The Map of Worlds',
    passThreshold: 0.8,
    questions: [
      { type:'mc',
        q:'Which statement best captures the foundational ontology of Yoruba cosmology?',
        choices:[
          'The spiritual and the physical are two separate realms that occasionally meet',
          'The spiritual realm is real; the physical realm is illusion',
          'The spiritual and physical are complementary and intertwined — they breathe into each other to maintain cosmic order',
          'Only the spiritual realm matters for spiritual practice'
        ],
        answer:2,
        rationale:'The braiding of worlds is the foundation. Pull on one thread; the others tighten.'
      },
      { type:'match',
        q:'Match each of the three worlds to its description:',
        pairs:[
          ['Ọrun', 'The sky-world — abode of Olodumare and the Òrìṣà; your true home'],
          ['Ayé',  'The marketplace of the living — where you came to fulfill your life-project'],
          ['Ile',  'The earth-realm — where elevated ancestors dwell, embedded in the soil']
        ],
        rationale:'Three braided worlds, each with its own population and function, all linked by the flow of Aṣẹ.'
      },
      { type:'fill',
        q:'The inherent life-force that saturates all three worlds and makes manifestation and communication between them possible is called <strong>______</strong>.',
        accept:['ase','aṣẹ','ashe','àṣẹ'],
        rationale:'Aṣẹ is the activating current of the universe. To say "Àṣẹ" is to invoke it.'
      },
      { type:'mc',
        q:'The teaching "No god blesses a person without the consent of their Ori" places final spiritual authority:',
        choices:[
          'In the priesthood',
          'In Olodumare alone',
          'Inside the human person — at the crown of the head',
          'In the lineage of ancestors'
        ],
        answer:2,
        rationale:'Ori is the apex, the gatekeeper. The Òrìṣà can wish you well, but if your Ori has not consented, the blessing does not land.'
      },
      { type:'tf',
        q:'Ayanmo (the destiny chosen before birth) is fatalistic — it cannot be cooperated with, only suffered or escaped.',
        answer:false,
        rationale:'False. Ayanmo is vocational, not fatalistic. It is a curriculum to be remembered and walked, with character (Iwa-pẹlẹ) as the actualizing force.'
      },
      { type:'fill',
        q:'The deeper "heavenly self" that remained in Ọrun while the rest of you came down to be born — the celestial twin to your earthly Ori — is called <strong>______</strong>.',
        accept:['iponri','ìpọnrí'],
        rationale:'Iponri is the soul-space of the inner self. The work of a lifetime is the reunion of earthly Ori with heavenly Iponri.'
      },
      { type:'mc',
        q:'The Egungun masquerade is best understood as:',
        choices:[
          'Folk theater performed at festivals',
          'A specialized priesthood and technology of ancestral mediumship — the dead returning briefly to consult with the living',
          'A type of military training',
          'An art form unrelated to religion'
        ],
        answer:1,
        rationale:'The Egungun Society maintains the apparatus by which the dead can return. The mask is doorway, not costume.'
      },
      { type:'match',
        q:'Match each Kemetic and Akan time concept to its meaning:',
        pairs:[
          ['Neheh',   'Cyclical time — motion, becoming, the renewal of forms'],
          ['Djet',    'Suspended time — being, the still imprint of the cosmos at birth'],
          ['Sankofa', '"Go back and fetch it" — reclamation of forgotten knowledge'],
          ['Atunwa',  '"To come again" — reincarnation of ancestral souls into the lineage']
        ],
        rationale:'Time is a river running both ways. Neheh and Djet describe its motion and stillness; Sankofa and Atunwa describe how the past returns to the present.'
      },
      { type:'mc',
        q:'According to the lesson on Reading the Cosmic Body, the chakras are best understood as:',
        choices:[
          'A foreign system imported from India with no African parallel',
          'The internal dwellings of the Òrìṣà — energy centers where divine forces have addresses inside your body',
          'A modern wellness invention',
          'The same as the body\'s organs'
        ],
        answer:1,
        rationale:'The Òrìṣà are not only "out there." Each chakra is the room of an Òrìṣà; calibrating the soul means keeping the rooms clean.'
      },
      { type:'tf',
        q:'In Africana cosmology, ethics (Iwa-pẹlẹ) and spirituality are separate concerns — one can be spiritually advanced without ethical character.',
        answer:false,
        rationale:'False. Iwa-pẹlẹ is the axis that ties the body to Ma\'at, the cosmic order. They are the same concern viewed from different angles.'
      },
      { type:'mc',
        q:'In Yoruba teaching, what does the practitioner actually carry across the threshold from Ayé back to Ọrun at the end of life?',
        choices:[
          'Their accumulated wealth',
          'Their reputation among the living',
          'Their balanced character (Iwa-pẹlẹ) — the integrity of how they walked the marketplace',
          'Their physical body'
        ],
        answer:2,
        rationale:'Wealth and reputation stay in the marketplace. Iwa-pẹlẹ travels with the soul. This is the Yoruba doctrine of judgment in its briefest form.'
      },
      { type:'fill',
        q:'The Akan symbol of the bird whose head is turned backward while its feet face forward — teaching that returning to the past is necessary to move forward — is called <strong>______</strong>.',
        accept:['sankofa'],
        rationale:'Sankofa: "It is not wrong to go back for that which you have forgotten." The egg in the beak is what makes the next generation possible.'
      }
    ]
  }
};
