'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, Github, Smartphone, Monitor } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'framer-motion';

/* ---------------------------------------------------------
   Types
--------------------------------------------------------- */
export type StarryProject = {
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  skills?: string[]; // pills under description
  /** NEW: show a tiny platform badge on the image */
  platform?: 'mobile' | 'desktop' | 'web';
};

type StarryProjectGridProps = {
  id?: string;
  title?: string;
  /** When provided -> projects mode. When omitted/empty and children present -> wrapper mode. */
  projects?: StarryProject[];
  withGradient?: boolean;
  withStarfield?: boolean;
  gradientClassName?: string;
  starCount?: number;
  meteorEveryMs?: number;
  /** Projects grid cols (projects mode only) */
  gridColsClassName?: string; // default "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  /** Auto flip (projects mode only) */
  enableFlip?: boolean; // default true
  flipIntervalMs?: number; // default 5000
  /** Wrapper mode: your own content goes here */
  children?: React.ReactNode;
  /** Wrapper mode: class for your container around children */
  containerClassName?: string;
  /** Harmonize chip colors with the background */
  tintColor?: string;
};

/* ---------------------------------------------------------
   Starfield (canvas) — runs only on client (useEffect)
--------------------------------------------------------- */
function Starfield({
  starCount = 160,
  meteorEveryMs = 2600,
}: { starCount?: number; meteorEveryMs?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    type Star = { x: number; y: number; r: number; t: number; s: number };
    const stars: Star[] = Array.from({ length: starCount }).map(() => ({
      x: 0,
      y: 0,
      r: 0.2 + Math.random() * 1.2,
      t: Math.random() * Math.PI * 2,
      s: 0.4 + Math.random() * 0.6,
    }));

    type Meteor = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };
    let meteors: Meteor[] = [];

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const scatterStars = () => {
      for (const s of stars) {
        s.x = Math.random() * w;
        s.y = Math.random() * h;
      }
    };

    const spawnMeteor = () => {
      const startX = Math.random() < 0.5 ? -20 : Math.random() * (w + 40) - 20;
      const startY = -30;
      const speed = 4 + Math.random() * 3;
      const angle = Math.PI / 3 + Math.random() * 0.25; // ~60–75°
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 1000 + Math.random() * 800,
      });
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = now - last;
      last = now;
      acc += dt;

      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        if (!reduceMotion) s.t += s.s * 0.015;
        const a = reduceMotion ? 0.65 : 0.55 + 0.45 * Math.sin(s.t);
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Meteors
      if (!reduceMotion && acc > meteorEveryMs) {
        acc = 0;
        spawnMeteor();
      }
      meteors = meteors.filter(
        (m) => m.life < m.maxLife && m.x < w + 200 && m.y < h + 200
      );
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life += dt;

        const trailX = m.x - m.vx * 10;
        const trailY = m.y - m.vy * 10;
        const g = ctx.createLinearGradient(m.x, m.y, trailX, trailY);
        g.addColorStop(0, 'rgba(255,255,255,0.95)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(trailX, trailY);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      scatterStars();
    });

    resize();
    scatterStars();
    ro.observe(canvas);
    last = performance.now();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [starCount, meteorEveryMs, useReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none
                 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      aria-hidden
    />
  );
}

/* ---------------------------------------------------------
   TiltCard — parallax tilt on hover (disabled on touch/reduced)
--------------------------------------------------------- */
function TiltCard({
  children,
  variants,
  reduce,
  maxTilt = 8,
}: {
  children: React.ReactNode;
  variants: Variants;
  reduce: boolean;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const isTouch =
    typeof window !== 'undefined' &&
    (('ontouchstart' in window) || navigator.maxTouchPoints > 0);

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (reduce || isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const dx = (px - 0.5) * 2;
    const dy = (py - 0.5) * 2;
    rx.set(-dy * maxTilt);
    ry.set(dx * maxTilt);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: reduce || isTouch ? 0 : srx, rotateY: reduce || isTouch ? 0 : sry }}
      className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col transition-transform will-change-transform text-slate-800"
      whileHover={{
        y: reduce ? 0 : -6,
        scale: reduce ? 1 : 1.02,
        boxShadow: reduce ? undefined : '0px 8px 24px rgba(0,0,0,0.15)',
      }}
      transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Helpers: tag color + platform inference
--------------------------------------------------------- */
function tagClass(name: string) {
  const s = name.toLowerCase().trim();

  // Cloud / DevOps
  if (s === 'aws' || s.includes('api gateway') || s.includes('rds'))
    return 'bg-yellow-50 text-yellow-900 border-yellow-200';
  if (s.includes('gcp') || s.includes('google cloud'))
    return 'bg-blue-50 text-blue-900 border-blue-200';
  if (s.includes('kubernetes') || s === 'eks')
    return 'bg-sky-50 text-sky-900 border-sky-200';
  if (s.includes('docker'))
    return 'bg-indigo-50 text-indigo-900 border-indigo-200';
  if (s.includes('terraform'))
    return 'bg-emerald-50 text-emerald-900 border-emerald-200';
  if (s.includes('iam'))
    return 'bg-rose-50 text-rose-900 border-rose-200';
  if (s.includes('pagerduty'))
    return 'bg-amber-50 text-amber-900 border-amber-200';

  // Databases / Data
  if (s.includes('mongodb'))
    return 'bg-green-50 text-green-900 border-green-200';
  if (s.includes('postgres'))
    return 'bg-teal-50 text-teal-900 border-teal-200';

  // Web / App stacks
  if (s.includes('react native'))
    return 'bg-cyan-50 text-cyan-900 border-cyan-200';
  if (s.includes('react') || s.includes('next.js') || s === 'next' || s === 'nextjs' || s.includes('next'))
    return 'bg-cyan-50 text-cyan-900 border-cyan-200';
  if (s.includes('typescript'))
    return 'bg-blue-50 text-blue-900 border-blue-200';
  if (s.includes('javascript'))
    return 'bg-yellow-50 text-yellow-900 border-yellow-200';
  if (s.includes('tailwind'))
    return 'bg-sky-50 text-sky-900 border-sky-200';
  if (s.includes('node') || s.includes('express'))
    return 'bg-lime-50 text-lime-900 border-lime-200';
  if (s.includes('nestjs'))
    return 'bg-rose-50 text-rose-900 border-rose-200';

  // Services / Tools
  if (s.includes('firebase'))
    return 'bg-amber-50 text-amber-900 border-amber-200';
  if (s.includes('openai') || s.includes('open-ai'))
    return 'bg-violet-50 text-violet-900 border-violet-200';
  if (s.includes('virustotal') || s.includes('virus total'))
    return 'bg-stone-50 text-stone-900 border-stone-200';
  if (s.includes('new relic'))
    return 'bg-purple-50 text-purple-900 border-purple-200';
  if (s.includes('stripe'))
    return 'bg-violet-50 text-violet-900 border-violet-200';
  if (s.includes('tomtom'))
    return 'bg-zinc-50 text-zinc-900 border-zinc-200';
  if (s.includes('vercel'))
    return 'bg-zinc-50 text-zinc-900 border-zinc-200';
  if (s.includes('netlify'))
    return 'bg-emerald-50 text-emerald-900 border-emerald-200';
  if (s.includes('bootstrap'))
    return 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200';
  if (s.includes('figma'))
    return 'bg-pink-50 text-pink-900 border-pink-200';
  if (s.includes('framer'))
    return 'bg-violet-50 text-violet-900 border-violet-200';
  if (s.includes('jira'))
    return 'bg-blue-50 text-blue-900 border-blue-200';
  if (s.includes('github'))
    return 'bg-slate-50 text-slate-900 border-slate-200';
  if (s.includes('eslint'))
    return 'bg-indigo-50 text-indigo-900 border-indigo-200';
  if (s.includes('prettier'))
    return 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200';

  // Languages
  if (s.includes('python'))
    return 'bg-slate-50 text-slate-900 border-slate-200';

  // Fallback
  return 'bg-gray-50 text-gray-800 border-gray-200';
}

function inferPlatform(p: StarryProject): 'mobile' | 'web' | 'desktop' | undefined {
  if (p.platform) return p.platform;
  const ss = (p.skills || []).map(s => s.toLowerCase());
  if (ss.some(s => s.includes('react native') || s.includes('ios') || s.includes('android'))) return 'mobile';
  if (ss.some(s => s.includes('next') || s.includes('react') || s.includes('typescript') || s.includes('javascript'))) return 'web';
  return undefined;
}

/* ---------------------------------------------------------
   Main component (dual-mode)
--------------------------------------------------------- */
export default function StarryProjectGrid({
  id = 'projects',
  title = 'Projects',
  projects = [],
  withGradient = true,
  withStarfield = true,
  gradientClassName = 'bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700',
  starCount = 160,
  meteorEveryMs = 2600,
  gridColsClassName = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  enableFlip = true,
  flipIntervalMs = 5000,
  children,
  containerClassName = '',
  tintColor = '#3B5BFF', // blue-indigo from your screenshot
}: StarryProjectGridProps) {
  const reduce = useReducedMotion();
  const isWrapperMode = (!projects || projects.length === 0) && !!children;

  const EASE: [number, number, number, number] = useMemo(
    () => [0.2, 0.65, 0.3, 0.9],
    []
  );

  const container: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          ease: EASE,
          duration: 0.2,
          when: 'beforeChildren',
          staggerChildren: reduce ? 0 : 0.08,
        },
      },
    }),
    [EASE, reduce]
  );

  const item: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 18 },
      visible: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.45 } },
    }),
    [EASE, reduce]
  );

  // Flip images (projects mode only)
  const [rotated, setRotated] = useState<boolean[]>(
    () => new Array(projects.length).fill(false)
  );
  const toggleRotation = (i: number) =>
    setRotated((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  useEffect(() => {
    if (!enableFlip || isWrapperMode) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    projects.forEach((_, index) => {
      const t = setTimeout(() => {
        toggleRotation(index);
        const iv = setInterval(() => toggleRotation(index), flipIntervalMs);
        intervals.push(iv);
      }, index * 1000);
      timers.push(t);
    });
  return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [projects, enableFlip, flipIntervalMs, isWrapperMode]);

  return (
    <section
      id={id}
      style={{ ['--tint' as string]: tintColor }}
      className={`relative overflow-hidden py-20 scroll-mt-5 md:scroll-mt-8 ${withGradient ? `${gradientClassName} text-white` : ''}`}
      aria-label={title}
    >
      {/* Background */}
      {withGradient && (
        <>
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-300/10 blur-3xl" />
        </>
      )}
      {withStarfield && <Starfield starCount={starCount} meteorEveryMs={meteorEveryMs} />}

      <div className="container mx-auto px-6 relative z-10">
        {title && (
          <motion.h2
            className={`text-3xl font-bold text-center mb-8 ${withGradient ? 'text-white' : 'text-gray-800'}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {title}
          </motion.h2>
        )}

        {/* Wrapper mode: render children directly */}
        {isWrapperMode ? (
          <div className={containerClassName}>{children}</div>
        ) : (
          /* Projects mode */
          <motion.div
            className={`grid gap-6 ${gridColsClassName}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {projects.map((p, index) => {
              const platform = inferPlatform(p);
              const isMobile = platform === 'mobile';
              const platformLabel = isMobile ? 'Mobile' : platform ? 'Desktop/Web' : undefined;

              return (
                <TiltCard key={p.title} reduce={!!reduce} variants={item}>
                  <div className="relative w-full h-48 mb-4 spg-perspective">
                    {/* Platform badge */}
                    {platformLabel && (
                      <div
                        className="absolute left-1 top-1 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-1 py-1 text-[10px] font-medium text-slate-800 ring-1 ring-slate-200 shadow-sm"
                        title={platformLabel}
                      >
                        {isMobile ? (
                          <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        <span className="hidden sm:inline">{isMobile ? platformLabel : 'Web'}</span>
                      </div>
                    )}

                    <div
                      className={`w-full h-full transition-transform duration-[1000ms] ease-in-out spg-preserve-3d ${
                        enableFlip && rotated[index] ? 'spg-rotate-180' : 'spg-rotate-0'
                      }`}
                    >
                      <Image
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        fill
                        priority={index === 0}
                        className="object-contain rounded-lg spg-backface"
                      />
                    </div>
                  </div>

                  {/* Force dark text on white cards for readability */}
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    {p.title}
                  </h3>

                  <p className="text-slate-600 text-[13px] leading-[1.6] md:text-[15px] md:leading-[1.65]">
                    {p.description}
                  </p>

                  {/* Simple, color-coded skill pills with a soft tint */}
                  {p.skills?.length ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {p.skills.map((skill) => (
                        <li
                          key={skill}
                          className={`spg-tinted inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tagClass(
                            skill
                          )}`}
                          title={skill}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-4 flex justify-between items-center pt-2">
                    {p.link ? (
                      <motion.a
                        href={p.link}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: reduce ? 1 : 1.14 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="group relative flex items-center gap-1 text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="text-sm hidden sm:inline">Live Site</span>
                      </motion.a>
                    ) : (
                      <span />
                    )}

                    {p.github && (
                      <motion.a
                        href={p.github}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: reduce ? 1 : 1.14 }}
                        transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
                        className="group relative flex items-center gap-1 text-slate-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5" />
                        <span className="text-sm hidden sm:inline">GitHub</span>
                      </motion.a>
                    )}
                  </div>
                </TiltCard>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Scoped styles for 3D flip utilities + soft tint */}
      <style jsx>{`
        .spg-perspective { perspective: 1000px; }
        .spg-preserve-3d { transform-style: preserve-3d; }
        .spg-backface { backface-visibility: hidden; }
        .spg-rotate-0 { transform: rotateY(0deg); }
        .spg-rotate-180 { transform: rotateY(180deg); }

        /* Subtle, cohesive tint — no glow */
        .spg-tinted {
          border-color: color-mix(in srgb, var(--tint, #3B5BFF) 30%, currentColor);
          background-color: color-mix(in srgb, var(--tint, #3B5BFF) 10%, transparent);
          color: color-mix(in srgb, var(--tint, #3B5BFF) 22%, #111827);
          transition: background-color .2s ease, border-color .2s ease, color .2s ease;
        }
        .spg-tinted:hover {
          background-color: color-mix(in srgb, var(--tint, #3B5BFF) 16%, white);
          border-color: color-mix(in srgb, var(--tint, #3B5BFF) 45%, currentColor);
        }
        @media (prefers-contrast: more) {
          .spg-tinted {
            border-color: color-mix(in srgb, var(--tint, #3B5BFF) 55%, #111827);
          }
        }
      `}</style>
    </section>
  );
}
