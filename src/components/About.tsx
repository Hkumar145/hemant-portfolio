'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useReducedMotion, motion, type Variants } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone, UserRound } from 'lucide-react';

/* ---------- Starfield + Meteors Canvas ---------- */
function Starfield({
  starCount = 140,
  meteorEveryMs = 2500,
}: {
  starCount?: number;
  meteorEveryMs?: number;
}) {
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

    // stars
    type Star = { x: number; y: number; r: number; t: number; s: number };
    const stars: Star[] = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.2 + Math.random() * 1.2,
      t: Math.random() * Math.PI * 2,   // twinkle phase
      s: 0.4 + Math.random() * 0.6,     // twinkle speed
    }));

    type Meteor = {
      x: number; y: number; vx: number; vy: number; life: number; maxLife: number;
    };
    let meteors: Meteor[] = [];

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const spawnMeteor = () => {
      // Start slightly above top; random horizontal start (sometimes off-left)
      const startX = Math.random() < 0.5 ? -20 : Math.random() * (w + 40) - 20;
      const startY = -30;
      const speed = 4 + Math.random() * 3;
      const angle = Math.PI / 3 + Math.random() * 0.25; // ~60-75°
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

        // trail
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

        // head
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      // Re-randomize star positions on resize to avoid stretching
      for (const s of stars) {
        s.x = Math.random() * w;
        s.y = Math.random() * h;
      }
    });

    resize();
    ro.observe(canvas);
    last = performance.now();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [starCount, meteorEveryMs, useReducedMotion]); // useReducedMotion is stable; presence keeps effect correct

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none
                 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      aria-hidden
    />
  );
}

/* ---- Framer Motion Variants ---- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const underline: Variants = {
  hidden: { scaleX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.45, ease: 'easeOut', delay: 0.1 } },
};

const staggerCol: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-20 text-white scroll-mt-16 md:scroll-mt-18"
    >
      {/* glows behind everything */}
      <div className="pointer-events-none absolute -top-16 -left-24 h-56 w-56 rounded-full bg-white/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-indigo-300/10 blur-3xl -z-10" />

      {/* stars + meteors layer */}
      <Starfield starCount={150} meteorEveryMs={2600} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUp} className="mb-3 inline-flex items-center gap-2">
            <UserRound className="h-6 w-6 text-white" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              About Me
            </h2>
          </motion.div>
          <motion.div
            variants={underline}
            className="mx-auto h-1 w-16 origin-left rounded bg-white"
            aria-hidden
          />
        </motion.div>

        {/* Content */}
        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="max-w-prose"
          >
            <h3 className="mb-4 text-xl font-semibold">Professional Summary</h3>
            <p className="mb-4 text-base leading-7 text-white/90">
              Full-Stack Developer focused on building secure, performant, and accessible products
              end-to-end. Frontend with <strong>React/Next.js (TypeScript)</strong> and{' '}
              <strong>Tailwind</strong>; backend with <strong>Node.js/NestJS</strong>,{' '}
              <strong>REST/GraphQL</strong>, and <strong>PostgreSQL/MongoDB (Prisma)</strong>.
              I care about clean APIs, great UX, and CI/CD that keeps shipping fast and reliable.
            </p>
            <p className="text-base leading-7 text-white/90">
              Comfortable across the stack—from component systems and data models to Docker,
              caching, and deployments on <strong>AWS/GCP</strong>.
            </p>

            {/* Quick contacts */}
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
                <span className="text-white/90">Vancouver, Canada</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white" aria-hidden="true" />
                <a
                  href="mailto:hkumar1698.hk@gmail.com"
                  className="underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  hkumar1698.hk@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white" aria-hidden="true" />
                <Link href="#contact" className="text-white/90 hover:text-white">
                  Let&apos;s have a quick chat
                </Link>
              </li>
            </ul>

            {/* Tech chips (dark-friendly) */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['React', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'Docker & CI/CD', 'AWS', 'GCP'].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/20 transition"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right column: competencies with stagger */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerCol}
            className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm"
          >
            <motion.h3 variants={item} className="mb-4 text-xl font-semibold text-slate-900">
              Core Competencies
            </motion.h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'React / Next.js (TypeScript)',
                'Node.js / NestJS',
                'REST / GraphQL APIs',
                'PostgreSQL / MongoDB (Prisma)',
                'API Design & Integration',
                'Testing (Jest, RTL) & Linting',
                'Docker & CI/CD (GitHub Actions)',
                'AWS / GCP Deployments',
              ].map((text) => (
                <motion.li key={text} variants={item} className="flex items-start gap-3 text-sm text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
