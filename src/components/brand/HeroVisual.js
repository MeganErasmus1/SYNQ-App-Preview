import React, { useMemo } from "react";
import { motion } from "framer-motion";

const RING_RADIUS = 36;
const STROKE = 13;
const GAP_SPAN_DEG = 42;
const GAP_CENTER_DEG = 45;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const GAP_LEN = (GAP_SPAN_DEG / 360) * CIRCUMFERENCE;
const SOLID_LEN = CIRCUMFERENCE - GAP_LEN;
const ROTATION = GAP_CENTER_DEG + GAP_SPAN_DEG / 2;

const RAY_COLORS = ["#19E6D1", "#1EA7FF", "#7B5CFF", "#FF2E9A"];

const orbitSeeds = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const radius = 140 + (i % 3) * 45;
  return {
    id: i,
    angle,
    radius,
    size: 3 + (i % 3),
    color: RAY_COLORS[i % RAY_COLORS.length],
    duration: 14 + (i % 5) * 4,
    delay: (i % 6) * 0.4,
  };
});

const raySeeds = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  rotate: (i / 10) * 360,
  color: RAY_COLORS[i % RAY_COLORS.length],
  delay: i * 0.25,
}));

// An original, animated "glowing Q" scene — light rays, orbiting particles,
// a slow breathing pulse and rim glow — built as the landing hero's dramatic
// centerpiece. Stands in for the neon rim-lit portrait mood of premium
// reference sites without using any stock photography.
export function HeroVisual({ size = 440 }) {
  const orbits = useMemo(() => orbitSeeds, []);
  const rays = useMemo(() => raySeeds, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Soft outer glow ring, like a halo behind the whole scene */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          background:
            "radial-gradient(circle, rgba(123,92,255,0.18), rgba(30,167,255,0.1) 45%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating light rays */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {rays.map((r) => (
          <motion.div
            key={r.id}
            className="absolute top-1/2 left-1/2 origin-left"
            style={{
              width: size * 0.42,
              height: 2,
              transform: `rotate(${r.rotate}deg)`,
              background: `linear-gradient(90deg, ${r.color}55, transparent)`,
            }}
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
          />
        ))}
      </motion.div>

      {/* Orbiting particles */}
      {orbits.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full top-1/2 left-1/2"
          style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 6px ${p.color}` }}
          animate={{
            x: [
              Math.cos(p.angle) * p.radius,
              Math.cos(p.angle + Math.PI * 2) * p.radius,
            ],
            y: [
              Math.sin(p.angle) * p.radius,
              Math.sin(p.angle + Math.PI * 2) * p.radius,
            ],
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
        />
      ))}

      {/* The Q emblem itself, breathing gently */}
      <motion.svg
        viewBox="0 0 100 100"
        width={size * 0.5}
        height={size * 0.5}
        className="overflow-visible relative"
        style={{
          filter: "drop-shadow(0 0 14px rgba(30,167,255,0.55)) drop-shadow(0 0 30px rgba(123,92,255,0.4))",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="heroRingGrad" x1="12%" y1="0%" x2="88%" y2="100%">
            <stop offset="0%" stopColor="#19E6D1" />
            <stop offset="55%" stopColor="#1EA7FF" />
            <stop offset="100%" stopColor="#7B5CFF" />
          </linearGradient>
          <linearGradient id="heroTailGrad" gradientUnits="userSpaceOnUse" x1="66" y1="66" x2="94" y2="94">
            <stop offset="0%" stopColor="#6C5CE7" />
            <stop offset="55%" stopColor="#F5F5F7" />
            <stop offset="100%" stopColor="#FF2E9A" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={RING_RADIUS}
          fill="none"
          stroke="url(#heroRingGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${SOLID_LEN} ${GAP_LEN}`}
          transform={`rotate(${ROTATION} 50 50)`}
        />
        <line x1="66" y1="66" x2="94" y2="94" stroke="url(#heroTailGrad)" strokeWidth={STROKE} strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}
