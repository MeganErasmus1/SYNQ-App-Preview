import React, { useState } from "react";
import { Search, Send, Paperclip, Smile, Hash, Lock, Sparkles } from "lucide-react";
import { GlassCard, Avatar, Input, Badge } from "../../components/ui";
import { messagesChannels } from "../../data/mockData";
import { QMark } from "../../components/nova/NovaWidget";
import { cn } from "../../lib/utils";

export default function Messages() {
  const [activeId, setActiveId] = useState(messagesChannels[0].id);
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState({});
  const active = messagesChannels.find((c) => c.id === activeId);
  const extra = localMessages[activeId] || [];

  const send = () => {
    if (!draft.trim()) return;
    setLocalMessages((m) => ({
      ...m,
      [activeId]: [...(m[activeId] || []), { id: Math.random(), author: "You", avatar: "JM", text: draft, time: "Now", mine: true }],
    }));
    setDraft("");
  };

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">
      <GlassCard className="h-full flex overflow-hidden" hover={false}>
        <div className="w-72 shrink-0 border-r border-line flex flex-col hidden md:flex">
          <div className="p-4 border-b border-line">
            <Input icon={Search} placeholder="Search messages..." />
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {messagesChannels.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors",
                  activeId === c.id ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                )}
              >
                <div className="w-9 h-9 rounded-lg glass flex items-center justify-center shrink-0">
                  {c.type === "internal" ? <Lock className="w-4 h-4 text-ink-faint" /> : <Hash className="w-4 h-4 text-accent-blue" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink truncate">{c.name}</div>
                  <div className="text-xs text-ink-faint truncate">{c.messages[c.messages.length - 1]?.text}</div>
                </div>
                {c.unread > 0 && (
                  <span className="text-[10px] bg-accent-blue text-white rounded-full w-4.5 h-4.5 flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-5 h-16 border-b border-line shrink-0">
            <div className="w-9 h-9 rounded-lg glass flex items-center justify-center">
              <Hash className="w-4 h-4 text-accent-blue" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink truncate">{active.name}</div>
              <div className="text-xs text-ink-faint">{active.members.length} members</div>
            </div>
            <div className="ml-auto flex -space-x-2">
              {active.members.slice(0, 4).map((m) => (
                <Avatar key={m} name={m} size="sm" className="border-2 border-bg-secondary" />
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {[...active.messages, ...extra].map((m) => (
              <div key={m.id} className={cn("flex gap-3", m.mine && "flex-row-reverse")}>
                {m.nova ? <QMark size={22} /> : <Avatar name={m.author} size="sm" />}
                <div className={cn("max-w-[70%]", m.mine && "items-end flex flex-col")}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-ink">{m.author}</span>
                    <span className="text-[11px] text-ink-faint">{m.time}</span>
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.mine ? "bg-synq-gradient text-white" : m.nova ? "glass border-accent-purple/30" : "glass"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-line shrink-0">
            <div className="flex items-center gap-2 glass rounded-full px-3 py-2">
              <button className="text-ink-faint hover:text-ink"><Paperclip className="w-4 h-4" /></button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={`Message ${active.name}...`}
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <button className="text-ink-faint hover:text-ink"><Smile className="w-4 h-4" /></button>
              <button onClick={send} className="w-8 h-8 rounded-full bg-synq-gradient flex items-center justify-center">
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
