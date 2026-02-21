'use client';

import { useState, FormEvent } from 'react';
import Button from './Button';

interface EmailSignupProps {
  className?: string;
  onDark?: boolean;
  placeholder?: string;
  buttonText?: string;
}

export default function EmailSignup({
  className = '',
  onDark = false,
  placeholder = 'Your email address',
  buttonText = 'Join the Community',
}: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Connect to GoHighLevel API
      await new Promise((r) => setTimeout(r, 1000));
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-xl ${className}`} style={{ backgroundColor: '#A4E5D9', color: '#0E3A2D' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 10l4 4 8-8" />
        </svg>
        <span className="text-sm font-bold">You&apos;re in! Welcome to the SALTY community.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="flex-1 relative">
        <label htmlFor="email-signup" className="sr-only">Email address</label>
        <input
          id="email-signup"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
          placeholder={placeholder}
          className="w-full px-5 py-3 rounded-full text-sm outline-none transition-all duration-200"
          style={{
            backgroundColor: onDark ? '#1F4638' : '#F7F4ED',
            color: onDark ? '#F7F4ED' : '#0E3A2D',
            border: status === 'error' ? '2px solid #F75A3D' : onDark ? '1px solid #1F4638' : '1px solid #E7D7C0',
          }}
        />
        {status === 'error' && (
          <p className="text-xs mt-1.5 ml-4" style={{ color: '#F75A3D' }}>{errorMsg}</p>
        )}
      </div>
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Joining...' : buttonText}
      </Button>
    </form>
  );
}
