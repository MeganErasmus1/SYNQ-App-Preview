import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../components/layout/nav";
import { GlassCard, SectionHeader, Avatar } from "../../components/ui";
import { currentUser } from "../../data/mockData";
import { LogOut, Settings as SettingsIcon } from "lucide-react";

const extraItems = navItems.filter((n) => !["dashboard", "projects", "messages", "calendar"].includes(n.id));

export default function More() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Avatar name={currentUser.name} size="lg" />
        <div>
          <div className="text-sm font-semibold text-ink">{currentUser.name}</div>
          <div className="text-xs text-ink-faint">{currentUser.title}</div>
        </div>
      </div>

      <SectionHeader title="More" className="mb-2" />
      <div className="grid grid-cols-2 gap-3">
        {extraItems.map((item) => (
          <Link key={item.id} to={item.path}>
            <GlassCard className="p-5 flex flex-col items-center gap-2 text-center">
              <item.icon className="w-5 h-5 text-accent-blue" />
              <span className="text-xs font-medium text-ink">{item.label}</span>
            </GlassCard>
          </Link>
        ))}
        <Link to="/app/settings">
          <GlassCard className="p-5 flex flex-col items-center gap-2 text-center">
            <SettingsIcon className="w-5 h-5 text-accent-blue" />
            <span className="text-xs font-medium text-ink">Settings</span>
          </GlassCard>
        </Link>
        <Link to="/">
          <GlassCard className="p-5 flex flex-col items-center gap-2 text-center">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-xs font-medium text-ink">Log Out</span>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
