import React from "react";
import { QMark } from "./QMark";
import { cn } from "../../lib/utils";

const sizes = {
  sm: { text: "text-base", q: 20, tracking: "tracking-[0.08em]", gap: "gap-1" },
  md: { text: "text-lg", q: 27, tracking: "tracking-[0.08em]", gap: "gap-1" },
  lg: { text: "text-2xl", q: 36, tracking: "tracking-[0.1em]", gap: "gap-1.5" },
  xl: { text: "text-4xl", q: 54, tracking: "tracking-[0.1em]", gap: "gap-2" },
  "2xl": { text: "text-6xl sm:text-7xl", q: 90, tracking: "tracking-[0.1em]", gap: "gap-3" },
  "3xl": { text: "text-7xl sm:text-8xl", q: 128, tracking: "tracking-[0.1em]", gap: "gap-4" },
};

// The SYNQ wordmark: "SYN" set in Satoshi Bold with a touch of extra letter
// spacing, immediately followed by the Q emblem standing in for the letter
// Q — this exact lockup is the only place the brand name appears as a logo
// (never spell "Q" out as text).
export function Logo({ size = "md", className, spinning = false }) {
  const s = sizes[size] || sizes.md;
  return (
    <span
      className={cn(
        "inline-flex items-center font-bold text-ink font-display",
        s.text,
        s.tracking,
        s.gap,
        className
      )}
    >
      SYN
      <QMark size={s.q} spinning={spinning} />
    </span>
  );
}
