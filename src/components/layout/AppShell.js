import React from "react";
import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { NotificationsPanel } from "./NotificationsPanel";
import { NovaLauncher, NovaWidget } from "../nova/NovaWidget";

export function AppShell() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen bg-bg text-ink flex bg-noise relative">
      <div className="pointer-events-none fixed inset-0 bg-synq-gradient-radial" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-accent-purple/[0.06] blur-[140px] animate-float" />
        <div
          className="absolute bottom-0 -left-40 w-[28rem] h-[28rem] rounded-full bg-accent-cyan/[0.05] blur-[140px] animate-float"
          style={{ animationDelay: "-3s" }}
        />
      </div>
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col relative">
        <Topbar />
        <main className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <MobileNav />
      <CommandPalette />
      <NotificationsPanel />
      <NovaLauncher />
      <NovaWidget />
    </div>
  );
}
