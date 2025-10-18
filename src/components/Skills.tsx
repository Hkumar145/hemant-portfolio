'use client';

import Image from 'next/image';
import { Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type Category =
  | 'Languages'
  | 'Cloud & DevOps'
  | 'Frontend'
  | 'Backend'
  | 'Design'
  | 'Others';

type Skill = {
  name: string;
  src: string;
  alt: string;
  category: Category;
};

const SKILLS: Skill[] = [
  // Languages
  { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', alt: 'JavaScript logo', category: 'Languages' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', alt: 'TypeScript logo', category: 'Languages' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', alt: 'Python logo', category: 'Languages' },
  { name: 'HTML', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', alt: 'HTML logo', category: 'Languages' },
  { name: 'CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', alt: 'CSS logo', category: 'Languages' },

  // Frontend
  { name: 'Next.js', src: '/nextdotjs.svg', alt: 'Next.js logo', category: 'Frontend' },
  { name: 'React.js', src: '/react.svg', alt: 'React.js logo', category: 'Frontend' },
  { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind CSS logo', category: 'Frontend' },

  // Backend
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', alt: 'Node.js logo', category: 'Backend' },
  { name: 'Express.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', alt: 'Express.js logo', category: 'Backend' },
  { name: 'Django', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', alt: 'Django logo', category: 'Backend' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', alt: 'MongoDB logo', category: 'Backend' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL logo', category: 'Backend' },
  { name: 'Firebase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', alt: 'Firebase logo', category: 'Backend' },

  // Design
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', alt: 'Figma logo', category: 'Design' },

  // Cloud & DevOps
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', alt: 'AWS logo', category: 'Cloud & DevOps' },
  { name: 'Google Cloud', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg', alt: 'Google Cloud logo', category: 'Cloud & DevOps' },
  { name: 'Vercel', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', alt: 'Vercel logo', category: 'Cloud & DevOps' },
  { name: 'Linux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', alt: 'Linux logo', category: 'Cloud & DevOps' },

  // Others
  { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', alt: 'GitHub logo', category: 'Others' },
  { name: 'Jira', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg', alt: 'Jira logo', category: 'Others' },
];

const TABS: Array<'All' | Category> = [
  'All',
  'Languages',
  'Cloud & DevOps',
  'Frontend',
  'Backend',
  'Design',
  'Others',
];

export default function Skills() {
  const [active, setActive] = useState<'All' | Category>('All');

  const filtered = useMemo(
    () => (active === 'All' ? SKILLS : SKILLS.filter(s => s.category === active)),
    [active]
  );

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="scroll-mt-24 bg-white p-6 rounded-2xl shadow-lg space-y-6"
      aria-labelledby="skills-heading"
    >
      <h3 id="skills-heading" className="text-2xl font-bold text-gray-800 border-b pb-3 flex items-center gap-2">
        <Code className="w-6 h-6 text-blue-600" />
        Skills
      </h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={[
                'px-3 py-1.5 rounded-full text-sm border transition',
                isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-700',
              ].join(' ')}
              aria-pressed={isActive}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-6"
        role="list"
        aria-label={`${active} skills`}
      >
        {filtered.map(skill => (
          <motion.div
            layout
            key={`${skill.name}-${skill.category}`}
            className="flex flex-col items-center"
            title={skill.name}
            whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.25, ease: 'easeOut' } }}
            role="listitem"
          >
            <Image
              src={skill.src}
              alt={skill.alt}
              width={60}
              height={60}
              className="object-contain "
              loading="lazy"
            />
            <span className="text-sm text-gray-700 mt-2 text-center">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <p className="text-sm text-gray-500">
        Always learning — this list will keep growing!
      </p>
    </motion.section>
  );
}
