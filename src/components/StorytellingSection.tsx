import React, { useState } from 'react';
import { Satellite, Globe, Flame, Layers, GitMerge, CheckCircle2, ChevronRight } from 'lucide-react';

export const StorytellingSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    {
      label: 'SATELLITE PASS',
      title: 'Constellation Equatorial Overpasses',
      desc: 'NOAA-20, NOAA-21, Terra, and Aqua orbit Earth in sun-synchronous polar orbits, scanning the ground with radiometric sensors across infrared bands.',
      icon: Satellite,
      color: '#42A5FF',
    },
    {
      label: 'EARTH SCAN',
      title: 'Thermal Radiative Detection',
      desc: 'Mid-infrared (3.9–4.0 µm) and thermal (10–12 µm) channels register intense surface brightness temperatures exceeding background forest levels.',
      icon: Globe,
      color: '#55C98A',
    },
    {
      label: 'MULTIPLE DETECTIONS',
      title: 'Discordant Satellite Hotspots',
      desc: 'VIIRS flags three 375m pixels along a flaming front; MODIS registers a broad 1km hotspot with 76 MW radiative power at an adjacent centroid.',
      icon: Flame,
      color: '#FF6A2A',
    },
    {
      label: 'FUSION & CLUSTERING',
      title: 'FireFusion Harmonization Engine',
      desc: 'Spatial distance (<3 km) and orbital offset (<90 min) satisfy association criteria; observations coalesce into a single unified FireFusion Event.',
      icon: GitMerge,
      color: '#FFB000',
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl bg-[#0B1018] border border-white/10 p-8 sm:p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6A2A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFB000] uppercase tracking-wider mb-2">
            <span>Visual Narrative</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            From Orbit to Ground Intelligence.
          </h2>
          <p className="text-base text-[#9AA6B2]">
            Follow the physical and algorithmic lifecycle of an active fire detection.
          </p>
        </div>

        {/* Narrative Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isSelected = currentStep === i;
            return (
              <div
                key={st.label}
                onClick={() => setCurrentStep(i)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#151F2B] border-white/30 shadow-xl scale-[1.02]'
                    : 'bg-[#111923] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${st.color}20`,
                      color: st.color,
                      border: `1px solid ${st.color}40`,
                    }}
                  >
                    PHASE 0{i + 1}
                  </span>
                  <Icon
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    style={{ color: st.color }}
                  />
                </div>

                <div className="text-xs font-mono text-white font-bold mb-1.5">{st.label}</div>
                <h3 className="font-display text-sm font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Narrative Insight Footer */}
        <div className="p-4 rounded-xl bg-[#111923] border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#9AA6B2]">
            <CheckCircle2 className="w-4 h-4 text-[#55C98A]" />
            <span>Harmonized result: Consolidated into the Burning Activity Calendar and regional risk baselines.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9AA6B2]">Active Phase:</span>
            <span className="text-white font-bold">{steps[currentStep].title}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
