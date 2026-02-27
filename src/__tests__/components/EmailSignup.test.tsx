import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmailSignup from '@/components/shared/EmailSignup';

describe('EmailSignup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it('renders email input and submit button', () => {
    render(<EmailSignup />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Join the Community');
  });

  it('renders custom placeholder and button text', () => {
    render(<EmailSignup placeholder="Your work email" buttonText="Subscribe" />);
    expect(screen.getByPlaceholderText('Your work email')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Subscribe');
  });

  it('shows error for empty email submission', async () => {
    render(<EmailSignup />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address');
  });

  it('shows error for invalid email', async () => {
    render(<EmailSignup />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'notanemail' } });
    // Use form submit to bypass browser's native type="email" validation
    const form = screen.getByRole('button').closest('form')!;
    fireEvent.submit(form);
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address');
  });

  it('shows error for email without domain', async () => {
    render(<EmailSignup />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'user@' } });
    const form = screen.getByRole('button').closest('form')!;
    fireEvent.submit(form);
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address');
  });

  it('submits valid email and shows success', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<EmailSignup source="test" />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent("You're in! Welcome to the SALTY community.");
    });

    expect(globalThis.fetch).toHaveBeenCalledWith('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', source: 'test' }),
    });
  });

  it('shows loading state during submission', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({}) }), 100))
    );

    render(<EmailSignup />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('Joining...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows error when API returns non-ok response', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    render(<EmailSignup />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Server error');
    });
  });

  it('clears error when user starts typing', async () => {
    render(<EmailSignup />);

    // Trigger error
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Start typing — error clears
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'a' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
