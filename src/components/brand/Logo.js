import React from "react";
import { QMark } from "./QMark";
import { cn } from "../../lib/utils";

const sizes = {
  sm: { text: "text-base", q: 20, tracking: "tracking-wide" },
  md: { text: "text-lg", q: 26, tracking: "tracking-wide" },
  lg: { text: "text-2xl", q: 34, tracking: "tracking-wide" },
  xl: { text: "text-4xl", q: 50, tracking: "tracking-wider" },
  "2xl": { text: "text-6xl sm:text-7xl", q: 84, tracking: "tracking-wider" },
  "3xl": { text: "text-7xl sm:text-8xl", q: 120, tracking: "tracking-wider" },
};

// The SYNQ wordmark: "SYN" in bold uppercase, immediately followed by the Q
// emblem standing in for the letter Q — this is the one lockup used
// everywhere the brand name appears as a logo (never spell "Q" as text).
export function Logo({ size = "md", className, spinning = false }) {
  const s = sizes[size] || sizes.md;
  return (
    <span className={cn("inline-flex items-center font-semibold text-ink", s.text, s.tracking, className)}>
      SYN
      <QMark size={s.q} spinning={spinning} />
    </span>
  );
}
