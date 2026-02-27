import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FAQAccordion from '@/components/shared/FAQAccordion';

const FAQ_ITEMS = [
  { question: 'What is SALTY?', answer: 'SALTY is a fitness retreat company.' },
  { question: 'Do I need to be fit?', answer: 'No, all levels welcome.' },
  { question: 'Can I go solo?', answer: 'Over 65% of guests travel solo.' },
];

describe('FAQAccordion', () => {
  it('renders all questions', () => {
    render(<FAQAccordion items={FAQ_ITEMS} />);
    expect(screen.getByText('What is SALTY?')).toBeInTheDocument();
    expect(screen.getByText('Do I need to be fit?')).toBeInTheDocument();
    expect(screen.getByText('Can I go solo?')).toBeInTheDocument();
  });

  it('answers are hidden by default', () => {
    render(<FAQAccordion items={FAQ_ITEMS} />);
    expect(screen.queryByText('SALTY is a fitness retreat company.')).not.toBeInTheDocument();
  });

  it('shows answer when question is clicked', () => {
    render(<FAQAccordion items={FAQ_ITEMS} />);
    fireEvent.click(screen.getByText('What is SALTY?'));
    expect(screen.getByText('SALTY is a fitness retreat company.')).toBeInTheDocument();
  });

  it('closes answer when same question is clicked again', () => {
    render(<FAQAccordion items={FAQ_ITEMS} />);
    const question = screen.getByText('What is SALTY?');

    fireEvent.click(question);
    expect(screen.getByText('SALTY is a fitness retreat company.')).toBeInTheDocument();

    fireEvent.click(question);
    expect(screen.queryByText('SALTY is a fitness retreat company.')).not.toBeInTheDocument();
  });

  it('only one answer is visible at a time', () => {
    render(<FAQAccordion items={FAQ_ITEMS} />);

    fireEvent.click(screen.getByText('What is SALTY?'));
    expect(screen.getByText('SALTY is a fitness retreat company.')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Do I need to be fit?'));
    expect(screen.getByText('No, all levels welcome.')).toBeInTheDocument();
    expect(screen.queryByText('SALTY is a fitness retreat company.')).not.toBeInTheDocument();
  });

  it('sets aria-expanded correctly', () => {
    render(<FAQAccordion items={FAQ_ITEMS} />);
    const buttons = screen.getAllByRole('button');

    // All collapsed initially
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    });

    // Expand first
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders schema.org JSON-LD when withSchema is true', () => {
    const { container } = render(<FAQAccordion items={FAQ_ITEMS} withSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const schema = JSON.parse(script!.textContent!);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(3);
    expect(schema.mainEntity[0].name).toBe('What is SALTY?');
  });

  it('does not render schema.org when withSchema is false', () => {
    const { container } = render(<FAQAccordion items={FAQ_ITEMS} withSchema={false} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeInTheDocument();
  });

  it('handles empty items array', () => {
    render(<FAQAccordion items={[]} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
