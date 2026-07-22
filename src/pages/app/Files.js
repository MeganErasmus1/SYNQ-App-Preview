import React, { useState } from "react";
import { Folder, FileText, Image as ImageIcon, Upload, Search, Grid, List as ListIcon, MoreHorizontal } from "lucide-react";
import { GlassCard, Input, SectionHeader, Button } from "../../components/ui";
import { files } from "../../data/mockData";
import { cn } from "../../lib/utils";

const iconFor = (type) => (type === "folder" ? Folder : type === "slides" ? ImageIcon : FileText);

export default function Files() {
  const [view, setView] = useState("grid");

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <SectionHeader
        eyebrow="Everything, organised"
        title="Files"
        subtitle="Contracts, riders, decks and site plans — versioned and shared"
        action={<Button icon={Upload} size="sm">Upload</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <Input icon={Search} placeholder="Search files..." className="sm:max-w-sm" />
        <div className="glass rounded-full p-1 flex items-center gap-1 self-start">
          <button onClick={() => setView("grid")} className={cn("p-1.5 rounded-full", view === "grid" ? "bg-white/10 text-ink" : "text-ink-faint")}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setView("list")} className={cn("p-1.5 rounded-full", view === "list" ? "bg-white/10 text-ink" : "text-ink-faint")}>
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((f) => {
            const Icon = iconFor(f.type);
            return (
              <GlassCard key={f.id} className="p-5 flex flex-col items-center text-center gap-3">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", f.type === "folder" ? "bg-accent-blue/10" : "bg-white/5")}>
                  <Icon className={cn("w-6 h-6", f.type === "folder" ? "text-accent-blue" : "text-ink-muted")} />
                </div>
                <div className="text-xs font-medium text-ink line-clamp-2">{f.name}</div>
                <div className="text-[10px] text-ink-faint">{f.type === "folder" ? `${f.items} items` : f.size}</div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard className="p-2">
          {files.map((f) => {
            const Icon = iconFor(f.type);
            return (
              <div key={f.id} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink truncate">{f.name}</div>
                </div>
                <span className="text-xs text-ink-faint hidden sm:block w-24">{f.type === "folder" ? `${f.items} items` : f.size}</span>
                <span className="text-xs text-ink-faint hidden sm:block w-24">{f.updated}</span>
                <button className="text-ink-faint hover:text-ink"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            );
          })}
        </GlassCard>
      )}
    </div>
  );
}
