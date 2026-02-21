import Image from 'next/image';
import { coaches } from '@/data/coaches';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function CoachesPreview() {
  const featured = coaches.filter((c) => c.id === 'erin' || c.id === 'nate');

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-section text-salty-teal">Your Hosts</h2>
            <p className="font-body text-lg text-salty-teal/70 mt-4 max-w-2xl mx-auto">
              Founded by two people who got tired of choosing between fun and fitness.
              So they made both the whole point.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {featured.map((coach, i) => (
            <ScrollReveal key={coach.id} delay={i * 0.2}>
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
                <h3 className="font-display text-xl text-salty-teal">{coach.name}</h3>
                <p className="font-body text-sm text-salty-coral font-bold mt-1">
                  {coach.title}
                </p>
                <p className="font-body text-salty-teal/70 mt-3 leading-relaxed text-sm">
                  {coach.bio}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
