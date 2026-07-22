import React from "react";
import { motion } from "framer-motion";

// Fade + rise + a few degrees of 3D tilt as a section scrolls into view —
// used across marketing/app sections that don't already have their own
// per-item whileInView animation.
export function Reveal({ children, delay = 0, className, y = 28, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  );
}
