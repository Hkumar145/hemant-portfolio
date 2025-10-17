'use client';

import { BadgeCheck, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type BadgeTone = 'amber' | 'emerald' | 'blue';

type Cert = {
  title: string;         // kept for accessibility / aria
  image: string;
  link: string;
  issuer?: string;
  issuerLogo?: string;   // remote logo URL
  year?: string | number;
  badge?: { label: string; tone: BadgeTone };
};

/* ---------- issuer themes ---------- */
type IssuerTheme = {
  issuerChip: string; // base color for issuer chip
  yearPill: string;   // gradient or solid for year pill
};

function getIssuerTheme(issuer?: string): IssuerTheme {
  switch ((issuer || '').toLowerCase()) {
    case 'google cloud':
      return {
        issuerChip: 'bg-slate-900/80 text-white ring-white/15',
        yearPill: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
      };
    case 'huawei':
      return {
        issuerChip: 'bg-slate-900/80 text-white ring-white/15',
        yearPill: 'bg-gradient-to-r from-rose-500 to-red-600 text-white',
      };
    case 'langara college':
      return {
        issuerChip: 'bg-slate-900/80 text-white ring-white/15',
        yearPill: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white',
      };
    case 'industrial training':
      return {
        issuerChip: 'bg-slate-900/80 text-white ring-white/15',
        yearPill: 'bg-gradient-to-r from-slate-600 to-slate-800 text-white',
      };
    default:
      return {
        issuerChip: 'bg-slate-900/80 text-white ring-white/15',
        yearPill: 'bg-gradient-to-r from-sky-500 to-cyan-600 text-white',
      };
  }
}

/* ---------- award badge tone ---------- */
function toneClasses(tone: BadgeTone | undefined) {
  switch (tone) {
    case 'amber':
      return 'bg-amber-100 text-amber-800 ring-amber-200';
    case 'emerald':
      return 'bg-emerald-100 text-emerald-800 ring-emerald-200';
    case 'blue':
    default:
      return 'bg-blue-100 text-blue-800 ring-blue-200';
  }
}

export default function Certifications() {
  const certifications: Cert[] = [
    {
      title: 'GCP Professional Database Engineer',
      image: '/certs/gcp-database.png',
      link: 'https://drive.google.com/file/d/1XPxOQo82fh-2YGYNEU99Nsb82qcoJgie/view?usp=sharing',
      issuer: 'Google Cloud',
      issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg',
      year: '2024',
    },
    {
      title: 'GCP Associate Cloud Engineer',
      image: '/certs/gcp-associate.png',
      link: 'https://drive.google.com/file/d/1iWPV0KdqcihBlg3Cr8lMscvSptrrp6fB/view?usp=sharing',
      issuer: 'Google Cloud',
      issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg',
      year: '2023',
    },
    {
      title: 'GCP Professional Cloud Architect',
      image: '/certs/gcp-architect.png',
      link: 'https://drive.google.com/file/d/1s_RNuY4XJ9Gk9t6shcSxdHm4sIuHIRYx/view?usp=sharing',
      issuer: 'Google Cloud',
      issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg',
      year: '2024',
    },
    {
      title: 'Safe Milo Capstone Winner',
      image: '/certs/HemantSafeMilo.png',
      link: 'https://drive.google.com/file/d/1kwff7PlW-lTEFcs_-3QWL4uZc6p764e2/view?usp=sharing',
      issuer: 'Langara College',
      issuerLogo: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f393.svg',
      year: '2025',
      badge: { label: 'Award', tone: 'amber' },
    },
    {
      title: 'Huawei Networking, Routing and Switching',
      image: '/certs/huawei.png',
      link: 'https://drive.google.com/file/d/1T6ZLIF9osM4KIXNSx-HAx12BDLkLFhff/view',
      issuer: 'Huawei',
      issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/huawei.svg',
      year: '2020',
    },
    {
      title: 'Industrial Training in Python Django Stack',
      image: '/certs/Django.png',
      link: 'https://drive.google.com/file/d/17ciSLTC_v1yBPq9tzfuZVaYmNuEdZTBC/view',
      issuer: 'Industrial Training',
      issuerLogo: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4da.svg',
      year: '2019',
    },
    {
      title: 'Industrial Training in Core Java',
      image: '/certs/java.png',
      link: 'https://drive.google.com/file/d/1RuR5886u95m5vN505nHpHBaWDZJPQa7A/view',
      issuer: 'Industrial Training',
      issuerLogo: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4da.svg',
      year: '2019',
    },
  ];

  // --- Mobile pagination state ---
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageIndex, setPageIndex] = React.useState(0);

  const VISIBLE_DEFAULT = 6;
  const [showAll, setShowAll] = React.useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, VISIBLE_DEFAULT);

  // Recalculate pages
  const recalcPages = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const count = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
    setPageCount(count);
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setPageIndex(Math.min(count - 1, Math.max(0, idx)));
  }, []);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        recalcPages();
        raf = 0;
      });
    };

    const ro = new ResizeObserver(() => recalcPages());
    ro.observe(el);

    el.addEventListener('scroll', onScroll, { passive: true });
    recalcPages();

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [recalcPages]);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => recalcPages());
    return () => cancelAnimationFrame(id);
  }, [showAll, recalcPages, certifications.length]);

  const goToPage = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section id="certifications" className="scroll-mt-23 md:scroll-mt-25">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative mt-10 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
        aria-labelledby="certs-heading"
      >
        {/* Header */}
        <h3
          id="certs-heading"
          className="flex items-center gap-2 border-b pb-3 text-2xl font-bold text-gray-800"
        >
          <BadgeCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />
          Certifications
        </h3>

        {/* Edge fades for mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-20 left-0 w-10 bg-gradient-to-r from-white to-transparent lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-20 right-0 w-10 bg-gradient-to-l from-white to-transparent lg:hidden"
        />

        {/* Grid / scroller */}
        <div ref={scrollerRef} className="mt-6 overflow-x-auto lg:overflow-visible">
          <ul
            id="certs-list"
            className="
              flex w-max snap-x snap-mandatory gap-6 pr-2
              lg:grid lg:w-auto lg:grid-cols-3 lg:gap-6
            "
            role="list"
          >
            {visibleCerts.map((cert, index) => {
              const theme = getIssuerTheme(cert.issuer);
              return (
                <li key={cert.title} className="snap-start lg:snap-none">
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open certificate: ${cert.title}`}
                    className="
                      group relative block min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl
                      bg-gray-50 p-4 shadow-md ring-1 ring-slate-200 transition
                      hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                      sm:min-w-[350px] sm:max-w-[350px]
                      lg:min-w-0 lg:max-w-none
                    "
                    whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.22 } }}
                  >
                    {/* Award badge (top-left) */}
                    {cert.badge && (
                      <span
                        aria-label={`${cert.badge.label} badge`}
                        className={`pointer-events-none absolute -top-2 -left-2 z-20 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-md ring-1 ${toneClasses(cert.badge.tone)}`}
                      >
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        {cert.badge.label}
                      </span>
                    )}

                    {/* Certificate image */}
                    <div className="relative mb-3 overflow-hidden rounded-lg">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        width={600}
                        height={420}
                        className="h-65 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 250px, 320px"
                        priority={index < 2}
                      />
                    </div>

                    {/* Footer row: issuer chip (left) + year pill (right) */}
                    <div className="mt-2 flex items-center justify-between">
                      {/* Issuer chip */}
                      {(cert.issuer || cert.issuerLogo) && (
                        <span
                          className={[
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1',
                            theme.issuerChip,
                          ].join(' ')}
                        >
                          {cert.issuerLogo && (
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/90">
                              <Image
                                src={cert.issuerLogo}
                                alt={`${cert.issuer ?? 'Issuer'} logo`}
                                width={12}
                                height={12}
                                className="h-3 w-3 object-contain"
                              />
                            </span>
                          )}
                          <span className="leading-none">{cert.issuer}</span>
                        </span>
                      )}

                      {/* Year pill */}
                      {cert.year && (
                        <span
                          className={[
                            'ml-3 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold',
                            theme.yearPill,
                            'ring-1 ring-black/10 shadow-sm',
                          ].join(' ')}
                        >
                          {cert.year}
                        </span>
                      )}
                    </div>
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile pagination dots */}
        {pageCount > 1 && (
          <nav className="mt-4 flex justify-center lg:hidden" aria-label="Certification pages">
            <ul className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => {
                const active = i === pageIndex;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => goToPage(i)}
                      aria-label={`Go to page ${i + 1} of ${pageCount}`}
                      aria-current={active ? 'page' : undefined}
                      className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                        ${active ? 'w-5 bg-blue-600' : 'w-2.5 bg-slate-300'}
                      `}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* View all / Show less toggle */}
        {certifications.length > VISIBLE_DEFAULT && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:border-blue-500 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-expanded={showAll}
              aria-controls="certs-list"
            >
              {showAll ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  View all ({certifications.length}) <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
