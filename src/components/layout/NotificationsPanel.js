import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, FileText, CheckCircle2, AlertTriangle, MessageSquare, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { notifications } from "../../data/mockData";
import { cn } from "../../lib/utils";

const iconMap = {
  sparkles: Sparkles,
  file: FileText,
  check: CheckCircle2,
  alert: AlertTriangle,
  message: MessageSquare,
};

export function NotificationsPanel() {
  const { notifOpen, setNotifOpen } = useApp();

  useEffect(() => {
    if (!notifOpen) return;
    const onKey = (e) => e.key === "Escape" && setNotifOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [notifOpen, setNotifOpen]);

  return (
    <AnimatePresence>
      {notifOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotifOpen(false)}
            className="fixed inset-0 z-[95] bg-black/40"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-4 sm:right-6 z-[96] w-[360px] max-w-[calc(100vw-2rem)] glass-strong rounded-xl3 shadow-glass overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <span className="text-sm font-semibold text-ink">Notifications</span>
              <button onClick={() => setNotifOpen(false)} className="text-ink-muted hover:text-ink">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = iconMap[n.icon] || Sparkles;
                return (
                  <div
                    key={n.id}
                    className="flex gap-3 px-5 py-3.5 border-b border-line last:border-0 hover:bg-white/[0.03] transition-colors"
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        n.unread ? "bg-accent-blue/10" : "bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", n.unread ? "text-accent-blue" : "text-ink-faint")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-ink leading-snug">{n.title}</div>
                      <div className="text-xs text-ink-muted mt-0.5">{n.desc}</div>
                      <div className="text-[11px] text-ink-faint mt-1">{n.time}</div>
                    </div>
                    {n.unread && <span className="w-2 h-2 rounded-full bg-accent-cyan shrink-0 mt-1.5" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
