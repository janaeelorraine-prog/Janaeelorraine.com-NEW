// ══════════════════════════════════════════════════════════════
// MODULE IV — DIVINATION — Quiz Bank
//   • 5 lesson check-ins (3 questions each, ≥80% to pass)
//   • 1 end-of-module exam (12 questions, ≥80% to certify)
// ══════════════════════════════════════════════════════════════
window.MODULE_4_QUIZZES = {

  lessons: {
    d1: {
      title:'Lesson 1 Check-in — Why We Cast',
      passing: 80,
      questions: [
        { q:'How does the tradition characterize divination?',
          choices:[
            'Predicting fixed future events',
            'Structured listening — asking a precise question of the universe and receiving an answer through a system the diviner does not control',
            'A magical performance for entertainment',
            'A way to control other people'
          ], correct:1,
          explanation:'Divination converts the universe\'s constant ambient speech into discrete answers to specific questions, using structured randomness read against accumulated wisdom.' },

        { q:'What characteristics make a question appropriate to bring to divination?',
          choices:[
            'Trivial daily decisions',
            'Genuine (you actually don\'t know), weighty (it matters), answerable (within the system\'s competence), and asked from openness',
            'Only questions about wealth and romance',
            'Anything you\'re curious about'
          ], correct:1,
          explanation:'Ifa speaks for those who come with weight. Trivializing the system is one of the fastest ways to lose your right to use it.' },

        { q:'Why is the diviner\'s posture of "willingness to be told the truth" essential?',
          choices:[
            'Because the orisha will punish disrespect',
            'Because the system is rigged in favor of believers',
            'Because resistance distorts the signal — if you cannot stand to look at the mirror, you\'ll throw the cowries against the wall and call them broken',
            'Because diviners need flattery'
          ], correct:2,
          explanation:'The system\'s gift is exactly proportional to your willingness to receive it. Inner work precedes tool work.' }
      ]
    },

    d2: {
      title:'Lesson 2 Check-in — Orunmila, The Witness',
      passing: 80,
      questions: [
        { q:'What is Orunmila\'s unique role in the Yoruba cosmology?',
          choices:[
            'He created the orisha',
            'He was present at every soul\'s choosing of its Ori — the witness of destiny who remembers what each person came to do',
            'He is the orisha of war',
            'He is a deceased human who was deified'
          ], correct:1,
          explanation:'Eleri Ipin — "the witness of destiny." Igbakeji Olodumare — "second to Olódùmarè." His function is to translate what Source knows into language a human can hear.' },

        { q:'What is the difference between Babalawo and Iyanifa?',
          choices:[
            'They are the same role',
            'Babalawo is "father of the secrets" (male initiate of Orunmila); Iyanifa is "mother of Ifa" (female initiate) — both undergo a 7+-year apprenticeship memorizing the Odu corpus',
            'Babalawo reads cowries; Iyanifa reads palm nuts',
            'Babalawo serves Orunmila; Iyanifa serves a different orisha'
          ], correct:1,
          explanation:'Both are formally initiated priests of Orunmila. Reform houses across the diaspora have restored full female ordination after a period of male-only practice in some traditions.' },

        { q:'Why does Eshu\'s face appear carved at the edge of every Ifa divining tray (opon Ifa)?',
          choices:[
            'For decoration',
            'Because Eshu is the gatekeeper — even Orunmila must defer to him; if Eshu is not greeted at the start of every reading, the message will not flow correctly',
            'Because Eshu created divination',
            'To frighten clients'
          ], correct:1,
          explanation:'Greet Eshu first, always — including in divination. Skip the greeting and the message arrives scrambled, or not at all.' }
      ]
    },

    d3: {
      title:'Lesson 3 Check-in — Obi: The First Cast',
      passing: 80,
      questions: [
        { q:'In standard four-piece obi divination, what does Alaafia (4 light, 0 dark) signify?',
          choices:[
            'A full no — the road is closed',
            'Mixed — ask again',
            'A clear, full yes; peace; the road is open; whatever was asked about will go well',
            'The cast is invalid'
          ], correct:2,
          explanation:'Alaafia means "peace." A clean affirmative. Proceed with confidence.' },

        { q:'What is the correct response when Oyeku (4 dark, 0 light — a full "no") comes up on a question where you wanted "yes"?',
          choices:[
            'Cast immediately again, hoping for a different answer',
            'Receive it, sit with it, and ask a follow-up question about what the obstacle is and what would clear it — never re-cast the same exact question',
            'Ignore the cast and proceed anyway',
            'Conclude the cowries are broken'
          ], correct:1,
          explanation:'"Ifa kò pe èké" — Ifa does not lie. The diviner who can receive Oyeku without flinching is the one whose ear keeps sharpening.' },

        { q:'How often should a serious practitioner of obi cast?',
          choices:[
            'Daily, as a spiritual discipline',
            'Multiple times per day for any decision',
            'Sparingly — when a real, weighty question arises; otherwise not at all. Casting too often dulls the system and the questioner',
            'Only on full moons'
          ], correct:2,
          explanation:'Cast when you have a real question; otherwise do not. Over-casting signals avoidance of the harder work of thinking and sitting with uncertainty.' }
      ]
    },

    d4: {
      title:'Lesson 4 Check-in — The Sixteen Odu',
      passing: 80,
      questions: [
        { q:'How many master Odu are there, and how many compound combinations do they generate in Ifa divination?',
          choices:[
            '8 Odu, 64 combinations',
            '16 master Odu, paired into 256 compound Odu — the working alphabet of Ifa',
            '12 Odu, 144 combinations',
            '256 Odu, no combinations'
          ], correct:1,
          explanation:'Each Odu is a four-binary-mark column (2⁴ = 16). Two arms of the opele each produce one Odu; combined, they yield one of 256.' },

        { q:'What are the "Meji" Odu, and why are they considered most senior?',
          choices:[
            'Random combinations of any two Odu',
            'When both arms of the opele cast produce the same Odu (e.g., Ogbe-Ogbe = Ogbe Meji) — the 16 Meji are considered the deepest, most ancient, most authoritative',
            'Odu reserved for special holidays',
            'Modern inventions not in traditional practice'
          ], correct:1,
          explanation:'When a Meji comes up, the diviner sits straighter — something foundational is being said. The 16 Meji form the senior tier of the 256.' },

        { q:'What is dilogún, and why is it the most accessible formal divination for most diasporic students?',
          choices:[
            'A modern app for casting Odu',
            'Divination using 16 cowrie shells; performed by initiated orisha priests (Iyalorisha/Babalorisha) — more numerous in the diaspora than fully trained Babalawo',
            'A simpler form of obi',
            'A children\'s game'
          ], correct:1,
          explanation:'Dilogún was the diaspora\'s adaptation when the full Ifa apparatus could not always survive. It is robust, respected, and the most appropriate first-formal-reading door for many.' }
      ]
    },

    d5: {
      title:'Lesson 5 Check-in — The Diviner\'s Ethics & Everyday Omens',
      passing: 80,
      questions: [
        { q:'Which of these is a foundational ethic of legitimate divinatory practice?',
          choices:[
            'Always tell the client what they want to hear',
            'Confidentiality — whatever is said in a reading stays in the reading, forever; the diviner is the priest of confidentiality before anything else',
            'Charge as much as the market will bear',
            'Read for everyone who asks'
          ], correct:1,
          explanation:'Many serious students refuse to read for friends and family precisely to keep the confidentiality boundary structurally clean.' },

        { q:'When should an ethical diviner refuse to give a reading?',
          choices:[
            'Never; refusing is rude',
            'Only when the diviner is in a bad mood',
            'When the client wants confirmation rather than truth, when the question is about another adult\'s hidden behavior, when the client is in acute crisis (needs professional help, not divination), or when the diviner is impaired',
            'Only on certain days of the week'
          ], correct:2,
          explanation:'The diviner who knows when not to cast is more trustworthy than the one who casts in every situation.' },

        { q:'What is "everyday divination" in the African house?',
          choices:[
            'Daily formal cowrie casting',
            'The practice of reading unbidden signs the universe sends — animal messengers, repetitions, recurring dreams, "exactly the right thing said by the wrong person" — without using tools',
            'Asking yes-or-no questions of friends',
            'Reading horoscopes'
          ], correct:1,
          explanation:'The deepest divination happens between formal casts. Many elders become so fluent in daily omens that the universe answers before the cowries can be reached for.' }
      ]
    }
  },

  // ─── END-OF-MODULE EXAM (12 Q, ≥80% to certify) ──────────────
  exam: {
    title:'Module IV — Divination — Final Examination',
    passing: 80,
    questions: [
      { q:'What does the tradition mean when it says "divination is structured listening"?',
        choices:[
          'It is unstructured spiritual chatter',
          'It uses structured randomness (cast of cowries, palm nuts, chain) to convert the universe\'s ambient speech into discrete answers to specific questions, read against accumulated wisdom',
          'It is fortune-telling for entertainment',
          'It is identical to Western tarot'
        ], correct:1 },

      { q:'Why is divination central to Yoruba spiritual life specifically?',
        choices:[
          'It is the only spiritual practice they have',
          'Yoruba culture is organized around the question of destiny (Ori); divination is the practical instrument of Ori work — stepping outside ordinary thinking to hear what the deeper script is',
          'It generates revenue for priests',
          'It is a colonial import'
        ], correct:1 },

      { q:'Who is Orunmila, and what is his unique authority?',
        choices:[
          'A king who was deified',
          'The orisha of wisdom and language; the witness present at every soul\'s choosing of its Ori — the only orisha with authority to remind you of what you came here to do',
          'The orisha of iron',
          'The orisha of the ocean'
        ], correct:1 },

      { q:'What are the three levels of divinatory practice the tradition distinguishes?',
        choices:[
          'Beginner, intermediate, advanced',
          'Everyday omens (no tools, available to all), tool-based personal divination (obi, dilogún — for instructed lay practitioners), and formal Ifa divination (only by trained Babalawo/Iyanifa)',
          'Free, paid, expensive',
          'Solo, group, public'
        ], correct:1 },

      { q:'What is obi divination?',
        choices:[
          'A modern Western tarot adaptation',
          'The simplest, oldest, most accessible African divination — four pieces of kola nut (or coconut in the diaspora), cast onto white cloth, yielding 5 possible patterns (Alaafia, Etawa, Eyeife, Okanran, Oyeku)',
          'A dance ritual',
          'A way to communicate with ancestors only'
        ], correct:1 },

      { q:'What makes a question castable for obi?',
        choices:[
          'It must be open-ended and philosophical',
          'It must be binary (genuinely yes-or-no), actionable (changes what you would do), specific (one decision/person/circumstance), and weighty (actually matters)',
          'It must be about money',
          'It must be answerable in under one second'
        ], correct:1 },

      { q:'Why does this curriculum NOT teach you to read the 16 Odu of Ifa?',
        choices:[
          'Because the system is secret',
          'Because reading Ifa requires a 7+-year Babalawo/Iyanifa apprenticeship memorizing hundreds of verses per Odu — pretending to do so after a single course is the kind of disrespect that makes elders close the door to the diaspora',
          'Because the Odu are too simple',
          'Because they no longer exist'
        ], correct:1 },

      { q:'What is the technical structure of a single Odu?',
        choices:[
          'A random number',
          'A column of four binary marks (each single or double), giving 2⁴ = 16 possible patterns — paired between two arms of the opele to yield 256 compound Odu',
          'A poem of fixed length',
          'A geometric shape'
        ], correct:1 },

      { q:'What are "Meji" Odu and why are they significant?',
        choices:[
          'Foreign Odu',
          'When both arms of the cast produce the same Odu — the 16 Meji are considered the most senior, deepest, most authoritative; when one comes up, the diviner sits straighter',
          'Odu used only for women',
          'Practice Odu for beginners'
        ], correct:1 },

      { q:'Which of these is a sign of an ILLEGITIMATE diviner?',
        choices:[
          'Asks about the client\'s lineage',
          'Has trained for many years under a recognized teacher',
          'Charges exorbitantly, advertises specific outcomes (e.g., "find love in 30 days"), claims to remove curses for large fees, and makes the reading transactional',
          'Refuses some readings'
        ], correct:2 },

      { q:'Why might a serious student of the tradition refuse to read obi for close friends and family?',
        choices:[
          'Because friends are not worthy',
          'To preserve confidentiality structurally — relational entanglements make perfect confidentiality nearly impossible; sending loved ones to an outside practitioner keeps the sacred boundary clean',
          'Because friends never pay',
          'Because the cowries don\'t work for relatives'
        ], correct:1 },

      { q:'What is the upper development of divinatory skill, according to the elders?',
        choices:[
          'Casting cowries every day',
          'Becoming so fluent in everyday omens — animal messengers, repetitions, recurring dreams, the right thing said by the wrong person — that the universe answers questions before the cowries can be reached for',
          'Memorizing all 256 Odu in a year',
          'Owning expensive tools'
        ], correct:1 }
    ]
  }
};
