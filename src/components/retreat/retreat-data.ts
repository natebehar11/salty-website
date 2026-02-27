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
  activities: { name: string; description: string; imageUrl?: string }[];
  dailyRhythm: { period: string; description: string }[];
  itinerary: { day: number; title: string; location: string; summary: string; details: string }[];
  roomTiers: { name: string; price: number; description: string; features: string[]; imageUrl?: string }[];
  accommodation: { name: string; description: string; features: string[] };
  coaches: { name: string; bio: string; specialties: string[]; personality: string; cardColor: string; photoUrl?: string }[];
  saltyMeter: { sweat: number; adventure: number; party: number; rest: number; culture: number };
  testimonials: { guestName: string; quote: string; rating: number; retreatLabel: string }[];
  faqs: { question: string; answer: string }[];
  youtubeVideoIds: string[];
  paymentPolicy: string;
  cancellationPolicy: string;
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
  depositAmount: 500,
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
    { label: 'From', value: '$2,249 USD' },
    { label: 'Group Size', value: '35–45 Guests' },
    { label: 'Skill Level', value: 'All Levels' },
    { label: 'Solo Travelers', value: '65%' },
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
    { name: 'Surf Lessons', description: 'Learn to surf or level up with local instructors on Santa Catalina\'s consistent Pacific breaks. All equipment provided.', imageUrl: '/images/retreat/surf-lesson.png' },
    { name: 'Daily Workouts', description: 'Functional fitness, HIIT, and strength sessions led by SALTY coaches. Every session is scalable to your level.', imageUrl: '/images/retreat/erin-workout.png' },
    { name: 'Sunrise Yoga', description: 'Vinyasa flow to start the day and yin yoga to wind down. Beach and rooftop settings depending on location.', imageUrl: '/images/retreat/beach-core.png' },
    { name: 'Jungle Hike', description: 'Guided trek through tropical jungle to a hidden waterfall. Moderate difficulty, maximum payoff.', imageUrl: '/images/retreat/sand-dune-run.png' },
    { name: 'Group Dinners', description: 'Five curated dinners at the best local restaurants — from Casco Viejo rooftops to beachfront seafood.', imageUrl: '/images/retreat/palapa-laughing.png' },
  ],

  dailyRhythm: [
    { period: 'Morning', description: 'Yoga or mobility flow (7:00), followed by breakfast at the hotel. Optional sunrise surf on beach days.' },
    { period: 'Midday', description: 'Group workout (10:00–11:00). Strength, HIIT, or functional — always scalable. Refuel with lunch on your own.' },
    { period: 'Afternoon', description: 'Free time: surf, explore, nap, pool, or join an optional excursion. Your call.' },
    { period: 'Evening', description: 'Group dinner (on scheduled nights) or explore the local food scene. Post-dinner hangs happen naturally.' },
  ],

  itinerary: [
    { day: 1, title: 'Arrival in Panama City', location: 'Panama City', summary: 'Arrive at Tocumen International (PTY). Airport transfer to Casco Viejo hotel. Welcome cocktail reception and group meet.', details: 'Fly into Tocumen International Airport (PTY). Your SALTY crew meets you at the airport with transfers to our hotel in Casco Viejo, the historic heart of Panama City. Settle in, explore the cobblestone streets, and join us for a welcome cocktail on the rooftop terrace. This is where you meet the group — and realize you already like these people. Dinner is on your own tonight; we will share our neighborhood favorites.' },
    { day: 2, title: 'City Sweat & Casco Viejo', location: 'Panama City', summary: 'Rooftop workout, city walking tour, group dinner at a Casco Viejo restaurant.', details: 'Morning yoga with skyline views, followed by a rooftop HIIT session overlooking the Bay of Panama. After breakfast, join an optional walking tour of Casco Viejo — street art, history, coffee stops. Afternoon is free to explore the city, hit the pool, or rest. Evening: our first group dinner at one of Casco Viejo\'s best restaurants.' },
    { day: 3, title: 'Panama City to Santa Catalina', location: 'In Transit → Santa Catalina', summary: 'Morning workout, domestic flight west, arrive in Santa Catalina. Beach sunset.', details: 'Early morning functional fitness session before we pack up. Short domestic flight from Panama City to the Veraguas coast, then a scenic drive to Santa Catalina. Check into our beachfront property, grab lunch, and spend the afternoon settling into surf-town pace. Sunset on the beach is non-negotiable.' },
    { day: 4, title: 'First Surf Day', location: 'Santa Catalina', summary: 'Beach yoga, first surf lesson, afternoon free, group dinner.', details: 'Sunrise yoga on the sand to open up the body. After breakfast, your first surf lesson with local instructors — Santa Catalina has some of the most consistent beginner-friendly waves in Central America. Afternoon is yours: more surf, pool time, beach reading, or a walk to Playa El Estero. Group dinner at a beachfront restaurant tonight.' },
    { day: 5, title: 'Jungle Waterfall Hike', location: 'Santa Catalina', summary: 'Morning strength workout, guided jungle hike to waterfall, evening free.', details: 'Morning strength session on the beach, then we head into the jungle for a guided hike to a hidden waterfall. Moderate trail through tropical forest — the swimming hole at the end is worth every step. Back to base for a late lunch and free afternoon. No group dinner tonight — explore Santa Catalina\'s taco stands and ceviche spots on your own.' },
    { day: 6, title: 'Surf & Sweat', location: 'Santa Catalina', summary: 'Second surf lesson, midday HIIT, afternoon free, group dinner.', details: 'Back in the water for your second surf lesson — building on Day 4, you will be surprised how much you remember. Midday high-intensity interval session on the beach (scalable, always). Afternoon free for optional activities: deep-sea fishing, island day trip to Coiba, or straight to the hammock. Group dinner tonight — this one tends to go late.' },
    { day: 7, title: 'Recovery & Explore', location: 'Santa Catalina', summary: 'Yin yoga, optional surf or excursion, free afternoon, group dinner.', details: 'Slow start today. Long yin yoga session to restore the body after a full week of movement. Optional free surf session for those who want more water time, or join a boat trip to Coiba National Park (additional cost). This is a true recovery day — the pace is yours. Final group dinner in Santa Catalina tonight; bring your appetite and your stories.' },
    { day: 8, title: 'Last Workout & Farewell Prep', location: 'Santa Catalina', summary: 'Final group workout, beach time, farewell dinner.', details: 'The last group workout is always the best one — you know the crew, you know the moves, and you know how far you have come in a week. Beach morning, free afternoon, and then our farewell dinner. Expect speeches (the funny kind), group photos, and at least one person saying "same time next year?"' },
    { day: 9, title: 'Departure', location: 'Santa Catalina → Panama City', summary: 'Transfer to airport, flights home. WhatsApp group lives on.', details: 'Transfers arranged to get you back to Tocumen International (PTY) for your flight home. Some people extend their trip (we can help with recommendations). The WhatsApp group does not end when the retreat does — you are part of the SALTY community now.' },
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
      name: 'Erin Harris',
      bio: 'SALTY co-founder. Certified Personal Trainer (CPT) and RYT-200 yoga instructor. Erin designs every retreat experience and leads yoga sessions. She is the reason the vibes are always right.',
      specialties: ['Yoga', 'Experience Design'],
      personality: 'The Vibe Architect',
      cardColor: '#B6D4EA',
      photoUrl: '/images/retreat/erin-pool.png',
    },
    {
      name: 'Nate Behar',
      bio: 'SALTY co-founder and former CFL athlete. Nate handles operations and jumps into workouts when he is not running logistics. He will outwork you and then buy you a beer.',
      specialties: ['Operations', 'Fitness'],
      personality: 'The Engine',
      cardColor: '#3A6B35',
      photoUrl: '/images/retreat/nate-water.png',
    },
    {
      name: 'Riley',
      bio: 'Yoga and movement coach specializing in vinyasa and mobility work. Riley makes flexibility fun and will convince you that a 6 AM yoga session is the best decision you have ever made.',
      specialties: ['Vinyasa', 'Mobility'],
      personality: 'The Morning Person',
      cardColor: '#A4E5D9',
      photoUrl: '/images/retreat/palapa-workout.png',
    },
    {
      name: 'Joe',
      bio: 'Strength and conditioning specialist who believes every workout should be hard, fun, and scalable. Joe programs all the SALTY workouts and will never let you phone it in.',
      specialties: ['Strength', 'HIIT', 'Conditioning'],
      personality: 'The Hype Man',
      cardColor: '#C74235',
      photoUrl: '/images/retreat/sand-dune-run.png',
    },
  ],

  saltyMeter: {
    sweat: 7,
    adventure: 7,
    party: 7,
    rest: 6,
    culture: 8,
  },

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
      answer: 'A $500 deposit secures your spot. The remaining balance is split into monthly installments, due in full 60 days before the retreat start date.',
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

  paymentPolicy:
    'A $500 USD deposit is required to secure your spot. The remaining balance is split into equal monthly installments, with the full amount due 60 days before the retreat start date. All payments are processed securely through Stripe.',

  cancellationPolicy:
    'Cancel 90+ days before the retreat for a full refund minus the $500 deposit. Cancel 60–89 days before for a 50% refund. No refunds within 60 days of the retreat start date. Travel insurance is strongly recommended and required for all guests.',
};

export const RETREATS: Record<string, RetreatData> = {
  'panama-fitness-retreat': PANAMA_RETREAT,
};
