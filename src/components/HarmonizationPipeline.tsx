import React, { useState } from 'react';
import { Database, Filter, GitMerge, Flame, ArrowDown, Layers, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export const HarmonizationPipeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(3);

  const stages = [
    {
      id: 0,
      title: '01. RAW OBSERVATION INGESTION',
      sourceOwner: 'NASA FIRMS',
      ownerType: 'NASA-defined',
      summary: 'Ingest native MODIS Collection 6.1 and VIIRS Collection 2 records without loss of metadata.',
      details: 'Preserves raw latitude, longitude, brightness temperatures, scan/track dimensions, native confidence, and UTC acquisition timestamps.',
      color: '#42A5FF',
    },
    {
      id: 1,
      title: '02. NORMALIZATION & VALIDATION',
      sourceOwner: 'FireFusion Implementation',
      ownerType: 'FireFusion-derived',
      summary: 'Map attributes to sensor-neutral schema and flag anomalies without silent record deletion.',
      details: 'Identifies 30 cross-file duplicates between NOAA-21 CSV and Shapefile, isolates 13 negative FRP readings with INVALID_FRP flag, and formats zero-padded UTC times.',
      color: '#55C98A',
    },
    {
      id: 2,
      title: '03. SPATIAL-TEMPORAL MATCHING',
      sourceOwner: 'FireFusion Algorithm',
      ownerType: 'FireFusion-derived',
      summary: 'Geodesic Haversine spatial indexing and temporal overpass window correlation.',
      details: 'Accounts for sensor resolution mismatch (MODIS ~1 km vs VIIRS ~375 m) and orbital lead times (~50 min between NOAA-21 and NOAA-20).',
      color: '#FF6A2A',
    },
    {
      id: 3,
      title: '04. ADAPTIVE EVENT CLUSTERING',
      sourceOwner: 'FireFusion ST-DBSCAN',
      ownerType: 'FireFusion-derived',
      summary: 'Density-based spatiotemporal grouping of observations into coherent fire events.',
      details: 'Clusters candidate observations into persistent physical events, calculating event duration, enclosing bounding box, and peak activity time.',
      color: '#FFB000',
    },
    {
      id: 4,
      title: '05. CONFIDENCE & PROVENANCE SCORING',
      sourceOwner: 'FireFusion Prototype Metric',
      ownerType: 'FireFusion-derived',
      summary: 'Transparent 4-factor association score (Spatial 40, Temporal 30, Quality 20, FRP 10).',
      details: 'Keeps official NASA confidence intact while computing an explicit concordance score for the harmonized association.',
      color: '#A855F7',
    },
    {
      id: 5,
      title: '06. UNIFIED FIRE EVENT INTELLIGENCE',
      sourceOwner: 'Harmonized Output Layer',
      ownerType: 'FireFusion-derived',
      summary: 'Consolidated FireFusion Event object and Burning Activity Calendar matrix.',
      details: 'Outputs complete event timeline from first detection to burnout, total FRP trajectory, and historical baseline anomaly classification.',
      color: '#00D9FF',
    },
  ];

  return (
    <section id="harmonization" className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFB000] uppercase tracking-wider mb-3">
          <GitMerge className="w-3.5 h-3.5" />
          <span>Intellectual Core of FireFusion</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-5">
          From separate observations<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2A] via-[#FFB000] to-[#00D9FF]">
            to unified fire events.
          </span>
        </h2>
        <p className="text-base sm:text-lg text-[#9AA6B2] leading-relaxed">
          FireFusion does not force sensor measurements to be identical. Instead, it normalizes schemas,
          evaluates spatial and temporal relationships, and synthesizes multi-satellite detections into
          a transparent event-level representation.
        </p>
      </div>

      {/* Interactive Pipeline Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step list (left) */}
        <div className="lg:col-span-6 space-y-3">
          {stages.map((stage) => {
            const isSelected = activeStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#151F2B] border-white/25 shadow-xl'
                    : 'bg-[#0B1018] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-xs font-mono font-bold text-white tracking-wider">
                      {stage.title}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      stage.ownerType === 'NASA-defined'
                        ? 'bg-[#42A5FF]/10 text-[#42A5FF] border-[#42A5FF]/30'
                        : 'bg-[#FFB000]/10 text-[#FFB000] border-[#FFB000]/30'
                    }`}
                  >
                    {stage.ownerType}
                  </span>
                </div>

                <p className="text-xs text-[#9AA6B2] pl-4">{stage.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed Inspection Display (right) */}
        <div className="lg:col-span-6 rounded-2xl bg-[#0B1018] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-[#9AA6B2]">PIPELINE STAGE INSPECTION</span>
              <span className="text-xs font-mono text-white font-bold">
                STAGE {activeStage + 1} OF 6
              </span>
            </div>

            <div className="mb-6">
              <span
                className="text-xs font-mono font-bold tracking-wider px-2 py-1 rounded inline-block mb-3"
                style={{
                  backgroundColor: `${stages[activeStage].color}20`,
                  color: stages[activeStage].color,
                  border: `1px solid ${stages[activeStage].color}40`,
                }}
              >
                {stages[activeStage].title}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {stages[activeStage].summary}
              </h3>
              <p className="text-sm text-[#9AA6B2] leading-relaxed">
                {stages[activeStage].details}
              </p>
            </div>

            {/* Architecture Provenance Note */}
            <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#9AA6B2]">Methodology Authority:</span>
                <span className="text-white font-semibold">{stages[activeStage].sourceOwner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#9AA6B2]">Scientific Rule:</span>
                <span className="text-[#55C98A]">Zero fabricated values · Provenance preserved</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <button
              onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : 0))}
              disabled={activeStage === 0}
              className="hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              &larr; Previous Stage
            </button>
            <button
              onClick={() => setActiveStage((prev) => (prev < 5 ? prev + 1 : 5))}
              disabled={activeStage === 5}
              className="text-[#FF6A2A] hover:text-[#FF8A4C] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
            >
              Next Stage &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
