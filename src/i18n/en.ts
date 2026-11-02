import type { ContentPack } from './types';

/* ------------------------------------------------------------------
   English content pack — translated from the Korean source in src/data.
   Facts (prices, times, numbers) follow the original exactly.
------------------------------------------------------------------- */

export const EN: ContentPack = {
  /* ---------------------------------------------------------------- site */
  site: {
    brand: 'Find Your Guesthouse Style',
    issue: 'VOL. 01 — JEJU GUESTHOUSE',
    description:
      'Jeju guesthouses, we thought, were all about parties. Here are nine experiences our editors found by staying in person — and the stay that suits you.',

    intro: {
      slug: 'S#00. GUESTHOUSE / NIGHT',
      time: '23:40',
      question: 'What words come to mind\nwhen you hear “guesthouse”?',
      words: ['Parties', 'Flirting', 'Drinks', 'Romance'],
      turn: 'What you know as\n“a Jeju guesthouse”\nisn’t the whole story.',
    },

    problem: {
      label: 'CHECK IN',
      title: ['Have you ever imagined a day', 'like this at a guesthouse?'],
      points: [],
      answer: "The experiences our editors found by staying in Jeju,\ngathered into one house.",
      answerNote: '',
    },

    checkIn: {
      label: 'CHECK IN',
      title: ['Beyond the door,', 'the guesthouse we never knew.'],
      sub: 'Open the door\nand discover your taste.',
      cta: 'Open the door and check in',
    },

    findYourStay: {
      label: 'FIND YOUR STAY',
      title: ['Find the Jeju guesthouse', 'that fits your taste.'],
      cta: 'Go to the test',
      rooms: 'Look inside the rooms',
    },

    checkOut: {
      label: 'CHECK OUT',
      title: ['What kind of day would you like to spend in Jeju?'],
      sub: 'Beyond parties, guesthouses hold\nall kinds of experiences\nwaiting to match your taste.',
      cta: 'Look around again',
      instagram: 'See us on Instagram',
      closing: 'From the nine experiences our editors found,\n\npick the day that fits your taste.',
    },

    explore: {
      label: 'ROOM TOUR',
      title: ['Which room shall we look around first?'],
      sub: 'Explore the many experiences\nwaiting at Jeju guesthouses.',
      hint: 'Tap a room to visit its guesthouse.',
    },
    characters: {
      cinema: 'Stay for the end credits',
      lp: 'Put the earphones away for a while',
      book: 'Be honest, just for tonight',
      craft: 'Carve your worries away',
      flower: 'Today is all about me',
      homemeal: 'Let’s have dinner together',
      wine: 'Fill up my glass',
      running: 'One more lap',
      camping: 'Keep this moment just as it is',
    },
  },

  /* --------------------------------------------------------- experiences */
  experiences: {
    book: { label: 'Books', short: 'Books' },
    lp: { label: 'Vinyl', short: 'LP' },
    craft: { label: 'Wood Rings', short: 'Rings' },
    camping: { label: 'Snapshots', short: 'Snaps', headline: 'How to Capture Jeju’s Seasons in Photos' },
    cinema: { label: 'Cinema', short: 'Cinema' },
    homemeal: { label: 'Home Meals', short: 'Meals', headline: 'How to Find a Warm Home-Cooked Meal in an Unfamiliar Jeju' },
    flower: { label: 'Flowers', short: 'Flowers' },
    running: { label: 'Running', short: 'Running' },
    wine: { label: 'Wine', short: 'Wine' },
  },

  floors: {
    attic: 'Attic Studio',
    study: 'Study',
    living: 'Living Room',
    kitchen: 'Kitchen',
    yard: 'Yard',
  },

  /* ------------------------------------------------------------ programs */
  programs: {
    running: {
      title: 'How to Run Along Jeju’s Sea',
      kicker: 'Next on the schedule after check-in: lacing up your running shoes.',
      intro:
        'The owner’s days as a guesthouse staffer stayed with them long after, so they opened this stay to share that experience with travelers. To make meeting people feel natural, there’s dinner and wine in the evening, a run along the coast in the morning, and a tea time at midday. Every program is optional.',
      forWhom: [
        'Those who want easy, no-pressure company',
        'Those who want a relaxed evening over wine',
        'Those who want a morning run along the Jeju sea',
      ],
      hero: { alt: 'A two-story brown building with ‘SAE AEWOL’ written large on its exterior wall', caption: 'Sae Aewol' },
      placeName: 'Sae Aewol',
      area: 'Aewol-eup, Jeju City',
      oneLine: 'A stay where evenings are tinted with wine and mornings begin with a sea breeze',
      join: {
        who: 'You can join the wine dinner party without staying here. The morning run is for those who sign up.',
        how: 'To join only the party, ask ahead by Instagram DM or phone. Rooms can be booked by searching “새애월” on Naver.',
        linkLabels: ['Instagram'],
      },
      programs: [
        {
          name: 'Morning Run & Sea Swim',
          info: [
            { label: 'Price', value: 'No participation fee' },
            { label: 'Time', value: '8:30 AM (adjustable on request)' },
          ],
          photos: [
            { alt: 'Three guests running side by side along the railing of a seaside path, with a row of wind turbines out at sea (faces blurred)', caption: 'Running the Aewol coast' },
          ],
          text: [
            'The day begins with a run along the Aewol coast with other guests. You take in the Jeju scenery in the sea breeze, and after the run, weather permitting, you can try a sea swim too. Talking naturally as you run, it’s a different way to greet a Jeju morning.',
          ],
          note: 'The sea swim may change depending on the weather and sea conditions.',
        },
        {
          name: 'Wine Dinner & Fire Gazing',
          info: [
            { label: 'Price', value: 'KRW 30,000' },
            { label: 'Time', value: '7:30 PM' },
          ],
          photos: [
            { alt: 'A wine decanter and glasses, a bread basket and a water jug on a table on the lawn at night, with a cat asleep in a folding chair beside it', caption: 'Dinner in the yard' },
            { alt: 'Hands toasting marshmallows on skewers over a campfire', caption: 'Fire gazing after dinner' },
          ],
          text: [
            'A time to enjoy a Western-style dinner and wine prepared by the owner and get to know guests you’ve just met. On fine days, dinner is served in the yard, and afterward everyone talks around the campfire. A slow, easy way to close a Jeju night.',
          ],
        },
        {
          name: 'Tea Time',
          photos: [{ alt: 'Guests sitting around a wooden table by a window overlooking a stone wall, chatting over tea (faces blurred)', caption: 'Tea time after check-out' }],
          info: [
            { label: 'Price', value: 'No participation fee' },
            { label: 'Time', value: '12:00 PM' },
          ],
          text: [
            'After check-out, guests gather over tea prepared by the owner and talk. Joining is up to you; it’s an easy time to share your Jeju experiences and upcoming travel plans. When people hit it off, they sometimes carry on traveling together.',
          ],
        },
      ],
      experience: [],
    },

    cinema: {
      title: 'How to Lose Yourself in the Screen',
      kicker: 'The moment the lights go down, you watch the same scene with strangers.',
      intro:
        'Wanting to offer quiet rest rather than a noisy, bustling atmosphere, the owner created a space where guests close each day by watching a film together every evening — setting down the weariness of travel for a while and resting at ease.',
      forWhom: [
        'Those who want to enjoy a free cinema in Jeju',
        'Those who want to watch a film together and share their thoughts',
        'Those who prefer calm rest to a noisy night',
      ],
      hero: {
        alt: 'The white building and lawn of Shym Guesthouse, with ‘JEJUSHYM’ lettering on the stone wall',
        caption: 'Shym Guesthouse',
      },
      placeName: 'Shym Guesthouse',
      area: 'Hallim-eup, Jeju City',
      oneLine: 'A stay where, every evening, you can watch a film with other guests in a little cinema',
      join: {
        who: 'Screenings are a program for guests staying here.',
        how: 'Write the film you’d like to see on the board, and the screening starts at 8 PM. Rooms are booked through Naver Booking.',
        linkLabels: ['Instagram'],
      },
      programs: [
        {
          name: 'The Little Cinema',
          info: [
            { label: 'Price', value: 'No participation fee' },
            { label: 'Time', value: '8:00 PM' },
          ],
          photos: [
            { alt: 'Travelers on wooden sofas watching a large screen in a dark screening room', caption: 'The little cinema, every night' },
          ],
          text: [
            'Every evening at 8, a free screening begins in a little cinema that seats up to nine. Request a film you’d like to see, and the owner picks one to put up on the big screen. Afterward, you can talk about the scenes that struck you, or keep your impressions to yourself and quietly close out the night.',
          ],
        },
      ],
      experience: [],
    },

    flower: {
      title: 'How to Fill a Day with Flowers',
      kicker: 'Before the vase does, your fingertips notice the season.',
      intro:
        'The owner turned one corner of the guesthouse lounge into a small flower shop, wanting to give solo travelers time to fully rest while working with Jeju’s flowers. On top of that, the owner teamed up with a local villager to add an oreum sunrise tour to a spot that’s hard to reach by public transport.',
      forWhom: [
        'Those who want quiet rest on their own',
        'Those who prefer small moments of healing to tourist sights',
        'Those who love cats',
      ],
      hero: { alt: 'A ‘Kokoko Guest House’ sign hanging on a white wooden wall', caption: 'Kokoko Guesthouse' },
      placeName: 'Kokoko',
      area: 'Gujwa-eup, Jeju City',
      oneLine: 'A stay of single rooms with a simple breakfast, where women can stay safely and comfortably',
      join: {
        who: 'The flower class runs Monday to Saturday at 2 PM and can be joined by reservation. Guests join the sunrise oreum tour by booking ahead.',
        how: 'Class sign-ups and questions go through Instagram DM.',
        linkLabels: ['Instagram'],
      },
      programs: [
        {
          name: 'Flower Arranging Class',
          info: [
            { label: 'Price', value: 'KRW 25,000' },
            { label: 'Time', value: '1 hour' },
          ],
          photos: [
            { alt: 'A cat asleep beside a bouquet of gerberas and carnations on the lounge table', caption: 'Flowers and a cat in the lounge' },
          ],
          text: [
            'A time to make your own flower basket with Jeju blooms that change with the seasons. Staying the night gets you 50% off the class fee. As you trim and combine each stem, the clutter of everyday thoughts slips away for a while. Throughout the class, three cats keep you company.',
          ],
        },
        {
          name: 'Oreum Sunrise Tour',
          info: [
            { label: 'Price', value: 'KRW 28,000' },
            { label: 'Time', value: 'To be arranged' },
          ],
          photos: [
            { alt: 'A traveler on top of an oreum, watching the sun rise over the sky and sea', caption: 'Morning on top of the oreum' },
          ],
          text: [
            'Early in the morning, you can climb an oreum known for its beautiful sunrise with a villager who works as a professional guide in Jeju. You’ll feel what makes greeting the dawn in Jeju special and, beyond the beautiful scenery, get close to the island’s everyday life and mood.',
          ],
        },
      ],
      editorProfile: {
        title: 'An editor for whom time alone matters, too',
        tags: ['Quiet travel', 'Small talk', 'Unhurried schedule'],
        about: [
          'I prefer quiet, peaceful places to crowded ones. I like spending time on my own at an easy pace within a loose plan, and now and then I enjoy a little small talk.',
        ],
      },
      experience: [
        'It was a place with a charming calm, as if time were flowing slowly. Away from crowded tourist spots, I could enjoy some time to myself and focus fully on me.',
        'From the breakfast the staff made with such care to the flower arranging class and watching the sunrise from an oreum with a villager, I got both rest on my own and special experiences across so many programs — which makes it a stay I remember all the more.',
      ],
    },

    lp: {
      title: 'How to Spend a Jeju Night with LPs',
      kicker: 'The night begins with the sound of a needle settling into the groove.',
      intro:
        'The owner, who loves travel and freedom, found a wider world at guesthouses. Seoron was shaped around the owner’s own taste — a long habit of listening to and collecting LPs. Here, travelers listen to music together and naturally grow closer.',
      forWhom: [
        'Those who want a different kind of listening on LP',
        'Those who love analog moods and cozy spaces',
        'Those who want to connect with new people through music',
      ],
      hero: { alt: 'A round wooden sign on a red brick wall, carved in white with ‘서론’ and ‘@seolon_zip’', caption: 'Seoron Guesthouse' },
      placeName: 'Seoron Guesthouse',
      area: 'Andeok-myeon, Seogwipo',
      oneLine: 'A stay where you listen to LPs, share your taste with others, and take the Jeju night slowly',
      join: {
        who: 'The listening gathering runs as a package that includes your stay and dinner, open to ages 20 to 38 (as of the October 2026 session).',
        how: 'Fill in the sign-up form opened for each session and pay the fee. Your booking is done once you get a confirmation text. Questions go through Instagram DM.',
        linkLabels: ['Instagram'],
      },
      programs: [
        {
          name: 'LP Listening',
          info: [
            { label: 'Price', value: 'No participation fee' },
            { label: 'Time', value: '6:00 PM' },
          ],
          photos: [{ alt: 'A listening corner with LP albums on lit wooden shelves and a turntable stereo below', caption: 'The LP listening corner' }],
          text: [
            'Every evening at 6, an LP listening hour to step away from the noise and focus on the music. You can request songs from the owner and hear them on vinyl. Familiar songs you used to play through earphones come to you anew in the warm tone unique to LPs. A time to enjoy the music you love, deeply.',
          ],
        },
        {
          name: 'Listening Gathering',
          info: [
            { label: 'Schedule', value: 'Every other month (once every two months)' },
            { label: 'Price', value: 'Announced separately for each session' },
          ],
          photos: [{ alt: 'Six LP album covers displayed in two rows on wooden stands against a brown wall', caption: 'LP albums on the wall' }],
          text: [
            'Held once every two months, the listening gathering is a program built around a single musician. Guests listen to that artist’s songs together and share what they felt, getting to know each other’s taste in music. Even travelers meeting for the first time in Jeju grow closer naturally through the music they share.',
          ],
        },
      ],
      editorProfile: {
        title: 'An editor who enjoys analog moods',
        tags: ['Romantic travel', 'Music listening', 'Analog mood'],
        about: [
          'When I travel, I love seeking out atmospheric spaces and spending romantic moments there. I enjoy listening to music while resting or on the move, and I love analog moods.',
        ],
      },
      experience: [
        'Listening on LP to songs I used to play through earphones made even familiar music feel new. The atmosphere that let me focus on the music was striking, and I loved slowing down with songs I like.',
        'It’s an actual house, so it felt as cozy as home, and the figures and comic books made it fun to look around. Drinking is allowed only until 10:30 PM, which I liked too — after that, the focus shifts from drinking to conversation.',
      ],
    },

    book: {
      title: 'How to Talk with Strangers Through Books',
      kicker: 'Sentences read on the road stay with you at a different temperature.',
      intro:
        'Ten years ago, the owner — then thirty — and a 27-year-old younger brother started a modest gathering, half hoping to pick up some dating tips. Today it has become an evening hour when around ten travelers, strangers to one another, sit in a circle and candidly open up about love and what’s in their hearts.',
      forWhom: [
        'Those who find it easier to open up precisely because they’re alone',
        'Those who want to talk simply as themselves, without age or job',
        'Those wondering why love is so hard',
      ],
      hero: { alt: 'The ‘서점숙소 @bookhome’ logo painted on a white wall under a blue sky', caption: 'Seojeom Sukso (Bookstore Stay)' },
      placeName: 'Seojeom Sukso (Bookstore Stay)',
      area: 'Jocheon-eup, Jeju City',
      oneLine: 'A stay where books open the door to conversations with strangers about the many kinds of love',
      join: {
        who: 'The conversation gathering ‘To the Oreum’ meets every evening at 8.',
        how: 'Sign up by text on the day; it usually goes ahead with two or more people (based on visitor reviews). Rooms are booked through Naver Booking.',
        linkLabels: ['Instagram', 'Official blog'],
      },
      programs: [
        {
          name: 'Conversation Circle ‘To the Oreum’',
          info: [
            { label: 'Price', value: 'No participation fee' },
            { label: 'Time', value: '8:00 PM' },
          ],
          photos: [
            { alt: 'A study lined with books and a long wooden table by the window', caption: 'The study where the circle meets' },
          ],
          text: [
            'A conversation circle held every evening at 8 in front of the shared study. For 40 minutes you read and copy out passages by hand, then take turns reading aloud and talking. Picking up from the readings, you talk with strangers who came alone about life and about yourselves, with love as the broad theme.',
          ],
          note: 'It runs with 3 or more sign-ups and may be canceled with fewer.',
        },
        {
          name: 'Bookbinding Class',
          info: [
            { label: 'Price', value: 'KRW 28,000' },
            { label: 'Time', value: '5:00 PM or 11:00 AM (choose one)' },
          ],
          photos: [
            { alt: 'A handmade transcription notebook with a photo cover, held up in front of the study', caption: 'A transcription notebook, made by hand' },
          ],
          text: [
            'A bookbinding class of about an hour: choose your favorites from a range of postcards and photos, cut them to use as the cover, and stitch it together by hand with thread in the color you like to make your own transcription notebook. Later, you can even swap the cover for a photo you took yourself.',
          ],
        },
      ],
      experience: [],
    },

    craft: {
      title: 'Travel Worries, Sanded Away at My Fingertips',
      kicker: 'When your hands get busy, your mind slows down.',
      intro:
        'Wanting to focus on what they love, the owner took up woodworking in Jeju. To share the joy of carving wood and making rings with travelers too, the owner opened Seureureu’s wood ring studio.',
      forWhom: [
        'Those who want a special experience beyond just a place to stay',
        'Those who want to lose themselves in a new hobby for a day',
        'Those who want to keep a travel moment as a ring of their own',
      ],
      hero: {
        alt: 'A wooden sign reading ‘Seureureu Guest House · Ujugonggan Wood Ring Studio’',
        caption: 'Seureureu Guesthouse · Ujugonggan Wood Ring Studio',
      },
      placeName: 'Seureureu Guesthouse',
      area: 'Hogeun-dong, Seogwipo',
      oneLine: 'A stay where you can spend a special day in Jeju making a one-of-a-kind wooden ring',
      join: {
        who: 'You can join the wooden ring class without staying here. The regular fee is KRW 32,000, discounted to KRW 29,000 for Seureureu Guesthouse guests.',
        how: 'Book the workshop ‘Ujugonggan’ through Naver Booking or by phone.',
        linkLabels: ['Workshop Instagram', 'Official blog'],
      },
      introQuote: '“Honestly, the wood ring studio came before the guesthouse.”',
      programs: [
        {
          name: 'Wood Ring One-Day Class',
          info: [
            { label: 'Price', value: 'KRW 29,000' },
            { label: 'Time', value: '11:00 AM, 1:00 PM or 3:00 PM (choose one)' },
          ],
          photos: [
            { alt: 'A sunlit workbench with a tray of sample wooden rings, engraving designs, a hand filling in an order sheet, and sanding and carving tools', caption: 'Choosing a ring and filling in the order sheet' },
          ],
          text: [
            'Make a special keepsake of your own in Jeju. Choose any combination of 11 special woods and 7 designs, and decide everything from the size to the engraved message to suit your taste. Carve and smooth the wood for about 1 to 1.5 hours, and you’ll have a wooden ring like no other in the world.',
          ],
          note: 'Add-on options cost extra: special wood (KRW 0–6,000), laser engraving (KRW 0–5,000).',
        },
      ],
      editorProfile: {
        title: 'An editor who wants to make special memories by hand',
        tags: ['Hands-on travel', 'My own keepsake', 'Recording my taste'],
        about: [
          'Rather than touring the sights, I like trips where I experience something firsthand. Instead of off-the-shelf goods, I want to keep souvenirs that hold my own taste and memories for a long time.',
        ],
      },
      experience: [
        'What made it special was making my own wooden ring from a combination I liked among 11 special woods and 7 designs. You even choose the size and the engraving yourself, finishing a ring that’s the only one of its kind.',
        'Focusing on carving and smoothing the wood, I could set my tangled thoughts aside for a while. Even back home, I think every time I look at the ring I made, I’ll remember my time in Jeju and how I felt then.',
      ],
    },

    camping: {
      title: 'How to Gather Around a Campfire',
      kicker: 'Light a fire, and even strangers face the same way.',
      intro:
        'The owner, a working professional photographer, put that talent to use in a snap photo program. And out of a love for camping and fire gazing, the owner also set up potluck and fire-gazing programs so guests can enjoy the camping mood together.',
      forWhom: [],
      hero: { alt: 'A hand-lettered sign on a wooden post reading ‘Mureung Shwimpyo, slowly, 60m →’', caption: 'Mureung Shwimpyo' },
      placeName: 'Mureung Shwimpyo',
      area: 'Daejeong-eup, Seogwipo',
      oneLine: 'A stay in the quiet village of Mureung-ri, a fine place to step away from everyday life and truly rest',
      join: {
        who: 'The snap photo shoot is run by a photo studio (@studiopastel_).',
        how: 'For the shoot, contact the studio by Instagram DM, KakaoTalk or phone. Rooms are booked through Naver Booking.',
        linkLabels: ['Instagram', 'Studio Instagram'],
      },
      programs: [
        {
          name: 'Snap Photo Shoot',
          info: [
            { label: 'Price', value: 'KRW 50,000' },
            { label: 'Time', value: 'To be arranged' },
          ],
          photos: [
            { alt: 'A traveler seen from behind, standing in a field of white buckwheat flowers', caption: 'Snaps in the buckwheat field' },
          ],
          text: [
            'The owner takes snap photos of you at seasonal spots across Jeju that the owner scouted on foot. In the relaxed atmosphere any awkwardness soon fades, and as you take in Jeju’s beautiful scenery you get to keep the special moments of your trip as memories — two birds with one stone.',
          ],
          note: 'Time and location can be arranged.',
        },
        {
          name: 'Potluck & Fire Gazing in the Tent',
          info: [
            { label: 'Price', value: 'KRW 25,000' },
            { label: 'Time', value: '7:00 PM' },
          ],
          photos: [
            { alt: 'Sashimi, omurice, rice balls, chicken and side dishes laid out on an outdoor table by a stone wall', caption: 'The potluck spread' },
          ],
          text: [
            'When the sunset settles over Jeju, a potluck party begins in the aurora tent. You talk over dishes the staff made themselves, and once the party ends you can enjoy fire gazing in the tent next door. Amid the rising flames and the cool night air, it’s a time when you naturally grow closer, even to travelers you’ve just met.',
          ],
          note: 'Bring any food you like in the KRW 10,000 range; joining partway through is fine.',
        },
      ],
      experience: [],
    },

    homemeal: {
      title: 'How to Get Close to Strangers over a Home-Cooked Meal',
      kicker: 'The joy of sharing dinner on a solo trip to Jeju',
      intro:
        'Wondering what could make Susu Minbak special among countless Jeju guesthouses, the owner thought of the thing they were most confident in: home cooking. The dinner program began as a warm meal like one your mom would make, and has become a time when solo travelers sit around one table, sharing food and stories.',
      forWhom: [
        'Those who travel solo but still want to share dinner',
        'Those who enjoy good food and easy conversation',
        'Those who prefer relaxed company to rowdy parties',
      ],
      hero: {
        alt: 'The Susu Minbak sign on a wooden wall, with an olive tree by the entrance',
        caption: 'The entrance to Susu Minbak',
      },
      placeName: 'Susu Minbak',
      area: 'Andeok-myeon, Seogwipo',
      oneLine: 'A stay where sharing a home-cooked meal made by the owner warms you right through',
      join: {
        who: 'The Simple Dinner goes ahead when enough people sign up.',
        how: 'Sign up for dinner ahead of time by text. Rooms can be booked from the booking link on the Instagram profile.',
        linkLabels: ['Instagram'],
      },
      programs: [
        {
          name: 'Susu’s Simple Supper',
          info: [
            { label: 'Price', value: 'KRW 30,000' },
            { label: 'Time', value: '7:30 PM' },
          ],
          photos: [
            { alt: 'The Susu Minbak dinner setting: plates and side dishes on a wooden table in front of a lit kitchen', caption: 'The simple supper spread' },
          ],
          text: [
            'A dinner program where everyone shares a home-cooked meal the owner has lovingly prepared. Travelers back from a day in Jeju gather at one table to share dombe-gogi boiled pork and plenty of side dishes. Swapping travel stories over the food, you can enjoy dinner with company even on a solo trip to Jeju.',
          ],
        },
        {
          name: 'Morning Walk',
          info: [
            { label: 'Price', value: 'No participation fee' },
            { label: 'Time', value: '7:00 AM' },
          ],
          photos: [
            { alt: 'A cliff rising beside a calm sea', caption: 'The sea on the morning walk' },
          ],
          text: [
            'A morning walk that starts at Daepyeong Port, where the owner likes to run, passes Baksugijeong and ends at Yerae Port. You may also hear the owner’s story of falling for scenery that never gets old and deciding to build the guesthouse here. Walking the quiet seaside path, you can start a Jeju morning at an easy pace.',
          ],
        },
      ],
      editorProfile: {
        title: 'An editor who enjoys both solo time and company',
        tags: ['Unhurried travel', 'Dinner together', 'Alone or together'],
        about: [
          'I like unhurried trips where I stay a while without rushing. I want to share at least one dinner with someone, and both time alone and time together matter to me.',
        ],
      },
      experience: [
        'What I remember most is the dinner the owner made. Sharing dombe-gogi boiled pork and plenty of side dishes while swapping travel stories with guests I’d just met was a joy.',
        'The four-person room I stayed in had a curtain on every bed, so I could rest comfortably. I mingled with guests in the evening and enjoyed time to myself in the room. I was happy to have both the fun of company and some quiet time alone.',
      ],
    },

    wine: {
      title: 'How to Spend a Jeju Evening over a Glass of Wine',
      kicker: 'The night flows as slowly as the glass empties.',
      intro:
        'Ten years ago, after quitting a job, the owner worked as guesthouse staff. Back then, guesthouse dinners were mostly Korean food. The winery dinner began from a wish to break from that and share the Western dishes and wine the owner had come to love while living abroad.',
      forWhom: [
        'Those who come alone but want to enjoy dinner with others',
        'Those who want a special time, like at the end of the year',
        'Those looking for a meal made with local ingredients',
      ],
      hero: { alt: 'A rusted iron ‘Rooftop Garden’ sign on a stone wall, and a stone path through the garden', caption: 'Rooftop Garden' },
      placeName: 'Rooftop Garden',
      area: 'Namwon-eup, Seogwipo',
      oneLine: 'A stay where guests gather at one table to share a special evening over a winery dinner',
      join: {
        who: 'Guests staying here get booking priority for the winery dinner.',
        how: 'On the morning of your stay you get a text; book within the stated time (based on visitor reviews). Outside alcohol isn’t allowed.',
        linkLabels: ['Instagram'],
      },
      programs: [
        {
          name: 'Winery Dinner',
          info: [
            { label: 'Price', value: 'KRW 30,000' },
            { label: 'Time', value: '8:00 PM' },
          ],
          photos: [
            { alt: 'Ratatouille, risotto, pasta, boiled pork, salad and sparkling wine on a candlelit table', caption: 'The winery dinner' },
          ],
          text: [
            'A winery dinner of gambas, risotto, pasta and steak made with Jeju-grown ingredients, served with wine — and the menu changes every time. As the owner explains each dish, you sit around one table with other guests and share the meal, wine and conversation.',
          ],
          note: 'The winery dinner is by reservation only; to book, reply to your check-in text message.',
        },
      ],
      editorProfile: {
        title: 'An editor who took on solo travel',
        tags: ['Do-it-all travel', 'New experiences', 'Solo travel challenge'],
        about: [
          'If there’s a special experience to be had somewhere, I don’t want to miss it. I’m not someone who typically enjoys traveling alone, but I wanted to try something new, so I set off for Jeju on my own.',
        ],
      },
      experience: [
        'The food at the winery dinner is what I remember most. Hearing the owner explain that the dishes used local ingredients like Jeju black pork made them feel special. The portions were generous and everything was delicious — I was completely satisfied.',
        'Above all, sitting at one table with guests I’d just met, sharing food and pouring wine for one another, we became friends naturally. Thanks to that shared dinner, even a solo trip turned out to be a lot of fun.',
      ],
    },
  },

  /* ---------------------------------------------------------------- quiz */
  quiz: {
    questions: {
      q1: {
        tags: { A: 'Rest', B: 'PeopleVibes' },
        context: 'the Jeju guesthouse you’re drawn to',
        q: 'A Jeju guesthouse I love is one that’s…',
        options: {
          A: 'A place to rest quietly and deeply',
          B: 'A place that feels lived-in and full of people',
        },
      },
      q2: {
        tags: { A: 'MeTime', B: 'SayHi' },
        context: 'meeting guests in the lounge',
        q: 'Check-in! A few guests are already in the lounge.',
        options: {
          A: 'A quick nod, then straight to my room',
          B: '“Where are you from?” — I start the conversation',
        },
      },
      q3: {
        tags: { A: 'OneDayClass', B: 'RainyJeju' },
        context: 'a day of nonstop rain',
        q: 'Rain is forecast all day.',
        options: {
          A: 'Take a one-day class at the guesthouse',
          B: 'Rain or not, I’m going out to shoot rainy Jeju',
        },
      },
      q4: {
        tags: { A: 'HomeMeal', B: 'WineDinner' },
        context: 'tonight’s dinner',
        q: 'What’s for dinner tonight?',
        options: {
          A: 'A home-cooked meal made by the host',
          B: 'A Western dinner paired with wine',
        },
      },
      q5: {
        tags: { A: 'MovieNight', B: 'Vinyl' },
        context: 'after dinner at the guesthouse',
        q: 'After dinner, if you could do just one thing at the guesthouse…',
        options: {
          A: 'Watch a movie together',
          B: 'Listen to music on LP',
        },
      },
      q6: {
        tags: { A: 'DeepTalk', B: 'Campfire' },
        context: 'late-night conversations',
        q: 'Talking with people at night, I’d rather…',
        options: {
          A: 'A deep talk that starts from a line in a book',
          B: 'Light chatter in front of a bonfire',
        },
      },
      q7: {
        tags: { A: 'EarlyBird', B: 'NightOwl' },
        context: 'your rhythm on a trip',
        q: 'When I travel, I’m…',
        options: {
          A: 'An early-rising morning person',
          B: 'A night owl who stays up late',
        },
      },
      q8: {
        tags: { A: 'OreumSunrise', B: 'CoastalRun' },
        context: 'heading out early',
        q: 'If you head out early in the morning…',
        options: {
          A: 'Climb an oreum to watch the sunrise',
          B: 'Run along the coastal road',
        },
      },
      q9: {
        tags: { A: 'Handmade', B: 'JejuSnaps' },
        context: 'a keepsake from Jeju',
        q: 'What I want to keep as a Jeju souvenir is…',
        options: {
          A: 'Something I made with my own hands',
          B: 'A photo of me in a Jeju landscape',
        },
      },
      q10: {
        tags: { A: 'AGlassOfWine', B: 'WarmMeal' },
        context: 'sharing one thing with someone new',
        q: 'If you could share just one thing with someone you just met…',
        options: {
          A: 'A glass of wine',
          B: 'A warm meal together',
        },
      },
    },

    types: {
      adventurer: {
        name: 'The Adventurous Traveler',
        en: 'THE MOVER',
        description:
          'You remember a landscape with your body before your eyes. The moment you run out of breath, the moment the wind changes direction — those become the scenes of your trip. Walk side by side with strangers, warm yourselves at the same fire, and before long you’re friends.',
        travelStyle: [
          'Wake before sunrise and run a neighborhood morning route',
          'Spend at least one night under the sky instead of a roof',
          'Talk through tomorrow’s route in front of a campfire at night',
        ],
      },
      collector: {
        name: 'The Sensory Collector',
        en: 'THE COLLECTOR',
        description:
          'For you, travel is about collecting sounds and sentences. You look for a place to sit for a long while before any crowded landmark. Among people who share a space without words, you actually feel most at ease.',
        travelStyle: [
          'Choose one place a day to linger in',
          'Pack good music and a book as carefully as your itinerary',
          'At night, turn the volume up and your voice down',
        ],
      },
      maker: {
        name: 'The Hands-On Recorder',
        en: 'THE MAKER',
        description:
          'Just seeing and hearing isn’t quite enough for you. Trimming a single flower, carving a piece of wood, cooking a meal to share — that’s when a place finally becomes yours. It’s fine if the result comes out a little crooked. That crookedness is the memory.',
        travelStyle: [
          'Keep an afternoon free for a hands-on program',
          'Don’t buy souvenirs — make them',
          'Cook and share dinner with people you’ve just met',
        ],
      },
      keeper: {
        name: 'The Scene Keeper',
        en: 'THE KEEPER',
        description:
          'You’re the kind of person who takes the trip once more after it’s over. A scene from a film watched together, the air of a night spent tilting glasses — they grow sharper as time goes by. You know how this moment will be remembered later.',
        travelStyle: [
          'Close the day slowly, without rushing',
          'Spend the night sharing the same screen or the same bottle',
          'Keep the scenes of your trip so you can revisit them for years',
        ],
      },
    },
  },
};
