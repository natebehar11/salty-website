interface CacheEntry<T> {
  data: T;
  expiry: number;
}

/**
 * Simple in-memory TTL cache for API route responses.
 *
 * Used by Google Places and oEmbed proxy routes to avoid
 * redundant external API calls. Cache lives in the Node.js
 * process and resets on deploy/restart — Vercel CDN headers
 * provide the durable second layer.
 *
 * At ~100 landmarks with ~2 entries each, total footprint
 * is well under 1MB. No need for Redis.
 */
export class MemoryCache<T> {
  private store = new Map<string, CacheEntry<T>>();
  private readonly ttlMs: number;
  private readonly maxSize: number;

  constructor(options: { ttlMs: number; maxSize?: number }) {
    this.ttlMs = options.ttlMs;
    this.maxSize = options.maxSize ?? 500;
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }
    return entry.data;
  }

  set(key: string, data: T): void {
    // Evict oldest entry if at capacity
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      if (firstKey !== undefined) this.store.delete(firstKey);
    }
    this.store.set(key, { data, expiry: Date.now() + this.ttlMs });
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}
