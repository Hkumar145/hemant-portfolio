'use client';

import { BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

  return (
    // 👇 added larger scroll margin top for sticky header offset
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

        {/* Edge fades to hint scroll on mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-20 left-0 w-10 bg-gradient-to-r from-white to-transparent lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-20 right-0 w-10 bg-gradient-to-l from-white to-transparent lg:hidden"
        />

        {/* Hybrid layout: horizontal scroll on mobile, grid on desktop */}
        <div className="mt-6 overflow-x-auto lg:overflow-visible">
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
                    group block min-w-[250px] max-w-[250px] flex-shrink-0 rounded-xl
                    bg-gray-50 p-4 shadow-md ring-1 ring-slate-200 transition
                    hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
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
      </motion.div>
    </section>
  );
}
