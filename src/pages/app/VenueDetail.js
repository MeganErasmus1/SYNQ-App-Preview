import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, Star, Users, Zap, Wifi, ParkingCircle, Truck, Heart, Sparkles, Plane, Building,
} from "lucide-react";
import { GlassCard, Badge, Button, Avatar, SectionHeader } from "../../components/ui";
import { Celebration } from "../../components/ui/Celebration";
import { CoverArt } from "../../components/ui/CoverArt";
import { venues } from "../../data/mockData";
import { formatCurrency } from "../../lib/utils";
import { useApp } from "../../context/AppContext";

const amenityIcons = { Parking: ParkingCircle, Fibre: Wifi, Internet: Wifi };

function MiniAvailability() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const booked = new Set([3, 4, 5, 12, 13, 20, 21, 22, 27]);
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {days.map((d) => (
        <div
          key={d}
          className={`aspect-square rounded-md flex items-center justify-center text-[10px] ${
            booked.has(d) ? "bg-red-500/15 text-red-400" : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {d}
        </div>
      ))}
    </div>
  );
}

export default function VenueDetail() {
  const { id } = useParams();
  const venue = venues.find((v) => v.id === id) || venues[0];
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState(0);
  const { setNovaOpen, pushToast } = useApp();

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <Link to="/app/venues" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> All Venues
      </Link>

      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl2 overflow-hidden h-[380px]">
        <CoverArt seed={venue.id} icon={Building} className="col-span-2 row-span-2 w-full h-full" />
        <CoverArt seed={venue.id + "-1"} icon={Building} className="col-span-2 sm:col-span-1 w-full h-full" />
        <CoverArt seed={venue.id + "-2"} icon={Building} className="col-span-2 sm:col-span-1 w-full h-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl font-semibold text-ink">{venue.name}</h1>
                <p className="text-sm text-ink-muted flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {venue.location}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-amber-400 shrink-0">
                <Star className="w-4 h-4 fill-amber-400" /> {venue.rating}
                <span className="text-ink-faint text-xs">({venue.reviews})</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {venue.tags.map((t, i) => (
                <Badge key={t} tone={["blue", "cyan", "pink"][i % 3]}>{t}</Badge>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeader title="Rooms & Capacity" className="mb-4" />
            <div className="grid sm:grid-cols-3 gap-3">
              {venue.rooms.map((r) => (
                <div key={r.name} className="glass rounded-xl p-4">
                  <div className="text-sm font-medium text-ink">{r.name}</div>
                  <div className="text-xs text-ink-faint mt-1">{r.dimensions}</div>
                  <div className="text-xs text-accent-blue mt-2 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Up to {r.capacity}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeader title="Technical Specifications" className="mb-4" />
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-accent-blue mt-0.5" />
                <div>
                  <div className="text-ink-faint text-xs">Power</div>
                  <div className="text-ink">{venue.power}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-accent-blue mt-0.5" />
                <div>
                  <div className="text-ink-faint text-xs">Rigging</div>
                  <div className="text-ink">{venue.rigging}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-accent-blue mt-0.5" />
                <div>
                  <div className="text-ink-faint text-xs">Stage</div>
                  <div className="text-ink">{venue.stage}</div>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-line flex flex-wrap gap-2">
              {venue.amenities.map((a) => (
                <Badge key={a}>{a}</Badge>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeader title="Availability" subtitle="Next 30 days" className="mb-4" />
            <MiniAvailability />
            <div className="flex items-center gap-4 mt-4 text-xs text-ink-faint">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500/40" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-red-500/40" /> Booked</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SectionHeader title="Nearby" className="mb-4" />
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-xs text-ink-faint mb-2 flex items-center gap-1"><Building className="w-3.5 h-3.5" /> Accommodation</div>
                {venue.nearby.accommodation.map((a) => <div key={a} className="text-ink text-xs mb-1">{a}</div>)}
              </div>
              <div>
                <div className="text-xs text-ink-faint mb-2 flex items-center gap-1"><Plane className="w-3.5 h-3.5" /> Airport</div>
                <div className="text-ink text-xs">{venue.nearby.airport}</div>
              </div>
              <div>
                <div className="text-xs text-ink-faint mb-2">Nearby Suppliers</div>
                {venue.nearby.suppliers.map((s) => <div key={s} className="text-ink text-xs mb-1">{s}</div>)}
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6 sticky top-20">
            <div className="text-xs text-ink-faint mb-1">Starting from</div>
            <div className="text-2xl font-semibold text-ink mb-4">{formatCurrency(venue.priceFrom)}</div>
            <div className="relative">
              <Button
                className="w-full mb-2"
                size="lg"
                onClick={() => {
                  setBurst((b) => b + 1);
                  pushToast({ title: "Booking request sent", desc: `${venue.name} will confirm shortly.` });
                }}
              >
                Book Now
              </Button>
              <Celebration burstKey={burst} />
            </div>
            <Button
              className="w-full mb-2"
              size="lg"
              variant="secondary"
              icon={Heart}
              onClick={() => setSaved((s) => !s)}
            >
              {saved ? "Saved" : "Save Favourite"}
            </Button>
            <Button className="w-full" size="lg" variant="outline" icon={Sparkles} onClick={() => setNovaOpen(true)}>
              Ask Nova
            </Button>
            <div className="mt-6 pt-6 border-t border-line flex items-center gap-3">
              <Avatar name={venue.contact.name} size="md" />
              <div>
                <div className="text-sm text-ink font-medium">{venue.contact.name}</div>
                <div className="text-xs text-ink-faint">{venue.contact.role}</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
