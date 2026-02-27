import { groq } from 'next-sanity';

// ── Retreat Queries ──

/** All active retreats (for hub page, cards, etc.) */
export const allRetreatsQuery = groq`
  *[_type == "retreat" && status != "past"] | order(startDate asc) {
    _id,
    name,
    officialName,
    "slug": slug.current,
    status,
    startDate,
    endDate,
    totalDays,
    location,
    country,
    lowestPrice,
    groupSize,
    soloTravelerPercent,
    spotsRemaining,
    heroImage,
    colorTheme,
    saltyMeter
  }
`;

/** Single retreat by slug (full detail page) */
export const retreatBySlugQuery = groq`
  *[_type == "retreat" && slug.current == $slug][0] {
    _id,
    name,
    officialName,
    "slug": slug.current,
    status,
    startDate,
    endDate,
    totalDays,
    location,
    country,
    groupSize,
    skillLevel,
    soloTravelerPercent,
    spotsRemaining,

    heroImage,
    heroHeadline,
    geoDefinition,
    experienceNarrative,
    forYouIf,
    bestFor,
    maybeNotFor,
    dailyRhythm,

    roomTiers,
    lowestPrice,
    depositAmount,
    paymentPolicy,
    cancellationPolicy,
    bookingUrl,

    activities,
    itinerary,
    saltyMeter,

    accommodationName,
    accommodationDescription,
    accommodationFeatures,
    accommodationPhotos,

    included,
    notIncluded,

    coaches[]-> {
      _id,
      name,
      "slug": slug.current,
      role,
      bio,
      photo,
      specialties,
      personality,
      cardColor,
      isFounder
    },

    testimonials[]-> {
      _id,
      guestName,
      city,
      year,
      quote,
      rating,
      avatar,
      isVideo,
      videoId,
      tags
    },

    faqs,
    colorTheme,

    seoTitle,
    seoDescription,
    ogImage
  }
`;

/** Retreat slugs (for generateStaticParams) */
export const retreatSlugsQuery = groq`
  *[_type == "retreat" && status != "past"].slug.current
`;

/** Past retreats (for video grid on hub page) */
export const pastRetreatsQuery = groq`
  *[_type == "retreat" && status == "past"] | order(startDate desc) {
    _id,
    name,
    officialName,
    "slug": slug.current,
    startDate,
    heroImage
  }
`;

// ── Coach Queries ──

/** All coaches (for About page) */
export const allCoachesQuery = groq`
  *[_type == "coach"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    photo,
    specialties,
    personality,
    cardColor,
    isFounder,
    founderBio
  }
`;

/** Founders only (for About page hero section) */
export const foundersQuery = groq`
  *[_type == "coach" && isFounder == true] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    founderBio,
    photo,
    specialties,
    cardColor
  }
`;

// ── Testimonial Queries ──

/** Featured testimonials (for homepage) */
export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && "featured" in tags] | order(_createdAt desc) [0...6] {
    _id,
    guestName,
    city,
    year,
    quote,
    rating,
    avatar,
    isVideo,
    videoId,
    tags,
    "retreatName": retreatAttended->name
  }
`;

/** Video testimonials (for reviews page) */
export const videoTestimonialsQuery = groq`
  *[_type == "testimonial" && isVideo == true] {
    _id,
    guestName,
    city,
    year,
    quote,
    rating,
    videoId,
    "retreatName": retreatAttended->name
  }
`;

// ── FAQ Queries ──

/** All FAQ categories with questions (for /faq page) */
export const allFaqCategoriesQuery = groq`
  *[_type == "faqCategory"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    questions
  }
`;

// ── Blog Queries ──

/** All published blog posts (for /blog) */
export const allBlogPostsQuery = groq`
  *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    heroImage,
    publishedAt,
    "authorName": author->name
  }
`;

/** Blog posts by category */
export const blogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && category == $category && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    heroImage,
    publishedAt,
    "authorName": author->name
  }
`;

/** Single blog post by slug */
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    heroImage,
    content,
    publishedAt,
    author-> {
      _id,
      name,
      photo,
      bio
    },
    relatedRetreats[]-> {
      _id,
      name,
      officialName,
      "slug": slug.current,
      heroImage,
      lowestPrice,
      totalDays,
      startDate,
      colorTheme
    },
    seoTitle,
    seoDescription
  }
`;

/** Blog post slugs (for generateStaticParams) */
export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && publishedAt <= now()].slug.current
`;

// ── Destination Queries ──

/** All destinations (for destination guides index) */
export const allDestinationsQuery = groq`
  *[_type == "destination"] {
    _id,
    country,
    "slug": slug.current,
    heroImage,
    vibeSummary,
    retreats[]-> {
      _id,
      name,
      officialName,
      "slug": slug.current,
      status,
      startDate
    }
  }
`;

/** Destination slugs (for generateStaticParams) */
export const destinationSlugsQuery = groq`
  *[_type == "destination"].slug.current
`;

/** Single destination by slug */
export const destinationBySlugQuery = groq`
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    country,
    "slug": slug.current,
    heroImage,
    vibeSummary,
    description,
    retreats[]-> {
      _id,
      name,
      officialName,
      "slug": slug.current,
      status,
      startDate,
      endDate,
      totalDays,
      lowestPrice,
      heroImage,
      colorTheme
    },
    relatedPosts[]-> {
      _id,
      title,
      "slug": slug.current,
      category,
      excerpt,
      heroImage,
      publishedAt
    },
    faqs,
    seoTitle,
    seoDescription
  }
`;

// ── Navigation Queries ──

/** Minimal retreat data for Navbar + Footer */
export const navRetreatsQuery = groq`
  *[_type == "retreat" && status != "past"] | order(startDate asc) {
    name,
    officialName,
    "slug": slug.current
  }
`;

// ── Site Settings ──

/** Singleton site settings */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    tagline,
    totalGuests,
    averageRating,
    countriesCount,
    soloTravelerPercent,
    email,
    whatsapp,
    instagram,
    tiktok,
    socialProofQuotes,
    defaultOgImage,
    seoDescription
  }
`;
