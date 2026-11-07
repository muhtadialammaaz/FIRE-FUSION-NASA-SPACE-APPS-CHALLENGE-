/**
 * Real-Time Emergency Coordination & Situational Awareness Database
 * Synchronizes responder units, live dispatch orders, citizen SOS beacons,
 * tactical radio chatter, and live NASA satellite telemetry.
 */

import {
  ResponderUser,
  ResponderUnit,
  IncidentDispatchOrder,
  CivilianSOSReport,
  TacticalRadioMessage,
  FireWeatherConditions,
  ApiConfiguration,
} from '../types/responder';
import { NormalizedObservation, FireFusionEvent, AreaOfInterest } from '../types/fire';

const STORAGE_KEYS = {
  USER: 'ff_responder_user_v1',
  UNITS: 'ff_responder_units_v1',
  DISPATCHES: 'ff_dispatches_v1',
  SOS: 'ff_sos_reports_v1',
  MESSAGES: 'ff_tactical_messages_v1',
  API_CONFIG: 'ff_api_config_v1',
};

// Default User (Incident Commander)
export const DEFAULT_RESPONDER_USERS: ResponderUser[] = [
  {
    id: 'usr_ic_01',
    name: 'Capt. Marcus Vance',
    role: 'INCIDENT_COMMANDER',
    callsign: 'COMMAND-1',
    agency: 'GSS Wildfire Task Force / Interagency Fire Center',
    badgeNumber: 'IC-7740',
  },
  {
    id: 'usr_ops_02',
    name: 'Chief Elena Rostova',
    role: 'OPERATIONS_CHIEF',
    callsign: 'OPS-NORTH',
    agency: 'CalFire Division 4',
    badgeNumber: 'OPS-9102',
  },
  {
    id: 'usr_air_03',
    name: 'Maj. David "Falcon" Cole',
    role: 'AIR_TACTICAL_SUPERVISOR',
    callsign: 'AIR-ATTACK-1',
    agency: 'Interagency Air Tanker Base',
    badgeNumber: 'ATGS-331',
  },
  {
    id: 'usr_hs_04',
    name: 'Capt. Sarah Jenkins',
    role: 'HOTSHOT_CREW_LEAD',
    callsign: 'HOTSHOT-LEAD-ALPHA',
    agency: 'Sierra Interagency Hotshots',
    badgeNumber: 'IHC-108',
  },
  {
    id: 'usr_evac_05',
    name: 'Officer Liam Thorne',
    role: 'EVACUATION_OFFICER',
    callsign: 'EVAC-DISPATCH-9',
    agency: 'County Office of Emergency Services',
    badgeNumber: 'OES-404',
  },
  {
    id: 'usr_uav_06',
    name: 'Tech Specialist Maya Lin',
    role: 'UAV_RECON_SPECIALIST',
    callsign: 'SKYSCAN-PILOT',
    agency: 'GSS Autonomous Aerial Recon',
    badgeNumber: 'UAV-012',
  },
];

// Initial Field Units stationed in AOI area (Sierra / Butte County coordinates)
export const INITIAL_RESPONDER_UNITS: ResponderUnit[] = [
  {
    id: 'unit_air_1',
    callsign: 'HELITACK-104 (Bell 412EP)',
    type: 'HELITACK',
    status: 'AVAILABLE',
    latitude: 39.842,
    longitude: -121.528,
    assignedEventId: null,
    assignedEventName: undefined,
    personnelCount: 4,
    waterCapacityGal: 400,
    waterRemainingGal: 400,
    fuelPercent: 88,
    headingDeg: 45,
    speedKmh: 0,
    tacticalObjective: 'Stationed at Helibase Chico, standby for water drop dispatch',
    lastCheckIn: new Date().toISOString(),
  },
  {
    id: 'unit_eng_42',
    callsign: 'ENGINE-42 (Type 3 Wildland)',
    type: 'ENGINE',
    status: 'HOLDING_LINE',
    latitude: 39.771,
    longitude: -121.465,
    assignedEventId: 'FF-000847',
    assignedEventName: 'West Canyon Firefront',
    personnelCount: 5,
    waterCapacityGal: 500,
    waterRemainingGal: 320,
    fuelPercent: 74,
    headingDeg: 130,
    speedKmh: 12,
    tacticalObjective: 'Holding anchor line along North Rim Rd; defending timber structure',
    lastCheckIn: new Date().toISOString(),
  },
  {
    id: 'unit_hotshot_a',
    callsign: 'ALPHA HOTSHOTS (Crew 1)',
    type: 'HOTSHOT',
    status: 'ENGAGING_FLANK',
    latitude: 39.794,
    longitude: -121.432,
    assignedEventId: 'FF-000847',
    assignedEventName: 'West Canyon Firefront',
    personnelCount: 20,
    waterCapacityGal: 120,
    waterRemainingGal: 90,
    fuelPercent: 95,
    headingDeg: 80,
    speedKmh: 4,
    tacticalObjective: 'Constructing handline fuelbreak through oak woodland brush',
    lastCheckIn: new Date().toISOString(),
  },
  {
    id: 'unit_dozer_7',
    callsign: 'DOZER-7 (Cat D8 Heavy)',
    type: 'BULLDOZER',
    status: 'HOLDING_LINE',
    latitude: 39.755,
    longitude: -121.488,
    assignedEventId: 'FF-000847',
    assignedEventName: 'West Canyon Firefront',
    personnelCount: 2,
    waterCapacityGal: 0,
    waterRemainingGal: 0,
    fuelPercent: 62,
    headingDeg: 220,
    speedKmh: 8,
    tacticalObjective: 'Widening secondary containment buffer road to 25 meters',
    lastCheckIn: new Date().toISOString(),
  },
  {
    id: 'unit_drone_1',
    callsign: 'SKYSCAN-X80 (Thermal UAV)',
    type: 'DRONE',
    status: 'ON_SCENE',
    latitude: 39.812,
    longitude: -121.448,
    assignedEventId: 'FF-000847',
    assignedEventName: 'West Canyon Firefront',
    personnelCount: 1,
    waterCapacityGal: 0,
    waterRemainingGal: 0,
    fuelPercent: 100,
    batteryPercent: 79,
    headingDeg: 310,
    speedKmh: 42,
    tacticalObjective: 'FLIR Thermal hotspot tracking, locating spot fires across ridge',
    lastCheckIn: new Date().toISOString(),
  },
  {
    id: 'unit_evac_3',
    callsign: 'EVAC-SQUAD-3 (High-Clearance Van)',
    type: 'EVAC_SQUAD',
    status: 'EVACUATING',
    latitude: 39.762,
    longitude: -121.515,
    assignedEventId: null,
    personnelCount: 3,
    waterCapacityGal: 50,
    waterRemainingGal: 50,
    fuelPercent: 82,
    headingDeg: 270,
    speedKmh: 35,
    tacticalObjective: 'Evacuating residents along Rim Rock Canyon sector B',
    lastCheckIn: new Date().toISOString(),
  },
];

// Initial Dispatch Orders
export const INITIAL_DISPATCH_ORDERS: IncidentDispatchOrder[] = [
  {
    id: 'disp_001',
    eventId: 'FF-000847',
    eventName: 'West Canyon Firefront',
    unitId: 'unit_hotshot_a',
    unitCallsign: 'ALPHA HOTSHOTS (Crew 1)',
    priority: 'HIGH',
    objective: 'Establish 400m direct handline on southeastern flank before expected wind shift',
    orderedBy: 'Capt. Marcus Vance (IC-1)',
    orderedAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
    status: 'EXECUTING',
    targetCoords: [39.794, -121.432],
  },
  {
    id: 'disp_002',
    eventId: 'FF-000847',
    eventName: 'West Canyon Firefront',
    unitId: 'unit_dozer_7',
    unitCallsign: 'DOZER-7 (Cat D8 Heavy)',
    priority: 'IMMEDIATE',
    objective: 'Clear 30m safety buffer along Ridge Rd junction to protect evacuation corridor',
    orderedBy: 'Chief Elena Rostova (OPS-NORTH)',
    orderedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: 'EXECUTING',
    targetCoords: [39.755, -121.488],
  },
  {
    id: 'disp_003',
    eventId: 'FF-000847',
    eventName: 'West Canyon Firefront',
    unitId: 'unit_air_1',
    unitCallsign: 'HELITACK-104 (Bell 412EP)',
    priority: 'HIGH',
    objective: 'Precision water drop on high-FRP spot fire detected north of ravine',
    orderedBy: 'Maj. David Cole (AIR-ATTACK-1)',
    orderedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    status: 'DISPATCHED',
    targetCoords: [39.815, -121.442],
  },
];

// Initial Civilian SOS distress beacons
export const INITIAL_SOS_REPORTS: CivilianSOSReport[] = [
  {
    id: 'sos_001',
    reporterName: 'Arthur Pendelton',
    contactNumber: '+1 (530) 555-0192',
    latitude: 39.764,
    longitude: -121.512,
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    peopleCount: 4,
    urgency: 'CRITICAL',
    message: 'Heavy smoke surrounding ranch house, trees burning along driveway, elderly couple unable to hike out.',
    status: 'ASSIGNED',
    assignedUnitId: 'unit_evac_3',
    assignedUnitCallsign: 'EVAC-SQUAD-3',
  },
  {
    id: 'sos_002',
    reporterName: 'Wilderness Hiker Party (via InReach)',
    contactNumber: '+1 (530) 555-8831',
    latitude: 39.825,
    longitude: -121.415,
    timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    peopleCount: 2,
    urgency: 'HIGH',
    message: 'Trapped near Granite Outcrop, trail cut off by smoke column to south. Have shelter and water.',
    status: 'OPEN',
  },
];

// Initial Tactical Radio Chat / Sitrep log
export const INITIAL_TACTICAL_MESSAGES: TacticalRadioMessage[] = [
  {
    id: 'msg_001',
    senderName: 'Capt. Marcus Vance',
    senderRole: 'INCIDENT_COMMANDER',
    callsign: 'COMMAND-1',
    channel: 'ALL_UNITS',
    content: 'All divisions, FireFusion VIIRS pass at 09:42 UTC detects 840 MW hotspot surge on ridge. Expect spot fires.',
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isAlert: true,
  },
  {
    id: 'msg_002',
    senderName: 'Capt. Sarah Jenkins',
    senderRole: 'HOTSHOT_CREW_LEAD',
    callsign: 'HOTSHOT-LEAD-ALPHA',
    channel: 'GROUND_OPS',
    content: 'Alpha Hotshots on scene at sector East. Anchor point secured at Creek Rd. Flame lengths 8 to 12 feet in manzanita brush.',
    timestamp: new Date(Date.now() - 24 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'msg_003',
    senderName: 'Tech Specialist Maya Lin',
    senderRole: 'UAV_RECON_SPECIALIST',
    callsign: 'SKYSCAN-PILOT',
    channel: 'AIR_OPS',
    content: 'Thermal drone telemetry confirms spot fire 350m ahead of main front, coordinates 39.815 N, -121.442 W. Forwarding to Helitack.',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'msg_004',
    senderName: 'Maj. David Cole',
    senderRole: 'AIR_TACTICAL_SUPERVISOR',
    callsign: 'AIR-ATTACK-1',
    channel: 'AIR_OPS',
    content: 'Helitack-104 en route to spot fire. Water drop inbound within 3 minutes. Ground crews keep clear of drop zone.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export const INITIAL_WEATHER: FireWeatherConditions = {
  locationName: 'Sierra Nevada Foothills / Feather River Basin',
  temperatureC: 34.2,
  humidityPercent: 12,
  windSpeedKmh: 36,
  windGustsKmh: 54,
  windDirectionDeg: 65, // ENE Diablo / Santa Ana style dry offshore wind
  windDirectionLabel: 'ENE (65°)',
  hainesIndex: 6,
  hainesRisk: 'Severe',
  fuelMoisturePercent: 4.8,
  rateOfSpreadChainsPerHour: 28, // approx 560 m/hr
  flameLengthMeters: 4.2,
  redFlagWarning: true,
};

export const INITIAL_API_CONFIG: ApiConfiguration = {
  serverProxyEnabled: true,
  serverKeySecured: true,
  selectedSensor: 'VIIRS_SNPP_NRT',
  nasaDays: 1,
  refreshIntervalSec: 10,
  liveSimulationActive: true,
  openMeteoEnabled: true,
  cadFeedEnabled: true,
  lastSyncTime: new Date().toISOString(),
  connectionStatus: 'SIMULATING',
  encryptionStatus: 'AES_256_ACTIVE',
};

// Database Singleton
class RealtimeDatabase {
  private user: ResponderUser;
  private units: ResponderUnit[];
  private dispatches: IncidentDispatchOrder[];
  private sosReports: CivilianSOSReport[];
  private messages: TacticalRadioMessage[];
  private weather: FireWeatherConditions;
  private apiConfig: ApiConfiguration;
  private listeners: Set<() => void> = new Set();
  private timer: number | null = null;

  constructor() {
    this.user = this.load(STORAGE_KEYS.USER, DEFAULT_RESPONDER_USERS[0]);
    this.units = this.load(STORAGE_KEYS.UNITS, INITIAL_RESPONDER_UNITS);
    this.dispatches = this.load(STORAGE_KEYS.DISPATCHES, INITIAL_DISPATCH_ORDERS);
    this.sosReports = this.load(STORAGE_KEYS.SOS, INITIAL_SOS_REPORTS);
    this.messages = this.load(STORAGE_KEYS.MESSAGES, INITIAL_TACTICAL_MESSAGES);
    this.weather = INITIAL_WEATHER;
    this.apiConfig = this.load(STORAGE_KEYS.API_CONFIG, INITIAL_API_CONFIG);

    this.startSimulationLoop();
  }

  private load<T>(key: string, fallback: T): T {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return fallback;
  }

  private save(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // ignore
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // State Getters
  public getUser(): ResponderUser {
    return this.user;
  }

  public setUser(user: ResponderUser) {
    this.user = user;
    this.save(STORAGE_KEYS.USER, user);
  }

  public getUnits(): ResponderUnit[] {
    return this.units;
  }

  public getDispatches(): IncidentDispatchOrder[] {
    return this.dispatches;
  }

  public getSosReports(): CivilianSOSReport[] {
    return this.sosReports;
  }

  public getMessages(): TacticalRadioMessage[] {
    return this.messages;
  }

  public getWeather(): FireWeatherConditions {
    return this.weather;
  }

  public getApiConfig(): ApiConfiguration {
    return this.apiConfig;
  }

  // Update Methods
  public updateApiConfig(config: Partial<ApiConfiguration>) {
    this.apiConfig = { ...this.apiConfig, ...config };
    this.save(STORAGE_KEYS.API_CONFIG, this.apiConfig);
  }

  public updateUnitStatus(unitId: string, status: ResponderUnit['status'], objective?: string) {
    this.units = this.units.map((u) => {
      if (u.id === unitId) {
        return {
          ...u,
          status,
          tacticalObjective: objective ?? u.tacticalObjective,
          lastCheckIn: new Date().toISOString(),
        };
      }
      return u;
    });
    this.save(STORAGE_KEYS.UNITS, this.units);
  }

  public dispatchUnit(
    unitId: string,
    eventId: string,
    eventName: string,
    objective: string,
    priority: IncidentDispatchOrder['priority'],
    targetCoords: [number, number]
  ) {
    const unit = this.units.find((u) => u.id === unitId);
    if (!unit) return;

    const newDispatch: IncidentDispatchOrder = {
      id: `disp_${Date.now()}`,
      eventId,
      eventName,
      unitId,
      unitCallsign: unit.callsign,
      priority,
      objective,
      orderedBy: `${this.user.name} (${this.user.callsign})`,
      orderedAt: new Date().toISOString(),
      status: 'DISPATCHED',
      targetCoords,
    };

    this.dispatches = [newDispatch, ...this.dispatches];
    this.save(STORAGE_KEYS.DISPATCHES, this.dispatches);

    // Update unit
    this.units = this.units.map((u) => {
      if (u.id === unitId) {
        return {
          ...u,
          status: 'EN_ROUTE',
          assignedEventId: eventId,
          assignedEventName: eventName,
          tacticalObjective: objective,
          targetLat: targetCoords[0],
          targetLon: targetCoords[1],
          lastCheckIn: new Date().toISOString(),
        };
      }
      return u;
    });
    this.save(STORAGE_KEYS.UNITS, this.units);

    // Add tactical broadcast
    this.addMessage(
      'COMMAND',
      `DISPATCH ORDER: [${unit.callsign}] deployed to ${eventName}. Objective: "${objective}" (Priority: ${priority})`,
      true
    );
  }

  public completeDispatch(dispatchId: string, notes: string = 'Objective completed') {
    this.dispatches = this.dispatches.map((d) => {
      if (d.id === dispatchId) {
        return { ...d, status: 'COMPLETED' as const, completionNotes: notes };
      }
      return d;
    });
    this.save(STORAGE_KEYS.DISPATCHES, this.dispatches);
  }

  public assignSosToUnit(sosId: string, unitId: string) {
    const unit = this.units.find((u) => u.id === unitId);
    if (!unit) return;

    this.sosReports = this.sosReports.map((s) => {
      if (s.id === sosId) {
        return {
          ...s,
          status: 'ASSIGNED' as const,
          assignedUnitId: unitId,
          assignedUnitCallsign: unit.callsign,
        };
      }
      return s;
    });
    this.save(STORAGE_KEYS.SOS, this.sosReports);

    // Update unit status to evacuating
    this.units = this.units.map((u) => {
      if (u.id === unitId) {
        return {
          ...u,
          status: 'EVACUATING',
          tacticalObjective: `Rescue dispatch to SOS civilian report (${unit.callsign})`,
          lastCheckIn: new Date().toISOString(),
        };
      }
      return u;
    });
    this.save(STORAGE_KEYS.UNITS, this.units);

    this.addMessage(
      'EVAC',
      `RESCUE DISPATCH: ${unit.callsign} assigned to distress beacon #${sosId.slice(-4)}. En route.`,
      true
    );
  }

  public resolveSos(sosId: string) {
    this.sosReports = this.sosReports.map((s) => (s.id === sosId ? { ...s, status: 'RESOLVED' as const } : s));
    this.save(STORAGE_KEYS.SOS, this.sosReports);
    this.addMessage('EVAC', `SOS beacon #${sosId.slice(-4)} marked RESOLVED. Civilians accounted for.`, false);
  }

  public createSosReport(report: Omit<CivilianSOSReport, 'id' | 'timestamp' | 'status'>) {
    const newReport: CivilianSOSReport = {
      ...report,
      id: `sos_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'OPEN',
    };
    this.sosReports = [newReport, ...this.sosReports];
    this.save(STORAGE_KEYS.SOS, this.sosReports);

    this.addMessage(
      'EVAC',
      `🚨 NEW SOS REPORT: ${newReport.peopleCount} trapped civilians reported near [${newReport.latitude.toFixed(3)}, ${newReport.longitude.toFixed(3)}]. "${newReport.message}"`,
      true
    );
  }

  public addMessage(
    channel: TacticalRadioMessage['channel'],
    content: string,
    isAlert: boolean = false
  ) {
    const msg: TacticalRadioMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      senderName: this.user.name,
      senderRole: this.user.role,
      callsign: this.user.callsign,
      channel,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAlert,
    };
    this.messages = [msg, ...this.messages.slice(0, 49)];
    this.save(STORAGE_KEYS.MESSAGES, this.messages);
  }

  public resetToDefaults() {
    this.user = DEFAULT_RESPONDER_USERS[0];
    this.units = INITIAL_RESPONDER_UNITS;
    this.dispatches = INITIAL_DISPATCH_ORDERS;
    this.sosReports = INITIAL_SOS_REPORTS;
    this.messages = INITIAL_TACTICAL_MESSAGES;
    this.apiConfig = INITIAL_API_CONFIG;

    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.UNITS);
    localStorage.removeItem(STORAGE_KEYS.DISPATCHES);
    localStorage.removeItem(STORAGE_KEYS.SOS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.API_CONFIG);

    this.notify();
  }

  // Live simulation tick: subtly moves units, burns fuel, checks in
  private startSimulationLoop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      if (!this.apiConfig.liveSimulationActive) return;

      let changed = false;
      this.units = this.units.map((unit) => {
        if (unit.status === 'EN_ROUTE' && unit.targetLat && unit.targetLon) {
          // Move towards target
          const dLat = (unit.targetLat - unit.latitude) * 0.08;
          const dLon = (unit.targetLon - unit.longitude) * 0.08;
          const dist = Math.hypot(unit.targetLat - unit.latitude, unit.targetLon - unit.longitude);

          if (dist < 0.005) {
            // Arrived on scene
            changed = true;
            return {
              ...unit,
              status: 'ON_SCENE',
              latitude: unit.targetLat,
              longitude: unit.targetLon,
              speedKmh: 0,
              lastCheckIn: new Date().toISOString(),
            };
          } else {
            changed = true;
            return {
              ...unit,
              latitude: unit.latitude + dLat,
              longitude: unit.longitude + dLon,
              speedKmh: unit.type === 'HELITACK' ? 180 : 35,
              lastCheckIn: new Date().toISOString(),
            };
          }
        } else if (unit.status === 'ENGAGING_FLANK' || unit.status === 'HOLDING_LINE') {
          // Slight patrol jitter around position
          const jitterLat = (Math.random() - 0.5) * 0.0004;
          const jitterLon = (Math.random() - 0.5) * 0.0004;
          return {
            ...unit,
            latitude: unit.latitude + jitterLat,
            longitude: unit.longitude + jitterLon,
            fuelPercent: Math.max(20, unit.fuelPercent - 0.05),
            lastCheckIn: new Date().toISOString(),
          };
        }
        return unit;
      });

      if (changed) {
        this.save(STORAGE_KEYS.UNITS, this.units);
      }
    }, 4000);
  }
}

export const realtimeDb = new RealtimeDatabase();
