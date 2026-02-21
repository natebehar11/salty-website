import { Testimonial } from '@/types/retreat';

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah M.',
    city: 'Toronto',
    year: 2025,
    text: "I was terrified to go on a trip alone. By day two I had a crew. By day five we were planning our next SALTY trip together. The surf was incredible but honestly, the people made it. I haven't laughed that hard in years.",
    rating: 5,
    retreatSlug: 'sri-lanka-surf-yoga-retreat',
  },
  {
    id: 't2',
    name: 'Marcus J.',
    city: 'Vancouver',
    year: 2025,
    text: "The train ride from Kandy to Ella might be the most beautiful thing I've ever seen. And that's saying something because the surf in Ahangama was unreal. Two trips in one. Worth every dollar.",
    rating: 5,
    retreatSlug: 'sri-lanka-surf-yoga-retreat',
  },
  {
    id: 't3',
    name: 'Katie L.',
    city: 'Calgary',
    year: 2025,
    text: "I've done three retreats with other companies. SALTY is different. It's not wellness theater. The workouts are real, the food is incredible, and Erin and Nate actually care about every single person there. I'm already booked for Morocco.",
    rating: 5,
    retreatSlug: 'sri-lanka-surf-yoga-retreat',
  },
  {
    id: 't4',
    name: 'Alex R.',
    city: 'Montreal',
    year: 2024,
    text: "Went to Costa Rica solo and left with 30 new friends and a group chat that's still going strong six months later. The surf instruction was legit, the yoga was healing, and the parties were exactly the right amount of wild.",
    rating: 5,
    retreatSlug: 'costa-rica-fitness-retreat',
  },
  {
    id: 't5',
    name: 'Jordan P.',
    city: 'Ottawa',
    year: 2024,
    text: "I was nervous about the fitness level required. Turns out, the only requirement is showing up. Nate made every workout scalable and fun. I surprised myself every day. Came home feeling stronger than I have in years.",
    rating: 5,
    retreatSlug: 'costa-rica-fitness-retreat',
  },
  {
    id: 't6',
    name: 'Priya N.',
    city: 'New York',
    year: 2025,
    text: "Most \"wellness retreats\" feel performative. SALTY feels like going on vacation with your funnest, most active friends. Except you just met them. And somehow that makes it better.",
    rating: 5,
    retreatSlug: 'costa-rica-fitness-retreat',
  },
];

export function getTestimonialsByIds(ids: string[]): Testimonial[] {
  return ids.map((id) => testimonials.find((t) => t.id === id)).filter(Boolean) as Testimonial[];
}

export function getTestimonialsByRetreat(slug: string): Testimonial[] {
  return testimonials.filter((t) => t.retreatSlug === slug);
}
