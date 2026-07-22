import React from "react";

const PALETTE = ["text-accent-cyan", "text-accent-blue", "text-accent-purple", "text-accent-pink"];

// A punchy headline treatment: specific words get picked out in cycling
// brand colors while the rest stays plain white — the "GET READY TO ENJOY
// VR GAMES WITH OUR PLATFORM" style multi-color headline, built with our own
// palette rather than copying any reference's actual words.
export function GradientWords({ text, highlight = [] }) {
  const words = text.split(" ");
  let colorIndex = 0;

  return (
    <>
      {words.map((word, i) => {
        const isHighlighted = highlight.some((h) => word.toLowerCase().includes(h.toLowerCase()));
        const color = PALETTE[colorIndex % PALETTE.length];
        if (isHighlighted) colorIndex++;
        return (
          <React.Fragment key={i}>
            {isHighlighted ? <span className={color}>{word}</span> : word}
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </>
  );
}
