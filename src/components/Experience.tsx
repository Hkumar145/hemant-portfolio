'use client';
import { CalendarCheck2 } from "lucide-react";
import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 flex items-center gap-2">
        <CalendarCheck2 className="w-6 h-6 text-blue-600" />
        Experience
      </h3>
      
      <p className="text-gray-600 mt-5 mb-12 text-left">
        With 2+ years of experience in IT, I began my journey in Talent Acquisition before transitioning into a technical role as a Cloud Support Analyst at Google. During this time, I discovered my true passion for building digital products.
      </p>

      <div className="relative max-w-4xl mx-auto">
        <div className="border-l-2 border-gray-300 absolute h-full left-1/2 transform -translate-x-1/2"></div>

        {/* Item 1 - Left */}
        <div className="mb-12 flex justify-start items-center w-full">
          <div className="w-1/2 pr-8 text-right">
            <h4 className="text-lg text-gray-600 font-semibold">Google Operations Center</h4>
            <p className="text-sm text-gray-600">Cloud Support Analyst</p>
            <div className="flex justify-end text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <CalendarCheck2 className="w-4 h-4" /> 2022 - 2023
              </span>
            </div>
          </div>

          <div className="relative z-10 w-4 h-4 bg-black rounded-full border-2 border-white"></div>
          <div className="w-1/2"></div>
        </div>

        {/* Item 2 - Right */}
        <div className="mb-12 flex justify-end items-center w-full">
          <div className="w-1/2"></div>
          <div className="relative z-10 w-4 h-4 bg-black rounded-full border-2 border-white"></div>
          <div className="w-1/2 pl-8 text-left">
            <h4 className="text-lg text-gray-600 font-semibold">Xpheno Pvt Limited</h4>
            <p className="text-sm text-gray-600">Talent Acquisition Specialist</p>
            <div className="flex justify-start text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <CalendarCheck2 className="w-4 h-4" /> 2022 - 2023
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-12 text-left">
        Today, I work as a Full Stack Developer, specializing in Next.js, React.js, MongoDB, TypeScript, Python, and Tailwind CSS, delivering modern, responsive web and mobile applications.
      </p>
    </motion.div>
  );
}
