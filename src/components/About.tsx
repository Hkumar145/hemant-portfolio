'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone, UserRound } from 'lucide-react';

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
    <section id="about" className="relative bg-gradient-to-b from-white to-slate-50 py-20 scroll-mt-16 md:scroll-mt-18">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUp} className="mb-3 inline-flex items-center gap-2">
            <UserRound className="h-6 w-6 text-indigo-500" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              About Me
            </h2>
          </motion.div>
          <motion.div
            variants={underline}
            className="mx-auto h-1 w-16 origin-left rounded bg-indigo-500"
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
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Professional Summary</h3>
            <p className="mb-4 text-base leading-7 text-slate-700">
              Full-Stack Developer focused on building secure, performant, and accessible products
              end-to-end. Frontend with <strong>React/Next.js (TypeScript)</strong> and{' '}
              <strong>Tailwind</strong>; backend with <strong>Node.js/NestJS</strong>,{' '}
              <strong>REST/GraphQL</strong>, and <strong>PostgreSQL/MongoDB (Prisma)</strong>.
              I care about clean APIs, great UX, and CI/CD that keeps shipping fast and reliable.
            </p>
            <p className="text-base leading-7 text-slate-700">
              Comfortable across the stack—from component systems and data models to Docker,
              caching, and deployments on <strong>AWS/GCP</strong>.
            </p>

            {/* Quick contacts */}
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                Vancouver, Canada
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                <a
                  href="mailto:hkumar1698.hk@gmail.com"
                  className=" decoration-indigo-300 underline-offset-2 hover:text-indigo-600"
                >
                  hkumar1698.hk@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                <Link href="#contact" className="hover:text-indigo-600">
                  Let&apos;s have a quick chat
                </Link>
              </li>
            </ul>

            {/* Tech chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['React ',' Next.js', 'Node.js ',' NestJS', 'PostgreSQL ',' MongoDB', 'Docker & CI/CD', 'AWS' ,' GCP'].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-indigo-200"
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
                <motion.li key={text} variants={item} className="flex items-start gap-3 text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" aria-hidden="true" />
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
