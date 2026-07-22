import React, { useState } from "react";
import { User, Building2, Bell, Shield, Link2, Palette } from "lucide-react";
import { GlassCard, SectionHeader, Tabs, Input, Button, Avatar, Badge } from "../../components/ui";
import { currentUser } from "../../data/mockData";
import { cn } from "../../lib/utils";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "company", label: "Company" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "appearance", label: "Appearance" },
];

export default function Settings() {
  const [tab, setTab] = useState("profile");
  const [toggles, setToggles] = useState({ email: true, push: true, nova: true, sms: false });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SectionHeader eyebrow="Make it yours" title="Settings" subtitle="Manage your profile, company and preferences" />

      <GlassCard>
        <Tabs tabs={tabs} active={tab} onChange={setTab} className="px-6" />
        <div className="p-6">
          {tab === "profile" && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar name={currentUser.name} size="xl" />
                <div>
                  <Button size="sm" variant="secondary">Change Photo</Button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Full name</label>
                  <Input defaultValue={currentUser.name} />
                </div>
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Title</label>
                  <Input defaultValue={currentUser.title} />
                </div>
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Email</label>
                  <Input defaultValue={currentUser.email} />
                </div>
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Phone</label>
                  <Input defaultValue="+27 82 555 0134" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </div>
          )}

          {tab === "company" && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-synq-gradient flex items-center justify-center text-white font-semibold">
                  HE
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">Horizon Events Co.</div>
                  <div className="text-xs text-ink-faint">Event Organiser · Johannesburg</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Company name</label>
                  <Input defaultValue="Horizon Events Co." />
                </div>
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Registration number</label>
                  <Input defaultValue="2019/123456/07" />
                </div>
              </div>
              <Button>Update Company</Button>
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-1">
              {[
                { key: "email", label: "Email notifications", desc: "Quote updates, invoices, and weekly summaries" },
                { key: "push", label: "Push notifications", desc: "Real-time alerts on your device" },
                { key: "nova", label: "Nova proactive suggestions", desc: "Let Nova surface insights automatically" },
                { key: "sms", label: "SMS alerts", desc: "Urgent scheduling conflicts only" },
              ].map((row) => (
                <div key={row.key} className="flex items-center justify-between py-3.5 border-b border-line last:border-0">
                  <div>
                    <div className="text-sm text-ink">{row.label}</div>
                    <div className="text-xs text-ink-faint">{row.desc}</div>
                  </div>
                  <button
                    onClick={() => setToggles((t) => ({ ...t, [row.key]: !t[row.key] }))}
                    className={cn("w-11 h-6 rounded-full transition-colors relative shrink-0", toggles[row.key] ? "bg-synq-gradient" : "bg-white/10")}
                  >
                    <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all", toggles[row.key] ? "left-5.5" : "left-0.5")} style={{ left: toggles[row.key] ? "22px" : "2px" }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-5">
              <div>
                <label className="text-xs text-ink-muted mb-1.5 block">Current password</label>
                <Input type="password" placeholder="••••••••••" />
              </div>
              <div>
                <label className="text-xs text-ink-muted mb-1.5 block">New password</label>
                <Input type="password" placeholder="••••••••••" />
              </div>
              <Button>Update Password</Button>
              <div className="pt-5 border-t border-line flex items-center justify-between">
                <div>
                  <div className="text-sm text-ink">Two-factor authentication</div>
                  <div className="text-xs text-ink-faint">Add an extra layer of security</div>
                </div>
                <Badge tone="amber">Not enabled</Badge>
              </div>
            </div>
          )}

          {tab === "appearance" && (
            <div className="space-y-4">
              <div className="text-sm text-ink mb-1">Theme</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-4 border-accent-blue/50 border-2 text-center">
                  <div className="w-full h-16 rounded-lg bg-bg mb-2 border border-line" />
                  <span className="text-xs text-ink font-medium">Dark (Active)</span>
                </div>
                <div className="glass rounded-xl p-4 text-center opacity-40">
                  <div className="w-full h-16 rounded-lg bg-white mb-2" />
                  <span className="text-xs text-ink-muted">Light — Coming Soon</span>
                </div>
              </div>
              <p className="text-xs text-ink-faint">SYNQ is designed dark-mode first for a premium, focused experience.</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
