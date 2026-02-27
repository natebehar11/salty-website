'use client';

import { useState } from 'react';
import type { BlogPostCard } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface BlogIndexClientProps {
  posts: BlogPostCard[];
}

type BlogCategory = 'all' | 'destinations' | 'fitness' | 'solo-travel' | 'packing-prep' | 'behind-the-scenes';

const CATEGORIES: { value: BlogCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'destinations', label: 'Destinations' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'solo-travel', label: 'Solo Travel' },
  { value: 'packing-prep', label: 'Packing & Prep' },
  { value: 'behind-the-scenes', label: 'Behind the Scenes' },
];

// Placeholder posts when Sanity is empty
const PLACEHOLDER_POSTS: BlogPostCard[] = [
  {
    _id: 'bp1',
    title: 'Best Fitness Retreats 2026: The Complete Guide',
    slug: 'best-fitness-retreats-2026',
    category: 'fitness',
    excerpt: 'Everything you need to know about choosing the right fitness retreat this year.',
    heroImage: null as unknown as BlogPostCard['heroImage'],
    publishedAt: '2026-01-15',
    authorName: 'Erin Harris',
  },
  {
    _id: 'bp2',
    title: 'Solo Travel Tips for Your First Fitness Retreat',
    slug: 'solo-travel-tips-fitness-retreats',
    category: 'solo-travel',
    excerpt: 'Nervous about traveling solo? Here\'s how to make the most of your first retreat.',
    heroImage: null as unknown as BlogPostCard['heroImage'],
    publishedAt: '2026-01-08',
    authorName: 'Nate Behar',
  },
  {
    _id: 'bp3',
    title: 'What to Pack for a Surf Retreat in Panama',
    slug: 'what-to-pack-surf-retreat-panama',
    category: 'packing-prep',
    excerpt: 'The complete packing list for your Panama adventure — from workout gear to reef-safe sunscreen.',
    heroImage: null as unknown as BlogPostCard['heroImage'],
    publishedAt: '2025-12-20',
    authorName: 'Erin Harris',
  },
  {
    _id: 'bp4',
    title: 'Why Morocco Is the Ultimate Fitness Retreat Destination',
    slug: 'morocco-fitness-retreat-destination',
    category: 'destinations',
    excerpt: 'From the Atlas Mountains to the Sahara: why Morocco delivers the perfect blend of adventure and culture.',
    heroImage: null as unknown as BlogPostCard['heroImage'],
    publishedAt: '2025-12-10',
    authorName: 'Nate Behar',
  },
  {
    _id: 'bp5',
    title: 'Behind the Scenes: How We Plan a SALTY Retreat',
    slug: 'how-we-plan-salty-retreat',
    category: 'behind-the-scenes',
    excerpt: 'A look inside the 12-month process of building a retreat from scratch.',
    heroImage: null as unknown as BlogPostCard['heroImage'],
    publishedAt: '2025-11-28',
    authorName: 'Nate Behar',
  },
  {
    _id: 'bp6',
    title: 'The Science of Why Fitness Retreats Actually Work',
    slug: 'science-fitness-retreats-work',
    category: 'fitness',
    excerpt: 'How combining travel, movement, and community creates lasting health habits.',
    heroImage: null as unknown as BlogPostCard['heroImage'],
    publishedAt: '2025-11-15',
    authorName: 'Erin Harris',
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function categoryLabel(cat: string): string {
  return CATEGORIES.find((c) => c.value === cat)?.label || cat;
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  const displayPosts = posts.length > 0 ? posts : PLACEHOLDER_POSTS;

  const filteredPosts =
    activeCategory === 'all'
      ? displayPosts
      : displayPosts.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* ── 1. HERO ── */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{ minHeight: '40vh', backgroundColor: '#0E3A2D' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-12">
          <ScrollReveal>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 7vw, 64px)',
                color: '#F7F4ED',
                lineHeight: 1.1,
              }}
            >
              Blog
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
              Travel guides, fitness tips, solo travel advice, and stories from the SALTY crew.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 2. POSTS GRID ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          {/* Category filters */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: cat.value === activeCategory ? 700 : 500,
                    fontSize: '13px',
                    backgroundColor: cat.value === activeCategory ? '#0E3A2D' : 'transparent',
                    color: cat.value === activeCategory ? '#F7F4ED' : '#0E3A2D',
                    border: cat.value === activeCategory ? 'none' : '1.5px solid #E7D7C0',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Post cards */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <ScrollReveal key={post._id} delay={i * 0.04}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(30,25,20,0.06)',
                    }}
                  >
                    {/* Image */}
                    {post.heroImage ? (
                      <img
                        src={urlFor(post.heroImage).width(600).height(340).url()}
                        alt={post.title}
                        className="w-full object-cover"
                        style={{ aspectRatio: '16/9' }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center"
                        style={{ aspectRatio: '16/9', backgroundColor: '#0E3A2D' }}
                      >
                        <span
                          className="uppercase opacity-20"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '24px',
                            color: '#F7F4ED',
                          }}
                        >
                          SALTY
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs uppercase tracking-wider mb-3"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '10px',
                          backgroundColor: '#E7D7C0',
                          color: '#0E3A2D',
                        }}
                      >
                        {categoryLabel(post.category)}
                      </span>
                      <h2
                        className="mb-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#0E3A2D',
                          lineHeight: 1.3,
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="mb-3 line-clamp-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: '#4A4E58',
                          lineHeight: 1.5,
                        }}
                      >
                        {post.excerpt}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: '#4A4E58',
                          opacity: 0.6,
                        }}
                      >
                        {post.authorName} · {formatDate(post.publishedAt)}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: '#4A4E58',
                }}
              >
                No posts in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
