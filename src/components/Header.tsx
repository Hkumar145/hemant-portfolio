"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

// ---- Types
export type NavLink = { href: `#${string}`; label: string };

const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

declare global {
  interface Window {
    __scrollLockUntil?: number;
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<NavLink["href"]>("#about");
  const [headerH, setHeaderH] = useState(96); // sensible default

  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // ---- Measure header height (handles responsive + dynamic changes)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => setHeaderH(el.getBoundingClientRect().height || 96);
    update();

    // ResizeObserver for dynamic height changes (e.g., wrap to 2 lines on mobile)
    let ro: ResizeObserver | undefined;
    if (typeof window.ResizeObserver !== "undefined") {
      ro = new window.ResizeObserver(() => update());
      ro.observe(el);
    }

    // Fallback: listen to resize
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect?.();
    };
  }, []);

  // ---- Track active section using IntersectionObserver (robust vs. offsetTop)
  useEffect(() => {
    const ids = navLinks.map(({ href }) => href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    // Avoid flicker during programmatic scrolling
    const lockUntil = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil) return; // ignore while we scroll programmatically

        // Prefer the entry that is most visible and above the fold
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

        if (onScreen.length > 0) {
          const topmost = onScreen[0].target as HTMLElement;
          setActive(("#" + topmost.id) as NavLink["href"]);
        } else {
          // When nothing is intersecting (fast scroll), pick the closest above the viewport line
          let best: HTMLElement | null = null;
          let bestTop = -Infinity;
          const y = window.scrollY + headerH + 2;
          for (const s of sections) {
            const top = s.offsetTop;
            if (top <= y && top > bestTop) {
              bestTop = top;
              best = s;
            }
          }
          if (best) setActive(("#" + best.id) as NavLink["href"]);
        }
      },
      {
        // Bias the observer so a section counts as active when its top is just below the sticky header
        root: null,
        rootMargin: `-${headerH + 6}px 0px -60% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => io.observe(s));

    // Also react on hash changes (e.g. browser back/forward)
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (id) setActive(("#" + id) as NavLink["href"]);
    };
    window.addEventListener("hashchange", onHash);

    return () => {
      sections.forEach((s) => io.unobserve(s));
      io.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, [headerH]);

  // ---- Smooth, accurate scrolling that accounts for sticky header height
  const handleNavClick = (href: NavLink["href"]) => () => {
    window.__scrollLockUntil = Date.now() + 400;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    // Lock observer updates briefly to avoid mid-scroll flicker
    window.__scrollLockUntil = Date.now() + 400;

    const top = el.getBoundingClientRect().top + window.scrollY - headerH - 4;
    window.scrollTo({ top, behavior: "smooth" });

    setActive(href); // immediate visual feedback

    // Unlock (kept in closure for safety)
    setTimeout(() => {
      // no-op; IntersectionObserver will set the final active state when settled
    }, 420);
  };

  // ---- Close mobile menu on outside click / ESC
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
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
            className={`absolute left-0 top-full w-full bg-white px-6 py-4 transition-[opacity,transform] duration-200 ease-out lg:static lg:flex lg:w-auto lg:items-center lg:gap-6 lg:bg-transparent lg:px-0 lg:py-0
              ${isOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2 lg:pointer-events-auto lg:opacity-100 lg:translate-y-0"}
            `}
          >
            {navLinks.map(({ href, label }) => {
              const isActive = active === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={handleNavClick(href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-md px-2 py-2 text-sm md:text-[15px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2
                      ${isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-700"}
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

// ---- Usage tips (ensure correct highlighting):
// 1) Add a top scroll margin to each section equal to ~header height, e.g.:
//    <section id="about" className="scroll-mt-28 md:scroll-mt-32"> ...
//    Tailwind presets: scroll-mt-24 (~6rem), 28, 32, etc.
// 2) Optionally add `scroll-smooth` to <html> or body for native smooth scrolling.
//    Since we handle smooth scrolling programmatically, this is optional.
// 3) Make sure each target section id matches nav hrefs exactly.
