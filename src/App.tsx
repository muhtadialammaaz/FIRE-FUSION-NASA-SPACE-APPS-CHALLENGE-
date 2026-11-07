import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveHUD } from './components/LiveHUD';
import { WorkflowShowcase } from './components/WorkflowShowcase';
import { InteractiveMap } from './components/InteractiveMap';
import { EmergencyCoordinationHub } from './components/EmergencyCoordinationHub';
import { LandPrototypeSystem } from './components/LandPrototypeSystem';
import { TheProblem } from './components/TheProblem';
import { SatelliteComparison } from './components/SatelliteComparison';
import { HarmonizationPipeline } from './components/HarmonizationPipeline';
import { FireEventCard } from './components/FireEventCard';
import { BeforeAfter } from './components/BeforeAfter';
import { BurningCalendar } from './components/BurningCalendar';
import { DataValidationDashboard } from './components/DataValidationDashboard';
import { DataPipelineStages } from './components/DataPipelineStages';
import { DataSources } from './components/DataSources';
import { IntelligenceCards } from './components/IntelligenceCards';
import { StorytellingSection } from './components/StorytellingSection';
import { WhyItMatters } from './components/WhyItMatters';
import { ScientificLimitations } from './components/ScientificLimitations';
import { TechStack } from './components/TechStack';
import { AboutFireFusion } from './components/AboutFireFusion';
import { JudgeDemoModal } from './components/JudgeDemoModal';
import { SystemSecurityHub } from './components/SystemSecurityHub';
import { Footer } from './components/Footer';

import {
  AUTHENTIC_VIIRS_OBSERVATIONS,
  AUTHENTIC_MODIS_BENCHMARK_OBSERVATIONS,
  INITIAL_PROVENANCE,
  PREDEFINED_AOIS,
} from './data/firmsData';
import {
  clusterObservationsIntoEvents,
  buildBurningActivityCalendar,
  DEFAULT_PARAMETERS,
} from './services/harmonizationEngine';
import { FireFusionEvent, CalendarPeriod, AreaOfInterest, NormalizedObservation } from './types/fire';

export default function App() {
  const [modisLoaded, setModisLoaded] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<FireFusionEvent | null>(null);
  const [selectedAoi, setSelectedAoi] = useState<AreaOfInterest>(PREDEFINED_AOIS[0]);
  const [granularity, setGranularity] = useState<'day' | 'week' | 'month'>('day');
  const [selectedPeriod, setSelectedPeriod] = useState<CalendarPeriod | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);
  const [liveApiObservations, setLiveApiObservations] = useState<NormalizedObservation[]>([]);
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null);

  // Dynamic observations based on MODIS toggle + live server proxy ingestion
  const observations = useMemo(() => {
    let base = AUTHENTIC_VIIRS_OBSERVATIONS;
    if (modisLoaded) {
      base = [...AUTHENTIC_VIIRS_OBSERVATIONS, ...AUTHENTIC_MODIS_BENCHMARK_OBSERVATIONS];
    }
    if (liveApiObservations.length > 0) {
      return [...liveApiObservations, ...base];
    }
    return base;
  }, [modisLoaded, liveApiObservations]);

  // Dynamically cluster observations into FireFusion Events
  const events = useMemo(() => {
    return clusterObservationsIntoEvents(observations, DEFAULT_PARAMETERS);
  }, [observations]);

  // Dynamically aggregate into the Burning Activity Calendar
  const calendarPeriods = useMemo(() => {
    return buildBurningActivityCalendar(observations, events, granularity);
  }, [observations, events, granularity]);

  // Provenance metadata state
  const provenance = useMemo(() => {
    return {
      ...INITIAL_PROVENANCE,
      modis_available: modisLoaded,
      sources: INITIAL_PROVENANCE.sources.map((s) => {
        if (s.name.includes('MODIS')) {
          return { ...s, loaded: modisLoaded };
        }
        return s;
      }),
    };
  }, [modisLoaded]);

  // Calculate mean association score across events
  const meanAssociationScore = useMemo(() => {
    if (events.length === 0) return 92;
    const sum = events.reduce((acc, ev) => acc + ev.association_score_avg, 0);
    return Math.round(sum / events.length);
  }, [events]);

  const toggleModis = () => {
    setModisLoaded((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusCoords = (coords: [number, number]) => {
    setFocusCoords(coords);
    scrollToSection('fire-map');
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-[#F5F7FA] selection:bg-[#FF6A2A]/30 selection:text-white relative">
      {/* 01 Navigation */}
      <Navbar
        modisLoaded={modisLoaded}
        onToggleModis={toggleModis}
        onLaunchDemo={() => setDemoModalOpen(true)}
        onOpenSecurityHub={() => setSecurityModalOpen(true)}
        totalEvents={events.length}
        totalObs={observations.length}
      />

      <main>
        {/* 02 Hero */}
        <Hero
          onExploreClick={() => scrollToSection('fire-map')}
          onMethodologyClick={() => scrollToSection('methodology')}
          onLaunchDemo={() => setDemoModalOpen(true)}
          onEmergencyClick={() => scrollToSection('emergency-hub')}
          onWorkflowClick={() => scrollToSection('workflow')}
          onLandPrototypeClick={() => scrollToSection('land-prototype')}
          onSecurityClick={() => setSecurityModalOpen(true)}
          modisLoaded={modisLoaded}
          totalEvents={events.length}
        />

        {/* 03 Live Data HUD */}
        <LiveHUD
          provenance={provenance}
          modisLoaded={modisLoaded}
          onToggleModis={toggleModis}
          totalEvents={events.length}
          totalObs={observations.length}
          meanAssociationScore={meanAssociationScore}
        />

        {/* 04 Workflow Showcase (1st Photo: End-to-End Architecture) */}
        <WorkflowShowcase />

        {/* 05 Interactive Fire Map & Responder Units */}
        <InteractiveMap
          observations={observations}
          events={events}
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
          modisLoaded={modisLoaded}
          selectedAoi={selectedAoi}
          onSelectAoi={setSelectedAoi}
          focusCoords={focusCoords}
        />

        {/* 06 Real-Time Emergency Responders & Tactical Coordination Hub */}
        <EmergencyCoordinationHub
          events={events}
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
          onFocusCoordinates={handleFocusCoords}
        />

        {/* 07 Land Prototype System (2nd, 3rd & 4th Photos: Sylvan Sphere 1.0) */}
        <LandPrototypeSystem />

        {/* 08 The Problem */}
        <TheProblem />

        {/* 09 MODIS vs VIIRS Perspective Comparison */}
        <SatelliteComparison />

        {/* 10 Harmonization Pipeline */}
        <HarmonizationPipeline />

        {/* 11 Before vs After */}
        <BeforeAfter />

        {/* 12 Burning Activity Calendar */}
        <BurningCalendar
          periods={calendarPeriods}
          selectedPeriod={selectedPeriod || calendarPeriods[0] || null}
          onSelectPeriod={setSelectedPeriod}
          granularity={granularity}
          onChangeGranularity={setGranularity}
        />

        {/* 13 7-Stage Pipeline Workflow */}
        <DataPipelineStages />

        {/* 14 Data Validation & Quality Dashboard */}
        <DataValidationDashboard provenance={provenance} />

        {/* 15 Data Sources */}
        <DataSources />

        {/* 16 Raw Observations to Useful Intelligence */}
        <IntelligenceCards />

        {/* 17 Visual Storytelling Section */}
        <StorytellingSection />

        {/* 18 Operational & Scientific Value (Why It Matters) */}
        <WhyItMatters />

        {/* 19 Scientific Limitations & Disclaimers */}
        <ScientificLimitations />

        {/* 20 Technical Stack & References */}
        <TechStack />

        {/* 21 About FireFusion: Project Information & NASA Space Apps Challenge */}
        <AboutFireFusion />
      </main>

      {/* 22 Footer */}
      <Footer />

      {/* Fire Event Detail Modal */}
      <FireEventCard
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Judge Interactive Walkthrough Modal */}
      <JudgeDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onSelectEvent={(ev) => {
          setSelectedEvent(ev);
        }}
        onSelectAoi={(aoiId) => {
          const aoi = PREDEFINED_AOIS.find((a) => a.id === aoiId);
          if (aoi) setSelectedAoi(aoi);
        }}
        sampleEvent={events[0]}
        modisLoaded={modisLoaded}
        onToggleModis={toggleModis}
        onScrollToSection={scrollToSection}
      />

      {/* Security Gateway & Telemetry Audit Hub */}
      <SystemSecurityHub
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
      />
    </div>
  );
}
