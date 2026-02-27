'use client';

import { useState } from 'react';
import type { FAQCategory } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import Button from '@/components/shared/Button';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface FAQClientProps {
  categories: FAQCategory[];
}

const WHATSAPP_URL = `https://wa.me/14318291135?text=${encodeURIComponent('Hey SALTY! I have a question about your retreats.')}`;

// ── Hardcoded FAQ categories (until Sanity is wired) ──

const PLACEHOLDER_CATEGORIES: FAQCategory[] = [
  {
    _id: 'about',
    name: 'About Fitness Retreats',
    slug: 'about-fitness-retreats',
    questions: [
      {
        question: 'What is a fitness retreat?',
        answer:
          'A fitness retreat is a group trip that combines structured workouts, adventure activities, and travel into one package. Think: daily training sessions, surfing, hiking, yoga, and cultural excursions — all in a stunning destination with like-minded people.',
      },
      {
        question: 'How is SALTY different from other fitness retreats?',
        answer:
          'We\'re not a boot camp and we\'re not a luxury spa. SALTY is the sweet spot — real workouts, real adventures, real connections. No gimmicks, no pretension, just a damn good time with people who like to move.',
      },
      {
        question: 'What does a typical SALTY retreat day look like?',
        answer:
          'Every retreat is different, but most days include a morning workout, a group activity or excursion, free time to explore or relax, and group dinners. You set the pace — nothing is mandatory.',
      },
      {
        question: 'How many people go on each retreat?',
        answer:
          'Group sizes typically range from 20 to 40 guests. It\'s big enough to meet a ton of people but small enough that it still feels personal.',
      },
      {
        question: 'What\'s the age range?',
        answer:
          'Most SALTY guests are between 25 and 45, but we\'ve had amazing guests of all ages. If you like fitness, adventure, and good vibes — you\'re the right age.',
      },
    ],
  },
  {
    _id: 'solo',
    name: 'Solo Travel',
    slug: 'solo-travel',
    questions: [
      {
        question: 'Can I go on a SALTY retreat solo?',
        answer:
          'Absolutely — over 65% of our guests travel solo. Our retreats are designed to bring people together, so you\'ll make friends fast. Most solo travelers say it\'s the best decision they ever made.',
      },
      {
        question: 'Will I have a roommate?',
        answer:
          'It depends on the room type you book. Some retreats offer shared rooms (matched with another guest), private rooms, and premium suites. You choose what works for you when booking.',
      },
      {
        question: 'I\'m nervous about going alone. Is that normal?',
        answer:
          'Totally normal — and totally worth it. We hear this from almost every solo guest before the trip. After the trip? They\'re already booking the next one. The SALTY community is incredibly welcoming.',
      },
    ],
  },
  {
    _id: 'included',
    name: "What's Included",
    slug: 'whats-included',
    questions: [
      {
        question: 'What\'s included in the retreat price?',
        answer:
          'Accommodation, daily group workouts, planned activities and excursions, most meals, airport transfers, and a crew of coaches and guides. Flights and travel insurance are not included.',
      },
      {
        question: 'Are flights included?',
        answer:
          'Flights are not included. We provide suggested flight windows and airport transfer times so you can book the best option for your location and budget.',
      },
      {
        question: 'Are meals included?',
        answer:
          'Most meals are included — typically breakfast and dinner daily, plus some group lunches. You\'ll have some free meals to explore local restaurants on your own, which is part of the experience.',
      },
      {
        question: 'What about alcohol?',
        answer:
          'Some meals include drinks, but alcohol isn\'t fully covered. Most destinations have very affordable drinks, and we always hit great local spots for sundowners.',
      },
    ],
  },
  {
    _id: 'booking',
    name: 'Booking & Payment',
    slug: 'booking-payment',
    questions: [
      {
        question: 'How do I book a retreat?',
        answer:
          'Pick your retreat, choose your room type, and lock it in with a deposit. You\'ll get a confirmation email with all the details and next steps.',
      },
      {
        question: 'Is there a payment plan?',
        answer:
          'Yes! Most retreats offer a deposit to lock in your spot, then you can spread the remaining balance over monthly installments leading up to the trip.',
      },
      {
        question: 'What if I need to cancel?',
        answer:
          'Each retreat has its own cancellation policy listed on the booking page. We try to be flexible, but timelines vary based on vendor commitments. Check the specific retreat page for details.',
      },
      {
        question: 'Can I transfer my booking to someone else?',
        answer:
          'In some cases, yes — reach out to us and we\'ll do our best to make it work. The earlier you let us know, the easier it is.',
      },
    ],
  },
  {
    _id: 'fitness',
    name: 'Fitness Level',
    slug: 'fitness-level',
    questions: [
      {
        question: 'Do I need to be super fit to join?',
        answer:
          'Nope. Our trips welcome all fitness levels. Activities are always optional — do as much or as little as you want. Whether you\'re a seasoned athlete or just getting started, there\'s a pace for you.',
      },
      {
        question: 'What kind of workouts do you do?',
        answer:
          'It varies by retreat and coach, but expect a mix of functional fitness, HIIT, yoga, and outdoor activities like surfing, hiking, or boxing. Every session has scaled options.',
      },
      {
        question: 'Are workouts mandatory?',
        answer:
          'Nothing on a SALTY retreat is mandatory. Want to sleep in and skip the morning session? Go for it. Want to do every single activity? Even better. Your trip, your pace.',
      },
    ],
  },
  {
    _id: 'destinations',
    name: 'Destinations',
    slug: 'destinations',
    questions: [
      {
        question: 'Where does SALTY go?',
        answer:
          'We host retreats in destinations around the world — think Costa Rica, Panama, Morocco, Sicily, El Salvador, Sri Lanka, and more. Each trip is curated to match the vibe of the destination.',
      },
      {
        question: 'How do you choose destinations?',
        answer:
          'We look for places with great weather, unique culture, adventure opportunities, quality accommodations, and — honestly — killer food. Every destination has to feel special.',
      },
      {
        question: 'Can I extend my trip before or after the retreat?',
        answer:
          'Totally! Many guests arrive early or stay late to explore on their own. We can help with recommendations for before/after the retreat.',
      },
    ],
  },
  {
    _id: 'logistics',
    name: 'Logistics',
    slug: 'logistics',
    questions: [
      {
        question: 'Do I need a passport?',
        answer:
          'Yes — all SALTY retreats are international. Make sure your passport is valid for at least 6 months past your travel dates.',
      },
      {
        question: 'Do I need travel insurance?',
        answer:
          'We strongly recommend it. Travel insurance covers unexpected cancellations, medical emergencies, and lost luggage. It\'s not included in the retreat price.',
      },
      {
        question: 'What should I pack?',
        answer:
          'We send a detailed packing list before each retreat. Generally: workout clothes, swimsuit, comfortable walking shoes, sunscreen, and a sense of adventure. Each destination has specific recommendations.',
      },
      {
        question: 'Is there Wi-Fi?',
        answer:
          'Yes, most of our accommodations have Wi-Fi. That said, we encourage you to disconnect as much as possible — the best memories happen offline.',
      },
      {
        question: 'What about dietary restrictions?',
        answer:
          'We\'ve got you covered. Let us know your dietary needs when booking and we\'ll work with our venues to accommodate allergies, vegetarian/vegan diets, and other restrictions.',
      },
      {
        question: 'What\'s the COVID policy?',
        answer:
          'We follow local health guidelines for each destination. Requirements change frequently, so we\'ll send updated info closer to your trip dates.',
      },
    ],
  },
];

export default function FAQClient({ categories }: FAQClientProps) {
  const displayCategories = categories.length > 0 ? categories : PLACEHOLDER_CATEGORIES;
  const [activeTab, setActiveTab] = useState(displayCategories[0]?.slug || '');

  const activeCategory = displayCategories.find((c) => c.slug === activeTab) || displayCategories[0];

  // Combine all questions for schema markup
  const allQuestions = displayCategories.flatMap((c) => c.questions || []);

  return (
    <main>
      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allQuestions.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          }),
        }}
      />

      {/* ── 1. HERO ── */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{ minHeight: '45vh', backgroundColor: '#0E3A2D' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-12">
          <ScrollReveal>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 6vw, 56px)',
                color: '#F7F4ED',
                lineHeight: 1.1,
              }}
            >
              Fitness Retreat Questions Answered
            </h1>
            <p
              className="mt-4 max-w-lg mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              Everything you need to know before booking your SALTY adventure.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 2. TABBED FAQ ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          {/* Tab Navigation */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {displayCategories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveTab(cat.slug)}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: cat.slug === activeTab ? 700 : 500,
                    fontSize: '13px',
                    backgroundColor: cat.slug === activeTab ? '#0E3A2D' : 'transparent',
                    color: cat.slug === activeTab ? '#F7F4ED' : '#0E3A2D',
                    border: cat.slug === activeTab ? 'none' : '1.5px solid #E7D7C0',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active Tab Content */}
          {activeCategory && (
            <div key={activeCategory.slug}>
              <h2
                className="uppercase mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  color: '#0E3A2D',
                }}
              >
                {activeCategory.name}
              </h2>
              <FAQAccordion
                items={activeCategory.questions || []}
                withSchema={false}
              />
            </div>
          )}
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="right" />

      {/* ── 3. STILL HAVE QUESTIONS? ── */}
      <section className="py-16 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                color: '#F7F4ED',
              }}
            >
              Still Have Questions?
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              We&apos;re real people and we love chatting about trips. Shoot us a
              message and we&apos;ll get back to you fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Chat With Us
                </Button>
              </a>
              <Link href="/retreats">
                <Button variant="secondary" size="lg">
                  See Upcoming Trips
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
