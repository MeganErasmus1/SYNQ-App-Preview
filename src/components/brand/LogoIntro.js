import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { Slogan } from "./Slogan";

const RING_RADIUS = 36;
const STROKE = 13;
const GAP_SPAN_DEG = 42;
const GAP_CENTER_DEG = 45;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const GAP_LEN = (GAP_SPAN_DEG / 360) * CIRCUMFERENCE;
const SOLID_LEN = CIRCUMFERENCE - GAP_LEN;
const ROTATION = GAP_CENTER_DEG + GAP_SPAN_DEG / 2;

const particleSeeds = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: (Math.sin(i * 12.9) * 0.5 + 0.5) * 100,
  y: (Math.cos(i * 7.3) * 0.5 + 0.5) * 100,
  delay: (i % 8) * 0.35,
  duration: 3 + (i % 5) * 0.7,
  size: 2 + (i % 3),
}));

// Electric blue / purple / pink — the ring's own burst, not the ambient cyan
// particles drifting in the background.
const EXPLOSION_COLORS = ["#1EA7FF", "#7B5CFF", "#FF2E9A", "#19E6D1"];

// Molecules fly out along the ring's own circumference, each carrying a
// randomized "depth" (near = bigger, sharper, faster / far = smaller,
// blurrier, slower) so the burst reads as 3D rather than a flat radial fan.
const explosionSeeds = Array.from({ length: 84 }, (_, i) => {
  const angle = (i / 84) * Math.PI * 2 + Math.sin(i * 3.7) * 0.12;
  const depth = (i % 7) / 6;
  const startR = 90 + Math.sin(i * 5.1) * 8;
  const endR = 130 + depth * 190 + Math.cos(i * 2.3) * 26;
  return {
    id: i,
    startX: Math.cos(angle) * startR,
    startY: Math.sin(angle) * startR,
    endX: Math.cos(angle) * endR,
    endY: Math.sin(angle) * endR,
    size: 8 - depth * 5,
    blur: depth * 4.5,
    color: EXPLOSION_COLORS[i % EXPLOSION_COLORS.length],
    duration: 0.85 + depth * 0.55,
    delay: (i % 9) * 0.012,
    spin: (i % 2 === 0 ? 1 : -1) * (90 + depth * 180),
  };
});

function QExplosion() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ perspective: 700 }}>
      {explosionSeeds.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full top-1/2 left-1/2"
          style={{
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            background: p.color,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            boxShadow: `0 0 ${6 + (8 - p.size)}px ${p.color}`,
          }}
          initial={{ x: p.startX, y: p.startY, opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{ x: p.endX, y: p.endY, opacity: [0, 1, 0], scale: [0.4, 1, 0.7], rotate: p.spin }}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

function RingOnly() {
  return (
    <svg viewBox="0 0 100 100" width={260} height={260}>
      <defs>
        <linearGradient id="introRingGradEcho" x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#19E6D1" />
          <stop offset="55%" stopColor="#1EA7FF" />
          <stop offset="100%" stopColor="#7B5CFF" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r={RING_RADIUS}
        fill="none"
        stroke="url(#introRingGradEcho)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        transform={`rotate(${ROTATION} 50 50)`}
        strokeDasharray={`${SOLID_LEN} ${GAP_LEN}`}
      />
    </svg>
  );
}

// The IntroMark: a larger, animation-rich sibling of the everyday QMark icon.
// The ring draws itself clockwise with a traveling glow head, the tail flies
// in from a distance trailing light, and depth-echo copies drift underneath —
// then the whole thing gets a brief bloom before the slogan resolves.
//
// The bloom flash is mounted via a delayed timer rather than a Framer Motion
// `delay`: a multi-keyframe `animate` (e.g. opacity: [0, 0.85, 0]) whose first
// value matches `initial` can render visible before its delay elapses in this
// Framer Motion version — mounting the element late sidesteps that entirely.
function IntroMark() {
  const [showBloom, setShowBloom] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const bloomTimer = setTimeout(() => setShowBloom(true), 2150);
    const explodeTimer = setTimeout(() => setShowExplosion(true), 5300);
    return () => {
      clearTimeout(bloomTimer);
      clearTimeout(explodeTimer);
    };
  }, []);

  return (
    <div className="relative" style={{ width: 260, height: 260 }}>
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showExplosion ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: [0, 0.18, 0.16], scale: [1.5, 1.7, 1.6] }}
        transition={{
          opacity: { duration: 1.2, delay: 0.6 },
          scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotateY: [0, -30, 30, 0], rotateZ: [0, 10, -6, 0] }}
          transition={{
            rotateY: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div style={{ filter: "blur(14px)" }}>
            <RingOnly />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: [0, 0.28, 0.24], scale: [1.28, 1.36, 1.3] }}
        transition={{
          opacity: { duration: 1.2, delay: 0.75 },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotateY: [0, 22, -18, 0] }}
          transition={{ rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div style={{ filter: "blur(7px)" }}>
            <RingOnly />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: [0, 0.4, 0.34], scale: [1.12, 1.16, 1.13] }}
        transition={{
          opacity: { duration: 1, delay: 0.9 },
          scale: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ rotateY: [0, -14, 14, 0] }}
          transition={{ rotateY: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div style={{ filter: "blur(3px)" }}>
            <RingOnly />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showExplosion ? 0 : 1, scale: showExplosion ? 1.5 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: [0, 10, -10, 0], rotateX: [0, -3, 3, 0] }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
          rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={260}
          height={260}
          className="overflow-visible"
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(30,167,255,0.65)) drop-shadow(0 0 16px rgba(123,92,255,0.45))",
          }}
        >
          <defs>
            <linearGradient id="introRingGrad" x1="12%" y1="0%" x2="88%" y2="100%">
              <stop offset="0%" stopColor="#19E6D1" />
              <stop offset="55%" stopColor="#1EA7FF" />
              <stop offset="100%" stopColor="#7B5CFF" />
            </linearGradient>
            <linearGradient id="introTailGrad" gradientUnits="userSpaceOnUse" x1="66" y1="66" x2="94" y2="94">
              <stop offset="0%" stopColor="#6C5CE7" />
              <stop offset="55%" stopColor="#F5F5F7" />
              <stop offset="100%" stopColor="#FF6FD1" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#introRingGrad)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            transform={`rotate(${ROTATION} 50 50)`}
            strokeDasharray={`${SOLID_LEN} ${GAP_LEN}`}
            initial={{ strokeDashoffset: SOLID_LEN }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.line
            x1="66"
            y1="66"
            x2="94"
            y2="94"
            stroke="url(#introTailGrad)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0, x2: 110, y2: 110 }}
            animate={{ opacity: 1, pathLength: 1, x2: 94, y2: 94 }}
            transition={{ duration: 0.7, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </motion.div>
      </motion.div>
      </motion.div>

      {showBloom && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, transparent 0%, transparent 42%, rgba(245,245,247,0.85) 58%, rgba(123,92,255,0.4) 74%, transparent 100%)",
            mixBlendMode: "screen",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: [0, 1, 0], scale: [0.85, 1.55, 2.1] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      )}

      {showExplosion && <QExplosion />}
    </div>
  );
}

export function LogoIntro({ onDone }) {
  const particles = useMemo(() => particleSeeds, []);

  useEffect(() => {
    const timer = setTimeout(onDone, 7500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-bg flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.15, filter: "brightness(2.2)" }}
      transition={{ duration: 0.65, ease: "easeIn" }}
    >
      <div className="absolute inset-0 bg-synq-gradient-radial" />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent-cyan/70"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: [0, -22, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative flex flex-col items-center" style={{ perspective: 1600 }}>
        <IntroMark />

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 3.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Logo size="2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.9 }}
          className="mt-6"
        >
          <Slogan size="lg" />
        </motion.div>

        <motion.p
          className="mt-8 text-xs text-accent-cyan tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 4.6 }}
        >
          Nova is getting everything ready...
        </motion.p>
      </div>
    </motion.div>
  );
}
