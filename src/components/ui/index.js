import React, { useRef, useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "../../lib/utils";

// Animates the numeric portion of a value like "R 842K", "76%", "1.4h" or "4"
// from 0 up to its target on mount, preserving any prefix/suffix text.
export function AnimatedValue({ value, duration = 1.1 }) {
  const match = String(value).match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [value, duration]);

  return <>{display}</>;
}

export function GlassCard({ className, children, hover = true, tilt = true, as: Tag = "div", style, ...props }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!tilt || !hover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;
    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "glass rounded-xl2 shadow-glass",
        hover && "transition-shadow duration-300 hover:border-accent-blue/30 hover:shadow-glow",
        className
      )}
      style={{
        transition: "transform 0.2s cubic-bezier(0.22,1,0.36,1)",
        ...(tilt && hover ? { willChange: "transform" } : null),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon: Icon,
  iconRight,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 whitespace-nowrap select-none disabled:opacity-40 disabled:pointer-events-none";
  const sizes = {
    sm: "text-xs px-3.5 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
    icon: "p-2.5",
  };
  const variants = {
    primary:
      "bg-synq-gradient text-white shadow-glow hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "glass text-ink hover:border-accent-blue/40 hover:bg-white/[0.08]",
    ghost: "text-ink-muted hover:text-ink hover:bg-white/5",
    outline: "border border-line text-ink hover:border-accent-blue/50 hover:bg-white/5",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
  };
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {Icon && <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />}
      {children}
      {iconRight}
    </button>
  );
}

export function Badge({ children, tone = "default", className, dot = false }) {
  const tones = {
    default: "bg-white/5 text-ink-muted border border-line",
    blue: "bg-accent-blue/10 text-accent-blue border border-accent-blue/20",
    cyan: "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20",
    purple: "bg-accent-purple/10 text-accent-purple border border-accent-purple/20",
    green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border border-red-500/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-glow" />}
      {children}
    </span>
  );
}

export function Avatar({ name, size = "md", src, gradient = true, className }) {
  const sizes = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-xs", lg: "w-12 h-12 text-sm", xl: "w-20 h-20 text-xl" };
  const initials = name
    ? name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(sizes[size], "rounded-full object-cover border border-line", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        sizes[size],
        "rounded-full flex items-center justify-center font-semibold text-white shrink-0",
        gradient ? "bg-synq-gradient" : "bg-bg-tertiary",
        className
      )}
    >
      {initials}
    </div>
  );
}

export function ProgressBar({ value, tone = "blue", className, height = "h-1.5" }) {
  const tones = {
    blue: "bg-gradient-to-r from-accent-cyan to-accent-blue",
    purple: "bg-gradient-to-r from-accent-blue to-accent-purple",
    green: "bg-emerald-400",
    amber: "bg-amber-400",
  };
  return (
    <div className={cn("w-full bg-white/5 rounded-full overflow-hidden", height, className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full rounded-full", tones[tone])}
      />
    </div>
  );
}

export function Input({ className, icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
      )}
      <input
        className={cn(
          "w-full bg-white/5 border border-line rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-colors",
          Icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full bg-white/5 border border-line rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-colors resize-none",
        className
      )}
      {...props}
    />
  );
}

export function StatCard({ label, value, delta, trend, icon: Icon }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-ink-muted font-medium">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Icon className="w-4 h-4 text-accent-blue" />
          </div>
        )}
      </div>
      <div className="text-2xl font-semibold text-ink mb-1">{value}</div>
      {delta && (
        <div
          className={cn(
            "text-xs font-medium",
            trend === "up" ? "text-accent-cyan" : trend === "down" ? "text-red-400" : "text-ink-faint"
          )}
        >
          {delta}
        </div>
      )}
    </GlassCard>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action, className }) {
  return (
    <div className={cn("flex items-end justify-between mb-5", className)}>
      <div>
        {eyebrow && (
          <div className="text-xs font-semibold tracking-wider uppercase text-accent-blue mb-1.5">
            {eyebrow}
          </div>
        )}
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        {subtitle && <p className="text-sm text-ink-muted mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Modal({ open, onClose, children, className }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn("relative glass-strong rounded-xl3 max-h-[85vh] overflow-auto", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Tabs({ tabs, active, onChange, className }) {
  return (
    <div className={cn("flex items-center gap-1 border-b border-line overflow-x-auto no-scrollbar", className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
            active === t.id ? "text-ink" : "text-ink-muted hover:text-ink"
          )}
        >
          {t.label}
          {active === t.id && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-synq-gradient rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-accent-blue" />
        </div>
      )}
      <h3 className="text-ink font-medium mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-ink-muted max-w-sm mb-4">{subtitle}</p>}
      {action}
    </div>
  );
}

export function IconButton({ icon: Icon, className, active, ...props }) {
  return (
    <button
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
        active ? "bg-white/10 text-ink" : "text-ink-muted hover:text-ink hover:bg-white/5",
        className
      )}
      {...props}
    >
      <Icon className="w-4.5 h-4.5" />
    </button>
  );
}
