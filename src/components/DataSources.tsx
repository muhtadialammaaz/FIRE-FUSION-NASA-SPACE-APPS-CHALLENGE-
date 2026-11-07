import React from 'react';
import { Database, Satellite, ExternalLink, Calendar, Layers, ShieldCheck } from 'lucide-react';

export const DataSources: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF6A2A] uppercase tracking-wider mb-2">
          <Database className="w-3.5 h-3.5" />
          <span>Official Earth Observation Assets</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Built on Earth Observation Data.
        </h2>
        <p className="text-base text-[#9AA6B2]">
          FireFusion operates directly upon official NASA FIRMS active fire datasets, adhering strictly to NASA Earth Science documentation and standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MODIS Card */}
        <div className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#FF4D3D] font-bold px-2 py-0.5 rounded bg-[#FF4D3D]/10 border border-[#FF4D3D]/30">
                MODIS COLLECTION 6.1
              </span>
              <span className="text-xs font-mono text-[#9AA6B2]">Terra & Aqua</span>
            </div>

            <h3 className="font-display text-xl font-bold text-white mb-2">
              MOD14 / MYD14 / MCD14DL
            </h3>
            <p className="text-xs text-[#9AA6B2] mb-5 leading-relaxed">
              Provides the multi-decadal scientific foundation for historical burning calendars, operating continuously since November 2000 (Terra) and July 2002 (Aqua).
            </p>

            <div className="space-y-2 text-xs font-mono text-[#9AA6B2] border-t border-white/5 pt-4">
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span className="text-white">1 km nominal</span>
              </div>
              <div className="flex justify-between">
                <span>Equator Cross:</span>
                <span className="text-white">10:30 & 13:30 Local</span>
              </div>
              <div className="flex justify-between">
                <span>Confidence:</span>
                <span className="text-white">0–100% Algorithm Metric</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Source: NASA FIRMS</span>
            <span className="text-[#FF4D3D]">Tier 1 Official</span>
          </div>
        </div>

        {/* VIIRS Card */}
        <div className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#A855F7] font-bold px-2 py-0.5 rounded bg-[#A855F7]/10 border border-[#A855F7]/30">
                VIIRS COLLECTION 2
              </span>
              <span className="text-xs font-mono text-[#9AA6B2]">NOAA-20 & NOAA-21</span>
            </div>

            <h3 className="font-display text-xl font-bold text-white mb-2">
              J1V-C2 & J2V-C2 Active Fire
            </h3>
            <p className="text-xs text-[#9AA6B2] mb-5 leading-relaxed">
              Supplied primary package containing 13.99 million cataloged observations across 2026. Features 375 m nadir resolution and high nighttime flame sensitivity.
            </p>

            <div className="space-y-2 text-xs font-mono text-[#9AA6B2] border-t border-white/5 pt-4">
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span className="text-white">375 m I-band</span>
              </div>
              <div className="flex justify-between">
                <span>Constellation Lead:</span>
                <span className="text-white">NOAA-21 is ~50 min ahead</span>
              </div>
              <div className="flex justify-between">
                <span>Confidence:</span>
                <span className="text-white">Categorical ('l', 'n', 'h')</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Source: NASA FIRMS</span>
            <span className="text-[#A855F7]">Tier 1 Official</span>
          </div>
        </div>

        {/* Future Integrations Card */}
        <div className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#42A5FF] font-bold px-2 py-0.5 rounded bg-[#42A5FF]/10 border border-[#42A5FF]/30">
                FUTURE INTEGRATIONS
              </span>
              <span className="text-xs font-mono text-[#9AA6B2]">Roadmap</span>
            </div>

            <h3 className="font-display text-xl font-bold text-white mb-2">
              Environmental Context Layers
            </h3>
            <p className="text-xs text-[#9AA6B2] mb-5 leading-relaxed">
              Prospective scientific integrations to enhance event context without compromising core observation purity.
            </p>

            <div className="space-y-2 text-xs font-mono text-[#9AA6B2] border-t border-white/5 pt-4">
              <div className="flex justify-between">
                <span>Weather & Winds:</span>
                <span className="text-white">ERA5 / GFS Reanalysis</span>
              </div>
              <div className="flex justify-between">
                <span>Vegetation Index:</span>
                <span className="text-white">MODIS NDVI (MOD13)</span>
              </div>
              <div className="flex justify-between">
                <span>Fuel Moisture:</span>
                <span className="text-white">SMAP Soil Moisture</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Status: Research Roadmap</span>
            <span className="text-[#42A5FF]">Unbundled</span>
          </div>
        </div>
      </div>
    </section>
  );
};
