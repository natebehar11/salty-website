export interface RetreatDay {
  day: number;
  title: string;
  location: string;
  summary: string;
  details: string;
  meals: string;
  accommodation: string;
}

export interface RoomTier {
  name: string;
  priceUSD: number;
  description: string;
  features: string[];
  spotsLeft?: number;
}

export interface Coach {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  personality: string;
  photoUrl?: string;
  cardColor: string;
}

export interface Activity {
  name: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MeterDimension {
  label: string;
  value: number;
}

export interface Testimonial {
  guestName: string;
  quote: string;
  rating: number;
  retreatLabel: string;
}

export interface DailyRhythm {
  time: string;
  activity: string;
}

export interface RetreatData {
  slug: string;
  name: string;
  officialName: string;
  destination: string;
  country: string;
  dates: string;
  startDate: string;
  endDate: string;
  duration: number;
  groupSize: string;
  lowestPrice: number;
  heroImage: string;
  geoDescription: string;
  experienceNarrative: string[];
  forYouIf: string[];
  included: string[];
  notIncluded: string[];
  activities: Activity[];
  dailyRhythm: DailyRhythm[];
  itinerary: RetreatDay[];
  roomTiers: RoomTier[];
  paymentPolicy: string;
  cancellationPolicy: string;
  accommodationName: string;
  accommodationDescription: string;
  accommodationFeatures: string[];
  coaches: Coach[];
  meter: MeterDimension[];
  bestFor: string[];
  maybeNotFor: string[];
  testimonials: Testimonial[];
  faqs: FAQ[];
}

export const PANAMA_RETREAT: RetreatData = {
  slug: 'panama-fitness-retreat',
  name: 'Panama',
  officialName: 'City to Sea',
  destination: 'Panama City + Santa Catalina',
  country: 'Panama',
  dates: 'March 14–22, 2026',
  startDate: '2026-03-14',
  endDate: '2026-03-22',
  duration: 9,
  groupSize: '35–45',
  lowestPrice: 2249,
  heroImage: '/images/retreats/panama-hero.jpg',

  geoDescription:
    'A Panama fitness retreat combines surf lessons, daily group workouts, and coastal exploration across Panama City and Santa Catalina. Wake up to the Pacific, train with pro coaches, surf warm-water breaks, and hike through jungle canopy — all with a crew of 35–45 guests who came to move, explore, and have a damn good time.',

  experienceNarrative: [
    'Nine days split between Panama City\'s buzzing Casco Viejo and Santa Catalina\'s empty surf breaks. You\'ll start in the city — rooftop workouts with skyline views, fresh ceviche at local markets, and a first-night dinner that sets the tone. Then we drive west to the coast, where the days open up: morning surf sessions, beachside yoga, afternoon hikes to hidden waterfalls, and group dinners under string lights.',
    'This trip is built for people who want to sweat and explore in equal measure. Every workout is coached and scalable — whether you\'re a competitive athlete or someone who just started moving again. The surf instruction is legit (small groups, patient instructors, warm water). And the downtime is real: hammocks, cold beers, sunsets that make you put your phone down.',
    'You don\'t need to be in great shape. You don\'t need to know how to surf. You just need to show up ready to try things, meet people, and have more fun than you\'ve had in a while.',
  ],

  forYouIf: [
    'You want a vacation that actually makes you feel better, not worse',
    'You love working out but hate doing it alone',
    'You\'ve been meaning to learn to surf (or want to get better)',
    'You travel solo and want a built-in crew',
    'You want someone else to plan the whole damn thing',
  ],

  included: [
    '8 nights accommodation (Panama City + Santa Catalina)',
    'Daily group workouts with pro coaches',
    'Surf lessons with certified instructors (boards + rashguards included)',
    'Sunrise yoga sessions',
    'Guided jungle hike',
    'All transportation between locations',
    'Welcome dinner in Casco Viejo',
    'Group dinners (5 of 8 nights)',
    'Airport pickup on arrival day',
    'SALTY swag bag',
    'Access to SALTY community WhatsApp group',
    'Professional trip photos',
  ],

  notIncluded: [
    'International flights to/from Panama City (PTY)',
    'Travel insurance (required)',
    'Lunches and 3 dinners (we\'ll eat out together — budget ~$15-20/meal)',
    'Personal expenses and souvenirs',
    'Alcoholic beverages outside of included dinners',
    'Optional excursions (fishing trip, island day trip)',
  ],

  activities: [
    { name: 'Surf Lessons', description: 'Small-group instruction at Santa Catalina\'s best breaks. All levels welcome.', icon: '🏄' },
    { name: 'Daily Workouts', description: 'Coached group sessions — HIIT, strength, functional fitness. Always scalable.', icon: '💪' },
    { name: 'Sunrise Yoga', description: 'Start your day right with ocean-view yoga sessions led by certified instructors.', icon: '🧘' },
    { name: 'Jungle Hike', description: 'Trek through Panama\'s tropical canopy to hidden waterfalls and lookout points.', icon: '🌴' },
    { name: 'Group Dinners', description: 'Share incredible local food together — from fresh ceviche to traditional Panamanian feasts.', icon: '🍽️' },
    { name: 'Beach Time', description: 'Hammocks, cold drinks, warm water. Real rest between all the action.', icon: '🏖️' },
  ],

  dailyRhythm: [
    { time: 'Morning', activity: 'Sunrise yoga → Breakfast → Group workout' },
    { time: 'Midday', activity: 'Surf lesson or free time → Lunch' },
    { time: 'Afternoon', activity: 'Activity (hike, explore, beach) or rest' },
    { time: 'Evening', activity: 'Group dinner or free night → Sunset drinks' },
  ],

  itinerary: [
    {
      day: 1,
      title: 'Arrival in Panama City',
      location: 'Panama City — Casco Viejo',
      summary: 'Airport pickup, hotel check-in, welcome dinner in the historic quarter.',
      details: 'Land at Tocumen International Airport (PTY) where our team picks you up. Settle into our boutique hotel in Casco Viejo — the cobblestoned, UNESCO-listed heart of Panama City. Evening welcome dinner on a rooftop terrace overlooking the old town and the modern skyline. Meet your crew, your coaches, and get the lay of the land.',
      meals: 'Dinner included',
      accommodation: 'Boutique hotel, Casco Viejo',
    },
    {
      day: 2,
      title: 'City Sweat',
      location: 'Panama City',
      summary: 'Rooftop workout, city exploration, local market lunch, sunset session.',
      details: 'Morning rooftop workout with views of the city skyline — functional fitness, all levels welcome. After breakfast, explore Casco Viejo: street art walking tour, coffee at local roasters, lunch at Mercado de Mariscos (the famous seafood market). Afternoon sunset yoga session. Evening: free night to explore the city\'s restaurants and bars with your new crew.',
      meals: 'Breakfast included',
      accommodation: 'Boutique hotel, Casco Viejo',
    },
    {
      day: 3,
      title: 'Journey to the Coast',
      location: 'Panama City → Santa Catalina',
      summary: 'Morning workout, scenic drive west, beachside check-in, group dinner.',
      details: 'Early morning workout before we pack up and drive west (~5 hours with stops). We\'ll break for lunch at a local roadside spot. Arrive in Santa Catalina by mid-afternoon — check into our beachfront property, toes in the sand. Group dinner at a local restaurant with fresh-caught fish and cold Balboas.',
      meals: 'Breakfast, Dinner included',
      accommodation: 'Beachfront property, Santa Catalina',
    },
    {
      day: 4,
      title: 'First Surf Day',
      location: 'Santa Catalina',
      summary: 'Sunrise yoga, first surf lesson, afternoon beach time, group dinner.',
      details: 'Sunrise yoga on the beach. After breakfast, your first surf lesson — small groups (max 4:1 student-to-instructor ratio), warm water, sandy bottom breaks perfect for learning. Boards and rashguards provided. Afternoon: hammock time, swim, explore the small town. Group dinner with the crew.',
      meals: 'Breakfast, Dinner included',
      accommodation: 'Beachfront property, Santa Catalina',
    },
    {
      day: 5,
      title: 'Jungle & Sweat',
      location: 'Santa Catalina',
      summary: 'Morning workout, guided jungle hike to waterfall, evening bonfire.',
      details: 'Morning HIIT workout on the beach — the kind that makes you grateful for the ocean right there to cool off in. After breakfast, guided hike through the tropical jungle to a hidden waterfall. Swim in the freshwater pool, take photos you\'ll never stop posting. Back to base for lunch and downtime. Evening bonfire on the beach with drinks and stories.',
      meals: 'Breakfast, Dinner included',
      accommodation: 'Beachfront property, Santa Catalina',
    },
    {
      day: 6,
      title: 'Surf & Flow',
      location: 'Santa Catalina',
      summary: 'Sunrise yoga, second surf session, free afternoon, group dinner.',
      details: 'Sunrise yoga — by now you\'re starting to actually feel present. Second surf lesson builds on Day 4; those who caught their first wave are now working on turning. Free afternoon: optional fishing trip, more surfing on your own, or genuinely doing nothing on the beach (radical concept). Group dinner at the best restaurant in Santa Catalina.',
      meals: 'Breakfast, Dinner included',
      accommodation: 'Beachfront property, Santa Catalina',
    },
    {
      day: 7,
      title: 'Adventure Day',
      location: 'Santa Catalina + Coiba Island',
      summary: 'Optional island excursion or beach day, afternoon workout, farewell dinner.',
      details: 'Choose your adventure: optional boat trip to Coiba National Park (UNESCO World Heritage site) for snorkeling and wildlife spotting, or stay beachside for a chill day with optional extra surf time. Late afternoon group workout — a good one, coaches pull out all the stops. Farewell dinner together: a proper send-off with speeches nobody asked for and toasts everybody needed.',
      meals: 'Breakfast, Dinner included',
      accommodation: 'Beachfront property, Santa Catalina',
    },
    {
      day: 8,
      title: 'Last Morning',
      location: 'Santa Catalina → Panama City',
      summary: 'Final sunrise session, drive back to the city, free evening.',
      details: 'One last sunrise yoga — this one hits different. Breakfast together, pack up, and drive back to Panama City. Check into the city hotel. Free evening to explore, shop, or have one last dinner with your crew. Some people cry at this point. That\'s fine.',
      meals: 'Breakfast included',
      accommodation: 'Hotel, Panama City',
    },
    {
      day: 9,
      title: 'Departure',
      location: 'Panama City',
      summary: 'Breakfast, airport transfer, hugs, promises to come back.',
      details: 'Breakfast at the hotel. Airport transfers arranged for your flight home. Exchange numbers (you already have the WhatsApp group). Promise to come to the next trip. Mean it.',
      meals: 'Breakfast included',
      accommodation: 'N/A — departure day',
    },
  ],

  roomTiers: [
    {
      name: 'Standard Double',
      priceUSD: 2249,
      description: 'Share a comfortable room with one other guest. Great for solo travelers who want to make a friend on Day 1.',
      features: ['Shared room (2 guests)', 'Private bathroom', 'AC', 'All retreat activities included'],
      spotsLeft: 8,
    },
    {
      name: 'Premium Double',
      priceUSD: 2699,
      description: 'Upgraded room with better views and more space. Still shared, still social.',
      features: ['Shared room (2 guests)', 'Ocean or garden view', 'Private bathroom', 'AC', 'Mini fridge', 'All retreat activities included'],
      spotsLeft: 4,
    },
    {
      name: 'Private Room',
      priceUSD: 3099,
      description: 'Your own space to recharge. For people who need alone time after being "on" all day.',
      features: ['Private room (1 guest)', 'Ocean or garden view', 'Private bathroom', 'AC', 'Mini fridge', 'All retreat activities included'],
      spotsLeft: 2,
    },
    {
      name: 'Premium Private',
      priceUSD: 3499,
      description: 'The best room in the house. Suite-style with premium everything.',
      features: ['Premium private suite', 'Best ocean view', 'Private bathroom with rain shower', 'AC', 'Mini fridge', 'Balcony or terrace', 'All retreat activities included'],
      spotsLeft: 1,
    },
  ],

  paymentPolicy: 'Reserve your spot with a $500 USD deposit. Remaining balance due 60 days before the retreat start date. Payment plans available — ask us.',
  cancellationPolicy: 'Full refund (minus $100 admin fee) if cancelled 90+ days before departure. 50% refund 60-89 days. No refund within 60 days. Trip insurance strongly recommended.',

  accommodationName: 'Beachfront Villa, Santa Catalina + Boutique Hotel, Casco Viejo',
  accommodationDescription: 'Two properties, two vibes. In Panama City, you\'re in a restored colonial boutique hotel in UNESCO-listed Casco Viejo — rooftop pool, cobblestone streets, walking distance to everything. In Santa Catalina, you\'re right on the beach in a private villa compound — pool, communal spaces, hammocks everywhere, and the surf break is a 2-minute walk.',
  accommodationFeatures: [
    'Beachfront location in Santa Catalina',
    'Historic boutique hotel in Casco Viejo',
    'Pool at both properties',
    'Communal lounge and dining areas',
    'Wi-Fi throughout',
    'Air conditioning in all rooms',
    'Walking distance to town and restaurants',
  ],

  coaches: [
    {
      name: 'Erin Harris',
      role: 'Co-Founder & Coach',
      bio: 'CPT and RYT-200 who believes the best workout is the one you actually enjoy. Former corporate escapee turned full-time adventure architect.',
      specialties: ['Yoga', 'Guest Experience'],
      personality: 'The Heart',
      cardColor: '#B6D4EA',
    },
    {
      name: 'Nate Behar',
      role: 'Co-Founder & Coach',
      bio: 'Former CFL athlete who traded the playbook for a passport. Runs operations, leads workouts, and makes sure nobody takes themselves too seriously.',
      specialties: ['Strength', 'Operations'],
      personality: 'The Energy',
      cardColor: '#3A6B35',
    },
    {
      name: 'Riley',
      role: 'Yoga & Movement Coach',
      bio: 'RYT-500 who specializes in making yoga accessible for people who think they can\'t do yoga. Sunrise sessions that change how your whole day feels.',
      specialties: ['Vinyasa', 'Mobility'],
      personality: 'The Calm',
      cardColor: '#A4E5D9',
    },
    {
      name: 'Joe',
      role: 'Strength & Conditioning Coach',
      bio: 'CSCS with a gift for programming workouts that challenge competitive athletes and first-timers in the same session. Brings the hype without the toxic gym energy.',
      specialties: ['HIIT', 'Functional Fitness'],
      personality: 'The Hype',
      cardColor: '#C74235',
    },
  ],

  meter: [
    { label: 'Sweat', value: 7 },
    { label: 'Adventure', value: 7 },
    { label: 'Culture', value: 8 },
    { label: 'Party', value: 7 },
    { label: 'Rest', value: 6 },
  ],

  bestFor: [
    'Solo travelers looking for a built-in crew',
    'Fitness lovers who want variety (surf + gym + yoga)',
    'People curious about Panama beyond the canal',
    'Anyone who wants a vacation that\'s both active and social',
  ],

  maybeNotFor: [
    'People who need a strict schedule with zero downtime',
    'Anyone looking for a silent meditation retreat',
    'Travelers who prefer fully independent itineraries',
  ],

  testimonials: [
    {
      guestName: 'Sarah M.',
      quote: 'I came alone and left with 30 new friends. The workouts were incredible, the surf was life-changing, and I haven\'t laughed that hard in years.',
      rating: 5,
      retreatLabel: 'Panama 2025',
    },
    {
      guestName: 'James K.',
      quote: 'Best trip I\'ve ever taken. Period. The coaches are world-class, the locations are unreal, and the vibe is just... you have to experience it.',
      rating: 5,
      retreatLabel: 'Costa Rica 2024',
    },
    {
      guestName: 'Alex R.',
      quote: 'I was nervous about the fitness level required. Turns out, everyone was welcome. The coaches scale everything. I pushed myself and never felt left behind.',
      rating: 5,
      retreatLabel: 'El Salvador 2024',
    },
  ],

  faqs: [
    {
      question: 'Do I need to be in great shape?',
      answer: 'Nope. Every workout is coached and scalable to your fitness level. We\'ve had competitive athletes and complete beginners on the same trip — everyone gets a great experience. Show up willing to try, and we\'ll meet you where you are.',
    },
    {
      question: 'I\'ve never surfed before — is that okay?',
      answer: 'More than okay — most of our guests are first-time surfers. Our certified instructors teach in small groups (max 4:1 ratio) on beginner-friendly breaks with warm water and sandy bottoms. You\'ll be standing up by Day 2.',
    },
    {
      question: 'Is it weird to come alone?',
      answer: 'About 65% of our guests come solo. It\'s one of the best parts of SALTY — you show up alone and leave with a crew. The group dynamic clicks fast because everyone is there for the same reasons: to move, explore, and have fun.',
    },
    {
      question: 'What\'s the age range?',
      answer: 'Typically 25-45, but we\'ve had guests from 21 to 55. The common thread isn\'t age — it\'s energy. If you like to move, laugh, and try new things, you\'ll fit right in.',
    },
    {
      question: 'How much free time is there?',
      answer: 'Plenty. The schedule has structure (morning workout, midday activity), but afternoons usually have free time built in. Some people surf more, some hike, some nap in hammocks. We\'re not going to micromanage your vacation.',
    },
    {
      question: 'What should I pack?',
      answer: 'Workout clothes, swimsuit, sunscreen, a good attitude, and something to wear to dinner. We provide surf boards, rashguards, yoga mats, and workout equipment. Full packing list sent 30 days before departure.',
    },
    {
      question: 'Is travel insurance required?',
      answer: 'Yes. We require all guests to have travel insurance that covers trip cancellation, medical emergencies, and evacuation. We\'ll send recommendations with your booking confirmation.',
    },
    {
      question: 'Can I extend my stay?',
      answer: 'Absolutely. Many guests add days before or after the retreat to explore on their own. We\'re happy to help with recommendations and logistics.',
    },
    {
      question: 'What about dietary restrictions?',
      answer: 'We accommodate all dietary needs — vegetarian, vegan, gluten-free, allergies, you name it. Just let us know when you book and we\'ll make sure every meal works for you.',
    },
    {
      question: 'How do I get to Panama?',
      answer: 'Fly into Tocumen International Airport (PTY) in Panama City. We handle airport pickup on arrival day and transfers throughout the trip. Most major airlines fly direct from US/Canadian cities.',
    },
  ],
};
