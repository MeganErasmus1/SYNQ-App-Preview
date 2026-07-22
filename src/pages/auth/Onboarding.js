import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Store, Users2, Camera, ShieldCheck, Truck, Briefcase, Sparkles, ArrowRight, ArrowLeft,
} from "lucide-react";
import { QMark } from "../../components/brand/QMark";
import { Logo } from "../../components/brand/Logo";
import { Button, Input, GlassCard } from "../../components/ui";
import { cn } from "../../lib/utils";

const roleOptions = [
  { id: "organiser", label: "Event Organiser", icon: Briefcase },
  { id: "venue", label: "Venue", icon: Building2 },
  { id: "supplier", label: "Supplier / AV / Production", icon: Truck },
  { id: "client", label: "Corporate or Wedding Client", icon: Users2 },
  { id: "photographer", label: "Photographer", icon: Camera },
  { id: "security", label: "Security Company", icon: ShieldCheck },
  { id: "marketplace", label: "Equipment Rental", icon: Store },
  { id: "freelancer", label: "Freelancer", icon: Sparkles },
];

function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <QMark size={96} spinning />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8"
      >
        <Logo size="lg" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="mt-3 text-ink-muted text-sm"
      >
        Nova is getting everything ready for you...
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="mt-1 text-ink font-medium"
      >
        Welcome to SYNQ. 👋
      </motion.p>
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [company, setCompany] = useState("");
  const [showSplash, setShowSplash] = useState(false);

  const finish = (e) => {
    e.preventDefault();
    setShowSplash(true);
  };

  if (showSplash) {
    return <SplashScreen onDone={() => navigate("/app")} />;
  }

  return (
    <div className="min-h-screen bg-bg text-ink bg-noise flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent-purple/20 blur-[120px] animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-cyan/15 blur-[120px] animate-float" />

      <div className="relative w-full max-w-2xl">
        <div className="flex items-center justify-center mb-10">
          <Logo size="md" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className={cn("h-1 rounded-full transition-all", step >= s ? "w-10 bg-synq-gradient" : "w-6 bg-white/10")} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <h1 className="text-2xl font-semibold text-center mb-2">Who's joining SYNQ?</h1>
              <p className="text-sm text-ink-muted text-center mb-8">
                We'll tailor your dashboard, workflows and Nova's suggestions to match.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {roleOptions.map((r) => (
                  <button key={r.id} onClick={() => setRole(r.id)}>
                    <GlassCard
                      className={cn(
                        "p-4 flex flex-col items-center gap-2 text-center h-full",
                        role === r.id && "border-accent-blue/60 shadow-glow"
                      )}
                    >
                      <r.icon className="w-5 h-5 text-accent-blue" />
                      <span className="text-xs text-ink font-medium leading-tight">{r.label}</span>
                    </GlassCard>
                  </button>
                ))}
              </div>
              <Button className="w-full" size="lg" disabled={!role} onClick={() => setStep(2)} iconRight={<ArrowRight className="w-4 h-4" />}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <h1 className="text-2xl font-semibold text-center mb-2">Tell us about your company</h1>
              <p className="text-sm text-ink-muted text-center mb-8">This helps Nova connect you to the right people, fast.</p>
              <GlassCard className="p-6 space-y-4 mb-8">
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Company name</label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Horizon Events Co." />
                </div>
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Primary location</label>
                  <Input placeholder="e.g. Johannesburg, South Africa" />
                </div>
                <div>
                  <label className="text-xs text-ink-muted mb-1.5 block">Team size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1-5", "6-20", "21-50", "50+"].map((t) => (
                      <button key={t} className="glass rounded-xl py-2 text-xs text-ink-muted hover:text-ink hover:border-accent-blue/40 transition-colors">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
              <div className="flex gap-3">
                <Button variant="secondary" size="lg" onClick={() => setStep(1)} icon={ArrowLeft}>
                  Back
                </Button>
                <Button className="flex-1" size="lg" onClick={finish} icon={Sparkles}>
                  Enter SYNQ
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
