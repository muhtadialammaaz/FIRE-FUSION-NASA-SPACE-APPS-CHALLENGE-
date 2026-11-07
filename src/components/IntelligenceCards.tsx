import React from 'react';
import { Flame, Compass, Clock, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const IntelligenceCards: React.FC = () => {
  const cards = [
    {
      title: 'FIRE EVENTS',
      subtitle: 'Physical Event Grouping',
      desc: 'Transforms fragmented active fire pixels into persistent, bounded wildfire complexes with defined start, duration, and burnout trajectories.',
      icon: Flame,
      color: '#FF6A2A',
      stat: 'Multi-Sensor Clusters',
    },
    {
      title: 'SPATIAL MATCHING',
      subtitle: 'Geodesic Proximity Engine',
      desc: 'Computes geodesic distance between pixel centroids while accounting for off-nadir distortion and the ~1 km (MODIS) vs ~375 m (VIIRS) resolution discrepancy.',
      icon: Compass,
      color: '#42A5FF',
      stat: 'Haversine Footprints',
    },
    {
      title: 'TEMPORAL MATCHING',
      subtitle: 'Orbital Overpass Windows',
      desc: 'Correlates observations detected in close temporal succession, leveraging NOAA-21’s ~50-minute lead time ahead of NOAA-20 and Terra/Aqua passes.',
      icon: Clock,
      color: '#55C98A',
      stat: 'UTC Chrono Correlation',
    },
    {
      title: 'CONFIDENCE & PROVENANCE',
      subtitle: '4-Factor Concordance Metric',
      desc: 'Provides a transparent 0–100 association score assessing spatial, temporal, quality, and FRP physics concordance without obscuring native NASA metadata.',
      icon: ShieldCheck,
      color: '#FFB000',
      stat: '0–100 Transparent Score',
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Synthesis Capabilities</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Raw observations become useful intelligence.
        </h2>
        <p className="text-base text-[#9AA6B2]">
          Four core algorithmic foundations turn scattered fire points into structured, interpretable situational awareness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all hover:-translate-y-1 group"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${c.color}15`,
                    color: c.color,
                    border: `1px solid ${c.color}35`,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">{c.subtitle}</div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-xs text-[#9AA6B2] leading-relaxed mb-6">{c.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
                <span className="text-white font-medium">{c.stat}</span>
                <span style={{ color: c.color }}>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
