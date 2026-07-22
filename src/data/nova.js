// Simulated Nova AI logic — canned but contextual responses, no real backend.

export const novaLoadingPhrases = [
  "Connecting the dots...",
  "Looking through your suppliers...",
  "Checking everyone's availability...",
  "Building something impressive...",
  "Making it presentation-ready...",
  "Almost there...",
];

export const novaGreetings = [
  "Morning Johan 👋 You've got three events that need attention today.",
  "Welcome back. Everything's in SYNQ.",
  "Good to see you. I found two suppliers available under budget for Aria Motors.",
];

const responseBank = [
  {
    match: ["venue", "space", "book"],
    reply:
      "I've found 3 venues that match your brief — 500 guests, Sandton, banqueting layout. The Forum is the strongest fit on availability and price.",
    action: "View venues",
  },
  {
    match: ["budget", "cost", "cheaper", "quote"],
    reply:
      "Looking at your open quotes, Stage Worx and Vision Lighting are both under budget. Want me to prepare a combined proposal?",
    action: "Build proposal",
  },
  {
    match: ["supplier", "av", "lighting", "sound"],
    reply:
      "I've checked availability across your network — iTeligent AV and Sound Wave are both free on that date, and both have 4.8+ ratings.",
    action: "Compare suppliers",
  },
  {
    match: ["risk", "conflict", "problem"],
    reply:
      "I spotted a scheduling conflict — Stage Worx is double-booked on Aug 24. Want me to suggest an alternative or ask them to sub-contract?",
    action: "Resolve conflict",
  },
  {
    match: ["email", "draft", "write"],
    reply:
      "I've already drafted your client email — warm tone, includes the updated timeline and next steps. Want to review it?",
    action: "Open draft",
  },
  {
    match: ["hello", "hi", "hey"],
    reply: "Hey there 👋 What can I take off your plate today?",
  },
];

export function getNovaReply(input) {
  const lower = input.toLowerCase();
  const found = responseBank.find((r) => r.match.some((m) => lower.includes(m)));
  if (found) return found;
  return {
    reply:
      "I've handled it — everything's in SYNQ. Ask me about venues, suppliers, budgets or your schedule and I'll dig in.",
  };
}
