import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppShell } from "./components/layout/AppShell";
import { Toasts } from "./components/layout/Toasts";

import Landing from "./pages/marketing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Onboarding from "./pages/auth/Onboarding";

import Dashboard from "./pages/app/Dashboard";
import Projects from "./pages/app/Projects";
import ProjectDetail from "./pages/app/ProjectDetail";
import Venues from "./pages/app/Venues";
import VenueDetail from "./pages/app/VenueDetail";
import Suppliers from "./pages/app/Suppliers";
import SupplierDetail from "./pages/app/SupplierDetail";
import Network from "./pages/app/Network";
import Messages from "./pages/app/Messages";
import CalendarPage from "./pages/app/CalendarPage";
import Files from "./pages/app/Files";
import Reports from "./pages/app/Reports";
import Finance from "./pages/app/Finance";
import Roadmap from "./pages/app/Roadmap";
import Settings from "./pages/app/Settings";
import More from "./pages/app/More";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Toasts />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route path="/app" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="venues" element={<Venues />} />
            <Route path="venues/:id" element={<VenueDetail />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="suppliers/:id" element={<SupplierDetail />} />
            <Route path="network" element={<Network />} />
            <Route path="messages" element={<Messages />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="files" element={<Files />} />
            <Route path="reports" element={<Reports />} />
            <Route path="finance" element={<Finance />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="settings" element={<Settings />} />
            <Route path="more" element={<More />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
