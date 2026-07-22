import React from "react";
import { cn } from "../../lib/utils";

// Deterministic, network-free "photography" — a branded gradient mesh keyed
// off a seed string, standing in for real venue/supplier imagery in the demo.
const palettes = [
  ["#19E6D1", "#1EA7FF"],
  ["#1EA7FF", "#7B5CFF"],
  ["#7B5CFF", "#19E6D1"],
  ["#0EA5A0", "#1EA7FF"],
  ["#1EA7FF", "#5C6577"],
  ["#7B5CFF", "#1D2230"],
];

function hash(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function CoverArt({ seed = "synq", icon: Icon, className, iconClassName, children }) {
  const idx = hash(seed) % palettes.length;
  const [c1, c2] = palettes[idx];
  const angle = (hash(seed + "a") % 4) * 45;

  return (
    <div
      className={cn("relative overflow-hidden bg-bg-tertiary", className)}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${c1}33, transparent 60%), linear-gradient(${angle + 180}deg, ${c2}40, transparent 65%)`,
      }}
    >
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div
        className="absolute -inset-6 opacity-30 blur-2xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${c1}55, transparent 55%), radial-gradient(circle at 75% 70%, ${c2}55, transparent 55%)` }}
      />
      {Icon && (
        <Icon
          className={cn("absolute -bottom-3 -right-3 w-20 h-20 text-white/10", iconClassName)}
          strokeWidth={1.2}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
