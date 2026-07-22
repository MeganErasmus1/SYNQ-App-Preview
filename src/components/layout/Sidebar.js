import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { navItems, bottomNavItems } from "./nav";
import { Logo } from "../brand/Logo";
import { Avatar } from "../ui";
import { useApp } from "../../context/AppContext";
import { roles, currentUser } from "../../data/mockData";
import { cn } from "../../lib/utils";

export function Sidebar() {
  const { role, setRole } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-line bg-bg-secondary/40">
      <div className="flex items-center px-6 h-16 shrink-0">
        <Logo size="md" />
      </div>

      <div className="px-4 pb-3 relative">
        <button
          onClick={() => setRoleMenuOpen((o) => !o)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl glass hover:border-accent-blue/30 transition-colors"
        >
          <Avatar name={currentUser.name} size="sm" />
          <div className="flex-1 text-left min-w-0">
            <div className="text-xs font-medium text-ink truncate">{currentUser.name}</div>
            <div className="text-[11px] text-ink-muted truncate">{role.company}</div>
          </div>
          <ChevronDown className={cn("w-3.5 h-3.5 text-ink-faint transition-transform", roleMenuOpen && "rotate-180")} />
        </button>
        {roleMenuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setRoleMenuOpen(false)} />
            <div className="absolute top-full left-4 right-4 mt-2 glass-strong rounded-xl p-1.5 z-20 shadow-glass">
              <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-ink-faint font-semibold">
                Viewing as
              </div>
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r);
                    setRoleMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors",
                    role.id === r.id ? "bg-white/10 text-ink" : "text-ink-muted hover:bg-white/5 hover:text-ink"
                  )}
                >
                  <div className="font-medium">{r.label}</div>
                  <div className="text-[10px] text-ink-faint">{r.company}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/app"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group relative",
                isActive
                  ? "text-ink bg-white/[0.07]"
                  : "text-ink-muted hover:text-ink hover:bg-white/[0.04]"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-synq-gradient" />
                )}
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-line space-y-0.5">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive ? "text-ink bg-white/[0.07]" : "text-ink-muted hover:text-ink hover:bg-white/[0.04]"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
