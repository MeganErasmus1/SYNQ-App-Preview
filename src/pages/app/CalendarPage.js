import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { GlassCard, Badge, Button, SectionHeader } from "../../components/ui";
import { calendarEvents } from "../../data/mockData";
import { cn } from "../../lib/utils";

const typeTone = {
  "site-visit": "blue",
  deadline: "red",
  walkthrough: "purple",
  meeting: "default",
  tasting: "cyan",
  delivery: "amber",
  event: "green",
};

const eventPillTone = {
  blue: "bg-accent-blue/15 text-accent-blue",
  red: "bg-red-500/15 text-red-400",
  purple: "bg-accent-purple/15 text-accent-purple",
  default: "bg-white/10 text-ink-muted",
  cyan: "bg-accent-cyan/15 text-accent-cyan",
  amber: "bg-amber-500/15 text-amber-400",
  green: "bg-emerald-500/15 text-emerald-400",
};

export default function CalendarPage() {
  const [cursor, setCursor] = useState(new Date(2026, 6, 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const eventsOn = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <SectionHeader
        eyebrow="Never miss a moment"
        title="Calendar"
        subtitle="Site visits, deadlines, deliveries and events — all in sync"
        action={<Button icon={Plus} size="sm">New Event</Button>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <GlassCard className="p-5 xl:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-ink">
              {cursor.toLocaleDateString("en-ZA", { month: "long", year: "numeric" })}
            </h3>
            <div className="flex items-center gap-1">
              <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-accent-blue/40">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:border-accent-blue/40">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-[11px] text-ink-faint font-medium">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((day, i) => {
              const evts = day ? eventsOn(day) : [];
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square sm:aspect-auto sm:h-24 rounded-lg p-1.5 border border-transparent text-left overflow-hidden",
                    day ? "glass hover:border-accent-blue/30 transition-colors" : ""
                  )}
                >
                  {day && (
                    <>
                      <div className="text-[11px] text-ink-muted mb-1">{day}</div>
                      <div className="space-y-1 hidden sm:block">
                        {evts.slice(0, 2).map((e) => (
                          <div key={e.id} className={cn("text-[9px] px-1.5 py-0.5 rounded truncate", eventPillTone[typeTone[e.type]])}>
                            {e.title}
                          </div>
                        ))}
                      </div>
                      {evts.length > 0 && (
                        <div className="sm:hidden w-1.5 h-1.5 rounded-full bg-accent-blue mx-auto" />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-ink mb-4">Agenda</h3>
          <div className="space-y-3">
            {calendarEvents.map((e) => (
              <div key={e.id} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg glass flex flex-col items-center justify-center shrink-0 text-[9px] font-semibold text-accent-blue leading-none">
                  <span>{new Date(e.date).toLocaleDateString("en-ZA", { day: "2-digit" })}</span>
                  <span className="text-ink-faint text-[8px] font-normal">{new Date(e.date).toLocaleDateString("en-ZA", { month: "short" })}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-ink truncate">{e.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-ink-faint">{e.time}</span>
                    <Badge tone={typeTone[e.type]} className="!py-0.5 !px-1.5 text-[9px]">{e.type.replace("-", " ")}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
