import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Flame,
  Radio,
  Send,
  Users,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wind,
  Droplets,
  Plane,
  Truck,
  Eye,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Fuel,
  Battery,
  MapPin,
  RefreshCw,
  Bell,
  Sliders,
} from 'lucide-react';
import {
  realtimeDb,
  DEFAULT_RESPONDER_USERS,
} from '../services/realtimeDatabase';
import {
  ResponderUser,
  ResponderUnit,
  IncidentDispatchOrder,
  CivilianSOSReport,
  TacticalRadioMessage,
  FireWeatherConditions,
} from '../types/responder';
import { FireFusionEvent } from '../types/fire';

interface EmergencyCoordinationHubProps {
  events: FireFusionEvent[];
  selectedEvent: FireFusionEvent | null;
  onSelectEvent: (event: FireFusionEvent | null) => void;
  onFocusCoordinates?: (coords: [number, number]) => void;
}

export const EmergencyCoordinationHub: React.FC<EmergencyCoordinationHubProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onFocusCoordinates,
}) => {
  const [currentUser, setCurrentUser] = useState<ResponderUser>(realtimeDb.getUser());
  const [units, setUnits] = useState<ResponderUnit[]>(realtimeDb.getUnits());
  const [dispatches, setDispatches] = useState<IncidentDispatchOrder[]>(realtimeDb.getDispatches());
  const [sosReports, setSosReports] = useState<CivilianSOSReport[]>(realtimeDb.getSosReports());
  const [messages, setMessages] = useState<TacticalRadioMessage[]>(realtimeDb.getMessages());
  const [weather, setWeather] = useState<FireWeatherConditions>(realtimeDb.getWeather());

  const [activeTab, setActiveTab] = useState<'units' | 'sos' | 'radio' | 'weather'>('units');
  const [selectedUnit, setSelectedUnit] = useState<ResponderUnit | null>(null);

  // Dispatch modal form
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [dispatchTargetUnit, setDispatchTargetUnit] = useState<string>('');
  const [dispatchTargetEvent, setDispatchTargetEvent] = useState<string>(events[0]?.event_id || '');
  const [dispatchObjective, setDispatchObjective] = useState<string>('Establish containment line along eastern flank');
  const [dispatchPriority, setDispatchPriority] = useState<IncidentDispatchOrder['priority']>('HIGH');

  // New SOS Modal form
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosReporter, setSosReporter] = useState('');
  const [sosPhone, setSosPhone] = useState('');
  const [sosPeople, setSosPeople] = useState(2);
  const [sosUrgency, setSosUrgency] = useState<'CRITICAL' | 'HIGH' | 'MODERATE'>('HIGH');
  const [sosMessage, setSosMessage] = useState('');

  // Tactical Chat input
  const [chatInput, setChatInput] = useState('');
  const [chatChannel, setChatChannel] = useState<TacticalRadioMessage['channel']>('ALL_UNITS');

  // LACES Checklist states
  const [lacesState, setLacesState] = useState({
    lookouts: true,
    anchor: true,
    comms: true,
    escape: true,
    safetyZones: true,
  });

  // Subscribe to real-time database updates
  useEffect(() => {
    const unsubscribe = realtimeDb.subscribe(() => {
      setCurrentUser(realtimeDb.getUser());
      setUnits(realtimeDb.getUnits());
      setDispatches(realtimeDb.getDispatches());
      setSosReports(realtimeDb.getSosReports());
      setMessages(realtimeDb.getMessages());
      setWeather(realtimeDb.getWeather());
    });
    return unsubscribe;
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    realtimeDb.addMessage(chatChannel, chatInput.trim(), false);
    setChatInput('');
  };

  const handleExecuteDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchTargetUnit) return;

    const ev = events.find((item) => item.event_id === dispatchTargetEvent) || events[0];
    const coords: [number, number] = ev ? [ev.centroid_lat, ev.centroid_lon] : [39.79, -121.43];

    realtimeDb.dispatchUnit(
      dispatchTargetUnit,
      ev ? ev.event_id : 'FF-GENERAL',
      ev ? `${ev.event_id} (${ev.sensor_composition})` : 'Wildfire Front',
      dispatchObjective,
      dispatchPriority,
      coords
    );

    setDispatchModalOpen(false);
  };

  const handleCreateSos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sosReporter.trim() || !sosMessage.trim()) return;

    // Use selected event coords or Sierra coords
    const baseLat = selectedEvent ? selectedEvent.centroid_lat + (Math.random() - 0.5) * 0.04 : 39.77;
    const baseLon = selectedEvent ? selectedEvent.centroid_lon + (Math.random() - 0.5) * 0.04 : -121.49;

    realtimeDb.createSosReport({
      reporterName: sosReporter,
      contactNumber: sosPhone || '+1 (555) 0100',
      latitude: baseLat,
      longitude: baseLon,
      peopleCount: Number(sosPeople) || 1,
      urgency: sosUrgency,
      message: sosMessage,
    });

    setSosReporter('');
    setSosPhone('');
    setSosMessage('');
    setSosModalOpen(false);
  };

  const openSosCount = sosReports.filter((s) => s.status !== 'RESOLVED').length;
  const activePersonnel = units.reduce((acc, u) => acc + u.personnelCount, 0);

  return (
    <section id="emergency-hub" className="relative max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
      {/* Header with Title and User Identity Switcher */}
      <div className="rounded-2xl bg-gradient-to-b from-[#111923] to-[#0B1018] border border-white/10 p-6 shadow-2xl mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3D1F]/20 border border-[#FF3D1F]/40 text-xs font-mono text-[#FF6A2A] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF3D1F] animate-ping" />
              <span>INCIDENT COMMAND SYSTEM (ICS-2026) · REAL-TIME DISPATCH</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight flex items-center gap-3">
              <span>Emergency Responders Coordination Hub</span>
            </h2>
            <p className="text-sm text-[#9AA6B2] mt-1.5 max-w-2xl">
              Bridge satellite fire detections with ground units. Dispatch air tankers, bulldozers, hotshot crews, and civilian evacuation teams in real-time.
            </p>
          </div>

          {/* User Role Switcher */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#05070B] border border-white/10 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6A2A] to-[#FF3D1F] flex items-center justify-center text-white font-bold font-mono text-sm shrink-0">
              {currentUser.callsign.slice(0, 2)}
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-[10px] font-mono text-[#9AA6B2] uppercase">
                ACTIVE RESPONDER PROFILE
              </div>
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const u = DEFAULT_RESPONDER_USERS.find((usr) => usr.id === e.target.value);
                  if (u) realtimeDb.setUser(u);
                }}
                className="w-full bg-transparent text-white font-mono text-xs font-bold focus:outline-none cursor-pointer mt-0.5"
              >
                {DEFAULT_RESPONDER_USERS.map((usr) => (
                  <option key={usr.id} value={usr.id} className="bg-[#0B1018] text-white">
                    {usr.name} ({usr.callsign} — {usr.role.replace(/_/g, ' ')})
                  </option>
                ))}
              </select>
              <div className="text-[10px] text-[#42A5FF] font-mono truncate">
                {currentUser.agency}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Operational Metrics HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 rounded-xl bg-[#0B1018] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] flex items-center justify-between">
              <span>DEPLOYED UNITS</span>
              <Users className="w-3.5 h-3.5 text-[#55C98A]" />
            </div>
            <div className="text-2xl font-bold font-display text-white mt-1">
              {units.length} <span className="text-xs text-[#55C98A] font-mono font-normal">({activePersonnel} Personnel)</span>
            </div>
            <div className="text-[11px] text-[#9AA6B2] mt-0.5">
              1 Air Tanker · 1 Hotshot · 1 Dozer · 1 UAV
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1018] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] flex items-center justify-between">
              <span>CIVILIAN SOS ALERTS</span>
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="text-2xl font-bold font-display text-red-400 mt-1 flex items-baseline gap-2">
              <span>{openSosCount} PENDING</span>
              {openSosCount > 0 && <span className="text-xs text-red-300 font-mono animate-pulse">CRITICAL</span>}
            </div>
            <div className="text-[11px] text-[#9AA6B2] mt-0.5">
              {sosReports.filter((s) => s.status === 'ASSIGNED').length} in rescue progress
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1018] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] flex items-center justify-between">
              <span>FIRE SPREAD RATE (ROS)</span>
              <Wind className="w-3.5 h-3.5 text-[#FFB000]" />
            </div>
            <div className="text-2xl font-bold font-display text-[#FFB000] mt-1">
              {weather.rateOfSpreadChainsPerHour} <span className="text-xs font-mono font-normal">ch/hr (~560 m/h)</span>
            </div>
            <div className="text-[11px] text-[#9AA6B2] mt-0.5">
              Wind: {weather.windSpeedKmh} km/h {weather.windDirectionLabel}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1018] border border-white/5">
            <div className="text-[11px] font-mono text-[#9AA6B2] flex items-center justify-between">
              <span>LACES SAFETY PROTOCOL</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#42A5FF]" />
            </div>
            <div className="text-2xl font-bold font-display text-white mt-1 flex items-center gap-1.5">
              <span className="text-[#55C98A]">100%</span>
              <span className="text-xs font-mono text-[#9AA6B2] font-normal">COMPLIANT</span>
            </div>
            <div className="text-[11px] text-[#55C98A] mt-0.5">
              Escape Routes & Safety Zones Active
            </div>
          </div>
        </div>
      </div>

      {/* Main Coordination Tabs */}
      <div className="rounded-2xl bg-[#0B1018] border border-white/10 shadow-2xl overflow-hidden">
        {/* Tab Headers & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-6 pt-4 bg-[#111923]/60 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('units')}
              className={`py-3 px-4 text-xs font-mono font-medium border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'units'
                  ? 'border-[#FF6A2A] text-white'
                  : 'border-transparent text-[#9AA6B2] hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-[#FF6A2A]" />
              <span>Tactical Units & Dispatch ({units.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sos')}
              className={`py-3 px-4 text-xs font-mono font-medium border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'sos'
                  ? 'border-red-500 text-white'
                  : 'border-transparent text-[#9AA6B2] hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Civilian SOS / Evac Beacons ({openSosCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('radio')}
              className={`py-3 px-4 text-xs font-mono font-medium border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'radio'
                  ? 'border-[#42A5FF] text-white'
                  : 'border-transparent text-[#9AA6B2] hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 text-[#42A5FF]" />
              <span>Tactical Radio Sitreps ({messages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('weather')}
              className={`py-3 px-4 text-xs font-mono font-medium border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'weather'
                  ? 'border-[#FFB000] text-white'
                  : 'border-transparent text-[#9AA6B2] hover:text-white'
              }`}
            >
              <Wind className="w-4 h-4 text-[#FFB000]" />
              <span>Fire Weather & LACES Safety</span>
            </button>
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-2 pb-3">
            <button
              onClick={() => {
                setDispatchTargetUnit(units[0]?.id || '');
                setDispatchModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6A2A] to-[#FF3D1F] text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-md shadow-[#FF6A2A]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Dispatch Unit Order</span>
            </button>

            <button
              onClick={() => setSosModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-mono flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Log SOS Beacon</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Tactical Units & Dispatch Orders */}
        {activeTab === 'units' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {units.map((unit) => {
                const isSelected = selectedUnit?.id === unit.id;
                let statusBadge = 'bg-[#55C98A]/20 text-[#55C98A] border-[#55C98A]/40';
                if (unit.status === 'ENGAGING_FLANK' || unit.status === 'RETARDANT_DROP') {
                  statusBadge = 'bg-[#FF6A2A]/20 text-[#FF6A2A] border-[#FF6A2A]/40';
                } else if (unit.status === 'EN_ROUTE' || unit.status === 'EVACUATING') {
                  statusBadge = 'bg-[#42A5FF]/20 text-[#42A5FF] border-[#42A5FF]/40';
                } else if (unit.status === 'REFUELING') {
                  statusBadge = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
                }

                return (
                  <div
                    key={unit.id}
                    onClick={() => {
                      setSelectedUnit(unit);
                      if (onFocusCoordinates) {
                        onFocusCoordinates([unit.latitude, unit.longitude]);
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#141E2C] border-[#42A5FF] shadow-lg shadow-[#42A5FF]/10'
                        : 'bg-[#0B1018] border-white/10 hover:border-white/20 hover:bg-[#111923]'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        {unit.type === 'HELITACK' && <Plane className="w-4 h-4 text-[#42A5FF]" />}
                        {unit.type === 'ENGINE' && <Truck className="w-4 h-4 text-[#FF6A2A]" />}
                        {unit.type === 'HOTSHOT' && <Users className="w-4 h-4 text-amber-400" />}
                        {unit.type === 'BULLDOZER' && <Compass className="w-4 h-4 text-orange-400" />}
                        {unit.type === 'DRONE' && <Eye className="w-4 h-4 text-purple-400" />}
                        {unit.type === 'EVAC_SQUAD' && <AlertTriangle className="w-4 h-4 text-emerald-400" />}
                        <span className="font-mono text-xs font-bold text-white truncate max-w-[150px]">
                          {unit.callsign}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${statusBadge}`}>
                        {unit.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-[#9AA6B2] mt-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span>GPS Coordinates:</span>
                        <span className="font-mono text-white text-[11px]">
                          {unit.latitude.toFixed(4)}°, {unit.longitude.toFixed(4)}°
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Personnel:</span>
                        <span className="font-mono text-white text-[11px]">
                          {unit.personnelCount} responders
                        </span>
                      </div>
                      {unit.waterCapacityGal > 0 && (
                        <div className="flex items-center justify-between">
                          <span>Water / Retardant:</span>
                          <span className="font-mono text-[#42A5FF] text-[11px]">
                            {unit.waterRemainingGal} / {unit.waterCapacityGal} gal
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span>Fuel / Battery:</span>
                        <span className="font-mono text-white text-[11px]">
                          {unit.fuelPercent}% {unit.batteryPercent ? `(Batt ${unit.batteryPercent}%)` : ''}
                        </span>
                      </div>
                    </div>

                    {/* Objective Box */}
                    <div className="mt-3 p-2.5 rounded-lg bg-[#05070B] border border-white/5 text-[11px] text-white/90">
                      <span className="text-[#9AA6B2] font-mono block text-[9px] uppercase">
                        Current Tactical Objective
                      </span>
                      {unit.tacticalObjective}
                    </div>

                    {/* Quick Action buttons for Unit */}
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDispatchTargetUnit(unit.id);
                          setDispatchModalOpen(true);
                        }}
                        className="flex-1 py-1 px-2 rounded bg-white/5 hover:bg-white/10 text-white text-[11px] font-mono border border-white/10 transition-colors"
                      >
                        Re-assign Objective
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const nextStatus: ResponderUnit['status'] =
                            unit.status === 'ENGAGING_FLANK' ? 'HOLDING_LINE' : 'ENGAGING_FLANK';
                          realtimeDb.updateUnitStatus(unit.id, nextStatus);
                        }}
                        className="py-1 px-2 rounded bg-[#FF6A2A]/20 hover:bg-[#FF6A2A]/30 text-[#FF6A2A] text-[11px] font-mono border border-[#FF6A2A]/30 transition-colors"
                      >
                        Toggle Action
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Dispatch Orders Log */}
            <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#42A5FF]" />
                  <span>ACTIVE TACTICAL DISPATCH ORDERS ({dispatches.length})</span>
                </span>
                <span className="text-[11px] font-mono text-[#9AA6B2]">
                  Ordered by Incident Command
                </span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {dispatches.map((disp) => (
                  <div
                    key={disp.id}
                    className="p-3 rounded-lg bg-[#111923] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{disp.unitCallsign}</span>
                        <span className="text-[#9AA6B2]">→</span>
                        <span className="text-[#FFB000] font-mono">{disp.eventName}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                            disp.priority === 'IMMEDIATE'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {disp.priority}
                        </span>
                      </div>
                      <div className="text-white/80">{disp.objective}</div>
                      <div className="text-[10px] text-[#9AA6B2] font-mono">
                        By {disp.orderedBy} · {new Date(disp.orderedAt).toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#55C98A]/20 text-[#55C98A] border border-[#55C98A]/30">
                        {disp.status}
                      </span>
                      {disp.status !== 'COMPLETED' && (
                        <button
                          onClick={() => realtimeDb.completeDispatch(disp.id)}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono transition-colors"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Civilian SOS & Evacuation Tracker */}
        {activeTab === 'sos' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Civilian Distress Beacons & Evacuation Requests</span>
                </h3>
                <p className="text-xs text-[#9AA6B2]">
                  Real-time rescue tracking. Coordinate rapid extraction with Evacuation Squads & Helitack.
                </p>
              </div>

              <button
                onClick={() => setSosModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log New Civilian SOS</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sosReports.map((sos) => {
                const isResolved = sos.status === 'RESOLVED';
                return (
                  <div
                    key={sos.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isResolved
                        ? 'bg-[#0B1018]/50 border-white/5 opacity-60'
                        : sos.urgency === 'CRITICAL'
                        ? 'bg-red-950/20 border-red-500/40 shadow-lg shadow-red-500/5'
                        : 'bg-[#111923] border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isResolved ? 'bg-gray-500' : 'bg-red-500 animate-ping'
                          }`}
                        />
                        <span className="font-mono text-xs font-bold text-white">
                          SOS BEACON #{sos.id.slice(-4)}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                          isResolved
                            ? 'bg-white/5 text-[#9AA6B2] border-white/10'
                            : 'bg-red-500/20 text-red-400 border-red-500/40'
                        }`}
                      >
                        {sos.urgency} · {sos.status}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[#9AA6B2]">
                        <span>Reporter:</span>
                        <span className="text-white font-medium">{sos.reporterName}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#9AA6B2]">
                        <span>Occupants Trapped:</span>
                        <span className="text-red-400 font-bold font-mono">
                          {sos.peopleCount} civilians
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#9AA6B2]">
                        <span>Coordinates:</span>
                        <span className="font-mono text-white">
                          {sos.latitude.toFixed(4)}°, {sos.longitude.toFixed(4)}°
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#05070B] border border-white/5 text-white/90 text-xs">
                        &quot;{sos.message}&quot;
                      </div>

                      {sos.assignedUnitCallsign && (
                        <div className="text-[11px] text-[#55C98A] font-mono flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Assigned Unit: {sos.assignedUnitCallsign}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      {!isResolved && (
                        <>
                          <button
                            onClick={() => realtimeDb.assignSosToUnit(sos.id, 'unit_evac_3')}
                            className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#42A5FF]/20 hover:bg-[#42A5FF]/30 text-[#42A5FF] border border-[#42A5FF]/30 text-xs font-mono font-medium transition-colors"
                          >
                            Dispatch Evac-Squad-3
                          </button>
                          <button
                            onClick={() => realtimeDb.resolveSos(sos.id)}
                            className="py-1.5 px-3 rounded-lg bg-[#55C98A]/20 hover:bg-[#55C98A]/30 text-[#55C98A] border border-[#55C98A]/30 text-xs font-mono transition-colors"
                          >
                            Mark Rescued
                          </button>
                        </>
                      )}
                      {isResolved && (
                        <span className="text-xs text-[#9AA6B2] font-mono">
                          Rescue Operation Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Tactical Radio & Sitrep Comms Feed */}
        {activeTab === 'radio' && (
          <div className="p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#9AA6B2]">TACTICAL CHANNEL:</span>
                {(['ALL_UNITS', 'COMMAND', 'AIR_OPS', 'GROUND_OPS', 'EVAC'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setChatChannel(ch)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      chatChannel === ch
                        ? 'bg-[#42A5FF] text-[#05070B] font-bold'
                        : 'bg-white/5 text-[#9AA6B2] hover:text-white'
                    }`}
                  >
                    {ch.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-[#55C98A] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C98A] animate-pulse" />
                <span>ENCRYPTED TACTICAL MESH ACTIVE</span>
              </div>
            </div>

            {/* Messages Log */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl border text-xs ${
                    msg.isAlert
                      ? 'bg-red-950/30 border-red-500/40'
                      : 'bg-[#111923] border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1 text-[#9AA6B2]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">{msg.callsign}</span>
                      <span className="text-[10px] text-[#42A5FF] font-mono">[{msg.senderRole.replace(/_/g, ' ')}]</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-[#9AA6B2] font-mono">
                        CH: {msg.channel}
                      </span>
                    </div>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>
                  <div className={`mt-1 text-sm ${msg.isAlert ? 'text-red-200 font-medium' : 'text-white/90'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendChat} className="flex gap-2 pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Broadcast sitrep on ${chatChannel} as ${currentUser.callsign}...`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#05070B] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#42A5FF]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#42A5FF] to-[#00D9FF] text-[#05070B] text-xs font-mono font-bold flex items-center gap-1.5 hover:opacity-90"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Fire Weather & LACES Safety Protocols */}
        {activeTab === 'weather' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Live Fire Weather Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <Wind className="w-4 h-4 text-[#FFB000]" />
                    <span>SURFACE FIRE WEATHER & BEHAVIOR MATRIX</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-400 border border-red-500/40">
                    RED FLAG WARNING
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px] font-mono">AIR TEMP & RH</div>
                    <div className="text-base font-bold text-white mt-1">
                      {weather.temperatureC}°C · {weather.humidityPercent}% RH
                    </div>
                    <div className="text-[10px] text-red-400 mt-0.5">Critical 1-hr fuel moisture: 4.8%</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px] font-mono">WIND VELOCITY & GUSTS</div>
                    <div className="text-base font-bold text-white mt-1">
                      {weather.windSpeedKmh} km/h (Gusts {weather.windGustsKmh})
                    </div>
                    <div className="text-[10px] text-[#FFB000] mt-0.5">Vector: {weather.windDirectionLabel}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px] font-mono">HAINES INDEX (INSTABILITY)</div>
                    <div className="text-base font-bold text-[#FF6A2A] mt-1">
                      {weather.hainesIndex} / 6 ({weather.hainesRisk})
                    </div>
                    <div className="text-[10px] text-[#9AA6B2] mt-0.5">Extreme dry air plume potential</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px] font-mono">FLAME LENGTH & SPREAD</div>
                    <div className="text-base font-bold text-white mt-1">
                      {weather.flameLengthMeters}m · {weather.rateOfSpreadChainsPerHour} ch/hr
                    </div>
                    <div className="text-[10px] text-[#55C98A] mt-0.5">Active flanking behavior</div>
                  </div>
                </div>
              </div>

              {/* LACES Protocol Checklist */}
              <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#55C98A]" />
                    <span className="font-mono text-xs font-bold text-white">
                      WILDLAND FIRE LACES SAFETY PROTOCOL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#55C98A]">ALL CHECKED</span>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-3 p-2 rounded-lg bg-[#111923] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lacesState.lookouts}
                      onChange={(e) => setLacesState({ ...lacesState, lookouts: e.target.checked })}
                      className="accent-[#55C98A] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-white font-mono">L — Lookouts:</span>
                      <span className="text-[#9AA6B2] ml-2">Dedicated observer posted on high vantage point</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2 rounded-lg bg-[#111923] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lacesState.anchor}
                      onChange={(e) => setLacesState({ ...lacesState, anchor: e.target.checked })}
                      className="accent-[#55C98A] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-white font-mono">A — Anchor Points:</span>
                      <span className="text-[#9AA6B2] ml-2">Handline tied to paved highway buffer</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2 rounded-lg bg-[#111923] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lacesState.comms}
                      onChange={(e) => setLacesState({ ...lacesState, comms: e.target.checked })}
                      className="accent-[#55C98A] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-white font-mono">C — Communications:</span>
                      <span className="text-[#9AA6B2] ml-2">Simplex VHF command net operational</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2 rounded-lg bg-[#111923] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lacesState.escape}
                      onChange={(e) => setLacesState({ ...lacesState, escape: e.target.checked })}
                      className="accent-[#55C98A] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-white font-mono">E — Escape Routes:</span>
                      <span className="text-[#9AA6B2] ml-2">Two distinct downhill egress paths flagged</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-2 rounded-lg bg-[#111923] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lacesState.safetyZones}
                      onChange={(e) => setLacesState({ ...lacesState, safetyZones: e.target.checked })}
                      className="accent-[#55C98A] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-white font-mono">S — Safety Zones:</span>
                      <span className="text-[#9AA6B2] ml-2">Pre-cleared 4x flame length safety zone on helipad</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dispatch Modal */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0B1018] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#FF6A2A]" />
              <span>Issue Tactical Dispatch Order</span>
            </h3>

            <form onSubmit={handleExecuteDispatch} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#9AA6B2] mb-1">SELECT RESPONDER UNIT:</label>
                <select
                  value={dispatchTargetUnit}
                  onChange={(e) => setDispatchTargetUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111923] border border-white/10 text-white focus:outline-none"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.callsign} ({u.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#9AA6B2] mb-1">TARGET FIRE EVENT / SECTOR:</label>
                <select
                  value={dispatchTargetEvent}
                  onChange={(e) => setDispatchTargetEvent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111923] border border-white/10 text-white focus:outline-none"
                >
                  {events.map((ev) => (
                    <option key={ev.event_id} value={ev.event_id}>
                      {ev.event_id} — FRP: {ev.total_frp_mw} MW ({ev.sensor_composition})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#9AA6B2] mb-1">ORDER PRIORITY:</label>
                <div className="flex gap-2">
                  {(['IMMEDIATE', 'HIGH', 'ROUTINE'] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setDispatchPriority(p)}
                      className={`flex-1 py-1.5 rounded-lg border transition-colors ${
                        dispatchPriority === p
                          ? 'bg-[#FF6A2A] text-white border-[#FF6A2A]'
                          : 'bg-white/5 text-[#9AA6B2] border-white/10'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#9AA6B2] mb-1">TACTICAL OBJECTIVE:</label>
                <textarea
                  rows={3}
                  value={dispatchObjective}
                  onChange={(e) => setDispatchObjective(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111923] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDispatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF6A2A] to-[#FF3D1F] text-white font-bold"
                >
                  Confirm & Transmit Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0B1018] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>Log Incoming Civilian SOS Distress Signal</span>
            </h3>

            <form onSubmit={handleCreateSos} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#9AA6B2] mb-1">REPORTER NAME OR IDENTIFIER:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Sanchez / Rim Road Resident"
                  value={sosReporter}
                  onChange={(e) => setSosReporter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111923] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#9AA6B2] mb-1">PHONE / INREACH ID:</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 0123"
                    value={sosPhone}
                    onChange={(e) => setSosPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#111923] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#9AA6B2] mb-1">CIVILIANS AT RISK:</label>
                  <input
                    type="number"
                    min="1"
                    value={sosPeople}
                    onChange={(e) => setSosPeople(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#111923] border border-white/10 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#9AA6B2] mb-1">URGENCY LEVEL:</label>
                <div className="flex gap-2">
                  {(['CRITICAL', 'HIGH', 'MODERATE'] as const).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setSosUrgency(lvl)}
                      className={`flex-1 py-1.5 rounded-lg border transition-colors ${
                        sosUrgency === lvl
                          ? 'bg-red-600 text-white border-red-500'
                          : 'bg-white/5 text-[#9AA6B2] border-white/10'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#9AA6B2] mb-1">SITUATION DETAILS / TRAPPED REASON:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe road blockage, smoke inhalation, structural threat, etc."
                  value={sosMessage}
                  onChange={(e) => setSosMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111923] border border-white/10 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSosModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
                >
                  Broadcast SOS Distress Beacon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
