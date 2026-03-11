import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryCache } from '@/lib/cache';

describe('MemoryCache', () => {
  let cache: MemoryCache<string>;

  beforeEach(() => {
    cache = new MemoryCache<string>({ ttlMs: 60_000 });
  });

  it('returns null for a missing key', () => {
    expect(cache.get('nonexistent')).toBeNull();
  });

  it('stores and retrieves a value', () => {
    cache.set('key', 'value');
    expect(cache.get('key')).toBe('value');
  });

  it('returns null for expired entries', () => {
    vi.useFakeTimers();
    const shortCache = new MemoryCache<string>({ ttlMs: 50 });
    shortCache.set('key', 'value');

    // Fast-forward time past TTL
    vi.advanceTimersByTime(100);
    expect(shortCache.get('key')).toBeNull();
    vi.useRealTimers();
  });

  it('evicts oldest entry when maxSize is reached', () => {
    const tinyCache = new MemoryCache<string>({ ttlMs: 60_000, maxSize: 2 });
    tinyCache.set('a', '1');
    tinyCache.set('b', '2');
    tinyCache.set('c', '3'); // should evict 'a'

    expect(tinyCache.get('a')).toBeNull();
    expect(tinyCache.get('b')).toBe('2');
    expect(tinyCache.get('c')).toBe('3');
  });

  it('clears all entries', () => {
    cache.set('a', '1');
    cache.set('b', '2');
    expect(cache.size).toBe(2);

    cache.clear();
    expect(cache.size).toBe(0);
    expect(cache.get('a')).toBeNull();
  });

  it('reports correct size', () => {
    expect(cache.size).toBe(0);
    cache.set('a', '1');
    expect(cache.size).toBe(1);
    cache.set('b', '2');
    expect(cache.size).toBe(2);
  });

  it('overwrites existing key with new value and refreshed TTL', () => {
    cache.set('key', 'old');
    cache.set('key', 'new');
    expect(cache.get('key')).toBe('new');
    expect(cache.size).toBe(1);
  });
});
