import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, Kanban, Plus, Users, FolderKanban } from "lucide-react";
import { GlassCard, Badge, Button, ProgressBar, SectionHeader, Avatar } from "../../components/ui";
import { CoverArt } from "../../components/ui/CoverArt";
import { projects } from "../../data/mockData";
import { formatCurrency, formatDate, cn } from "../../lib/utils";

const healthTone = { "on-track": "green", "at-risk": "amber", delayed: "red" };
const columns = [
  { id: "Planning", label: "Planning" },
  { id: "In Progress", label: "In Progress" },
  { id: "At Risk", label: "At Risk" },
  { id: "Confirmed", label: "Confirmed" },
];

export default function Projects() {
  const [view, setView] = useState("grid");

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <SectionHeader
        eyebrow="Every event, tracked"
        title="Projects"
        subtitle={`${projects.length} active engagements across your business`}
        action={
          <div className="flex items-center gap-2">
            <div className="glass rounded-full p-1 flex items-center gap-1">
              <button
                onClick={() => setView("grid")}
                className={cn("p-1.5 rounded-full", view === "grid" ? "bg-white/10 text-ink" : "text-ink-faint")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("kanban")}
                className={cn("p-1.5 rounded-full", view === "kanban" ? "bg-white/10 text-ink" : "text-ink-faint")}
              >
                <Kanban className="w-4 h-4" />
              </button>
            </div>
            <Button icon={Plus}>New Project</Button>
          </div>
        }
      />

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p) => (
            <Link key={p.id} to={`/app/projects/${p.id}`}>
              <GlassCard className="overflow-hidden h-full flex flex-col">
                <div className="relative h-36">
                  <CoverArt seed={p.id} icon={FolderKanban} className="w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
                  <Badge tone={healthTone[p.health]} className="absolute top-3 right-3">
                    {p.status}
                  </Badge>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-ink-faint mb-1">{p.type}</div>
                  <h3 className="text-sm font-semibold text-ink mb-1 line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-ink-muted mb-4">{p.venue} · {formatDate(p.date)}</p>
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center justify-between text-xs text-ink-muted">
                      <span>Progress</span>
                      <span className="text-ink font-medium">{p.progress}%</span>
                    </div>
                    <ProgressBar value={p.progress} tone={p.health === "at-risk" ? "amber" : "blue"} />
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-ink-faint flex items-center gap-1">
                        <Users className="w-3 h-3" /> {p.suppliers.length} suppliers
                      </span>
                      <span className="text-xs font-medium text-ink">{formatCurrency(p.budget)}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto">
          {columns.map((col) => (
            <div key={col.id} className="min-w-[260px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">{col.label}</span>
                <span className="text-xs text-ink-faint">
                  {projects.filter((p) => p.status === col.id).length}
                </span>
              </div>
              <div className="space-y-3">
                {projects
                  .filter((p) => p.status === col.id)
                  .map((p) => (
                    <Link key={p.id} to={`/app/projects/${p.id}`}>
                      <GlassCard className="p-4">
                        <div className="text-sm font-medium text-ink mb-1 line-clamp-1">{p.name}</div>
                        <div className="text-xs text-ink-muted mb-3">{p.client}</div>
                        <ProgressBar value={p.progress} height="h-1" />
                        <div className="flex items-center justify-between mt-3">
                          <Avatar name={p.client} size="sm" />
                          <span className="text-[11px] text-ink-faint">{formatDate(p.date, { year: undefined })}</span>
                        </div>
                      </GlassCard>
                    </Link>
                  ))}
                {projects.filter((p) => p.status === col.id).length === 0 && (
                  <div className="text-xs text-ink-faint text-center py-6 glass rounded-xl">No projects</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
