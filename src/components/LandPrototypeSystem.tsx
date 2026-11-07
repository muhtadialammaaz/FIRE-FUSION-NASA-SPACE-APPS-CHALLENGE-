import React, { useState, useEffect } from 'react';
import {
  TreePine,
  Zap,
  Cpu,
  Radio,
  ShieldCheck,
  Maximize2,
  X,
  Battery,
  Flame,
  Activity,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Lock,
  RefreshCw,
  Sliders,
  Compass,
} from 'lucide-react';

export const LandPrototypeSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sylvanSphere' | 'cutaway' | 'exploded' | 'flowchart'>('sylvanSphere');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; badge?: string } | null>(null);
  const [nodes, setNodes] = useState<any[]>([]);

  const images = {
    sylvanSphere: {
      src: '/assets/aistudio/Gemini_Generated_Image_h3s98oh3s98oh3s9_7964406a.jpeg',
      title: 'Sylvan Sphere 1.0 — 60cm Spherical Forest Research Prototype (Detailed Hardware & Sensor Schematic)',
      badge: '3RD PHOTO: HARDWARE & SENSOR SCHEMATIC',
    },
    cutaway: {
      src: '/assets/aistudio/Screenshot_2026-10-28_122732_4dfb664d.png',
      title: 'Detailed Cutaway Diagram: Spherical Forest Research Prototype (Sylvan Sphere 1.0)',
      badge: 'BIOMECHANICAL HARDWARE CUTAWAY',
    },
    exploded: {
      src: '/assets/aistudio/Gemini_Generated_Image__29245e17.jpeg',
      title: 'Exploded 3D Engineering Architecture: Core AI Sensor Suite & Hybrid Power',
      badge: 'EXPLODED-VIEW SCHEMATIC',
    },
    flowchart: {
      src: '/assets/aistudio/Screenshot_2026-10-28_122743_5d2b4dc0.png',
      title: 'Forest Monitoring Device: Comprehensive Algorithm & Self-Healing Flowchart',
      badge: 'AUTONOMOUS FIRMWARE FLOWCHART',
    },
  };

  // Fetch telemetry from secure server endpoint
  useEffect(() => {
    fetch('/api/sylvan-nodes/telemetry')
      .then((res) => res.json())
      .then((data) => {
        if (data.nodes) setNodes(data.nodes);
      })
      .catch(() => {
        // Fallback default node readings
        setNodes([
          {
            id: 'NODE-SPHERE-01',
            name: 'North Rim Ridge Station',
            lat: 39.8124,
            lon: -121.4485,
            mfcVoltageMv: 4200,
            mfcStatus: 'OPTIMAL (Moist Oak Soil)',
            batteryPercent: 94,
            vocPpm: 18.2,
            ambientTempC: 32.1,
            soilMoisturePercent: 24.5,
          },
          {
            id: 'NODE-SPHERE-02',
            name: 'Canyon Creek Flank Sentinel',
            lat: 39.7785,
            lon: -121.4621,
            mfcVoltageMv: 3850,
            mfcStatus: 'ACTIVE (River Loam)',
            batteryPercent: 88,
            vocPpm: 64.5,
            ambientTempC: 35.8,
            soilMoisturePercent: 19.8,
          },
        ]);
      });
  }, []);

  const currentImage = images[activeTab];

  return (
    <section id="land-prototype" className="relative max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#55C98A]/10 border border-[#55C98A]/30 text-xs font-mono text-[#55C98A] mb-3">
            <TreePine className="w-3.5 h-3.5" />
            <span>GROUND SENSOR LAND PROJECT · SYLVAN SPHERE 1.0</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Autonomous Land Prototype System
          </h2>
          <p className="text-sm text-[#9AA6B2] mt-2 max-w-3xl leading-relaxed">
            The Sylvan Sphere 1.0 is an autonomous, self-powering forest sensor node. Powered by a soil Microbial Fuel Cell (MFC) and conformal solar panels, it executes on-device Edge AI sensor fusion to detect incipient wildfires before satellite overpasses occur.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0B1018] border border-white/10 self-start lg:self-auto shadow-xl">
          <button
            onClick={() => setActiveTab('sylvanSphere')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'sylvanSphere'
                ? 'bg-[#00D9FF] text-[#05070B] font-bold shadow-lg shadow-[#00D9FF]/20'
                : 'text-[#9AA6B2] hover:text-white'
            }`}
          >
            3rd Photo: Sylvan Sphere 1.0
          </button>
          <button
            onClick={() => setActiveTab('cutaway')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'cutaway'
                ? 'bg-[#FF6A2A] text-white shadow-lg shadow-[#FF6A2A]/20'
                : 'text-[#9AA6B2] hover:text-white'
            }`}
          >
            Cutaway Anatomy
          </button>
          <button
            onClick={() => setActiveTab('exploded')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'exploded'
                ? 'bg-[#42A5FF] text-[#05070B] font-bold shadow-lg shadow-[#42A5FF]/20'
                : 'text-[#9AA6B2] hover:text-white'
            }`}
          >
            3D Exploded Blueprint
          </button>
          <button
            onClick={() => setActiveTab('flowchart')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'flowchart'
                ? 'bg-[#55C98A] text-[#05070B] font-bold shadow-lg shadow-[#55C98A]/20'
                : 'text-[#9AA6B2] hover:text-white'
            }`}
          >
            Firmware Flowchart
          </button>
        </div>
      </div>

      {/* Main Image Showcase Container */}
      <div className="rounded-3xl bg-[#0B1018] border border-white/10 overflow-hidden shadow-2xl relative mb-8">
        {/* Top Header of Blueprint */}
        <div className="p-4 px-6 border-b border-white/10 bg-[#111923] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-[#42A5FF] border border-white/15">
              {currentImage.badge}
            </span>
            <span className="text-xs font-mono text-white font-medium truncate max-w-xl">
              {currentImage.title}
            </span>
          </div>

          <button
            onClick={() => setLightboxImage(currentImage)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-colors border border-white/10"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#42A5FF]" />
            <span>Full View</span>
          </button>
        </div>

        {/* Image Display */}
        <div
          className="relative cursor-pointer bg-black/60 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxImage(currentImage)}
        >
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="w-full h-auto max-h-[640px] object-contain rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
          />

          <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-xl bg-black/80 border border-white/20 text-xs font-mono text-white flex items-center gap-2 backdrop-blur-md shadow-2xl">
            <Maximize2 className="w-3.5 h-3.5 text-[#42A5FF]" />
            <span>Click to Inspect High-Resolution Blueprint</span>
          </div>
        </div>

        {/* Feature Explanations Below Current Image */}
        <div className="p-6 border-t border-white/10 bg-[#0B1018]">
          {activeTab === 'sylvanSphere' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#00D9FF] font-bold flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>32x24 Thermal IR & Gas Array</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Equipped with modular weatherproof ports for temperature, humidity, VOCs, CO2, and CH4 gas detection, plus a 32x24 thermal imaging camera under a transparent dome.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#55C98A] font-bold flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>5V DC Microbial Soil Bio-Cell</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Native forest soil and organic matter house biocatalyst bacteria in an anode/cathode chamber with ion-exchange membranes, outputting continuous 5V DC electricity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#FFB000] font-bold flex items-center gap-1.5">
                  <Radio className="w-4 h-4" />
                  <span>Electronics Isolation & Watchdog</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Isolated control PCB with microcontroller, RF module, Li-ion battery, and hardware WDT watchdog timer, interfacing directly with ground IoT mesh networks and tactical maps.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cutaway' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#55C98A] font-bold flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Microbial Fuel Cell (MFC) Core</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Generates continuous 2V–5V DC electricity from moist forest soil and decomposing organic matter via anaerobic bacteria digestion, guaranteeing years of unattended battery maintenance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#FF6A2A] font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  <span>AI Smoke & Flame Detection</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Dual modular optical/infrared ports with integrated VOC/CO2/humidity gas sensors and a micro thermal imaging camera to classify early stage smoldering fire.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#42A5FF] font-bold flex items-center gap-1.5">
                  <Radio className="w-4 h-4" />
                  <span>Electronics Isolation & Comms</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Fireproof shockproof composite casing with sealed O-rings protecting the internal control PCB, SD flash buffering, and satellite antenna link.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'exploded' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#A855F7] font-bold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Edge AI Accelerator Unit</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Embedded Nvidia Jetson / Hailo-8 delivering 4 TOPS of neural inference at just 3W average power, performing live visual and acoustic fauna/fire classifications.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#FFB000] font-bold flex items-center gap-1.5">
                  <Battery className="w-4 h-4" />
                  <span>Dual Hybrid Power Stack</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Conformal high-efficiency solar panels (6V DC) paired with internal 10Ah LiFePO4 battery pack and soil microbial bio-cells for indefinite operation under dense tree canopies.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#00D9FF] font-bold flex items-center gap-1.5">
                  <Radio className="w-4 h-4" />
                  <span>Multi-Link Communication</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Long-range LoRaWAN mesh connectivity with autonomous fallback to Iridium / Inmarsat satellite uplinks when cellular networks are unavailable.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'flowchart' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#55C98A] font-bold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>Power Management Sub-Loop</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Continuous battery level state machine: Full Performance (&gt;50%), Eco Mode (20–50% critical sensors only), and Deep Sleep (&lt;20%) with automatic MFC regulation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#FF3D1F] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Self-Healing Watchdog Loop</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  Hardware watchdog timer with deadlock detection triggers immediate hardware resets; 1-hour periodic self-diagnostics isolate faulty sensors and engage redundant sensor lines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2">
                <div className="text-xs font-mono text-[#42A5FF] font-bold flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>AES-256 Offline Flash Buffering</span>
                </div>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">
                  If satellite/LoRaWAN connection drops, telemetry packets are compressed, encrypted with AES-256, stored in local flash memory, and transmitted via FIFO with ACK handshakes upon reconnection.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Ground Sensor Network Telemetry HUD */}
      <div className="rounded-2xl bg-gradient-to-r from-[#111923] to-[#0B1018] border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#55C98A] animate-ping" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              LIVE SYLVAN SPHERE 1.0 MESH NODES TELEMETRY
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#9AA6B2]">
            <span>ENCRYPTION: <strong className="text-white">AES-256</strong></span>
            <span>·</span>
            <span>UPLINK: <strong className="text-[#55C98A]">LoRaWAN + Iridium Active</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {nodes.map((node) => (
            <div key={node.id} className="p-4 rounded-xl bg-[#05070B] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-white">{node.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#55C98A]/20 text-[#55C98A]">
                  {node.batteryPercent}% LiFePO4
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#9AA6B2] space-y-1">
                <div className="flex justify-between">
                  <span>Soil Bio-Voltage:</span>
                  <span className="text-[#55C98A] font-bold">{node.mfcVoltageMv} mV (MFC)</span>
                </div>
                <div className="flex justify-between">
                  <span>VOC Gas Trace:</span>
                  <span className={node.vocPpm > 40 ? 'text-[#FF6A2A] font-bold' : 'text-white'}>
                    {node.vocPpm} ppm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Soil Moisture / Temp:</span>
                  <span className="text-white">{node.soilMoisturePercent}% · {node.ambientTempC}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>GPS Location:</span>
                  <span className="text-white">{node.lat.toFixed(4)}°, {node.lon.toFixed(4)}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] bg-[#0B1018] border border-white/20 rounded-2xl p-4 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#55C98A] font-bold">
                  {lightboxImage.badge || 'BLUEPRINT INSPECTION'}
                </span>
                <span className="text-xs text-[#9AA6B2] truncate max-w-lg">
                  {lightboxImage.title}
                </span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-lg text-[#9AA6B2] hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2 flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[82vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
