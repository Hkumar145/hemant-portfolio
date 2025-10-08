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
  // Tailwind scroll-mt- values assume ~7–8rem header on mobile/desktop.
  // Tweak to scroll-mt-24/28/32 depending on your actual header height.
  const sectionOffset = 'scroll-mt-28 md:scroll-mt-32';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">

        {/* (Optional) No anchor for Hero since it's not in the navbar */}
        <Hero />

        {/* About */}
        <section id="about" className={sectionOffset}>
          <About />
        </section>

        {/* ⭐ Starry wrapper area */}
        <StarryProjectGrid
          id="highlights"
          title="Highlights"
          withGradient
          withStarfield
          starCount={150}
          meteorEveryMs={2600}
          containerClassName="container mx-auto px-0 mb-12 space-y-12"
        >
          {/* Education is not linked in the navbar, but we can still give it an id if you ever add it */}
          <section id="education" className={sectionOffset}>
            <Education />
          </section>

          {/* Skills */}
          <section id="skills" className={sectionOffset}>
            <Skills />
          </section>

          {/* Experience */}
          <section id="experience" className={sectionOffset}>
            <Experience />
          </section>

          {/* Certifications */}
          <section id="certifications" className={sectionOffset}>
            <Certifications />
          </section>
        </StarryProjectGrid>

        {/* Projects */}
        <section id="projects" className={sectionOffset}>
          <Projects />
        </section>

        {/* Contact */}
        <section id="contact" className={sectionOffset}>
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
