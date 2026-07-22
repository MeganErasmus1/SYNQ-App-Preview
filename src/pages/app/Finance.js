import React from "react";
import { Wallet, TrendingUp, FileText, Link2 } from "lucide-react";
import { GlassCard, SectionHeader, Badge, Button } from "../../components/ui";
import { integrations, projects } from "../../data/mockData";
import { formatCurrency } from "../../lib/utils";
import { useApp } from "../../context/AppContext";
import { Highlight } from "../../components/brand/Slogan";

const grouped = integrations.reduce((acc, i) => {
  acc[i.category] = acc[i.category] || [];
  acc[i.category].push(i);
  return acc;
}, {});

export default function Finance() {
  const { pushToast } = useApp();
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <SectionHeader
        eyebrow="Money, handled"
        title="Finance"
        subtitle={<Highlight text="Connect your accounting stack — SYNQ keeps every quote and invoice in sync" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-blue/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-accent-blue" /></div>
          <div>
            <div className="text-xs text-ink-muted">Total Budget (Active)</div>
            <div className="text-lg font-semibold text-ink">{formatCurrency(totalBudget)}</div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-accent-cyan" /></div>
          <div>
            <div className="text-xs text-ink-muted">Total Spent</div>
            <div className="text-lg font-semibold text-ink">{formatCurrency(totalSpent)}</div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-purple/10 flex items-center justify-center"><FileText className="w-5 h-5 text-accent-purple" /></div>
          <div>
            <div className="text-xs text-ink-muted">Open Invoices</div>
            <div className="text-lg font-semibold text-ink">6</div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-start gap-3 mb-6">
          <Badge tone="pink" dot>Coming Soon</Badge>
        </div>
        <h3 className="text-sm font-semibold text-ink mb-1">
          <Highlight text="SYNQ doesn't replace your accounting software — it connects to it." />
        </h3>
        <p className="text-xs text-ink-muted mb-6">
          <Highlight text="These integrations are part of our roadmap. Connect your existing tools and SYNQ keeps everything in sync automatically." />
        </p>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-6 last:mb-0">
            <div className="text-xs font-semibold text-ink-faint uppercase tracking-wide mb-3">{category}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map((i) => (
                <div key={i.id} className="glass rounded-xl p-4 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: i.color }}
                  >
                    {i.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-ink truncate">{i.name}</div>
                  </div>
                  <button
                    onClick={() => pushToast({ title: `${i.name} — coming soon`, desc: "This integration is on our roadmap." })}
                    className="text-ink-faint hover:text-accent-blue transition-colors shrink-0"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
