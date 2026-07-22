import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Users, Calendar, Wallet, CheckCircle2, Circle, FileText, File as FileIcon,
  Image as ImageIcon, Sheet, PenSquare, Map, MoreHorizontal, FolderKanban,
} from "lucide-react";
import { GlassCard, Badge, Button, ProgressBar, Tabs, Avatar, EmptyState } from "../../components/ui";
import { CoverArt } from "../../components/ui/CoverArt";
import { projects, suppliers as allSuppliers } from "../../data/mockData";
import { formatCurrency, formatDate, cn } from "../../lib/utils";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "tasks", label: "Tasks" },
  { id: "suppliers", label: "Suppliers" },
  { id: "financials", label: "Financials" },
  { id: "files", label: "Files" },
  { id: "floorplans", label: "Site Maps" },
];

const fileIcons = { pdf: FileText, cad: Map, sheet: Sheet, slides: ImageIcon, doc: FileIcon };

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const [tab, setTab] = useState("overview");
  const projectSuppliers = allSuppliers.filter((s) => project.suppliers.includes(s.id));

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <Link to="/app/projects" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> All Projects
      </Link>

      <GlassCard className="overflow-hidden">
        <div className="relative h-48 sm:h-56">
          <CoverArt seed={project.id} icon={FolderKanban} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge tone={project.health === "on-track" ? "green" : project.health === "at-risk" ? "amber" : "red"} className="mb-2">
                {project.status}
              </Badge>
              <h1 className="text-2xl font-semibold text-ink">{project.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-ink-muted">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {project.venue}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(project.date)}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {project.guests} guests</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={PenSquare}>Edit</Button>
              <Button size="sm">Share with Client</Button>
            </div>
          </div>
        </div>
        <Tabs tabs={tabs} active={tab} onChange={setTab} className="px-6" />
      </GlassCard>

      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold text-ink mb-4">Production Timeline</h3>
            <div className="space-y-4">
              {project.tasks.map((t) => (
                <div key={t.id} className="flex items-start gap-3">
                  {t.status === "completed" ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-accent-cyan mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="w-4.5 h-4.5 text-ink-faint mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={cn("text-sm", t.status === "completed" ? "text-ink-muted line-through" : "text-ink")}>
                        {t.title}
                      </span>
                      <span className="text-xs text-ink-faint">{t.owner}</span>
                    </div>
                    <ProgressBar value={t.progress} className="mt-1.5" height="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-sm font-semibold text-ink mb-4">Budget Overview</h3>
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="w-4 h-4 text-accent-blue" />
                <span className="text-2xl font-semibold text-ink">{formatCurrency(project.spent)}</span>
              </div>
              <div className="text-xs text-ink-faint mb-3">of {formatCurrency(project.budget)} budgeted</div>
              <ProgressBar value={(project.spent / project.budget) * 100} tone="purple" />
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-sm font-semibold text-ink mb-4">Client</h3>
              <div className="flex items-center gap-3">
                <Avatar name={project.client} size="md" />
                <div>
                  <div className="text-sm text-ink font-medium">{project.client}</div>
                  <div className="text-xs text-ink-faint">{project.type}</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {tab === "tasks" && (
        <GlassCard className="p-6">
          <h3 className="text-sm font-semibold text-ink mb-4">Action List</h3>
          <div className="space-y-2">
            {project.tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                {t.status === "completed" ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-accent-cyan shrink-0" />
                ) : (
                  <Circle className="w-4.5 h-4.5 text-ink-faint shrink-0" />
                )}
                <span className="flex-1 text-sm text-ink">{t.title}</span>
                <Badge tone={t.status === "completed" ? "green" : t.status === "in-progress" ? "blue" : "default"}>
                  {t.status.replace("-", " ")}
                </Badge>
                <span className="text-xs text-ink-faint w-32 text-right hidden sm:block">{t.owner}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {tab === "suppliers" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectSuppliers.map((s) => (
            <Link key={s.id} to={`/app/suppliers/${s.id}`}>
              <GlassCard className="p-5 flex items-center gap-3">
                <Avatar name={s.name} size="lg" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{s.name}</div>
                  <div className="text-xs text-ink-faint">{s.category}</div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 mt-1">★ {s.rating}</div>
                </div>
              </GlassCard>
            </Link>
          ))}
          {projectSuppliers.length === 0 && (
            <EmptyState icon={Users} title="No suppliers linked yet" subtitle="Invite suppliers from the marketplace." />
          )}
        </div>
      )}

      {tab === "financials" && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-ink">Invoices</h3>
            <Button size="sm" variant="secondary">New Invoice</Button>
          </div>
          <div className="divide-y divide-line">
            {project.invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-3.5">
                <div>
                  <div className="text-sm text-ink font-medium">{inv.id}</div>
                  <div className="text-xs text-ink-faint">{inv.supplier}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-ink font-medium">{formatCurrency(inv.amount)}</span>
                  <Badge tone={inv.status === "paid" ? "green" : inv.status === "pending" ? "amber" : "default"}>
                    {inv.status}
                  </Badge>
                </div>
              </div>
            ))}
            {project.invoices.length === 0 && (
              <EmptyState icon={Wallet} title="No invoices yet" subtitle="Invoices will appear here as suppliers bill against this project." />
            )}
          </div>
        </GlassCard>
      )}

      {tab === "files" && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-ink">Documents</h3>
            <Button size="sm" variant="secondary">Upload</Button>
          </div>
          <div className="divide-y divide-line">
            {project.files.map((f, i) => {
              const Icon = fileIcons[f.type] || FileIcon;
              return (
                <div key={i} className="flex items-center gap-3 py-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${["text-accent-blue", "text-accent-purple", "text-accent-pink", "text-accent-cyan"][i % 4]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-ink truncate">{f.name}</div>
                    <div className="text-xs text-ink-faint">{f.size} · Updated {formatDate(f.updated)}</div>
                  </div>
                  <button className="text-ink-faint hover:text-ink"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {tab === "floorplans" && (
        <GlassCard className="p-6">
          <EmptyState
            icon={Map}
            title="Site maps & floor plans"
            subtitle="Drag and drop CAD files, or ask Nova to generate a compliant floorplan from your room dimensions."
            action={<Button size="sm">Ask Nova to generate one</Button>}
          />
        </GlassCard>
      )}
    </div>
  );
}
