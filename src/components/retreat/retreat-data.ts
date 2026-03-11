export type RetreatStatus = 'active' | 'selling-fast' | 'sold-out' | 'coming-soon' | 'complete';

export interface RetreatData {
  slug: string;
  destination: string;
  officialName: string;
  heroImageUrl: string;
  status: RetreatStatus;
  dates: { start: string; end: string; display: string };
  duration: number;
  priceFrom: number;
  groupSize: string;
  country: string;
  location: string;
  skillLevel: 'all-levels' | 'beginner-friendly' | 'intermediate';
  soloTravelerPercent: number;
  spotsRemaining?: number;
  depositAmount: number;
  bookingUrl?: string;
  geoDescription: string;
  quickFacts: { label: string; value: string }[];
  included: string[];
  notIncluded: string[];
  experienceNarrative: string[];
  experienceImageUrl?: string;
  forYouIf: string[];
  bestFor: string[];
  maybeNotFor: string[];
  activities: { name: string; description: string; imageUrl?: string; frequency?: string; videoPlaceholderId?: string; modalDetails?: string }[];
  dailyRhythm: { period: string; description: string }[];
  itinerary: { day: number; title: string; location: string; summary: string; details: string; photoUrl?: string }[];
  roomTiers: { name: string; price: number; description: string; features: string[]; imageUrl?: string }[];
  accommodation: { name: string; description: string; features: string[] };
  coaches: { name: string; bio: string; specialties: string[]; personality: string; cardColor: string; starColor: string; textColor?: string; photoUrl?: string }[];
  saltyMeter: { sweat: number; adventure: number; party: number; rest: number; culture: number; groupSize: number };
  saltyMeterBlurb: string;
  testimonials: { guestName: string; quote: string; rating: number; retreatLabel: string }[];
  faqs: { question: string; answer: string }[];
  youtubeVideoIds: string[];
  paymentPolicy: string;
  cancellationPolicy: string;
  villaPhotos: string[];
  sampleDay: { time: string; label: string }[];
  videoTestimonials: { id: string; name: string; label: string }[];
  photoStripImages: string[];
  coBrand?: {
    name: string;
    logoUrl?: string;
  };
}

export const PANAMA_RETREAT: RetreatData = {
  slug: 'panama-fitness-retreat',
  destination: 'Panama',
  officialName: 'City to Sea',
  heroImageUrl: '/images/retreat/beach-squats.png',
  status: 'active',
  country: 'Panama',
  location: 'Panama City + Santa Catalina',
  skillLevel: 'all-levels',
  soloTravelerPercent: 65,
  spotsRemaining: 12,
  depositAmount: 350,
  bookingUrl: undefined,
  dates: {
    start: '2026-03-14',
    end: '2026-03-22',
    display: 'March 14–22, 2026',
  },
  duration: 9,
  priceFrom: 2249,
  groupSize: '35–45',

  geoDescription:
    'A Panama fitness retreat combines surf lessons, daily group workouts, and coastal exploration across Panama City and Santa Catalina. From skyline rooftop workouts in Casco Viejo to beach-break surf sessions on the Pacific coast, this 9-day trip balances sweat, culture, and serious fun — with group dinners, jungle hikes, and zero pressure to "find yourself."',

  quickFacts: [
    { label: 'Duration', value: '9 Days / 8 Nights' },
    { label: 'Dates', value: 'Mar 14–22, 2026' },
    { label: 'Location', value: 'Panama City + Santa Catalina' },
    { label: 'Per Day', value: 'From $250' },
    { label: 'Group Size', value: '35–45 Guests' },
    { label: 'Fitness Level', value: 'All Levels' },
  ],

  included: [
    '8 nights accommodation (shared or private)',
    'Daily group workouts (strength, HIIT, functional)',
    'Daily yoga sessions (vinyasa + yin)',
    '2 surf lessons with local instructors',
    'Jungle waterfall hike with guide',
    'All breakfasts and 5 group dinners',
    'Airport transfers (Tocumen + domestic)',
    'Domestic flight: Panama City → Santa Catalina',
    'Welcome cocktail reception in Casco Viejo',
    'SALTY crew support throughout',
    'WhatsApp group access pre- and post-trip',
  ],

  notIncluded: [
    'International flights to/from Panama City (PTY)',
    'Travel insurance (required)',
    'Meals not listed above',
    'Personal expenses and souvenirs',
    'Optional excursions (deep-sea fishing, island day trip)',
    'Visa fees (if applicable)',
  ],

  experienceNarrative: [
    'Panama is the retreat where city meets coast. You start in the historic streets of Casco Viejo — rooftop workouts with skyline views, evening walks through colonial architecture, and dinners that go later than planned (in the best way).',
    'Then you fly west to Santa Catalina, a small surf town on the Pacific where the pace slows down and the waves pick up. Mornings start with yoga on the beach, afternoons are for surfing or exploring, and evenings are for the kind of group dinners that make strangers feel like old friends.',
    'This is not a boot camp. It is not a detox. It is 9 days of moving your body, trying something new, eating well, and laughing more than you expected to.',
  ],

  forYouIf: [
    'You want a mix of city energy and beach relaxation',
    'You enjoy group fitness but also value downtime',
    'You have never surfed before (or want to get better)',
    'You travel solo and want a built-in crew',
    'You like exploring local food and culture',
    'You want to come home fitter than you left',
  ],

  experienceImageUrl: '/images/retreat/girl-surfing.png',

  bestFor: [
    'Solo travelers (65% of guests come alone)',
    'All fitness levels — workouts are scalable',
    'People who want adventure + structure',
    'Groups of friends looking for a curated trip',
  ],

  maybeNotFor: [
    'Anyone looking for silence, solitude, or meditation-heavy retreats',
    'People who prefer all-inclusive luxury resorts',
    'Travelers who want to plan every hour themselves',
    'Those uncomfortable in group settings of 35+',
  ],

  activities: [
    { name: 'SURF', description: 'Learn to ride Pacific swells with local instructors on Santa Catalina\'s consistent breaks. All equipment provided.', imageUrl: '/images/retreat/surf-lesson.png', frequency: '2 lessons included', videoPlaceholderId: 'WHQUq4Pu4Hg', modalDetails: 'Local instructors in Santa Catalina have surfed these breaks for decades and have a talent for getting complete beginners standing on a board on day one. Your retreat includes two full group surf clinics — boards, rash vests, and safety briefing all provided. Santa Catalina offers consistent, beginner-friendly Pacific breaks with the occasional challenge wave for the more experienced.' },
    { name: 'SWEAT', description: 'Beach HIIT & functional training led by SALTY coaches. Every session is scalable to your level.', imageUrl: '/images/retreat/erin-workout.png', frequency: 'Every morning', videoPlaceholderId: 'Gmxnh9tZrHs', modalDetails: 'Our signature HIIT sessions are designed on sand — which means every movement is harder, every rep counts double, and your stabiliser muscles work overtime. Sessions run 45–60 minutes and are fully scalable: coaches adapt intensity so beginners are challenged and athletes are broken in the best possible way. Expect compound movements, partner work, and the kind of finish that makes you want to do it again tomorrow.' },
    { name: 'FLOW', description: 'Sunrise yoga & breathwork. Vinyasa flow to start the day and yin yoga to wind down.', imageUrl: '/images/retreat/beach-core.png', frequency: 'Daily practice', videoPlaceholderId: 'uJ6YccG892U', modalDetails: 'Every morning before breakfast, Riley leads a 40-minute outdoor vinyasa flow on the beach or clifftop. Sessions focus on mobility, breathwork, and setting intention — the perfect counter-balance to high-intensity mornings. Completely optional, but once you feel the Pacific sunrise on your face in warrior pose, you will not miss another one. Mats and props provided.' },
    { name: 'EXPLORE', description: 'Jungle hikes, hidden waterfalls, and Casco Viejo culture walks. Guided excursions.', imageUrl: '/images/retreat/sand-dune-run.png', frequency: 'Guided excursions', videoPlaceholderId: 'MtuxUwGmBC0', modalDetails: 'Your time in Panama includes both city and nature exploration. In Panama City, wander the cobblestone streets of Casco Viejo — UNESCO heritage site, colonial architecture, and the best ceviche you will ever eat. In Santa Catalina, trek through tropical jungle to a hidden waterfall — moderate trail, maximum payoff. The swimming hole at the end is worth every step.' },
    { name: 'CONNECT', description: 'Group dinners, sunset beers, and the kind of conversations that happen when strangers show up for themselves.', imageUrl: '/images/retreat/palapa-laughing.png', frequency: 'Every evening', videoPlaceholderId: 'T_2LVHSVIeU', modalDetails: 'Five curated group dinners at the best local restaurants — from Casco Viejo rooftops to beachfront seafood in Santa Catalina. These are not formal affairs. They are long tables, shared plates, and the kind of nights that go later than planned. The evenings without scheduled dinners are just as good — the group naturally gravitates together.' },
    { name: 'DANCE', description: 'Let loose — theme nights, bonfire parties, and the SALTY farewell celebration.', imageUrl: '/images/retreat/night-party.png', frequency: 'Theme nights', videoPlaceholderId: 'sdQQdR6gFc0', modalDetails: 'SALTY retreats are not all sweat and no play. Theme nights, bonfire gatherings, and the legendary farewell party are built into the schedule. This is where the group bonds beyond the workout — where dance floors are made from sand and the DJ is whoever grabs the speaker first.' },
  ],

  dailyRhythm: [
    { period: 'Morning', description: 'Yoga or mobility flow (7:00), followed by breakfast at the hotel. Optional sunrise surf on beach days.' },
    { period: 'Midday', description: 'Group workout (10:00–11:00). Strength, HIIT, or functional — always scalable. Refuel with lunch on your own.' },
    { period: 'Afternoon', description: 'Free time: surf, explore, nap, pool, or join an optional excursion. Your call.' },
    { period: 'Evening', description: 'Group dinner (on scheduled nights) or explore the local food scene. Post-dinner hangs happen naturally.' },
  ],

  itinerary: [
    { day: 1, title: 'Arrival in Panama City', location: 'Panama City', summary: 'Arrive at Tocumen International (PTY). Airport transfer to Casco Viejo hotel. Welcome cocktail reception and group meet.', details: 'Fly into Tocumen International Airport (PTY). Your SALTY crew meets you at the airport with transfers to our hotel in Casco Viejo, the historic heart of Panama City. Settle in, explore the cobblestone streets, and join us for a welcome cocktail on the rooftop terrace. This is where you meet the group — and realize you already like these people. Dinner is on your own tonight; we will share our neighborhood favorites.', photoUrl: '/images/retreat/palapa-laughing.png' },
    { day: 2, title: 'City Sweat & Casco Viejo', location: 'Panama City', summary: 'Rooftop workout, city walking tour, group dinner at a Casco Viejo restaurant.', details: 'Morning yoga with skyline views, followed by a rooftop HIIT session overlooking the Bay of Panama. After breakfast, join an optional walking tour of Casco Viejo — street art, history, coffee stops. Afternoon is free to explore the city, hit the pool, or rest. Evening: our first group dinner at one of Casco Viejo\'s best restaurants.', photoUrl: '/images/retreat/beach-squats.png' },
    { day: 3, title: 'Panama City to Santa Catalina', location: 'In Transit → Santa Catalina', summary: 'Morning workout, domestic flight west, arrive in Santa Catalina. Beach sunset.', details: 'Early morning functional fitness session before we pack up. Short domestic flight from Panama City to the Veraguas coast, then a scenic drive to Santa Catalina. Check into our beachfront property, grab lunch, and spend the afternoon settling into surf-town pace. Sunset on the beach is non-negotiable.', photoUrl: '/images/retreat/surf-lesson.png' },
    { day: 4, title: 'First Surf Day', location: 'Santa Catalina', summary: 'Beach yoga, first surf lesson, afternoon free, group dinner.', details: 'Sunrise yoga on the sand to open up the body. After breakfast, your first surf lesson with local instructors — Santa Catalina has some of the most consistent beginner-friendly waves in Central America. Afternoon is yours: more surf, pool time, beach reading, or a walk to Playa El Estero. Group dinner at a beachfront restaurant tonight.', photoUrl: '/images/retreat/girl-surfing.png' },
    { day: 5, title: 'Jungle Waterfall Hike', location: 'Santa Catalina', summary: 'Morning strength workout, guided jungle hike to waterfall, evening free.', details: 'Morning strength session on the beach, then we head into the jungle for a guided hike to a hidden waterfall. Moderate trail through tropical forest — the swimming hole at the end is worth every step. Back to base for a late lunch and free afternoon. No group dinner tonight — explore Santa Catalina\'s taco stands and ceviche spots on your own.', photoUrl: '/images/retreat/sand-dune-run.png' },
    { day: 6, title: 'Surf & Sweat', location: 'Santa Catalina', summary: 'Second surf lesson, midday HIIT, afternoon free, group dinner.', details: 'Back in the water for your second surf lesson — building on Day 4, you will be surprised how much you remember. Midday high-intensity interval session on the beach (scalable, always). Afternoon free for optional activities: deep-sea fishing, island day trip to Coiba, or straight to the hammock. Group dinner tonight — this one tends to go late.', photoUrl: '/images/retreat/beach-core.png' },
    { day: 7, title: 'Recovery & Explore', location: 'Santa Catalina', summary: 'Yin yoga, optional surf or excursion, free afternoon, group dinner.', details: 'Slow start today. Long yin yoga session to restore the body after a full week of movement. Optional free surf session for those who want more water time, or join a boat trip to Coiba National Park (additional cost). This is a true recovery day — the pace is yours. Final group dinner in Santa Catalina tonight; bring your appetite and your stories.', photoUrl: '/images/retreat/erin-pool.png' },
    { day: 8, title: 'Last Workout & Farewell Prep', location: 'Santa Catalina', summary: 'Final group workout, beach time, farewell dinner.', details: 'The last group workout is always the best one — you know the crew, you know the moves, and you know how far you have come in a week. Beach morning, free afternoon, and then our farewell dinner. Expect speeches (the funny kind), group photos, and at least one person saying "same time next year?"', photoUrl: '/images/retreat/palapa-workout.png' },
    { day: 9, title: 'Departure', location: 'Santa Catalina → Panama City', summary: 'Transfer to airport, flights home. WhatsApp group lives on.', details: 'Transfers arranged to get you back to Tocumen International (PTY) for your flight home. Some people extend their trip (we can help with recommendations). The WhatsApp group does not end when the retreat does — you are part of the SALTY community now.', photoUrl: '/images/retreat/nate-water.png' },
  ],

  roomTiers: [
    {
      name: 'Standard Double',
      price: 2249,
      description: 'Shared room with one other guest (same gender). Comfortable, clean, and social — most popular for solo travelers.',
      features: ['Shared occupancy (2 per room)', 'Air conditioning', 'Private bathroom', 'Daily housekeeping', 'Wi-Fi'],
      imageUrl: '/images/retreat/palapa-workout.png',
    },
    {
      name: 'Premium Double',
      price: 2699,
      description: 'Upgraded shared room with premium bedding, better views, and extra space. Share with a friend or get paired.',
      features: ['Shared occupancy (2 per room)', 'Premium bedding & linens', 'Ocean or garden view', 'Air conditioning', 'Private bathroom', 'Mini-fridge'],
      imageUrl: '/images/retreat/erin-pool.png',
    },
    {
      name: 'Private Room',
      price: 3499,
      description: 'Your own room for the full trip. Perfect if you want your own space to recharge between group activities.',
      features: ['Single occupancy', 'Premium bedding & linens', 'Best available view', 'Air conditioning', 'Private bathroom', 'Mini-fridge', 'Extra closet space'],
      imageUrl: '/images/retreat/surfboard-walk.png',
    },
  ],

  accommodation: {
    name: 'Casco Viejo Boutique Hotel & Santa Catalina Beach Lodge',
    description: 'Two properties, two vibes. In Panama City, we stay in a restored colonial boutique hotel in the heart of Casco Viejo — walkable to restaurants, bars, and the waterfront. In Santa Catalina, a beachfront surf lodge with pools, open-air common spaces, and the Pacific Ocean as your backyard.',
    features: ['Pool', 'Beachfront access', 'Wi-Fi throughout', 'Air conditioning', 'Rooftop terrace (Panama City)', 'Open-air yoga deck (Santa Catalina)', 'On-site restaurant'],
  },

  coaches: [
    {
      // Figma: Property 2=Erin — dark teal card · rust-red star · golden text
      name: 'Erin Harris',
      bio: 'SALTY co-founder. Certified Personal Trainer (CPT) and RYT-200 yoga instructor. Erin designs every retreat experience and leads yoga sessions. She is the reason the vibes are always right.',
      specialties: ['Yoga', 'Experience Design'],
      personality: 'The Vibe Architect',
      cardColor: '#0E3A2D', // --salty-primary/dark-teal
      starColor: '#C74235', // --salty-secondary/rust-red
      textColor: '#FED260', // --salty-primary/golden-sun
      photoUrl: '/images/retreat/erin-pool.png',
    },
    {
      // Figma: Property 2=Nate — sand card · aquamarine star · dark teal text
      name: 'Nate Behar',
      bio: 'SALTY co-founder and former CFL athlete. Nate handles operations and jumps into workouts when he is not running logistics. He will outwork you and then buy you a beer.',
      specialties: ['Operations', 'Fitness'],
      personality: 'The Engine',
      cardColor: '#E7D7C0', // --salty-primary/sand
      starColor: '#A4E5D9', // --salty-primary/aquamarine
      textColor: '#0E3A2D', // --salty-primary/dark-teal
      photoUrl: '/images/retreat/nate-water.png',
    },
    {
      // Figma: Property 2=Joe — golden card · dark teal star · rust-red text
      name: 'Joe Rios',
      bio: 'Strength and conditioning specialist who believes every workout should be hard, fun, and scalable. Joe programs all the SALTY workouts and will never let you phone it in.',
      specialties: ['Strength', 'HIIT', 'Conditioning'],
      personality: 'The Hype Man',
      cardColor: '#FED260', // --salty-primary/golden-sun
      starColor: '#0E3A2D', // --salty-primary/dark-teal
      textColor: '#C74235', // --salty-secondary/rust-red
      photoUrl: '/images/retreat/sand-dune-run.png',
    },
    {
      name: 'Riley Bennett',
      bio: 'Yoga and movement coach specializing in vinyasa and mobility work. Riley makes flexibility fun and will convince you that a 6 AM yoga session is the best decision you have ever made.',
      specialties: ['Vinyasa', 'Mobility'],
      personality: 'The Morning Person',
      cardColor: '#FF7E70', // bright coral
      starColor: '#0E3A2D', // dark teal
      textColor: '#FED260', // golden — completes the triad
      photoUrl: '/images/retreat/palapa-workout.png',
    },
    {
      name: 'Jace Graham',
      bio: 'Surf coach and water sports specialist. Jace grew up on the Pacific coast and has been teaching surfing for over a decade. Equal parts patient and hype, he will have you standing on a board by session two.',
      specialties: ['Surf', 'Water Sports'],
      personality: 'The Wave Whisperer',
      cardColor: '#3A6B35', // palm green
      starColor: '#FED260', // golden
      textColor: '#FF7E70', // coral — completes the triad
      photoUrl: undefined,
    },
  ],

  saltyMeter: {
    sweat: 7,
    adventure: 7,
    party: 7,
    rest: 6,
    culture: 8,
    groupSize: 7, // 35–45 guests; scale: 1 = ~6 guests, 10 = 60+
  },

  saltyMeterBlurb: 'Panama runs hot across the board — high sweat, high adventure, high culture — with enough rest built in to keep it sustainable. The culture score reflects the real immersion on offer: Casco Viejo is not a backdrop, it is part of the programme. Party energy is social and grounded — long dinners and good people, not nightclubs.',

  testimonials: [
    {
      guestName: 'Sarah M.',
      quote: 'I came alone and left with 30 new friends. The workouts were challenging, the surf was humbling, and the group dinners were the highlight of my year.',
      rating: 5,
      retreatLabel: 'Panama 2025',
    },
    {
      guestName: 'James T.',
      quote: 'I have done other fitness retreats and they felt like boot camps. SALTY felt like a vacation that happened to include incredible workouts. Cannot wait to go back.',
      rating: 5,
      retreatLabel: 'Panama 2025',
    },
    {
      guestName: 'Priya K.',
      quote: 'The balance between structured activities and free time was perfect. I never felt rushed or bored. Also, the Casco Viejo rooftop workout was unforgettable.',
      rating: 5,
      retreatLabel: 'Panama 2025',
    },
  ],

  faqs: [
    {
      question: 'Do I need to be fit to join?',
      answer: 'No. Every workout is scalable — our coaches offer modifications for all levels. We have had complete beginners and competitive athletes on the same trip. You set your own pace.',
    },
    {
      question: 'I have never surfed before. Is that okay?',
      answer: 'Absolutely. Most of our guests are first-time surfers. The lessons in Santa Catalina are designed for beginners, with patient local instructors and forgiving waves.',
    },
    {
      question: 'What if I am traveling solo?',
      answer: 'You are in good company — 65% of our guests come solo. The group dynamic is a huge part of the SALTY experience. You will meet people at the welcome reception and have a crew by Day 2.',
    },
    {
      question: 'What is included in the price?',
      answer: 'Accommodation, all workouts and yoga sessions, 2 surf lessons, the jungle hike, airport transfers, domestic flight, all breakfasts, 5 group dinners, and the welcome reception. See the full list above.',
    },
    {
      question: 'How do payments work?',
      answer: 'A $350 deposit secures your spot. The remaining balance is split into monthly installments, due in full 60 days before the retreat start date.',
    },
    {
      question: 'Can I extend my trip before or after?',
      answer: 'Yes! Many guests add a few days in Panama City or on the San Blas Islands. We can share recommendations and help with logistics.',
    },
    {
      question: 'What is the cancellation policy?',
      answer: 'Full refund (minus deposit) if you cancel 90+ days before the retreat. 50% refund for 60-89 days. No refund within 60 days. We strongly recommend travel insurance.',
    },
    {
      question: 'Is travel insurance required?',
      answer: 'Yes. We require all guests to have travel insurance that covers trip cancellation, medical emergencies, and evacuation. We can recommend providers.',
    },
    {
      question: 'What is the group size?',
      answer: '35–45 guests per retreat. Large enough to meet a variety of people, small enough that the coaches know your name.',
    },
    {
      question: 'What should I pack?',
      answer: 'Workout clothes, swimwear, sunscreen, a reusable water bottle, comfortable walking shoes, and something nice-ish for group dinners. We send a full packing list after booking.',
    },
  ],

  youtubeVideoIds: ['Gmxnh9tZrHs', 'WHQUq4Pu4Hg', 'uJ6YccG892U'],

  villaPhotos: [
    '/images/MDF_Dining_1772190377024.jpg',
    '/images/DSC02802_1772190377025.JPG',
    '/images/DSC02847_1772190377025.JPG',
    '/images/95DCFB78-0828-40BD-9FEF-2D0FB9FDC872_1772190377025.jpeg',
  ],

  sampleDay: [
    { time: '6:30 AM', label: 'Sunrise Surf' },
    { time: '8:30 AM', label: 'Breakfast' },
    { time: '10:00 AM', label: 'Group Workout' },
    { time: '12:00 PM', label: 'Lunch & Chill' },
    { time: '2:00 PM', label: 'Adventure' },
    { time: '5:00 PM', label: 'Yoga / Rest' },
    { time: '7:00 PM', label: 'Dinner' },
    { time: '9:00 PM', label: 'Nightlife' },
  ],

  videoTestimonials: [
    { id: 'MtuxUwGmBC0', name: 'Emma', label: 'Panama 2024' },
    { id: 'T_2LVHSVIeU', name: 'Jake', label: 'Panama 2024' },
    { id: 'sdQQdR6gFc0', name: 'Priya', label: 'Panama 2024' },
    { id: '2-wfCL1dAXM', name: 'Marcus', label: 'Panama 2024' },
  ],

  photoStripImages: [
    '/images/retreat/palapa-laughing.png',
    '/images/retreat/beach-squats.png',
    '/images/retreat/girl-surfing.png',
    '/images/retreat/night-party.png',
  ],

  paymentPolicy:
    'A $350 USD deposit is required to secure your spot. The remaining balance is split into equal monthly installments, with the full amount due 60 days before the retreat start date. All payments are processed securely through Stripe.',

  cancellationPolicy:
    'Cancel 90+ days before the retreat for a full refund minus the $350 deposit. Cancel 60–89 days before for a 50% refund. No refunds within 60 days of the retreat start date. Travel insurance is strongly recommended and required for all guests.',
};

/* ═══════════════════════════════════════════════════════════════════════
   MOROCCO — BEYOND THE DUNES
   ═══════════════════════════════════════════════════════════════════════ */

export const MOROCCO_RETREAT: RetreatData = {
  slug: 'morocco-fitness-retreat',
  destination: 'Morocco',
  officialName: 'Beyond the Dunes',
  heroImageUrl: '/images/retreat/placeholder.png', // TODO: replace with Sanity hero image
  status: 'active',
  country: 'Morocco',
  location: 'Taghazout',
  skillLevel: 'all-levels',
  soloTravelerPercent: 70,
  depositAmount: 350,
  bookingUrl: '/book/morocco-fitness-retreat',
  dates: {
    start: '2026-05-16',
    end: '2026-05-23',
    display: 'May 16–23, 2026',
  },
  duration: 8,
  priceFrom: 1999,
  groupSize: '20–25',

  geoDescription:
    'A Morocco fitness retreat that blends Atlantic surf sessions, daily SALTY workouts, and deep cultural immersion in a laid-back surf village on the coast. From souk bartering in Agadir to sunrise flows overlooking the ocean in Taghazout, this 8-day trip is SALTY at its most intimate and adventurous — small group, big experiences, and zero tourist bubble.',

  quickFacts: [
    { label: 'Duration', value: '8 Days / 7 Nights' },
    { label: 'Dates', value: 'May 16–23, 2026' },
    { label: 'Location', value: 'Taghazout, Morocco' },
    { label: 'Per Day', value: 'From $250' },
    { label: 'Group Size', value: '20–25 Guests' },
    { label: 'Fitness Level', value: 'All Levels' },
  ],

  included: [
    '7 nights at Surf and Friends Lodge, Taghazout',
    'Daily SALTY workouts and yoga sessions',
    'Multiple surf days including a day trip to Imsouane',
    'Guided Paradise Valley adventure',
    'Local souk exploration excursion',
    'Airport transfers from Agadir (AGA)',
    'Ground transportation between locations',
    'Daily breakfast, 3 lodge lunches, 2 café lunches, 5 group dinners',
    'Welcome drinks on arrival',
    'Hosted nights out',
    'Welcome swag',
    'Professional photography',
  ],

  notIncluded: [
    'International flights to/from Morocco (Agadir AGA preferred)',
    'Travel insurance (strongly recommended)',
    'Select meals for independent exploration',
    'Additional spa treatments or hammam experiences',
    'Alcoholic drinks beyond hosted events',
    'Gratuities for staff',
  ],

  experienceNarrative: [
    'Morocco is the retreat where adventure meets culture head-on. You wake up to the sound of the Atlantic and the call to prayer. Mornings start with SALTY workouts on the rooftop or beach, then you paddle out at Anchor Point or Banana Beach — world-class surf breaks right at your doorstep.',
    'Off the board, this trip goes deep. Paradise Valley swimming holes, bartering for spices in colorful souks, mint tea with locals who have lived on this coast for generations. The food alone — tagines, grilled sardines, couscous Fridays — will change how you think about meals.',
    'This is SALTY at its smallest and most connected. Twenty-something people sharing an experience that most travelers never find on their own. The group gets tight fast when every day ends with sunset over the Atlantic and a table full of food you did not expect to be this good.',
  ],

  experienceImageUrl: '/images/retreat/placeholder.png', // TODO: Sanity

  forYouIf: [
    'You crave adventure and cultural immersion over poolside lounging',
    'You want to surf world-class Atlantic breaks with patient instructors',
    'You value small group energy where everyone knows your name',
    'You travel solo and want a crew without the awkward icebreakers',
    'You are curious about North African culture, food, and traditions',
    'You want to be pushed physically but on your own terms',
  ],

  bestFor: [
    'Solo travelers who want deep connection (70%+ come solo)',
    'Adventure seekers — this is SALTY\'s highest-adventure retreat',
    'Culture lovers who want more than a tourist checklist',
    'Surfers of any level — from first-timers to experienced riders',
  ],

  maybeNotFor: [
    'Anyone looking for luxury resort vibes or poolside lounging',
    'People who prefer large, high-energy party scenes',
    'Travelers uncomfortable with unfamiliar cultural environments',
    'Those who need consistent high-speed Wi-Fi and connectivity',
  ],

  activities: [
    { name: 'SURF', description: 'Multiple surf sessions at Taghazout\'s legendary breaks — Anchor Point, Banana Beach, and a day trip to the long rolling waves of Imsouane.', frequency: '3+ sessions', modalDetails: 'Taghazout is one of Morocco\'s premier surf destinations. Your retreat includes multiple surf days with local instructors who know every break on this coastline. From the point breaks at Anchor Point to the gentle rollers at Banana Beach, sessions are adapted to your level. The highlight is a day trip south to Imsouane — famous for the longest rideable wave in Africa.' },
    { name: 'SWEAT', description: 'Daily SALTY workouts — rooftop circuits, beach HIIT, and functional training with Atlantic views as your backdrop.', frequency: 'Every morning', modalDetails: 'Morning workouts hit different when the Atlantic is your gym floor. Expect rooftop circuits at the lodge, sand-based HIIT on the beach, and functional strength sessions that will challenge every level. Coaches scale everything — beginners get modifications, athletes get crushed. The endorphin-to-sunset ratio on this trip is unmatched.' },
    { name: 'FLOW', description: 'Yoga and mobility sessions to balance out the surf and strength work. Sunrise flows with ocean views.', frequency: 'Daily practice', modalDetails: 'Yoga sessions run as the perfect counter to the high-intensity mornings. Sunrise flows on the rooftop terrace overlooking the Atlantic, restorative yin sessions after surf days, and mobility work designed specifically to support your body through a week of movement. Open to all levels — no yoga experience needed.' },
    { name: 'EXPLORE', description: 'Paradise Valley swimming holes, souk bartering, fishing village walks, and dune adventures along the coast.', frequency: 'Guided excursions', modalDetails: 'Paradise Valley is a hidden canyon with turquoise swimming holes carved into red rock — the kind of place that does not show up in most guidebooks. Souk excursions take you through the markets of Agadir where you can practice your bartering skills on leather goods, argan oil, and spices. Walking through Taghazout\'s fishing village at golden hour is an experience in itself.' },
    { name: 'CONNECT', description: 'Intimate group dinners featuring tagines, fresh-caught fish, and rooftop feasts under the stars. Small group, deep bonds.', frequency: 'Every evening', modalDetails: 'With only 20–25 guests, Morocco is where the group becomes a family. Five curated group dinners at the lodge and local restaurants — tagines slow-cooked for hours, grilled sardines straight from the Atlantic, couscous Fridays that feel like being invited into someone\'s home. The small group means conversations go deeper and faster.' },
    { name: 'CULTURE', description: 'Traditional hammam spa, mint tea ceremonies, and authentic experiences that go well beyond the tourist trail.', frequency: 'Woven throughout', modalDetails: 'Morocco scores a 10 on the SALTY Culture meter for a reason. This is not a surface-level tourist experience. Hammam visits, tea ceremonies, conversations with local surfers and fishermen — the cultural immersion is built into the fabric of every day, not bolted on as optional excursions.' },
  ],

  dailyRhythm: [
    { period: 'Morning', description: 'Sunrise yoga on the rooftop (7:00), followed by breakfast at the lodge. Morning surf session or SALTY workout.' },
    { period: 'Midday', description: 'Lunch at the lodge or a local café. Free time to explore Taghazout village, nap, or journal.' },
    { period: 'Afternoon', description: 'Adventure block: surf, excursion, or cultural exploration. Second workout for those who want it.' },
    { period: 'Evening', description: 'Group dinner at the lodge or a local restaurant. Rooftop hangs, sunset views, hosted nights out.' },
  ],

  itinerary: [
    { day: 1, title: 'Arrival in Taghazout', location: 'Taghazout', summary: 'Airport transfer from Agadir, settle into Surf and Friends Lodge. Welcome drinks and group introductions on the rooftop terrace.', details: 'Fly into Agadir Al Massira Airport (AGA). Your SALTY crew picks you up with a transfer straight to Taghazout — a 45-minute drive along the coast that sets the scene for the week. Check into Surf and Friends Lodge, unpack, and explore the village. Evening welcome drinks on the rooftop terrace overlooking the Atlantic. This is where you meet your crew for the next eight days — and the vibe clicks faster than you expect when the group is this small.' },
    { day: 2, title: 'First Sweat & First Waves', location: 'Taghazout', summary: 'Morning SALTY workout, first surf session at Banana Beach, rooftop yoga at sunset.', details: 'The week starts with a bang. Morning rooftop workout to shake off the travel, then straight to the beach for your first surf session at Banana Beach — forgiving waves, warm water, local instructors who have been riding these breaks their whole lives. Afternoon free to explore the village or rest. Sunset yoga on the terrace, then the first group dinner at the lodge — traditional Moroccan tajine that slow-cooked all afternoon.' },
    { day: 3, title: 'Paradise Valley Adventure', location: 'Paradise Valley + Taghazout', summary: 'Morning workout, day trip to Paradise Valley swimming holes, evening souk exploration.', details: 'After a morning beach workout, we pile into the vans for the drive to Paradise Valley — a hidden canyon of turquoise swimming holes carved into red rock. Jump from cliff edges (optional), swim in pools that look photoshopped, and eat a traditional Berber lunch at a canyon-side restaurant. Evening trip to the Agadir souk for those who want to barter for leather goods, spices, and argan oil. Group dinner tonight at a local seafood spot.' },
    { day: 4, title: 'Imsouane Day Trip', location: 'Imsouane', summary: 'Full day trip south to Imsouane for surfing, lunch by the harbour, and sunset on the longest wave in Africa.', details: 'The surf highlight of the trip. We drive south along the coast to Imsouane — a sleepy fishing village famous for having the longest rideable wave in Africa. Beginners and experienced surfers alike will love this spot. Surf in the morning, lunch at a harbour-side café, more waves in the afternoon. The drive back along the coast at sunset is worth the trip alone. Dinner on your own tonight — the lodge kitchen does killer late-night snacks.' },
    { day: 5, title: 'Anchor Point & Sweat', location: 'Taghazout', summary: 'Beach HIIT, surf session at Anchor Point, afternoon free, hammam spa experience.', details: 'Morning beach HIIT session — sand under your feet, Atlantic breeze, and a workout that earns every calorie of the tagine you ate last night. After breakfast, those who want more waves head to Anchor Point — Taghazout\'s most famous break. Afternoon is genuinely free — sleep, journal, walk the cliffs, or explore the fishing village. Late afternoon: traditional hammam experience. Scrub, steam, reset. Group dinner on the rooftop tonight.' },
    { day: 6, title: 'Culture Day', location: 'Taghazout + Amouage', summary: 'Yoga and mobility, cultural exploration, café lunch in the village, hosted night out.', details: 'A change of pace. Morning yoga and mobility session to let the body recover from five days of surf and sweat. Late morning cultural exploration — walking through Taghazout\'s oldest streets, meeting local artisans, and learning about the Amazigh heritage of this coast. Lunch at a local café with views you will not forget. Afternoon free. Evening: hosted night out — the SALTY crew picks the spot and covers the first round.' },
    { day: 7, title: 'Last Surf & Farewell Dinner', location: 'Taghazout', summary: 'Final SALTY workout, last surf session, golden hour photos, farewell group dinner.', details: 'The last full day is always the most bittersweet. Final group workout — you know the crew, you know the moves, and you know how far you have come in a week. Last surf session at your favourite break from the week. Golden hour photo session on the cliffs. Then the farewell dinner — the lodge pulls out all the stops. Expect speeches (the funny kind), a long table, and at least three people already planning their next SALTY trip.' },
    { day: 8, title: 'Departure', location: 'Taghazout → Agadir', summary: 'Airport transfers to Agadir. Hugs, sandy suitcases, and a WhatsApp group that never dies.', details: 'Airport transfers run from the lodge to Agadir Al Massira Airport (AGA) in the morning. Some people extend — Marrakesh is a short flight or drive away and worth a few extra days. The WhatsApp group does not end when the retreat does — you are part of the SALTY community now.' },
  ],

  roomTiers: [
    {
      name: 'Dorm',
      price: 1999,
      description: 'Single bed in a shared dorm room. The most social option — perfect for solo travelers who want the full communal experience.',
      features: ['Shared dorm (up to 8 guests)', 'Single bed', 'Shared bathroom', 'Daily housekeeping', 'Wi-Fi'], // TODO: update with actual venue features
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Shared Room',
      price: 2149,
      description: 'Bed in a shared room with 2 other guests. Book with friends or get paired with fellow travelers.',
      features: ['3 guests per room', 'Single beds', 'Shared bathroom', 'Daily housekeeping', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Double Room',
      price: 2399,
      description: 'Share with one other guest. King bed (couples) or twin beds. Book with a friend or get paired.',
      features: ['2 guests per room', 'King or twin beds', 'Private bathroom', 'Daily housekeeping', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Single Room',
      price: 3199,
      description: 'Your own private room with a king bed and private bathroom. Your space to recharge after full days.',
      features: ['Single occupancy', 'King bed', 'Private bathroom', 'Daily housekeeping', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
  ],

  accommodation: {
    name: 'Surf and Friends Lodge',
    description: 'A laid-back surf lodge in the heart of Taghazout, steps from the beach. Rooftop terrace with panoramic Atlantic views, communal spaces designed for connection, and the kind of atmosphere where strangers become friends over mint tea and sunset sessions.',
    features: ['Rooftop terrace with ocean views', 'Beachfront location', 'Wi-Fi throughout', 'Communal lounge areas', 'Yoga deck', 'Surf board storage', 'On-site meals'], // TODO: confirm venue features
  },

  coaches: [
    {
      name: 'Erin Harris',
      bio: 'SALTY co-founder. Certified Personal Trainer (CPT) and RYT-200 yoga instructor. Erin designs every retreat experience and leads yoga sessions. She is the reason the vibes are always right.',
      specialties: ['Yoga', 'Experience Design'],
      personality: 'The Vibe Architect',
      cardColor: '#0E3A2D',
      starColor: '#C74235',
      textColor: '#FED260',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity coach photo
    },
    {
      name: 'Nate Behar',
      bio: 'SALTY co-founder and former CFL athlete. Nate handles operations and jumps into workouts when he is not running logistics. He will outwork you and then buy you a beer.',
      specialties: ['Operations', 'Fitness'],
      personality: 'The Engine',
      cardColor: '#E7D7C0',
      starColor: '#A4E5D9',
      textColor: '#0E3A2D',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity coach photo
    },
    {
      name: 'Josh Towell',
      bio: 'Yoga instructor and active listener. Josh brings a grounded, calming energy to the mat and an infectious love of karaoke off it. His sessions blend deep stretches with moments of stillness that hit different after a week of surf and sweat.', // TODO: replace with full bio from Sanity
      specialties: ['Yoga', 'Active Listening'],
      personality: 'The Grounding Force',
      cardColor: '#B6D4EA',
      starColor: '#0E3A2D',
      textColor: '#F7F4ED',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity coach photo
    },
  ],

  saltyMeter: {
    sweat: 8,
    adventure: 9,
    party: 3,
    rest: 4,
    culture: 10,
    groupSize: 4,
  },

  saltyMeterBlurb: 'Morocco is SALTY at its most culturally immersive — a perfect 10 on the culture scale, with adventure close behind. The sweat is real but the party is mellow; this trip replaces dance floors with rooftop sunsets and souk wandering. Rest is earned, not scheduled. The small group size means every experience feels personal.',

  testimonials: [
    {
      guestName: 'Placeholder Guest',
      quote: 'Testimonials coming soon — check back after the retreat.',
      rating: 5,
      retreatLabel: 'Morocco 2025',
    },
  ],

  faqs: [
    {
      question: 'What is included in the retreat price?',
      answer: 'Everything except international flights: 7 nights beachfront accommodation in Taghazout, meals featuring traditional Moroccan cuisine (daily breakfast, 3 lodge lunches, 2 café lunches, 5 group dinners), daily fitness and yoga classes, surf lessons with local instructors, cultural excursions including Paradise Valley and souk exploration, airport transfers from Agadir, all equipment, and ground transportation.',
    },
    {
      question: 'What are the room types and prices?',
      answer: 'Single Room — $3,199 per person. Double Room — $2,399 per person. Shared Room (3 guests) — $2,149 per person. Dorm Room — $1,999 per person. All prices are all-inclusive per person for the full retreat.',
    },
    {
      question: 'Which airport should I fly into?',
      answer: 'Agadir Al Massira Airport (AGA) is preferred — it is the closest airport with a 45-minute transfer to Taghazout. Marrakesh (RAK) is also possible but requires a longer transfer. Airport pickups run on May 16 until 6pm, with early morning shuttles back on May 23.',
    },
    {
      question: 'Is Morocco safe for solo travellers?',
      answer: 'Yes. Morocco is a popular destination for travelers from all over the world. We recommend staying aware of your surroundings, dressing respectfully, and embracing the adventure with an open mind. The retreat is designed to create a safe, welcoming space — and our small group size means you are never navigating alone.',
    },
    {
      question: 'What kind of food can I expect?',
      answer: 'Moroccan cuisine — tagines, grilled vegetables, couscous, fresh-caught fish, and vibrant spices. All dietary needs are accommodated (vegetarian, vegan, gluten-free, specific allergies). Just let us know in advance.',
    },
    {
      question: 'How much cash should I bring?',
      answer: 'Many places accept credit cards, but cash is king in souks, smaller shops, and local restaurants. ATMs are widely available. We recommend withdrawing Moroccan Dirhams (MAD) on arrival. Tipping is common and appreciated.',
    },
    {
      question: 'What is the weather like in May?',
      answer: 'Sunny days and cooler evenings on the coast. Taghazout in May averages 22–26°C during the day with comfortable evenings. Layers are recommended for after-sunset activities.',
    },
    {
      question: 'Can I join the retreat alone?',
      answer: 'Absolutely — over 70% of guests come solo. With only 20–25 people on this trip, the small group dynamic means you will know everyone by name within 48 hours.',
    },
    {
      question: 'What level are the activities?',
      answer: 'All activities are designed to be accessible for all levels. Whether you are a seasoned surfer or stepping on a board for the first time, coaches adapt every session. Physical restrictions or injuries can be accommodated — just let us know.',
    },
    {
      question: 'How do payments work?',
      answer: 'A $350 deposit secures your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel.',
    },
    {
      question: 'What is the cancellation policy?',
      answer: 'All payments are non-refundable. Travel insurance is strongly recommended — Movement Travel can assist with this if needed.',
    },
  ],

  youtubeVideoIds: ['Gmxnh9tZrHs', 'WHQUq4Pu4Hg', 'uJ6YccG892U'], // TODO: replace with Morocco-specific videos

  paymentPolicy:
    'A $350 USD deposit is required to secure your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel.',

  cancellationPolicy:
    'All payments are non-refundable. Travel insurance is strongly recommended and Movement Travel can assist guests with obtaining coverage.',

  villaPhotos: [], // TODO: add Sanity accommodation photos
  sampleDay: [
    { time: '7:00 AM', label: 'Sunrise Yoga' },
    { time: '8:30 AM', label: 'Breakfast' },
    { time: '10:00 AM', label: 'Surf / Workout' },
    { time: '12:30 PM', label: 'Lunch & Chill' },
    { time: '2:30 PM', label: 'Adventure' },
    { time: '5:30 PM', label: 'Hammam / Free Time' },
    { time: '7:30 PM', label: 'Group Dinner' },
    { time: '9:30 PM', label: 'Rooftop Hangs' },
  ],
  videoTestimonials: [
    { id: '2-wfCL1dAXM', name: 'Shane L', label: 'El Salvador 2025' },
    { id: 'T_2LVHSVIeU', name: 'Keara J', label: 'Sicily 2024' },
    { id: 'sdQQdR6gFc0', name: 'Cindy T', label: 'El Salvador 2025' },
    { id: 'MtuxUwGmBC0', name: 'Connor C', label: 'El Salvador 2025' },
  ],
  photoStripImages: [], // TODO: add Sanity photo strip images
};

/* ═══════════════════════════════════════════════════════════════════════
   SICILY — ENDLESS SUMMER
   ═══════════════════════════════════════════════════════════════════════ */

export const SICILY_RETREAT: RetreatData = {
  slug: 'sicily-fitness-retreat',
  destination: 'Sicily',
  officialName: 'Endless Summer',
  heroImageUrl: '/images/retreat/placeholder.png', // TODO: Sanity hero image
  status: 'active',
  country: 'Italy',
  location: 'Maria del Focallo, Ragusa',
  skillLevel: 'all-levels',
  soloTravelerPercent: 60,
  depositAmount: 350,
  bookingUrl: '/book/sicily-fitness-retreat',
  dates: {
    start: '2026-08-09',
    end: '2026-08-16',
    display: 'August 9–16, 2026',
  },
  duration: 8,
  priceFrom: 2099,
  groupSize: '35–45',

  geoDescription:
    'A Sicily fitness retreat built for peak-summer energy — daily beach workouts, Zuma Beach Club lunches, bike rides through baroque towns, and the kind of group dinners that only Italian grandmothers can orchestrate. Eight days of high-sweat, high-party, carbs-without-guilt Ferragosto energy on the southern coast.',

  quickFacts: [
    { label: 'Duration', value: '8 Days / 7 Nights' },
    { label: 'Dates', value: 'Aug 9–16, 2026' },
    { label: 'Location', value: 'Maria del Focallo, Sicily' },
    { label: 'Per Day', value: 'From $262' },
    { label: 'Group Size', value: '35–45 Guests' },
    { label: 'Fitness Level', value: 'All Levels' },
  ],

  included: [
    '7 nights beachside at Maria del Focallo',
    'Daily breakfast at the venue',
    'Lunches at Zuma Beach Club (1–3pm daily)',
    'Select group dinners featuring Sicilian cuisine',
    'Daily SALTY workouts and yoga (high-intensity programming)',
    'Yoga space with equipment',
    'Beach access with sunbeds and umbrellas',
    '7 bikes for exploring the coast',
    '2 hosted cocktail evenings',
    'Siracusa cultural excursion',
    'Local pizza night out',
    'Vehicle for group excursions (fuel included)',
    'Airport transfers from Catania (CTA)',
    'Welcome swag',
    'Professional photography',
  ],

  notIncluded: [
    'International flights to/from Sicily (Catania CTA)',
    'Travel insurance (strongly recommended)',
    'Select dinners on own for local exploration',
    'Additional alcoholic drinks beyond hosted events',
    'Optional vineyard tours or coastal town excursions',
    'Gratuities for staff',
  ],

  experienceNarrative: [
    'Sicily is SALTY turned up to eleven. This retreat lands right in the middle of Ferragosto — Italy\'s peak summer celebration — and the energy is everywhere. You wake up, work out hard on the beach, then spend the afternoon with your feet in the sand at Zuma Beach Club. Aperol Spritzes are earned, not optional.',
    'Off the beach, the culture runs deep. Day trips to Siracusa — one of the oldest cities in the Western world. Group dinners at restaurants where the pasta is made by hand and the seafood was swimming that morning. Bike rides through baroque towns where every building looks like it belongs in a film.',
    'If you want quiet and restorative, this is not your retreat. If you want to train hard, eat outrageously well, dance under Mediterranean stars, and finish the week with a group that feels like family — welcome to the Endless Summer.',
  ],

  experienceImageUrl: '/images/retreat/placeholder.png', // TODO: Sanity

  forYouIf: [
    'You want the highest-energy retreat on the SALTY calendar',
    'You love Italian food and do not believe in portion control',
    'You want to earn your carbs with beach workouts and never feel guilty',
    'You enjoy beach club culture and long lunches that turn into long afternoons',
    'You want to explore Sicilian history and baroque architecture between sessions',
    'You are looking for peak summer vibes with a crew that goes hard',
  ],

  bestFor: [
    'The friend group that trains together and travels together',
    'Solo travelers who thrive in bigger, buzzier groups',
    'Fitness enthusiasts who want high-intensity daily programming',
    'Anyone who has said "I want to eat pasta in Italy and not feel bad about it"',
  ],

  maybeNotFor: [
    'Anyone seeking a quiet, restorative wellness retreat',
    'Travelers who prefer small, intimate group experiences (try Morocco)',
    'People uncomfortable with August Mediterranean heat',
    'Those who prefer structured, every-hour-planned itineraries',
  ],

  activities: [
    { name: 'SWEAT', description: 'High-intensity beach workouts, strength circuits, and the kind of training that makes Zuma Beach Club lunches taste even better.', frequency: 'Every morning', modalDetails: 'Sicily is SALTY\'s highest-sweat retreat for a reason. Morning workouts on the beach are intense — think sand sprints, partner circuits, compound movements, and finishers that leave you flat on the sand in the best way. Sessions run 50–60 minutes and are fully scalable. The coaches push hard because they know what is waiting at the beach club after.' },
    { name: 'FLOW', description: 'Yoga sessions to balance the intensity. Morning flows and evening wind-downs with the Mediterranean as your backdrop.', frequency: 'Daily practice', modalDetails: 'Yoga sessions are the antidote to the high-sweat mornings. Morning vinyasa flows are creative and music-driven. Evening yin sessions focus on deep release and recovery. The outdoor yoga space at the venue is purpose-built with all equipment provided.' },
    { name: 'BEACH CLUB', description: 'Daily lunches at Zuma Beach Club with sunbeds, music, and the Mediterranean at your feet. The reward for morning sweat.', frequency: 'Every afternoon', modalDetails: 'Zuma Beach Club is the heartbeat of the afternoon. After morning training, you settle into sunbeds on the sand for lunch — fresh seafood, Sicilian salads, local wines. The vibe is relaxed but social. This is where the group bonds over shared plates and the kind of afternoon that stretches until sunset.' },
    { name: 'EXPLORE', description: 'Siracusa day trip, bike rides through baroque towns, local pizza nights, and coastal exploration by bike.', frequency: 'Guided excursions', modalDetails: 'The Siracusa day trip is a highlight — one of the oldest continuously inhabited cities in the world, with Greek ruins, a vibrant market, and gelato that will ruin every other gelato for you. Seven bikes are available for coastal exploration. Pizza night takes you to a local spot where the oven has been running for decades.' },
    { name: 'CONNECT', description: 'Group dinners with fresh Sicilian seafood, handmade pasta, and tables that go late. Plus 2 hosted cocktail evenings.', frequency: 'Every evening', modalDetails: 'Group dinners in Sicily are next level. Fresh pasta made by hand, seafood caught that morning, wines from vineyards you can see from the table. Two hosted cocktail evenings mean the SALTY crew is behind the bar. The group is big enough (35–45) that every night feels like a party, but small enough that you know everyone by Day 3.' },
    { name: 'DANCE', description: 'Ferragosto energy meets SALTY nightlife. Themed evenings, beach club nights, and the kind of dancing that only happens in Italian summer.', frequency: 'Peak-summer nights', modalDetails: 'Sicily scores a 9 on the party meter for a reason. Ferragosto is Italy\'s biggest summer celebration and it lands right in the middle of this retreat. Expect themed nights, beach club evenings, and the kind of late nights where the Mediterranean breeze keeps you going. The farewell night is legendary.' },
  ],

  dailyRhythm: [
    { period: 'Morning', description: 'Beach workout (8:00–9:00) or morning yoga flow. Breakfast at the venue.' },
    { period: 'Midday', description: 'Head to Zuma Beach Club for lunch on the sand (1:00–3:00pm). Sunbeds, swimming, socialising.' },
    { period: 'Afternoon', description: 'Free time: bike ride, explore the coast, pool, nap, or optional second session. Your call.' },
    { period: 'Evening', description: 'Group dinner or explore local restaurants. Hosted cocktail nights and themed evenings.' },
  ],

  itinerary: [
    { day: 1, title: 'Arrival in Sicily', location: 'Maria del Focallo', summary: 'Airport transfer from Catania, settle into the beachside venue. Welcome cocktail evening on the terrace.', details: 'Fly into Catania Fontanarossa Airport (CTA). Transfers run to Maria del Focallo on the southeastern coast — about 90 minutes of some of the most beautiful coastal driving in Europe. Check in, claim your sunbed, and explore the beach. Evening welcome cocktail on the terrace — the SALTY crew is bartending and the Mediterranean sunset does the rest.' },
    { day: 2, title: 'First Beach Sweat', location: 'Maria del Focallo', summary: 'First morning beach workout, Zuma Beach Club lunch, free afternoon, first group dinner.', details: 'The tone gets set on Day 2. Morning beach workout to music — sand circuits, partner work, and your first taste of what SALTY sweat feels like in Italian summer. Recovery at Zuma Beach Club for lunch with your feet in the sand. Afternoon free to explore by bike, swim, or nap. First group dinner at a local restaurant — fresh pasta, fresh fish, and wine from the region.' },
    { day: 3, title: 'Double Session & Beach Day', location: 'Maria del Focallo', summary: 'Morning strength, yoga flow, full beach club afternoon, free evening to explore.', details: 'Double session morning — strength workout on the beach followed by a yoga flow to even things out. The reward: a full afternoon at Zuma Beach Club. Lunch on the sand, sunbeds, swimming, and the kind of relaxed afternoon that Italy does better than anywhere. Evening on your own to explore the local area — the nearby towns have excellent restaurants.' },
    { day: 4, title: 'Siracusa Excursion', location: 'Siracusa', summary: 'Morning workout, day trip to ancient Siracusa. Greek ruins, street food market, gelato, group dinner.', details: 'Morning beach workout to earn the day. Then we load up and drive to Siracusa — a city founded by the Greeks in 734 BC that still feels alive with history. Explore the island of Ortigia, wander the street food market, visit the ancient Greek amphitheatre, and eat gelato that will ruin all other gelato. Group dinner at a Siracusa restaurant before heading back to base.' },
    { day: 5, title: 'Peak Sweat & Free Afternoon', location: 'Maria del Focallo', summary: 'The hardest workout of the week. Full recovery afternoon at the beach club. Hosted cocktail evening.', details: 'Day 5 is the spiciest workout of the week — the coaches save the best for midweek when the group is locked in and the energy is peak. After that: a fully earned afternoon at Zuma Beach Club. Long lunch, sunbeds, swimming, and zero guilt. Hosted cocktail evening on the terrace — the second of two bartended nights.' },
    { day: 6, title: 'Bike Ride & Pizza Night', location: 'Maria del Focallo + nearby coast', summary: 'Morning yoga, optional bike ride along the coast, afternoon free, legendary pizza night out.', details: 'Slower morning — yoga flow and mobility session. Then grab one of the seven bikes and explore the coast. The cycling here is flat, scenic, and perfect for a leisurely ride through baroque towns. Afternoon free to swim, read, or just exist at the beach club. Evening: pizza night. A local spot where the oven has been running for longer than anyone can remember and the pizza is worth the entire trip.' },
    { day: 7, title: 'Final Workout & Farewell Night', location: 'Maria del Focallo', summary: 'Last group workout, beach day, golden hour photos, Ferragosto farewell celebration.', details: 'The final group workout is always the most emotional — and in Sicily, it is also the sweatiest. Beach session with everything the coaches have left, then a full day at the beach club. Golden hour group photos on the sand. The farewell dinner is the biggest of the week — long tables, Sicilian feast, and the kind of speeches that make people laugh and cry in the same sentence. Then the party. Ferragosto energy.' },
    { day: 8, title: 'Departure', location: 'Maria del Focallo → Catania', summary: 'Airport transfers to Catania. Arrivederci, not goodbye.', details: 'Morning transfers to Catania Fontanarossa Airport (CTA). Some people extend for a few days in Catania, Taormina, or the Aeolian Islands — we can help with recommendations. The WhatsApp group lives on. Arrivederci.' },
  ],

  roomTiers: [
    {
      name: 'Shared Room',
      price: 2099,
      description: 'Shared room with 3–4 other guests. The most social and affordable option — ideal for groups or solo travelers who want the communal experience.',
      features: ['4–5 guests per room', 'Single beds', 'Shared bathroom', 'Daily housekeeping', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Double Room',
      price: 2549,
      description: 'Shared with one other guest. King bed (couples) or twin beds. Book with a friend or get matched.',
      features: ['2 guests per room', 'King or twin beds', 'Private bathroom', 'Air conditioning', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Single Room',
      price: 3399,
      description: 'Your own private room with the best views. Recharge solo after days of maximum group energy.',
      features: ['Single occupancy', 'Premium bedding', 'Private bathroom', 'Air conditioning', 'Best available view', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
  ],

  accommodation: {
    name: 'Maria del Focallo Beachside Villa',
    description: 'A sprawling beachside property on Sicily\'s southeastern coast. Direct beach access, outdoor workout spaces, a terrace built for sunset cocktails, and Zuma Beach Club steps away. The venue is designed for groups — open-plan common areas, pool, and enough space to be social or disappear for a nap.',
    features: ['Direct beach access', 'Sunbeds and umbrellas', 'Outdoor yoga space', 'Pool', 'Terrace with sea views', '7 bikes for exploration', 'Zuma Beach Club on-site', 'Wi-Fi throughout'],
  },

  coaches: [
    {
      name: 'Erin Harris',
      bio: 'SALTY co-founder. Certified Personal Trainer (CPT) and RYT-200 yoga instructor. Erin designs every retreat experience and leads yoga sessions. She is the reason the vibes are always right.',
      specialties: ['Yoga', 'Experience Design'],
      personality: 'The Vibe Architect',
      cardColor: '#0E3A2D',
      starColor: '#C74235',
      textColor: '#FED260',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Nate Behar',
      bio: 'SALTY co-founder and former CFL athlete. Nate handles operations and jumps into workouts when he is not running logistics. He will outwork you and then buy you a beer.',
      specialties: ['Operations', 'Fitness'],
      personality: 'The Engine',
      cardColor: '#E7D7C0',
      starColor: '#A4E5D9',
      textColor: '#0E3A2D',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Nicolina Leone',
      bio: 'Strength and conditioning coach with Italian roots and an energy that matches the Sicily retreat perfectly. Nicolina brings the heat in every session.', // TODO: replace with full bio from Sanity
      specialties: ['Strength', 'Conditioning'],
      personality: 'The Firecracker',
      cardColor: '#FED260',
      starColor: '#0E3A2D',
      textColor: '#C74235',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Kennedy Banton',
      bio: 'Movement specialist who brings creativity and flow to every workout. Kennedy makes hard sessions fun and fun sessions sneakily hard.', // TODO: replace with full bio from Sanity
      specialties: ['Movement', 'Flow'],
      personality: 'The Creative',
      cardColor: '#FF7E70',
      starColor: '#0E3A2D',
      textColor: '#FED260',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
  ],

  saltyMeter: {
    sweat: 9,
    adventure: 3,
    party: 9,
    rest: 3,
    culture: 8,
    groupSize: 7,
  },

  saltyMeterBlurb: 'Sicily is SALTY at peak intensity — the sweat and party meters are both cranked to 9. This is not a recovery retreat. The culture score reflects real Sicilian immersion — ancient cities, handmade pasta, local wine — but the adventure is more beach club than cliff jumping. Rest is minimal by design. If you want to train hard, eat well, dance late, and repeat — this is the one.',

  testimonials: [
    {
      guestName: 'Placeholder Guest',
      quote: 'Testimonials coming soon — check back after the retreat.',
      rating: 5,
      retreatLabel: 'Sicily 2024',
    },
  ],

  faqs: [
    {
      question: 'What is included in the retreat price?',
      answer: 'Seven nights beachside accommodation, daily breakfast, lunches at Zuma Beach Club, select group dinners, daily SALTY workouts and yoga, beach access with sunbeds and umbrellas, bikes for exploration, Siracusa excursion, pizza night, 2 hosted cocktail evenings, airport transfers from Catania, and professional photography.',
    },
    {
      question: 'What are the room types and prices?',
      answer: 'Single Room — $3,399 per person. Double Room — $2,549 per person. Shared Room (4–5 guests) — $2,099 per person. All prices are all-inclusive per person for the full retreat.',
    },
    {
      question: 'Which airport should I fly into?',
      answer: 'Catania Fontanarossa Airport (CTA). Airport transfers run on August 9 to the venue in Maria del Focallo (approximately 90 minutes). Return transfers on August 16.',
    },
    {
      question: 'How many meals are included?',
      answer: 'Daily breakfast at the venue, daily lunches at Zuma Beach Club, and select group dinners throughout the week. A few evenings are left free for you to explore local restaurants on your own — and the local food scene is exceptional.',
    },
    {
      question: 'What is the weather like in August?',
      answer: 'Hot. August in southeastern Sicily averages 30–35°C. We schedule workouts for mornings when it is cooler and afternoons are reserved for beach club and shade. Stay hydrated — we will remind you.',
    },
    {
      question: 'Is this retreat good for solo travelers?',
      answer: 'Absolutely. About 60% of guests come solo. The larger group size (35–45) means there are always people to connect with, and the beach club culture naturally brings everyone together.',
    },
    {
      question: 'How do payments work?',
      answer: 'A $350 deposit secures your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel.',
    },
    {
      question: 'What is the cancellation policy?',
      answer: 'All payments are non-refundable. Travel insurance is strongly recommended — Movement Travel can assist with this if needed.',
    },
  ],

  youtubeVideoIds: ['Gmxnh9tZrHs', 'WHQUq4Pu4Hg', 'uJ6YccG892U'], // TODO: replace with Sicily-specific videos

  paymentPolicy:
    'A $350 USD deposit is required to secure your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel.',

  cancellationPolicy:
    'All payments are non-refundable. Travel insurance is strongly recommended and Movement Travel can assist guests with obtaining coverage.',

  villaPhotos: [], // TODO: Sanity
  sampleDay: [
    { time: '7:30 AM', label: 'Morning Yoga' },
    { time: '8:30 AM', label: 'Breakfast' },
    { time: '9:30 AM', label: 'Beach Workout' },
    { time: '11:30 AM', label: 'Free Time' },
    { time: '1:00 PM', label: 'Zuma Beach Club Lunch' },
    { time: '3:00 PM', label: 'Pool / Bike / Explore' },
    { time: '6:00 PM', label: 'Sunset Drinks' },
    { time: '8:00 PM', label: 'Group Dinner' },
  ],
  videoTestimonials: [
    { id: '2-wfCL1dAXM', name: 'Shane L', label: 'El Salvador 2025' },
    { id: 'T_2LVHSVIeU', name: 'Keara J', label: 'Sicily 2024' },
    { id: 'sdQQdR6gFc0', name: 'Cindy T', label: 'El Salvador 2025' },
    { id: 'MtuxUwGmBC0', name: 'Connor C', label: 'El Salvador 2025' },
  ],
  photoStripImages: [], // TODO: Sanity
};

/* ═══════════════════════════════════════════════════════════════════════
   EL SALVADOR — MAR DE FLORES (SALTY × HUSTL+FLOW)
   ═══════════════════════════════════════════════════════════════════════ */

export const EL_SALVADOR_RETREAT: RetreatData = {
  slug: 'el-salvador-fitness-retreat',
  destination: 'El Salvador',
  officialName: 'Mar de Flores',
  heroImageUrl: '/images/retreat/placeholder.png', // TODO: Sanity hero image
  status: 'active',
  country: 'El Salvador',
  location: 'El Tunco',
  skillLevel: 'all-levels',
  soloTravelerPercent: 55,
  depositAmount: 350,
  bookingUrl: '/book/el-salvador-fitness-retreat',
  coBrand: {
    name: 'Hustl+Flow',
    logoUrl: '/images/partners/hustl-flow-logo.png', // TODO: add actual logo
  },
  dates: {
    start: '2026-11-21',
    end: '2026-11-28',
    display: 'November 21–28, 2026',
  },
  duration: 8,
  priceFrom: 1949,
  groupSize: '20–24',

  geoDescription:
    'An El Salvador fitness retreat that takes over an entire luxury villa complex in the surf town of El Tunco. Daily SALTY workouts, private pools, rooftop yoga, chef-prepared meals, and one of Central America\'s best nightlife scenes right outside the door. A collaboration between SALTY and Hustl+Flow — double the coaching power, all the energy.',

  quickFacts: [
    { label: 'Duration', value: '8 Days / 7 Nights' },
    { label: 'Dates', value: 'Nov 21–28, 2026' },
    { label: 'Location', value: 'El Tunco, El Salvador' },
    { label: 'Per Day', value: 'From $244' },
    { label: 'Group Size', value: '20–24 Guests' },
    { label: 'Fitness Level', value: 'All Levels' },
  ],

  included: [
    '7 nights at Mar de Flores private villa complex',
    'Approximately 16 chef-prepared meals (rotating local chefs)',
    'Daily SALTY workouts and yoga',
    'Full gym access (weights on-site)',
    'Access to all 4 private pools',
    'Tamanique Waterfall hike',
    '2 hosted cocktail nights',
    'Airport transfers from SAL',
    'Welcome swag',
    'Professional photography',
  ],

  notIncluded: [
    'International flights to/from El Salvador (SAL)',
    'Travel insurance (strongly recommended)',
    'Select meals for independent exploration',
    'Additional spa treatments',
    'Alcoholic drinks beyond hosted events',
    'Surf lessons (optional add-on)',
    'Gratuities for staff',
  ],

  experienceNarrative: [
    'El Salvador is SALTY\'s urban surf takeover. An entire luxury villa complex in the heart of El Tunco — four connected buildings with rooftop patios, private pools, and one of Central America\'s best surf breaks literally outside your door. This is a joint operation with Hustl+Flow, meaning double the coaching power and a programming mix that covers everything from heavy lifting to breathwork.',
    'Mornings start with workouts steps from your room — a fully equipped gym on-site, yoga on the shared terrace, or beach sessions by the break. Private chefs rotate different cuisines daily — one night it is ceviche, the next it is wood-fired pizza. The food alone is worth the trip.',
    'Off the mat, El Tunco delivers. Waterfall hikes through the jungle, cliff-jumping into swimming holes, and a nightlife scene that the SALTY party meter reflects honestly. This trip scores high on culture and sweat, but it also knows how to let loose. Theme night? Expect it to go late.',
  ],

  experienceImageUrl: '/images/retreat/placeholder.png', // TODO: Sanity

  forYouIf: [
    'You want a private villa experience with a crew that trains hard and parties harder',
    'You thrive in small groups where everyone gets close fast',
    'You like having a gym, pools, and the beach all within steps',
    'You want chef-prepared meals without the resort markup',
    'You are curious about El Salvador\'s surf culture and nightlife',
    'You want variety in coaching styles (SALTY × Hustl+Flow)',
  ],

  bestFor: [
    'Friend groups who want to book a villa together',
    'Solo travelers who want an intimate, high-energy experience',
    'Anyone who wants luxury without the corporate resort feel',
    'Fitness enthusiasts who want both structure and spontaneity',
  ],

  maybeNotFor: [
    'Anyone looking for a quiet, beach-only relaxation retreat',
    'Travelers who prefer large groups with lots of new faces',
    'People who want a fully included surf program (lessons are optional here)',
    'Those uncomfortable with nightlife-forward evenings',
  ],

  activities: [
    { name: 'SWEAT', description: 'Daily SALTY and Hustl+Flow workouts — full gym on-site, beach sessions, rooftop circuits. Double the coaches, double the heat.', frequency: 'Every morning', modalDetails: 'The Mar de Flores complex has a fully equipped gym steps from your room — dumbbells, barbells, pull-up bars, and enough space for group sessions. Beach workouts happen on the sand in front of the villas. Rooftop circuits use the terrace with views over El Tunco. With both SALTY and Hustl+Flow coaches, expect programming that ranges from heavy strength work to creative conditioning.' },
    { name: 'FLOW', description: 'Yoga, Pilates, and breathwork on the shared terrace. Morning flows and restorative sessions to balance the intensity.', frequency: 'Daily practice', modalDetails: 'The shared terrace between the four villa buildings is the yoga deck — open air, ocean breeze, and enough space for the full group. Morning flows are energising, evening sessions are restorative. Hustl+Flow brings breathwork expertise that adds a new dimension. All levels welcome.' },
    { name: 'SURF', description: 'El Tunco is one of Central America\'s top surf breaks. Optional surf lessons available — the waves are right outside.', frequency: 'Optional add-on', modalDetails: 'El Tunco\'s beach break is famous for consistent, powerful waves. Surf lessons are available as an optional add-on with local instructors. For experienced surfers, this is a playground. For beginners, the instructors know the break intimately and will find the right section for your level. Board rentals are readily available in town.' },
    { name: 'EXPLORE', description: 'Tamanique Waterfall hike through the jungle. Cliff-jumping, swimming holes, and the kind of adventure that earns the evening\'s cocktails.', frequency: 'Guided excursion', modalDetails: 'The Tamanique Waterfall hike is the adventure highlight — a guided trek through jungle and river crossings to a stunning cascade with natural swimming pools. Optional cliff-jumping for the brave. The trail is moderate and the payoff is massive. Pack a swimsuit and waterproof your phone.' },
    { name: 'CONNECT', description: 'Chef-prepared meals with rotating cuisines, rooftop dinners, and El Tunco\'s bar and restaurant scene right outside the villa gates.', frequency: 'Every evening', modalDetails: 'Private chefs rotate through the villa complex — one night is Salvadoran street food elevated, the next is international fusion. Rooftop dinners under the stars with the group. On free evenings, El Tunco\'s restaurant and bar scene is walkable and excellent. The villa complex becomes the gathering point every night — four pools, multiple terraces, and the kind of hangs that go until the group collectively decides it is bedtime.' },
    { name: 'DANCE', description: 'Theme night, hosted cocktails, and El Tunco\'s legendary nightlife. The party meter does not lie.', frequency: 'Theme nights + free evenings', modalDetails: 'El Salvador scores high on the party meter because El Tunco delivers. The town has a nightlife scene that punches well above its size — live music, beach bars, and the kind of energy that only a Central American surf town can produce. The SALTY theme night takes it further. Two hosted cocktail evenings mean the bar is open at the villas.' },
  ],

  dailyRhythm: [
    { period: 'Morning', description: 'Yoga or breathwork on the terrace (7:00), followed by chef-prepared breakfast. SALTY or Hustl+Flow workout (9:00–10:00).' },
    { period: 'Midday', description: 'Lunch at the villas or explore El Tunco\'s restaurants. Pool time, surf, or rest.' },
    { period: 'Afternoon', description: 'Adventure block (waterfall hike, surf, explore) or second session. Optional activities and free time.' },
    { period: 'Evening', description: 'Chef dinner at the villas or group outing in El Tunco. Hosted cocktails, theme nights, rooftop hangs.' },
  ],

  itinerary: [
    { day: 1, title: 'Arrival at Mar de Flores', location: 'El Tunco', summary: 'Airport transfer from SAL, settle into the villa complex. Pool welcome party with cocktails and introductions.', details: 'Fly into San Salvador International Airport (SAL). Transfers run to El Tunco — about 40 minutes through the Salvadoran countryside to the coast. Check into Mar de Flores, pick your villa, and explore the complex: four connected buildings, four pools, rooftop terraces, and a fully equipped gym. Welcome cocktails by the pool — this is where you meet the SALTY and Hustl+Flow crews. Dinner at the villas tonight, prepared by the first of several rotating private chefs.' },
    { day: 2, title: 'First Sweat & Town Explore', location: 'El Tunco', summary: 'First morning workout, explore El Tunco, afternoon pool and surf, group dinner at the villas.', details: 'Morning kicks off with a combined SALTY × Hustl+Flow workout in the on-site gym and courtyard. After breakfast by the pool, explore El Tunco — the town is compact, walkable, and full of surf shops, cafés, and street art. Afternoon free: surf the break out front, hit one of the four pools, or get a head start on your tan. First chef dinner at the villas — the rotating kitchen concept starts tonight.' },
    { day: 3, title: 'Tamanique Waterfall Hike', location: 'Tamanique + El Tunco', summary: 'Morning flow, waterfall hike with swimming and cliff-jumping, evening dinner in town.', details: 'Morning yoga and breathwork on the terrace to prepare the body. Then we load up for the Tamanique Waterfall hike — a guided trek through jungle, river crossings, and into a canyon with a massive waterfall and natural swimming pools. Cliff-jumping for the adventurous, swimming for everyone. Back to the villas for pool time and showers. Evening: group dinner at one of El Tunco\'s best restaurants.' },
    { day: 4, title: 'Surf & Strength', location: 'El Tunco', summary: 'Beach workout, optional surf lessons, afternoon pool session, rooftop dinner.', details: 'Beach workout on the sand in front of the villas — the break provides the soundtrack. Optional surf lessons with local instructors for those who want to ride El Tunco\'s famous waves. Afternoon is pool-centric — four pools, plenty of sunbeds, and chefs prepping snacks. Rooftop dinner at the villas tonight with a rotating chef menu.' },
    { day: 5, title: 'Recovery & Explore', location: 'El Tunco', summary: 'Restorative yoga, mobility session, free afternoon, hosted cocktail evening.', details: 'Slower start — restorative yoga and a mobility session designed to let the body recover after four days of movement. Late morning is genuinely free: surf, pool, walk the town, book a massage. Afternoon at the villas is low-key. Evening: first hosted cocktail night — the SALTY crew sets up the bar on the rooftop terrace. Chef dinner to follow.' },
    { day: 6, title: 'Double Session Day', location: 'El Tunco', summary: 'Morning strength, afternoon conditioning, evening dinner in town.', details: 'For those who want to push, Day 6 is a double: morning strength session in the gym followed by an afternoon beach conditioning circuit. For those who want recovery, the pools and town are calling. Split programming means you choose your intensity. Evening: group dinner at a local restaurant — ceviche, pupusas, and cold beer.' },
    { day: 7, title: 'Last Workout & Theme Night', location: 'El Tunco', summary: 'Final SALTY × Hustl+Flow session, beach day, golden hour photos, theme party farewell.', details: 'The final combined workout is always the best — you know the crew, you know the moves, and you know how far everyone has come. Beach morning, pool afternoon, golden hour photos on the rooftop. Then the theme party — the farewell night. Second hosted cocktail evening, chef dinner, and the kind of celebration that El Tunco was built for. It goes late. No regrets.' },
    { day: 8, title: 'Departure', location: 'El Tunco → San Salvador', summary: 'Airport transfers to SAL. Sandy suitcases and a group chat that never sleeps.', details: 'Morning transfers to San Salvador International Airport (SAL). Some people extend in El Salvador — the western beaches and Ruta de las Flores are worth a few extra days. The WhatsApp group does not end when the retreat does.' },
  ],

  roomTiers: [
    {
      name: 'Group of 4',
      price: 1949,
      description: 'King + Queen bed shared by 4 friends. The most affordable option — must book all 4 spots together. Beds will be shared.',
      features: ['King + Queen beds (shared)', '4 guests per room', 'Private bathroom', 'Pool access', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Group of 3',
      price: 2149,
      description: 'King + Queen bed shared by 3 friends. Must book all 3 spots together. Beds will be shared.',
      features: ['King + Queen beds (shared)', '3 guests per room', 'Private bathroom', 'Pool access', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Standard Double',
      price: 2399,
      description: 'Twin beds, shared with one other guest. Book with a friend or get paired.',
      features: ['Twin beds', '2 guests per room', 'Private bathroom', 'Pool access', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Premium Double',
      price: 2699,
      description: 'King bed or King + Queen suite. Premium space with the best views in the complex.',
      features: ['King bed or suite', '2 guests per room', 'Private bathroom', 'Premium views', 'Pool access', 'Wi-Fi'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
  ],

  accommodation: {
    name: 'Mar de Flores Villa Complex',
    description: 'An entire luxury villa complex booked exclusively for SALTY. Four connected buildings with rooftop patios, terraces, and four private pools. A fully equipped gym steps from your door. Private chefs. El Tunco\'s surf break outside the gates and the town\'s best bars and restaurants within walking distance.',
    features: ['4 private pools', 'Full gym (weights, barbells, pull-up bars)', 'Rooftop terraces', 'Private chef kitchen', 'Surf break access', 'Walking distance to El Tunco nightlife', 'Wi-Fi throughout'],
  },

  coaches: [
    {
      name: 'Erin Harris',
      bio: 'SALTY co-founder. Certified Personal Trainer (CPT) and RYT-200 yoga instructor. Erin designs every retreat experience and leads yoga sessions. She is the reason the vibes are always right.',
      specialties: ['Yoga', 'Experience Design'],
      personality: 'The Vibe Architect',
      cardColor: '#0E3A2D',
      starColor: '#C74235',
      textColor: '#FED260',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Nate Behar',
      bio: 'SALTY co-founder and former CFL athlete. Nate handles operations and jumps into workouts when he is not running logistics. He will outwork you and then buy you a beer.',
      specialties: ['Operations', 'Fitness'],
      personality: 'The Engine',
      cardColor: '#E7D7C0',
      starColor: '#A4E5D9',
      textColor: '#0E3A2D',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Telvin',
      bio: 'SALTY coach bringing strength and conditioning expertise to the El Salvador roster. Sessions are structured, intense, and always scalable.', // TODO: replace with full bio from Sanity
      specialties: ['Strength', 'Conditioning'],
      personality: 'The Workhorse',
      cardColor: '#FED260',
      starColor: '#0E3A2D',
      textColor: '#C74235',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Courtney',
      bio: 'Hustl+Flow co-founder. Brings a fresh coaching perspective and programming style that complements the SALTY approach.', // TODO: replace with full bio from Sanity
      specialties: ['Hustl+Flow', 'Coaching'],
      personality: 'The Collaborator',
      cardColor: '#FF7E70',
      starColor: '#0E3A2D',
      textColor: '#FED260',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Connor',
      bio: 'Hustl+Flow co-founder. Leads high-energy sessions that blend functional training with community-driven fitness.', // TODO: replace with full bio from Sanity
      specialties: ['Hustl+Flow', 'Functional Training'],
      personality: 'The Catalyst',
      cardColor: '#3A6B35',
      starColor: '#FED260',
      textColor: '#FF7E70',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
  ],

  saltyMeter: {
    sweat: 8,
    adventure: 5,
    party: 7,
    rest: 3,
    culture: 9,
    groupSize: 3,
  },

  saltyMeterBlurb: 'El Salvador is SALTY\'s urban surf base camp — high culture and high sweat wrapped in villa luxury. The party meter reflects the reality of El Tunco: the nightlife is real and the SALTY theme night leans into it. Adventure is moderate (no mountain treks here), but the waterfall hike and surf access keep it interesting. Rest is minimal — this trip moves.',

  testimonials: [
    {
      guestName: 'Placeholder Guest',
      quote: 'Testimonials coming soon — check back after the retreat.',
      rating: 5,
      retreatLabel: 'El Salvador 2025',
    },
  ],

  faqs: [
    {
      question: 'What is included in the retreat price?',
      answer: 'Seven nights at Mar de Flores private villa complex, approximately 16 chef-prepared meals, daily SALTY and Hustl+Flow workouts and yoga, full gym access, all 4 private pools, Tamanique Waterfall hike, 2 hosted cocktail nights, airport transfers, welcome swag, and professional photography.',
    },
    {
      question: 'What are the room types and prices?',
      answer: 'Premium Double — $2,699 per person. Standard Double (twin beds) — $2,399 per person. Group of 3 — $2,149 per person. Group of 4 — $1,949 per person. Group rooms require all guests to book together. Beds will be shared. All prices are per person, all-inclusive.',
    },
    {
      question: 'What is Hustl+Flow?',
      answer: 'Hustl+Flow is a fitness community from Waterloo, Ontario co-founded by Courtney and Connor. This retreat is a collaboration — SALTY handles the experience design and logistics, Hustl+Flow brings additional coaching expertise and their own community. Double the coaches, same SALTY energy.',
    },
    {
      question: 'Are surf lessons included?',
      answer: 'Surf lessons are an optional add-on — not included in the base price. El Tunco is one of Central America\'s best surf breaks, and local instructors and board rentals are readily available. If you want to surf, you will have plenty of opportunity.',
    },
    {
      question: 'Can I book a group room as a solo traveler?',
      answer: 'Group rooms (3 or 4 guests) require all guests to book together — these are not available for solo traveler matching. Solo travelers should book Standard Double (you will be paired with another solo traveler) or Premium Double.',
    },
    {
      question: 'Is El Salvador safe?',
      answer: 'El Tunco is a well-established tourist destination on the Pacific coast. The retreat takes over an entire private villa complex, and ground transportation is provided for all excursions. We recommend standard travel precautions and will share a detailed safety briefing before departure.',
    },
    {
      question: 'How do payments work?',
      answer: 'A $350 deposit secures your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel. Early bird pricing expires May 31, 2026.',
    },
    {
      question: 'What is the cancellation policy?',
      answer: 'All payments are non-refundable. Travel insurance is strongly recommended — Movement Travel can assist with this if needed.',
    },
  ],

  youtubeVideoIds: ['Gmxnh9tZrHs', 'WHQUq4Pu4Hg', 'uJ6YccG892U'], // TODO: replace with El Salvador-specific videos

  paymentPolicy:
    'A $350 USD deposit is required to secure your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel. Early bird pricing available until May 31, 2026.',

  cancellationPolicy:
    'All payments are non-refundable. Travel insurance is strongly recommended and Movement Travel can assist guests with obtaining coverage.',

  villaPhotos: [], // TODO: Sanity
  sampleDay: [
    { time: '7:00 AM', label: 'Yoga / Breathwork' },
    { time: '8:30 AM', label: 'Chef Breakfast' },
    { time: '9:30 AM', label: 'SALTY Workout' },
    { time: '12:00 PM', label: 'Lunch & Pool' },
    { time: '2:00 PM', label: 'Surf / Explore' },
    { time: '5:00 PM', label: 'Free Time' },
    { time: '7:00 PM', label: 'Chef Dinner' },
    { time: '9:30 PM', label: 'El Tunco Nightlife' },
  ],
  videoTestimonials: [
    { id: '2-wfCL1dAXM', name: 'Shane L', label: 'El Salvador 2025' },
    { id: 'T_2LVHSVIeU', name: 'Keara J', label: 'Sicily 2024' },
    { id: 'sdQQdR6gFc0', name: 'Cindy T', label: 'El Salvador 2025' },
    { id: 'MtuxUwGmBC0', name: 'Connor C', label: 'El Salvador 2025' },
  ],
  photoStripImages: [], // TODO: Sanity
};

/* ═══════════════════════════════════════════════════════════════════════
   COSTA RICA — SURF SWEAT FLOW V4
   ═══════════════════════════════════════════════════════════════════════ */

export const COSTA_RICA_RETREAT: RetreatData = {
  slug: 'costa-rica-fitness-retreat',
  destination: 'Costa Rica',
  officialName: 'Surf Sweat Flow',
  heroImageUrl: '/images/retreat/placeholder.png', // TODO: Sanity hero image
  status: 'active',
  coBrand: {
    name: 'Synergy Physio & Pilates',
    logoUrl: '/images/partners/synergy-physio-logo.png', // TODO: Add Synergy logo asset
  },
  country: 'Costa Rica',
  location: 'Matapalo, Osa Peninsula',
  skillLevel: 'all-levels',
  soloTravelerPercent: 60,
  depositAmount: 350,
  bookingUrl: '/book/costa-rica-fitness-retreat',
  dates: {
    start: '2027-01-09',
    end: '2027-01-16',
    display: 'January 9–16, 2027',
  },
  duration: 8,
  priceFrom: 1949,
  groupSize: '25–30',

  geoDescription:
    'A Costa Rica fitness retreat deep in the Osa Peninsula — jungle beachfront resort, howler monkeys at sunrise yoga, surf at Pan Dulce, and guest coaches from Synergy Physiotherapy with Olympic and Cirque du Soleil credentials. Eight days of SALTY at its most balanced — equal parts sweat and exhale.',

  quickFacts: [
    { label: 'Duration', value: '8 Days / 7 Nights' },
    { label: 'Dates', value: 'Jan 9–16, 2027' },
    { label: 'Location', value: 'Osa Peninsula, Costa Rica' },
    { label: 'Per Day', value: 'From $244' },
    { label: 'Group Size', value: '25–30 Guests' },
    { label: 'Fitness Level', value: 'All Levels' },
  ],

  included: [
    '7 nights jungle beachfront accommodations at Blue Osa',
    'All meals (chef-prepared, farm-to-table, dietary needs covered)',
    'Daily SALTY workouts (yoga, strength, mobility)',
    'Workshops with Synergy coaches (Olympic/Cirque credentials)',
    'Pro surf lesson at Pan Dulce',
    'Matapalo Waterfall hike',
    '$50 spa credit per guest',
    'Hosted nights out including transfer to Martina\'s Bar',
    'Group airport transfers and domestic flight coordination',
    'Welcome swag',
    'Professional photography',
  ],

  notIncluded: [
    'International flights to/from Costa Rica (San José SJO)',
    'SANSA domestic flight SJO → Puerto Jimenez (~$310 USD, booked separately)',
    'Travel insurance (strongly recommended)',
    'Additional spa treatments beyond $50 credit',
    'Alcoholic drinks beyond hosted events',
    'Additional surf board rentals',
    'Gratuities for staff',
  ],

  experienceNarrative: [
    'Costa Rica is the retreat where the jungle does the talking. You wake up to howler monkeys, do yoga with the canopy as your ceiling, and surf waves that feel like they were made for learning. Blue Osa is a private beachfront resort on the Osa Peninsula — one of the most biodiverse places on the planet — and it feels like stepping into a different world.',
    'This is SALTY at its most balanced. The sweat is real — daily workouts, strength sessions, Pilates with the Synergy team — but so is the rest. Hammocks everywhere, $50 spa credit to use whenever you want, and afternoons with nowhere to be except the pool or the beach. The Synergy coaches bring Olympic and Cirque du Soleil credentials to movement workshops that will change how you think about your body.',
    'If Morocco is about adventure and Sicily is about intensity, Costa Rica is about coming home to yourself. The Osa Peninsula has a way of stripping away the noise. You leave fitter, calmer, and with sand in places you did not expect.',
  ],

  experienceImageUrl: '/images/retreat/placeholder.png', // TODO: Sanity

  forYouIf: [
    'You want equal parts sweat and exhale in your retreat',
    'You are drawn to nature, jungle, and being away from everything',
    'You want world-class coaching with Olympic-level movement expertise',
    'You love the idea of farm-to-table meals and zero decision fatigue',
    'You want to try surfing (or get better) at a forgiving beach break',
    'You need a reset — not a boot camp, not a spa week, but the balance between',
  ],

  bestFor: [
    'Solo travelers who want a mid-sized group with deep connections',
    'Anyone who values rest and recovery as much as intensity',
    'Fitness enthusiasts curious about movement beyond traditional gym work',
    'Nature lovers — the Osa Peninsula is genuinely life-changing',
  ],

  maybeNotFor: [
    'Anyone looking for nightlife and party-forward energy (try Sicily or El Salvador)',
    'Travelers who want urban exploration and cultural immersion (try Morocco)',
    'People uncomfortable with jungle/wildlife environments',
    'Those who need consistent high-speed connectivity',
  ],

  activities: [
    { name: 'SURF', description: 'Pro surf lesson at Pan Dulce — a forgiving beach break on the Osa Peninsula. Additional board rentals available for free surf sessions.', frequency: '1 lesson + free surf', modalDetails: 'Pan Dulce is the local break near Blue Osa — a long, gentle wave that is perfect for beginners and rewarding for intermediates. Your included surf lesson comes with experienced local instructors who know every section of this break. Additional board rentals are available for those who want to paddle out on their own throughout the week.' },
    { name: 'SWEAT', description: 'Daily SALTY workouts — beach strength, functional training, and programming designed to challenge without crushing. Always scalable.', frequency: 'Every morning', modalDetails: 'Morning workouts at Blue Osa use the beach, the outdoor spaces, and bodyweight-focused programming that makes the most of the environment. Sessions are 45–60 minutes and fully scalable. The coaches adapt to the jungle heat and the recovery-focused vibe of this retreat — the sessions are challenging but designed to leave you energised, not destroyed.' },
    { name: 'FLOW', description: 'Daily yoga with howler monkeys overhead. Vinyasa flows, yin sessions, and mobility work integrated throughout the week.', frequency: 'Daily practice', modalDetails: 'Blue Osa was built for yoga — the open-air studio overlooks the jungle canopy and the ocean. Morning vinyasa flows are the signature session. Evening yin and restorative classes help the body recover. The Synergy team adds movement workshops that blend yoga, Pilates, and physiotherapy principles in ways you will not find anywhere else.' },
    { name: 'SYNERGY', description: 'Movement workshops with Synergy Physiotherapy coaches — Olympic and Cirque du Soleil credentials applied to everyday bodies.', frequency: '4 workshops', modalDetails: 'Martha and Jalisa from Synergy Physiotherapy and Pilates (Halifax) bring serious credentials — Olympic athletes and Cirque du Soleil performers in their client list. Their workshops are not about elite performance; they are about teaching your body to move better, feel better, and understand itself. Expect Pilates, mobility work, and movement education that changes how you approach fitness after the retreat.' },
    { name: 'EXPLORE', description: 'Matapalo Waterfall hike through the jungle. Wildlife spotting, swimming holes, and the kind of nature that reminds you the world is bigger than your screen.', frequency: 'Guided excursion', modalDetails: 'The Matapalo Waterfall hike is a guided jungle trek through one of the most biodiverse regions on Earth. Expect monkeys, toucans, and the occasional sloth sighting on the trail. The waterfall itself is spectacular — a jungle cascade with swimming pools at the base. The Osa Peninsula contains 2.5% of the world\'s biodiversity in 0.001% of its surface area.' },
    { name: 'REST', description: 'Costa Rica scores 9 on the rest meter. Hammocks, $50 spa credit, pool afternoons, and no guilt about doing absolutely nothing.', frequency: 'Built into every day', modalDetails: 'This is the retreat where rest is not an afterthought — it is designed into the schedule. Afternoons are genuinely free. The spa at Blue Osa is excellent and your $50 credit covers a massage or treatment of your choice. Hammocks are everywhere. The pool overlooks the ocean. Journaling, reading, napping — all valid activities. The jungle soundtrack does the rest.' },
  ],

  dailyRhythm: [
    { period: 'Morning', description: 'Sunrise yoga in the open-air studio (6:30). Farm-to-table breakfast. Morning workout or Synergy workshop (9:00).' },
    { period: 'Midday', description: 'Lunch at the resort. Free time: pool, hammock, beach walk, journal, spa.' },
    { period: 'Afternoon', description: 'Optional surf, hike, or second session. Mostly free — the Osa Peninsula rewards those who slow down.' },
    { period: 'Evening', description: 'Group dinner (farm-to-table). Sunset from the pool deck. Hosted night out or group card games.' },
  ],

  itinerary: [
    { day: 1, title: 'Here We Go', location: 'Matapalo, Osa Peninsula', summary: 'Arrive in paradise, shake off the travel, and kick things off with a sunset welcome party.', details: 'Fly into San José (SJO), then catch your SANSA domestic flight to Puerto Jimenez on the Osa Peninsula. Airport transfers bring you to Blue Osa — a private jungle beachfront resort that feels like arriving in another world. Settle into your room, explore the property, and join us for a sunset welcome party on the pool deck. The howler monkeys provide the opening remarks.' },
    { day: 2, title: 'Find Your Groove', location: 'Matapalo, Osa Peninsula', summary: 'Surf, SoulWork, and settling into the rhythm. Move, try new things, rest.', details: 'First full day sets the tone. Morning yoga in the open-air studio with jungle canopy overhead. First SALTY workout on the beach. Afternoon surf session at Pan Dulce for those who want to get in the water early. SoulWork session in the late afternoon — SALTY\'s signature blend of movement and mindfulness. Group dinner under the stars.' },
    { day: 3, title: 'Stretch & Splash', location: 'Matapalo, Osa Peninsula', summary: 'Yoga, beach workout, surf prep Pilates, and stargazing.', details: 'Sunrise yoga to open the body. Morning beach workout — strength and conditioning in the sand. First Synergy workshop: a Pilates-based surf preparation session that will make your surf lesson tomorrow twice as effective. Afternoon free for pool, spa ($50 credit waiting), or beach time. Evening stargazing from the pool deck — the Osa Peninsula has some of the darkest skies in Central America.' },
    { day: 4, title: 'Go Big, Get Sandy', location: 'Matapalo, Osa Peninsula', summary: 'Beach bootcamp, pro surf lesson at Pan Dulce, and a jungle party.', details: 'Morning beach bootcamp — the kind of workout that earns every wave you are about to catch. Pro surf lesson at Pan Dulce with experienced local instructors. Whether you are standing for the first time or working on your turns, the patient coaching and forgiving waves make this break special. Evening: jungle party at Blue Osa — fairy lights, music, and the group at its most connected.' },
    { day: 5, title: 'Easy Does It', location: 'Matapalo, Osa Peninsula', summary: 'Recovery day. Gentle movement, pool Pilates, wildlife spotting, and intentional rest.', details: 'The recovery day you actually earn by Day 5. Morning gentle movement and mobility session. Synergy pool Pilates workshop — low-impact, high-reward. The rest of the day is genuinely yours: spa, hammock, beach walk, wildlife spotting from the pool deck (the monkeys put on a show every afternoon). No group dinner tonight — the resort kitchen is open and you eat when you want.' },
    { day: 6, title: 'Jungle Adventure', location: 'Matapalo, Osa Peninsula', summary: 'Matapalo Waterfall hike, core workout, and wildlife encounters.', details: 'The adventure day. Guided hike to Matapalo Waterfall through some of the most biodiverse jungle on the planet. Swimming holes, waterfall pools, and the chance to spot monkeys, toucans, and sloths along the trail. Afternoon core and conditioning session with the Synergy team. Group dinner tonight — the chefs go all out on adventure day.' },
    { day: 7, title: 'One More Wave', location: 'Matapalo + Martina\'s Bar', summary: 'Last full day. Final workout, free surf, golden hour photos, farewell dinner and dancing at Martina\'s Bar.', details: 'The final SALTY workout is always the most emotional — and in the jungle, surrounded by this crew, it hits different. Free surf at Pan Dulce for those who want one more wave. Golden hour photos on the beach. Then the farewell dinner at the resort followed by a transfer to Martina\'s Bar — the local spot with the best music on the peninsula. This one goes late. It is supposed to.' },
    { day: 8, title: 'See You Soon', location: 'Matapalo → Puerto Jimenez → San José', summary: 'Hugs, goodbyes, and sandy suitcases. You are heading home rested, recharged, and just the right amount of SALTY.', details: 'Morning transfers to Puerto Jimenez for your SANSA flight back to San José and your international connection. Some people extend — Drake Bay, Uvita, and Manuel Antonio are all within reach. The WhatsApp group does not end when the retreat does. You are part of this now.' },
  ],

  roomTiers: [
    {
      name: 'Quad Room',
      price: 1949,
      description: 'Shared room with 3 other guests. The most affordable option at Blue Osa — communal, social, and surrounded by jungle.',
      features: ['4 guests per room', 'Comfortable beds', 'Shared bathroom', 'Jungle views', 'Daily housekeeping'], // TODO: update with actual Blue Osa features
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Triple Room',
      price: 2199,
      description: 'Shared with 2 other guests. A balance of social and personal space.',
      features: ['3 guests per room', 'Comfortable beds', 'Shared bathroom', 'Jungle or ocean views', 'Daily housekeeping'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Double Room',
      price: 2399,
      description: 'Shared with one other guest. Book with a friend or get paired with a fellow traveler.',
      features: ['2 guests per room', 'Queen or twin beds', 'Private bathroom', 'Ocean or jungle views', 'Daily housekeeping'], // TODO: update
      imageUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
  ],

  accommodation: {
    name: 'Blue Osa Retreat',
    description: 'A private jungle beachfront resort on the Osa Peninsula — one of the most biodiverse places on the planet. Open-air yoga studio, pool overlooking the Pacific, hammocks in every corner, on-site spa, and farm-to-table meals prepared by the resort\'s kitchen team. Blue Osa was built for exactly this kind of retreat — it balances luxury with nature seamlessly.',
    features: ['Private beachfront', 'Open-air yoga studio', 'Infinity pool with ocean views', 'On-site spa', 'Farm-to-table kitchen', 'Hammocks and lounge areas', 'Jungle trails on property', 'Wi-Fi in common areas'],
  },

  coaches: [
    {
      name: 'Erin Harris',
      bio: 'SALTY co-founder. Certified Personal Trainer (CPT) and RYT-200 yoga instructor. Erin designs every retreat experience and leads yoga sessions. She is the reason the vibes are always right.',
      specialties: ['Yoga', 'Experience Design'],
      personality: 'The Vibe Architect',
      cardColor: '#0E3A2D',
      starColor: '#C74235',
      textColor: '#FED260',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Nate Behar',
      bio: 'SALTY co-founder and former CFL athlete. Nate handles operations and jumps into workouts when he is not running logistics. He will outwork you and then buy you a beer.',
      specialties: ['Operations', 'Fitness'],
      personality: 'The Engine',
      cardColor: '#E7D7C0',
      starColor: '#A4E5D9',
      textColor: '#0E3A2D',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Josh Towell',
      bio: 'Yoga instructor and active listener. Josh brings grounded energy to the mat and infectious enthusiasm off it. His sessions blend deep stretches with stillness that hits different after a week of surf and sweat.', // TODO: replace with full bio from Sanity
      specialties: ['Yoga', 'Active Listening'],
      personality: 'The Grounding Force',
      cardColor: '#B6D4EA',
      starColor: '#0E3A2D',
      textColor: '#F7F4ED',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Martha Purdy',
      bio: 'Synergy Physiotherapy co-founder with a client list that includes Olympic athletes and Cirque du Soleil performers. Martha translates elite-level movement science into sessions that make everyday bodies feel extraordinary.', // TODO: replace with full bio from Sanity
      specialties: ['Physiotherapy', 'Pilates', 'Movement'],
      personality: 'The Movement Scientist',
      cardColor: '#FED260',
      starColor: '#0E3A2D',
      textColor: '#C74235',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
    {
      name: 'Jalisa den Hartog',
      bio: 'Synergy team member and movement specialist. Jalisa brings energy, precision, and a deep understanding of how bodies move and recover. Her workshops will change how you approach fitness after the retreat.', // TODO: replace with full bio from Sanity
      specialties: ['Movement', 'Rehabilitation', 'Pilates'],
      personality: 'The Precision Coach',
      cardColor: '#FF7E70',
      starColor: '#0E3A2D',
      textColor: '#FED260',
      photoUrl: '/images/retreat/placeholder.png', // TODO: Sanity
    },
  ],

  saltyMeter: {
    sweat: 7,
    adventure: 7,
    party: 2,
    rest: 9,
    culture: 6,
    groupSize: 5,
  },

  saltyMeterBlurb: 'Costa Rica is SALTY at its most balanced — the rest meter hits 9, which is the highest in the lineup. The sweat and adventure are real but never overwhelming. Party is intentionally low — this is the trip where a card game by the pool replaces the dance floor. Culture comes through the food, the jungle, and the Osa Peninsula itself rather than city exploration.',

  testimonials: [
    {
      guestName: 'Placeholder Guest',
      quote: 'Testimonials coming soon — check back after the retreat.',
      rating: 5,
      retreatLabel: 'Costa Rica 2026',
    },
  ],

  faqs: [
    {
      question: 'What is included in the retreat price?',
      answer: 'Seven nights jungle beachfront accommodation at Blue Osa, all farm-to-table meals, daily SALTY workouts and yoga, 4 Synergy physio/Pilates workshops, 1 pro surf lesson at Pan Dulce, Matapalo Waterfall hike, $50 spa credit, hosted nights out including transfer to Martina\'s Bar, airport transfers, and professional photography.',
    },
    {
      question: 'What are the room types and prices?',
      answer: 'Double Room — $2,399 per person. Triple Room — $2,199 per person. Quad Room — $1,949 per person. All prices are per person, all-inclusive. Note: prices do NOT include the SANSA domestic flight (~$310 USD) which guests book and pay separately.',
    },
    {
      question: 'What is the SANSA domestic flight?',
      answer: 'Blue Osa is on the Osa Peninsula — you fly internationally into San José (SJO), then take a short domestic flight on SANSA Airlines to Puerto Jimenez. This flight costs approximately $310 USD and is booked separately by each guest. We provide full booking instructions after you secure your spot.',
    },
    {
      question: 'What is Synergy Physiotherapy?',
      answer: 'Synergy Physiotherapy and Pilates is a Halifax-based practice co-founded by Martha Purdy. Their team has worked with Olympic athletes and Cirque du Soleil performers. On this retreat, they lead 4 movement workshops that blend physiotherapy principles with Pilates and mobility work — designed for everyday bodies, not just elite athletes.',
    },
    {
      question: 'How remote is the Osa Peninsula?',
      answer: 'Beautifully remote. Blue Osa is a private beachfront resort surrounded by jungle — that is the entire point. Wi-Fi is available in common areas but this is not a work-from-the-pool retreat. Cell service is intermittent. Embrace the disconnect.',
    },
    {
      question: 'What wildlife might I see?',
      answer: 'Howler monkeys (you will hear them before you see them), spider monkeys, toucans, scarlet macaws, sloths, and if you are lucky, dolphins from the beach. The Osa Peninsula contains 2.5% of the world\'s biodiversity.',
    },
    {
      question: 'Is this retreat good for solo travelers?',
      answer: 'Absolutely — about 60% of guests come solo. The mid-sized group (25–30) is large enough to meet a variety of people and small enough that you will know everyone by Day 3. The communal meals and shared spaces make connection effortless.',
    },
    {
      question: 'Can I extend my trip?',
      answer: 'Yes — many guests add a few days. Drake Bay (famous for whale watching), Uvita, and Manuel Antonio are all accessible from the Osa Peninsula. We share recommendations after booking.',
    },
    {
      question: 'How do payments work?',
      answer: 'A $350 deposit secures your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel. Early bird pricing available until July 1, 2026.',
    },
    {
      question: 'What is the cancellation policy?',
      answer: 'All payments are non-refundable. Travel insurance is strongly recommended — Movement Travel can assist with this if needed.',
    },
  ],

  youtubeVideoIds: ['Gmxnh9tZrHs', 'WHQUq4Pu4Hg', 'uJ6YccG892U'], // TODO: replace with Costa Rica-specific videos

  paymentPolicy:
    'A $350 USD deposit is required to secure your spot. 50% of the remaining balance is due within approximately one month of booking. The final 50% is due 45 days before departure. All payments are processed through Movement Travel. Early bird pricing available until July 1, 2026.',

  cancellationPolicy:
    'All payments are non-refundable. Travel insurance is strongly recommended and Movement Travel can assist guests with obtaining coverage.',

  villaPhotos: [], // TODO: Sanity
  sampleDay: [
    { time: '6:30 AM', label: 'Sunrise Yoga' },
    { time: '8:00 AM', label: 'Farm-to-Table Breakfast' },
    { time: '9:30 AM', label: 'SALTY Workout' },
    { time: '12:00 PM', label: 'Lunch & Hammock' },
    { time: '2:00 PM', label: 'Surf / Spa / Free' },
    { time: '4:30 PM', label: 'Synergy Workshop' },
    { time: '6:30 PM', label: 'Sunset & Dinner' },
    { time: '8:30 PM', label: 'Cards & Chill' },
  ],
  videoTestimonials: [
    { id: '2-wfCL1dAXM', name: 'Shane L', label: 'El Salvador 2025' },
    { id: 'T_2LVHSVIeU', name: 'Keara J', label: 'Sicily 2024' },
    { id: 'sdQQdR6gFc0', name: 'Cindy T', label: 'El Salvador 2025' },
    { id: 'MtuxUwGmBC0', name: 'Connor C', label: 'El Salvador 2025' },
  ],
  photoStripImages: [], // TODO: Sanity
};

/* ═══════════════════════════════════════════════════════════════════════
   RETREAT REGISTRY
   ═══════════════════════════════════════════════════════════════════════ */

export const RETREATS: Record<string, RetreatData> = {
  'panama-fitness-retreat': PANAMA_RETREAT,
  'morocco-fitness-retreat': MOROCCO_RETREAT,
  'sicily-fitness-retreat': SICILY_RETREAT,
  'el-salvador-fitness-retreat': EL_SALVADOR_RETREAT,
  'costa-rica-fitness-retreat': COSTA_RICA_RETREAT,
};
