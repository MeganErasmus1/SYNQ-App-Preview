import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { GlassCard } from "../ui";
import { QMark } from "../nova/NovaWidget";

export function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 items-end">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
          >
            <GlassCard className="px-4 py-3 flex items-center gap-3 max-w-xs" hover={false}>
              {t.nova && <QMark size={20} />}
              <div>
                <div className="text-sm text-ink font-medium">{t.title}</div>
                {t.desc && <div className="text-xs text-ink-muted">{t.desc}</div>}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
