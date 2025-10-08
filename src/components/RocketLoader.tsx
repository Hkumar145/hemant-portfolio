'use client';

import React from 'react';

/**
 * Full-screen space/rocket loader
 * - `launch` triggers liftoff
 * - `liftoffMs` lets you tune launch duration
 * - Motion-safe for prefers-reduced-motion
 */
export default function RocketLoader({
  message = 'Launching…',
  launch = false,
  liftoffMs = 900,        // 👈 tweakable
  easing = 'cubic-bezier(.18,.7,.2,1)', // 👈 snappy spring-like
}: {
  message?: string;
  launch?: boolean;
  liftoffMs?: number;
  easing?: string;
}) {
  const stars = [
    { top: '8%', left: '12%' }, { top: '18%', left: '72%' }, { top: '28%', left: '32%' },
    { top: '38%', left: '85%' }, { top: '46%', left: '18%' }, { top: '56%', left: '60%' },
    { top: '66%', left: '8%' },  { top: '74%', left: '42%' }, { top: '82%', left: '78%' },
    { top: '14%', left: '50%' }, { top: '64%', left: '90%' }, { top: '34%', left: '6%' },
  ];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white"
      style={
        {
          // expose to CSS
          ['--liftoff-ms' as string]: `${liftoffMs}ms`,
          ['--liftoff-ease' as string]: easing,
        } as React.CSSProperties
      }
    >
      {/* glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-300/10 blur-3xl" />

      {/* stars */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute block h-[2px] w-[2px] rounded-full bg-white/90 opacity-70 twinkle"
            style={{ top: s.top, left: s.left, animationDelay: `${i * 0.2}s` }}
            aria-hidden
          />
        ))}
      </div>

      {/* rocket + exhaust */}
      <div className={`relative flex flex-col items-center justify-center ${launch ? 'liftoff' : 'rocket-float'}`}>
        <div className={`absolute -bottom-12 flex flex-col items-center gap-2 ${launch ? 'exhaust-boost' : ''}`} aria-hidden>
          <span className="exhaust exhaust-1" />
          <span className="exhaust exhaust-2" />
          <span className="exhaust exhaust-3" />
        </div>

        <svg
          className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden
        >
          <path d="M32 4c8 6 12 16 12 28 0 10-4 18-12 28-8-10-12-18-12-28 0-12 4-22 12-28z" fill="white"/>
          <circle cx="32" cy="24" r="6" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2"/>
          <path d="M20 40c-6 2-10 6-12 12 8-2 14-4 18-8-2-2-4-4-6-4z" fill="#1d4ed8"/>
          <path d="M44 40c6 2 10 6 12 12-8-2-14-4-18-8 2-2 4-4 6-4z" fill="#1d4ed8"/>
          <g className={`flame-flicker ${launch ? 'flame-boost' : ''}`}>
            <path d="M32 52c6-6 6-10 0-16-6 6-6 10 0 16z" fill="#fb923c"/>
            <path d="M32 49c4-4 4-7 0-11-4 4-4 7 0 11z" fill="#fde68a"/>
          </g>
        </svg>

        <div className="mt-6 text-center">
          <p className="text-sm md:text-base font-medium tracking-wide opacity-90">{message}</p>
          <p className="text-xs opacity-70">{launch ? 'Ignition…' : 'Preparing the cosmos…'}</p>
        </div>
      </div>

      <style jsx>{`
        .twinkle { animation: twinkle 2.2s ease-in-out infinite; }
        @keyframes twinkle { 0%{opacity:.35;transform:scale(1)}50%{opacity:.9;transform:scale(1.35)}100%{opacity:.35;transform:scale(1)} }

        .rocket-float { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        /* liftoff uses CSS vars for duration/easing */
        .liftoff { animation: liftoff var(--liftoff-ms) var(--liftoff-ease) forwards; }
        @keyframes liftoff {
          0%   { transform: translateY(0) scale(1); }
          25%  { transform: translateY(-10px) scale(1.01); }
          70%  { transform: translateY(-50vh) scale(1.02); }
          100% { transform: translateY(-120vh) scale(1.05); }
        }

        .flame-flicker { animation: flicker .8s ease-in-out infinite; transform-origin: 32px 44px; }
        .flame-boost   { animation-duration: .4s; }
        @keyframes flicker {
          0%{transform:scale(1) translateY(0);opacity:.9}
          50%{transform:scale(1.05) translateY(1px);opacity:1}
          100%{transform:scale(1) translateY(0);opacity:.9}
        }

        .exhaust { display:block;width:10px;height:10px;border-radius:9999px;background:rgba(255,255,255,.75);
          box-shadow:0 0 12px rgba(147,197,253,.6),0 0 22px rgba(99,102,241,.45); animation: exhaust 1.6s ease-in-out infinite; }
        .exhaust-1 { animation-delay:0s; }
        .exhaust-2 { animation-delay:.35s;width:8px;height:8px;opacity:.85; }
        .exhaust-3 { animation-delay:.7s;width:6px;height:6px;opacity:.7; }
        .exhaust-boost .exhaust { animation-duration: 1s; }

        @keyframes exhaust {
          0%{transform:translateY(0) scale(1);opacity:.9}
          80%{transform:translateY(24px) scale(1.6);opacity:.15}
          100%{transform:translateY(28px) scale(1.7);opacity:0}
        }

        @media (prefers-reduced-motion: reduce) {
          .rocket-float,.liftoff,.flame-flicker,.exhaust,.twinkle { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
