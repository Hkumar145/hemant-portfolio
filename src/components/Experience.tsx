'use client';
import { CalendarCheck2 } from "lucide-react";
import { motion } from 'framer-motion';

// Define keyframe animation and transition separately
const rotateKeyframes = { rotate: [0, 1.5, -1.5, 1.5, -1.5, 0] };
const rotateTransition = {
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export default function Experience() {
  return (
    <motion.div
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-md scroll-mt-23 md:scroll-mt-25"
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
      <motion.div
  animate={rotateKeyframes}
  transition={rotateTransition}
  className="w-1/2 pr-8 text-right"
>
<div className="text-lg font-semibold flex flex-wrap justify-end">
  {/* Google Logo Letters */}
  <motion.span style={{ color: "#4285F4" }}>G</motion.span>
  <motion.span style={{ color: "#DB4437" }}>o</motion.span>
  <motion.span style={{ color: "#F4B400" }}>o</motion.span>
  <motion.span style={{ color: "#4285F4" }}>g</motion.span>
  <motion.span style={{ color: "#0F9D58" }}>l</motion.span>
  <motion.span style={{ color: "#DB4437" }}>e</motion.span>

  {/* Only first letter of each word is colored */}
  <span className="ml-2">
    <span className="text-indigo-500">O</span>perations{" "}
    <span className="text-orange-500">C</span>enter
  </span>
</div>


  <p className="text-sm text-gray-600">Cloud Support Analyst</p>
  <div className="flex justify-end text-sm text-gray-500 mt-2">
    <span className="flex items-center gap-1">
      <CalendarCheck2 className="w-4 h-4" /> 2022 - 2023
    </span>
  </div>
</motion.div>

        {/* Item 2 - Right */}
        <div className="mb-12 flex justify-end items-center w-full">
          <div className="w-1/2"></div>

          <motion.div
            animate={rotateKeyframes}
            transition={rotateTransition}
            className="relative z-10 w-4 h-4 bg-black rounded-full border-2 border-white"
          ></motion.div>

          <motion.div
            animate={rotateKeyframes}
            transition={rotateTransition}
            className="w-1/2 pl-8 text-left"
          >
            <div className="text-lg font-semibold flex text-left">
  <span className="text-orange-500">X</span>
  <span className="text-gray-800">pheno Pvt Limited</span>
</div>

            <p className="text-sm text-gray-600">Talent Acquisition Specialist</p>
            <div className="flex justify-start text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <CalendarCheck2 className="w-4 h-4" /> 2022 - 2023
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="text-gray-600 mb-12 text-left">
        Today, I work as a Full Stack Developer, specializing in Next.js, React.js, MongoDB, TypeScript, Python, and Tailwind CSS, delivering modern, responsive web and mobile applications.
      </p>
    </motion.div>
  );
}
