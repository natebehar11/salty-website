'use client';

import { PortableText } from 'next-sanity';
import type { BlogPost } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface BlogPostClientProps {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <main>
      {/* Schema.org Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author?.name || 'SALTY Retreats',
            },
            publisher: {
              '@type': 'Organization',
              name: 'SALTY Retreats',
              url: 'https://getsaltyretreats.com',
            },
          }),
        }}
      />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end px-6"
        style={{ minHeight: '50vh', backgroundColor: '#0E3A2D' }}
      >
        {post.heroImage && (
          <img
            src={urlFor(post.heroImage).width(1920).height(800).url()}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="relative z-10 w-full pt-32 pb-12 mx-auto" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-block mb-4 uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                color: '#E7D7C0',
              }}
            >
              ← Back to Blog
            </Link>
            <h1
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                color: '#F7F4ED',
                lineHeight: 1.2,
              }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              {post.author?.photo && (
                <img
                  src={urlFor(post.author.photo).width(40).height(40).url()}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p
                  className="font-bold"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#F7F4ED',
                  }}
                >
                  {post.author?.name || 'SALTY Retreats'}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#E7D7C0',
                    opacity: 0.7,
                  }}
                >
                  {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── Article Body ── */}
      <section className="py-12 md:py-20 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <ScrollReveal>
            <article
              className="prose prose-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: '#0E3A2D',
                lineHeight: 1.8,
                fontSize: '17px',
              }}
            >
              <PortableText value={post.content} />
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Related Retreats ── */}
      {post.relatedRetreats && post.relatedRetreats.length > 0 && (
        <>
          <SwoopDivider color="#E7D7C0" direction="right" />
          <section className="py-12 md:py-20 px-6" style={{ backgroundColor: '#E7D7C0' }}>
            <div className="mx-auto" style={{ maxWidth: 1000 }}>
              <ScrollReveal>
                <h2
                  className="uppercase mb-8 text-center"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    color: '#0E3A2D',
                  }}
                >
                  Related Retreats
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {post.relatedRetreats.map((retreat) => (
                  <ScrollReveal key={retreat._id}>
                    <Link
                      href={`/retreats/${retreat.slug}`}
                      className="block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                      style={{
                        backgroundColor: '#F7F4ED',
                        boxShadow: '0 4px 12px rgba(30,25,20,0.06)',
                      }}
                    >
                      {retreat.heroImage ? (
                        <img
                          src={urlFor(retreat.heroImage).width(500).height(280).url()}
                          alt={retreat.name}
                          className="w-full object-cover"
                          style={{ aspectRatio: '16/9' }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full flex items-center justify-center"
                          style={{
                            aspectRatio: '16/9',
                            backgroundColor: retreat.colorTheme?.dark || '#0E3A2D',
                          }}
                        >
                          <span style={{ color: '#F7F4ED', opacity: 0.3, fontFamily: 'var(--font-display)', fontSize: '24px' }}>
                            {retreat.name}
                          </span>
                        </div>
                      )}
                      <div className="p-5">
                        <h3
                          className="uppercase"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '20px',
                            color: '#0E3A2D',
                          }}
                        >
                          {retreat.officialName}
                        </h3>
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: '#4A4E58',
                          }}
                        >
                          From ${retreat.lowestPrice?.toLocaleString()} · {retreat.totalDays} days
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Back to Blog CTA ── */}
      <SwoopDivider color="#0E3A2D" direction="left" />
      <section className="py-12 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <Link
            href="/blog"
            className="uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              color: '#F75A3D',
            }}
          >
            ← Back to All Posts
          </Link>
        </div>
      </section>
    </main>
  );
}
