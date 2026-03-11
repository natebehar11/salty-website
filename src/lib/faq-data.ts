/**
 * SALTY Retreats — Centralized FAQ data
 * Source: SALTY-FAQ-DATA.md (March 2026)
 *
 * Usage:
 * - Homepage: import HOMEPAGE_FAQS
 * - /faq page: import FAQ_CATEGORIES
 * - Schema: import generateFAQSchema
 *
 * TODO: When production-ready, migrate to Sanity CMS for editable FAQ content.
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  questions: FAQItem[];
}

/** IDs for the curated 10-question homepage subset */
export const HOMEPAGE_FAQ_IDS = [
  'solo-who-are-retreats-for',
  'solo-can-i-join-alone',
  'logistics-flights-included',
  'logistics-airport-transfers',
  'logistics-where-do-you-travel',
  'fitness-what-workouts',
  'fitness-what-level',
  'booking-what-size-trips',
  'fitness-do-you-surf-every-retreat',
  'booking-become-a-coach',
] as const;

/** IDs for /retreats hub page FAQ accordion (retreat-picking focused) */
export const RETREATS_HUB_FAQ_IDS = [
  'solo-can-i-join-alone',
  'fitness-need-to-be-fit',
  'included-whats-included',
  'booking-how-to-book',
  'booking-payment-plans',
  'daily-typical-day',
  'logistics-where-do-you-travel',
  'booking-cancellation',
  'solo-age-range',
  'booking-what-size-trips',
  'logistics-travel-insurance',
  'logistics-flights-included',
  'logistics-arrive-early-stay-late',
] as const;

/** IDs for /fitness-retreats page FAQ (SEO-focused subset) */
export const FITNESS_RETREATS_FAQ_IDS = [
  'solo-who-are-retreats-for',
  'solo-can-i-join-alone',
  'logistics-flights-included',
  'logistics-airport-transfers',
  'logistics-where-do-you-travel',
] as const;

/** Get flat FAQ items by ordered list of IDs. Throws if any ID is missing. */
export function getFaqsByIds(ids: readonly string[]): { question: string; answer: string }[] {
  const byId = new Map<string, { question: string; answer: string }>();
  for (const cat of FAQ_CATEGORIES) {
    for (const q of cat.questions) {
      byId.set(q.id, { question: q.question, answer: q.answer });
    }
  }
  return ids.map((id) => {
    const item = byId.get(id);
    if (!item) throw new Error(`FAQ: ID "${id}" not found in FAQ_CATEGORIES`);
    return item;
  });
}

/** Full 6-category FAQ structure */
export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'solo-travel',
    title: 'Solo Travel',
    slug: 'solo-travel',
    description:
      "Many guests book solo. Here's what you need to know about travelling with us on your own.",
    questions: [
      {
        id: 'solo-who-are-retreats-for',
        question: 'Who are SALTY Retreats for?',
        answer:
          "Anyone who loves fun, fitness, and adventure. Our guests come from all over the world — different ages, backgrounds, and fitness levels, but they share one thing in common: a love for good vibes, good people, and feeling alive.",
      },
      {
        id: 'solo-come-alone-or-friends',
        question: 'Do most guests come alone or with friends?',
        answer:
          "Many come solo. We also see couples, siblings, and friend groups, but a big portion of guests book on their own. That's intentional — SALTY is designed for all people who want to travel without waiting for someone else's schedule to align and those looking forward to meeting new people. Solo travelers set the tone, and it's a good one.",
      },
      {
        id: 'solo-can-i-join-alone',
        question: 'Can I join the retreat alone? What age are the other travelers?',
        answer:
          "100% yes! Our travelers range in age, but what really matters is the shared love for fun, movement, and adventure. You'll be surrounded by like-minded people who are here for the same reason — to have an unforgettable experience.",
      },
      {
        id: 'solo-safe-for-women',
        question: 'Is this retreat safe for solo female travelers?',
        answer:
          "Safety is a priority. Our retreats are in vetted locations with trusted local partners. You'll be with a group of 25-40 guests plus SALTY coaches the entire time. Airport transfers are included, accommodations are secure, and you're never navigating unfamiliar places alone. 75%+ of our guests are women, many traveling solo for the first time internationally.",
      },
      {
        id: 'solo-weird-to-go-alone',
        question: 'Is it weird to go on a retreat alone?',
        answer:
          "Not at all, and you won't be alone for long. ~50% of SALTY guests book solo, which means most people arrive not knowing anyone. By dinner on day one, that changes. We build the schedule around connection: shared meals, partner workouts, group adventures, and enough downtime to actually talk. Strangers become friends fast. Many guests say the people they meet are the highlight of the trip.",
      },
      {
        id: 'solo-age-range',
        question: "What's the age range of guests?",
        answer:
          "Typically 28-45, but we've had guests in their early 20s and guests in their 60s pushing the pace (and kicking ass in workouts). Age matters less than energy. If you're curious, active, and up for a week of movement and adventure, you'll fit right in. We don't worry about age, just vibes.",
      },
      {
        id: 'solo-connect-before-trip',
        question: 'Can I connect with guests before the trip?',
        answer:
          "Yes. About a month before departure, we create a private WhatsApp group for your retreat. Guests introduce themselves, share flight times, and coordinate arrivals. Some people plan to meet at the airport. By the time you land, you'll already have names and faces to look for.",
      },
      {
        id: 'solo-will-i-meet-people',
        question: 'Will I meet people if I travel solo?',
        answer:
          "Yes! Meeting people is built into how SALTY works. You'll share meals family-style, work out in groups, and explore together. We also create a private WhatsApp group about a month before departure so you can connect with fellow guests before you even land. By day two, you'll have inside jokes with people you just met.",
      },
      {
        id: 'solo-shy-introverted',
        question: "What if I'm shy or introverted — will I still enjoy it?",
        answer:
          "Yes. Introverts thrive at SALTY because connection happens naturally, not through forced icebreakers. You'll bond over workouts, meals, and shared experiences rather than small talk. Plus, there's built-in downtime every day if you need to recharge. Many of our quieter guests say they felt seen and included without having to perform. And don't forget... everything is optional. Never any pressure.",
      },
      {
        id: 'solo-dont-drink',
        question: "What if I don't drink alcohol?",
        answer:
          "You'll fit right in. SALTY isn't a booze cruise — it's a fitness retreat with social nights mixed in. We host 2 cocktail evenings per retreat, but mocktails are always available and nobody tracks what's in your glass. Plenty of guests don't drink at all or keep it light. The energy comes from the people and the experience, not the bar. You won't be the odd one out, and nobody will pressure you. Show up how you are.",
      },
    ],
  },
  {
    id: 'whats-included',
    title: "What's Included",
    slug: 'whats-included',
    description: 'The short answer: almost everything. Here\'s the breakdown.',
    questions: [
      {
        id: 'included-whats-not-included',
        question: "What's NOT included that I should budget for?",
        answer:
          "Budget for: flights, travel insurance, additional alcohol beyond hosted events, spa services, optional add-on excursions, and personal spending (souvenirs, extra meals out). Tipping is appreciated but not required. Most guests spend $200-400 on extras, but that's totally at your own discretion and control.",
      },
      {
        id: 'included-single-supplement',
        question: 'Is there a single supplement fee for solo travelers?',
        answer:
          "For private rooms, yes — there's a higher rate since you're not sharing. For shared room options (double, triple, quad, dorm), solo travelers pay the same per-person rate as everyone else. If you book a shared room and don't have someone to share with, we'll match you with another guest of the same gender.",
      },
      {
        id: 'included-whats-included',
        question: 'What is included in the retreat price?',
        answer:
          'Your retreat includes: accommodations for 7 nights (or the duration listed), most meals (breakfast, lunch, dinner plus snacks), 3-4 coached movement sessions daily (strength, yoga, pilates, boxing, surf), airport transfers on arrival and departure days, at least one excursion (boat day, waterfall hike, cultural tour), 1-2 hosted cocktail nights, and professional photo/video coverage. We pack in value so you can stop planning and start enjoying.',
      },
      {
        id: 'included-how-many-meals',
        question: 'How many meals are included?',
        answer:
          'Nearly every meal is included — 3 meals per day plus snacks. On most retreats, 1-2 meals are "on your own" so you can explore local restaurants. All group meals are chef-prepared with fresh, local ingredients. All dietary restrictions can be accommodated with advance notice.',
      },
      {
        id: 'included-airport-transfers',
        question: 'Are airport transfers included?',
        answer:
          "Yes, on official arrival and departure days. We coordinate group transfers from the listed airport to the retreat and back. If you arrive early or depart late, we'll recommend safe, reliable drivers, but those transfers are at your own cost.",
      },
      {
        id: 'included-flights',
        question: 'Are flights included in the price?',
        answer:
          "No — you book your own flights. We do this intentionally so you can use points, choose your airline, and travel on your schedule. Each retreat page lists the airport to fly into and the recommended arrival window. Once you land during that window, we handle everything from there.",
      },
      {
        id: 'included-surfing-cost',
        question: 'Is surfing included or an extra cost?',
        answer:
          "On retreats that include surf, your lessons and board rental are included in the price. Local instructors lead small-group sessions for all levels. If you'd rather skip surf and do something else, that's completely fine — participation is always optional. Each surf-destination has a different package, be sure to inquire directly!",
      },
      {
        id: 'included-worth-the-money',
        question: 'Is a wellness retreat worth the money?',
        answer:
          "If you priced out a similar week yourself: 7 nights of quality accommodation, 20+ coached fitness sessions, daily meals, surf lessons, excursions, airport transfers, and professional photography — you'd spend $2,500-4,000 before factoring in the 20+ hours of research and planning. SALTY retreats run $2,200-4,500 depending on room type, with everything handled for you. The real value is harder to price: showing up to a week that's fully planned, meeting people who become genuine friends, and coming home with a camera roll (and stories) you didn't have to orchestrate. Most guests say they'd pay more.",
      },
    ],
  },
  {
    id: 'fitness-levels',
    title: 'Fitness Levels',
    slug: 'fitness-levels',
    description: "You don't need to be an athlete. You just need to be willing to move.",
    questions: [
      {
        id: 'fitness-cant-surf',
        question: "I can't surf, can I still come?",
        answer:
          "Absolutely. Surf is optional on retreats that offer it, and lessons are designed for beginners. Local instructors will have you standing on a board faster than you'd expect. If surfing isn't your thing, there's plenty more to do — yoga, strength workouts, excursions, or just relaxing on the beach.",
      },
      {
        id: 'fitness-what-level',
        question: "What's the level of fitness on your retreats?",
        answer:
          "All activities are designed to be accessible for all levels. Whether you're a seasoned pro or just getting started, we've got you. If you have any physical restrictions or injuries, let us know — we'll make sure you can participate in a way that feels good for you.",
      },
      {
        id: 'fitness-need-to-be-fit',
        question: 'Do I need to be fit to join a SALTY retreat?',
        answer:
          "No specific fitness level is required. Every workout is accessible — our coaches offer modifications for beginners and progressions for experienced athletes in the same session. You'll see people of all fitness levels in every class, and no one's keeping score. Show up, move at your pace, and you'll be exactly where you need to be.",
      },
      {
        id: 'fitness-how-demanding',
        question: 'How physically demanding is a typical day?',
        answer:
          "Expect 3-4 movement sessions offered daily, ranging from 30-75 minutes each. You choose what you participate in — nothing is mandatory except fun. A typical day might include a morning strength class, midday surf or excursion, afternoon yoga, and evening social time. You can go all-in or take it easy. This is your vacation... you set your pace.",
      },
      {
        id: 'fitness-advanced',
        question: "What if I'm more advanced — will I be challenged?",
        answer:
          "Yes. While all workouts can scale down for beginners, they also scale up. Coaches offer progressions, heavier weights, and spicier variations for those who want them. Our strength sessions, boxing classes, and beach HIIT will challenge anyone. If you want to be sore, we will happily oblige!",
      },
      {
        id: 'fitness-never-done-yoga',
        question: "What if I've never done yoga before?",
        answer:
          "No problem! Our yoga classes are led by experienced instructors who cue for all levels. You won't be expected to know poses or have any flexibility. We offer flow classes for movement, power yoga for challenge, and yin/restorative sessions for recovery. Try them all or stick to what feels good.",
      },
      {
        id: 'fitness-injury-modification',
        question: 'Can I modify exercises if I have an injury or limitation?',
        answer:
          "Yes. Let us know about any injuries or limitations when you book, and remind your coaches on day one. Our instructors are trained to offer modifications for every exercise. If something doesn't work for your body, we'll find an alternative. You're there to feel good, not push through pain.",
      },
      {
        id: 'fitness-what-workouts',
        question: 'What kind of workouts do you offer?',
        answer:
          "Every retreat includes a mix of strength, yoga, boxing, Pilates, mobility, and more — led by our diverse team of coaches to keep things fresh, fun, and challenging.",
      },
      {
        id: 'fitness-do-you-surf-every-retreat',
        question: 'Do you surf on every retreat?',
        answer:
          "Some trips include a surf lesson or two, while others keep it optional. No need to be a surfer — just come ready to move, explore, and have fun in (or out of) the water.",
      },
    ],
  },
  {
    id: 'daily-experience',
    title: 'Daily Experience',
    slug: 'daily-experience',
    description: "What actually happens when you're there.",
    questions: [
      {
        id: 'daily-typical-day',
        question: 'What does a typical day look like?',
        answer:
          "Mornings start with optional early movement (\"Morning Crew\"), followed by a yoga flow or pilates and group breakfast. Midday brings adventure — surf, hikes, excursions, or free time to explore or relax. Afternoons include workshops or a second workout, then snacks and sunset. Evenings are group dinners followed by themed nights, dancing, or chill hangs. Every day has structure, but nothing is mandatory.",
      },
      {
        id: 'daily-morning-start-time',
        question: 'What time do activities start in the morning?',
        answer:
          "First activity is usually around 6:30 or 7am for the optional \"Morning Crew\" (early workout for keeners). The main morning session starts around 7:30-8:30am, followed by breakfast right after. You won't be dragged out of bed at 5am — but sunrise yoga exists if you want it.",
      },
      {
        id: 'daily-free-time',
        question: 'How much free time will I have?',
        answer:
          "Every day includes built-in downtime, usually 2-4 hours in the middle of the day and time after dinner. Some guests use it to explore town, nap, journal, or hang by the pool. The balance of structure and freedom is intentional — you're on vacation, not at boot camp. And we'll stress it again, nothing is mandatory! Take what you need, please.",
      },
      {
        id: 'daily-alone-time',
        question: 'Can I have alone time if I need it?',
        answer:
          "Yes, absolutely. Alone time is built into every day, and you can take more whenever you need it. Skip a session, wander into town, or just disappear to your room for a few hours. Nobody tracks attendance. Introverts are welcome, recharge however you need to.",
      },
      {
        id: 'daily-participate-all',
        question: 'Do I have to participate in all activities?',
        answer:
          "No. Everything is optional except fun. Want to skip the morning workout and sleep in? Go for it. Prefer to read by the pool instead of surfing? That's fine. The schedule exists so you don't have to plan anything, but you always choose what feels right for your day.",
      },
      {
        id: 'daily-evenings',
        question: 'What happens in the evenings?',
        answer:
          "Evenings start with group dinner, always together, family-style. After that, it depends on the night. Some evenings are chill: games, conversation, then bedtime restorative yoga. Others are livelier: themed dinners, dancing, hosted cocktails. Each retreat has 2-3 bigger nights and plenty of relaxed ones. You'll know the vibe in advance.",
      },
    ],
  },
  {
    id: 'booking-payment',
    title: 'Booking & Payment',
    slug: 'booking-payment',
    description: 'No complicated math. No mystery fees. Here\'s how it works.',
    questions: [
      {
        id: 'booking-payment-plans',
        question: 'Do you offer payment plans?',
        answer:
          "Yes. You can pay in full, split into 2 payments (no extra fee), or split into 3 payments ($50 admin fee). Payment plans are handled through Movement Travel after your initial booking.",
      },
      {
        id: 'booking-how-to-book',
        question: 'How do I book a SALTY retreat?',
        answer:
          "Start by paying the $350 wellness programming fee on our website — this secures your spot. After that, Lisa from our travel partner Movement Travel will reach out to complete your accommodations booking and collect the remaining balance. Two steps, and you're in.",
      },
      {
        id: 'booking-cancellation',
        question: 'What is your cancellation policy?',
        answer:
          "All payments are non-refundable. We commit to accommodations, coaches, and local partners well in advance, so we can't pull those funds back. In rare cases, the $350 wellness fee may be transferred to another retreat within 12 months — subject to availability and our discretion. We strongly recommend travel insurance for peace of mind.",
      },
      {
        id: 'booking-how-far-advance',
        question: 'How far in advance should I book?',
        answer:
          "As early as you can. Our retreats typically sell out 6-8 weeks before departure, and popular room types go faster. Booking early also gives you more time to plan flights and spread out payments. If you're on the fence, reach out — we can answer questions and hold a soft spot while you decide.",
      },
      {
        id: 'booking-deposit-balance',
        question: 'How much is the deposit and when is the full balance due?',
        answer:
          "The initial deposit is $350, which goes toward your total retreat cost. After booking, you'll receive payment schedule details from Movement Travel. Full balance is typically due 60-90 days before departure, depending on the retreat. We can always work with you if alternative timelines are needed!",
      },
      {
        id: 'booking-transfer',
        question: 'Can I transfer my booking to a different retreat?',
        answer:
          "The $350 wellness programming fee may be transferable to another retreat within 12 months, depending on availability. Accommodation payments made to Movement Travel cannot be transferred or refunded. If you need to change dates, contact us as early as possible and we'll do our best.",
      },
      {
        id: 'booking-early-bird',
        question: 'Do you offer early bird discounts?',
        answer:
          "Sometimes. Sign up for our email list to hear about early bird pricing and special offers before they go public. Repeat guests always get first access.",
      },
      {
        id: 'booking-what-size-trips',
        question: 'What size are your trips?',
        answer:
          'Each retreat brings together 20-50 guests, creating the perfect mix of energy and connection without feeling crowded.',
      },
      {
        id: 'booking-become-a-coach',
        question: 'How do I become a SALTY Coach?',
        answer:
          "Start by joining a retreat. It's the best way for us to get to know your vibe, energy, and coaching style before we explore bringing you onto the team.",
      },
    ],
  },
  {
    id: 'travel-logistics',
    title: 'Travel & Logistics',
    slug: 'travel-logistics',
    description: "You book the flight. We've got everything else.",
    questions: [
      {
        id: 'logistics-flight-delayed',
        question: 'What if my flight is delayed or I arrive late?',
        answer:
          "Let us know as soon as possible via WhatsApp. If you miss the group transfer window, we'll connect you with a trusted local driver. The cost of late arrivals is on you, but we'll make sure you get to the retreat safely. Don't stress — we've handled delayed flights before.",
      },
      {
        id: 'logistics-which-airport',
        question: 'What airport should I fly into?',
        answer:
          "Each retreat page lists the specific airport and recommended arrival window. For example: Costa Rica retreats fly into San Jose (SJO), Panama into Tocumen (PTY), Morocco into Agadir (AGA). Check your retreat page for exact details and plan to land within the arrival window so we can pick you up.",
      },
      {
        id: 'logistics-travel-insurance',
        question: 'Do I need travel insurance?',
        answer:
          "Strongly recommended. Travel insurance covers medical emergencies abroad, trip cancellation, lost baggage, and adventure activities like surfing. Since our payments are non-refundable, insurance gives you protection if something unexpected happens. Movement Travel can recommend providers when you book.",
      },
      {
        id: 'logistics-what-to-pack',
        question: 'What should I pack for a wellness retreat?',
        answer:
          "Pack light and practical: 4-6 workout outfits (quick-dry fabrics), 2-4 swimsuits, casual clothes for evenings, a light layer for air conditioning, sneakers, sandals, reef-safe sunscreen, and a reusable water bottle. We provide all workout equipment, yoga mats, and surf gear. Full packing lists are sent before each retreat.",
      },
      {
        id: 'logistics-arrive-early-stay-late',
        question: 'Should I arrive early or stay extra days?',
        answer:
          "Many guests do. Arriving a day early helps you adjust to the time zone, avoid rushing, and start the retreat relaxed. Staying an extra night after the retreat is also popular — better than going straight from farewell dinner to the airport. We can recommend accommodations for buffer days.",
      },
      {
        id: 'logistics-visa',
        question: 'Do I need a visa to travel?',
        answer:
          "It depends on your passport and destination. Nicaragua, Costa Rica, and Panama are visa-free for most North American and European passports. Sri Lanka requires an online ETA (easy, 5 minutes). Morocco and Sicily have their own requirements. Check your government's travel site or the destination embassy — we'll also send resources when you book.",
      },
      {
        id: 'logistics-flights-included',
        question: 'Are flights included?',
        answer: 'No, flights are not included.',
      },
      {
        id: 'logistics-airport-transfers',
        question: 'Are airport transfers included? If so, are they at specific times?',
        answer:
          "Yes! Airport transfers are included, but they run at set times. When you book, we'll provide the details, including the latest arrival time to catch the group transfer.",
      },
      {
        id: 'logistics-where-do-you-travel',
        question: 'Where do you travel to?',
        answer:
          "We host retreats in some of the world's most beautiful places — from the beaches of Central America to the coasts of Asia and the islands of Europe.",
      },
    ],
  },
];

/** Curated 10-question subset for homepage accordion (no categories) */
export const HOMEPAGE_FAQS = getFaqsByIds(HOMEPAGE_FAQ_IDS);

/** Prebuilt FAQ subset for /retreats hub page */
export const RETREATS_HUB_FAQS = getFaqsByIds(RETREATS_HUB_FAQ_IDS);

/** Prebuilt FAQ subset for /fitness-retreats page */
export const FITNESS_RETREATS_FAQS = getFaqsByIds(FITNESS_RETREATS_FAQ_IDS);

/**
 * FAQ categories in Sanity-compatible shape for FAQClient.
 * Use when CMS returns empty; migrate to Sanity when production-ready.
 */
export const FAQ_CATEGORIES_FOR_CLIENT = FAQ_CATEGORIES.map((cat) => ({
  _id: cat.id,
  name: cat.title,
  slug: cat.slug,
  description: cat.description,
  questions: cat.questions.map((q) => ({ question: q.question, answer: q.answer })),
}));

/** Generate FAQPage schema.org JSON-LD from categories or flat items */
export function generateFAQSchema(
  source: FAQCategory[] | { question: string; answer: string }[]
): object {
  const items: { question: string; answer: string }[] =
    Array.isArray(source) &&
    source.length > 0 &&
    'questions' in source[0] &&
    Array.isArray((source[0] as FAQCategory).questions)
      ? (source as FAQCategory[]).flatMap((cat) => cat.questions)
      : (source as { question: string; answer: string }[]);

  const questions = items.map((q) => ({
    '@type': 'Question' as const,
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: q.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions,
  };
}
