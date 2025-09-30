'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import BackToTop from './BackToTop';
import ThemeToggle from './ThemeToggle';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export default function Footer() {
  const reduce = useReducedMotion();

  // Use a bezier to satisfy strict TS on transition.ease
  const EASE: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

  // Define after `reduce` so values are concrete (no unions that confuse TS)
  const container: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: EASE,
        when: 'beforeChildren',
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  };

  const linkClasses =
    'group relative inline-flex items-center text-sm sm:text-base text-gray-300 hover:text-white transition';

  return (
    <footer className="bg-gray-900 text-white py-10 relative border-t border-white/10">
      <motion.div
        className="container mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Top row: socials + theme toggle */}
        <div className="flex flex-col items-center gap-6">
          <motion.ul
            variants={item}
            className="flex items-center justify-center gap-8"
            aria-label="Social links"
          >
            <li>
              <motion.a
                href="https://github.com/Hkumar145"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                whileHover={{ y: reduce ? 0 : -2, scale: reduce ? 1 : 1.04 }}
                whileTap={{ scale: reduce ? 1 : 0.98 }}
                className="inline-flex focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
              >
                <FaGithub size={28} />
              </motion.a>
            </li>
            <li>
              <motion.a
                href="https://www.linkedin.com/in/hemant-kumar-bb99171aa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                whileHover={{ y: reduce ? 0 : -2, scale: reduce ? 1 : 1.04 }}
                whileTap={{ scale: reduce ? 1 : 0.98 }}
                className="inline-flex focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
              >
                <FaLinkedin size={28} />
              </motion.a>
            </li>
            <li>
              <motion.a
                href="mailto:hkumar1698.hk@gmail.com"
                aria-label="Email"
                title="Email"
                whileHover={{ y: reduce ? 0 : -2, scale: reduce ? 1 : 1.04 }}
                whileTap={{ scale: reduce ? 1 : 0.98 }}
                className="inline-flex focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
              >
                <FaEnvelope size={28} />
              </motion.a>
            </li>
          </motion.ul>

          <motion.div variants={item}>
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Link row with glowing underline */}
        <motion.nav
          variants={item}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          aria-label="Footer links"
        >
          {[
            { label: 'Contact', href: '#contact' },
            { label: 'Resume', href: '/Hemant_Kumar_Resume.pdf' },
          ].map((l) => (
            <a key={l.label} href={l.href} className={linkClasses}>
              {l.label}
              {/* underline */}
              <span
                className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500
                           opacity-0 blur-[0.5px] transition-all duration-300 ease-out
                           group-hover:w-full group-hover:opacity-100"
                aria-hidden="true"
              />
              {/* glow */}
              <span
                className="pointer-events-none absolute left-0 -bottom-0.5 h-[3px] w-0 bg-blue-500/40 rounded-full
                           opacity-0 blur-[4px] transition-all duration-300 ease-out
                           group-hover:w-full group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          ))}
        </motion.nav>

        {/* Divider + meta */}
        <motion.div
          variants={item}
          className="mx-auto mt-6 h-px w-24 bg-white/10"
          aria-hidden="true"
        />
        <motion.p
          variants={item}
          className="mt-3 text-center text-xs sm:text-sm text-gray-400"
        >
          &copy; {new Date().getFullYear()} Hemant Kumar · Built with passion, Next.js & Tailwind
        </motion.p>
      </motion.div>

      {/* Floating Back to Top Button */}
      <BackToTop />
    </footer>
  );
}
