"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Safe Milo - An Elderly Safety App",
      description:
        "A React Native Expo Mobile Application to save elderly people from online scams.",
      link: "https://safemilo.wmdd.ca/",
      github: "https://github.com/Capstone-Cheems/safemilo-app",
      image: "/safe-milo.png",
    },
    {
      title: "Helpmet - A Site Safety Web App",
      description:
        "A Site Safety app with features like injury reporting, heat maps, equipment checks & more.",
      link: "https://helpmet.ca/",
      github: "https://github.com/Hkumar145/Helpmet",
      image: "/Helpmet.svg",
    },
    {
      title: "Portfolio Website",
      description:
        "This is my very own portfolio, built with Next.js and Tailwind CSS.",
      link: "https://www.hemantkmr.dev/",
      github: "https://github.com/Hkumar145/hemant-portfolio",
      image: "/portfolio.png",
    },
    {
      title: "Art Asta - An Art Marketplace",
      description:
        "A full-stack e-commerce platform for artists to showcase and sell their work.",
      link: "https://artasta.netlify.app/",
      github: "https://github.com/Hkumar145/ArtAsta",
      image: "/artasta.jpg",
    },
  ];

  const reduce = useReducedMotion();
  const EASE: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

  // Staggered reveal
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: EASE,
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.45 } },
  };

  // Flip timer
  const [rotated, setRotated] = useState(projects.map(() => false));
  const toggleRotation = (index: number) => {
    setRotated((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    projects.forEach((_, index) => {
      const t = setTimeout(() => {
        toggleRotation(index);
        const iv = setInterval(() => toggleRotation(index), 5000);
        intervals.push(iv);
      }, index * 1000);
      timers.push(t);
    });
    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-100 scroll-mt-5 md:scroll-mt-8">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Some of my Projects!
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {projects.map((project, index) => (
            <TiltCard key={project.title} reduce={reduce ?? false} variants={item}>
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

              <h3 className="text-xl text-gray-700 font-semibold mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600">{project.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <motion.a
                  href={project.link}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: reduce ? 1 : 1.05 }}
                  transition={{ duration: 0.35, ease: EASE }}
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
                  whileHover={{ scale: reduce ? 1 : 1.05 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
                  className="group relative flex items-center gap-1 text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">GitHub</span>
                </motion.a>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * TiltCard
 * Wraps a project card with parallax tilt effect (on hover).
 */
function TiltCard({
  children,
  reduce,
  variants,
  maxTilt = 8, // degrees
}: {
  children: React.ReactNode;
  reduce: boolean;
  variants: Variants;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const isTouch =
    typeof window !== "undefined" &&
    (("ontouchstart" in window) || navigator.maxTouchPoints > 0);

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (reduce || isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const dx = (px - 0.5) * 2;
    const dy = (py - 0.5) * 2;
    rx.set(-dy * maxTilt);
    ry.set(dx * maxTilt);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reduce || isTouch ? 0 : srx,
        rotateY: reduce || isTouch ? 0 : sry,
      }}
      className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col transition-transform will-change-transform"
      whileHover={{
        y: reduce ? 0 : -6,
        scale: reduce ? 1 : 1.02,
        boxShadow: reduce ? undefined : "0px 8px 24px rgba(0,0,0,0.15)",
      }}
      transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {children}
    </motion.div>
  );
}
