'use client';

import { BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function Certifications() {
  const certifications = [
    {
      title: 'GCP Professional Database Engineer',
      image: '/certs/gcp-database.png',
      link: 'https://google.accredible.com/545d42fa-76ed-475e-9d5c-c7dc5de94a8c#acc.VbEYDwmc',
    },
    {
      title: 'GCP Associate Cloud Engineer',
      image: '/certs/gcp-associate.png',
      link: 'https://google.accredible.com/26190082-c3ea-40d7-8574-0f844560506a#acc.CYF1POAn',
    },
    {
      title: 'GCP Professional Cloud Architect',
      image: '/certs/gcp-architect.png',
      link: 'https://google.accredible.com/a03d27de-e32f-44ae-b774-c6d987b6426b#acc.iwoaZU7j',
    },
    {
      title: 'Huawei Networking, Routing and Switching',
      image: '/certs/huawei.png',
      link: 'https://drive.google.com/file/d/1T6ZLIF9osM4KIXNSx-HAx12BDLkLFhff/view',
    },
    {
      title: 'Industrial Training in Python Django Stack',
      image: '/certs/Django.png',
      link: 'https://drive.google.com/file/d/17ciSLTC_v1yBPq9tzfuZVaYmNuEdZTBC/view',
    },
    {
      title: 'Industrial Training in Core Java',
      image: '/certs/java.png',
      link: 'https://drive.google.com/file/d/1RuR5886u95m5vN505nHpHBaWDZJPQa7A/view',
    },
  ];

  // --- Mobile pagination state ---
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageIndex, setPageIndex] = React.useState(0);

  // Recalculate pages: each "page" equals the visible width of the scroller
  const recalcPages = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const count = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
    setPageCount(count);

    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setPageIndex(Math.min(count - 1, Math.max(0, idx)));
  }, []);

  // Attach listeners (scroll + resize)
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

  // Click a dot -> smooth scroll to that page
  const goToPage = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const targetLeft = i * el.clientWidth;
    el.scrollTo({ left: targetLeft, behavior: 'smooth' });
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

        {/* Hybrid layout: horizontal scroll on mobile, grid on desktop */}
        <div ref={scrollerRef} className="mt-6 overflow-x-auto lg:overflow-visible">
          <ul
            className="
              flex w-max snap-x snap-mandatory gap-6 pr-2
              lg:grid lg:w-auto lg:grid-cols-3 lg:gap-6
            "
            role="list"
          >
            {certifications.map((cert, index) => (
              <li key={cert.title} className="snap-start lg:snap-none">
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View credential: ${cert.title}`}
                  className="
                    group block min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl
                    bg-gray-50 p-4 shadow-md ring-1 ring-slate-200 transition
                    hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                    sm:min-w-[350px] sm:max-w-[350px]
                    lg:min-w-0 lg:max-w-none
                  "
                  whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.22 } }}
                >
                  <div className="mb-3 overflow-hidden rounded-lg">
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
                  <p className="text-sm font-medium text-gray-800">{cert.title}</p>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile pagination dots (clickable) */}
        {pageCount > 1 && (
          <nav
            className="mt-4 flex justify-center lg:hidden"
            aria-label="Certification pages"
          >
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
      </motion.div>
    </section>
  );
}
