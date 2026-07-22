import React from "react";
import { motion } from "framer-motion";

// Nova's face: an original, abstract side-profile helmet icon (dark shell,
// glowing visor slit, brand-gradient rim light) inspired by futuristic
// HUD/visor concept art — not a copy of any reference photo. Used in the
// bigger "this is Nova" moments (launcher, chat header); smaller per-message
// spots keep the plain QMark ring, which reads better at tiny sizes.
export function NovaAvatar({ size = 40, thinking = false, className }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={{
        filter:
          "drop-shadow(0 0 4px rgba(30,167,255,0.55)) drop-shadow(0 0 10px rgba(123,92,255,0.35))",
      }}
      animate={thinking ? { rotate: [0, -2, 2, 0] } : { rotate: 0 }}
      transition={{ duration: 1.6, repeat: thinking ? Infinity : 0, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="novaRim" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#19E6D1" />
          <stop offset="45%" stopColor="#1EA7FF" />
          <stop offset="75%" stopColor="#7B5CFF" />
          <stop offset="100%" stopColor="#FF2E9A" />
        </linearGradient>
        <linearGradient id="novaVisor" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5F5F7" />
          <stop offset="55%" stopColor="#19E6D1" />
          <stop offset="100%" stopColor="#1EA7FF" />
        </linearGradient>
        <linearGradient id="novaShell" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#232838" />
          <stop offset="100%" stopColor="#12141c" />
        </linearGradient>
      </defs>

      {/* Helmet shell — rounded dome, sloped back, small chin guard */}
      <path
        d="M20 12
           C 32 4, 50 8, 55 22
           C 58 30, 57 40, 51 47
           C 47 52, 40 55, 33 55
           C 24 55, 16 50, 13 41
           C 10 32, 12 20, 20 12 Z"
        fill="url(#novaShell)"
        stroke="url(#novaRim)"
        strokeWidth="2"
      />

      {/* Visor slit */}
      <path
        d="M21 26 C 28 21, 42 21, 49 27 C 44 32, 27 32, 21 26 Z"
        fill="url(#novaVisor)"
      />

      {/* Small pink accent vent near the jaw */}
      <circle cx="25" cy="45" r="2.4" fill="#FF2E9A" opacity="0.9" />
    </motion.svg>
  );
}
