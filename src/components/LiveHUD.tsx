import React from 'react';
import { Satellite, ShieldAlert, CheckCircle2, Flame, Info, Database, Sparkles } from 'lucide-react';
import { DatasetProvenance } from '../types/fire';

interface LiveHUDProps {
  provenance: DatasetProvenance;
  modisLoaded: boolean;
  onToggleModis: () => void;
  totalEvents: number;
  totalObs: number;
  meanAssociationScore: number;
}

export const LiveHUD: React.FC<LiveHUDProps> = ({
  provenance,
  modisLoaded,
  onToggleModis,
  totalEvents,
  totalObs,
  meanAssociationScore,
}) => {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 py-6 -mt-4">
      <div className="rounded-2xl bg-[#0B1018]/90 border border-white/10 p-5 md:p-6 backdrop-blur-xl shadow-2xl">
        {/* Top bar with Data Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#55C98A]/10 border border-[#55C98A]/30 text-xs font-mono text-[#55C98A]">
              <span className="w-2 h-2 rounded-full bg-[#55C98A] animate-pulse" />
              <span>NASA FIRMS DATA — LOADED</span>
            </div>
            <span className="text-xs text-[#9AA6B2] hidden sm:inline">
              Collection 2 & C6.1 Standard / NRT
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#9AA6B2]">PROVENANCE:</span>
            <span className="text-white font-medium">13.99M Raw Records Cataloged</span>
            <span className="text-white/20">|</span>
            <span className="text-[#55C98A]">30 Duplicates Resolved</span>
          </div>
        </div>

        {/* 4 Main Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5">
          {/* Satellites */}
          <div className="p-3.5 rounded-xl bg-[#111923] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1 flex items-center justify-between">
              <span>SATELLITES MONITORED</span>
              <Satellite className="w-3.5 h-3.5 text-[#42A5FF]" />
            </div>
            <div className="text-xl font-display font-bold text-white flex items-center gap-2">
              <span>{modisLoaded ? '4 SENSORS' : '2 SENSORS'}</span>
            </div>
            <div className="text-[11px] text-[#9AA6B2] mt-1 flex items-center gap-2">
              <span className="text-[#A855F7] font-mono">VIIRS N20/N21</span>
              <span>·</span>
              <span className={modisLoaded ? 'text-[#FF4D3D] font-mono' : 'text-white/40 font-mono'}>
                {modisLoaded ? 'MODIS T/A' : 'MODIS Ingestible'}
              </span>
            </div>
          </div>

          {/* Active Observations */}
          <div className="p-3.5 rounded-xl bg-[#111923] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1 flex items-center justify-between">
              <span>ACTIVE DETECTIONS</span>
              <Database className="w-3.5 h-3.5 text-[#55C98A]" />
            </div>
            <div className="text-xl font-display font-bold text-white">
              {totalObs.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#9AA6B2] mt-1">
              Active fire hotspots in working window
            </div>
          </div>

          {/* Harmonized Events */}
          <div className="p-3.5 rounded-xl bg-[#111923] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1 flex items-center justify-between">
              <span>HARMONIZED EVENTS</span>
              <Flame className="w-3.5 h-3.5 text-[#FFB000]" />
            </div>
            <div className="text-xl font-display font-bold text-[#FFB000]">
              {totalEvents}
            </div>
            <div className="text-[11px] text-[#9AA6B2] mt-1">
              Multi-observation ST clusters
            </div>
          </div>

          {/* Association Confidence Score */}
          <div className="p-3.5 rounded-xl bg-[#111923] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1 flex items-center justify-between">
              <span>ASSOCIATION SCORE</span>
              <Sparkles className="w-3.5 h-3.5 text-[#42A5FF]" />
            </div>
            <div className="text-xl font-display font-bold text-white flex items-baseline gap-1">
              <span>{meanAssociationScore}</span>
              <span className="text-xs font-mono text-[#9AA6B2]">/ 100</span>
            </div>
            <div className="text-[11px] text-[#42A5FF] mt-1">
              FireFusion Prototype Metric
            </div>
          </div>
        </div>

        {/* Scientific Transparency Bottom Note */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9AA6B2]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#FFB547] shrink-0" />
            <span>
              <strong>Scientific Data Provenance:</strong> Native NASA FIRMS observations and confidence values are preserved verbatim. The 0–100 association metric and event groupings are FireFusion-derived analytical outputs, not official NASA forecasts or accuracy percentages.
            </span>
          </div>

          <button
            onClick={onToggleModis}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 border ${
              modisLoaded
                ? 'bg-[#FF4D3D]/10 text-[#FF4D3D] border-[#FF4D3D]/30 hover:bg-[#FF4D3D]/20'
                : 'bg-white/5 text-white border-white/15 hover:bg-white/10 hover:border-white/25'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>{modisLoaded ? 'Unload MODIS C6.1' : 'Simulate MODIS C6.1 Load'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
