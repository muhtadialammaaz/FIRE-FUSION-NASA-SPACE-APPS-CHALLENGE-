import React, { useState } from 'react';
import {
  Trophy,
  Users,
  GitMerge,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  Satellite,
  Flame,
  CheckCircle2,
  ExternalLink,
  Layers,
  AlertCircle,
  Database,
  Globe,
  Compass,
  Cpu,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';

export const AboutFireFusion: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    position: string;
    roles: string[];
    image: string;
    initials: string;
    avatarBg: string;
    accentColor: string;
  } | null>(null);
  const workflowSteps = [
    {
      num: '01',
      title: 'Collect Observations',
      desc: 'Collect fire observations from MODIS (Terra & Aqua) and VIIRS (NOAA-20 & NOAA-21).',
      tag: 'Sensor Ingest',
      color: '#42A5FF',
    },
    {
      num: '02',
      title: 'Normalize Information',
      desc: 'Normalize relevant observation information across coordinates, UTC timestamps, and sensor quality scales.',
      tag: 'Normalization',
      color: '#55C98A',
    },
    {
      num: '03',
      title: 'Compare Relationships',
      desc: 'Compare observations using spatial and temporal relationships, accounting for 1 km vs 375 m pixel scales.',
      tag: 'Spatiotemporal Match',
      color: '#FF6A2A',
    },
    {
      num: '04',
      title: 'Identify Associations',
      desc: 'Identify observations that may belong to the same real-world fire event across overpass schedules.',
      tag: 'Association Filter',
      color: '#FFB000',
    },
    {
      num: '05',
      title: 'Harmonize Fire Events',
      desc: 'Group related observations into harmonized fire events using adaptive clustering logic.',
      tag: 'Event Grouping',
      color: '#A855F7',
    },
    {
      num: '06',
      title: 'Present Resulting Events',
      desc: 'Present the resulting events through an interactive map and intelligence dashboard.',
      tag: 'Visual Analytics',
      color: '#00D9FF',
    },
    {
      num: '07',
      title: 'Deliver Intelligence',
      desc: 'Provide understandable information about fire activity, event location, timing, and satellite observations.',
      tag: 'Calendar & Insights',
      color: '#FF6A2A',
    },
  ];

  // Exact 6 team members with authentic photos and roles from NASA Space Apps 2026
  const teamMembers = [
    {
      name: 'MUHTADI ALAM MAAZ',
      position: 'TEAM LEADER',
      roles: ['FRONTEND DEVELOPER', 'DATA MANAGER'],
      image: '/assets/aistudio/MUHTADI_ALAM_MAAZ_8b505558.jpeg',
      initials: 'MM',
      avatarBg: 'from-[#FF6A2A]/20 to-[#FF3D1F]/20 border-[#FF6A2A]/40 text-[#FF6A2A]',
      accentColor: '#FF6A2A',
    },
    {
      name: 'MUTASADDIK ALAM MUAZ',
      position: 'CORE ENGINEER',
      roles: ['PROGRAMME DEBUGGER', 'UI/UX DESIGNER', 'RESEARCHER'],
      image: '/assets/aistudio/MUTASADDIK_ALAM_MUAZ_edee9f6e.jpeg',
      initials: 'MM',
      avatarBg: 'from-[#42A5FF]/20 to-[#2563EB]/20 border-[#42A5FF]/40 text-[#42A5FF]',
      accentColor: '#42A5FF',
    },
    {
      name: 'SHAMSUL ALAM MAHADI',
      position: 'PROJECT LEAD',
      roles: ['DATA ANALYZER', 'PROJECT MANAGER', 'QUALITY MANAGER'],
      image: '/assets/aistudio/SHAMSUL_ALAM_MAHADI_ac2ecb6f.jpeg',
      initials: 'SM',
      avatarBg: 'from-[#55C98A]/20 to-[#059669]/20 border-[#55C98A]/40 text-[#55C98A]',
      accentColor: '#55C98A',
    },
    {
      name: 'ASIF ALVEE',
      position: 'BACKEND ARCHITECT',
      roles: ['BACKEND DEVELOPER'],
      image: '/assets/aistudio/ASIF_ALVEE_2341af80.jpeg',
      initials: 'AA',
      avatarBg: 'from-[#A855F7]/20 to-[#7C3AED]/20 border-[#A855F7]/40 text-[#A855F7]',
      accentColor: '#A855F7',
    },
    {
      name: 'MASHRAFI HASAN BIPLOB',
      position: 'COMMUNICATIONS',
      roles: ['PRESENTER'],
      image: '/assets/aistudio/MASHRAFI_HASAN_BIPLOB_723f471d.jpeg',
      initials: 'MB',
      avatarBg: 'from-[#FFB000]/20 to-[#D97706]/20 border-[#FFB000]/40 text-[#FFB000]',
      accentColor: '#FFB000',
    },
    {
      name: 'SUNJARAH KAMEL CHOWDHURY',
      position: 'MEDIA & VISUALS',
      roles: ['VIDEO PERSON'],
      image: '/assets/aistudio/SUNJARAH_KAMEL_CHOWDHURY_3914c97b.jpeg',
      initials: 'SC',
      avatarBg: 'from-[#00D9FF]/20 to-[#0284C7]/20 border-[#00D9FF]/40 text-[#00D9FF]',
      accentColor: '#00D9FF',
    },
  ];

  return (
    <section id="about" className="relative max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      {/* Background glow accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FF6A2A]/5 via-[#42A5FF]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main Section Header */}
      <div className="max-w-3xl mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF6A2A] uppercase tracking-wider mb-3">
          <Trophy className="w-3.5 h-3.5 text-[#FFB000]" />
          <span>ABOUT FIREFUSION · NASA SPACE APPS CHALLENGE 2026</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-4">
          Harmonizing satellite observations into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2A] via-[#FFB000] to-[#00D9FF]">
            one fire-event perspective.
          </span>
        </h2>
        <div className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#FFB000] mb-5">
          &ldquo;One Fire. Multiple Satellites. One Harmonized View.&rdquo;
        </div>
        <p className="text-base sm:text-lg text-[#9AA6B2] leading-relaxed">
          FireFusion is a satellite-based fire intelligence platform designed to harmonize
          active-fire observations from NASA’s MODIS and VIIRS satellite sensors into a unified view
          of fire events. The platform addresses the challenge of interpreting fire observations
          from multiple satellite sensors that may detect the same real-world fire differently because
          of differences in sensor characteristics, observation timing, spatial resolution, and
          detection behavior. FireFusion aims to transform separate satellite hotspot observations
          into a more understandable fire-event representation that helps users explore where and
          when fire activity is occurring.
        </p>
      </div>

      {/* Subsection 1 & 2: The Challenge & Our Solution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch relative z-10">
        {/* 1. The Challenge */}
        <div className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden hover:border-white/20 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#42A5FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#42A5FF] font-bold px-2.5 py-0.5 rounded bg-[#42A5FF]/10 border border-[#42A5FF]/20">
                1. THE CHALLENGE
              </span>
              <span className="text-xs font-mono text-[#9AA6B2]">NASA Space Apps 2026</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Harmonization of MODIS &amp; VIIRS Hot Spots
            </h3>
            <p className="text-sm text-[#9AA6B2] mb-5 leading-relaxed">
              Understanding how burning activity is distributed across Earth over time—including
              wildfires and agricultural burns intense enough to be detected by satellite sensors—can
              support monitoring, analysis, and improved understanding of fire activity.
            </p>

            <p className="text-sm text-[#9AA6B2] mb-5 leading-relaxed">
              NASA’s MODIS and VIIRS instruments provide valuable active-fire observations. However,
              observations from different satellite sensors can appear as separate hotspot detections
              even when they may represent the same underlying fire event. FireFusion explores a method
              for harmonizing these observations into a unified fire-event perspective.
            </p>

            <div className="p-4 rounded-xl bg-[#111923] border border-white/5 space-y-2 text-xs font-mono text-[#9AA6B2] mb-5">
              <div className="text-white font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#FFB547]" />
                Core Problem
              </div>
              <p className="text-[#9AA6B2] leading-relaxed">
                Multiple satellite sensors can observe the same fire but produce separate or slightly
                different hotspot detections. This can make it difficult to determine which detections
                belong to the same real-world fire event.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Category: Earth Science + Software</span>
            <span className="text-[#42A5FF]">Global Challenge</span>
          </div>
        </div>

        {/* 2. Our Solution */}
        <div className="rounded-2xl bg-[#0B1018] border border-[#FF6A2A]/30 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-[#FF6A2A]/5 hover:border-[#FF6A2A]/50 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A2A]/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#FF6A2A] font-bold px-2.5 py-0.5 rounded bg-[#FF6A2A]/10 border border-[#FF6A2A]/30">
                2. OUR SOLUTION
              </span>
              <span className="text-xs font-mono text-[#55C98A] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                FireFusion Platform
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">
              One Fire. Multiple Satellites. One Harmonized View.
            </h3>
            <p className="text-sm text-[#9AA6B2] mb-5 leading-relaxed">
              FireFusion processes and groups MODIS and VIIRS fire observations using spatial and temporal
              relationships to create a harmonized fire-event view. Rather than forcing observations or
              FRP measurements to be identical, FireFusion preserves the native information from MODIS and
              VIIRS, evaluates their spatial and temporal relationships, and transforms those observations
              into unified FireFusion events and an interpretable Burning Activity Calendar.
            </p>

            {/* Problem -> Solution Flow Visual */}
            <div className="p-4 rounded-xl bg-[#151F2B] border border-white/10 text-xs font-mono mb-5 space-y-2">
              <div className="text-white font-bold flex items-center gap-1.5 mb-2">
                <GitMerge className="w-4 h-4 text-[#FFB000]" />
                Problem &rarr; Solution Transformation
              </div>
              <div className="flex flex-col gap-1.5 text-[11px]">
                <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
                  <span className="text-[#9AA6B2]">Separate Satellite Observations</span>
                  <span className="text-white">MODIS (1 km) + VIIRS (375 m)</span>
                </div>
                <div className="text-center text-white/30 text-xs">&darr;</div>
                <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
                  <span className="text-[#9AA6B2]">Potentially Duplicate / Related Hotspots</span>
                  <span className="text-[#FFB547]">Different Overpasses &amp; Offsets</span>
                </div>
                <div className="text-center text-white/30 text-xs">&darr;</div>
                <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
                  <span className="text-[#9AA6B2]">Spatial + Temporal Analysis</span>
                  <span className="text-[#42A5FF]">Geodesic &amp; Overpass Windowing</span>
                </div>
                <div className="text-center text-white/30 text-xs">&darr;</div>
                <div className="flex items-center justify-between p-2 rounded bg-[#55C98A]/10 border border-[#55C98A]/30">
                  <span className="text-[#55C98A] font-bold">Harmonized Fire Events</span>
                  <span className="text-white font-bold">Unified Fire Intelligence</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Methodology: Spatial &amp; Temporal Analysis</span>
            <span className="text-[#FF6A2A]">ST-DBSCAN Architecture</span>
          </div>
        </div>
      </div>

      {/* Subsection 3: How FireFusion Works */}
      <div className="rounded-2xl bg-[#0B1018] border border-white/10 p-6 sm:p-10 mb-16 shadow-xl relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#55C98A] uppercase tracking-wider mb-1">
              <GitMerge className="w-3.5 h-3.5" />
              <span>3. HOW FIREFUSION WORKS</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              End-to-End Processing Workflow
            </h3>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#9AA6B2]">
            <Database className="w-3.5 h-3.5 text-[#42A5FF]" />
            <span>MODIS &amp; VIIRS Data Pipeline</span>
          </div>
        </div>

        {/* Workflow Diagram Banner */}
        <div className="p-4 rounded-xl bg-[#05070B] border border-white/5 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] gap-2 text-center text-xs font-mono">
            <div className="flex-1 p-2.5 rounded-lg bg-[#111923] border border-[#42A5FF]/30 text-white font-semibold">
              <span className="text-[10px] text-[#42A5FF] block">STEP 1</span>
              MODIS + VIIRS
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 shrink-0" />
            <div className="flex-1 p-2.5 rounded-lg bg-[#111923] border border-white/10 text-white font-semibold">
              <span className="text-[10px] text-[#55C98A] block">STEP 2</span>
              DATA NORMALIZATION
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 shrink-0" />
            <div className="flex-1 p-2.5 rounded-lg bg-[#111923] border border-white/10 text-white font-semibold">
              <span className="text-[10px] text-[#FF6A2A] block">STEP 3</span>
              SPATIAL &amp; TEMPORAL MATCHING
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 shrink-0" />
            <div className="flex-1 p-2.5 rounded-lg bg-[#111923] border border-white/10 text-white font-semibold">
              <span className="text-[10px] text-[#FFB000] block">STEP 4</span>
              FIRE EVENT HARMONIZATION
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 shrink-0" />
            <div className="flex-1 p-2.5 rounded-lg bg-[#111923] border border-white/10 text-white font-semibold">
              <span className="text-[10px] text-[#A855F7] block">STEP 5</span>
              UNIFIED FIRE INTELLIGENCE
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 shrink-0" />
            <div className="flex-1 p-2.5 rounded-lg bg-[#151F2B] border border-[#00D9FF]/40 text-[#00D9FF] font-semibold">
              <span className="text-[10px] text-[#00D9FF] block">STEP 6 &amp; 7</span>
              INTERACTIVE MAP
            </div>
          </div>
        </div>

        {/* 7 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {workflowSteps.map((ws) => (
            <div
              key={ws.num}
              className="p-4 rounded-xl bg-[#111923] border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${ws.color}15`,
                      color: ws.color,
                      border: `1px solid ${ws.color}35`,
                    }}
                  >
                    Step {ws.num}
                  </span>
                  <span className="text-[11px] font-mono text-[#9AA6B2]">{ws.tag}</span>
                </div>
                <h4 className="font-display font-bold text-sm text-white mb-1.5">{ws.title}</h4>
                <p className="text-xs text-[#9AA6B2] leading-relaxed">{ws.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Important Data Disclaimer Callout */}
        <div className="p-4 rounded-xl bg-[#151F2B] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-start sm:items-center gap-2.5 text-[#FFB547]">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>IMPORTANT DATA DISCLAIMER — Prototype / Demonstration Data:</strong> Observations
              visualized in this prototype are derived from curated, validated NASA FIRMS active-fire
              records (Collection 2 VIIRS NOAA-20/21 and Collection 6.1 MODIS). FireFusion does not claim
              simulated or demonstration data to be unverified real-time satellite telemetry.
            </span>
          </div>
          <span className="px-2.5 py-1 rounded bg-white/10 text-white text-[11px] whitespace-nowrap font-semibold">
            Prototype / Demonstration Data
          </span>
        </div>
      </div>

      {/* Subsection 4: The Team (Global Synthetic Squad - G.S.S) */}
      <div className="mb-16 relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#42A5FF] uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>4. THE TEAM</span>
            </div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              GLOBAL SYNTHETIC SQUAD (G.S.S)
            </h3>
            <p className="text-sm text-[#9AA6B2] mt-1">
              The Team Behind FireFusion &middot; NASA Space Apps Challenge 2026
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-[#111923] border border-white/10 text-xs font-mono text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#55C98A]" />
            <span>6 Team Members</span>
          </div>
        </div>

        {/* 6 Professional Team Cards: Desktop 3x2, Tablet 2x3, Mobile 1x6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              onClick={() => setSelectedMember(member)}
              className="rounded-2xl bg-[#0B1018] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all hover:-translate-y-1 group cursor-pointer shadow-xl"
            >
              <div>
                {/* Official Team Member Portrait Banner Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/60 border-b border-white/10">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.position}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1018] via-transparent to-transparent opacity-80" />

                  {/* Position Pill Overlay */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-lg backdrop-blur-md"
                      style={{
                        backgroundColor: `${member.accentColor}25`,
                        borderColor: `${member.accentColor}50`,
                        color: member.accentColor,
                      }}
                    >
                      {member.position}
                    </span>
                  </div>

                  {/* Quick Expand Icon */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 border border-white/20 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5">
                  <h4 className="font-display font-bold text-lg text-white mb-2.5 group-hover:text-[#42A5FF] transition-colors">
                    {member.name}
                  </h4>

                  {/* Authentic Role Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {member.roles.map((role, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/90"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#9AA6B2]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C98A]" />
                  <span>G.S.S. NASA Space Apps</span>
                </span>
                <span className="text-[#42A5FF] text-[10px] group-hover:underline">View Card &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Team Member Lightbox Modal */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#0B1018] border border-white/20 rounded-2xl p-5 shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${selectedMember.accentColor}25`,
                      color: selectedMember.accentColor,
                    }}
                  >
                    {selectedMember.position}
                  </span>
                  <span className="font-display font-bold text-white text-base">
                    {selectedMember.name}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 rounded-lg text-[#9AA6B2] hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-2 flex items-center justify-center">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#9AA6B2]">
                <div className="flex items-center gap-2">
                  <span>Roles:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedMember.roles.map((r, i) => (
                      <span key={i} className="text-white px-2 py-0.5 rounded bg-white/10 text-[11px]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[#55C98A]">GLOBAL SYNTHETIC SQUAD (G.S.S.) · 2026</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subsection 5: NASA Space Apps Challenge 2026 Information Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0B1018] via-[#111923] to-[#0B1018] border border-white/15 p-6 sm:p-8 relative overflow-hidden shadow-2xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FFB000]">
              <Trophy className="w-3.5 h-3.5" />
              <span>5. NASA SPACE APPS CHALLENGE 2026</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Harmonization of MODIS &amp; VIIRS Hot Spots
            </h3>

            <p className="text-sm text-[#9AA6B2] leading-relaxed max-w-2xl">
              Understanding how burning activity is distributed across Earth over time—including
              wildfires and agricultural burns detectable by satellite—can support monitoring,
              analysis, and improved understanding of fire activity. FireFusion provides an interactive
              harmonized framework and Burning Activity Calendar based on active-fire observations
              from NASA’s MODIS and VIIRS satellite instruments.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#9AA6B2]">
              <div>
                Challenge: <strong className="text-white">Harmonization of MODIS &amp; VIIRS Hot Spots</strong>
              </div>
              <span className="text-white/20">|</span>
              <div>
                Event: <strong className="text-white">NASA Space Apps Challenge 2026</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-5 rounded-xl bg-[#05070B] border border-white/10 text-xs font-mono space-y-3">
            <div className="text-white font-bold pb-2 border-b border-white/10 flex items-center justify-between">
              <span>PROTOTYPE IDENTITY</span>
              <span className="text-[#55C98A]">VERIFIED</span>
            </div>
            <div className="flex justify-between text-[#9AA6B2]">
              <span>Project Name:</span>
              <span className="text-white font-medium">FIRE FUSION</span>
            </div>
            <div className="flex justify-between text-[#9AA6B2]">
              <span>Team Name:</span>
              <span className="text-white font-medium">GLOBAL SYNTHETIC SQUAD (G.S.S)</span>
            </div>
            <div className="flex justify-between text-[#9AA6B2]">
              <span>Status:</span>
              <span className="text-[#FFB000] font-medium">Prototype developed for NASA Space Apps Challenge 2026</span>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-[#9AA6B2] leading-tight">
              *Prototype developed for NASA Space Apps Challenge 2026. This project is an independent hackathon prototype and does not imply official NASA endorsement.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
