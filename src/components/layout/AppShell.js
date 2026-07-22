import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { NotificationsPanel } from "./NotificationsPanel";
import { NovaLauncher, NovaWidget } from "../nova/NovaWidget";

export function AppShell() {
  return (
    <div className="min-h-screen bg-bg text-ink flex bg-noise relative">
      <div className="pointer-events-none fixed inset-0 bg-synq-gradient-radial" />
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col relative">
        <Topbar />
        <main className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-6 relative z-10">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <CommandPalette />
      <NotificationsPanel />
      <NovaLauncher />
      <NovaWidget />
    </div>
  );
}
