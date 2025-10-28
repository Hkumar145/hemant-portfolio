'use client';

import dynamic from 'next/dynamic';
const SparkleOrbits = dynamic(() => import('@/components/SparkleOrbits'), { ssr: false });

import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white"
      aria-label="Intro section"
    >
      {/* Decorative glow (behind everything) */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl -z-10" />

      {/* Meteors layer (CSS-based, disabled if reduced motion) */}
      {!reduceMotion && (
        <>
          <span
            aria-hidden
            className="absolute -top-10 -left-20 h-0.5 w-32 opacity-70"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0))',
              filter: 'blur(0.2px)',
              animation: 'meteor 7.5s linear infinite',
            }}
          />
          <span
            aria-hidden
            className="absolute top-[15%] left-[30%] h-0.5 w-40 opacity-70"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0))',
              filter: 'blur(0.3px)',
              animation: 'meteor 9s linear infinite',
              animationDelay: '2s',
            }}
          />
        </>
      )}

      <div className="container mx-auto px-6 py-20 md:py-28 relative">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Hi, I&apos;m Hemant Kumar
            </h1>

            <h2 className="text-2xl md:text-xl font-bold mb-4">
              Full Stack Developer &amp; Cloud Engineer
            </h2>

            {/* MOBILE-ONLY AVATAR (appears above the description) */}
            <div className="md:hidden mb-6 flex justify-center">
              <Image
                src="/profile.png"
                alt="Portrait of Hemant Kumar"
                width={220}
                height={220}
                priority
                sizes="(max-width: 768px) 220px"
                className="rounded-full shadow-xl"
              />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed mb-8 text-white/90">
              <TypeAnimation
                sequence={[
                  'A passionate developer building modern web and mobile applications!',
                  1500,
                  'Also, professional bug creator (and sometimes fixer)!',
                  1500,
                ]}
                wrapper="span"
                speed={15}
                repeat={Infinity}
              />
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <a
                href="/Hemant_Kumar_Resume.pdf"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm ring-1 ring-white/20 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                download
                aria-label="Download Resume PDF"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                  />
                </svg>
                Download Resume
              </a>

              <a
                href="#projects"
                className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-white hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                aria-label="Jump to Projects section"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          {/* Image Column with orbital rings + sparkles (DESKTOP ONLY) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="hidden md:flex md:w-1/2 justify-center"
          >
            <div className="relative">
              {/* Halo */}
              <div className="absolute -inset-4 -z-10 rounded-full bg-white/10 blur-2xl" />

              {/* Rings + sparkles behind avatar */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                {/* Outer ring */}
                <motion.svg
                  width="380"
                  height="380"
                  viewBox="0 0 380 380"
                  initial={false}
                  animate={reduceMotion ? {} : { rotate: 360 }}
                  transition={reduceMotion ? {} : { duration: 60, ease: 'linear', repeat: Infinity }}
                  className="opacity-50"
                  aria-hidden
                >
                  <circle
                    cx="190"
                    cy="190"
                    r="180"
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.15"
                    strokeWidth="1.5"
                    strokeDasharray="6 10"
                  />
                </motion.svg>

                {/* Inner ring (counter-rotating) */}
                <motion.svg
                  width="300"
                  height="300"
                  viewBox="0 0 300 300"
                  initial={false}
                  animate={reduceMotion ? {} : { rotate: -360 }}
                  transition={reduceMotion ? {} : { duration: 50, ease: 'linear', repeat: Infinity }}
                  className="absolute opacity-60"
                  aria-hidden
                >
                  <circle
                    cx="150"
                    cy="150"
                    r="140"
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="1.5"
                    strokeDasharray="2 8"
                  />
                </motion.svg>

                {/* ✨ Sparkles drifting around the rings */}
                <SparkleOrbits reduceMotion={!!reduceMotion} />
              </div>

              <Image
                src="/profile.png"
                alt="Portrait of Hemant Kumar"
                width={320}
                height={320}
                priority
                sizes="(max-width: 768px) 240px, 320px"
                className="rounded-full shadow-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS keyframes for meteors */}
      {!reduceMotion && (
        <style jsx>{`
          @keyframes meteor {
            0% {
              transform: translate3d(-10%, -20%, 0) rotate(45deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translate3d(110%, 120%, 0) rotate(45deg);
              opacity: 0;
            }
          }
        `}</style>
      )}
    </section>
  );
}
