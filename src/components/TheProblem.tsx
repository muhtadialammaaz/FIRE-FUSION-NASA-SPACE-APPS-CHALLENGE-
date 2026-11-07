import React from 'react';
import { Satellite, ArrowRight, AlertTriangle, Layers, Clock, Eye, Sparkles } from 'lucide-react';

export const TheProblem: React.FC = () => {
  return (
    <section id="problem" className="relative max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF6A2A] uppercase tracking-wider mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>The Core NASA Space Apps Challenge Problem</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-5">
          Two Satellites.<br />
          One Planet.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2A] to-[#FFB000]">
            Different Observations.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AA6B2] leading-relaxed">
          Satellite active-fire records extend across more than two decades, but the record is fragmented
          across sensors whose observations cannot simply be compared directly. Differences in spatial
          resolution, overpass times, and algorithm retrievals create disjointed pictures of the same
          wildfire.
        </p>
      </div>

      {/* Side-by-side cards with Harmonization Challenge bridge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* MODIS Card */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0B1018] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF4D3D]/30 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D3D]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#FF4D3D] font-semibold px-2 py-0.5 rounded bg-[#FF4D3D]/10 border border-[#FF4D3D]/20">
                MODIS INSTRUMENT
              </span>
              <span className="text-xs text-[#9AA6B2] font-mono">Terra & Aqua</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Moderate Resolution Imaging Spectroradiometer
            </h3>
            <p className="text-sm text-[#9AA6B2] mb-6">
              The foundational multi-decadal Earth observation backbone operating since 2000 (Terra) and 2002 (Aqua).
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111923] border border-white/5">
                <Eye className="w-4 h-4 text-[#FF4D3D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Nominal 1 km Spatial Resolution</div>
                  <div className="text-[#9AA6B2] mt-0.5">Pixel size grows toward scan edge; coordinates represent pixel centroid, not exact flame perimeter.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111923] border border-white/5">
                <Clock className="w-4 h-4 text-[#FF4D3D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Daily Overpasses (10:30 & 13:30 Local)</div>
                  <div className="text-[#9AA6B2] mt-0.5">Morning Terra equator cross and afternoon Aqua equator cross leave large temporal windows undetected.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111923] border border-white/5">
                <Sparkles className="w-4 h-4 text-[#FF4D3D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Native 0–100% Quality Metric</div>
                  <div className="text-[#9AA6B2] mt-0.5">NASA official classes: Low (&lt;30%), Nominal (30–79%), High (80–100%).</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Product: MOD14 / MYD14 / MCD14DL</span>
            <span className="text-[#FF4D3D]">Collection 6.1</span>
          </div>
        </div>

        {/* Center Challenge Bridge */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-6 lg:py-0">
          <div className="w-full flex lg:flex-col items-center justify-center gap-3">
            <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-[#FF6A2A] to-transparent" />
            
            <div className="px-3.5 py-2 rounded-xl bg-[#151F2B] border border-[#FF6A2A]/40 text-center shadow-lg shadow-[#FF6A2A]/10">
              <span className="text-[10px] font-mono text-[#FF6A2A] block uppercase font-bold tracking-wider">
                HARMONIZATION
              </span>
              <span className="text-xs font-semibold text-white">
                CHALLENGE
              </span>
            </div>

            <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-[#FF6A2A] to-transparent" />
          </div>

          <div className="mt-4 text-center text-xs text-[#9AA6B2] max-w-[170px] hidden lg:block">
            Different resolutions &times; different overpasses &times; uncalibrated raw points
          </div>
        </div>

        {/* VIIRS Card */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0B1018] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#A855F7]/30 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#A855F7] font-semibold px-2 py-0.5 rounded bg-[#A855F7]/10 border border-[#A855F7]/20">
                VIIRS INSTRUMENT
              </span>
              <span className="text-xs text-[#9AA6B2] font-mono">NOAA-20 & NOAA-21</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Visible Infrared Imaging Radiometer Suite
            </h3>
            <p className="text-sm text-[#9AA6B2] mb-6">
              High-resolution modern sensor constellation on Suomi-NPP, NOAA-20, and NOAA-21 (~50 min orbital offset).
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111923] border border-white/5">
                <Eye className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Nominal 375 m I-Band Resolution</div>
                  <div className="text-[#9AA6B2] mt-0.5">3&times; higher spatial resolution at nadir; detects smaller, cooler fires missed by MODIS.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111923] border border-white/5">
                <Clock className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">50-Minute Constellation Lead Time</div>
                  <div className="text-[#9AA6B2] mt-0.5">NOAA-21 flies ~50 mins ahead of NOAA-20; observations are complementary, not duplicates.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111923] border border-white/5">
                <Sparkles className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Categorical Quality Indicator</div>
                  <div className="text-[#9AA6B2] mt-0.5">Official classes: &apos;l&apos; (low), &apos;n&apos; (nominal), &apos;h&apos; (high) — never converted to fake percentages.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Product: J1V-C2 / J2V-C2</span>
            <span className="text-[#A855F7]">Collection 2</span>
          </div>
        </div>
      </div>
    </section>
  );
};
