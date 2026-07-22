import React, { useMemo } from "react";
import { motion } from "framer-motion";

// A faint animated "connect the dots" network — nodes twinkle while thin
// lines join nearby pairs. Purely decorative atmosphere for hero-style
// sections, in the brand's cyan/blue/purple/pink palette.
export function Constellation({ className, count = 22 }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (Math.sin(i * 12.9898) * 0.5 + 0.5) * 100,
        y: (Math.cos(i * 78.233) * 0.5 + 0.5) * 100,
        delay: (i % 8) * 0.5,
        duration: 4 + (i % 5),
      })),
    [count]
  );

  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 22) result.push({ a: nodes[i], b: nodes[j], dist });
      }
    }
    return result;
  }, [nodes]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.a.x}
          y1={l.a.y}
          x2={l.b.x}
          y2={l.b.y}
          stroke="url(#constellationGrad)"
          strokeWidth="0.15"
          opacity={0.35 - (l.dist / 22) * 0.25}
        />
      ))}
      <defs>
        <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#19E6D1" />
          <stop offset="50%" stopColor="#1EA7FF" />
          <stop offset="100%" stopColor="#7B5CFF" />
        </linearGradient>
      </defs>
      {nodes.map((n) => (
        <motion.circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={0.4}
          fill="#F5F5F7"
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: n.duration, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
        />
      ))}
    </svg>
  );
}
