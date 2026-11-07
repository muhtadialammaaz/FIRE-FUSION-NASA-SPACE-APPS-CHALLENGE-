import React from 'react';
import { Shield, Trees, Compass, CloudSun, Users, ArrowRight } from 'lucide-react';

export const WhyItMatters: React.FC = () => {
  const useCases = [
    {
      title: 'Emergency Awareness & Response',
      desc: 'Rapidly reconcile multi-satellite fire hotspots into cohesive fire envelopes to gauge spread velocity across satellite passes without waiting for single-sensor updates.',
      icon: Shield,
      color: '#FF6A2A',
    },
    {
      title: 'Environmental & Habitat Monitoring',
      desc: 'Track recurring fire scars and late dry-season fire encroachment across high-biodiversity biomes such as the Pantanal wetlands and Cerrado savannas.',
      icon: Trees,
      color: '#55C98A',
    },
    {
      title: 'Earth Science & Algorithm Research',
      desc: 'Investigate cross-sensor retrieval dynamics between 1 km MODIS and 375 m VIIRS without masking underlying sensor physics behind opaque black-box models.',
      icon: Compass,
      color: '#42A5FF',
    },
    {
      title: 'Biomass Burning & Carbon Budgets',
      desc: 'Provide verified, deduplicated active fire event counts and integrated radiative power timelines to climate modelers estimating pyrogenic emissions.',
      icon: CloudSun,
      color: '#FFB000',
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#55C98A] uppercase tracking-wider mb-2">
          <span>Operational & Scientific Value</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Better Fire Information.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#9AA6B2]">
            Better Decisions.
          </span>
        </h2>
        <p className="text-base text-[#9AA6B2]">
          Designed for researchers, conservation rangers, climate scientists, and emergency analysts navigating fragmented satellite archives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((uc) => {
          const Icon = uc.icon;
          return (
            <div
              key={uc.title}
              className="p-6 rounded-2xl bg-[#0B1018] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${uc.color}15`,
                    color: uc.color,
                    border: `1px solid ${uc.color}35`,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">{uc.title}</h3>
                <p className="text-xs text-[#9AA6B2] leading-relaxed mb-6">{uc.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
                <span>Domain Application</span>
                <span style={{ color: uc.color }}>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scope Disclaimer per spec */}
      <div className="mt-8 p-4 rounded-xl bg-[#111923] border border-white/5 text-xs font-mono text-[#9AA6B2] flex items-center gap-2">
        <span className="text-[#FFB547] font-bold">OPERATIONAL NOTICE:</span>
        <span>
          FireFusion is an analytical research and exploratory intelligence platform. It does not replace tactical emergency dispatch systems or local fire agency commands.
        </span>
      </div>
    </section>
  );
};
