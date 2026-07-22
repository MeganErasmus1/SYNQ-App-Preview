import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Building2, Store, FolderKanban, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { venues, suppliers, projects } from "../../data/mockData";

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useApp();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPaletteOpen]);

  const results = useMemo(() => {
    const q = query.toLowerCase();
    const items = [
      ...projects.map((p) => ({ type: "Project", icon: FolderKanban, label: p.name, path: `/app/projects/${p.id}` })),
      ...venues.map((v) => ({ type: "Venue", icon: Building2, label: v.name, path: `/app/venues/${v.id}` })),
      ...suppliers.map((s) => ({ type: "Supplier", icon: Store, label: s.name, path: `/app/suppliers/${s.id}` })),
    ];
    if (!q) return items.slice(0, 6);
    return items.filter((i) => i.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  if (!paletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPaletteOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl glass-strong rounded-xl3 shadow-glass overflow-hidden"
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
            <Search className="w-4 h-4 text-ink-faint" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search venues, suppliers, projects, anything..."
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <kbd className="text-[10px] text-ink-faint border border-line rounded px-1.5 py-0.5">ESC</kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(r.path);
                  setPaletteOpen(false);
                  setQuery("");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.06] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <r.icon className="w-4 h-4 text-accent-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink truncate">{r.label}</div>
                  <div className="text-[11px] text-ink-faint">{r.type}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
            {results.length === 0 && (
              <div className="text-center py-8 text-sm text-ink-muted">No results for "{query}"</div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
