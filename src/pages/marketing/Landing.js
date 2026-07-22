import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Store,
  Users2,
  MessagesSquare,
  CalendarDays,
  Sparkles,
  BarChart3,
  Wallet,
  FolderKanban,
} from "lucide-react";
import { Button, GlassCard, Badge } from "../../components/ui";
import { QMark } from "../../components/nova/NovaWidget";
import { Logo } from "../../components/brand/Logo";
import { LogoIntro } from "../../components/brand/LogoIntro";
import { Slogan, Highlight } from "../../components/brand/Slogan";
import { roadmap } from "../../data/mockData";

const INTRO_KEY = "synq_intro_seen";

const ecosystem = [
  { icon: FolderKanban, label: "Project & Event Management" },
  { icon: Building2, label: "Venue Directory & Booking" },
  { icon: Store, label: "Supplier Marketplace" },
  { icon: Users2, label: "Industry Network" },
  { icon: MessagesSquare, label: "Messaging" },
  { icon: CalendarDays, label: "Shared Calendars" },
  { icon: BarChart3, label: "Reports & Analytics" },
  { icon: Wallet, label: "Finance Integrations" },
];

const personas = [
  "Event Organisers", "Venues", "AV Companies", "Production Companies", "Lighting Companies",
  "Audio Companies", "Staging Companies", "Decor Companies", "Caterers", "Entertainment Suppliers",
  "Photographers", "Security Companies", "Equipment Rental", "Corporate Clients", "Wedding Clients",
  "Festival Organisers", "Exhibition Companies", "Freelancers", "Finance Teams", "Sales Teams",
];

const testimonials = [
  {
    quote: "We used to run five different tools to plan one event. SYNQ replaced all of them — and Nova catches things our team used to miss.",
    name: "Aisha Patel",
    role: "Venue Sales Manager, The Forum",
  },
  {
    quote: "Every supplier, every quote, every conversation — finally in one place. It feels like the platform our industry should've had a decade ago.",
    name: "Karabo Dlamini",
    role: "Director, iTeligent AV",
  },
  {
    quote: "Nova drafted our client proposal in minutes. What used to take a full afternoon now takes one conversation.",
    name: "Johan van der Merwe",
    role: "Senior Event Producer, Horizon Events Co.",
  },
];

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-accent-purple/20 blur-[120px] animate-float" />
      <div
        className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] rounded-full bg-accent-cyan/15 blur-[120px] animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[24rem] h-[24rem] rounded-full bg-accent-blue/15 blur-[120px] animate-float"
        style={{ animationDelay: "3s" }}
      />
    </div>
  );
}

export default function Landing() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.sessionStorage.getItem(INTRO_KEY);
  });

  return (
    <div className="min-h-screen bg-bg text-ink bg-noise overflow-x-hidden">
      <AnimatePresence>
        {showIntro && (
          <LogoIntro
            onDone={() => {
              window.sessionStorage.setItem(INTRO_KEY, "1");
              setShowIntro(false);
            }}
          />
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-bg/60 border-b border-line">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-ink-muted">
            <a href="#ecosystem" className="hover:text-ink transition-colors">Ecosystem</a>
            <a href="#nova" className="hover:text-ink transition-colors">Nova AI</a>
            <a href="#roadmap" className="hover:text-ink transition-colors">Roadmap</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-ink-muted hover:text-ink transition-colors hidden sm:block">
              Log In
            </Link>
            <Link to="/onboarding">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative px-6 pt-20 pb-24 max-w-7xl mx-auto text-center">
        <FloatingOrbs />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <Badge tone="purple" className="mx-auto mb-8" dot>
            Introducing Nova — your AI teammate
          </Badge>
          <h1 className="font-semibold tracking-tight mb-6">
            <Slogan size="hero" />
          </h1>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto mb-10">
            <Highlight text="SYNQ is the operating system for the events industry — connecting organisers, venues, suppliers and clients on one intelligent platform. From first enquiry to final applause." />
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/onboarding">
              <Button size="lg" icon={Sparkles}>
                Let's build something impressive
              </Button>
            </Link>
            <Link to="/app">
              <Button size="lg" variant="secondary" iconRight={<ArrowRight className="w-4 h-4" />}>
                Explore the platform
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative mt-20"
        >
          <div className="absolute inset-0 bg-synq-gradient blur-[100px] opacity-20 rounded-[3rem]" />
          <GlassCard className="relative p-3 sm:p-4 max-w-5xl mx-auto" hover={false}>
            <div className="rounded-xl2 overflow-hidden border border-line bg-bg-secondary">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                <span className="ml-3 text-xs text-ink-faint">app.synq.io/mission-control</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 text-left">
                <GlassCard className="p-4 sm:col-span-2">
                  <div className="text-xs text-ink-muted mb-1">Good morning, Johan 👋</div>
                  <div className="text-sm text-ink mb-4">Here's what's happening today.</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[["4", "Projects"], ["7", "Quotes"], ["3", "Site Visits"]].map(([n, l]) => (
                      <div key={l} className="glass rounded-xl p-3 text-center">
                        <div className="text-lg font-semibold">{n}</div>
                        <div className="text-[11px] text-ink-faint">{l}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                <GlassCard className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <QMark size={18} />
                    <span className="text-xs font-semibold">Nova</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    I found 3 venues under budget for Aria Motors. Want me to prepare the proposal?
                  </p>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      <section id="ecosystem" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-accent-blue mb-3">
            One ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Everything the industry needs, connected.</h2>
          <p className="text-ink-muted max-w-xl mx-auto">
            Think Monday.com, Slack, HubSpot, Dropbox, ChatGPT and Airbnb — rebuilt from the ground up for events.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ecosystem.map((e, i) => (
            <motion.div
              key={e.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlassCard className="p-6 h-full flex flex-col items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-synq-gradient flex items-center justify-center">
                  <e.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-ink">{e.label}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wider">
            Built for every seat at the table
          </h3>
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
          {personas.map((p) => (
            <Badge key={p}>{p}</Badge>
          ))}
        </div>
      </section>

      <section id="nova" className="px-6 py-24 max-w-7xl mx-auto">
        <GlassCard className="p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent-purple/25 blur-[100px]" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge tone="purple" dot className="mb-5">
                Meet Nova
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                Not a chatbot. <span className="text-gradient">A teammate.</span>
              </h2>
              <p className="text-ink-muted mb-6 leading-relaxed">
                Nova finds venues, checks supplier availability, spots scheduling conflicts, and drafts your
                client emails — before you even ask. Friendly, confident, and always a step ahead.
              </p>
              <Link to="/app">
                <Button icon={Sparkles}>Ask Nova something</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {[
                "I found two suppliers available under budget.",
                "Want me to prepare the proposal?",
                "I spotted a scheduling conflict.",
                "Everything's in SYNQ.",
              ].map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass rounded-2xl px-5 py-3.5 text-sm text-ink flex items-center gap-3"
                >
                  <QMark size={18} />
                  <Highlight text={line} />
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <GlassCard key={t.name} className="p-7">
              <p className="text-sm text-ink leading-relaxed mb-5">"<Highlight text={t.quote} />"</p>
              <div className="text-sm font-medium text-ink">{t.name}</div>
              <div className="text-xs text-ink-muted">{t.role}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="roadmap" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-accent-blue mb-3">
            The road ahead
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold">This is only the beginning.</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {roadmap.slice(0, 8).map((r) => (
            <GlassCard key={r.id} className="p-5">
              <Badge tone="blue" className="mb-3">
                {r.category}
              </Badge>
              <div className="text-sm font-medium text-ink mb-1.5">{r.title}</div>
              <div className="text-xs text-ink-muted leading-relaxed">{r.desc}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-6 py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold mb-6">
          How has this <span className="text-gradient">not existed</span> before?
        </h2>
        <p className="text-ink-muted mb-10 max-w-xl mx-auto">
          <Highlight text="Join the organisers, venues and suppliers already bringing their entire events business into SYNQ." />
        </p>
        <Link to="/onboarding">
          <Button size="lg" icon={Sparkles}>
            Get Started — It's Free
          </Button>
        </Link>
      </section>

      <footer className="border-t border-line px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-ink-faint">
            <Highlight text="© 2026 SYNQ. Every venue. Every supplier. Every event." />
          </p>
        </div>
      </footer>
    </div>
  );
}
