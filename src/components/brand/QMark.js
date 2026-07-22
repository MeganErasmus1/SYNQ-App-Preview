import React from "react";
import { cn } from "../../lib/utils";

// The SYNQ emblem: a gradient ring (cyan -> blue -> purple) with a break at
// ~4-5 o'clock where a separate comet-like tail (purple -> white -> pink)
// passes through, unattached — matching the brand mark exactly.
const RING_RADIUS = 36;
const STROKE = 13;
const GAP_SPAN_DEG = 42; // angular width of the ring's opening
const GAP_CENTER_DEG = 45; // 0deg = 3 o'clock, clockwise; 45deg = bottom-right
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const GAP_LEN = (GAP_SPAN_DEG / 360) * CIRCUMFERENCE;
const SOLID_LEN = CIRCUMFERENCE - GAP_LEN;
// Rotation that places the dash pattern's built-in gap (which starts at 0deg)
// centered on GAP_CENTER_DEG instead.
const ROTATION = GAP_CENTER_DEG + GAP_SPAN_DEG / 2;

export function QMark({ size = 22, spinning = false, glow = true, className }) {
  return (
    <div
      className={cn("relative inline-block shrink-0", spinning && "animate-spin-slow", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={
          glow
            ? {
                filter:
                  "drop-shadow(0 0 3px rgba(30,167,255,0.55)) drop-shadow(0 0 7px rgba(123,92,255,0.35))",
              }
            : undefined
        }
      >
        <defs>
          <linearGradient id="qRingGrad" x1="12%" y1="0%" x2="88%" y2="100%">
            <stop offset="0%" stopColor="#19E6D1" />
            <stop offset="55%" stopColor="#1EA7FF" />
            <stop offset="100%" stopColor="#7B5CFF" />
          </linearGradient>
          <linearGradient id="qTailGrad" gradientUnits="userSpaceOnUse" x1="66" y1="66" x2="94" y2="94">
            <stop offset="0%" stopColor="#6C5CE7" />
            <stop offset="55%" stopColor="#F5F5F7" />
            <stop offset="100%" stopColor="#FF6FD1" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={RING_RADIUS}
          fill="none"
          stroke="url(#qRingGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${SOLID_LEN} ${GAP_LEN}`}
          transform={`rotate(${ROTATION} 50 50)`}
        />
        <line
          x1="66"
          y1="66"
          x2="94"
          y2="94"
          stroke="url(#qTailGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
