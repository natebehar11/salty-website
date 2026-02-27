import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CurrencyToggle from '@/components/shared/CurrencyToggle';

describe('CurrencyToggle', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('renders all 5 currency buttons', () => {
    render(<CurrencyToggle />);
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('GBP')).toBeInTheDocument();
    expect(screen.getByText('CAD')).toBeInTheDocument();
    expect(screen.getByText('AUD')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });

  it('defaults to USD', () => {
    render(<CurrencyToggle />);
    const usdBtn = screen.getByText('USD');
    expect(usdBtn).toHaveStyle({ backgroundColor: '#0E3A2D' });
  });

  it('switches currency on click', () => {
    const onCurrencyChange = vi.fn();
    render(<CurrencyToggle onCurrencyChange={onCurrencyChange} />);

    fireEvent.click(screen.getByText('GBP'));
    expect(onCurrencyChange).toHaveBeenCalledWith('GBP');

    const gbpBtn = screen.getByText('GBP');
    expect(gbpBtn).toHaveStyle({ backgroundColor: '#0E3A2D' });
  });

  it('saves currency preference to localStorage', () => {
    render(<CurrencyToggle />);
    fireEvent.click(screen.getByText('EUR'));
    expect(localStorage.setItem).toHaveBeenCalledWith('salty-currency', 'EUR');
  });

  it('shows conversion disclaimer for non-USD currencies', () => {
    render(<CurrencyToggle />);

    // No disclaimer for USD
    expect(screen.queryByText(/Approximate conversions/)).not.toBeInTheDocument();

    // Disclaimer appears for non-USD
    fireEvent.click(screen.getByText('GBP'));
    expect(screen.getByText(/Approximate conversions/)).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<CurrencyToggle />);
    expect(screen.getByText('See in your currency')).toBeInTheDocument();
  });

  it('handles localStorage errors gracefully', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Private browsing');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Private browsing');
    });

    // Should not throw
    expect(() => render(<CurrencyToggle />)).not.toThrow();

    // Should still work for clicking
    expect(() => fireEvent.click(screen.getByText('EUR'))).not.toThrow();
  });
});
