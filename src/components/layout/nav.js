import {
  LayoutGrid,
  FolderKanban,
  Building2,
  Store,
  Users2,
  MessagesSquare,
  CalendarDays,
  FolderOpen,
  BarChart3,
  Wallet,
  Sparkles,
  Settings,
} from "lucide-react";

export const navItems = [
  { id: "dashboard", label: "Mission Control", path: "/app", icon: LayoutGrid },
  { id: "projects", label: "Projects", path: "/app/projects", icon: FolderKanban },
  { id: "venues", label: "Venues", path: "/app/venues", icon: Building2 },
  { id: "suppliers", label: "Suppliers", path: "/app/suppliers", icon: Store },
  { id: "network", label: "Network", path: "/app/network", icon: Users2 },
  { id: "messages", label: "Messages", path: "/app/messages", icon: MessagesSquare },
  { id: "calendar", label: "Calendar", path: "/app/calendar", icon: CalendarDays },
  { id: "files", label: "Files", path: "/app/files", icon: FolderOpen },
  { id: "reports", label: "Reports", path: "/app/reports", icon: BarChart3 },
  { id: "finance", label: "Finance", path: "/app/finance", icon: Wallet },
  { id: "roadmap", label: "What's Next", path: "/app/roadmap", icon: Sparkles },
];

export const bottomNavItems = [{ id: "settings", label: "Settings", path: "/app/settings", icon: Settings }];

export const mobileNavItems = [
  navItems[0],
  navItems[1],
  navItems[5],
  navItems[6],
  { id: "more", label: "More", path: "/app/more", icon: Settings },
];
