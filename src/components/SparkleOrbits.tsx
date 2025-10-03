'use client';
import { motion } from 'framer-motion';

export default function SparkleOrbits({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const size = 380, cx = size / 2, cy = size / 2;

  const points = [
    { r: 174, deg:   0,  delay: 0.0,  d: 2.0 },
    { r: 172, deg:  25,  delay: 0.2,  d: 1.8 },
    { r: 176, deg:  55,  delay: 0.4,  d: 2.2 },
    { r: 170, deg:  90,  delay: 0.1,  d: 1.9 },
    { r: 175, deg: 125,  delay: 0.6,  d: 2.0 },
    { r: 173, deg: 160,  delay: 0.3,  d: 1.7 },
    { r: 176, deg: 195,  delay: 0.7,  d: 2.1 },
    { r: 171, deg: 230,  delay: 0.15, d: 1.8 },
    { r: 175, deg: 275,  delay: 0.5,  d: 2.0 },
    { r: 172, deg: 315,  delay: 0.85, d: 1.7 },
    { r: 142, deg:  12,  delay: 0.25, d: 1.6 },
    { r: 138, deg:  48,  delay: 0.45, d: 1.5 },
    { r: 145, deg:  84,  delay: 0.05, d: 1.7 },
    { r: 137, deg: 118,  delay: 0.35, d: 1.5 },
    { r: 143, deg: 154,  delay: 0.55, d: 1.6 },
    { r: 140, deg: 198,  delay: 0.75, d: 1.5 },
    { r: 144, deg: 246,  delay: 0.2,  d: 1.6 },
    { r: 139, deg: 302,  delay: 0.65, d: 1.5 },
  ];

  // helper to ensure identical output in Node & browser
  const round = (n: number) => Number(n.toFixed(3)); // 3 decimals is plenty

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden
      suppressHydrationWarning
    >
      <motion.g
        initial={false}
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={reduceMotion ? {} : { duration: 80, ease: 'linear', repeat: Infinity }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {points.map((p, i) => {
          const rad = (p.deg * Math.PI) / 180;
          const x = round(cx + p.r * Math.cos(rad));
          const y = round(cy + p.r * Math.sin(rad));

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={p.d / 2}
              fill="white"
              initial={{ opacity: 0.4, scale: 1 }}
              animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.35, 1, 0.35], scale: [1, 1.35, 1] }}
              transition={reduceMotion ? {} : { duration: 2 + (i % 5) * 0.25, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'blur(0.3px)' }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
