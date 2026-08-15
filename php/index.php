<?php
/**
 * Remix: GoGirl Standalone Web App
 * Transcribed from custom React & Tailwind components to native PHP + JavaScript.
 * Utilizes Tailwind CSS CDN, Lucide Icons, and beautiful Google Fonts.
 */
session_start();

// Define data sets matching data.ts
$starter_meetups = [
    [
        'id' => 'm1',
        'title' => 'Sunday Morning Coffee Walk',
        'description' => 'Looking to grab some cold brew, walk around CyberHub, and chat about books! Let’s meet at Starbucks CyberHub and go from there. Super casual, non-judgmental space.',
        'host' => [
            'name' => 'Riya Sharma',
            'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
            'personality' => 'Ambivert',
            'verified' => true
        ],
        'date' => 'Sunday, May 31',
        'time' => '09:00 AM',
        'locationName' => 'Starbucks, DLF CyberHub',
        'area' => 'Gurgaon Sector 24',
        'category' => 'Coffee',
        'vibe' => 'Cozy Bookworms',
        'maxMembers' => 6,
        'currentMembers' => [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200'
        ],
        'tags' => ['Cozy in', 'Cafés', 'Books']
    ],
    [
        'id' => 'm2',
        'title' => 'Pilates Group at Leisure Valley',
        'description' => 'Let’s meet up for a refreshing outdoor pilates and stretching session to kickstart our week! No experience needed, just bring a yoga mat and a water bottle.',
        'host' => [
            'name' => 'Aanya Sen',
            'avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
            'personality' => 'Extrovert',
            'verified' => true
        ],
        'date' => 'Saturday, May 30',
        'time' => '07:30 AM',
        'locationName' => 'Leisure Valley Park',
        'area' => 'Gurgaon Sector 29',
        'category' => 'Active',
        'vibe' => 'Wellness & Energy',
        'maxMembers' => 8,
        'currentMembers' => [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
        ],
        'tags' => ['Fitness', 'Wellness', 'Low-key out']
    ],
    [
        'id' => 'm3',
        'title' => 'Creative Art Walk & Pottery Chat',
        'description' => 'We are going to visit the latest group gallery exhibition at the Art Market, and then head over to Blue Tokai for some pottery designing and chatting!',
        'host' => [
            'name' => 'Meher Roy',
            'avatar' => 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
            'personality' => 'Introvert',
            'verified' => true
        ],
        'date' => 'Saturday, May 30',
        'time' => '11:00 AM',
        'locationName' => 'Lalit Kala Akademi',
        'area' => 'Connaught Place, Delhi',
        'category' => 'Art',
        'vibe' => 'Aesthetic & Mindful',
        'maxMembers' => 5,
        'currentMembers' => [
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200'
        ],
        'tags' => ['Art', 'Museums', 'Cozy in']
    ],
    [
        'id' => 'm4',
        'title' => 'Female Founders & Tech Co-Working',
        'description' => 'Are you working on an active startup or freelancing? Let’s huddle up at a validated-safe co-working venue, get some work done, swap ideas, and cheer each other on!',
        'host' => [
            'name' => 'Diya Gupta',
            'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
            'personality' => 'Extrovert',
            'verified' => true
        ],
        'date' => 'Monday, June 01',
        'time' => '10:00 AM',
        'locationName' => 'The Circle Work, Sector 43',
        'area' => 'Gurgaon Sector 43',
        'category' => 'Books',
        'vibe' => 'Goal-getters & Hustle',
        'maxMembers' => 10,
        'currentMembers' => [
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
        ],
        'tags' => ['Startups', 'Tech', 'Networking']
    ]
];

$safe_places = [
    [
        'id' => 'p1',
        'name' => 'Blue Tokai Coffee Roasters',
        'type' => 'Café',
        'description' => 'Brightly lit local favourite, known for safety compliance. Host of our Sunday morning check-ins. Offers GoGirl users a free cookie with any pour-over coffee.',
        'address' => 'Block C2, Galleria Market, Sector 28',
        'area' => 'Gurgaon Sector 28',
        'safetyRating' => 4.9,
        'safetyFeatures' => ['CCTV active coverage', 'Verified female floor staff', 'Panic buttons under counter', 'Reserved GoGirl priority tables'],
        'discount' => 'Free choco-chip cookie with any hot brew',
        'imageUrl' => 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=500',
        'offersFreeDrink' => true,
        'allFemaleStaff' => true
    ],
    [
        'id' => 'p2',
        'name' => 'The Bookworm Parlour & Lounge',
        'type' => 'Bookstore',
        'description' => 'A gorgeous library-themed lounge with isolated corners and a friendly, all-female guard crew on duty. Highly supportive of workspace gatherings.',
        'address' => 'Ground Floor, South Point Mall, Golf Course Road',
        'area' => 'Gurgaon Sector 53',
        'safetyRating' => 4.8,
        'safetyFeatures' => ['24/7 lobby guards', 'Panic alert integration', 'GoGirl check-in kiosk', 'Isolated quiet spaces'],
        'discount' => '15% off on all artisan mocktails and snacks',
        'imageUrl' => 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=500',
        'offersFreeDrink' => false,
        'allFemaleStaff' => true
    ],
    [
        'id' => 'p3',
        'name' => 'Bistro 37 CP',
        'type' => 'Restaurant',
        'description' => 'Vibrant, open-concept pizzeria. Fully compliant with modern female-safety protocols including well-lit perimeter parking and private cab hailing kiosks.',
        'address' => 'Middle Circle, Connaught Place Block H',
        'area' => 'Connaught Place, Delhi',
        'safetyRating' => 4.9,
        'safetyFeatures' => ['Pre-booked secure parking assistance', 'All staff verified and trained', 'Emergency SOS alarm system', 'GPS guarded entranceway'],
        'discount' => '1+1 on gourmet pizzas on Friday evenings',
        'imageUrl' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=500',
        'offersFreeDrink' => true,
        'allFemaleStaff' => false
    ],
    [
        'id' => 'p4',
        'name' => 'Soul Circle Yoga & Pilates Studio',
        'type' => 'Fitness',
        'description' => 'A peaceful boutique setup offering group fitness and pilates. GoGirl partner studio with access exclusively restricted to verified women.',
        'address' => 'First Floor, Nirvana Courtyard',
        'area' => 'Gurgaon Sector 50',
        'safetyRating' => 5.0,
        'safetyFeatures' => ['Biometric check-in checks', '100% female restricted', 'Shatter-proof glass glazing', 'Panic assistance link'],
        'discount' => 'Complimentary trial session & 20% membership off',
        'imageUrl' => 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=500',
        'offersFreeDrink' => true,
        'allFemaleStaff' => true
    ]
];

$all_companions = [
    [
        'id' => 'c1',
        'name' => 'Ananya Roy',
        'age' => 23,
        'area' => 'Galleria Mall, Sector 28',
        'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        'interests' => ['Books', 'Cafés', 'Wellness'],
        'personality' => 'Introvert',
        'fridayNight' => 'Cozy in',
        'bio' => 'Avid vintage novel reader looking to grab warm matcha and exchange bookmarks!'
    ],
    [
        'id' => 'c2',
        'name' => 'Tanya Malik',
        'age' => 24,
        'area' => 'DLF CyberHub',
        'avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        'interests' => ['Fitness', 'Wellness', 'Travel'],
        'personality' => 'Ambivert',
        'fridayNight' => 'Low-key out',
        'bio' => 'Stretching & Pilates fan finding safe spots around Sector 29 for coffee walks.'
    ],
    [
        'id' => 'c3',
        'name' => 'Priya Das',
        'age' => 22,
        'area' => 'Nirvana Courtyard, Sector 50',
        'avatar' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
        'interests' => ['Art', 'Museums', 'Fashion'],
        'personality' => 'Extrovert',
        'fridayNight' => 'Out out',
        'bio' => 'Exhibition hopper looking for someone to try out the ceramic workshops.'
    ],
    [
        'id' => 'c4',
        'name' => 'Diya Sen',
        'age' => 25,
        'area' => 'Connaught Place, Delhi',
        'avatar' => 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
        'interests' => ['Startups', 'Tech', 'Cafés'],
        'personality' => 'Extrovert',
        'fridayNight' => 'Out out',
        'bio' => 'Software engineer who loves co-working spaces and swapping business strategies.'
    ]
];

$icebreakers = [
    ['id' => 'i1', 'question' => 'If you had a warning label, what would yours say?', 'category' => 'fun'],
    ['id' => 'i2', 'question' => 'What is a book or movie that completely changed the way you look at the world?', 'category' => 'meaningful'],
    ['id' => 'i3', 'question' => 'Would you rather have a super power that makes you an incredible dancer, or an incredible cook?', 'category' => 'would-you-rather'],
    ['id' => 'i4', 'question' => 'What is the most spontaneous thing you’ve ever done while traveling, or in your city?', 'category' => 'random']
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Remix: GoGirl - Safe Communities for Girls</title>
    <!-- Tailwind v3 CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        display: ['Space Grotesk', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    colors: {
                        coral: {
                            50: '#FFF6F2',
                            100: '#FFEBE0',
                            150: '#FADCCE',
                            400: '#F68F5E',
                            450: '#F37941',
                            500: '#E95A24',
                            600: '#D44A1B',
                            750: '#A13410',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #FBF9F6;
        }
        .display-font {
            font-family: 'Space Grotesk', sans-serif;
        }
        .mono-font {
            font-family: 'JetBrains Mono', monospace;
        }
        /* Custom scrollbar hiding */
        .scrollbar-none::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="text-neutral-850 antialiased min-h-screen flex flex-col items-center justify-start">

    <!-- Primary Layout Frame mimicking clean iOS/Android app margins onto Desktop screens -->
    <div class="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col overflow-x-hidden border-x border-neutral-100">
        
        <!-- Onboarding Kiosk Overlay modal (State managed in JS local storage) -->
        <div id="onboardingOverlay" class="absolute inset-0 bg-white z-50 flex flex-col justify-between p-6 transition-all duration-350 transform translate-y-0 hidden">
            <div class="flex-1 flex flex-col justify-center space-y-6">
                <div class="text-center">
                    <div class="w-14 h-14 bg-coral-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
                        <i data-lucide="shield-check" class="text-coral-500 w-8 h-8"></i>
                    </div>
                    <h1 class="text-2xl font-black display-font text-neutral-900 tracking-tight">Belong and Stay Secure</h1>
                    <p class="text-xs text-neutral-500 mt-1.5 leading-relaxed">Let's craft your anonymous sisterhood profile to pair you with matching cohorts or verify safety spaces.</p>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">Your Nickname</label>
                        <input id="onboardName" type="text" placeholder="e.g. Suhana S." class="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-coral-500 font-semibold text-neutral-800">
                    </div>

                    <div>
                        <label class="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">Your Personality</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button onclick="setPersonality('Introvert')" class="personality-btn border border-neutral-200 rounded-xl py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50" id="btn-Introvert">Introvert</button>
                            <button onclick="setPersonality('Ambivert')" class="personality-btn border border-neutral-200 rounded-xl py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50" id="btn-Ambivert">Ambivert</button>
                            <button onclick="setPersonality('Extrovert')" class="personality-btn border border-neutral-200 rounded-xl py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50" id="btn-Extrovert">Extrovert</button>
                        </div>
                    </div>

                    <div>
                        <label class="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">Friday Night Vibe</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button onclick="setFriday('Cozy in')" class="friday-btn border border-neutral-200 rounded-xl py-2 text-[10px] font-bold text-neutral-600 hover:bg-neutral-50" id="btn-Cozy">Cozy in</button>
                            <button onclick="setFriday('Low-key out')" class="friday-btn border border-neutral-200 rounded-xl py-2 text-[10px] font-bold text-neutral-600 hover:bg-neutral-50" id="btn-Low-key">Low-key</button>
                            <button onclick="setFriday('Out out')" class="friday-btn border border-neutral-200 rounded-xl py-2 text-[10px] font-bold text-neutral-600 hover:bg-neutral-50" id="btn-Out">Out out</button>
                        </div>
                    </div>

                    <div>
                        <label class="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1.5">Pick 3 Interests</label>
                        <div class="flex flex-wrap gap-1.5">
                            <button onclick="toggleOnboardInterest('Books')" class="interest-btn px-2.5 py-1.5 rounded-full border border-neutral-150 text-[10px] font-bold text-neutral-500" id="int-Books">#Books</button>
                            <button onclick="toggleOnboardInterest('Cafés')" class="interest-btn px-2.5 py-1.5 rounded-full border border-neutral-150 text-[10px] font-bold text-neutral-500" id="int-Cafes">#Cafés</button>
                            <button onclick="toggleOnboardInterest('Wellness')" class="interest-btn px-2.5 py-1.5 rounded-full border border-neutral-150 text-[10px] font-bold text-neutral-500" id="int-Wellness">#Wellness</button>
                            <button onclick="toggleOnboardInterest('Fitness')" class="interest-btn px-2.5 py-1.5 rounded-full border border-neutral-150 text-[10px] font-bold text-neutral-500" id="int-Fitness">#Fitness</button>
                            <button onclick="toggleOnboardInterest('Art')" class="interest-btn px-2.5 py-1.5 rounded-full border border-neutral-150 text-[10px] font-bold text-neutral-500" id="int-Art">#Art</button>
                            <button onclick="toggleOnboardInterest('Tech')" class="interest-btn px-2.5 py-1.5 rounded-full border border-neutral-150 text-[10px] font-bold text-neutral-500" id="int-Tech">#Tech</button>
                        </div>
                    </div>
                </div>
            </div>

            <button onclick="saveOnboarding()" class="w-full bg-coral-500 hover:bg-coral-600 text-white font-extrabold display-font text-xs py-3.5 rounded-2xl tracking-wide shadow-lg flex items-center justify-center gap-2">
                Unlock Secure Portal <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        </div>

        <!-- System Banner Headers -->
        <header class="bg-white border-b border-neutral-100/80 px-4 py-3.5 flex items-center justify-between sticky top-0 z-40">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-coral-500 flex items-center justify-center text-white shadow-md">
                    <i data-lucide="shield-alert" class="w-5 h-5"></i>
                </div>
                <div>
                    <span class="text-xs font-black display-font text-neutral-900 tracking-tight block">REMIX: GOGIRL</span>
                    <span class="text-[9px] text-[#A26D57] font-semibold block leading-none">Security and Cohort Pairing • Gurgaon</span>
                </div>
            </div>
            
            <button onclick="openOnboarding(true)" class="p-1 px-2.5 border border-neutral-100 rounded-full flex items-center gap-1 hover:bg-neutral-50">
                <i data-lucide="user-cog" class="w-3.5 h-3.5 text-neutral-500"></i>
                <span id="headerProfileName" class="text-[9.5px] font-bold text-neutral-600">Profile</span>
            </button>
        </header>

        <!-- Main Workspace Tabs Screens Container -->
        <main class="flex-1 px-4 py-3 pb-32 overflow-y-auto scrollbar-none space-y-4">

            <!-- TAB 1: Explore and Spaces -->
            <div id="tabScreen-explore" class="tab-screen space-y-4">
                <!-- Verified Badges -->
                <div class="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border border-emerald-100 p-3.5 rounded-2xl flex items-center gap-2.5">
                    <i data-lucide="shield-check" class="text-emerald-600 w-5 h-5 flex-shrink-0 animate-pulse"></i>
                    <div>
                        <span class="text-[11px] font-bold text-emerald-800 block">Verified Safe Partner Spaces</span>
                        <span class="text-[10px] text-emerald-650 font-medium block leading-normal">venues with trained safety staff, well-lit parking, and direct distress linkages.</span>
                    </div>
                </div>

                <!-- Live District Swiper Menu -->
                <div class="flex gap-1.5 overflow-x-auto scrollbar-none py-1">
                    <button class="px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[10.5px] font-bold">All Spots</button>
                    <button class="px-3.5 py-1.5 rounded-full bg-white border border-neutral-150 text-neutral-600 text-[10.5px] font-semibold hover:bg-neutral-50">CyberHub</button>
                    <button class="px-3.5 py-1.5 rounded-full bg-white border border-neutral-150 text-neutral-600 text-[10.5px] font-semibold hover:bg-neutral-50">Galleria</button>
                    <button class="px-3.5 py-1.5 rounded-full bg-white border border-neutral-150 text-neutral-600 text-[10.5px] font-semibold hover:bg-neutral-50">Sector 50</button>
                </div>

                <!-- Safe Places Listing -->
                <div class="space-y-3.5">
                    <h3 class="text-xs uppercase font-extrabold tracking-wider text-neutral-400 flex items-center gap-1.5">
                        <i data-lucide="building" class="w-3.5 h-3.5 text-[#F68F5E]"></i> COMPLIANT SPONSORS
                    </h3>
                    
                    <?php foreach ($safe_places as $place): ?>
                    <div class="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-xs hover:shadow-md transition">
                        <img src="<?php echo $place['imageUrl']; ?>" class="w-full h-32 object-cover" alt="<?php echo $place['name']; ?>">
                        <div class="p-3.5">
                            <div class="flex justify-between items-start">
                                <span class="bg-coral-50 text-coral-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"><?php echo $place['type']; ?></span>
                                <span class="text-[10.5px] font-bold text-neutral-700 flex items-center gap-1"><i data-lucide="star" class="w-3 h-3 text-amber-400 fill-amber-400"></i> <?php echo $place['safetyRating']; ?></span>
                            </div>
                            <h4 class="text-xs font-black text-neutral-900 mt-1.5"><?php echo $place['name']; ?></h4>
                            <p class="text-[10.5px] text-neutral-500 mt-1 leading-relaxed"><?php echo $place['description']; ?></p>
                            <span class="text-[9.5px] text-neutral-400 block mt-1.5 font-semibold"><i data-lucide="map-pin" class="inline w-3 h-3"></i> <?php echo $place['address']; ?></span>
                            
                            <div class="border-t border-neutral-50 mt-3 pt-3 flex items-center justify-between">
                                <span class="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1"><i data-lucide="ticket" class="w-3.5 h-3.5"></i> Promo Unlocked</span>
                                <button onclick="redeemPromo('<?php echo $place['id']; ?>', '<?php echo addslashes($place['discount']); ?>')" id="promoBtn-<?php echo $place['id']; ?>" class="text-[10px] bg-coral-500 text-white font-extrabold px-3 py-1.5 rounded-lg hover:bg-coral-600 transition">Get Code</button>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>

                <!-- Companion recommendation algorithm results -->
                <div class="space-y-3.5 mt-6">
                    <h3 class="text-xs uppercase font-extrabold tracking-wider text-neutral-400 flex items-center gap-1.5">
                        <i data-lucide="users" class="w-3.5 h-3.5 text-[#F68F5E]"></i> REWARD COMPANION MATCHES
                    </h3>
                    
                    <div id="companionMatchesContainer" class="space-y-3">
                        <!-- Javascript dynamically updates scores and list alignment based on profile selection -->
                    </div>
                </div>
            </div>

            <!-- TAB 2: Meetups -->
            <div id="tabScreen-meetups" class="tab-screen space-y-4 hidden">
                <div class="bg-gradient-to-r from-orange-50/40 to-pink-50/30 border border-[#F3E5D8]/70 p-4 rounded-2xl">
                    <span class="text-xs font-black text-neutral-950 block">Sisterhood Circles</span>
                    <p class="text-[11px] text-[#A26D57] font-semibold leading-relaxed mt-1">Local, persistent community hubs. Join a circle to stay in touch, make plans, and unlock group chat rooms.</p>
                </div>

                <!-- Active communities listings -->
                <div class="space-y-3">
                    <h3 class="text-xs uppercase font-extrabold tracking-wider text-neutral-400">Join Active Gatherings</h3>
                    
                    <?php foreach ($starter_meetups as $m): ?>
                    <div class="bg-white rounded-2xl border border-neutral-100 p-3.5 relative shadow-2xs hover:shadow-xs transition">
                        <div class="flex justify-between items-start">
                            <div class="flex gap-1">
                                <?php foreach ($m['tags'] as $tag): ?>
                                <span class="text-[8.5px] bg-neutral-100 text-neutral-500 font-bold px-2 py-0.5 rounded-full">#<?php echo $tag; ?></span>
                                <?php endforeach; ?>
                            </div>
                            <span class="text-[9.5px] font-bold text-coral-500 bg-coral-50 px-2 py-0.5 rounded-full"><?php echo $m['vibe']; ?></span>
                        </div>

                        <h4 class="text-xs font-black text-neutral-900 mt-2.5 leading-snug"><?php echo $m['title']; ?></h4>
                        <p class="text-[10.5px] text-neutral-500 leading-relaxed mt-1"><?php echo $m['description']; ?></p>

                        <div class="flex items-center gap-2 mt-3 p-2 bg-neutral-50 rounded-xl">
                            <img src="<?php echo $m['host']['avatar']; ?>" class="w-6 h-6 rounded-full border border-white shadow-xs">
                            <div>
                                <span class="text-[9.5px] text-neutral-400 block font-bold leading-none">HOSTED BY</span>
                                <span class="text-[10px] font-bold text-neutral-800"><?php echo $m['host']['name']; ?> • <span class="text-coral-500"><?php echo $m['host']['personality']; ?></span></span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center mt-3 pt-3 border-t border-neutral-100 text-[10px]">
                            <span class="text-neutral-500 font-medium"><i data-lucide="calendar" class="inline w-3 h-3"></i> <?php echo $m['date']; ?> at <?php echo $m['time']; ?></span>
                            <span class="text-neutral-500 font-bold"><i data-lucide="map-pin" class="inline w-3 h-3 text-[#F68F5E]"></i> <?php echo $m['locationName']; ?></span>
                        </div>

                        <button onclick="toggleJoinMeetup('<?php echo $m['id']; ?>')" id="joinBtn-<?php echo $m['id']; ?>" class="w-full mt-3 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs py-2.5 rounded-xl uppercase transition">Join Gathering & Chat</button>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- TAB 3: Emergency Safety Hub -->
            <div id="tabScreen-safety" class="tab-screen space-y-4 hidden">
                <div class="bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl p-5 border border-red-500/30 shadow-md text-white text-left relative overflow-hidden">
                    <div class="flex justify-between items-start">
                        <div class="flex gap-2 items-center bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold border border-white/20">
                            <i data-lucide="octagon-alert" class="w-3 h-3 text-red-105 animate-pulse fill-red-105"></i> Emergency SOS
                        </div>
                        <span class="text-[10px] font-mono text-red-100">Location Tracked</span>
                    </div>

                    <h2 class="text-base font-extrabold mt-3 leading-tight display-font">Emergency SOS Signal</h2>
                    <p class="text-[11px] text-red-150 max-w-[280px] leading-snug mt-1 font-medium">Double-tap the alert button below to instantly sound an alarm and alert your trusted contacts with your live safety coordinates.</p>

                    <div class="flex justify-center my-5">
                        <button ondoubleclick="triggerSosAlert()" class="w-20 h-20 bg-white hover:scale-102 active:scale-98 transition rounded-full flex flex-col items-center justify-center border-4 border-red-500 shadow-xl relative cursor-pointer">
                            <div class="absolute inset-0 bg-red-100 rounded-full scale-108 -z-10 animate-ping opacity-25"></div>
                            <i data-lucide="shield-alert" class="w-8 h-8 text-red-600"></i>
                            <span class="text-[9px] font-black text-red-600 tracking-widest uppercase mt-1">SOS</span>
                        </button>
                    </div>
                    <div class="text-[9.5px] text-center text-red-200 mt-2 font-semibold">Double-tap to trigger alert</div>
                </div>

                <!-- Location sharing -->
                <div class="bg-white rounded-3xl border border-neutral-100 p-5 shadow-sm space-y-3.5">
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                            <i data-lucide="compass" class="w-4 h-4 text-emerald-500"></i> Share Live Location
                        </span>
                        <span id="locStatusBadge" class="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 bg-neutral-100 text-neutral-400">
                            <span class="w-1.5 h-1.5 rounded-full bg-neutral-400"></span> Paused
                        </span>
                    </div>

                    <div class="flex items-center gap-2.5">
                        <i data-lucide="map-pins" class="w-5 h-5 text-coral-500"></i>
                        <div>
                            <span class="text-xs font-black text-neutral-800 block">Gurgaon Sector 43</span>
                            <span class="text-[9.5px] text-neutral-400 font-semibold block leading-none">Location tracking in background</span>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button onclick="toggleGpsTracking()" id="gpsToggleBtn" class="flex-1 border border-neutral-200 text-neutral-700 text-xs font-bold py-2.5 rounded-xl transition hover:bg-neutral-50">Enable Broadcasting</button>
                        <button onclick="pingTrustedContacts()" id="pingContactsBtn" disabled class="flex-1 bg-neutral-100 text-neutral-400 text-xs font-bold py-2.5 rounded-xl transition cursor-not-allowed">Share Location Link</button>
                    </div>
                </div>

                <!-- Check-in timers -->
                <div class="bg-white rounded-3xl border border-neutral-100 p-5 shadow-sm space-y-4">
                    <div>
                        <h4 class="text-xs font-black text-neutral-900 flex items-center gap-1.5"><i data-lucide="clock" class="w-4 h-4 text-[#F68F5E]"></i> Check-In Security Timer</h4>
                        <p class="text-[10px] text-neutral-400 mt-0.5">Define a countdown timer when walking solo. If you don't dismiss the warning before it expires, trusted guardians get updated.</p>
                    </div>

                    <div id="checkinTimerLayout" class="space-y-3">
                        <div class="grid grid-cols-3 gap-2">
                            <button onclick="startCheckInSecs(10)" class="border border-neutral-150 rounded-xl py-2 text-[11px] font-bold text-neutral-600 hover:bg-neutral-50 focus:ring-1 focus:ring-coral-500">10 Seconds (Test)</button>
                            <button onclick="startCheckInSecs(300)" class="border border-neutral-150 rounded-xl py-2 text-[11px] font-bold text-neutral-600 hover:bg-neutral-50 focus:ring-1 focus:ring-coral-500">5 Mins</button>
                            <button onclick="startCheckInSecs(900)" class="border border-neutral-150 rounded-xl py-2 text-[11px] font-bold text-neutral-600 hover:bg-neutral-50 focus:ring-1 focus:ring-coral-500">15 Mins</button>
                        </div>
                    </div>

                    <div id="activeTimerProgress" class="hidden text-center py-4 bg-orange-50/50 border border-coral-150 rounded-xl p-4 flex flex-col items-center">
                        <i data-lucide="hourglass" class="w-8 h-8 text-coral-500 animate-spin mb-2"></i>
                        <h4 class="text-xs font-bold text-coral-700 uppercase">ACTIVE SECURE GUARD</h4>
                        <span id="countdownDisplay" class="text-xl font-black text-neutral-900 mt-1 mono-font mb-3">00:00</span>
                        
                        <div class="flex gap-2 w-full">
                            <button onclick="arrivedSafely()" class="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow hover:bg-emerald-700">I have Arrived Safely</button>
                            <button onclick="testTimeout()" class="px-3 rounded-xl bg-red-50 text-red-600 font-bold text-[10px] hover:bg-red-100">Test Expire</button>
                        </div>
                    </div>

                    <div id="checkInExpiredAlert" class="hidden text-center py-4 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col items-center">
                        <i data-lucide="shield-alert" class="w-8 h-8 text-red-600 animate-bounce mb-2"></i>
                        <h4 class="text-xs font-black text-red-900 uppercase">Timer Expired</h4>
                        <p class="text-[10.5px] text-red-700 max-w-[280px] font-medium leading-relaxed mt-1">Your check-in timer has expired. Alerts have been sent to your listed trusted contacts.</p>
                        <button onclick="dismissTimerAlarm()" class="mt-3 text-xs bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl">Dismiss Alarm</button>
                    </div>

                    <div id="safelyClearedAlert" class="hidden text-center py-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex flex-col items-center">
                        <i data-lucide="check-circle" class="w-8 h-8 text-emerald-650 mb-1"></i>
                        <h4 class="text-xs font-black text-emerald-900 uppercase thin-border">Check-In Cleared</h4>
                        <p class="text-[10px] text-emerald-700 font-semibold">We updated your trusted contacts that you have arrived safely!</p>
                    </div>
                </div>
            </div>

            <!-- TAB 4: Creative Photo Booth App -->
            <div id="tabScreen-booth" class="tab-screen space-y-4 hidden">
                <div class="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm">
                    <!-- Virtual Lens Preview -->
                    <div class="relative aspect-video w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
                        <video id="boothVideo" autoplay playsinline class="w-full h-full object-cover hidden"></video>
                        
                        <div id="boothPlaceholder" class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#121212] via-[#1C1917] to-[#1C1613]">
                            <i data-lucide="camera" class="w-8 h-8 text-coral-400 mb-2.5 opacity-80"></i>
                            <span class="text-xs font-bold text-stone-200 block">Digital Match Lens</span>
                            <span class="text-[10px] text-stone-400 block max-w-[240px] leading-relaxed mt-1">Tap "Start Camera" below to capture live moments. Alternative retro styles are active.</span>
                        </div>
                    </div>

                    <!-- Toolbar action -->
                    <div class="p-4 space-y-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-[10px] uppercase font-bold text-neutral-400 block tracking-widest">Filter Lens</span>
                                <span class="text-xs font-extrabold text-neutral-800">Retro Instant Analog</span>
                            </div>
                            <button onclick="startCamera()" id="cameraBtn" class="bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition">Start Camera</button>
                        </div>

                        <!-- Filter Selection Rings -->
                        <div class="grid grid-cols-4 gap-2">
                            <button onclick="setFilter('normal')" class="border border-neutral-200 rounded-xl py-2 text-[10px] font-bold hover:bg-neutral-50 active:ring-1 active:ring-coral-400" id="filterBtn-normal">Normal</button>
                            <button onclick="setFilter('vintage')" class="border border-neutral-200 rounded-xl py-2 text-[10px] font-bold hover:bg-neutral-50" id="filterBtn-vintage">Vintage Tint</button>
                            <button onclick="setFilter('cyber')" class="border border-neutral-200 rounded-xl py-2 text-[10px] font-bold hover:bg-neutral-50" id="filterBtn-cyber">Cyber Neon</button>
                            <button onclick="setFilter('monochrome')" class="border border-neutral-200 rounded-xl py-2 text-[10px] font-bold hover:bg-neutral-50" id="filterBtn-monochrome">Mono Silver</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Dynamic Floating Group Dialog Messenger (Rendered when gathering has been joined) -->
        <div id="groupChatContainer" class="absolute bottom-20 left-4 right-4 bg-white border border-coral-150 rounded-2xl overflow-hidden shadow-xl z-30 hidden">
            <div class="bg-gradient-to-r from-coral-50 to-orange-50/15 p-3 px-4 border-b border-coral-100 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                    <i data-lucide="message-square" class="text-coral-500 w-4 h-4"></i>
                    <div>
                        <span class="text-xs font-bold text-[#A26D57] block">Group Chat</span>
                        <span class="text-[9.5px] text-neutral-500 block font-semibold leading-none">Discuss coffee walk details with members</span>
                    </div>
                </div>
                <button onclick="minimizeGroupChat()" class="text-neutral-400 hover:text-neutral-600"><i data-lucide="minus" class="w-4 h-4"></i></button>
            </div>

            <!-- Group message lists -->
            <div id="groupMessagesBox" class="p-3 h-28 overflow-y-auto space-y-2 text-[11px] scrollbar-none">
                <div class="bg-neutral-50 p-2 rounded-lg text-neutral-600 max-w-[85%] text-left">
                    <span class="text-[9px] font-black block text-neutral-400">Riya Sharma</span>
                    Hey ladies! I am excited for Starbucks CyberHub on Sunday! I will bring copies of our matcha book!
                </div>
            </div>

            <!-- Custom message form input -->
            <div class="p-2 border-t border-neutral-100 flex gap-1.5 focus-within:ring-1 focus-within:ring-coral-500 bg-neutral-50/50">
                <input id="groupInputText" type="text" placeholder="Reply to groups..." class="flex-1 bg-white border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-neutral-800 focus:outline-none">
                <button onclick="sendGroupMessage()" class="bg-coral-500 text-white rounded-xl aspect-square w-8 flex items-center justify-center hover:bg-coral-600 transition"><i data-lucide="send" class="w-4 h-4"></i></button>
            </div>
        </div>

        <!-- System-Wide Embedded AI Assistant Sidebar Floating Bubble Panel (Millu sisterly intelligence) -->
        <div id="aiChatDialog" class="absolute bottom-20 left-4 right-4 bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-2xl z-45 hidden flex flex-col max-h-[360px] animate-fade-in transition-all">
            <!-- Header status block -->
            <div class="bg-gradient-to-r from-coral-50 to-amber-50/20 p-3.5 border-b border-coral-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-coral-500 flex items-center justify-center text-white text-[12px] font-bold">M</div>
                    <div>
                        <h4 class="text-xs font-bold text-neutral-800 leading-none">Ask Millu</h4>
                        <span class="text-[9.5px] text-emerald-600 font-bold block mt-0.5 leading-none">● Co-pilot Active</span>
                    </div>
                </div>
                <button onclick="toggleAiDrawer(false)" class="text-neutral-400 hover:text-neutral-600"><i data-lucide="x" class="w-4 h-4"></i></button>
            </div>

            <!-- Messages lists -->
            <div id="aiConversationScroll" class="p-4 overflow-y-auto space-y-3.5 h-56 text-xs scrollbar-none">
                <!-- Introductory greet -->
                <div class="flex gap-2.5 items-start">
                    <div class="w-5 h-5 rounded-full bg-coral-100 flex items-center justify-center text-coral-600 font-black text-[10px] flex-shrink-0">M</div>
                    <div class="bg-coral-50 text-neutral-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-left">
                        Welcome! I am <strong>Millu</strong>, your community co-pilot for Gurgaon! 💖 Ask me anything about secure cafes, circles, walking paths on Golf Course Road, or fun icebreakers!
                    </div>
                </div>
            </div>

            <!-- Chat request interface feedback -->
            <div id="aiProgressIndicator" class="px-4 py-1 text-[10px] text-neutral-400 font-medium hidden">
                <i data-lucide="hourglass" class="inline w-3 h-3 animate-spin"></i> Millu matching safe recommendations...
            </div>

            <div class="p-2.5 border-t border-neutral-100 bg-neutral-50 flex gap-2">
                <input id="aiInputMsg" type="text" placeholder="Ask Millu..." onkeypress="checkAiEnter(event)" class="flex-1 bg-white border border-neutral-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-coral-500 text-neutral-800">
                <button onclick="submitAiQuery()" class="bg-coral-500 hover:bg-coral-600 text-white rounded-xl aspect-square w-9 flex items-center justify-center transition shadow-md"><i data-lucide="arrow-right" class="w-5 h-5"></i></button>
            </div>
        </div>

        <!-- SOS Global Overlay Flash (Activates during emergency SOS calls) -->
        <div id="sosOverlayPanel" class="absolute inset-0 bg-neutral-900/98 backdrop-blur-md z-50 flex flex-col justify-between p-6 text-white hidden">
            <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,transparent_80%)] animate-pulse pointer-events-none"></div>

            <div class="z-10 bg-black/30 p-3 rounded-full border border-white/10 flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                    <span class="text-[10px] font-bold text-red-100">BROADCASTING EMERGENCY SIGNAL</span>
                </div>
                <div class="text-[9px] font-black text-red-200">LOCATION SECURED</div>
            </div>

            <div class="z-10 text-center space-y-6 my-auto">
                <div class="w-24 h-24 bg-red-500/20 border-4 border-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
                    <i data-lucide="shield-alert" class="w-12 h-12 text-red-500"></i>
                </div>

                <div>
                    <h2 class="text-xl font-black display-font uppercase">SOS Active</h2>
                    <p class="text-xs text-red-200 font-semibold mt-1">Alerts have been broadcast to your listed contacts.</p>
                </div>

                <!-- Status progression timeline -->
                <div class="max-w-[300px] mx-auto text-left bg-black/45 border border-red-900/40 p-4 rounded-2xl text-[11px] space-y-3.5 divide-y divide-red-950/40">
                    <div class="flex items-start gap-2.5 pt-0">
                        <span class="text-emerald-400 font-black">✓</span>
                        <div>
                            <span class="text-white block font-bold leading-tight">Trusted Contacts Alerted</span>
                            <span class="text-red-300 text-[9.5px] block font-medium">Notifications dispatched successfully to contacts.</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-2.5 pt-3">
                        <span class="text-emerald-400 font-black">✓</span>
                        <div>
                            <span class="text-white block font-bold leading-tight">Live Location Stream</span>
                            <span class="text-red-300 text-[9.5px] block font-medium">Tracking coordinates currently active in the background.</span>
                        </div>
                    </div>

                    <div class="flex items-start gap-2.5 pt-3">
                        <span id="sosStepIndicator" class="text-emerald-400 font-black">✓</span>
                        <div>
                            <span class="text-white block font-bold leading-tight">Response Center Notified</span>
                            <span class="text-red-300 text-[9.5px] block font-medium">Awaiting acknowledgement from active sisterhood centers.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="z-10 border-t border-white/10 pt-4 flex flex-col items-center">
                <span class="text-[9px] text-red-300 uppercase tracking-wider font-extrabold mb-2.5 block">Cancel this SOS signal:</span>
                <button onclick="closeSosAlert()" class="w-full bg-white hover:bg-neutral-50 text-neutral-950 font-black py-3 px-4 rounded-xl text-center text-xs tracking-wider flex items-center justify-center gap-2">
                    <i data-lucide="lock" class="w-4 h-4 text-red-900"></i> Cancel Safety Alert
                </button>
            </div>
        </div>

        <!-- Base Mobile Tab Navigation Rails -->
        <footer class="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 flex justify-around py-3 px-1 z-40">
            <button onclick="switchTab('explore')" class="tab-nav-btn text-center flex-1 text-coral-500 font-bold" id="navBtn-explore">
                <i data-lucide="compass" class="w-5 h-5 mx-auto"></i>
                <span class="text-[10px] block mt-1">Explore</span>
            </button>
            
            <button onclick="switchTab('meetups')" class="tab-nav-btn text-center flex-1 text-neutral-400 hover:text-neutral-600 font-bold" id="navBtn-meetups">
                <i data-lucide="users" class="w-5 h-5 mx-auto"></i>
                <span class="text-[10px] block mt-1">Meetups</span>
            </button>

            <!-- Embedded Float SOS Trigger Kiosk Icon -->
            <button onclick="switchTab('safety')" class="tab-nav-btn text-center flex-1 text-neutral-400 hover:text-neutral-600 font-bold" id="navBtn-safety">
                <i data-lucide="shield-check" class="w-5 h-5 mx-auto"></i>
                <span class="text-[10px] block mt-1">Safety Hub</span>
            </button>

            <button onclick="switchTab('booth')" class="tab-nav-btn text-center flex-1 text-neutral-400 hover:text-neutral-600 font-bold" id="navBtn-booth">
                <i data-lucide="camera" class="w-5 h-5 mx-auto"></i>
                <span class="text-[10px] block mt-1">Photo Booth</span>
            </button>

            <button onclick="toggleAiDrawer(true)" class="text-center flex-1 text-neutral-400 hover:text-coral-500 font-bold">
                <i data-lucide="sparkles" class="w-5 h-5 mx-auto text-[#F37941]"></i>
                <span class="text-[10px] block mt-1">Ask Millu</span>
            </button>
        </footer>

    </div>

    <!-- Client-side Interactive Application Controller Script (State & Operations Engine) -->
    <script>
        // Active data sets converted to JS variables
        const COMPANIONS = <?php echo json_encode($all_companions); ?>;
        
        // App State Properties (Load initially from localStorage fallback)
        let activeUserProfile = null;
        let activeTab = 'explore';
        let onboardingCompleted = false;
        let livesBroadcast = false;
        let countdownTimerId = null;
        let secondsLeft = 0;
        let userJoinedGatherings = [];

        // Companion Match score calculations
        function calculateAndRenderCompanions() {
            const matchesDiv = document.getElementById('companionMatchesContainer');
            if (!matchesDiv) return;

            matchesDiv.innerHTML = '';
            
            // Build ranking arrays
            const ranked = COMPANIONS.map(comp => {
                let score = 65;
                if (activeUserProfile) {
                    // shared interests matches
                    const shared = comp.interests.filter(item => activeUserProfile.interests.includes(item));
                    score += shared.length * 10;
                    
                    // personality matches
                    if (comp.personality === activeUserProfile.personality) {
                        score += 12;
                    }
                    
                    // friday matches
                    if (comp.fridayNight === activeUserProfile.fridayNight) {
                        score += 8;
                    }
                } else {
                    score = 82; // Fallback default score
                }
                
                score = Math.min(score, 99);
                return { ...comp, score };
            }).sort((a, b) => b.score - a.score);

            ranked.forEach(c => {
                const companionCard = `
                    <div class="bg-white rounded-2xl border border-neutral-100 p-3.5 shadow-2xs hover:shadow-xs transition flex gap-3 text-left">
                        <img src="${c.avatar}" class="w-14 h-14 rounded-full border border-neutral-100 shadow-sm object-cover flex-shrink-0">
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="text-xs font-black text-neutral-900">${c.name} • <span class="text-neutral-400 font-bold">${c.age} y/o</span></h4>
                                    <span class="text-[9.5px] block font-semibold text-[#A26D57]"><i data-lucide="map-pin" class="inline w-2.5 h-2.5"></i> ${c.area}</span>
                                </div>
                                <span class="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-150 font-bold px-2 py-0.5 rounded-full inline-block">${c.score}% Match</span>
                            </div>
                            <p class="text-[10.5px] text-neutral-500 mt-1 leading-normal font-semibold">${c.bio}</p>
                            <div class="flex flex-wrap gap-1.5 mt-2">
                                ${c.interests.map(item => `<span class="bg-neutral-150 text-neutral-500 text-[8.5px] px-2 py-0.5 rounded-full font-bold">#${item}</span>`).join('')}
                            </div>
                            
                            <button onclick="triggerSayHello('${c.name}')" class="mt-3 text-[10px] bg-coral-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-coral-600 transition tracking-wide flex items-center gap-1">
                                <i data-lucide="send" class="w-3 h-3"></i> Say Hello / Match
                            </button>
                        </div>
                    </div>
                `;
                matchesDiv.innerHTML += companionCard;
            });

            // Re-render lucide elements inside new cards
            lucide.createIcons();
        }

        // Onboarding workflow setup
        let selectedPersonalityStyle = '';
        let selectedFridayNightVibe = '';
        let selectedInterestsSet = [];

        function setPersonality(p) {
            selectedPersonalityStyle = p;
            document.querySelectorAll('.personality-btn').forEach(btn => {
                btn.className = "personality-btn border border-neutral-200 rounded-xl py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50";
            });
            document.getElementById(`btn-${p}`).className = "personality-btn border border-coral-400 bg-coral-50/50 rounded-xl py-2 text-xs font-extrabold text-coral-600";
        }

        function setFriday(f) {
            selectedFridayNightVibe = f;
            const prefix = f.split(' ')[0];
            document.querySelectorAll('.friday-btn').forEach(btn => {
                btn.className = "friday-btn border border-neutral-200 rounded-xl py-2 text-[10px] font-bold text-neutral-600 hover:bg-neutral-50";
            });
            document.getElementById(`btn-${prefix}`).className = "friday-btn border border-coral-400 bg-coral-50/50 rounded-xl py-2 text-[10px] font-extrabold text-coral-600";
        }

        function toggleOnboardInterest(interest) {
            const index = selectedInterestsSet.indexOf(interest);
            const idMap = {
                'Books': 'int-Books',
                'Cafés': 'int-Cafes',
                'Wellness': 'int-Wellness',
                'Fitness': 'int-Fitness',
                'Art': 'int-Art',
                'Tech': 'int-Tech'
            };
            const elementId = idMap[interest];

            if (index > -1) {
                selectedInterestsSet.splice(index, 1);
                document.getElementById(elementId).className = "interest-btn px-2.5 py-1.5 rounded-full border border-neutral-150 text-[10px] font-bold text-neutral-500";
            } else {
                if (selectedInterestsSet.length >= 3) {
                    alert('Please select exactly 3 primary interests.');
                    return;
                }
                selectedInterestsSet.push(interest);
                document.getElementById(elementId).className = "interest-btn px-2.5 py-1.5 rounded-full border border-coral-400 bg-coral-50/50 text-[10px] font-extrabold text-coral-600";
            }
        }

        function saveOnboarding() {
            const nickname = document.getElementById('onboardName').value.trim();
            if (!nickname) {
                alert('Please input your nickname to proceed securely.');
                return;
            }
            if (!selectedPersonalityStyle) {
                alert('Please pick your primary personality type.');
                return;
            }
            if (!selectedFridayNightVibe) {
                alert('Please select your preferred Friday night styling.');
                return;
            }
            if (selectedInterestsSet.length < 3) {
                alert('Please select exactly 3 primary interests to lock match metrics.');
                return;
            }

            activeUserProfile = {
                name: nickname,
                personality: selectedPersonalityStyle,
                fridayNight: selectedFridayNightVibe,
                interests: selectedInterestsSet
            };

            localStorage.setItem('gogirl_user_profile', JSON.stringify(activeUserProfile));
            onboardingCompleted = true;
            
            // Transition overlay out
            document.getElementById('onboardingOverlay').classList.add('hidden');
            document.getElementById('headerProfileName').innerText = nickname;

            // Trigger recommendations refresh
            calculateAndRenderCompanions();
        }

        function openOnboarding(show) {
            const overlay = document.getElementById('onboardingOverlay');
            if (show) {
                overlay.classList.remove('hidden');
                overlay.style.transform = 'translateY(0%)';
            } else {
                overlay.classList.add('hidden');
            }
        }

        // Active Redirection Tab Switchers
        function switchTab(tabId) {
            activeTab = tabId;
            document.querySelectorAll('.tab-screen').forEach(screen => {
                screen.classList.add('hidden');
            });
            document.getElementById(`tabScreen-${tabId}`).classList.remove('hidden');

            document.querySelectorAll('.tab-nav-btn').forEach(btn => {
                btn.className = "tab-nav-btn text-center flex-1 text-neutral-400 hover:text-neutral-600 font-bold";
            });
            document.getElementById(`navBtn-${tabId}`).className = "tab-nav-btn text-center flex-1 text-coral-500 font-bold";
        }

        // Coupon Code Generation Alerts
        function redeemPromo(placeId, discount) {
            const code = 'GOGIRL-' + Math.floor(1000 + Math.random() * 9000);
            const btn = document.getElementById(`promoBtn-${placeId}`);
            btn.className = "text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-250 font-bold px-3 py-1.5 rounded-lg";
            btn.innerText = "✓ Code: " + code;
            alert(`Your exclusive safe sponsor offer has been generated!\nShow this code at the counter:\n\n✨ [ ${code} ] ✨\nBenefit: ${discount}`);
        }

        // Safe location GPS broadcasting toggling
        function toggleGpsTracking() {
            livesBroadcast = !livesBroadcast;
            const badge = document.getElementById('locStatusBadge');
            const btn = document.getElementById('gpsToggleBtn');
            const shareBtn = document.getElementById('pingContactsBtn');

            if (livesBroadcast) {
                badge.className = "text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-150";
                badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Active`;
                btn.innerText = "Pause Broadcasting";
                btn.className = "flex-1 border border-coral-200 bg-coral-50/20 text-coral-700 text-xs font-bold py-2.5 rounded-xl transition";
                
                shareBtn.disabled = false;
                shareBtn.className = "flex-1 bg-coral-500 text-white hover:bg-coral-600 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer";
            } else {
                badge.className = "text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 bg-neutral-100 text-neutral-400";
                badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-neutral-400"></span> Paused`;
                btn.innerText = "Enable Broadcasting";
                btn.className = "flex-1 border border-neutral-200 text-neutral-700 text-xs font-bold py-2.5 rounded-xl transition hover:bg-neutral-50";

                shareBtn.disabled = true;
                shareBtn.className = "flex-1 bg-neutral-100 text-neutral-400 text-xs font-bold py-2.5 rounded-xl transition cursor-not-allowed";
            }
        }

        function pingTrustedContacts() {
            alert('Location link dispatched! We pinged your live security coordinates to standard active contacts lists via encrypted sisterhood linkages.');
            const shareBtn = document.getElementById('pingContactsBtn');
            shareBtn.innerText = "✓ Shared with Contacts";
            shareBtn.className = "flex-1 bg-emerald-50 text-emerald-850 border border-emerald-150 text-xs font-bold py-2.5 rounded-xl transition cursor-not-allowed";
            shareBtn.disabled = true;
        }

        // Active custom check-in security countdown timer
        function startCheckInSecs(secs) {
            secondsLeft = secs;
            document.getElementById('checkinTimerLayout').classList.add('hidden');
            document.getElementById('activeTimerProgress').classList.remove('hidden');
            document.getElementById('checkInExpiredAlert').classList.add('hidden');
            document.getElementById('safelyClearedAlert').classList.add('hidden');

            updateTimerDisplay();

            countdownTimerId = setInterval(() => {
                secondsLeft--;
                updateTimerDisplay();

                if (secondsLeft <= 0) {
                    triggerTimeoutAlarm();
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;
            const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('countdownDisplay').innerText = display;
        }

        function triggerTimeoutAlarm() {
            clearInterval(countdownTimerId);
            document.getElementById('activeTimerProgress').classList.add('hidden');
            document.getElementById('checkInExpiredAlert').classList.remove('hidden');
            
            // Native alerts
            alert('⚠️ Warning: Secure Check-In Timer Expired!\nPanic dispatch sent to listed emergency contacts coordinates.');
        }

        function testTimeout() {
            secondsLeft = 0;
            triggerTimeoutAlarm();
        }

        function arrivedSafely() {
            clearInterval(countdownTimerId);
            document.getElementById('activeTimerProgress').classList.add('hidden');
            document.getElementById('safelyClearedAlert').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('safelyClearedAlert').classList.add('hidden');
                document.getElementById('checkinTimerLayout').classList.remove('hidden');
            }, 3000);
        }

        function dismissTimerAlarm() {
            document.getElementById('checkInExpiredAlert').classList.add('hidden');
            document.getElementById('checkinTimerLayout').classList.remove('hidden');
        }

        // Safe Meetup Active Registers
        function toggleJoinMeetup(id) {
            const btn = document.getElementById(`joinBtn-${id}`);
            
            if (userJoinedGatherings.includes(id)) {
                userJoinedGatherings = userJoinedGatherings.filter(g => g !== id);
                btn.innerText = "Join Gathering & Chat";
                btn.className = "w-full mt-3 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs py-2.5 rounded-xl uppercase transition";
                document.getElementById('groupChatContainer').classList.add('hidden');
            } else {
                userJoinedGatherings.push(id);
                btn.innerText = "✓ Joined (Group chat active)";
                btn.className = "w-full mt-3 bg-emerald-50 text-emerald-800 border border-emerald-150 font-bold text-xs py-2.5 rounded-xl uppercase transition";
                
                // Expand group chat
                showGroupChatWindow();
            }
        }

        function showGroupChatWindow() {
            document.getElementById('groupChatContainer').classList.remove('hidden');
            const messagesBox = document.getElementById('groupMessagesBox');
            messagesBox.scrollTop = messagesBox.scrollHeight;
        }

        function minimizeGroupChat() {
            document.getElementById('groupChatContainer').classList.add('hidden');
        }

        function sendGroupMessage() {
            const msgInput = document.getElementById('groupInputText');
            const text = msgInput.value.trim();
            if (!text) return;

            const name = activeUserProfile ? activeUserProfile.name : 'You';
            const messagesBox = document.getElementById('groupMessagesBox');
            
            messagesBox.innerHTML += `
                <div class="bg-coral-50/60 p-2 rounded-lg text-neutral-800 max-w-[85%] text-right ml-auto">
                    <span class="text-[9px] font-black block text-coral-600">You</span>
                    ${text}
                </div>
            `;
            
            msgInput.value = '';
            messagesBox.scrollTop = messagesBox.scrollHeight;
        }

        // Real-time Photo Booth simulation camera
        let localStreamRef = null;
        function startCamera() {
            const video = document.getElementById('boothVideo');
            const placeholder = document.getElementById('boothPlaceholder');
            const cameraBtn = document.getElementById('cameraBtn');

            if (localStreamRef) {
                // Stop camera session
                localStreamRef.getTracks().forEach(track => track.stop());
                localStreamRef = null;
                
                video.classList.add('hidden');
                placeholder.classList.remove('hidden');
                cameraBtn.innerText = "Start Camera";
                return;
            }

            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
                .then(stream => {
                    localStreamRef = stream;
                    video.srcObject = stream;
                    video.classList.remove('hidden');
                    placeholder.classList.add('hidden');
                    cameraBtn.innerText = "Stop Camera";
                })
                .catch(err => {
                    console.error("Camera access failed:", err);
                    alert("I couldn't lock media capture. Let's showcase simulated filters instead! Vintage styles are active.");
                });
        }

        function setFilter(filterType) {
            const video = document.getElementById('boothVideo');
            const place = document.getElementById('boothPlaceholder');
            
            // clear old classes
            const filterClasses = {
                'normal': '',
                'vintage': 'sepia contrast-125 saturate-75 hue-rotate-15',
                'cyber': 'hue-rotate-180 brightness-110 saturate-200 blur-[0.3px]',
                'monochrome': 'grayscale contrast-150 saturate-0'
            };

            // Toggle filter selection styles
            document.querySelectorAll('[id^="filterBtn-"]').forEach(el => {
                el.className = "border border-neutral-200 rounded-xl py-2 text-[10px] font-bold hover:bg-neutral-50";
            });
            document.getElementById(`filterBtn-${filterType}`).className = "border border-coral-400 bg-coral-50/50 rounded-xl py-2 text-[10px] font-extrabold text-coral-600";

            if (video && !video.classList.contains('hidden')) {
                video.className = `w-full h-full object-cover transform -scale-x-100 ${filterClasses[filterType]}`;
            }
        }

        // Millu AI chatbot assistant integration
        let chatHistory = [];

        function toggleAiDrawer(open) {
            const drawer = document.getElementById('aiChatDialog');
            if (open) {
                drawer.classList.remove('hidden');
                const scrollBox = document.getElementById('aiConversationScroll');
                scrollBox.scrollTop = scrollBox.scrollHeight;
            } else {
                drawer.classList.add('hidden');
            }
        }

        function checkAiEnter(e) {
            if (e.key === 'Enter') {
                submitAiQuery();
            }
        }

        function triggerSayHello(companionName) {
            toggleAiDrawer(true);
            const input = document.getElementById('aiInputMsg');
            input.value = `Hey Millu! Help me write a friendly icebreaker to say hello to my recommended cohort match, ${companionName}! ✨`;
            submitAiQuery();
        }

        function triggerSayMatch(placeName) {
            toggleAiDrawer(true);
            const input = document.getElementById('aiInputMsg');
            input.value = `Millu, I want to plan a safe date meetup at ${placeName}. What are some good cafe features or coordinates to keep safe?`;
            submitAiQuery();
        }

        function submitAiQuery() {
            const input = document.getElementById('aiInputMsg');
            const messageText = input.value.trim();
            if (!messageText) return;

            // Render user message instantly
            const scrollBox = document.getElementById('aiConversationScroll');
            scrollBox.innerHTML += `
                <div class="flex gap-2.5 items-start justify-end">
                    <div class="bg-neutral-100 text-neutral-850 p-3 rounded-2xl rounded-tr-none max-w-[85%] text-right font-semibold">
                        ${messageText}
                    </div>
                </div>
            `;
            
            input.value = '';
            scrollBox.scrollTop = scrollBox.scrollHeight;

            // Trigger progress indicator
            const progress = document.getElementById('aiProgressIndicator');
            progress.classList.remove('hidden');

            // Build request to PHP api.php gateway
            fetch('api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: messageText,
                    history: chatHistory
                })
            })
            .then(res => res.json())
            .then(data => {
                progress.classList.add('hidden');
                const reply = data.text || "I'm sorry, I encountered a communication error. Let's try again! ✨";
                
                // Render assistant response
                scrollBox.innerHTML += `
                    <div class="flex gap-2.5 items-start">
                        <div class="w-5 h-5 rounded-full bg-coral-100 flex items-center justify-center text-coral-600 font-black text-[10px] flex-shrink-0">M</div>
                        <div class="bg-coral-50 text-neutral-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-left">
                            ${reply}
                        </div>
                    </div>
                `;

                // Update internal memory list
                chatHistory.push({ role: 'user', content: messageText });
                chatHistory.push({ role: 'assistant', content: reply });
                
                scrollBox.scrollTop = scrollBox.scrollHeight;
            })
            .catch(err => {
                progress.classList.add('hidden');
                console.error("API error:", err);
                
                scrollBox.innerHTML += `
                    <div class="flex gap-2.5 items-start">
                        <div class="w-5 h-5 rounded-full bg-coral-100 flex items-center justify-center text-coral-600 font-black text-[10px] flex-shrink-0">M</div>
                        <div class="bg-red-50 text-red-900 p-3 rounded-2xl rounded-tl-none text-left max-w-[85%]">
                            Sorry, I couldn't connect to our custom PHP gateway. Please ensure `api.php` is running in your php-enabled folder!
                        </div>
                    </div>
                `;
                scrollBox.scrollTop = scrollBox.scrollHeight;
            });
        }

        // SOS Alarm Panel
        function triggerSosAlert() {
            document.getElementById('sosOverlayPanel').classList.remove('hidden');
            let counter = 0;
            const indicator = document.getElementById('sosStepIndicator');
            
            // Loop dispatcher checks
            const interval = setInterval(() => {
                counter++;
                if (counter === 1) {
                    indicator.innerText = "✓ Routing unit coordinates...";
                } else if (counter === 2) {
                    indicator.innerText = "✓ Dispatch notified.";
                    clearInterval(interval);
                }
            }, 2500);
        }

        function closeSosAlert() {
            document.getElementById('sosOverlayPanel').classList.add('hidden');
        }

        // Initialize state on DOM load
        window.addEventListener('DOMContentLoaded', () => {
            // Load user profile if exists
            const saved = localStorage.getItem('gogirl_user_profile');
            if (saved) {
                activeUserProfile = JSON.parse(saved);
                document.getElementById('headerProfileName').innerText = activeUserProfile.name;
                
                // Pre-fill interests arrays
                selectedInterestsSet = activeUserProfile.interests || [];
                selectedPersonalityStyle = activeUserProfile.personality || '';
                selectedFridayNightVibe = activeUserProfile.fridayNight || '';
            } else {
                // Force onboarding first for customized cohort matching!
                openOnboarding(true);
            }

            // Calculate match metrics
            calculateAndRenderCompanions();

            // Load Lucide CDN icons automatically
            lucide.createIcons();
        });
    </script>
</body>
</html>
