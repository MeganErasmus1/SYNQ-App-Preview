import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, ShieldCheck, Clock, Store } from "lucide-react";
import { GlassCard, Badge, Input, SectionHeader, Avatar, Button } from "../../components/ui";
import { CoverArt } from "../../components/ui/CoverArt";
import { suppliers } from "../../data/mockData";

const categories = ["All", "Audio Visual", "Lighting", "Staging", "Audio", "Decor & Florals", "Catering", "Entertainment"];

export default function Suppliers() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const list = suppliers.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const matchesCat = cat === "All" || s.category === cat;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <SectionHeader eyebrow="The marketplace" title="Suppliers" subtitle={`${suppliers.length} verified partners ready to book`} />

      <div className="flex flex-col sm:flex-row gap-3">
        <Input icon={Search} placeholder="Search suppliers..." value={query} onChange={(e) => setQuery(e.target.value)} className="sm:max-w-sm" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                cat === c ? "bg-synq-gradient text-white" : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((s) => (
          <GlassCard key={s.id} className="overflow-hidden flex flex-col">
            <div className="relative h-28">
              <CoverArt seed={s.id} icon={Store} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent" />
            </div>
            <div className="p-5 -mt-8 relative flex-1 flex flex-col">
              <Avatar name={s.name} size="lg" className="border-4 border-bg-secondary mb-3" />
              <div className="flex items-center gap-2 mb-1">
                <Link to={`/app/suppliers/${s.id}`}>
                  <h3 className="text-sm font-semibold text-ink hover:text-accent-blue transition-colors">{s.name}</h3>
                </Link>
                {s.verified && <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />}
              </div>
              <p className="text-xs text-ink-muted mb-3">{s.category} · {s.location}</p>
              <div className="flex items-center gap-3 text-xs text-ink-faint mb-3">
                <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /> {s.rating}</span>
                <span>({s.reviews})</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.responseTime}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tags.slice(0, 3).map((t) => <Badge key={t}>{t}</Badge>)}
              </div>
              <div className="mt-auto flex gap-2">
                <Link to={`/app/suppliers/${s.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">View Profile</Button>
                </Link>
                <Button size="sm" className="flex-1">Request Quote</Button>
              </div>
            </div>
          </GlassCard>
        ))}
        {list.length === 0 && (
          <div className="col-span-full text-center py-16 text-ink-muted text-sm">No suppliers match your search.</div>
        )}
      </div>
    </div>
  );
}
