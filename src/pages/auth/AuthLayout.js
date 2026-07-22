import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QMark } from "../../components/brand/QMark";
import { Logo } from "../../components/brand/Logo";
import { Slogan, Highlight } from "../../components/brand/Slogan";
import { GlassCard } from "../../components/ui";

const sideQuotes = [
  { text: "I found two suppliers available under budget.", tag: "Nova" },
  { text: "Everything's in SYNQ.", tag: "Nova" },
  { text: "I've already drafted your client email.", tag: "Nova" },
];

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-bg text-ink flex bg-noise">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden border-r border-line">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent-purple/20 blur-[120px] animate-float" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-cyan/15 blur-[120px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <Link to="/" className="relative">
          <Logo size="md" />
        </Link>
        <div className="relative space-y-4 max-w-sm">
          {sideQuotes.map((q, i) => (
            <motion.div
              key={q.text}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
            >
              <GlassCard className="p-4 flex items-center gap-3" hover={false}>
                <QMark size={20} />
                <span className="text-sm text-ink">
                  <Highlight text={q.text} />
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <Slogan size="sm" align="left" weight="font-normal" className="relative" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-semibold mb-1.5 text-center lg:text-left">{title}</h1>
          {subtitle && <p className="text-sm text-ink-muted mb-8 text-center lg:text-left">{subtitle}</p>}
          {children}
        </motion.div>
      </div>
    </div>
  );
}
