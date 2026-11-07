import React from 'react';
import { AlertTriangle, Cloud, Clock, Compass, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const ScientificLimitations: React.FC = () => {
  return (
    <section id="methodology" className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFB547] uppercase tracking-wider mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Scientific Disclaimers & Integrity</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Never Make the UI More Certain Than the Data Is.
        </h2>
        <p className="text-base text-[#9AA6B2]">
          Scientific integrity is our primary design tenet. FireFusion rigorously outlines Earth observation sampling constraints rather than disguising uncertainty behind cosmetic animations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Limitation 1: Cloud & Smoke */}
        <div className="p-5 rounded-2xl bg-[#0B1018] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#42A5FF] mb-3">
              <Cloud className="w-4 h-4" />
              <span>CLOUD & SMOKE OBSCURATION</span>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Absence of Detection &ne; Absence of Fire
            </h3>
            <p className="text-xs text-[#9AA6B2] leading-relaxed">
              Optical and infrared active-fire sensors cannot penetrate thick clouds, convective storm fronts, or dense smoke pyrocumulonimbus plumes. Zero detections over a region does not certify that no burning is occurring.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9AA6B2]">
            Rule: Qualified as &quot;satellite-detected active-fire&quot;
          </div>
        </div>

        {/* Limitation 2: Temporal Sampling */}
        <div className="p-5 rounded-2xl bg-[#0B1018] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#55C98A] mb-3">
              <Clock className="w-4 h-4" />
              <span>TEMPORAL OVERPASS SAMPLING</span>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Discrete Overpass Snapshots
            </h3>
            <p className="text-xs text-[#9AA6B2] leading-relaxed">
              Sun-synchronous polar orbiters detect fires only during their orbital overhead window. An event duration reported by FireFusion reflects the interval between available observations, not the ground ignition or extinguishment timestamp.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9AA6B2]">
            Rule: Disclose overpass interval bounds
          </div>
        </div>

        {/* Limitation 3: Resolution & FRP */}
        <div className="p-5 rounded-2xl bg-[#0B1018] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF6A2A] mb-3">
              <Compass className="w-4 h-4" />
              <span>SPATIAL SCALE & FRP RETRIEVAL</span>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              1 km MODIS vs 375 m VIIRS
            </h3>
            <p className="text-xs text-[#9AA6B2] leading-relaxed">
              FRP is a pixel-integrated measurement sensitive to spatial resolution and sub-pixel fire temperature. MODIS and VIIRS FRP cannot be assumed equal; differences represent retrieval physics, not sensor errors.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9AA6B2]">
            Rule: Preserve raw native FRP
          </div>
        </div>

        {/* Limitation 4: Association Score */}
        <div className="p-5 rounded-2xl bg-[#0B1018] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFB000] mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span>ASSOCIATION SCORE NATURE</span>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Concordance &ne; NASA Probability
            </h3>
            <p className="text-xs text-[#9AA6B2] leading-relaxed">
              The 0–100 FireFusion Prototype Association Score evaluates spatiotemporal and quality compatibility. It is never presented as official NASA detection certainty or ground truth accuracy.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9AA6B2]">
            Rule: Label &quot;FireFusion Prototype Metric&quot;
          </div>
        </div>

        {/* Limitation 5: Anomaly vs Prediction */}
        <div className="p-5 rounded-2xl bg-[#0B1018] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A855F7] mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>PROTOTYPE ANOMALY DETECTION</span>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Statistical Anomaly &ne; Fire Forecast
            </h3>
            <p className="text-xs text-[#9AA6B2] leading-relaxed">
              Calendar anomaly scores gauge whether observed active fire counts and FRP are unusually elevated relative to an available historical baseline. It is not a predictive forecast of future wildfire occurrence.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9AA6B2]">
            Rule: State historical deviation only
          </div>
        </div>

        {/* Limitation 6: Spatial Boundaries */}
        <div className="p-5 rounded-2xl bg-[#0B1018] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00D9FF] mb-3">
              <FileText className="w-4 h-4" />
              <span>CENTROID APPROXIMATION</span>
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Pixel Footprints &ne; Fire Perimeter
            </h3>
            <p className="text-xs text-[#9AA6B2] leading-relaxed">
              FIRMS coordinates mark the radiometric detector pixel center. FireFusion bounding envelopes represent analytical clusters of these centers, not ground-surveyed burn perimeters.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#9AA6B2]">
            Rule: Use &quot;cluster envelope&quot; label
          </div>
        </div>
      </div>
    </section>
  );
};
