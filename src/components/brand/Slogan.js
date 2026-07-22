import React from "react";
import { cn } from "../../lib/utils";

const sizes = {
  sm: { line1: "text-sm", line2: "text-sm" },
  md: { line1: "text-base", line2: "text-lg" },
  lg: { line1: "text-lg", line2: "text-2xl" },
  xl: { line1: "text-2xl", line2: "text-3xl" },
  hero: { line1: "text-5xl sm:text-7xl", line2: "text-5xl sm:text-7xl" },
};

// The canonical SYNQ tagline lockup, used everywhere the slogan appears:
// "Every Venue. Every Supplier. Every Event." always in white, directly
// above "in SYNQ" — with SYNQ (and only SYNQ) rendered in the brand gradient.
export function Slogan({ size = "md", align = "center", weight = "font-semibold", className }) {
  const s = sizes[size] || sizes.md;
  return (
    <div
      className={cn(
        "flex flex-col leading-[1.15]",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className={cn(s.line1, weight, "text-ink")}>Every Venue. Every Supplier. Every Event.</span>
      <span className={cn(s.line2, weight)}>
        <span className="text-ink-muted font-normal">in </span>
        <span className="text-gradient">SYNQ</span>
      </span>
    </div>
  );
}

// For arbitrary copy strings that mention SYNQ inline (Nova dialogue, roadmap
// blurbs, etc.) — colors just the SYNQ substring, leaves the rest untouched.
export function Highlight({ text }) {
  if (!text || typeof text !== "string" || !text.includes("SYNQ")) return <>{text}</>;
  const parts = text.split("SYNQ");
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-gradient font-semibold">SYNQ</span>}
        </React.Fragment>
      ))}
    </>
  );
}
