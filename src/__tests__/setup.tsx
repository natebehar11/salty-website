import '@testing-library/jest-dom/vitest';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    header: 'header',
    section: 'section',
    span: 'span',
    p: 'p',
    button: 'button',
    a: 'a',
    nav: 'nav',
    ul: 'ul',
    li: 'li',
    img: 'img',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useReducedMotion: () => false,
  useInView: () => true,
}));

// Mock next-sanity PortableText
vi.mock('next-sanity', () => ({
  PortableText: ({ value }: { value: unknown }) => {
    return <div data-testid="portable-text">{JSON.stringify(value)}</div>;
  },
  groq: (strings: TemplateStringsArray) => strings.join(''),
}));

// Mock sanity image builder
vi.mock('@/lib/sanity/image', () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({
        url: () => 'https://cdn.sanity.io/images/test/test.jpg',
      }),
    }),
    url: () => 'https://cdn.sanity.io/images/test/test.jpg',
  }),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
