import React from 'react';
import { Flame, ExternalLink, ShieldCheck, TreePine, Database, BookOpen, Link2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const creditLinks = [
    {
      num: 1,
      title: 'Forest Prototype Battery and Satellite Data Harmonization',
      icon: '🌲',
      desc: 'Research notebook and prototype architecture on soil microbial bio-batteries and satellite cross-calibration.',
      url: 'https://gemini.google.com/notebook/d08159c2-8c47-4869-9af2-44bdf8bcda10',
      badge: 'PROTOTYPE RESEARCH NOTEBOOK',
    },
    {
      num: 2,
      title: 'NASA LANCE FIRMS Active Fire Data',
      icon: '🛰️',
      desc: 'Land, Atmosphere Near real-time Capability for EOS (LANCE) global fire detection data portal.',
      url: 'https://firms.modaps.eosdis.nasa.gov/active_fire/',
      badge: 'NASA FIRMS DATA PORTAL',
    },
    {
      num: 3,
      title: 'NASA Earthdata MODIS & VIIRS Active Fire Data Attributes',
      icon: '📊',
      desc: 'Official technical specifications, confidence metrics, and coordinate schemas for MODIS and VIIRS.',
      url: 'https://www.earthdata.nasa.gov/data/tools/firms/active-fire-data-attributes-modis-viirs',
      badge: 'DATA ATTRIBUTES & SPECS',
    },
    {
      num: 4,
      title: 'NASA Earthdata MCD14DL Catalog Link',
      icon: '🔥',
      desc: 'NASA Land, Atmosphere Near real-time Capability for EOS MODIS Near Real-Time Active Fire Location Product.',
      url: 'https://www.earthdata.nasa.gov/data/catalog/lancemodis-mcd14dl-6.1nrt',
      badge: 'MCD14DL NRT CATALOG',
    },
  ];

  return (
    <footer id="credits" className="relative border-t border-white/10 bg-[#05070B] pt-16 pb-12 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* NASA Data Attribution Banner */}
        <div className="p-6 rounded-2xl bg-[#0B1018] border border-white/10 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#55C98A]">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL DATA & SCIENCE ATTRIBUTION</span>
            </div>
            <h4 className="font-display font-bold text-lg text-white">
              NASA Earth Science & FIRMS Data
            </h4>
            <p className="text-xs text-[#9AA6B2] max-w-2xl leading-relaxed">
              FireFusion utilizes active-fire data from the Land, Atmosphere Near real-time Capability for EOS (LANCE) system operated by NASA ESDIS. VIIRS data are produced by the NASA FIRMS processing system. MODIS data are produced by the MODIS Adaptive Processing System (MODAPS).
            </p>
          </div>

          <div className="text-xs font-mono text-[#9AA6B2] text-left md:text-right shrink-0">
            <div>NASA Space Apps Challenge 2026</div>
            <div className="text-white/40 text-[10px] mt-1">Not endorsed by NASA or ESDIS</div>
          </div>
        </div>

        {/* Dedicated Research Credits Section */}
        <div className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 md:p-8 mb-12 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#FFB000]" />
              <h3 className="font-display font-bold text-lg text-white">
                Official Research Credits & Citations
              </h3>
            </div>
            <span className="text-xs font-mono text-[#55C98A] bg-[#55C98A]/10 border border-[#55C98A]/30 px-2.5 py-0.5 rounded">
              Verified Scientific References
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditLinks.map((link) => (
              <a
                key={link.num}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111923] border border-white/5 hover:border-[#42A5FF]/40 transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#42A5FF] border border-white/10">
                      {link.badge}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#9AA6B2] group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-[#42A5FF] transition-colors flex items-center gap-2 mb-1.5">
                    <span>{link.icon}</span>
                    <span>{link.title}</span>
                  </h4>
                  <p className="text-xs text-[#9AA6B2] leading-relaxed">
                    {link.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] font-mono text-[#42A5FF] truncate">
                  {link.url}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-xs">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/Fire_Fusion_Wildfire_Monitor_55c8fe33.png"
                alt="FireFusion Logo"
                className="w-9 h-9 rounded-xl object-contain border border-white/10 shadow-lg shadow-[#FF6A2A]/20"
              />
              <span className="font-display font-bold text-sm tracking-wider text-white">
                FIREFUSION GSS
              </span>
            </div>
            <p className="text-[#9AA6B2] leading-relaxed">
              Harmonized MODIS & VIIRS Fire Event Intelligence & Burning Activity Calendar.
            </p>
            <div className="text-[11px] font-mono text-[#42A5FF]">
              One Fire. Multiple Satellites. One Harmonized View.
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-white font-semibold mb-3">SECTIONS</div>
            <ul className="space-y-2 text-[#9AA6B2]">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">Workflow Architecture</a></li>
              <li><a href="#fire-map" className="hover:text-white transition-colors">Interactive Map</a></li>
              <li><a href="#emergency-hub" className="hover:text-white transition-colors">Responder Hub</a></li>
              <li><a href="#land-prototype" className="hover:text-white transition-colors">Land Prototype</a></li>
              <li><a href="#calendar" className="hover:text-white transition-colors">Burning Calendar</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About & Team</a></li>
            </ul>
          </div>

          {/* Scientific Methodology */}
          <div>
            <div className="font-mono text-white font-semibold mb-3">SCIENTIFIC CITATIONS</div>
            <ul className="space-y-2 text-[#9AA6B2]">
              <li>
                <a
                  href="https://gemini.google.com/notebook/d08159c2-8c47-4869-9af2-44bdf8bcda10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#55C98A]"
                >
                  🌲 Forest Prototype Battery <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://firms.modaps.eosdis.nasa.gov/active_fire/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  NASA LANCE FIRMS Data <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.earthdata.nasa.gov/data/tools/firms/active-fire-data-attributes-modis-viirs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Earthdata Attributes <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.earthdata.nasa.gov/data/catalog/lancemodis-mcd14dl-6.1nrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  MCD14DL Catalog Link <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Project Team */}
          <div>
            <div className="font-mono text-white font-semibold mb-3">CHALLENGE SUBMISSION</div>
            <p className="text-[#9AA6B2] leading-relaxed mb-3">
              Developed for the 2026 NASA Space Apps Challenge by Global Synthetic Squad (G.S.S).
            </p>
            <div className="p-2.5 rounded-lg bg-[#111923] border border-white/5 font-mono text-[11px] text-[#55C98A]">
              ✓ Open Source Research Prototype
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9AA6B2]">
          <div>
            &copy; 2026 FireFusion &middot; Global Synthetic Squad (G.S.S)
          </div>
          <div className="flex items-center gap-4">
            <span>NASA Space Apps 2026</span>
            <span>&middot;</span>
            <span>All Data Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
