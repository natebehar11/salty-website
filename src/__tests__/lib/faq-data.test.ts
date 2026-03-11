import { describe, it, expect } from 'vitest';
import {
  FAQ_CATEGORIES,
  HOMEPAGE_FAQ_IDS,
  HOMEPAGE_FAQS,
  RETREATS_HUB_FAQ_IDS,
  RETREATS_HUB_FAQS,
  FITNESS_RETREATS_FAQ_IDS,
  FITNESS_RETREATS_FAQS,
  getFaqsByIds,
  generateFAQSchema,
} from '@/lib/faq-data';

describe('faq-data', () => {
  describe('HOMEPAGE_FAQ_IDS resolution', () => {
    it('all homepage IDs resolve to real questions', () => {
      const allIds = new Set(
        FAQ_CATEGORIES.flatMap((c) => c.questions.map((q) => q.id))
      );
      const missing = HOMEPAGE_FAQ_IDS.filter((id) => !allIds.has(id));
      expect(missing).toHaveLength(0);
    });

    it('homepage FAQs length matches homepage IDs length', () => {
      expect(HOMEPAGE_FAQS).toHaveLength(HOMEPAGE_FAQ_IDS.length);
    });

    it('homepage FAQs preserve order of IDs', () => {
      const idOrder = [...HOMEPAGE_FAQ_IDS];
      const byId = new Map(
        FAQ_CATEGORIES.flatMap((c) => c.questions.map((q) => [q.id, q] as const))
      );
      HOMEPAGE_FAQS.forEach((item, i) => {
        const expectedId = idOrder[i];
        const expected = byId.get(expectedId);
        expect(expected).toBeDefined();
        expect(item.question).toBe(expected!.question);
        expect(item.answer).toBe(expected!.answer);
      });
    });
  });

  describe('RETREATS_HUB_FAQ_IDS and FITNESS_RETREATS_FAQ_IDS', () => {
    it('all retreats hub IDs resolve to real questions', () => {
      const allIds = new Set(
        FAQ_CATEGORIES.flatMap((c) => c.questions.map((q) => q.id))
      );
      const missing = RETREATS_HUB_FAQ_IDS.filter((id) => !allIds.has(id));
      expect(missing).toHaveLength(0);
    });

    it('all fitness retreats IDs resolve to real questions', () => {
      const allIds = new Set(
        FAQ_CATEGORIES.flatMap((c) => c.questions.map((q) => q.id))
      );
      const missing = FITNESS_RETREATS_FAQ_IDS.filter((id) => !allIds.has(id));
      expect(missing).toHaveLength(0);
    });

    it('RETREATS_HUB_FAQS and FITNESS_RETREATS_FAQS lengths match their ID arrays', () => {
      expect(RETREATS_HUB_FAQS).toHaveLength(RETREATS_HUB_FAQ_IDS.length);
      expect(FITNESS_RETREATS_FAQS).toHaveLength(FITNESS_RETREATS_FAQ_IDS.length);
    });
  });

  describe('getFaqsByIds', () => {
    it('returns items in order of passed IDs', () => {
      const ids = ['solo-can-i-join-alone', 'logistics-flights-included'];
      const result = getFaqsByIds(ids);
      expect(result).toHaveLength(2);
      expect(result[0].question).toContain('join');
      expect(result[1].question).toContain('flights');
    });

    it('throws when ID is missing', () => {
      expect(() => getFaqsByIds(['nonexistent-id'])).toThrow(
        'FAQ: ID "nonexistent-id" not found'
      );
    });
  });

  describe('duplicate ID detection', () => {
    it('no duplicate IDs across all categories', () => {
      const allIds = FAQ_CATEGORIES.flatMap((c) => c.questions.map((q) => q.id));
      const seen = new Set<string>();
      const duplicates: string[] = [];
      for (const id of allIds) {
        if (seen.has(id)) duplicates.push(id);
        seen.add(id);
      }
      expect(duplicates).toHaveLength(0);
    });
  });

  describe('category structure', () => {
    it('every category has at least one question', () => {
      FAQ_CATEGORIES.forEach((cat) => {
        expect(cat.questions.length).toBeGreaterThan(0);
      });
    });

    it('every category has required fields', () => {
      FAQ_CATEGORIES.forEach((cat) => {
        expect(cat.id).toBeTruthy();
        expect(cat.title).toBeTruthy();
        expect(cat.slug).toBeTruthy();
        expect(cat.description).toBeTruthy();
        expect(Array.isArray(cat.questions)).toBe(true);
      });
    });

    it('every question has id, question, and answer', () => {
      FAQ_CATEGORIES.forEach((cat) => {
        cat.questions.forEach((q) => {
          expect(q.id).toBeTruthy();
          expect(typeof q.question).toBe('string');
          expect(q.question.length).toBeGreaterThan(0);
          expect(typeof q.answer).toBe('string');
          expect(q.answer.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('generateFAQSchema', () => {
    it('produces valid FAQPage structure from categories', () => {
      const schema = generateFAQSchema(FAQ_CATEGORIES);
      expect(schema).toHaveProperty('@context', 'https://schema.org');
      expect(schema).toHaveProperty('@type', 'FAQPage');
      expect(schema).toHaveProperty('mainEntity');
      expect(Array.isArray((schema as { mainEntity: unknown[] }).mainEntity)).toBe(true);

      const mainEntity = (schema as { mainEntity: { '@type': string; name: string; acceptedAnswer: { '@type': string; text: string } }[] }).mainEntity;
      expect(mainEntity.length).toBeGreaterThan(0);

      const first = mainEntity[0];
      expect(first['@type']).toBe('Question');
      expect(first.name).toBeTruthy();
      expect(first.acceptedAnswer).toBeDefined();
      expect(first.acceptedAnswer['@type']).toBe('Answer');
      expect(first.acceptedAnswer.text).toBeTruthy();
    });

    it('produces valid FAQPage structure from flat items', () => {
      const flat = [
        { question: 'Test Q1', answer: 'Test A1' },
        { question: 'Test Q2', answer: 'Test A2' },
      ];
      const schema = generateFAQSchema(flat);
      expect(schema).toHaveProperty('@context', 'https://schema.org');
      expect(schema).toHaveProperty('@type', 'FAQPage');
      const mainEntity = (schema as { mainEntity: unknown[] }).mainEntity;
      expect(mainEntity).toHaveLength(2);
      expect((mainEntity[0] as { name: string }).name).toBe('Test Q1');
      expect((mainEntity[0] as { acceptedAnswer: { text: string } }).acceptedAnswer.text).toBe('Test A1');
    });

    it('handles empty array', () => {
      const schema = generateFAQSchema([]);
      expect((schema as { mainEntity: unknown[] }).mainEntity).toHaveLength(0);
    });
  });
});
