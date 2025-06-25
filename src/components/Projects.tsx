"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Safe Milo - An Elderly Safety App",
      description: "A React Native Expo Mobile Application to save elderly people from online scams.",
      link: "https://safemilo.wmdd.ca/",
      github: "https://github.com/Capstone-Cheems/safemilo-app",
      image: "/safe-milo.png",
    },
    {
      title: "Helpmet - A Site Safety Web App",
      description: "A Site Safety app with features like injury reporting, heat maps, equipment checks & more.",
      link: "https://helpmet.ca/",
      github: "https://github.com/Hkumar145/Helpmet",
      image: "/Helpmet.svg",
    },
    {
      title: "Portfolio Website",
      description: "This is my very own portfolio, built with Next.js and Tailwind CSS.",
      link: "https://hemantanand.dev",
      github: "https://github.com/Hkumar145/hemant-portfolio",
      image: "/portfolio.png",
    },
    {
      title: "Art Asta - An Art Marketplace",
      description: "A full-stack e-commerce platform for artists to showcase and sell their work.",
      link: "https://artasta.netlify.app/",
      github: "https://github.com/Hkumar145/ArtAsta",
      image: "/artasta.jpg",
    },
  ];

  const [rotated, setRotated] = useState(projects.map(() => false));

  const toggleRotation = (index: number) => {
    setRotated((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];

    projects.forEach((_, index) => {
      const delay = index * 1000;
      setTimeout(() => {
        toggleRotation(index);
        const intervalId = setInterval(() => {
          toggleRotation(index);
        }, 5000);
        intervalIds.push(intervalId);
      }, delay);
    });

    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId));
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Some of my Projects!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative w-full h-48 mb-4 perspective">
                <div
                  className={`w-full h-full transition-transform duration-[1000ms] ease-in-out preserve-3d ${
                    rotated[index] ? "rotate-y-180" : "rotate-y-0"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-contain backface-hidden rounded-lg"
                    priority={index === 0}
                  />
                </div>
              </div>
              <h3 className="text-xl text-gray-600 font-semibold mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600">{project.description}</p>

              <div className="flex justify-between items-center mt-4">
                <motion.a
                  href={project.link}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex items-center gap-1 text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Live Site</span>
                </motion.a>
                <motion.a
                  href={project.github}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="group relative flex items-center gap-1 text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">GitHub</span>
                </motion.a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
