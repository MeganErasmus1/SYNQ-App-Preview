import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Send, X, Minus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { novaLoadingPhrases, getNovaReply } from "../../data/nova";
import { Avatar } from "../ui";
import { cn } from "../../lib/utils";
import { QMark } from "../brand/QMark";
import { Highlight } from "../brand/Slogan";
import { NovaAvatar } from "./NovaAvatar";

const initialMessages = [
  {
    id: "m1",
    from: "nova",
    text: "Morning Johan 👋 You've got three events that need attention today. Ask me anything — venues, suppliers, budgets, schedules.",
  },
];

export function NovaLauncher() {
  const { novaOpen, setNovaOpen } = useApp();
  if (novaOpen) return null;
  return (
    <motion.button
      onClick={() => setNovaOpen(true)}
      className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 rounded-full glass-strong flex items-center justify-center shadow-glow group"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 rounded-full bg-synq-gradient opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
      <NovaAvatar size={32} />
    </motion.button>
  );
}

export function NovaWidget() {
  const { novaOpen, setNovaOpen } = useApp();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(novaLoadingPhrases[0]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const send = (text) => {
    const value = text ?? input;
    if (!value.trim()) return;
    setMessages((m) => [...m, { id: Math.random().toString(36), from: "user", text: value }]);
    setInput("");
    setThinking(true);
    setLoadingPhrase(novaLoadingPhrases[Math.floor(Math.random() * novaLoadingPhrases.length)]);
    const { reply, action } = getNovaReply(value);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { id: Math.random().toString(36), from: "nova", text: reply, action }]);
    }, 1200 + Math.random() * 700);
  };

  const suggestions = [
    "Find me a venue under budget",
    "Any scheduling conflicts?",
    "Draft a client update email",
    "Compare AV suppliers",
  ];

  return (
    <AnimatePresence>
      {novaOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-6rem)] glass-strong rounded-xl3 shadow-glass flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-gradient-to-r from-white/[0.03] to-transparent">
            <div className="flex items-center gap-3">
              <NovaAvatar size={36} />
              <div>
                <div className="text-sm font-semibold text-ink">Nova</div>
                <div className="text-[11px] text-accent-cyan flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-glow" /> Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setNovaOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-white/5"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setNovaOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-2.5", m.from === "user" && "flex-row-reverse")}
              >
                {m.from === "nova" ? (
                  <div className="shrink-0 mt-0.5">
                    <QMark size={22} />
                  </div>
                ) : (
                  <Avatar name="Johan van der Merwe" size="sm" />
                )}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm max-w-[78%] leading-relaxed",
                    m.from === "nova" ? "glass text-ink" : "bg-synq-gradient text-white"
                  )}
                >
                  {m.from === "nova" ? <Highlight text={m.text} /> : m.text}
                  {m.action && (
                    <button className="block mt-2 text-xs font-semibold text-accent-cyan hover:text-accent-blue transition-colors">
                      {m.action} →
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                <div className="shrink-0 mt-0.5">
                  <NovaAvatar size={26} thinking />
                </div>
                <div className="glass rounded-2xl px-4 py-2.5 text-sm text-ink-muted italic">
                  {loadingPhrase}
                </div>
              </motion.div>
            )}
          </div>

          {messages.length < 3 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full glass text-ink-muted hover:text-ink hover:border-accent-blue/40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-line">
            <div className="flex items-center gap-2 glass rounded-full px-2 py-1.5">
              <Sparkles className="w-4 h-4 text-accent-blue ml-2 shrink-0" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask Nova anything..."
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <button
                onClick={() => send()}
                className="w-8 h-8 rounded-full bg-synq-gradient flex items-center justify-center shrink-0 hover:brightness-110 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { QMark };
