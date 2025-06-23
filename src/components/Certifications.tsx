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
      title: 'Google Digital Garage - Fundamentals of Digital Marketing',
      image: '/certs/digital-marketing.png',
      link: 'https://drive.google.com/file/d/1-CGfuvpcZjuODVZSd2YPcX3SJQKRZcwE/view',
    },
    {
      title: 'Industrail Training in Python Django Stack',
      image: '/certs/Django.png',
      link: 'https://drive.google.com/file/d/17ciSLTC_v1yBPq9tzfuZVaYmNuEdZTBC/view',
    },
    {
      title: 'Industrail Training in Core Java',
      image: '/certs/java.png',
      link: 'https://drive.google.com/file/d/1RuR5886u95m5vN505nHpHBaWDZJPQa7A/view',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg mt-10 space-y-6"
    >
      <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 flex items-center gap-2">
        <BadgeCheck className="w-6 h-6 text-blue-600" />
        Certifications
      </h3>

      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[250px] max-w-[250px] bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition p-4 flex-shrink-0"
            >
              <Image
                src={cert.image}
                alt={cert.title}
                width={250}
                height={160}
                className="rounded-lg object-cover mb-3"
              />
              <p className="text-sm text-gray-800 font-medium">{cert.title}</p>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
