import React from "react";
import { NavLink } from "react-router-dom";
import { mobileNavItems } from "./nav";
import { cn } from "../../lib/utils";

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-line safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/app"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[56px] transition-colors",
                isActive ? "text-accent-blue" : "text-ink-faint"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label === "Mission Control" ? "Home" : item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
