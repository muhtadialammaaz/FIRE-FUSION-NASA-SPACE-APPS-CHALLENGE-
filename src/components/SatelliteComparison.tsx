import React, { useState } from 'react';
import { Layers, Eye, CheckCircle2, Flame, Satellite, ArrowRight, Sparkles } from 'lucide-react';

export const SatelliteComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'MODIS' | 'VIIRS' | 'FUSED'>('FUSED');

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#42A5FF] uppercase tracking-wider mb-3">
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive Cross-Sensor Synthesis</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mb-4">
          One Event. Two Perspectives.
        </h2>
        <p className="text-base text-[#9AA6B2]">
          Toggle between MODIS, VIIRS, and FireFusion to inspect why harmonizing cross-satellite data produces superior event fidelity without forcing false numerical equality.
        </p>

        {/* View Mode Segmented Controls */}
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#111923] border border-white/10 mt-8">
          <button
            onClick={() => setViewMode('MODIS')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'MODIS'
                ? 'bg-[#FF4D3D] text-white shadow-lg shadow-[#FF4D3D]/30'
                : 'text-[#9AA6B2] hover:text-white'
            }`}
          >
            MODIS View (1 km)
          </button>
          <button
            onClick={() => setViewMode('VIIRS')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
              viewMode === 'VIIRS'
                ? 'bg-[#A855F7] text-white shadow-lg shadow-[#A855F7]/30'
                : 'text-[#9AA6B2] hover:text-white'
            }`}
          >
            VIIRS View (375 m)
          </button>
          <button
            onClick={() => setViewMode('FUSED')}
            className={`px-5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'FUSED'
                ? 'bg-gradient-to-r from-[#FF6A2A] to-[#FFB000] text-white shadow-lg shadow-[#FF6A2A]/30'
                : 'text-[#9AA6B2] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            FireFusion Fused View
          </button>
        </div>
      </div>

      {/* Comparison Canvas / Graphic */}
      <div className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 sm:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual simulation display */}
          <div className="lg:col-span-7 bg-[#05070B] rounded-xl border border-white/10 p-6 relative min-h-[380px] flex items-center justify-center">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Simulated Fire Scene */}
            <div className="relative w-full max-w-md h-[280px]">
              {/* Actual physical terrain fire line reference */}
              <div className="absolute top-[20%] left-[25%] w-[60%] h-[55%] border border-dashed border-white/20 rounded-full pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-mono text-white/30 uppercase">Physical Fire Front (Ground Truth)</span>
              </div>

              {/* MODIS Layer */}
              {(viewMode === 'MODIS' || viewMode === 'FUSED') && (
                <div className={`transition-all duration-500 ${viewMode === 'FUSED' ? 'opacity-70' : 'opacity-100'}`}>
                  {/* MODIS 1km broad footprint */}
                  <div className="absolute top-[28%] left-[32%] w-28 h-28 rounded-lg border-2 border-[#FF4D3D] bg-[#FF4D3D]/15 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-mono font-bold text-[#FF4D3D]">MODIS Aqua Pixel</span>
                    <span className="text-[9px] text-white font-mono">1.12 km &times; 1.05 km</span>
                    <span className="text-[9px] text-[#9AA6B2] mt-1">FRP: 76.2 MW</span>
                  </div>
                </div>
              )}

              {/* VIIRS Layer */}
              {(viewMode === 'VIIRS' || viewMode === 'FUSED') && (
                <div className={`transition-all duration-500 ${viewMode === 'FUSED' ? 'opacity-85' : 'opacity-100'}`}>
                  {/* VIIRS 375m points showing multi-spot line */}
                  <div className="absolute top-[32%] left-[34%] w-12 h-12 rounded border border-[#A855F7] bg-[#A855F7]/30 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-white">N21-1</span>
                  </div>
                  <div className="absolute top-[40%] left-[45%] w-12 h-12 rounded border border-[#A855F7] bg-[#A855F7]/30 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-white">N21-2</span>
                  </div>
                  <div className="absolute top-[52%] left-[55%] w-12 h-12 rounded border border-[#A855F7] bg-[#A855F7]/30 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-white">N21-3</span>
                  </div>
                  {/* NOAA-20 passing later */}
                  <div className="absolute top-[36%] left-[41%] w-14 h-14 rounded border border-[#C084FC] bg-[#C084FC]/25 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-white">N20</span>
                  </div>
                </div>
              )}

              {/* Harmonized Envelope */}
              {viewMode === 'FUSED' && (
                <div className="absolute top-[22%] left-[28%] w-[62%] h-[60%] rounded-2xl border-2 border-[#FFB000] bg-[#FFB000]/10 flex flex-col justify-between p-3 pointer-events-none animate-pulse">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#FFB000] bg-black/60 px-1.5 py-0.5 rounded">
                      FIREFUSION EVENT #FF-000847
                    </span>
                    <span className="text-[9px] font-mono text-[#55C98A] bg-black/60 px-1.5 py-0.5 rounded">
                      Confidence 92%
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-white/90 bg-black/70 p-1.5 rounded">
                    Harmonized 4 observations (1 MODIS + 3 VIIRS) across 51-min window
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#9AA6B2] bg-[#111923]/80 px-3 py-1.5 rounded-lg border border-white/5">
              <span>Sensor: {viewMode === 'FUSED' ? 'Multi-Sensor Harmonized' : viewMode}</span>
              <span className="text-white">Spatial Scale: {viewMode === 'MODIS' ? '1 km nominal' : viewMode === 'VIIRS' ? '375 m nadir' : 'Multiscale Enclosing Envelope'}</span>
            </div>
          </div>

          {/* Explanation panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-[#FFB000] uppercase font-bold tracking-wider">
              {viewMode === 'MODIS' && 'MODIS Observation Profile'}
              {viewMode === 'VIIRS' && 'VIIRS Observation Profile'}
              {viewMode === 'FUSED' && 'FireFusion Harmonized Intelligence'}
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              {viewMode === 'MODIS' && 'Broad Regional Energy Radiative View'}
              {viewMode === 'VIIRS' && 'High Resolution Detection of Fire Fronts'}
              {viewMode === 'FUSED' && 'Unified Fire Event Geometry & Temporal Record'}
            </h3>

            <p className="text-sm text-[#9AA6B2] leading-relaxed">
              {viewMode === 'MODIS' &&
                'MODIS captures total pixel-integrated Fire Radiative Power (76.2 MW) across a 1 km grid, but cannot resolve whether the energy originates from a single large crown blaze or several discrete flaming fronts.'}
              {viewMode === 'VIIRS' &&
                'VIIRS separates the event into 3 individual 375 m detections advancing southeast, confirming active flame front spread during both NOAA-21 (16:42 UTC) and NOAA-20 (17:33 UTC) overpasses.'}
              {viewMode === 'FUSED' &&
                'FireFusion associates both sensor records into Event #FF-000847. By cross-referencing spatial centroids and temporal overpass physics, users see both fine-scale flaming perimeters and robust multi-satellite validation.'}
            </p>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-[#9AA6B2]">
                <span>Spatial Discrepancy:</span>
                <span className="text-white">0.82 km (compatible with 1 km pixel scale)</span>
              </div>
              <div className="flex items-center justify-between text-[#9AA6B2]">
                <span>Temporal Window:</span>
                <span className="text-white">51 min (16:42 UTC to 17:33 UTC)</span>
              </div>
              <div className="flex items-center justify-between text-[#9AA6B2]">
                <span>Prototype Association Score:</span>
                <span className="text-[#55C98A] font-bold">92 / 100 (High Concordance)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
