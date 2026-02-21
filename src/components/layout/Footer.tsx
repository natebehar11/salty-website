import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-salty-teal text-salty-sand">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/images/logos/coral-logo.png"
              alt="SALTY Retreats"
              width={56}
              height={56}
              className="h-14 w-14 mb-4"
            />
            <p className="font-display text-xl text-salty-coral mb-2">
              Make fun of wellness.
            </p>
            <p className="font-body text-sm text-salty-sand/70 leading-relaxed">
              Wellness retreats for fun-loving people. Surf, sweat, explore, and connect
              across the world&apos;s most incredible destinations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-lg mb-4 text-salty-coral">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: '/retreats', label: 'All Retreats' },
                { href: '/retreats/sri-lanka-surf-yoga-retreat', label: 'Sri Lanka 2026' },
                { href: '/about', label: 'About SALTY' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-salty-sand/70 hover:text-salty-coral transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4 text-salty-coral">Get in Touch</h3>
            <ul className="space-y-2 font-body text-sm text-salty-sand/70">
              <li>
                <a
                  href="mailto:connect@saltyretreats.com"
                  className="hover:text-salty-coral transition-colors"
                >
                  connect@saltyretreats.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/saltyretreats"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-salty-coral transition-colors"
                >
                  @saltyretreats
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/14318291135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-salty-coral transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="font-display text-lg mb-4 text-salty-coral">Book with Confidence</h3>
            <p className="font-body text-sm text-salty-sand/70 leading-relaxed">
              SALTY Retreats partners with Movement Travel, a TICO-licensed travel agency,
              for your booking protection.
            </p>
            <p className="font-body text-sm text-salty-sand/50 mt-4">
              $350 deposit holds your spot. Balance due 60 days before departure.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-salty-sand/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-salty-sand/40">
            &copy; {new Date().getFullYear()} SALTY Retreats. All rights reserved.
          </p>
          <p className="font-body text-xs text-salty-sand/40">
            Have fun, for health&apos;s sake.
          </p>
        </div>
      </div>
    </footer>
  );
}
