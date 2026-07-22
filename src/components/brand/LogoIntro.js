import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { QMark } from "./QMark";

const particleSeeds = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (Math.sin(i * 12.9) * 0.5 + 0.5) * 100,
  y: (Math.cos(i * 7.3) * 0.5 + 0.5) * 100,
  delay: (i % 6) * 0.3,
  duration: 3 + (i % 5) * 0.6,
  size: 2 + (i % 3),
}));

export function LogoIntro({ onDone }) {
  const particles = useMemo(() => particleSeeds, []);

  useEffect(() => {
    const timer = setTimeout(onDone, 3600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-bg flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-synq-gradient-radial" />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent-cyan/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0], y: [0, -18, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative flex flex-col items-center" style={{ perspective: 1400 }}>
        <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
          {/* depth echoes: offset, blurred, counter-rotating copies for a layered volumetric feel */}
          <motion.div
            className="absolute opacity-25 blur-md"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.22, scale: 1.35, rotateY: [0, -18, 0], rotateZ: [0, 6, 0] }}
            transition={{ opacity: { duration: 1, delay: 0.15 }, scale: { duration: 1, delay: 0.15 }, rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          >
            <QMark size={220} glow={false} />
          </motion.div>
          <motion.div
            className="absolute opacity-30 blur-sm"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.35, scale: 1.16, rotateY: [0, 14, 0] }}
            transition={{ opacity: { duration: 1, delay: 0.3 }, scale: { duration: 1, delay: 0.3 }, rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <QMark size={220} glow={false} />
          </motion.div>

          {/* the mark itself: tumbles in from depth, then settles into a slow perpetual turn */}
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.4, rotateY: -130, rotateX: 22 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ rotateY: [0, 16, -16, 0], rotateX: [0, -4, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.15 }}
            >
              <QMark size={160} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 flex items-center gap-2 text-4xl sm:text-5xl font-semibold tracking-wider text-ink"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          SYN
          <QMark size={44} />
        </motion.div>

        <motion.p
          className="mt-4 text-sm text-ink-muted tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          Every Venue. Every Supplier. Every Event.
        </motion.p>

        <motion.p
          className="mt-8 text-xs text-accent-cyan"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          Nova is getting everything ready...
        </motion.p>
      </div>
    </motion.div>
  );
}
