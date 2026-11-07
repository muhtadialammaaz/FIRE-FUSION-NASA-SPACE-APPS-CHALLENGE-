import React, { useRef, useEffect } from 'react';
import { ArrowRight, Compass, Sparkles, Satellite, Layers, ShieldCheck, Flame } from 'lucide-react';
import heroSatelliteImage from '../assets/images/satellite_earth_hero_1791376284514.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onMethodologyClick: () => void;
  onLaunchDemo: () => void;
  onEmergencyClick?: () => void;
  onWorkflowClick?: () => void;
  onLandPrototypeClick?: () => void;
  onSecurityClick?: () => void;
  modisLoaded: boolean;
  totalEvents: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onMethodologyClick,
  onLaunchDemo,
  onEmergencyClick,
  onWorkflowClick,
  onLandPrototypeClick,
  onSecurityClick,
  modisLoaded,
  totalEvents,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing satellite active-fire observations
    const particles = Array.from({ length: 38 }, (_, i) => ({
      x: width * 0.5 + (Math.random() - 0.5) * width * 0.7,
      y: height * 0.52 + (Math.random() - 0.5) * height * 0.65,
      radius: Math.random() * 2.2 + 1.2,
      baseAlpha: Math.random() * 0.6 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      phase: Math.random() * Math.PI * 2,
      sensor: i % 3 === 0 ? 'MODIS' : 'VIIRS',
      frp: Math.random() * 80 + 20,
    }));

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital arc trails
      ctx.save();
      ctx.strokeStyle = 'rgba(66, 165, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.65, width * 0.42, height * 0.28, -0.15, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
      ctx.beginPath();
      ctx.ellipse(width * 0.52, height * 0.62, width * 0.38, height * 0.25, 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw subtle connection lines between adjacent observations
      t += 0.02;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.18;
            ctx.strokeStyle = `rgba(255, 176, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw hotspot observation pulses
      particles.forEach((p) => {
        const pulse = Math.sin(t * p.pulseSpeed * 60 + p.phase);
        const currentRadius = p.radius + pulse * 0.8;
        const currentAlpha = Math.max(0.1, p.baseAlpha + pulse * 0.25);

        // Outer glow
        const glowRadius = currentRadius * 4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        if (p.sensor === 'MODIS') {
          gradient.addColorStop(0, `rgba(255, 77, 61, ${currentAlpha * 0.8})`);
          gradient.addColorStop(1, 'rgba(255, 77, 61, 0)');
        } else {
          gradient.addColorStop(0, `rgba(168, 85, 247, ${currentAlpha * 0.8})`);
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = p.sensor === 'MODIS' ? '#FF4D3D' : '#C084FC';
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="overview" className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 overflow-hidden">
      {/* Cinematic Satellite in Orbit Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/satellite_earth_hero.jpg"
          alt="Satellite in Earth Orbit observing fire activity at night"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-85 scale-[1.01] transition-opacity duration-500"
        />
        {/* Balanced atmospheric vignettes for contrast without hiding the satellite, sun flare or Earth lights */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/35 to-[#05070B]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,7,11,0.55)_85%)]" />
      </div>

      {/* Subtle Earth curvature gradient glow */}
      <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[140vw] max-w-[1700px] h-[450px] rounded-[100%] bg-gradient-to-t from-[#0A1626]/40 via-[#10233D]/20 to-transparent blur-3xl pointer-events-none border-t border-[#42A5FF]/10 z-0" />

      {/* Interactive particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Official FireFusion Logo Emblem */}
        <div className="relative mb-5 group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF6A2A]/40 to-[#00D9FF]/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
          <img
            src="/assets/aistudio/Fire_Fusion_Wildfire_Monitor_55c8fe33.png"
            alt="FireFusion Emblem"
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-contain shadow-2xl border border-white/20 transition-transform group-hover:scale-105"
          />
        </div>

        {/* Sub-kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05070B]/80 border border-white/15 text-xs font-mono text-[#9AA6B2] mb-6 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#55C98A]" />
          <span>NASA SPACE APPS CHALLENGE 2026</span>
          <span className="text-white/20">|</span>
          <span className="text-[#F5F7FA]">EARTH OBSERVATION INTELLIGENCE</span>
        </div>

        {/* Main Massive Responsive Heading */}
        <h1 className="font-display font-extrabold tracking-tight text-white leading-[0.94] text-5xl sm:text-7xl md:text-8xl lg:text-[104px] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/70">
            ONE FIRE.
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/80 to-[#9AA6B2]">
            MULTIPLE SATELLITES.
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2A] via-[#FF8A4C] to-[#FFB000]">
            ONE HARMONIZED VIEW.
          </span>
        </h1>

        {/* Supporting scientific text */}
        <p className="max-w-3xl text-base sm:text-lg md:text-xl text-[#F5F7FA]/90 font-normal leading-relaxed mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          FireFusion combines MODIS and VIIRS fire observations into a unified fire-event
          intelligence layer, helping users understand where fires occur, how satellite
          observations relate to one another, and how fire information can be explored more clearly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6A2A] to-[#FF3D1F] text-white font-medium text-sm sm:text-base shadow-xl shadow-[#FF6A2A]/25 hover:shadow-2xl hover:shadow-[#FF6A2A]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Explore Fire Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onWorkflowClick && (
            <button
              onClick={onWorkflowClick}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#42A5FF]/10 hover:bg-[#42A5FF]/20 border border-[#42A5FF]/30 text-[#42A5FF] text-sm sm:text-base font-medium transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Full Workflow (1st Photo)</span>
            </button>
          )}

          {onLandPrototypeClick && (
            <button
              onClick={onLandPrototypeClick}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[#55C98A] text-sm sm:text-base font-medium transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#55C98A] animate-pulse" />
              <span>Land Prototype (2nd-4th Photos)</span>
            </button>
          )}

          {onEmergencyClick && (
            <button
              onClick={onEmergencyClick}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 hover:text-white text-sm sm:text-base font-medium transition-all shadow-lg shadow-red-600/10"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>Responder Hub</span>
            </button>
          )}

          {onSecurityClick && (
            <button
              onClick={onSecurityClick}
              className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#9AA6B2] hover:text-white text-xs font-mono transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#55C98A]" />
              <span>Security Hub</span>
            </button>
          )}

          <button
            onClick={onLaunchDemo}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/25 text-[#FFB000] text-sm sm:text-base font-medium transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Judge Walkthrough</span>
          </button>
        </div>

        {/* Orbit Status Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl w-full text-left">
          <div className="p-3.5 rounded-xl bg-[#0B1018]/90 border border-white/15 backdrop-blur-md shadow-xl hover:border-white/25 transition-all">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">OBSERVATION SOURCE</div>
            <div className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#55C98A]" />
              NASA FIRMS
            </div>
            <div className="text-[10px] text-[#9AA6B2] mt-0.5">Collection 2 & C6.1</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1018]/90 border border-white/15 backdrop-blur-md shadow-xl hover:border-white/25 transition-all">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">VIIRS PLATFORMS</div>
            <div className="text-sm font-semibold text-[#A855F7] flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5" />
              NOAA-20 & NOAA-21
            </div>
            <div className="text-[10px] text-[#9AA6B2] mt-0.5">375m I-Band nadir</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1018]/90 border border-white/15 backdrop-blur-md shadow-xl hover:border-white/25 transition-all">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">MODIS INTEGRATION</div>
            <div className="text-sm font-semibold flex items-center gap-1.5 text-white">
              <span className={`w-2 h-2 rounded-full ${modisLoaded ? 'bg-[#FF4D3D]' : 'bg-[#FFB547]'}`} />
              {modisLoaded ? 'Terra + Aqua Loaded' : 'Ready to Ingest'}
            </div>
            <div className="text-[10px] text-[#9AA6B2] mt-0.5">1 km nominal C6.1</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1018]/90 border border-white/15 backdrop-blur-md shadow-xl hover:border-white/25 transition-all">
            <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">HARMONIZED EVENTS</div>
            <div className="text-sm font-semibold text-[#FFB000] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              Dynamic Clusters
            </div>
            <div className="text-[10px] text-[#9AA6B2] mt-0.5">ST-DBSCAN Association</div>
          </div>
        </div>
      </div>
    </section>
  );
};
