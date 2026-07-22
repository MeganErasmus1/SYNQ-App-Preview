import React from "react";
import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { GlassCard, SectionHeader, Badge } from "../../components/ui";
import { revenueSeries, suppliers, venues } from "../../data/mockData";
import { formatCurrency } from "../../lib/utils";

const supplierPerf = suppliers.slice(0, 6).map((s) => ({ name: s.name.split(" ")[0], rating: s.rating * 20 }));
const venueUtil = venues.map((v) => ({ name: v.name.split(",")[0], utilisation: Math.round(50 + Math.random() * 45) }));

const tooltipStyle = { background: "#161A22", border: "1px solid rgba(245,245,247,0.1)", borderRadius: 12, fontSize: 12 };

export default function Reports() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <SectionHeader eyebrow="Numbers that matter" title="Reports" subtitle="Revenue, supplier performance and venue utilisation at a glance" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Total Revenue (YTD)", formatCurrency(4620000), "+18%", "text-accent-cyan"],
          ["Avg Project Margin", "31%", "+3pts", "text-accent-cyan"],
          ["Client Retention", "92%", "+4pts", "text-accent-pink"],
          ["Avg Time to Quote", "6.2h", "-1.4h", "text-accent-cyan"],
        ].map(([label, value, delta, color]) => (
          <GlassCard key={label} className="p-5">
            <div className="text-xs text-ink-muted mb-2">{label}</div>
            <div className="text-xl font-semibold text-ink">{value}</div>
            <div className={`text-xs mt-1 font-medium ${color}`}>{delta}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <SectionHeader title="Revenue Trend" className="mb-4" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,245,247,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#5C6577", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5C6577", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(v)} />
              <Line type="monotone" dataKey="revenue" stroke="#19E6D1" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionHeader title="Supplier Performance" subtitle="Rating index" className="mb-4" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={supplierPerf}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,245,247,0.06)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#5C6577", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5C6577", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="rating" fill="#1EA7FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeader title="Venue Utilisation" subtitle="% booked, last 90 days" className="mb-4" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={venueUtil} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,245,247,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#5C6577", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#9AA3B2", fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              <Bar dataKey="utilisation" fill="#7B5CFF" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard className="p-6 flex items-center gap-4">
        <Badge tone="purple" dot>Nova Insight</Badge>
        <p className="text-sm text-ink-muted">
          Corporate conferences are your highest-margin project type this quarter — 8pts above weddings.
        </p>
      </GlassCard>
    </div>
  );
}
