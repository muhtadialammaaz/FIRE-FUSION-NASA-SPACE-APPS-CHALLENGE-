import React, { useState } from 'react';
import {
  Satellite,
  Database,
  Cpu,
  Calendar,
  ShieldAlert,
  Radio,
  Maximize2,
  X,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TreePine,
  TrendingDown,
  HeartHandshake,
  Network,
  Share2,
} from 'lucide-react';

export const WorkflowShowcase: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState<'overview' | 'hybrid'>('hybrid');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(1);

  const diagrams = {
    overview: {
      src: '/assets/aistudio/Fire_Fusion__Global_Wildfire_Intelligence__1__5848b8df.png',
      title: 'Global Wildfire Intelligence Architecture (Overview)',
      badge: 'END-TO-END PIPELINE OVERVIEW',
      desc: 'Complete journey from orbit detection and ground sensor networks through data harmonization and burning calendars to smart decision support.',
    },
    hybrid: {
      src: '/assets/aistudio/Gemini_Generated_Image_vkjfphvkjfphvkjf__1__39858a3b.jpeg',
      title: 'FireFusion Hybrid Intelligence: Satellite & Spherical IoT Fusion',
      badge: 'HYBRID SATELLITE & IOT FUSION ENGINE',
      desc: 'Detailed architecture showing MODIS + VIIRS ingestion, deduplication reporting, ST-DBSCAN clustering, Ground-Level IoT Mesh (Sphere Nodes), LoRaWAN gateways, and Emergency Alert APIs.',
    },
  };

  const currentDiagram = diagrams[activeDiagram];

  const stages = [
    {
      num: 1,
      title: 'Satellite Observation',
      subtitle: 'MODIS + VIIRS Active Sensors',
      desc: 'Detects fire hotspots from orbit using VIIRS 375m I-Band (NOAA-20/21, Suomi-NPP) and MODIS 1km benchmark (Terra/Aqua) thermal radiance channels.',
      icon: Satellite,
      color: '#42A5FF',
    },
    {
      num: 2,
      title: 'Data Harmonization',
      subtitle: 'Merge & Standardize',
      desc: 'Combines disparate sensor formats, cross-calibrates FRP (MW), standardizes confidence classes, and maps multi-satellite overpasses into a unified spatio-temporal layer.',
      icon: Layers,
      color: '#A855F7',
    },
    {
      num: 3,
      title: 'Data Processing & Filtering',
      subtitle: 'Clean, Filter & Validate',
      desc: 'Removes invalid FRP values, resolves cross-file spatial duplicates, and applies adaptive ST-DBSCAN clustering to form cohesive fire events.',
      icon: Cpu,
      color: '#55C98A',
    },
    {
      num: 4,
      title: 'Burning Activity Calendar',
      subtitle: 'Visualize Temporal Patterns',
      desc: 'Aggregates fire activity into daily, weekly, and monthly calendars to analyze historical fire seasonality, baseline deviations, and anomaly surges.',
      icon: Calendar,
      color: '#FFB000',
    },
    {
      num: 5,
      title: 'Smart Decision Support',
      subtitle: 'Real-Time Alert & Act',
      desc: 'Empowers incident commanders and emergency responders to coordinate resources, deploy air tankers, bulldozers, and issue civilian evacuation warnings.',
      icon: ShieldAlert,
      color: '#FF3D1F',
    },
    {
      num: 6,
      title: 'Ground Sensor Network',
      subtitle: 'Sylvan Sphere Local Monitoring',
      desc: 'Autonomous 8-10 inch smart sensor nodes deployed deep in forest terrain powered by soil microbial fuel cells, streaming local gas, smoke, and acoustic alerts.',
      icon: TreePine,
      color: '#00D9FF',
    },
  ];

  return (
    <section id="workflow" className="relative max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#42A5FF] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLOBAL SYNTHETIC SQUAD (G.S.S.) · NASA SPACE APPS CHALLENGE 2026</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            End-to-End FireFusion Operational Workflow
          </h2>
          <p className="text-sm text-[#9AA6B2] mt-2 max-w-3xl leading-relaxed">
            From low-Earth orbit satellites and deep-forest spherical IoT nodes to unified cloud harmonization and real-time emergency responder command.
          </p>
        </div>

        {/* Multi-diagram switcher & Zoom */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-[#0B1018] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveDiagram('hybrid')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeDiagram === 'hybrid'
                  ? 'bg-[#42A5FF] text-[#05070B] font-bold shadow-md'
                  : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              2nd Photo: Hybrid IoT & Satellite Fusion
            </button>
            <button
              onClick={() => setActiveDiagram('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeDiagram === 'overview'
                  ? 'bg-[#FF6A2A] text-white font-bold shadow-md'
                  : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              1st Photo: Architecture Overview
            </button>
          </div>

          <button
            onClick={() => setZoomOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors border border-white/10"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#42A5FF]" />
            <span>Full-Res Inspect</span>
          </button>
        </div>
      </div>

      {/* Main Diagram Showcase Box */}
      <div className="rounded-2xl bg-[#0B1018] border border-white/10 overflow-hidden shadow-2xl relative group">
        {/* Diagram Title Banner */}
        <div className="p-4 px-6 border-b border-white/10 bg-[#111923] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#42A5FF]/10 text-[#42A5FF] border border-[#42A5FF]/30">
              {currentDiagram.badge}
            </span>
            <span className="text-xs font-mono text-white font-medium">
              {currentDiagram.title}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#9AA6B2] hidden sm:inline">
            NASA FIRMS + Ground-Level IoT Mesh + Decision Support API
          </span>
        </div>

        {/* Image Display */}
        <div className="relative cursor-pointer overflow-hidden bg-black/60 p-2 sm:p-4" onClick={() => setZoomOpen(true)}>
          <img
            src={currentDiagram.src}
            alt={currentDiagram.title}
            className="w-full h-auto object-contain max-h-[640px] rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1018]/40 via-transparent to-transparent pointer-events-none" />

          {/* Floating Hover Indicator */}
          <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-lg bg-black/80 border border-white/20 text-xs font-mono text-white flex items-center gap-2 backdrop-blur-md shadow-2xl">
            <Maximize2 className="w-3.5 h-3.5 text-[#42A5FF]" />
            <span>Click to Zoom Architectural Blueprint</span>
          </div>
        </div>

        {/* 6 Stage Interactive Walkthrough Pills */}
        <div className="p-6 bg-[#0B1018] border-t border-white/10">
          <div className="text-xs font-mono text-[#9AA6B2] mb-4 flex items-center justify-between">
            <span>OPERATIONAL STAGE BREAKDOWN:</span>
            <span className="text-[#55C98A]">Unified Space-to-Ground Pipeline</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stages.map((stg) => {
              const Icon = stg.icon;
              const isActive = activeStage === stg.num;
              return (
                <div
                  key={stg.num}
                  onClick={() => setActiveStage(stg.num)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#111923] border-[#42A5FF] shadow-lg shadow-[#42A5FF]/10'
                      : 'bg-[#05070B] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
                        style={{ backgroundColor: `${stg.color}25`, color: stg.color }}
                      >
                        {stg.num}
                      </span>
                      <span className="text-xs font-mono font-bold text-white truncate">
                        {stg.title}
                      </span>
                    </div>
                    <Icon className="w-4 h-4" style={{ color: stg.color }} />
                  </div>
                  <div className="text-[11px] font-mono text-[#9AA6B2] mb-1.5">{stg.subtitle}</div>
                  <p className="text-xs text-white/80 leading-relaxed">{stg.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Mission Impact Pillars (Bottom of Workflow Diagram) */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#111923]/60 border border-white/5 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#42A5FF]" />
              <span className="text-xs font-mono text-white font-medium">Protect Lives</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111923]/60 border border-white/5 flex items-center justify-center gap-2">
              <TreePine className="w-4 h-4 text-[#55C98A]" />
              <span className="text-xs font-mono text-white font-medium">Preserve Ecosystems</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111923]/60 border border-white/5 flex items-center justify-center gap-2">
              <TrendingDown className="w-4 h-4 text-[#FFB000]" />
              <span className="text-xs font-mono text-white font-medium">Reduce Economic Loss</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111923]/60 border border-white/5 flex items-center justify-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#FF6A2A]" />
              <span className="text-xs font-mono text-white font-medium">Fight Climate Change</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Full-Res Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] bg-[#0B1018] border border-white/20 rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#42A5FF] font-bold">
                  {currentDiagram.badge}
                </span>
                <span className="text-xs text-[#9AA6B2]">· {currentDiagram.title}</span>
              </div>
              <button
                onClick={() => setZoomOpen(false)}
                className="p-1.5 rounded-lg text-[#9AA6B2] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2 flex items-center justify-center">
              <img
                src={currentDiagram.src}
                alt={currentDiagram.title}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
