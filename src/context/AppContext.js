import React, { createContext, useCallback, useContext, useState } from "react";
import { roles } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [role, setRole] = useState(roles[0]);
  const [novaOpen, setNovaOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, ...toast }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const value = {
    role,
    setRole,
    novaOpen,
    setNovaOpen,
    paletteOpen,
    setPaletteOpen,
    notifOpen,
    setNotifOpen,
    toasts,
    pushToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
