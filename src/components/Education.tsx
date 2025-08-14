'use client';
import { GraduationCap, CalendarCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 , ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-6 mt-10"
    >
      <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        Education
      </h3>

      {/* Bachelor's Degree */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700">
          BTech in Electronics and Communication Engineering
        </h4>
        <p className="text-gray-600">DAV Institute of Engineering and Technology, Jalandhar</p>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <CalendarCheck2 className="w-4 h-4" /> 2016 - 2020
          </span>
          <span>
            GPA: 7.53/10 (Distinction)
          </span>
        </div>
      </div>

      {/* PGDM Degree */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700">
          PGDM in Web &amp; Mobile App Development and Design
        </h4>
        <p className="text-gray-600">Langara College, Vancouver</p>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <CalendarCheck2 className="w-4 h-4" /> 2024 - 2025
          </span>
          <span>
            GPA: 3.48/4.0 (Distinction)
            {/* If Langara uses 4.33, change to 3.48/4.33 */}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
