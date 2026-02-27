import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '@/components/shared/Modal';

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render children when closed', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Hidden content</p>
      </Modal>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('has role="dialog" and aria-modal="true"', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Accessible modal</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders close button with aria-label', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    const closeBtn = screen.getByLabelText('Close modal');
    expect(closeBtn).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('locks body scroll when open', () => {
    render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal isOpen onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('');
  });
});
