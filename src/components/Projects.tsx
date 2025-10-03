"use client";

import StarryProjectGrid, { type StarryProject } from "@/components/StarryProjectGrid";

const projects: StarryProject[] = [
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

export default function Projects() {
  return (
    <StarryProjectGrid
      id="projects"
      title="Some of my Projects!"
      projects={projects}
      withGradient
      withStarfield
      starCount={200}
      meteorEveryMs={2800}
      gridColsClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      enableFlip
      flipIntervalMs={5000}
    />
  );
}
