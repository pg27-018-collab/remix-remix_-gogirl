/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Meetup, SafePlace, IcebreakerCard } from './types';

export const STARTER_MEETUPS: Meetup[] = [
  {
    id: 'm1',
    title: 'Sunday Morning Coffee Walk',
    description: 'Looking to grab some cold brew, walk around CyberHub, and chat about books! Let’s meet at Starbucks CyberHub and go from there. Super casual, non-judgmental space.',
    host: {
      name: 'Riya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      personality: 'Ambivert',
      verified: true
    },
    date: 'Sunday, May 31',
    time: '09:00 AM',
    locationName: 'Starbucks, DLF CyberHub',
    area: 'Gurgaon Sector 24',
    category: 'Coffee',
    vibe: 'Cozy Bookworms',
    maxMembers: 6,
    currentMembers: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', // Host
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200'
    ],
    tags: ['Cozy in', 'Cafés', 'Books']
  },
  {
    id: 'm2',
    title: 'Pilates Group at Leisure Valley',
    description: 'Let’s meet up for a refreshing outdoor pilates and stretching session to kickstart our week! No experience needed, just bring a yoga mat and a water bottle.',
    host: {
      name: 'Aanya Sen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      personality: 'Extrovert',
      verified: true
    },
    date: 'Saturday, May 30',
    time: '07:30 AM',
    locationName: 'Leisure Valley Park',
    area: 'Gurgaon Sector 29',
    category: 'Active',
    vibe: 'Wellness & Energy',
    maxMembers: 8,
    currentMembers: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', // Host
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    ],
    tags: ['Fitness', 'Wellness', 'Low-key out']
  },
  {
    id: 'm3',
    title: 'Creative Art Walk & Pottery Chat',
    description: 'We are going to visit the latest group gallery exhibition at the Art Market, and then head over to Blue Tokai for some pottery designing and chatting!',
    host: {
      name: 'Meher Roy',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
      personality: 'Introvert',
      verified: true
    },
    date: 'Saturday, May 30',
    time: '11:00 AM',
    locationName: 'Lalit Kala Akademi',
    area: 'Connaught Place, Delhi',
    category: 'Art',
    vibe: 'Aesthetic & Mindful',
    maxMembers: 5,
    currentMembers: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200'
    ],
    tags: ['Art', 'Museums', 'Cozy in']
  },
  {
    id: 'm4',
    title: 'Female Founders & Tech Co-Working',
    description: 'Are you working on an active startup or freelancing? Let’s huddle up at a validated-safe co-working venue, get some work done, swap ideas, and cheer each other on!',
    host: {
      name: 'Diya Gupta',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      personality: 'Extrovert',
      verified: true
    },
    date: 'Monday, June 01',
    time: '10:00 AM',
    locationName: 'The Circle Work, Sector 43',
    area: 'Gurgaon Sector 43',
    category: 'Books',
    vibe: 'Goal-getters & Hustle',
    maxMembers: 10,
    currentMembers: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    ],
    tags: ['Startups', 'Tech', 'Networking']
  },
  {
    id: 'm5',
    title: 'Retro Concert & Indie Gigs Night',
    description: 'A cozy group of girls headed to the local indie music showcase tonight. We’ll meet outside the entrance, stand in a group, and sing along to classic retro tunes!',
    host: {
      name: 'Suhana Kapoor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      personality: 'Ambivert',
      verified: true
    },
    date: 'Tonight',
    time: '07:30 PM',
    locationName: 'PVR Plaza, Connaught Place',
    area: 'Connaught Place, Delhi',
    category: 'Concert',
    vibe: 'Vibrant Music',
    maxMembers: 8,
    currentMembers: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    ],
    tags: ['Music', 'Out out', 'Indie Gigs']
  }
];

export const SAFE_PLACES: SafePlace[] = [
  {
    id: 'p1',
    name: 'Blue Tokai Coffee Roasters',
    type: 'Café',
    description: 'Brightly lit local favourite, known for safety compliance. Host of our Sunday morning check-ins. Offers GoGirl users a free cookie with any pour-over coffee.',
    address: 'Block C2, Galleria Market, Sector 28',
    area: 'Gurgaon Sector 28',
    safetyRating: 4.9,
    safetyFeatures: ['CCTV active coverage', 'Female floor staff', 'Panic buttons under counter', 'Reserved GoGirl priority tables'],
    discount: 'Free choco-chip cookie with any hot brew',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=500',
    galleryImages: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=500'
    ],
    offersFreeDrink: true,
    allFemaleStaff: true
  },
  {
    id: 'p2',
    name: 'The Bookworm Parlour & Lounge',
    type: 'Bookstore',
    description: 'A gorgeous library-themed lounge with isolated corners and a friendly, all-female guard crew on duty. Highly supportive of workspace gatherings.',
    address: 'Ground Floor, South Point Mall, Golf Course Road',
    area: 'Gurgaon Sector 53',
    safetyRating: 4.8,
    safetyFeatures: ['24/7 lobby guards', 'Panic alert integration', 'GoGirl check-in kiosk', 'Isolated quiet spaces'],
    discount: '15% off on all artisan mocktails and snacks',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=500',
    galleryImages: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=500'
    ],
    offersFreeDrink: false,
    allFemaleStaff: true
  },
  {
    id: 'p3',
    name: 'Bistro 37 Italian Fine Dining',
    type: 'Restaurant',
    description: 'Vibrant, open-concept Italian bistro & pizzeria. Fully compliant with modern female-safety protocols including well-lit perimeter parking and private cab hailing kiosks.',
    address: 'Middle Circle, Connaught Place Block H',
    area: 'Connaught Place, Delhi',
    safetyRating: 4.9,
    safetyFeatures: ['Pre-booked secure parking assistance', 'All staff trained', 'Emergency SOS alarm system', 'GPS guarded entranceway'],
    discount: '1+1 on gourmet woodfired pizzas on Friday evenings',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=500',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500'
    ],
    offersFreeDrink: true,
    allFemaleStaff: false
  },
  {
    id: 'p4',
    name: 'Olive Bistro & Botanical Garden',
    type: 'Restaurant',
    description: 'Enchanting Mediterranean garden restaurant with white pebble courtyards, romantic floral lights, and dedicated female concierge desk.',
    address: 'DLF CyberHub, Phase 2, Sector 24',
    area: 'DLF CyberCity, Gurgaon',
    safetyRating: 4.9,
    safetyFeatures: ['Valet escort to vehicle', 'Reserved women-only dining booths', '24h emergency CCTV feed', 'All female hospitality managers'],
    discount: '20% off total food bill & complimentary dessert',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=500',
    galleryImages: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=500'
    ],
    offersFreeDrink: true,
    allFemaleStaff: true
  },
  {
    id: 'p5',
    name: 'Burma Burma Artisan Tea House & Asian Bistro',
    type: 'Restaurant',
    description: 'Pan-Asian vegetarian restaurant serving authentic Burmese delicacies and artisan teas in an elegant, serene atmosphere.',
    address: 'Shop 6, Building 8B, CyberHub',
    area: 'Gurgaon Sector 24',
    safetyRating: 4.8,
    safetyFeatures: ['In-house security team', 'Panic buttons under every table', 'Priority cab booking'],
    discount: '15% discount on chef tasting menu',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=500',
    galleryImages: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=500'
    ],
    offersFreeDrink: true,
    allFemaleStaff: false
  },
  {
    id: 'p6',
    name: 'Soul Circle Yoga & Pilates Studio',
    type: 'Fitness',
    description: 'A peaceful boutique setup offering group fitness and pilates. GoGirl partner studio with access exclusively restricted to women.',
    address: 'First Floor, Nirvana Courtyard',
    area: 'Gurgaon Sector 50',
    safetyRating: 5.0,
    safetyFeatures: ['Biometric check-in checks', 'Women restricted space', 'Shatter-proof glass glazing', 'Panic assistance link'],
    discount: 'Complimentary trial session & 20% membership off',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=500',
    galleryImages: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500'
    ],
    offersFreeDrink: true,
    allFemaleStaff: true
  }
];

export const ICEBREAKERS: IcebreakerCard[] = [
  {
    id: 'i1',
    question: 'If you had a warning label, what would yours say?',
    category: 'fun',
    answers: [
      '☕ "Requires 2 flat whites before processing complex questions."',
      '🛍️ "Warning: Will impulsively buy cute scented candles & quirky stationery when stressed."',
      '🗺️ "Starts planning an impromptu Goa or Pondicherry road trip 10 minutes into any chat."',
      '🛋️ "Do not disturb after 10 PM unless there is piping hot chai or juicy sisterhood tea."'
    ],
    sparkTip: 'Share the funniest quirk that your closest best friend or sibling always teases you about!'
  },
  {
    id: 'i2',
    question: 'What is a book or movie that completely changed the way you look at the world?',
    category: 'meaningful',
    answers: [
      '🎬 "Dear Zindagi — normalized going to therapy, taking time to heal, and setting gentle emotional boundaries."',
      '📚 "Before the Coffee Gets Cold — taught me to cherish every quick 5-minute hug and check-in with loved ones."',
      '👑 "Queen (2014) — showed that solo traveling and discovering your own self-worth is the ultimate freedom."',
      '✨ "Atomic Habits — proved that tiny 1% daily morning habit shifts rewrite entire years."'
    ],
    sparkTip: 'Pass the card to whoever finished a book, documentary, or movie most recently!'
  },
  {
    id: 'i3',
    question: 'Would you rather have a super power that makes you an incredible dancer, or an incredible cook?',
    category: 'would-you-rather',
    answers: [
      '💃 "Incredible Dancer: Slaying every sangeet, wedding dance floor, and Zumba class with zero rehearsal!"',
      '🍳 "Incredible Cook: Whipping up 5-star artisan pastas, warm dim sums, and comfort biryani whenever friends visit."'
    ],
    quickPollOptions: [
      { label: 'Incredible Dancer 💃', votes: 48 },
      { label: 'Master Chef Cook 🍳', votes: 52 }
    ],
    sparkTip: 'Take a quick show-of-hands vote around the table before revealing your reasons!'
  },
  {
    id: 'i4',
    question: 'What is the most spontaneous thing you’ve ever done while traveling, or in your city?',
    category: 'random',
    answers: [
      '🚂 "Booked a 5:30 AM Shatabdi train to Jaipur on a Friday midnight with just one backpack and sneakers."',
      '🏺 "Walked into a random pottery studio in Hauz Khas and spent 4 hours hand-sculpting ceramic mugs."',
      '🎸 "Went to a live indie gig alone and made three lifelong soul-sister friends right in the front row."',
      '🫓 "Drove to Murthal at 1:30 AM on a rainy Tuesday just for steaming hot parathas with white butter."'
    ],
    sparkTip: 'Everyone at the table rates their spontaneity level from 1 (meticulous planner) to 10 (total wildcard)!'
  },
  {
    id: 'i5',
    question: 'Is there a hobby or skill you started recently that you still practice regularly?',
    category: 'meaningful',
    answers: [
      '🌿 "Balcony plant parenting — now caring for 22 thriving houseplants that give me daily calm."',
      '🧘‍♀️ "Morning 20-min Yin Yoga & breathwork to reset before high-tempo work hours."',
      '🎨 "Watercolor painting on slow Sunday afternoons accompanied by acoustic lofi tracks."',
      '🥐 "Baking homemade sourdough focaccia & cinnamon rolls (the starter is still alive and healthy!)."'
    ],
    sparkTip: 'What is one new creative hobby you would love to try with this circle next weekend?'
  },
  {
    id: 'i6',
    question: 'Would you rather explore a new city strictly by walking its cafes, or climbing its highest views?',
    category: 'would-you-rather',
    answers: [
      '☕ "Café Hopping: Sipping iced matchas, reading in sunlit nooks, and feeling the neighborhood pulse."',
      '🌄 "Highest Views: Trekking sunrise ridges, scenic hill viewpoints, and rooftop horizons for the golden glow."'
    ],
    quickPollOptions: [
      { label: 'Sunlit Cafés & Bakeries ☕', votes: 62 },
      { label: 'Rooftops & Mountain Views 🌄', votes: 38 }
    ],
    sparkTip: 'What is the most memorable café or viewpoint you have ever visited?'
  },
  {
    id: 'i7',
    question: 'What song immediately gets you in a good mood on a gray or rainy afternoon?',
    category: 'fun',
    answers: [
      '🌧️ "‘Iktara’ (Wake Up Sid) — instant warm acoustic comfort that feels like a cozy cashmere sweater."',
      '☀️ "‘Love You Zindagi’ — makes whatever room you are in feel bright, sunlit, and optimistic."',
      '✨ "‘Levitating’ by Dua Lipa — automatic kitchen dance party when making coffee."',
      '🎵 "‘Kasoor’ by Prateek Kuhad — gentle acoustic strumming while watching raindrops on the window."'
    ],
    sparkTip: 'Queue up the top voted track right now on the table playlist!'
  },
  {
    id: 'i8',
    question: 'What is a green flag you immediately notice when meeting a potential new friend?',
    category: 'meaningful',
    answers: [
      '💬 "They remember small details you casually mentioned three weeks ago without having to be reminded."',
      '🛡️ "They genuinely celebrate your wins without turning it into a subtle competition or comparison."',
      '✨ "There are zero awkward silences — you can comfortably sit together in quiet peace without anxiety."',
      '🤝 "They always ensure everyone in the group is included and nobody feels left out of the conversation."'
    ],
    sparkTip: 'Give a quick spontaneous shout-out or compliment to the person sitting on your left!'
  }
];
