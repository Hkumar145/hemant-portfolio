'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Laptop } from 'lucide-react';

export default function ThemeToggle() {
  const {  setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoid hydration mismatch

  const icon = resolvedTheme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 text-white ring-1 ring-white/15
                   hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={resolvedTheme}
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            {icon}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Optional: quick menu for System */}
      <button
        type="button"
        onClick={() => setTheme('system')}
        className="hidden sm:inline-flex items-center gap-1 text-xs text-white/80 hover:text-white transition"
        aria-label="Use system theme"
        title="Use system theme"
      >
        <Laptop className="h-4 w-4" />
        System
      </button>
    </div>
  );
}
