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
import StarryProjectGrid from '../components/StarryProjectGrid';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />

        {/* ⭐ Starry wrapper for Education / Skills / Experience / Certifications */}
        <StarryProjectGrid
          id="highlights"
          title="Highlights"
          withGradient
          withStarfield
          starCount={150}
          meteorEveryMs={2600}
          containerClassName="container mx-auto px-0 mb-12 space-y-12"
        >
          <Education />
          <Skills />
          <Experience />
          <Certifications />
        </StarryProjectGrid>

        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
