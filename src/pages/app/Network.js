import React, { useState } from "react";
import { Heart, MessageCircle, Share2, UserPlus, Briefcase, Image as ImageIcon } from "lucide-react";
import { GlassCard, Badge, Button, Avatar, SectionHeader, Textarea } from "../../components/ui";
import { CoverArt } from "../../components/ui/CoverArt";
import { networkFeed, suppliers } from "../../data/mockData";
import { cn } from "../../lib/utils";
import { Highlight } from "../../components/brand/Slogan";

export default function Network() {
  const [liked, setLiked] = useState(new Set());

  const toggleLike = (id) => {
    setLiked((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <SectionHeader eyebrow="The industry, connected" title="Network" subtitle="Updates from your suppliers, venues and partners" />

        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <Avatar name="Johan van der Merwe" size="md" />
            <Textarea rows={1} placeholder="Share an update, a completed event, or an opportunity..." className="!py-2.5" />
          </div>
          <div className="flex justify-end mt-3">
            <Button size="sm">Post Update</Button>
          </div>
        </GlassCard>

        {networkFeed.map((post) => (
          <GlassCard key={post.id} className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={post.company} size="md" />
              <div>
                <div className="text-sm font-medium text-ink">
                  <Highlight text={post.company} />
                </div>
                <div className="text-xs text-ink-faint">{post.time}</div>
              </div>
            </div>
            <p className="text-sm text-ink leading-relaxed mb-3">
              <Highlight text={post.content} />
            </p>
            {post.image && (
              <CoverArt seed={`post-${post.id}`} icon={ImageIcon} className="rounded-xl w-full h-56 mb-3" />
            )}
            <div className="flex items-center gap-5 pt-3 border-t border-line text-xs text-ink-muted">
              <button
                onClick={() => toggleLike(post.id)}
                className={cn("flex items-center gap-1.5 hover:text-accent-purple transition-colors", liked.has(post.id) && "text-accent-purple")}
              >
                <Heart className={cn("w-4 h-4", liked.has(post.id) && "fill-accent-purple")} />
                {post.likes + (liked.has(post.id) ? 1 : 0)}
              </button>
              <button className="flex items-center gap-1.5 hover:text-ink transition-colors">
                <MessageCircle className="w-4 h-4" /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 hover:text-ink transition-colors ml-auto">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-5">
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-ink mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-accent-blue" /> Suggested Connections
          </h3>
          <div className="space-y-4">
            {suppliers.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <Avatar name={s.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-ink truncate">{s.name}</div>
                  <div className="text-[11px] text-ink-faint">{s.category}</div>
                </div>
                <button className="w-7 h-7 rounded-full glass flex items-center justify-center shrink-0 hover:border-accent-blue/40">
                  <UserPlus className="w-3.5 h-3.5 text-accent-blue" />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-ink mb-3">Industry News</h3>
          <div className="space-y-3 text-xs text-ink-muted leading-relaxed">
            <p>SA events industry grew 18% YoY in 2025, led by corporate and hybrid formats.</p>
            <p><Highlight text="Hybrid conferences now make up 34% of all corporate bookings on SYNQ." /></p>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold text-ink mb-3">Trending Tags</h3>
          <div className="flex flex-wrap gap-2">
            {["#CorporateEvents", "#WeddingSeason", "#LiveEvents", "#EventTech", "#SustainableEvents"].map((t) => (
              <Badge key={t} tone="purple">{t}</Badge>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
