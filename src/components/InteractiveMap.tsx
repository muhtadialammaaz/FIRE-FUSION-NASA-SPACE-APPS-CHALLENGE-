import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  MapPin,
  Clock,
  Flame,
  Satellite,
  Maximize2,
  Filter,
  Eye,
  Sliders,
  Sparkles,
  Info,
  Users,
  AlertTriangle,
  Plane,
  Truck,
  Compass,
} from 'lucide-react';
import {
  NormalizedObservation,
  FireFusionEvent,
  AreaOfInterest,
} from '../types/fire';
import { PREDEFINED_AOIS } from '../data/firmsData';
import { realtimeDb } from '../services/realtimeDatabase';
import { ResponderUnit, CivilianSOSReport } from '../types/responder';

interface InteractiveMapProps {
  observations: NormalizedObservation[];
  events: FireFusionEvent[];
  selectedEvent: FireFusionEvent | null;
  onSelectEvent: (event: FireFusionEvent | null) => void;
  modisLoaded: boolean;
  selectedAoi: AreaOfInterest;
  onSelectAoi: (aoi: AreaOfInterest) => void;
  focusCoords?: [number, number] | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  observations,
  events,
  selectedEvent,
  onSelectEvent,
  modisLoaded,
  selectedAoi,
  onSelectAoi,
  focusCoords,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const eventsLayerRef = useRef<L.LayerGroup | null>(null);
  const respondersLayerRef = useRef<L.LayerGroup | null>(null);
  const sosLayerRef = useRef<L.LayerGroup | null>(null);

  // Layer toggles
  const [showViirsN20, setShowViirsN20] = useState(true);
  const [showViirsN21, setShowViirsN21] = useState(true);
  const [showModis, setShowModis] = useState(true);
  const [showHarmonized, setShowHarmonized] = useState(true);
  const [showHeatmapGlow, setShowHeatmapGlow] = useState(true);
  const [showResponders, setShowResponders] = useState(true);
  const [showSos, setShowSos] = useState(true);
  const [timeHour, setTimeHour] = useState(24); // 0-24 UTC timeline slider
  const [mapStyle, setMapStyle] = useState<'satellite' | 'terrain'>('satellite');

  // Real-time Units & SOS State from database
  const [units, setUnits] = useState<ResponderUnit[]>(realtimeDb.getUnits());
  const [sosReports, setSosReports] = useState<CivilianSOSReport[]>(realtimeDb.getSosReports());

  useEffect(() => {
    const unsub = realtimeDb.subscribe(() => {
      setUnits(realtimeDb.getUnits());
      setSosReports(realtimeDb.getSosReports());
    });
    return unsub;
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: selectedAoi.center,
      zoom: selectedAoi.zoom,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Earth Observation Satellite Imagery basemap
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
      }
    ).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    eventsLayerRef.current = L.layerGroup().addTo(map);
    respondersLayerRef.current = L.layerGroup().addTo(map);
    sosLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Center when external focusCoords requested
  useEffect(() => {
    if (!mapInstanceRef.current || !focusCoords) return;
    mapInstanceRef.current.flyTo(focusCoords, 14, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [focusCoords]);

  // Update map center when selected AOI changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(selectedAoi.center, selectedAoi.zoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [selectedAoi]);

  // Update map tile provider when style changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    const tileUrl =
      mapStyle === 'satellite'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';

    L.tileLayer(tileUrl, {
      maxZoom: 18,
    }).addTo(mapInstanceRef.current);
  }, [mapStyle]);

  // Render Responders & Civilian SOS Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !respondersLayerRef.current || !sosLayerRef.current) return;

    respondersLayerRef.current.clearLayers();
    sosLayerRef.current.clearLayers();

    // 1. Render Responders
    if (showResponders) {
      units.forEach((unit) => {
        let iconSymbol = '🚒';
        let bgGradient = 'from-orange-500 to-red-600';
        if (unit.type === 'HELITACK') {
          iconSymbol = '🚁';
          bgGradient = 'from-sky-400 to-blue-600';
        } else if (unit.type === 'HOTSHOT') {
          iconSymbol = '🪓';
          bgGradient = 'from-amber-400 to-yellow-600';
        } else if (unit.type === 'BULLDOZER') {
          iconSymbol = '🚜';
          bgGradient = 'from-yellow-500 to-amber-700';
        } else if (unit.type === 'DRONE') {
          iconSymbol = '🛰️';
          bgGradient = 'from-purple-400 to-indigo-600';
        } else if (unit.type === 'EVAC_SQUAD') {
          iconSymbol = '🚑';
          bgGradient = 'from-emerald-400 to-teal-600';
        }

        const isAction = unit.status === 'ENGAGING_FLANK' || unit.status === 'EN_ROUTE';

        const unitIcon = L.divIcon({
          className: 'custom-responder-marker',
          html: `
            <div class="relative flex items-center justify-center w-10 h-10 cursor-pointer group">
              <div class="absolute inset-0 rounded-full bg-gradient-to-r ${bgGradient} opacity-30 ${isAction ? 'animate-ping' : ''}"></div>
              <div class="w-8 h-8 rounded-full bg-gradient-to-br ${bgGradient} border-2 border-white shadow-xl flex items-center justify-center text-sm transition-transform group-hover:scale-125">
                ${iconSymbol}
              </div>
              <div class="absolute -bottom-4 whitespace-nowrap px-1.5 py-0.2 rounded bg-black/85 border border-white/20 text-[9px] font-mono text-white pointer-events-none shadow">
                ${unit.callsign.split(' ')[0]}
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const marker = L.marker([unit.latitude, unit.longitude], { icon: unitIcon });
        marker.bindPopup(`
          <div class="font-mono text-xs space-y-1.5 p-1 text-white">
            <div class="font-bold flex items-center justify-between border-b border-white/10 pb-1">
              <span>${unit.callsign}</span>
              <span class="text-[#55C98A] text-[10px]">${unit.status.replace(/_/g, ' ')}</span>
            </div>
            <div>Personnel: ${unit.personnelCount} | Fuel: ${unit.fuelPercent}%</div>
            ${unit.waterCapacityGal > 0 ? `<div>Water Remaining: ${unit.waterRemainingGal} / ${unit.waterCapacityGal} gal</div>` : ''}
            <div>Objective: <span class="text-amber-300">${unit.tacticalObjective}</span></div>
            <div>Last GPS Ping: ${new Date(unit.lastCheckIn).toLocaleTimeString()}</div>
          </div>
        `);
        marker.addTo(respondersLayerRef.current!);

        // Line-of-action vector to target coordinates
        if (unit.targetLat && unit.targetLon) {
          const path = L.polyline(
            [
              [unit.latitude, unit.longitude],
              [unit.targetLat, unit.targetLon],
            ],
            {
              color: '#42A5FF',
              weight: 2,
              opacity: 0.6,
              dashArray: '5, 8',
            }
          );
          path.addTo(respondersLayerRef.current!);
        }
      });
    }

    // 2. Render Civilian SOS Beacons
    if (showSos) {
      sosReports.forEach((sos) => {
        if (sos.status === 'RESOLVED') return;

        const sosIcon = L.divIcon({
          className: 'custom-sos-marker',
          html: `
            <div class="relative flex items-center justify-center w-8 h-8 cursor-pointer group">
              <div class="absolute inset-0 rounded-full bg-red-600/40 animate-ping"></div>
              <div class="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow-xl flex items-center justify-center text-[11px] font-bold text-white">
                SOS
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const sosMarker = L.marker([sos.latitude, sos.longitude], { icon: sosIcon });
        sosMarker.bindPopup(`
          <div class="font-mono text-xs space-y-1 p-1 text-white">
            <div class="font-bold text-red-400 flex items-center justify-between border-b border-red-500/20 pb-1">
              <span>DISTRESS BEACON #${sos.id.slice(-4)}</span>
              <span>${sos.peopleCount} TRAPPED</span>
            </div>
            <div>Reporter: ${sos.reporterName}</div>
            <div class="text-amber-200">"${sos.message}"</div>
            <div>Status: <span class="font-bold text-[#FFB000]">${sos.status}</span></div>
          </div>
        `);
        sosMarker.addTo(sosLayerRef.current!);
      });
    }
  }, [units, sosReports, showResponders, showSos]);

  // Render Markers and Events
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !eventsLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    eventsLayerRef.current.clearLayers();

    // 1. Render Harmonized Events (Bounding envelopes and center centroids)
    if (showHarmonized) {
      events.forEach((ev) => {
        const isSelected = selectedEvent?.event_id === ev.event_id;

        // Bounding polygon / box
        const bounds: L.LatLngBoundsExpression = [
          [ev.bounding_box.min_lat - 0.005, ev.bounding_box.min_lon - 0.005],
          [ev.bounding_box.max_lat + 0.005, ev.bounding_box.max_lon + 0.005],
        ];

        const rect = L.rectangle(bounds, {
          color: isSelected ? '#00D9FF' : '#FFB000',
          weight: isSelected ? 2.5 : 1.5,
          opacity: isSelected ? 1 : 0.7,
          fillColor: '#FFB000',
          fillOpacity: isSelected ? 0.2 : 0.08,
          dashArray: isSelected ? undefined : '4, 4',
        });

        rect.on('click', () => onSelectEvent(ev));
        rect.addTo(eventsLayerRef.current!);

        // Centroid Amber Fire Icon
        const centroidIcon = L.divIcon({
          className: 'custom-event-marker',
          html: `
            <div class="relative flex items-center justify-center w-8 h-8 cursor-pointer group">
              <div class="absolute inset-0 rounded-full bg-[#FFB000]/20 animate-radar ${isSelected ? 'scale-150 bg-[#00D9FF]/40' : ''}"></div>
              <div class="w-6 h-6 rounded-full ${isSelected ? 'bg-[#00D9FF] text-[#05070B]' : 'bg-[#FFB000] text-[#05070B]'} shadow-lg flex items-center justify-center font-bold text-[10px] transition-transform group-hover:scale-125 border border-white/60">
                ★
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const centroidMarker = L.marker([ev.centroid_lat, ev.centroid_lon], { icon: centroidIcon });
        centroidMarker.on('click', () => onSelectEvent(ev));
        centroidMarker.bindTooltip(
          `<strong>${ev.event_id}</strong><br/>${ev.sensor_composition}<br/>FRP: ${ev.total_frp_mw} MW · Score: ${ev.association_score_avg}/100`,
          { direction: 'top', className: 'font-mono text-xs' }
        );
        centroidMarker.addTo(eventsLayerRef.current!);
      });
    }

    // 2. Render Individual Satellite Observations
    observations.forEach((obs) => {
      if (obs.quality_flag === 'CROSS_FILE_DUP') return;
      if (obs.sensor === 'MODIS' && !showModis) return;
      if (obs.satellite === 'N20' && !showViirsN20) return;
      if (obs.satellite === 'N21' && !showViirsN21) return;

      let color = '#A855F7'; // VIIRS N20 default
      if (obs.sensor === 'MODIS') {
        color = '#FF4D3D'; // MODIS orange-red
      } else if (obs.satellite === 'N21') {
        color = '#818CF8'; // VIIRS N21 violet
      }

      const isNegative = obs.quality_flag === 'INVALID_FRP';

      const obsIcon = L.divIcon({
        className: 'custom-obs-marker',
        html: `
          <div class="relative w-4 h-4 flex items-center justify-center cursor-pointer group">
            ${showHeatmapGlow ? `<div class="absolute inset-0 rounded-full blur-[2px] opacity-70" style="background-color: ${color};"></div>` : ''}
            <div class="w-2.5 h-2.5 rounded-full border border-white/80 transition-transform group-hover:scale-150" style="background-color: ${color};"></div>
          </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([obs.latitude, obs.longitude], { icon: obsIcon });
      marker.bindPopup(`
        <div class="font-mono text-xs space-y-1 p-1">
          <div class="font-bold text-white flex items-center justify-between border-b border-white/10 pb-1">
            <span>${obs.observation_id}</span>
            <span style="color: ${color}">${obs.sensor} (${obs.satellite})</span>
          </div>
          <div>Coord: ${obs.latitude.toFixed(4)}°, ${obs.longitude.toFixed(4)}°</div>
          <div>UTC: ${obs.acquisition_date} ${obs.acquisition_time}</div>
          <div>FRP: <span class="font-bold text-white">${obs.frp_mw} MW</span> ${isNegative ? '<span class="text-red-400">(INVALID_FRP FLAG)</span>' : ''}</div>
          <div>Quality: ${obs.confidence_native} (${obs.confidence_class})</div>
          <div>Scan/Track: ${obs.scan_km}km &times; ${obs.track_km}km</div>
        </div>
      `);
      marker.addTo(markersLayerRef.current!);
    });
  }, [
    observations,
    events,
    selectedEvent,
    showViirsN20,
    showViirsN21,
    showModis,
    showHarmonized,
    showHeatmapGlow,
  ]);

  return (
    <section id="fire-map" className="relative max-w-7xl mx-auto px-6 py-16">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Interactive Geospatial Intelligence & Responder Tracking</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            See the Fire. Coordinate Responders.
          </h2>
        </div>

        {/* AOI Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#9AA6B2] hidden sm:inline">AREA OF INTEREST:</span>
          <select
            value={selectedAoi.id}
            onChange={(e) => {
              const aoi = PREDEFINED_AOIS.find((a) => a.id === e.target.value);
              if (aoi) onSelectAoi(aoi);
            }}
            className="px-3.5 py-2 rounded-xl bg-[#111923] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#42A5FF] transition-all"
          >
            {PREDEFINED_AOIS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.countryOrRegion})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="rounded-2xl bg-[#0B1018] border border-white/10 overflow-hidden shadow-2xl relative">
        {/* Map Header Floating Overlay Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Left: Layer Toggles */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0B1018]/90 border border-white/10 backdrop-blur-md pointer-events-auto text-xs font-mono shadow-xl">
            <button
              onClick={() => setShowHarmonized(!showHarmonized)}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                showHarmonized
                  ? 'bg-[#FFB000]/20 text-[#FFB000] border border-[#FFB000]/40'
                  : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#FFB000]" />
              Harmonized Events
            </button>

            <button
              onClick={() => setShowResponders(!showResponders)}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                showResponders
                  ? 'bg-[#42A5FF]/20 text-[#42A5FF] border border-[#42A5FF]/40'
                  : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              <Users className="w-3 h-3 text-[#42A5FF]" />
              Responders ({units.length})
            </button>

            <button
              onClick={() => setShowSos(!showSos)}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                showSos
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              SOS Beacons
            </button>

            <button
              onClick={() => setShowViirsN21(!showViirsN21)}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                showViirsN21
                  ? 'bg-[#818CF8]/20 text-[#818CF8] border border-[#818CF8]/40'
                  : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#818CF8]" />
              VIIRS N21
            </button>

            <button
              onClick={() => setShowViirsN20(!showViirsN20)}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                showViirsN20
                  ? 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/40'
                  : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
              VIIRS N20
            </button>

            {modisLoaded && (
              <button
                onClick={() => setShowModis(!showModis)}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                  showModis
                    ? 'bg-[#FF4D3D]/20 text-[#FF4D3D] border border-[#FF4D3D]/40'
                    : 'text-[#9AA6B2] hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#FF4D3D]" />
                MODIS Terra/Aqua
              </button>
            )}

            <button
              onClick={() => setShowHeatmapGlow(!showHeatmapGlow)}
              className={`px-2 py-1 rounded-lg text-[11px] ${
                showHeatmapGlow ? 'text-[#55C98A]' : 'text-[#9AA6B2]'
              }`}
              title="Toggle Heat Glow"
            >
              Glow {showHeatmapGlow ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Right: Map Style & Reset */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0B1018]/90 border border-white/10 backdrop-blur-md pointer-events-auto text-xs font-mono shadow-xl">
            <button
              onClick={() => setMapStyle(mapStyle === 'satellite' ? 'terrain' : 'satellite')}
              className="px-2.5 py-1 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              Basemap: {mapStyle === 'satellite' ? 'Satellite Imagery' : 'Terrain Topo'}
            </button>
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo(selectedAoi.center, selectedAoi.zoom);
                }
              }}
              className="p-1 rounded-lg hover:bg-white/10 text-[#9AA6B2] hover:text-white"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div ref={mapContainerRef} className="w-full h-[72vh] min-h-[520px] z-10" />

        {/* Floating Bottom Timeline Slider */}
        <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-xl bg-[#0B1018]/90 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#42A5FF]" />
            <span className="text-white font-medium">UTC Overpass Timeline:</span>
            <span className="text-[#FFB000]">00:00 — {timeHour.toString().padStart(2, '0')}:00 UTC</span>
          </div>

          <div className="flex-1 max-w-md w-full px-2">
            <input
              type="range"
              min="0"
              max="24"
              value={timeHour}
              onChange={(e) => setTimeHour(Number(e.target.value))}
              className="w-full accent-[#FF6A2A] cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 text-[#9AA6B2] text-[11px]">
            <span className="text-[#42A5FF]">{units.length} Deployed Units</span>
            <span className="text-white/20">|</span>
            <span className="text-[#55C98A]">{events.length} Events In View</span>
          </div>
        </div>
      </div>
    </section>
  );
};
