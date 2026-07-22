import React from "react";
import { motion } from "framer-motion";
import { GlassCard, SectionHeader, Badge } from "../../components/ui";
import { roadmap } from "../../data/mockData";
import { QMark } from "../../components/nova/NovaWidget";

const categories = ["AI", "Spatial", "Intelligence", "Experience"];
const categoryTone = { AI: "purple", Spatial: "blue", Intelligence: "cyan", Experience: "green" };

export default function Roadmap() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-10">
      <SectionHeader
        eyebrow="What's next"
        title="The future of SYNQ"
        subtitle="This is only the beginning. Here's where we're headed next."
      />

      <GlassCard className="p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <QMark size={48} />
        <div>
          <h3 className="text-lg font-semibold text-ink mb-1">Nova gets smarter every quarter.</h3>
          <p className="text-sm text-ink-muted">
            We're building toward a fully autonomous events operating system — one that plans, predicts and protects
            every event before problems happen.
          </p>
        </div>
      </GlassCard>

      {categories.map((cat) => (
        <div key={cat}>
          <div className="flex items-center gap-2 mb-4">
            <Badge tone={categoryTone[cat]}>{cat}</Badge>
            <span className="text-xs text-ink-faint">{roadmap.filter((r) => r.category === cat).length} in progress</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmap
              .filter((r) => r.category === cat)
              .map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <GlassCard className="p-5 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-synq-gradient flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{r.title[0]}</span>
                      </div>
                      <Badge className="!text-[10px]">Coming Soon</Badge>
                    </div>
                    <h4 className="text-sm font-semibold text-ink mb-1.5">{r.title}</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">{r.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
