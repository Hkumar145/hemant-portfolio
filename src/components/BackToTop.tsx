'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll(); // initialize
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={[
        'fixed z-50',
        'right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))]', // iOS safe area
        'h-12 w-12 rounded-full',
        'bg-blue-600 text-white shadow-lg ring-1 ring-white/20',
        'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400',
        'transition-transform duration-200',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <ArrowUp className="mx-auto h-6 w-6" />
    </button>
  );
}
