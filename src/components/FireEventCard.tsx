import React from 'react';
import { X, Flame, Satellite, Clock, MapPin, Sparkles, ShieldCheck, ChevronRight, AlertCircle, Layers } from 'lucide-react';
import { FireFusionEvent } from '../types/fire';

interface FireEventCardProps {
  event: FireFusionEvent | null;
  onClose: () => void;
  onComparePerspectives?: () => void;
}

export const FireEventCard: React.FC<FireEventCardProps> = ({
  event,
  onClose,
  onComparePerspectives,
}) => {
  if (!event) return null;

  const { score_breakdown } = event;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0B1018] border border-white/15 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#9AA6B2] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close event panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="px-2.5 py-1 rounded bg-[#FFB000]/10 border border-[#FFB000]/30 text-[#FFB000] font-mono text-xs font-bold">
            {event.event_id}
          </div>
          <span className="text-xs font-mono text-[#55C98A] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#55C98A]" />
            HARMONIZED EVENT · {event.status}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
          {event.sensor_composition}
        </h3>

        {/* Coordinates and Timestamps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#111923] border border-white/5 text-xs font-mono mb-6">
          <div>
            <div className="text-[#9AA6B2] mb-1">CENTROID COORD</div>
            <div className="text-white font-medium">
              {event.centroid_lat.toFixed(4)}°, {event.centroid_lon.toFixed(4)}°
            </div>
          </div>
          <div>
            <div className="text-[#9AA6B2] mb-1">DURATION</div>
            <div className="text-white font-medium">{event.duration_minutes} min elapsed</div>
          </div>
          <div>
            <div className="text-[#9AA6B2] mb-1">OBSERVATIONS</div>
            <div className="text-[#FF6A2A] font-bold">{event.observation_count} points</div>
          </div>
          <div>
            <div className="text-[#9AA6B2] mb-1">PEAK FRP</div>
            <div className="text-white font-medium">{event.peak_frp_mw} MW</div>
          </div>
        </div>

        {/* Association Score Breakdown (Core Spec Requirement) */}
        <div className="p-5 rounded-xl bg-[#151F2B] border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-mono text-[#42A5FF] font-semibold">
                FIREFUSION PROTOTYPE ASSOCIATION SCORE
              </div>
              <div className="text-[11px] text-[#9AA6B2]">
                Methodology concordance (not official NASA percentage)
              </div>
            </div>
            <div className="text-2xl font-display font-extrabold text-white flex items-baseline gap-1">
              <span>{score_breakdown.total_score}</span>
              <span className="text-xs font-mono text-[#9AA6B2]">/ 100</span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3 text-xs font-mono">
            <div>
              <div className="flex justify-between text-[#9AA6B2] mb-1">
                <span>Spatial Compatibility (Separation: {score_breakdown.geographic_distance_km} km)</span>
                <span className="text-white">{score_breakdown.spatial_component} / 40</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-[#42A5FF] rounded-full transition-all duration-500"
                  style={{ width: `${(score_breakdown.spatial_component / 40) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#9AA6B2] mb-1">
                <span>Temporal Compatibility (Offset: {score_breakdown.temporal_difference_minutes} min)</span>
                <span className="text-white">{score_breakdown.temporal_component} / 30</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-[#55C98A] rounded-full transition-all duration-500"
                  style={{ width: `${(score_breakdown.temporal_component / 30) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#9AA6B2] mb-1">
                <span>Quality & Cross-Sensor Agreement</span>
                <span className="text-white">{score_breakdown.quality_component} / 20</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-[#FFB000] rounded-full transition-all duration-500"
                  style={{ width: `${(score_breakdown.quality_component / 20) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#9AA6B2] mb-1">
                <span>Supporting FRP Physics Consistency</span>
                <span className="text-white">{score_breakdown.frp_component} / 10</span>
              </div>
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="h-full bg-[#FF6A2A] rounded-full transition-all duration-500"
                  style={{ width: `${(score_breakdown.frp_component / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contributing Satellite Observations */}
        <div className="mb-6">
          <div className="text-xs font-mono text-[#9AA6B2] uppercase mb-2">
            CONTRIBUTING SATELLITE DETECTIONS ({event.observations.length})
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {event.observations.map((obs) => (
              <div
                key={obs.observation_id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#111923] border border-white/5 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      obs.sensor === 'MODIS' ? 'bg-[#FF4D3D]' : 'bg-[#A855F7]'
                    }`}
                  />
                  <span className="text-white font-medium">{obs.observation_id}</span>
                  <span className="text-[#9AA6B2]">
                    {obs.sensor} ({obs.satellite})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white">{obs.frp_mw} MW</span>
                  <span className="text-[#9AA6B2]">{obs.acquisition_time} UTC</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-[#42A5FF]">
                    {obs.confidence_native}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#9AA6B2]">
            <AlertCircle className="w-3.5 h-3.5 text-[#FFB547]" />
            <span>Harmonized ST-DBSCAN Event Envelope</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
