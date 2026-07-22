import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, Star, Heart, Building2 } from "lucide-react";
import { GlassCard, Badge, Input, SectionHeader, Button } from "../../components/ui";
import { CoverArt } from "../../components/ui/CoverArt";
import { venues } from "../../data/mockData";
import { formatCurrency } from "../../lib/utils";

const filters = ["All", "Conference", "Wedding", "Gala", "Product Launch", "Exhibition"];

export default function Venues() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState(new Set());

  const list = venues.filter((v) => {
    const matchesQuery = v.name.toLowerCase().includes(query.toLowerCase()) || v.location.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || v.tags.includes(filter);
    return matchesQuery && matchesFilter;
  });

  const toggleSave = (id) => {
    setSaved((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <SectionHeader eyebrow="Every space, in one place" title="Venues" subtitle={`${venues.length} venues available across South Africa`} />

      <div className="flex flex-col sm:flex-row gap-3">
        <Input icon={Search} placeholder="Search venues or locations..." value={query} onChange={(e) => setQuery(e.target.value)} className="sm:max-w-sm" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filter === f ? "bg-synq-gradient text-white" : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((v) => (
          <GlassCard key={v.id} className="overflow-hidden flex flex-col">
            <div className="relative h-44">
              <CoverArt seed={v.id} icon={Building2} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={() => toggleSave(v.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center"
              >
                <Heart className={`w-4 h-4 ${saved.has(v.id) ? "fill-accent-purple text-accent-purple" : "text-white"}`} />
              </button>
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur rounded-full px-2.5 py-1 text-xs text-white">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {v.rating} ({v.reviews})
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <Link to={`/app/venues/${v.id}`}>
                <h3 className="text-sm font-semibold text-ink mb-1 hover:text-accent-blue transition-colors">{v.name}</h3>
              </Link>
              <p className="text-xs text-ink-muted flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3" /> {v.location}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {v.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-line">
                <span className="text-xs text-ink-faint flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Up to {v.capacity}
                </span>
                <span className="text-sm font-semibold text-ink">
                  from {formatCurrency(v.priceFrom)}
                </span>
              </div>
              <Link to={`/app/venues/${v.id}`}>
                <Button className="w-full mt-3" size="sm" variant="secondary">View Venue</Button>
              </Link>
            </div>
          </GlassCard>
        ))}
        {list.length === 0 && (
          <div className="col-span-full text-center py-16 text-ink-muted text-sm">No venues match your search.</div>
        )}
      </div>
    </div>
  );
}
