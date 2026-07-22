import React from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, PieChart, Pie, Cell,
} from "recharts";
import {
  Sparkles, Cloud, Truck, MessageSquare, Plus, FileText, Users, CalendarPlus, ArrowUpRight, Clock, FolderKanban,
} from "lucide-react";
import { GlassCard, Badge, Avatar, ProgressBar, Button, SectionHeader, AnimatedValue } from "../../components/ui";
import { CoverArt } from "../../components/ui/CoverArt";
import { QMark } from "../../components/nova/NovaWidget";
import { useApp } from "../../context/AppContext";
import {
  kpis, revenueSeries, projectHealthSeries, projects, messagesChannels, calendarEvents, weather, currentUser,
} from "../../data/mockData";
import { formatCurrency, formatDate } from "../../lib/utils";

const quickActions = [
  { label: "New Project", icon: Plus },
  { label: "Invite Supplier", icon: Users },
  { label: "Draft Proposal", icon: FileText },
  { label: "Schedule Visit", icon: CalendarPlus },
];

export default function Dashboard() {
  const { role, setNovaOpen } = useApp();
  const roleKpis = kpis[role.id] || kpis.organiser;
  const upcoming = calendarEvents.slice(0, 4);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Good morning, {currentUser.firstName} <span className="inline-block animate-[wave_1s]">👋</span>
          </h1>
          <p className="text-ink-muted text-sm mt-1">Here's what's happening across {role.company} today.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {quickActions.map((a) => (
            <Button key={a.label} variant="secondary" size="sm" icon={a.icon}>
              {a.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {roleKpis.map((k) => (
          <StatMini key={k.label} {...k} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeader
            eyebrow="Performance"
            title="Revenue vs Quoted"
            subtitle="Last 6 months"
            action={<Badge tone="cyan">+22% MoM</Badge>}
          />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueSeries} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1EA7FF" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#1EA7FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="quoteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7B5CFF" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#7B5CFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#5C6577", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#161A22",
                  border: "1px solid rgba(245,245,247,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v) => formatCurrency(v)}
              />
              <Area type="monotone" dataKey="quotes" stroke="#7B5CFF" fill="url(#quoteGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="revenue" stroke="#1EA7FF" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col">
          <SectionHeader eyebrow="Nova Insight" title="Project Health" className="mb-3" />
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={projectHealthSeries} dataKey="value" innerRadius={38} outerRadius={56} paddingAngle={4}>
                  {projectHealthSeries.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {projectHealthSeries.map((p) => (
                <div key={p.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-ink-muted">{p.name}</span>
                  <span className="text-ink font-medium ml-auto">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-line flex items-start gap-2.5">
            <QMark size={20} />
            <p className="text-xs text-ink-muted leading-relaxed">
              Aria Motors is trending at risk — Stage Worx has a scheduling conflict on Aug 24.
              <button onClick={() => setNovaOpen(true)} className="block mt-1 text-accent-cyan font-medium">
                Ask Nova to resolve it →
              </button>
            </p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2">
          <SectionHeader
            title="Upcoming Events"
            action={
              <Link to="/app/projects" className="text-xs text-accent-blue flex items-center gap-1 hover:text-accent-cyan">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            }
          />
          <div className="space-y-3">
            {projects.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to={`/app/projects/${p.id}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
              >
                <CoverArt seed={p.id} icon={FolderKanban} className="w-14 h-14 rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{p.name}</div>
                  <div className="text-xs text-ink-muted">{p.venue} · {formatDate(p.date)}</div>
                  <ProgressBar value={p.progress} className="mt-2" height="h-1" />
                </div>
                <Badge tone={p.health === "on-track" ? "green" : p.health === "at-risk" ? "amber" : "red"}>
                  {p.status}
                </Badge>
              </Link>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-ink">Latest Messages</span>
              <MessageSquare className="w-4 h-4 text-ink-faint" />
            </div>
            <div className="space-y-3">
              {messagesChannels.slice(0, 2).map((c) => (
                <Link key={c.id} to="/app/messages" className="flex items-start gap-3 group">
                  <Avatar name={c.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-ink truncate group-hover:text-accent-blue transition-colors">
                      {c.name}
                    </div>
                    <div className="text-[11px] text-ink-faint truncate">
                      {c.messages[c.messages.length - 1]?.text}
                    </div>
                  </div>
                  {c.unread > 0 && (
                    <span className="text-[10px] bg-accent-blue text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0">
                      {c.unread}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-ink">This Week</span>
              <Clock className="w-4 h-4 text-ink-faint" />
            </div>
            <div className="space-y-3">
              {upcoming.map((e) => (
                <div key={e.id} className="flex items-center gap-3 text-xs">
                  <div className="w-9 h-9 rounded-lg glass flex flex-col items-center justify-center shrink-0 text-[9px] font-semibold text-accent-blue leading-none">
                    <span>{new Date(e.date).toLocaleDateString("en-ZA", { day: "2-digit" })}</span>
                    <span className="text-ink-faint text-[8px] font-normal">
                      {new Date(e.date).toLocaleDateString("en-ZA", { month: "short" })}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-ink truncate">{e.title}</div>
                    <div className="text-ink-faint text-[10px]">{e.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-blue/10 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <div className="text-sm font-medium text-ink">
              {weather.temp}°C · {weather.condition}
            </div>
            <div className="text-xs text-ink-faint">
              {weather.location} · H:{weather.high}° L:{weather.low}°
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-accent-cyan" />
          </div>
          <div>
            <div className="text-sm font-medium text-ink">Equipment Delivery</div>
            <div className="text-xs text-ink-faint">Stage Worx · Aug 20, 08:00</div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4 sm:col-span-2 lg:col-span-2">
          <div className="w-11 h-11 rounded-xl bg-accent-purple/10 flex items-center justify-center shrink-0">
            <QMark size={20} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-ink">Nova's tip of the day</div>
            <div className="text-xs text-ink-faint truncate">
              "You've got 2 quotes expiring this week — want me to follow up?"
            </div>
          </div>
          <Button size="sm" variant="ghost" className="ml-auto shrink-0" onClick={() => setNovaOpen(true)}>
            <Sparkles className="w-3.5 h-3.5" />
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}

function StatMini({ label, value, delta, trend }) {
  return (
    <GlassCard className="p-4 sm:p-5">
      <div className="text-xs text-ink-muted mb-2">{label}</div>
      <div className="text-xl sm:text-2xl font-semibold text-ink">
        <AnimatedValue value={value} />
      </div>
      <div className={`text-xs mt-1 font-medium ${trend === "up" ? "text-accent-cyan" : "text-ink-faint"}`}>{delta}</div>
    </GlassCard>
  );
}
