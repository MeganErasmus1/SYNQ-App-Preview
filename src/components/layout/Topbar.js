import React from "react";
import { Search, Bell, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { navItems } from "./nav";
import { IconButton, Avatar } from "../ui";
import { notifications } from "../../data/mockData";
import { QMark } from "../nova/NovaWidget";
import { Highlight } from "../brand/Slogan";

export function Topbar() {
  const { setPaletteOpen, notifOpen, setNotifOpen, setNovaOpen } = useApp();
  const location = useLocation();
  const current = navItems.find((n) => (n.path === "/app" ? location.pathname === "/app" : location.pathname.startsWith(n.path)));
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 h-16 px-4 sm:px-6 border-b border-line bg-bg/70 backdrop-blur-xl">
      <div className="lg:hidden flex items-center gap-2">
        <QMark size={22} />
      </div>
      <div className="hidden lg:block">
        <h1 className="text-sm font-semibold text-ink">
          {current?.label || <Highlight text="SYNQ" />}
        </h1>
      </div>

      <button
        onClick={() => setPaletteOpen(true)}
        className="flex-1 max-w-md ml-2 flex items-center gap-2.5 px-4 py-2 rounded-full glass text-ink-faint hover:border-accent-blue/30 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">
          Search everything in <Highlight text="SYNQ" />...
        </span>
        <span className="text-sm sm:hidden">Search...</span>
        <kbd className="ml-auto hidden sm:inline text-[10px] border border-line rounded px-1.5 py-0.5">⌘K</kbd>
      </button>

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={() => setNovaOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full glass hover:border-accent-purple/40 transition-colors text-xs font-medium text-ink-muted hover:text-ink"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
          Ask Nova
        </button>
        <div className="relative">
          <IconButton icon={Bell} active={notifOpen} onClick={() => setNotifOpen(!notifOpen)} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-pink ring-2 ring-bg shadow-glow-pink" />
          )}
        </div>
        <Avatar name="Johan van der Merwe" size="sm" className="ml-1" />
      </div>
    </header>
  );
}
