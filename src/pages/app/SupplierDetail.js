import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShieldCheck, Clock, MessageSquare, CalendarDays, Heart, MapPin, Store } from "lucide-react";
import { GlassCard, Badge, Button, Avatar, SectionHeader } from "../../components/ui";
import { CoverArt } from "../../components/ui/CoverArt";
import { suppliers } from "../../data/mockData";
import { useApp } from "../../context/AppContext";

export default function SupplierDetail() {
  const { id } = useParams();
  const supplier = suppliers.find((s) => s.id === id) || suppliers[0];
  const { pushToast } = useApp();

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <Link to="/app/suppliers" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> All Suppliers
      </Link>

      <div className="relative h-56 rounded-xl2 overflow-hidden">
        <CoverArt seed={supplier.id} icon={Store} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-16 relative">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-start gap-4">
              <Avatar name={supplier.name} size="xl" className="border-4 border-bg-secondary" />
              <div className="flex-1 pt-8">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-ink">{supplier.name}</h1>
                  {supplier.verified && <ShieldCheck className="w-4 h-4 text-accent-cyan" />}
                </div>
                <p className="text-sm text-ink-muted flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {supplier.location} · {supplier.category}
                </p>
                <div className="flex items-center gap-3 text-xs text-ink-faint mt-2">
                  <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /> {supplier.rating}</span>
                  <span>({supplier.reviews} reviews)</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Responds in {supplier.responseTime}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {supplier.tags.map((t) => <Badge key={t} tone="blue">{t}</Badge>)}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeader title="Equipment & Capabilities" className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {supplier.equipment.map((e) => <Badge key={e}>{e}</Badge>)}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeader title="Past Projects" className="mb-4" />
            <div className="space-y-2">
              {supplier.pastProjects.map((p) => (
                <div key={p} className="text-sm text-ink glass rounded-xl px-4 py-3">{p}</div>
              ))}
              {supplier.pastProjects.length === 0 && <div className="text-sm text-ink-muted">No shared projects yet.</div>}
            </div>
          </GlassCard>

          {supplier.certifications.length > 0 && (
            <GlassCard className="p-6">
              <SectionHeader title="Certifications & Insurance" className="mb-4" />
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((c) => <Badge key={c} tone="green">{c}</Badge>)}
              </div>
            </GlassCard>
          )}
        </div>

        <div className="space-y-4">
          <GlassCard className="p-6 sticky top-20">
            <div className="text-xs text-ink-faint mb-1">Typical pricing</div>
            <div className="text-lg font-semibold text-ink mb-5">{supplier.priceRange}</div>
            <Button className="w-full mb-2" size="lg" onClick={() => pushToast({ title: "Quote requested", desc: `${supplier.name} will respond within ${supplier.responseTime}.` })}>
              Request Quote
            </Button>
            <Button className="w-full mb-2" size="lg" variant="secondary" icon={MessageSquare}>Message</Button>
            <Button className="w-full mb-2" size="lg" variant="outline" icon={CalendarDays}>Book Meeting</Button>
            <Button className="w-full" size="lg" variant="ghost" icon={Heart}>Save to Favourites</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
