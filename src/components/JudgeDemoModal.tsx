import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Satellite, Flame, Layers, Calendar, ChevronRight } from 'lucide-react';
import { FireFusionEvent, AreaOfInterest } from '../types/fire';

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: FireFusionEvent) => void;
  onSelectAoi: (aoiId: string) => void;
  sampleEvent: FireFusionEvent;
  modisLoaded: boolean;
  onToggleModis: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
  onSelectAoi,
  sampleEvent,
  modisLoaded,
  onToggleModis,
  onScrollToSection,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. What is the Problem?',
      kicker: 'FRAGMENTED OBSERVATIONS',
      description:
        'Satellites pass Earth at different times and resolutions (MODIS ~1 km vs VIIRS ~375 m). For the same wildfire front, analysts receive multiple conflicting points with different timestamps and discordant FRP values.',
      actionLabel: 'Inspect Regional Hotspots &rarr;',
      action: () => {
        onSelectAoi('pantanal_amazon');
        onScrollToSection('fire-map');
      },
    },
    {
      title: '2. Multi-Sensor Data Ingest',
      kicker: 'NOAA-20, NOAA-21 & MODIS',
      description:
        'FireFusion ingests official NASA FIRMS records. NOAA-21 provides 375m lead detections, NOAA-20 follows 51 minutes later, and MODIS provides the multi-decadal standard baseline.',
      actionLabel: modisLoaded ? 'MODIS C6.1 Already Active' : 'Enable MODIS C6.1 Benchmark',
      action: () => {
        if (!modisLoaded) onToggleModis();
      },
    },
    {
      title: '3. ST-DBSCAN Event Harmonization',
      kicker: 'SPATIAL-TEMPORAL CLUSTERING',
      description:
        'Our algorithm correlates detections within 3.0 km and 90 min overpass windows. Fragmented detections coalesce into a single unified FireFusion Event: #FF-000847.',
      actionLabel: 'Open Event Intelligence Panel &rarr;',
      action: () => {
        onSelectEvent(sampleEvent);
      },
    },
    {
      title: '4. Transparent Concordance Scoring',
      kicker: 'NO FAKE CERTAINTY',
      description:
        'Instead of opaque black-box accuracy claims, FireFusion computes a transparent 4-part score (Spatial 34/40, Temporal 27/30, Quality 16/20, FRP 8/10 = 85/100). Native NASA fields are preserved unchanged.',
      actionLabel: 'Review Before & After &rarr;',
      action: () => {
        onScrollToSection('harmonization');
      },
    },
    {
      title: '5. The Burning Activity Calendar',
      kicker: 'CORE CHALLENGE DELIVERABLE',
      description:
        'Harmonized events aggregate into daily, weekly, and monthly activity matrices with baseline deviation and Prototype Anomaly Detection for long-term monitoring.',
      actionLabel: 'Jump to Burning Calendar &rarr;',
      action: () => {
        onScrollToSection('calendar');
      },
    },
    {
      title: '6. About the Challenge & Team',
      kicker: 'GLOBAL SYNTHETIC SQUAD (G.S.S)',
      description:
        'Review the complete project context, NASA Space Apps Challenge 2026 problem statement, and meet the Global Synthetic Squad team members.',
      actionLabel: 'View About FireFusion & Team &rarr;',
      action: () => {
        onScrollToSection('about');
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0B1018] border border-white/20 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#9AA6B2] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close walkthrough"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1 rounded bg-[#FF6A2A]/20 text-[#FF6A2A]">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono text-[#FF6A2A] font-bold tracking-wider">
            NASA SPACE APPS 2026 JUDGE WALKTHROUGH
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-1">
          {steps[currentStep].title}
        </h3>
        <div className="text-xs font-mono text-[#42A5FF] mb-4">
          STEP {currentStep + 1} OF {steps.length} &middot; {steps[currentStep].kicker}
        </div>

        <p className="text-sm text-[#9AA6B2] leading-relaxed mb-6">
          {steps[currentStep].description}
        </p>

        {/* Action Trigger Button */}
        <div className="mb-6">
          <button
            onClick={() => steps[currentStep].action()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#151F2B] hover:bg-[#1C2939] border border-[#FF6A2A]/30 text-white text-xs font-mono font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{steps[currentStep].actionLabel}</span>
          </button>
        </div>

        {/* Navigation Dots & Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentStep === i ? 'bg-[#FF6A2A] w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9AA6B2] hover:text-white transition-colors"
              >
                Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-1.5 rounded-lg bg-[#FF6A2A] hover:bg-[#FF7A3D] text-white font-medium transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#55C98A] text-[#05070B] font-bold transition-colors"
              >
                Finish Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
