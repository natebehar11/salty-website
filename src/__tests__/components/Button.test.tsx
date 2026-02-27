import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '@/components/shared/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ backgroundColor: '#F75A3D' });
    expect(btn).toHaveClass('salty-btn--primary');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ backgroundColor: '#F7F4ED' });
    expect(btn).toHaveClass('salty-btn--secondary');
  });

  it('applies retreat variant with custom accent', () => {
    render(<Button variant="retreat" retreatAccent="#FF0000">Retreat</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveStyle({ backgroundColor: '#FF0000' });
    expect(btn).toHaveClass('salty-btn--retreat');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-5', 'py-2');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-10', 'py-4');
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('opacity-50');
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref Test</Button>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('passes additional HTML button attributes', () => {
    render(<Button type="submit" aria-label="Submit form">Submit</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('type', 'submit');
    expect(btn).toHaveAttribute('aria-label', 'Submit form');
  });
});
