import Image from 'next/image';
import Button from '@/components/shared/Button';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/retreat-life-3.jpg"
        alt="SALTY retreat sunset"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-salty-teal/80" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-6">
            Ready to make fun of wellness?
          </h2>
          <p className="font-body text-lg text-salty-sand/80 mb-10 leading-relaxed">
            Life&apos;s too short to choose between adventure and self-care.
            Pick a trip, book your spot, and let us handle the rest. You just show up.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/retreats" variant="primary" size="lg">
              View All Retreats
            </Button>
            <Button
              href="mailto:connect@saltyretreats.com"
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-salty-teal"
            >
              Ask a Question
            </Button>
          </div>
          <p className="font-body text-sm text-salty-sand/50 mt-8">
            connect@saltyretreats.com &middot; @saltyretreats &middot; WhatsApp available
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
