import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Certifications from '../components/Certifications';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
          <div className="container mx-auto px-0 mb-12 space-y-12">
          <Education />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Skills />
         <Experience />
        </div>
        
         <Certifications />
        </div>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}