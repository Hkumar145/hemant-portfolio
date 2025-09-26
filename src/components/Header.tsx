'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

type NavLink = { href: string; label: string };

const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>('#about');

  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Active link on scroll (closest section top <= viewport line)
  useEffect(() => {
    const onScroll = () => {
      const headerH =
        headerRef.current?.getBoundingClientRect().height ?? 110;
      const y = window.scrollY + headerH + 2; // tiny buffer

      let current = navLinks[0]?.href ?? '#about';
      let bestTop = -Infinity;

      for (const { href } of navLinks) {
        const el = document.querySelector(href) as HTMLElement | null;
        if (!el) continue;
        const top = el.offsetTop;
        // choose the section whose top is closest but not beyond the line
        if (top <= y && top > bestTop) {
          bestTop = top;
          current = href;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click / ESC
  useEffect(() => {
    if (!isOpen) return;

    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(t) &&
        buttonRef.current &&
        !buttonRef.current.contains(t)
      ) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* Hairline gradient like a premium navbar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />
      {/* Glassy bar */}
      <div className="backdrop-blur supports-[backdrop-filter]:bg-white/65 bg-white/90 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
        <nav
          className="container mx-auto flex items-center justify-between px-6 py-3 md:py-4"
          aria-label="Primary"
        >
          {/* Left: badge */}
          <div className="flex items-center gap-3 md:gap-4">
            <span
              className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20"
              title="Open to Work"
            >
              ● Open to Work
            </span>
          </div>

          {/* Hamburger */}
          <button
            ref={buttonRef}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="site-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Links */}
          <ul
            id="site-menu"
            ref={menuRef}
            className={`absolute left-0 top-full w-full bg-white px-6 py-4 transition-all duration-300 ease-out lg:static lg:flex lg:w-auto lg:items-center lg:gap-6 lg:bg-transparent lg:px-0 lg:py-0
              ${isOpen ? 'block' : 'hidden'}
            `}
          >
            {navLinks.map(({ href, label }) => {
              const isActive = active === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => {
                      setIsOpen(false);
                      setActive(href); // immediate highlight on click
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-md px-2 py-2 text-sm md:text-[15px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2
                      ${isActive ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-blue-700'}
                    `}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
