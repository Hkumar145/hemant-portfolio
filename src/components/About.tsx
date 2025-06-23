"use client";
import Certifications from './Certifications';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';



export default function About() {

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">About Me</h2>
        <p className="text-lg text-gray-600 mb-6 px-5 text-justify">
          I&apos;m a passionate developer with expertise in Javascript, Python, Next.js, React.js, Node JS, MongoDB and Tailwind CSS. I love creating
          fast, responsive, and user-friendly applications. My goal is to build seamless digital
          experiences that solve real-world problems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Skills />
         <Experience />
         <Education />
         <Certifications />
        </div>
      </div>
   
    </section>
  );
}