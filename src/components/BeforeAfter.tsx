import React from 'react';
import { ArrowRight, Flame, Layers, AlertCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#55C98A] uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Transformation Architecture</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
          Before & After Harmonization.
        </h2>
        <p className="text-base text-[#9AA6B2]">
          See how raw disjointed satellite detections transform into a coherent, quality-scored FireFusion event.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* BEFORE CARD */}
        <div className="rounded-2xl bg-[#0B1018] border border-red-500/20 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-red-400 font-bold px-2 py-0.5 rounded bg-red-400/10 border border-red-400/20">
                BEFORE · UNHARMONIZED OBSERVATIONS
              </span>
              <span className="text-xs font-mono text-[#9AA6B2]">4 Disparate Points</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Fragmented Spatial & Temporal Detections
            </h3>
            <p className="text-sm text-[#9AA6B2] mb-6">
              Individual satellite passes provide discordant coordinates, diverging resolutions, and isolated confidence ratings that overwhelm analysts.
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#111923] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">VIIRS NOAA-21 (16:42 UTC)</div>
                  <div className="text-[#9AA6B2] text-[11px]">-17.3821°, -56.4912° · 84.6 MW</div>
                </div>
                <span className="text-[#A855F7] px-2 py-0.5 rounded bg-white/5">High ('h')</span>
              </div>

              <div className="p-3 rounded-lg bg-[#111923] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">MODIS Aqua (17:15 UTC)</div>
                  <div className="text-[#9AA6B2] text-[11px]">-17.3840°, -56.4900° · 76.2 MW</div>
                </div>
                <span className="text-[#FF4D3D] px-2 py-0.5 rounded bg-white/5">92% C6.1</span>
              </div>

              <div className="p-3 rounded-lg bg-[#111923] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">VIIRS NOAA-20 (17:33 UTC)</div>
                  <div className="text-[#9AA6B2] text-[11px]">-17.3835°, -56.4898° · 91.2 MW</div>
                </div>
                <span className="text-[#C084FC] px-2 py-0.5 rounded bg-white/5">High ('h')</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Problem: Analyst must manually cross-reference 3 platforms, time offsets, and 1km vs 375m scale mismatches.</span>
          </div>
        </div>

        {/* AFTER CARD */}
        <div className="rounded-2xl bg-[#0B1018] border border-[#FFB000]/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-[#FFB000]/5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#FFB000] font-bold px-2 py-0.5 rounded bg-[#FFB000]/10 border border-[#FFB000]/30">
                AFTER · FIREFUSION HARMONIZED EVENT
              </span>
              <span className="text-xs font-mono text-[#55C98A] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Event #FF-000847
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Unified Fire Intelligence Object
            </h3>
            <p className="text-sm text-[#9AA6B2] mb-6">
              Spatiotemporally clustered, multi-satellite validated event with transparent concordance scoring and continuous activity envelope.
            </p>

            <div className="p-4 rounded-xl bg-[#151F2B] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#9AA6B2]">Event Duration:</span>
                <span className="text-white font-medium">51 minutes (16:42 &rarr; 17:33 UTC)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9AA6B2]">Sensor Concordance:</span>
                <span className="text-white font-medium">MODIS + VIIRS (Aqua, N20, N21)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9AA6B2]">Peak Radiative Power:</span>
                <span className="text-[#FF6A2A] font-bold">91.2 MW (at 17:33 UTC)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9AA6B2]">FireFusion Association Score:</span>
                <span className="text-[#55C98A] font-bold">92 / 100 (Validated Pair Match)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#55C98A] flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#FFB000]" />
            <span>Outcome: Single actionable fire event ready for decision makers and the Burning Activity Calendar.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
