import ScrollReveal from '@/components/shared/ScrollReveal';

const pillars = [
  {
    title: 'Joy',
    description:
      'Not a side effect of wellness. The proof of it. If joy is missing, wellness is incomplete.',
  },
  {
    title: 'Living',
    description:
      'Not surviving, not performing, but participating. To gather, travel, move, laugh, and love.',
  },
  {
    title: 'Well',
    description:
      'Physical, mental, and social wholeness. To live well is to live fully, connected, and in balance.',
  },
];

export default function ValueProp() {
  return (
    <section className="bg-salty-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-section text-salty-teal">
              The Joy of Living Well
            </h2>
            <p className="font-body text-lg text-salty-teal/70 mt-6 leading-relaxed">
              We believe wellness without joy is performance. Real health lives in sweat,
              laughter, sunlight, conversation, and curiosity. Not in data, discipline, or
              deprivation. Fun isn&apos;t the opposite of wellness. It&apos;s the key to it.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-2xl text-salty-coral mb-3">
                  {pillar.title}
                </h3>
                <p className="font-body text-salty-teal/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
