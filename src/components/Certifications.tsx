'use client';

import { BadgeCheck, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type BadgeTone = 'amber' | 'emerald' | 'blue';
type Cert = {
  title: string;
  image: string;
  link: string;
  issuer?: string;
  issuerLogo?: string;
  year?: string | number;
  badge?: { label: string; tone: BadgeTone };
};

type IssuerTheme = { issuerChip: string; yearPill: string };
function getIssuerTheme(issuer?: string): IssuerTheme {
  switch ((issuer || '').toLowerCase()) {
    case 'google cloud':
      return { issuerChip: 'bg-slate-900/80 text-white ring-white/15', yearPill: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' };
    case 'huawei':
      return { issuerChip: 'bg-slate-900/80 text-white ring-white/15', yearPill: 'bg-gradient-to-r from-rose-500 to-red-600 text-white' };
    case 'langara college':
      return { issuerChip: 'bg-slate-900/80 text-white ring-white/15', yearPill: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white' };
    case 'industrial training':
      return { issuerChip: 'bg-slate-900/80 text-white ring-white/15', yearPill: 'bg-gradient-to-r from-slate-600 to-slate-800 text-white' };
    default:
      return { issuerChip: 'bg-slate-900/80 text-white ring-white/15', yearPill: 'bg-gradient-to-r from-sky-500 to-cyan-600 text-white' };
  }
}
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

/* media query hook */
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);

    type LegacyMql = MediaQueryList & {
      addListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
    };
    const m = mql as LegacyMql;

    const onChangeEvent = (e: Event) => setMatches((e as MediaQueryListEvent).matches);
    const onChangeLegacy = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(m.matches);
    if ('addEventListener' in m && typeof m.addEventListener === 'function') m.addEventListener('change', onChangeEvent);
    else if (typeof m.addListener === 'function') m.addListener(onChangeLegacy);

    return () => {
      if ('removeEventListener' in m && typeof m.removeEventListener === 'function') m.removeEventListener('change', onChangeEvent);
      else if (typeof m.removeListener === 'function') m.removeListener(onChangeLegacy);
    };
  }, [query]);
  return matches;
}

export default function Certifications() {
  const certifications: Cert[] = [
    { title: 'GCP Professional Database Engineer', image: '/certs/gcp-database.png', link: 'https://drive.google.com/file/d/1XPxOQo82fh-2YGYNEU99Nsb82qcoJgie/view?usp=sharing', issuer: 'Google Cloud', issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg', year: '2024' },
    { title: 'GCP Associate Cloud Engineer', image: '/certs/gcp-associate.png', link: 'https://drive.google.com/file/d/1iWPV0KdqcihBlg3Cr8lMscvSptrrp6fB/view?usp=sharing', issuer: 'Google Cloud', issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg', year: '2023' },
    { title: 'GCP Professional Cloud Architect', image: '/certs/gcp-architect.png', link: 'https://drive.google.com/file/d/1s_RNuY4XJ9Gk9t6shcSxdHm4sIuHIRYx/view?usp=sharing', issuer: 'Google Cloud', issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg', year: '2024' },
    { title: 'Safe Milo Capstone Winner', image: '/certs/HemantSafeMilo.png', link: 'https://drive.google.com/file/d/1kwff7PlW-lTEFcs_-3QWL4uZc6p764e2/view?usp=sharing', issuer: 'Langara College', issuerLogo: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f393.svg', year: '2025', badge: { label: 'Award', tone: 'amber' } },
    { title: 'Huawei Networking, Routing and Switching', image: '/certs/huawei.png', link: 'https://drive.google.com/file/d/1T6ZLIF9osM4KIXNSx-HAx12BDLkLFhff/view', issuer: 'Huawei', issuerLogo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/huawei.svg', year: '2020' },
    { title: 'Industrial Training in Python Django Stack', image: '/certs/Django.png', link: 'https://drive.google.com/file/d/17ciSLTC_v1yBPq9tzfuZVaYmNuEdZTBC/view', issuer: 'Industrial Training', issuerLogo: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4da.svg', year: '2019' },
    { title: 'Industrial Training in Core Java', image: '/certs/java.png', link: 'https://drive.google.com/file/d/1RuR5886u95m5vN505nHpHBaWDZJPQa7A/view', issuer: 'Industrial Training', issuerLogo: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4da.svg', year: '2019' },
  ];

  // layout flags
  const isGridMd = useMediaQuery('(min-width: 768px) and (max-width: 1023.98px)');
  const isGridLgUp = useMediaQuery('(min-width: 1024px)');

  const MD_DEFAULT = 4; // 2×2
  const LG_DEFAULT = 6; // 3×3

  // horizontal scroller state (mobile)
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageIndex, setPageIndex] = React.useState(0);

  // grid "view all" state (md & lg)
  const [showAllGrid, setShowAllGrid] = React.useState(false);

  const isHorizontal = !isGridMd && !isGridLgUp;

  // compute visible items per layout
  let visibleCerts = certifications;
  if (isGridMd) visibleCerts = showAllGrid ? certifications : certifications.slice(0, MD_DEFAULT);
  else if (isGridLgUp) visibleCerts = showAllGrid ? certifications : certifications.slice(0, LG_DEFAULT);

  /** ---------- helpers to center items & compute active index ---------- */
  const centerItem = React.useCallback((i: number, behavior: ScrollBehavior = 'auto') => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = el.querySelectorAll('li');
    const item = items[i] as HTMLElement | undefined;
    if (!item) return;
    const left = item.offsetLeft;
    const target = Math.max(0, left + item.clientWidth / 2 - el.clientWidth / 2);
    el.scrollTo({ left: target, behavior });
  }, []);

  const nearestCenteredIndex = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const items = Array.from(el.querySelectorAll('li')) as HTMLElement[];
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0, bestDelta = Infinity;
    items.forEach((it, idx) => {
      const c = it.offsetLeft + it.clientWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDelta) { bestDelta = d; best = idx; }
    });
    return best;
  }, []);

  const goToPage = (i: number) => centerItem(i, 'smooth');

  /** ---------- paging / resize listeners ---------- */
  const recalcPages = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (isHorizontal) {
      setPageCount(certifications.length);
      setPageIndex(nearestCenteredIndex());
    } else {
      const count = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
      setPageCount(count);
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setPageIndex(Math.min(count - 1, Math.max(0, idx)));
    }
  }, [isHorizontal, certifications.length, nearestCenteredIndex]);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { recalcPages(); raf = 0; });
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

  // center the first certificate on initial mount (mobile horizontal)
  React.useEffect(() => {
    if (!isHorizontal) return;
    const t0 = requestAnimationFrame(() => centerItem(0, 'auto'));
    const t1 = setTimeout(() => centerItem(0, 'auto'), 250);
    return () => { cancelAnimationFrame(t0); clearTimeout(t1); };
  }, [isHorizontal, centerItem]);

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
        <h3 id="certs-heading" className="flex items-center gap-2 border-b pb-3 text-2xl font-bold text-gray-800">
          <BadgeCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />
          Certifications
        </h3>

        {/* mobile edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-20 left-0 w-10 bg-gradient-to-r from-white to-transparent md:hidden z-0" />
        <div aria-hidden className="pointer-events-none absolute inset-y-20 right-0 w-10 bg-gradient-to-l from-white to-transparent md:hidden z-0" />

        {/* scroller / grid container */}
        <div
          ref={scrollerRef}
          className="mt-0 overflow-x-auto overflow-y-visible md:overflow-visible pt-4 /* pl-0.5 removed */ pb-2 md:pb-0"
        >
          <ul
  id="certs-list"
  className="
    flex w-max snap-x snap-mandatory gap-4 pt-2 
    /* mobile: center the first/last card with equal side gutters */
    pl-[3.2vw] pr-[2vw]
    /* when the card snaps to 360px on sm, gutters = (100% - 360)/2 */
    sm:pl-3 sm:pr-[calc(50%-180px)]
    md:pl-0 md:pr-0
    md:grid md:w-auto md:grid-cols-2 md:gap-4
    lg:grid-cols-3
  "
  role="list"
>

            {visibleCerts.map((cert, index) => {
              const theme = getIssuerTheme(cert.issuer);
              return (
                <li key={cert.title} className="snap-center md:snap-none">
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open certificate: ${cert.title}`}
                    className="
                      group relative block min-w-[325px] max-w-[325px] sm:min-w-[350px] sm:max-w-[350px]
                      md:min-w-0 md:max-w-none flex-shrink-0 rounded-xl
                      bg-gray-50 p-4 shadow-md ring-1 ring-slate-200 transition
                      hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                    "
                    whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.22 } }}
                  >
                    {/* Award sticker */}
                    {cert.badge && (
                      <span
                        aria-label={`${cert.badge.label} badge`}
                        className={`pointer-events-none absolute -top-2 -left-2 z-[999] inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-md ring-1 ${toneClasses(cert.badge.tone)}`}
                      >
                        <Award className="h-3.5 w-3.5" aria-hidden />
                        {cert.badge.label}
                      </span>
                    )}

                    {/* Image */}
                    <div className="mb-3 rounded-lg bg-white">
                      <div className="relative flex items-center justify-center overflow-hidden rounded-lg h-[200px] sm:h-[220px] md:h-[220px] lg:h-[260px]">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 340px, (max-width: 1024px) 360px, 420px"
                          priority={index < 2}
                        />
                      </div>
                    </div>

                    {/* Footer: issuer + year */}
                    <div className="mt-2 flex items-center justify-between">
                      {(cert.issuer || cert.issuerLogo) && (
                        <span className={['inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1', theme.issuerChip].join(' ')}>
                          {cert.issuerLogo && (
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/90">
                              <Image src={cert.issuerLogo} alt={`${cert.issuer ?? 'Issuer'} logo`} width={12} height={12} className="h-3 w-3 object-contain" />
                            </span>
                          )}
                          <span className="leading-none">{cert.issuer}</span>
                        </span>
                      )}
                      {cert.year && (
                        <span className={['ml-3 inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold', theme.yearPill, 'ring-1 ring-black/10 shadow-sm'].join(' ')}>
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

        {/* pagination dots — only on horizontal (mobile) */}
        {isHorizontal && pageCount > 1 && (
          <nav className="mt-4 flex justify-center md:hidden" aria-label="Certification pages">
            <ul className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => {
                const active = i === pageIndex;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => goToPage(i)}
                      aria-label={`Go to certificate ${i + 1} of ${pageCount}`}
                      aria-current={active ? 'page' : undefined}
                      className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${active ? 'w-5 bg-blue-600' : 'w-2.5 bg-slate-300'}`}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* View all — only on grid (md 2×2 or lg 3×3), not on horizontal */}
        {((isGridMd && certifications.length > MD_DEFAULT) || (isGridLgUp && certifications.length > LG_DEFAULT)) && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllGrid(s => !s)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:border-blue-500 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-expanded={showAllGrid}
              aria-controls="certs-list"
            >
              {showAllGrid ? (
                <>Show less <ChevronUp className="h-4 w-4" aria-hidden /></>
              ) : (
                <>View all ({certifications.length}) <ChevronDown className="h-4 w-4" aria-hidden /></>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
