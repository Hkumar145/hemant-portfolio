'use client';
import { BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Certifications() {
  const certifications = [
    'GCP Professional Database Engineer',
    'GCP Associate Cloud Engineer',
    'GCP Professional Cloud Architect',
    'Huawei Networking and Routing',
    'Fundamentals of Digital Marketing',
    'Core Java',
    'TCS NQT iON',
    'Python Django Full Stack',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg mt-10 space-y-4"
    >
      <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 flex items-center gap-2">
        <BadgeCheck className="w-6 h-6 text-blue-600" />
        Certifications
      </h3>

      <ul className="space-y-2 list-disc list-inside text-gray-700 text-base">
        {certifications.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>
    </motion.div>
  );
}
