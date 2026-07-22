import React, { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["#19E6D1", "#1EA7FF", "#7B5CFF", "#FF2E9A", "#F5F5F7"];

function burstParticles(count = 18) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
    const distance = 60 + Math.random() * 70;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      color: COLORS[i % COLORS.length],
      size: 4 + Math.random() * 4,
    };
  });
}

// A one-shot particle burst. Increment `burstKey` (e.g. on a confirmation
// click) to replay it — the key change remounts the particle set fresh.
export function Celebration({ burstKey }) {
  const particles = useMemo(() => burstParticles(), [burstKey]);
  if (!burstKey) return null;

  return (
    <div
      key={burstKey}
      className="pointer-events-none absolute inset-0 flex items-center justify-center z-50"
      style={{ overflow: "visible" }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}
