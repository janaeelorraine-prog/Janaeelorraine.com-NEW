// ──────────────────────────────────────────────────────────
// FOUNDATIONS OF AFRICANA SPIRITUAL TRADITIONS — Course Data
// ──────────────────────────────────────────────────────────
window.COURSE = {
  id: 'foundations',
  title: 'Foundations of Africana Spiritual Traditions',
  subtitle: 'A comprehensive journey through indigenous African spiritual systems',
  modules: [
    {
      id: 'cosmology',
      num: 'I',
      name: 'Cosmology',
      tag: 'The Map of Worlds',
      glyph: '☉',
      angle: 0,
      color: '#f5d678',
      theme: 'starmap',
      lessons: window.MODULE_1_LESSONS,
    },
    {
      id: 'ancestry',
      num: 'II',
      name: 'Ancestral Veneration',
      tag: 'The Bridge of Bones',
      glyph: '⚱',
      angle: 45,
      color: '#c9a84c',
      altar: true,
      theme: 'altar',
      lessons: window.MODULE_2_LESSONS,
    },
    {
      id: 'orisha',
      num: 'III',
      name: 'Orisha & Spirit Systems',
      tag: 'The Many Faces of the Divine',
      glyph: '◈',
      angle: 90,
      color: '#e08fb8',
      theme: 'orishaWaters',
      lessons: window.MODULE_3_LESSONS
    },
    {
      id: 'divination',
      num: 'IV',
      name: 'Divination',
      tag: 'Listening to the Bones',
      glyph: '◉',
      angle: 135,
      color: '#a87cd9',
      theme: 'cowrieMat',
      lessons: window.MODULE_4_LESSONS
    },
    {
      id: 'ritual',
      num: 'V',
      name: 'Ritual & Ceremony',
      tag: 'The Sacred Made Body',
      glyph: '✦',
      angle: 180,
      color: '#d97a7a',
      theme: 'ritualFire',
      lessons: window.MODULE_5_LESSONS
    },
    {
      id: 'herbology',
      num: 'VI',
      name: 'Herbology',
      tag: 'The Green Tongue',
      glyph: '⚘',
      angle: 225,
      color: '#48b48c',
      theme: 'herbCabinet',
      lessons: [
        { id:'h1', name:'Plants Are Ancestors Too', time:'16 min', glyph:'⚘',
          prompt:'Which plant has loved you longest?',
          lead:'Rosemary remembers. Mint remembers. The cast iron skillet remembers what was cooked in it.',
          excerpt:'Every plant in your kitchen has a <strong>lineage older than your grandmother</strong>. Rosemary remembers. Mint remembers. The cast iron skillet remembers what was cooked in it. The Africana herbalist does not approach a plant as <em>material</em>. She approaches it as <strong>another elder in the room</strong>, with its own memory, its own preferences, and its own opinion about who should be allowed to use it.',
          pages: [
            `<p class="dropcap no-indent">There is a Yoruba teaching, attributed to Òṣanyìn, the Orisha of herbs and healing plants, that goes roughly: <em>"Every leaf is a verse. Every root is a sentence. The forest is a library, and only the patient become literate."</em> This single teaching reframes the entire Western relationship to plants. The herbalist of the Africana tradition does not "use" plants the way one uses a hammer. She <strong>consults</strong> them. She <strong>introduces herself</strong>. She <strong>asks permission</strong>. She <strong>thanks them when they help</strong>. The plants are not raw material. <em>They are participants.</em></p>
             <p>This is not, despite what skeptics often assume, a quaint poetic posture. It is a <strong>rigorous methodology</strong>. The herbalist who treats plants as inert ingredients gets results that are inert. The herbalist who treats plants as living elders, with whom relationship must be built, gets results that the inert practitioner cannot reproduce. <em>The difference is real. It is also, in our tradition, a matter of respect that the elders take very seriously.</em></p>
             <div class="bk-quote">"Every leaf is a verse. The forest is a library. Only the patient become literate."</div>`,

            `<h3>The Three-Part Theology of Plants</h3>
             <p class="no-indent">In nearly every Africana cosmology, plants occupy a particular spiritual category — neither fully <em>human-like</em> (the way ancestors are) nor fully <em>elemental</em> (the way the rivers and fires are). They are something in between: <strong>conscious, communicative, and lineaged, but operating at a different rhythm than animal beings</strong>. The traditional herbalist understands plants according to three intertwined truths:</p>
             <p><strong>1. Each plant has a spirit-being attached to it.</strong> In Yoruba, this is sometimes called the plant's <em>ẹbọra</em> or simply its <em>spirit</em>. In Vodou, certain plants are directly attached to specific Lwa. In Hoodoo and Nkisi-derived traditions, herbs are often described as having "personalities" — rosemary is <em>one kind of grandmother</em>, while basil is <em>another kind of woman entirely</em>. These spirits can be addressed, thanked, asked for assistance.</p>
             <p><strong>2. Each plant carries lineage memory.</strong> Plants remember the soil they were grown in, the hands that picked them, the prayers (or lack of prayers) said over them. This is why the Africana herbalist greatly prefers herbs grown by someone she trusts, or by herself, over commercial herbs whose lineage is unknown. A rosemary plant on your windowsill that you have watered for two years carries, by tradition, <em>more spiritual potency than a fresh-cut sprig from a grocery store</em>, because the relationship has been built.</p>
             <p><strong>3. Each plant has tasks it specializes in.</strong> Just as Esu specializes in roads and Yemoja specializes in the ocean, each plant has its <em>particular work</em>. Rosemary specializes in memory, protection, and clearing. Basil specializes in attracting prosperity and sweetness. Sage specializes in cleansing. Bay specializes in victory and uncrossing. Hyssop specializes in deep purification. <em>You do not ask basil to do rosemary's work. The plant will not say no, but it will not work as well.</em></p>`,

            `<h3>How to Introduce Yourself to a Plant</h3>
             <p class="no-indent">Before using any new herb in significant working, the elders teach: <strong>introduce yourself</strong>. The introduction is brief, simple, and matters enormously to the relationship's quality.</p>
             <p>Hold the herb (whether fresh, dried, or in seed form) in your hands. Speak softly: <em>"[Plant name], I greet you. I am [your name], daughter/son of [your mother's name]. I have come to ask for your help with [the working]. If you are willing, I thank you. If you are not, I will find another. Either way, I respect you."</em></p>
             <p>That is the entire introduction. Some practitioners add a small offering — a few drops of water sprinkled on the herb, a brief moment of silence, a verse spoken from the tradition. The form varies. <em>The principle does not</em>: you have not used a plant until you have <strong>greeted it as a person who could refuse</strong>.</p>
             <p>Within a week of beginning this practice, you will notice something. <em>The plants begin to respond differently in your hands.</em> Their fragrance is more present. Their energy in baths and teas is more potent. The "personalities" of different herbs become distinguishable to you — you will start to feel that rosemary is a different kind of presence than basil. <strong>This is not imagination. This is literacy returning to the same body that always knew how to read the green tongue.</strong></p>
             <div class="bk-quote">"You have not used a plant until you have greeted it as a person who could refuse."</div>`,

            `<h3>The Ones Already in Your Kitchen</h3>
             <p class="no-indent">Begin with the plants you already know. The diaspora's herbal pharmacy is not exotic. The most-used herbs across nearly every Black grandmother's spiritual practice in the United States, Caribbean, and Latin America are common, accessible, and inexpensive:</p>
             <p><strong>Rosemary</strong> — memory, protection, clearing of grief. The grandmother of culinary herbs. Burns clean. Travels well in oil.</p>
             <p><strong>Basil</strong> — attracts sweetness, money, peace in the home. Especially associated with Òṣun. Plant a basil plant by the front door.</p>
             <p><strong>Sage</strong> (common garden sage, not the over-harvested white sage) — cleansing, banishing of low energies, ancestral honor. The white sage debate matters; use what your grandmother used or what grows in your region.</p>
             <p><strong>Bay leaf</strong> — victory, uncrossing, divinatory. Write a wish on a bay leaf and burn it.</p>
             <p><strong>Mint</strong> — cooling, clearing the head, easing arguments. Add to floor washes when there is tension in the home.</p>
             <p><strong>Hyssop</strong> — deep cleansing, biblical association ("purge me with hyssop, and I shall be clean"). Strong. Use carefully.</p>
             <p><strong>Lavender</strong> — peace, sleep, gentle protection. Children's altars often include lavender.</p>
             <p><strong>Rose petals</strong> — love, sweetness, Òṣun, ancestral honor (especially for women ancestors). Save the petals from received flowers.</p>
             <p>This list alone, used with care over time, will support 90% of foundational Africana herbal practice. <em>You do not need imports. You need attention.</em></p>`,

            `<h3>Florida Water — A Diasporic Treasure</h3>
             <p class="no-indent">No herbology lesson would be complete without honoring Florida Water — the cologne-strength herbal water sold in green bottles at every botanica from Havana to Brooklyn for under five dollars. Florida Water is a citrus-and-herb blend with origins in 19th-century American perfumery, but it was <em>adopted, adapted, and elevated</em> by the diasporic spiritual traditions until it became, today, a near-universal tool of Africana practice. Vodou priests use it. Lucumí houses use it. Hoodoo workers use it. New Orleans Spiritual Baptists use it. <strong>It is the most democratic of holy waters.</strong></p>
             <p>Uses include: anointing the temples and back of the neck before any spiritual work; adding to baths for clearing; spritzing into corners of rooms to clear stagnant energy; adding to floor washes; cleaning altar surfaces; cooling fevers (it has actual antiseptic properties); refreshing the body during long ceremonies. It is <em>not</em> a perfume to be worn casually — its smell is, by design, recognizable to spirits as ceremonial.</p>
             <p>If you take only one item from this lesson into your practice this week, take Florida Water. <em>Three dollars at the corner store. Ten dollars worth of clarity.</em> Buy a bottle. Greet it. Use it sparingly and well.</p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Choose one plant — fresh or dried, whichever you have. Hold it in your hands. Greet it formally, using the introduction above. Place it on or near your altar for seven days, undisturbed. On the seventh day, speak to it again, thank it, and use it in one small working — sprinkle some leaves into a bath, brew it as a tea, or burn a tiny pinch as smoke. <strong>Notice the difference</strong> between this plant — the one you greeted, lived alongside for a week, and finally used — and any herb you have used casually before. The difference is the doorway. <em>This is how the green tongue is learned.</em></p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#6a3a14;">Next chapter: <em>Florida Water & Holy Smokes</em>.</p>`
          ]
        },
        { id:'h2', name:'Florida Water & Holy Smokes', time:'14 min', glyph:'⚱',
          prompt:'What smoke clears YOU?',
          lead:'Three dollars at the corner store. The most democratic of holy waters.',
          excerpt:'<strong>Florida Water</strong> is the most democratic of holy waters. Three dollars at the corner store. Ten dollars worth of clarity. Pair it with a few well-chosen smokes — copal, tobacco, mugwort, the diaspora\'s own particular incense traditions — and you have built, for under twenty dollars, a complete <em>atmospheric pharmacy</em> for the spiritual home.',
          pages: [
            `<p class="dropcap no-indent">There is a green-glass bottle that has appeared on more Black spiritual altars across the Americas than possibly any other single object: <em>Florida Water</em>. It is not African in origin — its 1808 formulation is American — but the African diaspora <em>adopted</em> it so thoroughly, integrated it so deeply into Vodou, Lucumí, Hoodoo, Spiritual Baptist, and Black Catholic practice, that today it is considered, alongside white candles and clear water, one of the <strong>foundational tools of diasporic spiritwork</strong>. Its rise is itself a teaching: the diaspora has always been pragmatic about adopting useful tools and consecrating them through use. <em>If something works, it gets folded in. The lineage is generous.</em></p>
             <p>Alongside Florida Water, the other major atmospheric tool is <strong>smoke</strong> — incense, dried herb burning, copal, frankincense, tobacco, the breath of burning plants that fills a room and carries prayer upward. Across nearly every Africana tradition, smoke is the messenger. <em>What the candle does for fire, the smoke does for air.</em> Together, water and smoke form the atmospheric pharmacy of the home.</p>
             <div class="bk-quote">"The candle is fire's prayer. The smoke is air's prayer. Together they keep the room alive."</div>`,

            `<h3>The Many Uses of Florida Water</h3>
             <p class="no-indent">Florida Water deserves a chapter of its own, because the breadth of its use is genuinely surprising to newcomers:</p>
             <p><strong>1. Anointing before spiritual work.</strong> Dab a few drops on the temples, the back of the neck, the inside of the wrists, and (in some traditions) the soles of the feet before any ritual. It both <em>cleanses you of street energy</em> and <em>announces you to the spirits as ceremonial</em>.</p>
             <p><strong>2. Cleansing altar surfaces.</strong> A few drops on a clean cloth, used to wipe down the altar surface weekly, keeps the space spiritually fresh. Do this when you change the altar water.</p>
             <p><strong>3. Spritzing rooms.</strong> A small spray bottle (some practitioners decant Florida Water into one for convenience) can be used to refresh a room after an argument, after a heavy visitor, or at the start of a new week. Three sprays in each corner. Speak: <em>"I clear what does not belong here. I welcome what does."</em></p>
             <p><strong>4. Adding to baths.</strong> A capful of Florida Water in a spiritual bath enhances clearing. Especially in cleansing baths after a hard week, after illness, or after the death of a loved one.</p>
             <p><strong>5. Cooling fevers and reviving the faint.</strong> Florida Water has actual antiseptic and astringent properties (it is, after all, a cologne). Patting some on the temples of someone overheated or mildly ill is a traditional comfort.</p>
             <p><strong>6. Adding to floor washes.</strong> A capful in a bucket of mop water, with a pinch of salt and a dash of ammonia, makes a traditional Hoodoo floor wash for clearing the home.</p>
             <p><strong>7. Cleansing tools.</strong> Wipe down candle holders, divination tools, and ritual implements with Florida Water between uses, especially after intense workings.</p>
             <p><strong>8. Speaking blessings.</strong> Some practitioners spritz a small amount over their own head before sleep, while speaking a blessing — <em>"I sleep under protection. I rise renewed."</em></p>`,

            `<h3>Cousins of Florida Water</h3>
             <p class="no-indent">In different parts of the diaspora, Florida Water has cousins and competitors, all serving similar functions:</p>
             <p><strong>Kananga Water.</strong> A floral cologne especially associated with Vodou and certain Lucumí lineages. Sweeter, more floral than Florida Water. Often used for ancestral and spirit-of-the-dead workings.</p>
             <p><strong>Agua de Florida (the Peruvian version).</strong> Slightly different formula, used heavily in Andean traditions but also adopted into some diasporic practice.</p>
             <p><strong>Bay Rum.</strong> An older Caribbean cologne, still used in Vodou and traditional Spiritual Baptist work. Particularly associated with male spirits and warrior workings.</p>
             <p><strong>Hoyt's Cologne.</strong> Another commercially-available cologne adopted in Hoodoo, often used in luck and gambling work. Less universal than Florida Water but well-respected.</p>
             <p>You do not need all of these. <em>Begin with Florida Water</em>. Add the others if your specific tradition or lineage uses them. <strong>Multiplying tools without depth of practice is not seriousness — it is shopping.</strong></p>
             <div class="bk-quote">"Multiplying tools without depth of practice is not seriousness — it is shopping."</div>`,

            `<h3>Holy Smokes — A Brief Survey</h3>
             <p class="no-indent">For burning herbs and incense, the diaspora draws on a wide pharmacopeia. The major ones to know:</p>
             <p><strong>Frankincense and Myrrh.</strong> Originally from East Africa and the Arabian peninsula, these resins have been used in African and Mediterranean spiritual practice for thousands of years. Frankincense for elevation, ancestral connection, and clearing. Myrrh for grief, healing, mortuary work. Both are sold inexpensively as resin tears that you burn on charcoal disks.</p>
             <p><strong>Copal.</strong> A resin from Mexico and Central America, adopted into many diasporic traditions for its strong, clean clearing properties. Especially used at the start of major ceremonies.</p>
             <p><strong>Tobacco.</strong> A genuinely sacred plant in many of the indigenous traditions of the Americas, and adopted carefully into Africana traditions of the New World, especially Vodou and certain Hoodoo lineages. Tobacco smoke is offered to spirits — never frivolously. <em>Always with respect to the indigenous origins of the practice.</em></p>
             <p><strong>Garden Sage.</strong> Common, garden-variety sage (<em>Salvia officinalis</em>) — not the over-harvested and sacred-to-Indigenous-North-Americans white sage (<em>Salvia apiana</em>). Use what your grandmother used. Use what grows where you live. <strong>Ethical sourcing matters; do not contribute to the depletion of plants sacred to traditions you are not part of.</strong></p>
             <p><strong>Mugwort.</strong> A European-origin herb adopted into some Hoodoo and Spiritual Baptist work for dreams and divination. Burns thick and dreamy.</p>
             <p><strong>Rosemary, Bay, and Cedar.</strong> Common kitchen herbs that burn beautifully and serve foundational clearing and protection work. The grandmothers used these long before the boutique-incense market existed. <em>You can too.</em></p>`,

            `<h3>How to Use Smoke Properly</h3>
             <p class="no-indent">A few principles drawn from across the traditions:</p>
             <p><strong>1. Less is more.</strong> A small amount of well-chosen smoke is more effective than clouds of it. The smoke is a messenger, not a medication.</p>
             <p><strong>2. Direct it intentionally.</strong> Smoke does not drift aimlessly. With a hand or a feather, direct the smoke <em>to specific places</em> — the corners of the room, your own head and chest, doorways, the altar, the place where the unease lives.</p>
             <p><strong>3. Speak while you smoke.</strong> Silent smudging is half a working. Name what you are clearing, what you are inviting, who you are honoring. The words are part of the prayer.</p>
             <p><strong>4. Open a window.</strong> Smoke must <em>leave</em>. If it cannot leave, the working stalls. After a clearing, open a window or door for several minutes to let what was cleared exit the building.</p>
             <p><strong>5. Cleanse the tools.</strong> Wipe down your incense burner or shell with Florida Water between uses. <em>Tools accumulate.</em></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Buy one bottle of Florida Water (any botanica, many corner stores in Black neighborhoods, online for around $4). Use it daily this week — anointing your temples each morning, spritzing your altar weekly, adding a capful to your evening bath if you take one. By Friday, you will have begun to feel the difference between a Florida-Water-anointed day and an ordinary one. <strong>It is not subtle. It is the smell of being announced as ceremonial in a world that mostly doesn't notice.</strong></p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#6a3a14;">Next chapter: <em>Bath Herbs of the South</em>.</p>`
          ]
        },
        { id:'h3', name:'Bath Herbs of the South', time:'18 min', glyph:'☥',
          prompt:'What bath would your great-grandmother run for you?',
          lead:'Hyssop for cleansing. Rosemary for memory. Bay for victory. The pantry as the pharmacy.',
          excerpt:'<strong>Hyssop</strong> for cleansing. <strong>Rosemary</strong> for memory. <strong>Bay leaf</strong> for victory. <strong>Sage</strong> for clearing. The pantry as the pharmacy. The Black women of the American South — and their cousins in the Caribbean and Latin America — built a complete spiritual herbal pharmacy out of what was already in the kitchen. <em>This was not poverty improvising.</em> This was wisdom <strong>refusing to be sold a problem to solve a problem we already had the answer to.</strong>',
          pages: [
            `<p class="dropcap no-indent">My great-grandmother lived in rural Louisiana and never owned a single jar with a label that said "spiritual herb." She did, however, run baths for grandchildren, neighbors, and on memorable occasions for her own mother — baths that, even decades later, the recipients describe with a particular reverence: <em>"After Big Mama's bath you slept different. You were different in the morning."</em> What she used: things that grew in the yard. Things that came in spice tins from the grocery store. Things she dried on her windowsill in the summer for use throughout the year. <em>Nothing imported. Nothing fancy. Nothing that would have raised an eyebrow at any Southern dinner table.</em></p>
             <p>This is the genius of Southern Black herbal practice — and by extension, of the wider diaspora's "kitchen pharmacy." It is built almost entirely on <strong>what was available, year-round, to a poor woman in a hot climate</strong>. The plants chosen had to be cheap or free, easy to grow or buy, multipurpose (often serving culinary, medicinal, and spiritual purposes simultaneously), and forgiving of being misidentified or substituted. <em>This pragmatism is not a compromise. It is a methodology, and it works.</em></p>
             <div class="bk-quote">"Nothing imported. Nothing fancy. Nothing that would have raised an eyebrow at any Southern dinner table."</div>`,

            `<h3>The Foundational Five</h3>
             <p class="no-indent">If you build out only five spiritual herbs in your home pharmacy, the diaspora's near-universal vote is:</p>
             <p><strong>1. Rosemary.</strong> The first among equals. Rosemary clears, protects, supports memory, eases grief, and burns beautifully. Add to nearly any cleansing bath. Make a tea for clarity. Plant a rosemary bush at your front door if you have one — it is one of the most ancient protective plants in nearly every Mediterranean and African tradition that crossed into the Americas. <em>Hard to overuse. Easy to grow. Forgiving of the new practitioner.</em></p>
             <p><strong>2. Hyssop.</strong> Mentioned in Psalm 51 (<em>"purge me with hyssop, and I shall be clean"</em>), and used heavily in Black Christian and Hoodoo bath work for that exact biblical reason. Hyssop is a <em>strong</em> cleanser — appropriate for serious clearing baths, for spiritual baths after illness, for situations where the practitioner feels deeply contaminated by an environment or person. Use sparingly; a little goes far.</p>
             <p><strong>3. Bay Leaf.</strong> Victory, uncrossing, divination. Write a wish on a bay leaf with a pen and burn it for a small ritual of release-into-the-cosmos. Add a few leaves to baths when you need to overcome a specific obstacle. Bay leaves crackle when they burn — and the crackle, in some Hoodoo lineages, is read as the working speaking.</p>
             <p><strong>4. Garden Sage.</strong> (Common <em>Salvia officinalis</em>, the cooking sage. Not white sage. Please not white sage unless your specific lineage uses it.) Sage clears, banishes, and honors elders. Burn dried sage leaves loose on a charcoal or simply in a heatproof bowl. Use sparingly in baths because the smell is strong.</p>
             <p><strong>5. Mint.</strong> Often overlooked. Mint cools the head, clears tension in arguments, and supports peaceful sleep. Add fresh or dried mint to baths when stress is the primary problem. Plant mint outside if you have garden space (it spreads enthusiastically — let it).</p>`,

            `<h3>The Next Tier — Five More to Add Over Time</h3>
             <p class="no-indent">Once the foundational five are part of your practice, expand to:</p>
             <p><strong>6. Lavender.</strong> Peace, gentle protection, sleep. Especially appropriate for children's altars and for bath work after grief or trauma. The smell itself does spiritual work.</p>
             <p><strong>7. Rose petals.</strong> Save the petals from received bouquets. Dry them. Use in love and self-love baths, ancestral honor (especially for women ancestors), and Òṣun workings. <em>Roses received as a gift carry stronger spiritual weight than purchased roses.</em></p>
             <p><strong>8. Eucalyptus.</strong> Strong respiratory clearing — both physical and spiritual. Add to clearing baths when there is a feeling of "stuck-ness" in the chest or throat. Especially appropriate during illness recovery.</p>
             <p><strong>9. Basil.</strong> Sweetening, money-drawing, peace in the home. Plant a basil plant by the front door for ongoing protection and prosperity. The grandmothers of Italy and the grandmothers of the Caribbean agreed on this one — basil at the threshold.</p>
             <p><strong>10. Cinnamon.</strong> Heat, attraction, money, sweetening. A small amount of cinnamon in a drawing bath increases its potency. Cinnamon also pairs well with bay leaves in workings related to overcoming.</p>
             <div class="bk-quote">"Ten plants. A pharmacy. The grandmothers needed nothing more."</div>`,

            `<h3>Bath Recipes from the Tradition</h3>
             <p class="no-indent">A few simple, time-tested recipes:</p>
             <p><strong>The Sunday Reset Bath</strong> (cleansing). One handful fresh rosemary, three bay leaves, a small handful of mint. Steep in 4 cups boiling water for 30 minutes. Strain. Add to a regular bath. Pour the strained liquid over your head three times before fully entering. Let the bath drain while you are still in it. <em>For weekly clearing of the residue of the work-week.</em></p>
             <p><strong>The Grief Bath</strong> (gentle clearing for sorrow). Lavender, rose petals, a small piece of myrrh resin (optional). Steep in warm — not boiling — water for 30 minutes. Strain. Add to bath. Speak the name of what is grieving you. Sit in the water until it cools. <em>This bath is for after a loss, an ending, a heartbreak. It does not "fix." It companions.</em></p>
             <p><strong>The Uncrossing Bath</strong> (heavier clearing). Hyssop, rue (if you can find it), garden sage, a pinch of salt. Steep in 4 cups boiling water for 45 minutes. Strain. Pour over the head as you stand in the tub. Pour from head downward, letting the water rinse downward toward the drain. Speak: <em>"I release what does not belong to me. I return what was sent. I keep what is mine."</em> Drain the tub while still inside. <em>This bath is for serious clearing — after a hostile encounter, when something feels wrongly attached.</em></p>
             <p><strong>The Sweetening Bath</strong> (drawing love and peace). Rose petals, a generous handful of basil, a tablespoon of honey, a few drops of milk. Steep in warm water 30 minutes. Strain. Pour upward — from feet toward heart — speaking what you are inviting. <em>This bath draws sweetness into the body. Save a small bottle for daily anointing if you wish.</em></p>
             <p><strong>The Self-Love Bath</strong> (ongoing). Rosemary for memory of who you are. Rose petals for tenderness. Lavender for gentleness. Done weekly, especially during seasons of self-doubt or external criticism. <em>This is one of the most underrated baths the tradition offers.</em></p>`,

            `<h3>A Note on Sourcing</h3>
             <p class="no-indent">Wherever possible, get your herbs from sources you trust. <strong>Best:</strong> grow your own. <strong>Next best:</strong> farmer's markets, local herb shops, neighbors with abundant gardens. <strong>Acceptable:</strong> grocery store fresh herbs, dried herbs in the spice aisle. <strong>Last resort:</strong> commercially-packaged "spiritual herbs" sold at high markup online. <em>The herbs at your grocery store are the same herbs your great-grandmother used.</em> The packaging is the only thing that has changed.</p>
             <p>And one ethical note, because it matters: do not buy white sage. The plant (<em>Salvia apiana</em>) is sacred to Indigenous Californian tribes, has been over-harvested to near-collapse, and is not part of the African or African-diasporic herbal tradition. Use garden sage instead. Garden sage is what the diaspora always used. <strong>Authenticity does not require borrowing from a different tradition's ecological crisis.</strong></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Take one prepared spiritual bath this week using only herbs from your kitchen or local grocery store. Choose the recipe that fits what your week most needs. Prepare slowly. Sit fully in the water. <strong>Notice what you remember from your great-grandmother that you did not know you remembered.</strong> Sometimes a bath unlocks memories the body had been holding for decades.</p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#6a3a14;">Next chapter: <em>Simples for the Spirit</em>.</p>`
          ]
        },
        { id:'h4', name:'Simples for the Spirit', time:'15 min', glyph:'⚘',
          prompt:'What is the simplest medicine you keep forgetting?',
          lead:'One herb. One purpose. One prayer. The grandmothers needed nothing more.',
          excerpt:'A <em>simple</em> is one herb, one purpose, one prayer. The ancestors did not need eight ingredients. They needed <strong>conviction</strong>. The complicated recipe with twelve rare botanicals is often a sign of insecurity — the practitioner adding more and more ingredients in hopes one of them does the work that <em>belief</em> would have done with a single sprig of the right plant. The masters of this tradition could heal with one leaf. The work, then, is to <em>become the kind of practitioner whose single leaf is enough</em>.',
          pages: [
            `<p class="dropcap no-indent">There is a term in old British and American herbal medicine called <em>simpling</em> — the practice of healing with a <em>single herb</em>, one plant per condition, no blends, no compounds, no proprietary mixtures. The "simple" was rosemary tea for grief. Or chamomile for fevered children. Or willow bark for headache. One plant. One purpose. The herbalist who could heal with simples was considered the most accomplished — because anyone can throw twelve ingredients into a pot and hope. Only the practitioner who has built deep relationship with a single plant can <em>do that plant's work without needing backup</em>.</p>
             <p>The Africana tradition has its own version of this principle, though usually unnamed. The grandmothers who could quiet a colicky baby with one leaf of mint, soothe a bereaved daughter with one cup of rosemary tea, ease an angry husband with one sprig of basil under his pillow — these were the masters. <em>They did not need the elaborate setup.</em> They had so deeply known the plant for so long, that the plant <strong>worked through them</strong> with a precision the more performative practitioner could only envy.</p>
             <div class="bk-quote">"The masters could heal with one leaf. The work is to become the practitioner whose single leaf is enough."</div>`,

            `<h3>Why Simples Matter for the Returning Practitioner</h3>
             <p class="no-indent">Two reasons, both important.</p>
             <p><strong>First, simples train the relationship.</strong> If you use ten herbs in every working, you never develop deep familiarity with any one of them. Each one is a stranger. Their personalities blur together. You cannot tell, when the working succeeds, which herb did the heavy lifting. You cannot tell, when it fails, which one let you down. Simples force depth: <em>you and this one plant, working together, accountable to each other</em>. After a year of working primarily with rosemary, you will know rosemary in a way no recipe-book reading can teach.</p>
             <p><strong>Second, simples train your trust.</strong> The compulsion to add more ingredients to any working is, in most cases, a fear-response. <em>"What if rosemary alone isn't enough? Better add bay leaf. And hyssop. And a pinch of salt. And — "</em> The accumulation of ingredients is the practitioner trying to insure against the working not working. But the elders teach: <strong>the working works because you commit, not because of how many things you put in the pot</strong>. A single herb fully committed to outperforms a complicated recipe half-believed.</p>`,

            `<h3>The Five Simples Every Practitioner Should Know</h3>
             <p class="no-indent">Begin with these five. Spend a year, if you can, deepening into each. The learning will compound.</p>
             <p><strong>1. The Rosemary Simple — for clearing and remembering.</strong> Brew a cup of rosemary tea. Sit at the altar. Sip slowly while speaking the names of three ancestors. Repeat weekly for a season. Within months, rosemary alone will be sufficient for most ancestral honor work, most grief work, most basic clearing. <em>You will not need anything else. You will know.</em></p>
             <p><strong>2. The Mint Simple — for cooling and clarity.</strong> A small bunch of fresh mint, crushed lightly, added to a glass of cool water. Drink while writing in a journal, speaking honestly to yourself. Mint cools the over-heated mind. Use it whenever decisions feel emotionally hot. <em>The cooling is real and it is fast.</em></p>
             <p><strong>3. The Bay Leaf Simple — for crossing thresholds.</strong> Write a single short wish or release on a dried bay leaf with a pen. Burn the leaf in a heatproof bowl. Watch it crackle. Speak the wish or release aloud as it burns. The whole working takes three minutes. <em>It is shockingly effective for small but real transitions.</em></p>
             <p><strong>4. The Lavender Simple — for peace and gentle sleep.</strong> A small sachet of dried lavender placed under the pillow. Or a few drops of lavender water sprinkled on the bedsheet. Or a cup of lavender tea (mild) before bed. <em>Use during weeks of accumulated stress. The body remembers how to rest.</em></p>
             <p><strong>5. The Rose Simple — for self-tenderness and ancestral mothers.</strong> A small bowl of rose petals on the altar. A spoonful of rose water added to a daily anointing. Roses for the women ancestors — placed at the altar weekly with their names spoken. <em>The most underrated simple in our tradition. It is the medicine many of us most need.</em></p>
             <div class="bk-quote">"After a year of working with one plant, you will know it in a way no recipe-book reading can teach."</div>`,

            `<h3>How to Practice a Simple — The Year-Long Friendship</h3>
             <p class="no-indent">Choose one of the five above. Just one. Commit to working with this single plant for an entire year. Each week, do at least one small working with it: a tea, a bath addition, an offering at the altar, a leaf burned with a prayer. Keep a small journal. Note what the plant seemed to do, what it did not do, what surprised you, what felt deepening.</p>
             <p>By month three, you will know the plant's preferences — what time of day it works best, what it pairs with even when used as a simple, what kind of working it refuses. By month six, the plant will begin to come to you in dreams or in waking awareness — you will think of it before you reach for it. By month nine, you will be able to feel a person's need-state and know whether <em>your simple</em> is the right answer or whether someone else's is. By month twelve, you will have <strong>one plant you know like you know a sister</strong>. That is the relationship the elders meant.</p>`,

            `<h3>When Simples Are Not Enough</h3>
             <p class="no-indent">Two honest cautions. <strong>First:</strong> some workings genuinely benefit from multiple herbs working together — bath recipes, complex spell work, certain initiated rites. The "all simples, all the time" rule is for the foundational years of practice, not a permanent law. As you grow, you will use blends. The discipline of simples teaches you <em>when</em> to blend (because you have learned what each ingredient brings) versus when to stay single (because the working asks for it).</p>
             <p><strong>Second:</strong> spiritual herbs are not medical treatment. If something is wrong with the body, see a doctor as well as practicing the spiritual side. The grandmothers did this — they used both the herb and the doctor's tonic. They did not pit them against each other. <em>Wisdom uses everything available.</em></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Choose ONE plant from the five simples above. Just one. Work with that plant — and only that plant — every day this week. A morning tea. A leaf at the altar. A pinch in your bath. A few drops of its oil on your wrists. Whatever speaks to you. <strong>By Friday, write a single paragraph in your journal: what does this plant feel like to you now, after one week of every-day relationship?</strong> The answer will be more specific, more grounded, and more useful than any recipe-book description ever could be. <em>That is the green tongue beginning to translate.</em></p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#6a3a14;">Next chapter: <em>Garden as Altar</em>.</p>`
          ]
        },
        { id:'h5', name:'Garden as Altar', time:'12 min', glyph:'◈',
          prompt:'What would you plant if it were also a prayer?',
          lead:'Your garden is an altar where the prayers grow back as food.',
          excerpt:'Your garden is an altar where the prayers grow back as food. Whether the garden is a five-acre plot, a window-box of basil, or a single rosemary plant in a kitchen pot — when you plant with intention, water with gratitude, and harvest with thanksgiving, you are participating in <strong>the oldest spiritual technology our people ever developed</strong>: the technology of <em>cooperating with the green world to grow what feeds both body and spirit at once</em>.',
          pages: [
            `<p class="dropcap no-indent">There is a continuity older than any of our names that the diaspora never fully lost: <em>the relationship between Black hands and growing things</em>. We were brought to the Americas, in horrifying numbers, precisely because of our agricultural skill. The very Atlantic crossing that traumatized our people happened, in part, because we knew how to grow. The colonizers needed the labor and they needed the knowledge. <strong>The knowledge survived.</strong> In the cotton field. In the rice paddy of South Carolina that a Geechee/Gullah woman flooded just like her mother did in West Africa. In the back garden of every plantation cabin where the enslaved grew, in addition to what the master forced them to grow, the okra, the watermelon, the sorrel, the tomato, the peppers, the herbs that were <em>theirs</em>. The kitchen garden was the altar. <em>It still is.</em></p>
             <p>This last lesson of the herbology module is not about a bath or a smoke or a spell. It is about reconnecting to the green continuity itself — the recognition that <strong>plants grown in your hands carry a spiritual weight that purchased plants cannot replicate</strong>. The relationship is the working. Whether your garden is twenty acres or a single basil plant on a fire escape, the same principle applies: <em>that plant is yours, you are its, and what passes between you is sacred</em>.</p>
             <div class="bk-quote">"That plant is yours. You are its. What passes between you is sacred."</div>`,

            `<h3>The Ancestral Knowledge We Did Not Lose</h3>
             <p class="no-indent">A short tour of what the diaspora carried, in soil-darkened hands, across the Atlantic:</p>
             <p><strong>The technique of seed-saving in cloth and hair.</strong> Captive women, knowing they were being torn from their land, sometimes braided rice seeds into their hair before boarding the ships. Some seeds survived. The rice industry of South Carolina was <em>built on West African seed varieties and West African flooding techniques</em>. This is not metaphor; it is documented history.</p>
             <p><strong>The companion-planting wisdom.</strong> Three Sisters planting (corn, beans, squash) is often credited solely to Indigenous American traditions — and rightfully so — but West African farmers had their own deep traditions of intercropping that paralleled and reinforced these methods after contact in the New World. The okra patch always had peppers nearby. The sweet potato hill always had black-eyed peas at its base. <em>The plants were known to be more productive in particular relationships.</em></p>
             <p><strong>The sacred plants of healing and cooking, smuggled in.</strong> Black-eyed peas. Sorghum. Watermelon. Okra. Sesame (called "benne" in Geechee Gullah country, the African name barely changed). Yams (the African yam, distinct from the New World sweet potato). Each of these crossed the Atlantic with the captives. <em>Each is now a staple of African American foodways.</em> The plants that fed our ancestors in West Africa fed them again in the diaspora — because the seeds, somehow, came too.</p>`,

            `<h3>Building Your Own Garden Altar</h3>
             <p class="no-indent">You do not need land. You do not need a green thumb. You do not need to be "good at plants." All of these self-doubts will pass, with practice. What you need is <em>willingness to be in relationship with one growing thing</em>.</p>
             <p><strong>Start with one plant.</strong> A potted basil. A rosemary in a window box. A single mint plant on a fire escape. Whichever plant you have most affection for, or whichever was most central in the previous lessons. <em>One plant is more than enough.</em></p>
             <p><strong>Pot it with intention.</strong> When you plant or transplant, hold the soil in your hands for a moment. Speak: <em>"I plant this with my hands. May what grows from these hands be medicine. May what passes between me and this plant be honest."</em> Press the seed or the root down into the soil. <em>This single moment of intention does much of the work.</em></p>
             <p><strong>Water it as a prayer.</strong> Each watering, however brief, is a small libation. Speak to the plant as you water — even a sentence. <em>"Good morning."</em> <em>"I'm grateful you're here."</em> <em>"Help me through this week."</em> Plants respond to being addressed. This is not folk-belief; modern plant science increasingly supports it.</p>
             <p><strong>Harvest with gratitude.</strong> When you take a leaf, a sprig, a flower for use, never take silently. Speak: <em>"Thank you for this. I will use it well."</em> Take only what you need. Leave the plant whole enough to keep growing.</p>
             <div class="bk-quote">"You do not need land. You need willingness to be in relationship with one growing thing."</div>`,

            `<h3>The Prayer-Plants — What to Grow First</h3>
             <p class="no-indent">If you are choosing what to grow as your first garden-altar, here are the plants the elders most consistently recommend:</p>
             <p><strong>Basil</strong> — easy, fragrant, multi-use. By the front door if you have one. The plant of welcome and prosperity.</p>
             <p><strong>Rosemary</strong> — hardy, beautiful, nearly indestructible once established. The plant of memory and protection. <em>Lives for years if cared for.</em></p>
             <p><strong>Mint</strong> — almost impossible to kill. Spreads enthusiastically; in fact, plant it in a contained pot or it will take over a yard. The plant of cooling and clarity.</p>
             <p><strong>Lavender</strong> — slightly more demanding but worth it. The plant of peace and grief.</p>
             <p><strong>An herb your grandmother used.</strong> Whatever it was. Even if you don't fully remember why. Plant it. The plant remembers what your grandmother told it. <em>Grow what your line grew, even if you don't yet know the reason.</em></p>`,

            `<h3>The Garden as Spiritual Practice</h3>
             <p class="no-indent">When you tend a plant for a year — water it, talk to it, harvest from it, struggle with its bugs and its dormancies — you have undertaken a spiritual practice as profound as any meditation. The plant teaches patience, attention, the acceptance that some seasons grow and others do not, the experience of caring for a being whose timeline is different from yours, the recovery of the somatic sense that <em>you are part of something green and old</em>. The grandmothers knew this. The plantation Black gardener knew this. The Geechee rice woman knew this. <em>You can know it too. The plants are eager teachers.</em></p>
             <p>The garden also extends your ancestral altar in a particular way. The plant, having been grown by your hands, carries a portion of <em>your</em> spiritual signature. When you use that plant in working — bath, tea, smoke, offering — the working has a coherence that purchased herbs cannot fully match. The plant knows you. You know the plant. <strong>Together, you make medicine that is yours.</strong></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Acquire one plant — a starter from a garden center, a cutting from a friend's plant, a seed packet, anything. Pot it with intention as described above. Place it where you will see it daily. Water it. Speak to it. <em>Begin the relationship.</em> By next month, you will have begun the oldest practice your line knew. By next year, you will have your first true garden-grown medicine. By the year after that, you will be teaching someone else how to begin.</p>
             <p class="no-indent" style="margin-top:32px;text-align:center;font-style:italic;color:#6a3a14;">Module VI complete. The final module — <em>The Diaspora</em> — names the inheritance.</p>`
          ]
        }
      ]
    },
    {
      id: 'diaspora',
      num: 'VII',
      name: 'The Diaspora',
      tag: 'How We Carried It Across Water',
      glyph: '⏣',
      angle: 270,
      color: '#7ec0e8',
      theme: 'diasporaWater',
      lessons: [
        { id:'p1', name:'The Atlantic & The Veil', time:'18 min', glyph:'⏣',
          prompt:'What did your line have to forget to survive?',
          lead:'The Middle Passage tore the veil — but it could not cut the cord.',
          excerpt:'The Middle Passage tore the veil — but it could not cut the cord. Some of what you were never taught, <strong>you still know</strong>. The Atlantic carried twelve million bodies and an unknowable weight of memory across its salt. What survived survived because <em>our people refused, against all instruction, to forget</em>.',
          pages: [
            `<p class="dropcap no-indent">There is a number we must sit with, briefly, before we can speak honestly about anything else in this module: <strong>twelve million</strong>. That is the conservative estimate of the African captives carried across the Atlantic between roughly 1500 and the late 1800s. <em>Twelve million human beings.</em> Two million more died in the holds of the ships before reaching the New World — buried in the salt, returned to Yemoja's keeping in a way none of them chose. The number is so large it slides off the human mind. The mind protects itself from it. <strong>The body, however, remembers.</strong> The body of the descendant remembers what the conscious mind cannot hold.</p>
             <p>This is the foundational fact of any honest discussion of Africana spirituality in the diaspora: <em>we are working from a wound</em>. Not a wound in the sense of pathology, but a wound in the older theological sense — a tearing that becomes, over generations, a place where <strong>medicine grows</strong>. The diaspora did not destroy our spiritual traditions. It hid them, distorted them, forced them into syncretic forms, drove them underground, and in some lineages it broke the explicit transmission. <em>And yet.</em> And yet the traditions survived. They survived in the most ingenious places: in the cooking pot, in the church choir, in the lullaby, in the dream, in the dance, in the way Black grandmothers knew things they had no business knowing. <strong>This module is about how.</strong></p>
             <div class="bk-quote">"They tore the veil. They could not cut the cord. The cord is what brought you here, reading this."</div>`,

            `<h3>What "The Veil" Means in Our Tradition</h3>
             <p class="no-indent">In several Africana cosmologies — particularly Yoruba, but echoed across many West and Central African traditions — there is a concept of <em>the veil</em> or <em>the curtain</em>: a thin separation between the spirit world and the physical world, with regular practitioners (priests, elders, certain children) able to see through that veil more clearly than ordinary people. W.E.B. Du Bois used "the veil" in a related but distinct sense — the racial veil that separates Black experience from the white gaze. <strong>Both veils are real. Both apply to us.</strong></p>
             <p>The Middle Passage created a third kind of veil: a <em>generational</em> veil, where what one generation knew explicitly the next generation knew only implicitly, what the second knew implicitly the third knew only somatically (in the body, without words), and what the third knew somatically the fourth might experience only as <em>longing</em> — a reaching toward something they could not name. <strong>If you are reading this and feeling pulled, you are likely a third- or fourth- or fifth-generation longing.</strong> The conscious knowledge was buried; the longing for it was not. <em>The longing is the cord that survived.</em></p>`,

            `<h3>What Crossed the Water</h3>
             <p class="no-indent">A partial inventory of what came across, against every effort to prevent it:</p>
             <p><strong>Names of Orisha and Lwa.</strong> Hidden inside Catholic saints (Òṣun became Our Lady of Charity in Cuba; Ṣàngó became Saint Barbara; Èṣù became Saint Anthony or Saint Peter depending on the lineage). The names were memorized by mothers and whispered to children. <em>Today entire reconstructed Yoruba lexicons exist because grandmothers in Cuba and Brazil never let the names go.</em></p>
             <p><strong>Rhythms and drum patterns.</strong> Specific patterns sacred to specific Orisha — the bata drumming of Cuba, the rada drumming of Haiti, the agogô of Brazil — preserved with shocking precision. Ethnomusicologists today can match diaspora drum patterns to specific West African villages. <em>The drum was the most stubborn carrier.</em></p>
             <p><strong>Plant-spirit relationships.</strong> The whole tradition we walked through in Module VI — the greeting of plants, the simples, the bath herbs — survived in the cooking pots and home pharmacies of Black women across the Americas. <em>Often without the explicit theological framing</em>, but with the practices intact.</p>
             <p><strong>Divination forms.</strong> Cowrie-shell divination survived nearly intact in Cuba and Brazil. Card-reading hybrids developed in New Orleans and the broader American South. The Ifá literary corpus was reconstructed in Cuba from the memories of priests who had been trained in West Africa before captivity.</p>
             <p><strong>Burial and ancestral practices.</strong> The shrine traditions, the libation pouring, the days-of-the-dead observances — all survived in modified forms. The Cuban <em>bóveda</em> we discussed in Module II is itself a creolized form of West African ancestor altars.</p>
             <p><strong>The fundamental theology.</strong> The understanding that the dead are not dead, that the earth is alive, that prayer should be embodied, that food is offering, that song is technology, that water is alive, that fire listens — <em>all of this survived in the body of the descendant even when the doctrines were forgotten</em>.</p>`,

            `<h3>What Did Not Survive — And the Honesty We Owe</h3>
             <p class="no-indent">It is also important to be honest about loss. Some specific lineages, specific village-level traditions, specific named ancestors and specific shrine secrets <strong>did not survive</strong>. They could not. The captives came from hundreds of distinct ethnic groups, speaking dozens of languages, with thousands of micro-traditions, most of which could not be reconstructed in the new soil. The diaspora's traditions are <em>creolized</em> — they are real, but they are not identical to any single pre-contact African tradition. They are something new, born from what survived plus what was made.</p>
             <p>This is not a failure. <em>It is a creation.</em> Hoodoo is not "broken Yoruba religion." It is its own coherent, sophisticated, creolized survival-tradition with its own methodology and its own genius. Vodou is not "African religion in Haiti" — it is a <strong>Haitian religion</strong> with deep African roots and its own legitimate theology. Candomblé is Brazilian. Lucumí is Cuban. The Black Church is its own thing, neither European Christianity nor pre-contact African religion but a creolized third thing of immense power. <em>The diaspora's traditions are not lesser versions of the originals. They are siblings to the originals.</em></p>
             <div class="bk-quote">"The diaspora's traditions are not lesser versions of the originals. They are siblings to them. Born of the same mothers. Different lives."</div>`,

            `<h3>How the Cord Reaches You</h3>
             <p class="no-indent">If you are a person of African descent reading this — even multiple generations into a diaspora that explicitly tried to break the chain — the cord still reaches you. It reaches you through:</p>
             <p><strong>The pull itself.</strong> The fact that you are seeking. The fact that something turned your head when you encountered Yemoja's name, or saw cowrie shells, or heard a particular drum pattern. <em>That pull is not random. The cord is alive.</em></p>
             <p><strong>Family practices that "weren't religious."</strong> The grandmother who threw salt over her shoulder. The aunt who insisted you wash your feet before bed during certain weeks. The uncle who poured a small amount of every drink onto the ground before drinking. The mother who would not let a baby be photographed until a certain age. <em>These were spiritual technologies in plain disguise.</em></p>
             <p><strong>Bodily knowings.</strong> The way certain music moves you. The way certain rhythms feel ancestral even on first hearing. The dreams that come with messages. The intuitions that have proven correct. <em>The body is the surest carrier.</em></p>
             <p><strong>The longing itself.</strong> If nothing else came through, the longing did. The longing for a coherent spiritual framework. The longing to know who your ancestors were. The longing for the specific Black-centered spirituality that mainstream religion never gave you. <em>That longing is itself the inheritance.</em></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Sit with this question, journal-form: <strong>What practices in your family of origin "were not religious" but functioned spiritually?</strong> List as many as you can remember. Foods at certain times. Cleaning rituals. Sayings repeated. Cautions given. Things-not-to-do. Spend a full hour with this, asking older relatives if any are still living. <em>You will be surprised.</em> The cord that reaches you reaches further than you think.</p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#7ec0e8;">Next chapter: <em>Hoodoo: The Survival Tradition</em>.</p>`
          ]
        },
        { id:'p2', name:'Hoodoo: The Survival Tradition', time:'20 min', glyph:'☖',
          prompt:'What kitchen-table magic did the women in your family practice?',
          lead:'Hoodoo is not a religion. It is the technology our women used to survive.',
          excerpt:'<strong>Hoodoo</strong> is not a religion. It is a <em>technology of survival</em> — Africana spiritwork forced to wear an apron and bake itself into pies. Born under the harshest circumstances the diaspora produced, Hoodoo became the spiritual genius of the American South: a working tradition that could fit inside a sharecropper\'s cabin, hide inside a Bible, and quietly outlast the system that tried to erase it.',
          pages: [
            `<p class="dropcap no-indent">Hoodoo (also called <em>conjure</em>, <em>rootwork</em>, <em>tricking</em>, or simply "the work") is the spiritual tradition of African Americans, particularly in the American South — born from the wholesale destruction of explicit African religious practice on the plantations of North America, and from the survival genius of enslaved people who refused to be spiritually disarmed. Unlike its Caribbean and Latin American cousins (Vodou, Santería, Candomblé), Hoodoo is <strong>not a religion</strong>. It does not have a pantheon, a priesthood, an organized liturgy, or formal initiations. It is a <em>system of practical spiritual technology</em>: a way of getting things done with the tools of altar, candle, herb, root, prayer, and Bible verse. <em>It is what survived when the explicit religious forms could not.</em></p>
             <p>This is why Hoodoo is often, even today, dismissed by outside observers as "folk magic" or "superstition." That dismissal is profoundly wrong. <strong>Hoodoo is one of the most sophisticated spiritual technologies the diaspora produced</strong> — more sophisticated, in some ways, than its Caribbean cousins, because it had to operate <em>under conditions of total surveillance</em>, with no public temples, no openly-practicing priesthood, and active legal prohibition. Hoodoo had to look, to white observers, like nothing at all. Like cooking. Like cleaning. Like Christianity. Like superstition. <em>That camouflage was its genius and its cost.</em></p>
             <div class="bk-quote">"Hoodoo had to look like nothing. Like cooking. Like cleaning. Like Christianity. That camouflage was its genius — and its cost."</div>`,

            `<h3>Where Hoodoo Came From</h3>
             <p class="no-indent">The historical roots of Hoodoo include, at minimum:</p>
             <p><strong>West and Central African herbal and root traditions</strong>, particularly from the Kongo, Yoruba, Fon, and Akan peoples — most distinctively the <em>nkisi</em> or "spirit-bundle" tradition of Kongo, which underlies the Hoodoo practice of building "mojo bags" or "tricks" containing herbs, roots, and personal items.</p>
             <p><strong>Indigenous American plant knowledge</strong>, encountered and incorporated where enslaved African peoples and Indigenous peoples crossed paths — High John the Conqueror root, sassafras, certain other Southern plants used in Hoodoo are American natives whose use was learned from Indigenous teachers.</p>
             <p><strong>European folk magic</strong>, particularly British and Scotch-Irish traditions that arrived with poor white indentured servants and farmers — biblical psalmody as spell-craft, certain herb correspondences, the use of pins and dolls. The diaspora <em>took what was useful</em> from every available tradition and integrated it.</p>
             <p><strong>Christianity, especially the Bible</strong> — read by enslaved Black people <em>as a magical text</em>, with specific Psalms used for specific purposes (Psalm 23 for protection, Psalm 91 for shielding, Psalm 51 for cleansing). This is not heretical reading; <em>this is how older traditions of Christianity, including European peasant Christianity, also read the Bible</em>. Hoodoo's biblical magic is connected to a much older European/African/Mediterranean tradition than mainstream modern Christians remember.</p>`,

            `<h3>What Hoodoo Practitioners Do</h3>
             <p class="no-indent">A traditional Hoodoo worker (called a <em>conjurer</em>, <em>rootworker</em>, <em>two-headed doctor</em>, or just <em>worker</em>) typically operates in an intimate, one-on-one or small-community context — not from a temple. The work is practical and goal-oriented. Common categories of working:</p>
             <p><strong>Protection.</strong> Mojo bags worn on the body. Salt across thresholds. Specific Psalms recited. Iron buried at the property line.</p>
             <p><strong>Uncrossing.</strong> Removing what someone else has put on you, or what life has accumulated. Spiritual baths. Floor washes. Specific herb workings (rue, hyssop, sage). Often involves multiple sequential workings, not a single one.</p>
             <p><strong>Drawing</strong> — money, love, a specific job, a specific outcome. Honey jars. Sweetening workings. Lodestones. Specific candle workings.</p>
             <p><strong>Justice work.</strong> Particularly important in Hoodoo: workings to bring justice to oppressors, to "cross up" abusers, to hold accountable those who have harmed the community. <em>This is one of Hoodoo's most distinctive features</em> — it has always understood that oppression is also a spiritual condition, and that the spirit can fight back.</p>
             <p><strong>Healing.</strong> Both spiritual and physical, often blended. The Hoodoo doctor was, for centuries, the only "doctor" available to most Black Southerners. <em>The traditions saved an enormous number of lives.</em></p>
             <p><strong>Divination.</strong> Card reading, bone reading, dream interpretation, "reading the signs." Less elaborate than Ifá but still genuinely sophisticated.</p>`,

            `<h3>The Bible as Spell-Book</h3>
             <p class="no-indent">A particular note, because it is so distinctively Hoodoo and so often misunderstood. In the Hoodoo tradition, the Bible is not <em>only</em> scripture — it is a <strong>working tool</strong>. Specific Psalms and verses have specific spiritual functions. Reading the verse aloud is itself a working. Carrying a small Bible on the person provides protection. Placing a Bible open to a specific Psalm under a sleeping person's pillow is a healing or cleansing intervention. The Book of Psalms in particular is treated as a <em>book of spells with biblical authorship</em>.</p>
             <p>This is sometimes shocking to mainstream Christian sensibilities, but it is theologically defensible. The Psalms <em>were</em> written as performative texts — they were sung, recited at specific times, and used in temple ritual. The early Christian and medieval European traditions used them similarly. The Hoodoo tradition simply preserved this older relationship to scripture <em>after the mainstream Christian church largely abandoned it</em>. <strong>In some ways, Hoodoo is more biblically literate than mainstream Christianity. It just reads the Bible the way the Bible's authors meant it to be read.</strong></p>
             <div class="bk-quote">"In some ways Hoodoo is more biblically literate than mainstream Christianity. It reads the Bible the way the authors meant it to be read."</div>`,

            `<h3>The Ethics of Hoodoo</h3>
             <p class="no-indent">A common misperception of Hoodoo, fed by horror movies and racist caricature, is that it is <em>dark</em> — focused on cursing, harming, and "voodoo dolls." This is largely false. The vast majority of Hoodoo work is protection, healing, sweetening, and drawing — the same as any other working tradition. <strong>The crossing and uncrossing work that does exist is overwhelmingly defensive in nature</strong>: returning what was sent, breaking attachments to abusers, securing justice for victims. Hoodoo has a strong internal ethic that <em>you do not work harm without cause</em>, but you absolutely <em>do work to defend yourself, your family, and your community against real harm</em>.</p>
             <p>This ethic is shaped by the conditions Hoodoo was forged in. It is the spirituality of an oppressed people. It does not pretend that all parties are equal, all conflicts symmetrical, all harms forgiveable. It teaches that you owe your enemies nothing — but that you also do not waste working on them frivolously. <em>Be careful, deliberate, and rigorous about the work you do. Then trust the work and the ancestors to handle the rest.</em></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Reflect honestly: <strong>what kitchen-table magic did the women in your family practice?</strong> The salt thrown over the shoulder. The bay leaf in the soup pot. The Bible verse memorized. The spit on a child's forehead. The "don't-walk-under-a-ladder" cautions. <em>Catalogue them.</em> Most of these are Hoodoo or Hoodoo-adjacent — survival-spirituality preserved at the kitchen table because the church and the doctor's office could not be fully trusted. <strong>You inherited more than you knew.</strong></p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#7ec0e8;">Next chapter: <em>Vodou, Santería, Candomblé</em>.</p>`
          ]
        },
        { id:'p3', name:'Vodou, Santería, Candomblé', time:'22 min', glyph:'◈',
          prompt:'Which sister tradition do you feel pulled toward?',
          lead:'The Orisha became Saints. The forms changed. The fire never did.',
          excerpt:'The Orisha became Saints. The Ancestors became drums. The forms changed; <strong>the fire never did</strong>. Across the Caribbean and Latin America, where colonial conditions were different from those in the American South, our people built complete creolized religions that preserved the African traditions <em>more explicitly</em> than Hoodoo could afford to. These are our sister traditions. Knowing them illuminates our own.',
          pages: [
            `<p class="dropcap no-indent">If Hoodoo is the spirituality of the American South — survival under maximum surveillance — then Vodou, Santería, and Candomblé are the spiritualities of the Caribbean and Brazil, where colonial conditions were different in ways that allowed more explicit African religious survival. These three traditions, plus a constellation of smaller cousins (Lucumí, Palo Mayombe, Espiritismo, Spiritual Baptist, Obeah, and others) form the larger family of <strong>diasporic Africana religions</strong> in the New World. Each is its own complete religion. Each has priests, rituals, sacred texts (oral, often), and theological depth. <em>None of them is "primitive." All of them are sophisticated.</em></p>
             <p>For the descendant living in North America, the diasporic religions of the Caribbean and Latin America matter for two reasons. First, because <em>they preserved more explicit African content</em>, they are often the entry-point for North American Black descendants who want to access the Yoruba, Fon, or Kongo traditions in a more direct form. Second, because the family resemblance is real — even if you never join one of these traditions, understanding them illuminates Hoodoo, Black Christian practice, and the wider field of what survived. <strong>They are sister traditions. Knowing one helps you understand the others.</strong></p>
             <div class="bk-quote">"They are not exotic. They are family. We separated by water, not by lineage."</div>`,

            `<h3>Vodou (Haiti)</h3>
             <p class="no-indent"><strong>Vodou</strong> (also written <em>Vodun</em> or <em>Voodoo</em>, though the spelling "Vodou" is generally preferred by practitioners) is the religion of Haiti — a country whose 1804 revolution, the only successful slave revolution in modern history, was openly attributed by its leaders to the spiritual support of Vodou. The Bois Caïman ceremony that consecrated the revolution is one of the most spiritually significant events of the diaspora's history. <em>Vodou freed a country.</em></p>
             <p>Vodou's central beings are called <strong>Lwa</strong> (also <em>Loa</em>) — spirits drawn from West African (especially Fon and Yoruba) and Kongo traditions, integrated with elements of French Catholicism and indigenous Taíno cosmology. The Lwa include figures like Papa Legba (gatekeeper, cousin to Yoruba Èṣù), Erzulie (love and tenderness, cousin to Òṣun), Ogou (warrior and ironworker, cousin to Ògún), Damballa (the white serpent of creation), and many others. Each Lwa has its own colors, songs, foods, dances, and ceremonial protocols. <em>The Lwa "ride" their devotees during ceremony</em> — possession is central, sacred, and theologically positive in Vodou.</p>
             <p>Vodou has been ruthlessly slandered in American popular culture — Hollywood "voodoo dolls," zombie movies, and so on — almost none of which has any relation to the actual religion. <strong>The actual religion is a sophisticated theology with deep ethical commitments, profound communal ritual, and a documented history of liberation work.</strong> If you are pulled toward Vodou, find Haitian-led teachers. <em>The tradition is alive and well.</em></p>`,

            `<h3>Santería / Lucumí (Cuba)</h3>
             <p class="no-indent"><strong>Santería</strong> (a term some practitioners now reject, preferring <em>Lucumí</em> or <em>Regla de Ifá/Ocha</em>) is the Cuban survival of the Yoruba religion. Of all the diasporic religions, Lucumí preserved the Yoruba tradition <strong>most directly</strong> — same Orisha, same Ifá divination corpus, same drumming patterns, often with the original Yoruba names barely creolized. The reason for this exceptional preservation is partly demographic (huge numbers of Yoruba captives arrived in Cuba relatively late, after Yoruba traditions had been destroyed in much of Brazil and elsewhere) and partly structural (the Spanish Catholic system allowed African religious "brotherhoods" called <em>cabildos</em> to organize publicly, providing cover for the religion's continuity).</p>
             <p>Lucumí is, today, one of the major routes by which Western Black descendants reconnect with Yoruba tradition. The religion has rigorous initiation structures — you cannot self-initiate, you must be initiated by an existing priest in the proper lineage — and it takes the question of authenticity and lineage very seriously. <em>This rigor is a feature, not a flaw.</em> Lucumí preserved its content because it has always been careful about transmission.</p>
             <p>Many of the Orisha names you have learned in Module III — Èṣù, Ògún, Òṣun, Yemoja, Ṣàngó, Ọya — appear in Lucumí almost identically (with Spanish-influenced spellings: Eshu, Ogun, Oshun, Yemayá, Changó, Oyá). <em>If those names called to you in Module III, Lucumí is one of the traditions worth learning more about.</em></p>`,

            `<h3>Candomblé (Brazil)</h3>
             <p class="no-indent"><strong>Candomblé</strong> is the Brazilian sister-tradition to Lucumí — also Yoruba-rooted, also preserving the Orisha (called <em>Orixás</em> in Brazilian Portuguese) with great fidelity, but with its own distinct theological developments and a particular emphasis on the female priesthood. The <em>terreiro</em> (Candomblé temple) is often led by a senior woman called a <em>mãe-de-santo</em> (mother-of-saint), and Candomblé houses have, historically, been some of the most powerful sites of Black women's leadership in the Americas.</p>
             <p>Candomblé exists in several "nations" or branches — <em>Ketu</em> (Yoruba-rooted, the largest), <em>Jeje</em> (Fon-rooted, related to Vodou), <em>Angola</em> (Kongo-rooted, related to Palo Mayombe). <em>Each branch preserves a slightly different mix of African source-traditions.</em> The diversity itself is a teaching: the diaspora was not one African tradition arriving in the New World but many, and each diasporic religion settled into a particular subset.</p>
             <p>Brazil is the country with the largest African-descended population outside Africa itself. The Black presence in Brazilian culture, music, food, and spirituality is overwhelming and continuous. <em>If you are pulled toward Brazilian-rooted traditions, Candomblé is a major doorway.</em></p>
             <div class="bk-quote">"Each diaspora settled into a subset of the African inheritance. Together, the children of the Atlantic carry the whole mother-tradition between them."</div>`,

            `<h3>The Smaller Cousins</h3>
             <p class="no-indent">A brief mention of others worth knowing about:</p>
             <p><strong>Palo Mayombe</strong> (Cuba, Kongo-rooted) — a working tradition focused on the spirits of the dead and the powers of the earth, with its own ngangas (spirit-vessels) and protocols. Often practiced alongside Lucumí by the same person.</p>
             <p><strong>Espiritismo</strong> (Caribbean and Latin America) — a syncretic tradition blending African ancestor work with 19th-century European Spiritist (Kardec) practice. The bóveda we learned about in Module II comes largely from Espiritismo.</p>
             <p><strong>Spiritual Baptist / Shouter Baptist</strong> (Trinidad, St. Vincent) — a creolized Christian-African tradition with deep Yoruba elements, sometimes called "Shango Baptist" because of its integration of the Orisha Ṣàngó with Christian practice.</p>
             <p><strong>Obeah</strong> (English-speaking Caribbean) — a working tradition closer in form to Hoodoo than to Vodou, emphasizing practical magic and protection, often vilified colonially the way Hoodoo and Vodou were.</p>
             <p><strong>Winti</strong> (Suriname) — a less-publicized but fascinating tradition with strong Akan and other West African roots.</p>
             <h3>Choosing — Or Not Choosing — A Tradition</h3>
             <p class="no-indent">A practical word. You do not need to "choose" one of these traditions to have a real Africana spiritual practice. The Hoodoo-and-ancestor practice we have been building throughout this course is itself a real tradition. <strong>Many Black descendants in North America practice some form of personal Hoodoo + ancestor work without ever joining a more formal tradition</strong>, and they live spiritually rich and grounded lives. If you do feel pulled toward a more formal tradition, take it seriously: study, find legitimate lineage teachers, do not self-initiate, do not buy your initiations online. <em>The traditions that survived this much deserve to be approached with that much care.</em></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">Of the traditions named in this lesson, <strong>which one feels alive to you?</strong> Not which one you "should" choose, but which one your body responds to when you read about it. Sit with the answer. <em>You don't need to act on it yet. Just notice.</em> The pull is real. It is a thread reaching for you. Following it, when the time is right, is part of the inheritance.</p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#7ec0e8;">Next chapter: <em>The Black Church as Hush Harbor</em>.</p>`
          ]
        },
        { id:'p4', name:'The Black Church as Hush Harbor', time:'16 min', glyph:'☩',
          prompt:'Where did your church hide its African memory?',
          lead:'The drum survived inside the tambourine. The Yoruba is in there.',
          excerpt:'Listen to a Black church choir long enough. The Yoruba is in there. The Kongo is in there. <strong>The drum survived inside the tambourine.</strong> The hush harbor — the secret prayer-meeting in the woods — was one of the central Africana religious institutions of the American slavery era, and the Black Church that emerged from it carries a quietly enormous quantity of preserved African religious content. <em>If you grew up in it, you learned more than you knew.</em>',
          pages: [
            `<p class="dropcap no-indent">There is a question some Black descendants ask, sometimes with shame and sometimes with anger: <em>"Was the Black Church a betrayal of our African religion? Did our people just give up and accept the slaver's god?"</em> The honest answer to this question is complex, but it is also clarifying: <strong>no</strong>. The Black Church, in its actual lived history, was not the betrayal of African religion. It was, in many ways, <em>African religion's most successful camouflage and survival vehicle in North America</em>. The form was Christian. The content carried an extraordinary amount of preserved Africana spirituality. And the institution itself — autonomous, Black-led, often founded by literally enslaved people in defiance of plantation law — was built using African organizational genius. <em>The Black Church is, in part, an African religious institution.</em> Not entirely. But more than is generally recognized.</p>
             <p>This module is not a defense of Christian doctrine or a critique of those who have left the Black Church for other traditions. Both choices — staying, leaving — are legitimate and personal. The point of this lesson is simpler: <strong>to recognize what was preserved</strong>. So that those who stay can stay with eyes open, and those who leave can leave without losing the recognition of what their grandmothers actually inherited and passed on. The Black Church is part of the diaspora's spiritual archive. It deserves honest reading.</p>
             <div class="bk-quote">"The form was Christian. The content was Yoruba and Kongo and Akan, hiding in plain sight."</div>`,

            `<h3>The Hush Harbor</h3>
             <p class="no-indent">During the slavery era in North America, enslaved African people were almost universally forbidden from practicing their original religions. They were also, in most places, required to attend white-led Christian services that taught a deliberately distorted Christianity emphasizing obedience and the next-world consolation. <em>This was not the Christianity our ancestors practiced.</em> Our ancestors practiced a different Christianity — one they made themselves, in secret, in the woods after dark, after the master and the overseer were asleep.</p>
             <p>This secret meeting was called the <strong>hush harbor</strong>. The name varies by region — <em>brush arbor</em>, <em>hush arbor</em>, <em>praying ground</em> — but the institution is the same: a hidden gathering, often in a swamp, gully, or wooded clearing, where enslaved people met to pray <em>their own way</em>. The hush harbor included: extemporaneous prayer (often with rhythmic, call-and-response cadences directly inherited from West African worship); ring shouts (a counterclockwise shuffling dance directly continuous with West African religious dance forms); spirituals (carrying coded messages, theological depth, and African melodic structures); ecstatic possession-states ("getting happy," "having the spirit," "shouting") which functioned theologically very similarly to Orisha possession; and the laying on of hands for healing.</p>
             <p>None of this is European Christianity. <strong>Almost all of it is West African religion in Christian vocabulary.</strong> The hush harbor invented the Black Church, and the Black Church carried the hush harbor's content into the post-emancipation period and beyond. <em>What you saw in your grandmother's church on Sunday morning was, in significant part, what was practiced in the woods at night two hundred years ago.</em></p>`,

            `<h3>What Survived in the Black Church</h3>
             <p class="no-indent">A non-exhaustive inventory:</p>
             <p><strong>Possession theology.</strong> The "shout," the "Holy Ghost moment," "getting in the Spirit" — when a member of the congregation begins moving uncontrollably, speaking in unknown languages, dancing in ways their normal body would not move — this is theologically continuous with Orisha possession in Yoruba religion and Lwa possession in Vodou. <em>The form is reinterpreted as the Holy Spirit, but the underlying spiritual technology is West African.</em></p>
             <p><strong>The ring shout.</strong> Still preserved in some Geechee/Gullah communities and some sanctified churches. A counterclockwise communal dance that is directly continuous with West and Central African religious dance. <em>This is one of the clearest single survivals.</em></p>
             <p><strong>The drum (in disguise).</strong> Drums were specifically banned for enslaved Africans in much of North America after the Stono Rebellion of 1739, when drumming was used to coordinate revolt. The Black Church preserved the drum's <em>function</em> through the tambourine, the foot-stomp, the hand-clap, the body-slap, and eventually the gospel drum kit. <em>The drum survived inside the tambourine.</em></p>
             <p><strong>Call and response.</strong> The preacher cries, the congregation answers. This is the structure of West African worship. It is not the structure of European liturgy. <em>The Black Church preserved African oral form and put Christian content inside it.</em></p>
             <p><strong>The role of music.</strong> In the Black Church tradition, music is not background or decoration — it is theological technology. Songs do work. They cleanse, they heal, they lift, they prepare. This is exactly the West African understanding of music. <em>It is not at all the European Protestant understanding.</em></p>
             <p><strong>Ancestor veneration (in Christian dress).</strong> "I'll fly away to be with Jesus and my mother and my grandmother..." The Black Christian heaven is a place where one is reunited with one's people. <em>This is theologically more African than European.</em> The European Protestant tradition emphasizes individual salvation and the beatific vision; the Black Christian tradition emphasizes the family reunion. <strong>That is an Africana theological emphasis preserved in Christian language.</strong></p>`,

            `<h3>The Spirituals as Hidden Theology</h3>
             <p class="no-indent">A specific note about Negro spirituals — the body of religious songs created by enslaved African Americans, sung in the hush harbors and later in the Black Church publicly. Spirituals are some of the most theologically dense and politically encoded music ever produced in the Americas. They functioned simultaneously as: Christian devotional music; coded Underground Railroad communication ("Wade in the Water," "Steal Away"); theological treatises (the entire problem of suffering and divine justice is worked out in song after song); preserved African melodic and rhythmic structures; and emotional release and witness for a people who had no other public sanctioned form.</p>
             <p>If you want to understand Black diaspora theology in compressed form, study the spirituals. They contain it all: the longing, the consolation, the resistance, the ancestral memory, the eschatological vision, the embodied practice. <strong>The spirituals are scripture.</strong> They are the diaspora's own scripture, generated under conditions where no formal scripture-writing was permitted. They deserve to be read as the theological documents they are.</p>
             <div class="bk-quote">"The spirituals are scripture. The diaspora's own scripture. Generated when no formal writing was permitted."</div>`,

            `<h3>What the Black Church Did Not Preserve</h3>
             <p class="no-indent">Honesty: the Black Church did not preserve everything. The explicit Orisha names were lost (in North America; preserved in Cuba and Brazil). The Ifá divination system was lost in the Black Church (preserved elsewhere). Many specific ancestral protocols were lost. The deep botanical theology of West Africa was preserved better in Hoodoo than in the Black Church. <em>Each survival vehicle carried a different subset of what came across the water.</em> The Black Church carried possession theology, communal worship structure, music-as-technology, and a deeply embodied spirituality. Hoodoo carried herbalism, plant-spirit relationship, and practical magic. Vodou and Lucumí and Candomblé carried the explicit pantheons. <em>Together — Black Church + Hoodoo + the Caribbean and Latin American traditions + the lived practices of Black women in their kitchens — the diaspora reconstructed an extraordinary amount of what came across.</em></p>
             <h3>Your Practice This Week</h3>
             <p class="no-indent">If you grew up in the Black Church (or a Black-influenced Christian tradition): <strong>list five things from that tradition that, looking back through this lesson, you can now recognize as African in origin or content</strong>. The shout. The call and response. The hands raised. The food after service. The hat that grandma wore. The way the choir leader directs with their whole body. <em>You inherited an Africana religion.</em> Whether you stay in it, leave it, or hold a complicated relationship to it — you can hold it with new eyes now. <em>The grandmothers who built it knew what they were doing.</em></p>
             <p class="no-indent" style="margin-top:24px;text-align:center;font-style:italic;color:#7ec0e8;">Final chapter: <em>Returning the Inheritance</em>.</p>`
          ]
        },
        { id:'p5', name:'Returning the Inheritance', time:'18 min', glyph:'⚜',
          prompt:'What inheritance are you ready to claim?',
          lead:'You are the answer to a prayer somebody made in a slave ship hold.',
          excerpt:'You are the answer to a prayer somebody made in a slave ship hold. <em>You came back.</em> <strong>Now what will you build?</strong> The final lesson in this course is not really an ending. It is an instruction: turn around and see how far you have traveled, then turn forward and see how far there still is to go — together with the line that brought you here. The inheritance is real. The inheritance was waiting. You have begun to claim it. <strong>Now spend it well.</strong>',
          pages: [
            `<p class="dropcap no-indent">If you have traveled with us through these seven modules — Cosmology, Ancestry, the Orisha, Divination, Ritual, Herbology, and now this final consideration of the diaspora's wider tradition — you have begun, whether or not you fully realize it, a particular kind of work. You have begun the work of <strong>returning</strong>. Not returning to Africa, exactly, though some travelers in this work eventually do make that journey. Returning, rather, to the line that has been waiting for you. The grandmothers who, in a thousand kitchens across the Americas, kept the practices alive in the form of cooking, cleaning, scolding, and prayer. The unnamed ancestors back the chain whose names are lost but whose strength is in your bones. The Yoruba woman who, in 1782 in the hold of a ship whose name is forgotten, prayed that some descendant of hers, someday, would remember. <strong>You are her descendant. You are remembering. The prayer is being answered.</strong></p>
             <p>This is not a small thing. It is, in fact, perhaps the largest thing this course can offer: <em>the recognition that what you are doing has been done before, by your line, for your line, and that you are not starting from scratch</em>. You are continuing. You are <strong>already</strong> within a tradition. Your job is not to invent. Your job is not to be perfect. Your job is to <em>continue</em>, to deepen, to pass forward what you have begun to gather. <em>The river you are standing in has been running long before you.</em></p>
             <div class="bk-quote">"You are the answer to a prayer somebody made in a slave ship hold. You came back. Now spend it well."</div>`,

            `<h3>What You Have Built So Far</h3>
             <p class="no-indent">If you have actually done the practices in this course — built an ancestor altar, learned the names of seven Orisha, sat with the cowries or another divination system, established a small ritual rhythm, greeted at least one plant — you have built something specific and not theoretical. You have:</p>
             <p><strong>An ancestral relationship</strong> that did not exist before you began this work. The ancestors are now actively present in your life in a way they were not before. They will continue to be, for the rest of your life, if you continue to feed the relationship.</p>
             <p><strong>A working theology</strong>. You have a coherent answer, now, to questions about death (the ancestors), about purpose (your <em>orí</em>'s mission), about the rhythm of life (Olodumare's vibration sustaining everything, the Orisha animating the spheres of life). <em>You have a faith.</em></p>
             <p><strong>A set of tools</strong>. The altar. The candle. The herbs. The bath. The prayer. These tools are now <em>yours</em> in a way they were not when you read about them in books. You have used them. They have responded.</p>
             <p><strong>A community of the dead and the unseen</strong>. You are no longer alone in the universe in the way modern Western secular thought told you that you were. You have Yemoja in the ocean. You have Òṣun in moving water. You have Ògún at every threshold of difficulty. You have your own grandmother, name spoken at the altar, listening. <em>You are not alone.</em> This is an enormous thing.</p>
             <p>If none of these things has happened yet because you have been reading rather than practicing — that is fine, and now is the time to begin. The course works at the level of practice, not at the level of theory. <strong>The practices are the door.</strong></p>`,

            `<h3>What Comes Next</h3>
             <p class="no-indent">The honest answer to "what comes next" is: <em>that depends on you</em>. The course we have just completed is foundational — it is meant to give you a coherent first floor of Africana spiritual practice, sufficient for a lifetime if that is what you choose. From here, you have several legitimate paths:</p>
             <p><strong>Deepen the foundation.</strong> Stay with the practices established in this course for the next year or three. Build relationship with your ancestors over years, not weeks. Establish a stable spiritual rhythm in your week and your year. <em>This alone is a complete spiritual life.</em> Many practitioners stay here, and live richly.</p>
             <p><strong>Pursue a specific tradition formally.</strong> If you found yourself pulled toward Lucumí, Vodou, Candomblé, Spiritual Baptist work, or another tradition — and if the pull continues over months and years — research how to enter that tradition properly. Find legitimate teachers. Travel if necessary. Initiate if and when called. <em>Do not buy your initiation online.</em> Do not self-initiate beyond the personal ancestor work you have been doing. Real lineage matters.</p>
             <p><strong>Develop herb practice in depth.</strong> Take the foundational herbology and spend years deepening it. Become a community resource for herbal baths, simple healings, plant-spirit work. <em>This is one of the most needed roles in our communities right now.</em></p>
             <p><strong>Ancestral genealogy.</strong> Spend serious time on documented genealogy work. Pair it with the spiritual ancestor work. Travel to ancestral places. Build a deep, multi-generational ancestor altar with verified names. <em>This work is profoundly grounding and connects you to specific historical lineages.</em></p>
             <p><strong>Community work.</strong> Begin building or joining community spiritual practice. The diaspora's traditions are not solo traditions. They were always communal. <em>Find or build your people.</em></p>`,

            `<h3>The Quiet Possibility of Becoming an Elder</h3>
             <p class="no-indent">It is a strange thing to consider, but worth saying directly: <strong>many of you reading this are going to become elders in this tradition</strong>. The tradition needs you. The number of Black descendants seeking serious connection to Africana spirituality is growing rapidly. The number of grounded teachers who can hold space for that seeking is small. The work is being passed forward right now, often by people who themselves only began practicing five or ten years before they were called to teach others.</p>
             <p>If you continue this practice for the next decade, with discipline and humility, you will at some point be approached by someone younger than you who is just beginning. They will look at your altar, ask you questions, and you will discover that you know things. <em>The transmission will pass through you.</em> This is how the diaspora has always worked. We do not need a thousand certified hierophants. <strong>We need ten thousand committed practitioners who can hold space for the next ten thousand.</strong> Some of you reading this are part of that line. <em>Take the responsibility seriously. The grandmothers are watching.</em></p>
             <div class="bk-quote">"We do not need a thousand certified hierophants. We need ten thousand grounded practitioners who can hold space for the next ten thousand."</div>`,

            `<h3>A Closing Word — and a Charge</h3>
             <p class="no-indent">A closing word, then, before this course ends. <em>You are not who they told you you were.</em> You are not the secular individualist Western modernity flattened you into. You are not a person without a tradition, without ancestors, without spiritual technology. You are part of one of the oldest, most sophisticated, most extensively-tested spiritual lineages on the planet. <strong>It survived for you.</strong> Through twelve million transatlantic passages. Through the plantation. Through the auction block. Through the hush harbor. Through the kitchen pot. Through your grandmother's hands. <em>It came to find you.</em> It is here, now, in your altar and your bath and your candle and your introduced-to-rosemary plant on the windowsill. <strong>You have inherited.</strong></p>
             <p>The charge, then: <em>spend the inheritance well</em>. Practice with discipline. Practice with humility. Practice with joy — because the tradition is fundamentally a joyful tradition, even when its conditions of survival have been brutal. Practice with others when you can. Practice in private when you must. Honor the ancestors. Greet the plants. Pour the libations. Light the candles. Throw the cowries. Sing. Drum on the table if you have nothing else to drum on. <strong>Live as if the line you came from were watching, because it is.</strong></p>
             <p>And when, in time, someone younger than you begins asking the questions you began this course asking — sit with them. Show them the altar. Tell them the names. Pour them a cup of rosemary tea. <em>Pass it forward.</em> That is, finally, what the inheritance is <strong>for</strong>.</p>
             <div class="bk-quote" style="font-size:22px;">"Àṣẹ. Àṣẹ. Àṣẹ. So shall it be. So shall it be. So shall it be."</div>
             <p class="no-indent" style="margin-top:32px;text-align:center;color:#7ec0e8;font-style:italic;font-size:18px;">— end of the seven modules —</p>
             <p class="no-indent" style="margin-top:8px;text-align:center;color:#7ec0e8;font-size:14px;">Welcome home, sibling. The line is glad you came back.</p>`
          ]
        }
      ]
    }
  ]
};

// Mock progress (in production, fetched from Supabase)
window.PROGRESS = {
  cosmology:  { unlocked:true,  completed:5, total:5 },
  ancestry:   { unlocked:true,  completed:3, total:5 },
  orisha:     { unlocked:true,  completed:1, total:5 },
  divination: { unlocked:true,  completed:0, total:5 },
  ritual:     { unlocked:false, completed:0, total:5 },
  herbology:  { unlocked:false, completed:0, total:5 },
  diaspora:   { unlocked:false, completed:0, total:5 }
};

// Mock completed lessons in the active (Ancestry) module
window.LESSON_DONE = { a1:true, a2:true, a3:true, a4:false, a5:false };
