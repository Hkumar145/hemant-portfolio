"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Projects() {
  const projects = [
    {
      title: "Safe Milo - An Elderly Safety App",
      description: "A React Native Expo Mobile Application to Save elderly people from online scams.",
      link: "https://safemilo.wmdd.ca/",
      image: "/safe-milo.png",
    },
    {
      title: "Helpmet - A Site Safety Web App",
      description: "A productivity app with real-time updates using Next.js and Firebase.",
      link: "https://helpmet.ca/",
      image: "/helpmet.svg",
    },
    {
      title: "Portfolio Website",
      description: "This is my very own portfolio, built with Next.js and Tailwind CSS.",
      link: "https://github.com/Hkumar145/hemant-portfolio",
      image: "/portfolio.png",
    },
  ];

  // State to track rotation state for each image (true for rotating, false for not rotating)
  const [rotated, setRotated] = useState(projects.map(() => false));

  // Function to toggle rotation state for a specific image
  const toggleRotation = (index: number) => {
    setRotated((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  // Set up automatic rotation with staggered timing
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

    // Cleanup intervals on component unmount
    return () => {
      intervalIds.forEach((intervalId) => {
        clearInterval(intervalId);
      });
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className={`transition-transform duration-700 ease-in-out ${rotated[index] ? 'rotate-y-360' : 'rotate-y-0'
                    } ${index === projects.length - 1 ? 'rounded-2xl' : ''}`}
                  priority={index === 0}
                />

              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <a
                href={project.link}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}