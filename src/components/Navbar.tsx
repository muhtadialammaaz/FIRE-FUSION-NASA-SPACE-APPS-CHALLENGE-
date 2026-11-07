import React, { useState, useEffect } from 'react';
import {
  Flame,
  Satellite,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Database,
  Radio,
  Lock,
  TreePine,
  Workflow,
} from 'lucide-react';
import { realtimeDb } from '../services/realtimeDatabase';

interface NavbarProps {
  modisLoaded: boolean;
  onToggleModis: () => void;
  onLaunchDemo: () => void;
  onOpenSecurityHub: () => void;
  totalEvents: number;
  totalObs: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  modisLoaded,
  onToggleModis,
  onLaunchDemo,
  onOpenSecurityHub,
  totalEvents,
  totalObs,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Fire Map & Units', href: '#fire-map' },
    { name: 'Responder Hub', href: '#emergency-hub' },
    { name: 'Land Prototype', href: '#land-prototype' },
    { name: 'Harmonization', href: '#harmonization' },
    { name: 'Calendar', href: '#calendar' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3 pointer-events-none transition-all duration-300">
      <nav
        className={`w-full max-w-7xl mx-auto pointer-events-auto rounded-xl transition-all duration-300 border ${
          scrolled
            ? 'bg-[#0B1018]/85 backdrop-blur-md border-white/10 shadow-2xl py-2.5 px-5'
            : 'bg-[#0B1018]/50 backdrop-blur-sm border-white/5 py-3 px-6'
        } flex items-center justify-between`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#overview" className="flex items-center gap-2.5 group">
            <img
              src="/assets/aistudio/Fire_Fusion_Wildfire_Monitor_55c8fe33.png"
              alt="FireFusion Logo"
              className="w-9 h-9 rounded-xl object-contain shadow-lg shadow-[#FF6A2A]/25 border border-white/10 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
                FIREFUSION GSS
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-white/10 text-[#42A5FF] tracking-normal">
                  2026
                </span>
              </span>
              <span className="text-[10px] text-[#9AA6B2] tracking-tight hidden sm:inline">
                NASA Space Apps · Space & Land Project
              </span>
            </div>
          </a>

          {/* Quick status indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-[11px] text-[#9AA6B2]">
            <span className="flex items-center gap-1 text-[#55C98A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C98A] animate-ping" />
              VIIRS C2
            </span>
            <span className="text-white/20">/</span>
            <button
              onClick={onToggleModis}
              title={modisLoaded ? 'Click to unload MODIS' : 'Click to load genuine MODIS C6.1 benchmark'}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                modisLoaded
                  ? 'bg-[#FF6A2A]/20 text-[#FF6A2A] border border-[#FF6A2A]/40'
                  : 'bg-white/5 text-[#9AA6B2] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Satellite className="w-3 h-3" />
              {modisLoaded ? 'MODIS C6.1: Active' : '+ Load MODIS C6.1'}
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 text-[13px] font-medium text-[#9AA6B2]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`hover:text-white transition-colors duration-150 py-1 ${
                link.name.includes('Responder')
                  ? 'text-[#FF6A2A] font-bold'
                  : link.name.includes('Land')
                  ? 'text-[#55C98A] font-bold'
                  : ''
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Security & Server Gateway Hub Trigger */}
          <button
            onClick={onOpenSecurityHub}
            title="Inspect Server Gateway & Zero-Key Security Architecture"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[#55C98A] text-[12px] font-mono border border-emerald-500/30 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#55C98A]" />
            <span className="hidden sm:inline">Security & Gateway</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#55C98A] animate-pulse" />
          </button>

          <button
            onClick={onLaunchDemo}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6A2A] to-[#FF3D1F] hover:from-[#FF7A3D] hover:to-[#FF4D30] text-white text-[13px] font-medium transition-all shadow-md shadow-[#FF6A2A]/25 hover:shadow-lg hover:shadow-[#FF6A2A]/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Demo</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#9AA6B2] hover:text-white rounded-lg border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 bg-[#0B1018] border border-white/10 rounded-xl p-5 shadow-2xl pointer-events-auto z-50 flex flex-col gap-4">
          <div className="flex flex-col gap-2.5 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#9AA6B2] hover:text-white py-1.5 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenSecurityHub();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono border border-emerald-500/30 bg-emerald-500/10 text-[#55C98A]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Security Gateway Status
            </button>
            <button
              onClick={() => {
                onToggleModis();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono border border-white/10 bg-white/5 text-white"
            >
              <Satellite className="w-3.5 h-3.5" />
              {modisLoaded ? 'Unload MODIS C6.1' : 'Load MODIS C6.1 Benchmark'}
            </button>
            <button
              onClick={() => {
                onLaunchDemo();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#FF6A2A] text-white text-sm font-medium shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Launch Hackathon Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
