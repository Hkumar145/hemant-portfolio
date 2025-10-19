'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { GraduationCap, CalendarCheck2, Award } from 'lucide-react';

type YearMonth = { year: number; month?: number };
type EducationItem = {
  degree: string;
  school: string;
  location?: string;
  start: YearMonth | number | string;
  end: YearMonth | number | string | 'Present';
  gpa?: string;
  distinction?: string;
  badge?: string;     // shows corner ribbon
  notes?: string;
  link?: string;
  logo?: string;      // optional external image (overrides schoolKey)
  schoolKey?: 'langara' | 'daviet'; // use our inline SVGs
};

/* ---------- inline SVG brand marks ---------- */
const SchoolSVG: Record<NonNullable<EducationItem['schoolKey']>, React.ReactNode> = {
  langara: (
    <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-orange-100 dark:fill-orange-500/10" />
      {/* Bold L */}
      <path d="M18 16v32h28v-6H26V16z" className="fill-orange-600 dark:fill-orange-400" />
    </svg>
  ),
  daviet: (
    <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-sky-100 dark:fill-sky-500/10" />
      {/* Geometric D */}
      <path d="M18 46V18h12c10 0 16 6 16 14s-6 14-16 14H18z" className="fill-sky-600 dark:fill-sky-400" />
      {/* Accent stroke */}
      <path d="M30 18l16 28" className="stroke-white/80" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  ),
};

/* ---------- demo data using inline SVGs ---------- */
const items: EducationItem[] = [
  {
    degree: 'BTech in Electronics and Communication Engineering',
    school: 'DAV Institute of Engineering and Technology',
    schoolKey: 'daviet',
    location: 'Jalandhar',
    start: 2016,
    end: 2020,
    gpa: '7.53/10',
    distinction: 'Distinction',
  },
  {
    degree: 'PGDM in Web & Mobile App Development and Design',
    school: 'Langara College',
    schoolKey: 'langara',
    location: 'Vancouver',
    start: { year: 2024, month: 1 },
    end: 2025,
    gpa: '3.48/4.33',
    distinction: 'Distinction',
    badge: "2× Dean's List",
  },
];

/* ---------- helpers ---------- */
function toISO(v: EducationItem['start']) {
  if (v === 'Present') return undefined;
  if (typeof v === 'number') return `${v}-01-01`;
  if (typeof v === 'string') return /^\d{4}(-\d{2})?(-\d{2})?$/.test(v) ? v : undefined;
  const m = v.month ? String(v.month).padStart(2, '0') : '01';
  return `${v.year}-${m}-01`;
}
function prettyYM(v: EducationItem['start']) {
  if (v === 'Present') return 'Present';
  if (typeof v === 'number') return `${v}`;
  if (typeof v === 'string') {
    const m = v.match(/^(\d{4})-(\d{2})/);
    if (m) {
      const month = new Date(Number(m[1]), Number(m[2]) - 1).toLocaleString(undefined, { month: 'short' });
      return `${month} ${m[1]}`;
    }
    return v;
  }
  if (v.month) {
    const month = new Date(v.year, v.month - 1).toLocaleString(undefined, { month: 'short' });
    return `${month} ${v.year}`;
  }
  return `${v.year}`;
}

/* ---------- motion ---------- */
const cardVar: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/* ---------- Logo tile (inline SVG > external img > monogram) ---------- */
function LogoTile({ ed }: { ed: EducationItem }) {
  return (
    <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-sky-100 to-white ring-1 ring-gray-100 grid place-items-center overflow-hidden">
      {ed.schoolKey ? (
        SchoolSVG[ed.schoolKey]
      ) : ed.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={ed.logo} alt={`${ed.school} logo`} className="h-8 w-8 object-contain" />
      ) : (
        <span className="text-sky-600 font-semibold">
          {ed.school
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((s) => s[0])
            .join('')
            .toUpperCase()}
        </span>
      )}
    </div>
  );
}

/* ---------- Astronomical Backdrop ---------- */
function AstroBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Static starfield (tiny dots via multiple radial-gradients) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.85) 90%, transparent),
            radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.8) 90%, transparent),
            radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.8) 90%, transparent),
            radial-gradient(1.2px 1.2px at 90% 60%, rgba(255,255,255,0.9) 90%, transparent),
            radial-gradient(0.8px 0.8px at 50% 50%, rgba(255,255,255,0.7) 90%, transparent),
            radial-gradient(1px 1px at 20% 60%, rgba(255,255,255,0.85) 90%, transparent)
          `,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Twinkling layer (fades in/out) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)',
        }}
      >
        <div
          className={reduceMotion ? '' : 'twinkle'}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 15% 35%, rgba(255,255,255,0.8) 90%, transparent),
              radial-gradient(1px 1px at 65% 25%, rgba(255,255,255,0.9) 90%, transparent),
              radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.8) 90%, transparent),
              radial-gradient(1px 1px at 35% 75%, rgba(255,255,255,0.85) 90%, transparent)
            `,
            backgroundRepeat: 'no-repeat',
            opacity: 0.65,
          }}
        />
      </div>

      {/* Planets / glowing orbs (very subtle) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(59,130,246,0.25), transparent 70%)' }}
        animate={reduceMotion ? undefined : { y: [0, 12, 0], x: [0, 6, 0] }}
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.22), transparent 70%)' }}
        animate={reduceMotion ? undefined : { y: [0, -10, 0], x: [0, -8, 0] }}
        transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

/* ---------- Shooting Stars (light streaks that cross occasionally) ---------- */
function ShootingStars({ count = 3 }: { count?: number }) {
  const reduceMotion = useReducedMotion();
  const stars = Array.from({ length: count }).map((_, i) => {
    // random-ish positions and delays
    const top = `${10 + i * 20 + (i % 2 === 0 ? 5 : -3)}%`;
    const left = `${15 + i * 25}%`;
    const delay = `${i * 2.5 + 1}s`;
    return { top, left, delay };
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {!reduceMotion &&
        stars.map((s, i) => (
          <span
            key={i}
            className="shooting-star"
            style={
              {
                top: s.top,
                left: s.left,
                animationDelay: s.delay,
              } as React.CSSProperties
            }
          />
        ))}

      {/* styles */}
      <style jsx global>{`
        @keyframes twinkle-fade {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        .twinkle { animation: twinkle-fade 4s ease-in-out infinite; }

        @keyframes shoot {
          0% { transform: translate3d(0,0,0) rotate(-25deg); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate3d(-600px, 200px, 0) rotate(-25deg); opacity: 0; }
        }
        .shooting-star {
          position: absolute;
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.9), rgba(255,255,255,0));
          box-shadow: 0 0 8px rgba(255,255,255,0.65);
          transform-origin: left center;
          transform: rotate(-25deg);
          animation: shoot 5s linear infinite;
          filter: drop-shadow(0 0 6px rgba(59,130,246,0.6)) drop-shadow(0 0 10px rgba(34,211,238,0.5));
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .twinkle, .shooting-star { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* =========================
   EDUCATION SECTION (with astronomy layers)
   ========================= */
export default function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      aria-label="Education"
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl"
    >
      {/* astronomical layers behind content */}
      <AstroBackdrop />
      <ShootingStars count={3} />

      {/* soft glows you already had */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-300/10 blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 container mx-auto px-6 py-20 md:py-28"
      >
        <h3 className="text-2xl font-bold border-b border-white/20 pb-3 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-white" />
          Education
        </h3>

        <p className="text-white/90 mt-5 mb-10 max-w-3xl">
          Formal training in engineering and modern web/mobile development, with strong performance and honors.
        </p>

        {/* timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* center spine */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/25" aria-hidden />

          <ol className="space-y-12">
            {items.map((ed, i) => {
              const isLeft = i % 2 === 0;
              const startISO = toISO(ed.start);
              const endISO = ed.end === 'Present' ? undefined : toISO(ed.end);
              const startPretty = prettyYM(ed.start);
              const endPretty = ed.end === 'Present' ? 'Present' : prettyYM(ed.end);

              return (
                <li key={`${ed.school}-${ed.degree}-${i}`} className="relative">
                  {/* glowing dot */}
                  <motion.span
                    className="absolute left-1/2 top-4 -translate-x-1/2 z-10 block h-4 w-4 rounded-full border-2 border-white/70 bg-white shadow"
                    aria-hidden
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            scale: [1, 1.15, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(255,255,255,0.45)',
                              '0 0 0 10px rgba(255,255,255,0)',
                              '0 0 0 0 rgba(255,255,255,0)',
                            ],
                          }
                    }
                    transition={reduceMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <div className="flex flex-col md:flex-row md:items-start">
                    {/* LEFT column */}
                    <div className={`md:w-1/2 ${isLeft ? 'md:pr-8 order-2 md:order-1' : 'md:pr-8 order-2'}`}>
                      {isLeft && (
                        <motion.div
                          variants={cardVar}
                          className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-slate-900"
                        >
                          {/* corner ribbon */}
                          {ed.badge ? (
                            <span className="pointer-events-none absolute -right-10 -top-2 rotate-45 bg-gradient-to-r from-orange-500 to-amber-400 text-white text-[11px] font-semibold tracking-wide px-10 py-1 shadow-lg">
                              <span className="inline-flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {ed.badge}
                              </span>
                            </span>
                          ) : null}

                          {/* logo tile (inline SVGs) */}
                          <div className="mb-3 flex items-start gap-3">
                            <LogoTile ed={ed} />
                            <div className="min-w-0">
                              <h4 className="text-lg font-semibold leading-snug">{ed.degree}</h4>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                {ed.gpa ? (
                                  <span className="rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-blue-200 bg-blue-50 text-blue-600">
                                    GPA: {ed.gpa}
                                    {ed.distinction ? ` (${ed.distinction})` : ''}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-slate-600">
                            {ed.school}
                            {ed.location ? <span className="text-black-400">, {ed.location}</span> : null}
                          </p>

                          <div className="mt-2 text-sm text-slate-500 flex md:justify-end">
                            <span className="inline-flex items-center gap-1">
                              <CalendarCheck2 className="w-4 h-4" />
                              <time dateTime={startISO ?? ''}>{startPretty}</time> –{' '}
                              {ed.end === 'Present' ? (
                                <time aria-label="Present">Present</time>
                              ) : (
                                <time dateTime={endISO ?? ''}>{endPretty}</time>
                              )}
                            </span>
                          </div>

                          {ed.notes ? <p className="mt-3 text-xs text-slate-500">{ed.notes}</p> : null}
                          {ed.link ? (
                            <a
                              href={ed.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 inline-flex text-xs font-medium text-blue-600 hover:underline"
                            >
                              View credential
                            </a>
                          ) : null}
                        </motion.div>
                      )}
                    </div>

                    {/* spacer */}
                    <div className="h-8 md:h-0 md:w-0" />

                    {/* RIGHT column */}
                    <div className={`md:w-1/2 ${isLeft ? 'md:pl-8 order-3' : 'md:pl-8 order-3 md:order-2'}`}>
                      {!isLeft && (
                        <motion.div
                          variants={cardVar}
                          className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-slate-900"
                        >
                          {ed.badge ? (
                            <span className="pointer-events-none absolute -right-10 -top-2 rotate-45 bg-gradient-to-r from-orange-500 to-amber-400 text-white text-[11px] font-semibold tracking-wide px-10 py-1 shadow-lg">
                              <span className="inline-flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {ed.badge}
                              </span>
                            </span>
                          ) : null}

                          <div className="mb-3 flex items-start gap-3">
                            <LogoTile ed={ed} />
                            <div className="min-w-0">
                              <h4 className="text-lg font-semibold leading-snug">{ed.degree}</h4>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                {ed.gpa ? (
                                  <span className="rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-blue-200 bg-blue-50 text-blue-600">
                                    GPA: {ed.gpa}
                                    {ed.distinction ? ` (${ed.distinction})` : ''}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-slate-600">
                            {ed.school}
                            {ed.location ? <span className="text-black-400">, {ed.location}</span> : null}
                          </p>

                          <div className="mt-2 text-sm text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <CalendarCheck2 className="w-4 h-4" />
                              <time dateTime={startISO ?? ''}>{startPretty}</time> –{' '}
                              {ed.end === 'Present' ? (
                                <time aria-label="Present">Present</time>
                              ) : (
                                <time dateTime={endISO ?? ''}>{endPretty}</time>
                              )}
                            </span>
                          </div>

                          {ed.notes ? <p className="mt-3 text-xs text-slate-500">{ed.notes}</p> : null}
                          {ed.link ? (
                            <a
                              href={ed.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 inline-flex text-xs font-medium text-blue-600 hover:underline"
                            >
                              View credential
                            </a>
                          ) : null}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
