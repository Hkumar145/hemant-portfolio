'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, easeOut, useReducedMotion } from 'framer-motion';
import { User, Mail, MessageSquare, Send, CheckCircle2, XCircle } from 'lucide-react';

/* ---------- Starfield + Meteors Canvas (background) ---------- */
function Starfield({
  starCount = 160,
  meteorEveryMs = 2600,
}: {
  starCount?: number;
  meteorEveryMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    type Star = { x: number; y: number; r: number; t: number; s: number };
    const stars: Star[] = Array.from({ length: starCount }).map(() => ({
      x: 0,
      y: 0,
      r: 0.2 + Math.random() * 1.2,
      t: Math.random() * Math.PI * 2,  // twinkle phase
      s: 0.4 + Math.random() * 0.6,    // twinkle speed
    }));

    type Meteor = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };
    let meteors: Meteor[] = [];

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const scatter = () => {
      for (const s of stars) {
        s.x = Math.random() * w;
        s.y = Math.random() * h;
      }
    };

    const spawnMeteor = () => {
      const startX = Math.random() < 0.5 ? -20 : Math.random() * (w + 40) - 20;
      const startY = -30;
      const speed = 4 + Math.random() * 3;
      const angle = Math.PI / 3 + Math.random() * 0.25; // ~60–75°
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 1000 + Math.random() * 800,
      });
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const dt = now - last;
      last = now;
      acc += dt;

      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        if (!reduceMotion) s.t += s.s * 0.015;
        const a = reduceMotion ? 0.65 : 0.55 + 0.45 * Math.sin(s.t);
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Meteors
      if (!reduceMotion && acc > meteorEveryMs) {
        acc = 0;
        spawnMeteor();
      }
      meteors = meteors.filter(
        (m) => m.life < m.maxLife && m.x < w + 200 && m.y < h + 200
      );
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life += dt;

        const trailX = m.x - m.vx * 10;
        const trailY = m.y - m.vy * 10;
        const g = ctx.createLinearGradient(m.x, m.y, trailX, trailY);
        g.addColorStop(0, 'rgba(255,255,255,0.95)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(trailX, trailY);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      scatter();
    });

    resize();
    scatter();
    ro.observe(canvas);
    last = performance.now();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [starCount, meteorEveryMs, useReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none
                 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
      aria-hidden
    />
  );
}

/* ---------- Motion variants ---------- */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: easeOut } },
};

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xzzgalwy', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        setMessage("Thanks! I've received your message and will get back to you soon.");
        form.reset();
      } else {
        interface FormspreeErrorResponse {
          error?: string;
        }
        const data: FormspreeErrorResponse = await res.json().catch(() => ({}));
        setStatus('error');
        setMessage(
          data?.error || 'Something went wrong sending your message. Please try again.'
        );
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 scroll-mt-24
                 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white"
    >
      {/* Decorative glows behind everything */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-300/10 blur-3xl -z-10" />

      {/* Stars + meteors layer */}
      <Starfield starCount={160} meteorEveryMs={2600} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center text-white"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
          Let’s Connect!
        </motion.h2>

        <motion.div
          className="mt-8 w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg ring-1 ring-slate-200"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Toast / Status */}
          <div aria-live="polite" className="mb-4 min-h-[1.5rem]">
            {status === 'success' && (
              <motion.div
                className="flex items-center gap-2 rounded-lg bg-green-50 text-green-800 px-3 py-2 ring-1 ring-green-200"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm">{message}</p>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                className="flex items-center gap-2 rounded-lg bg-red-50 text-red-800 px-3 py-2 ring-1 ring-red-200"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <XCircle className="h-5 w-5" />
                <p className="text-sm">{message}</p>
              </motion.div>
            )}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Name */}
            <motion.div variants={item}>
              <label htmlFor="name" className="block text-slate-900 font-medium mb-1.5">
                Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full text-[16px] pl-10 pr-3 py-3 rounded-lg border-2 border-slate-300 ring-1 ring-inset ring-slate-300 bg-white
                             placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                             transition-all duration-200"
                  placeholder="Your Name"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={item}>
              <label htmlFor="email" className="block text-slate-900 font-medium mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  inputMode="email"
                  className="w-full text-[16px] pl-10 pr-3 py-3 rounded-lg border-2 border-slate-300 ring-1 ring-inset ring-slate-300 bg-white
                             placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                             transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={item}>
              <label htmlFor="message" className="block text-slate-900 font-medium mb-1.5">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full text-[16px] pl-10 pr-3 py-3 rounded-lg border-2 border-slate-300 ring-1 ring-inset ring-slate-300 bg-white
                             placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600
                             min-h-[140px] resize-y transition-all duration-200"
                  placeholder="Your Message"
                />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={item}>
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="group w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold
                           py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600
                           active:scale-[0.995] transition"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                {status === 'loading' ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                      <path
                        d="M22 12a10 10 0 0 1-10 10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Subtle bottom hint */}
          <motion.p
            className="mt-4 text-center text-sm text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            I usually reply within 24–48 hours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
