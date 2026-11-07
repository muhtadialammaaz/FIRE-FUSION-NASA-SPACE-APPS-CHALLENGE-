/**
 * Emergency Responder & Situational Coordination Types
 * For FireFusion GSS Rapid Disaster Response System
 */

export type ResponderRole =
  | 'INCIDENT_COMMANDER'
  | 'OPERATIONS_CHIEF'
  | 'AIR_TACTICAL_SUPERVISOR'
  | 'HOTSHOT_CREW_LEAD'
  | 'EVACUATION_OFFICER'
  | 'UAV_RECON_SPECIALIST';

export type UnitType =
  | 'ENGINE'
  | 'HELITACK'
  | 'HOTSHOT'
  | 'BULLDOZER'
  | 'DRONE'
  | 'EVAC_SQUAD'
  | 'COMMAND_POST';

export type UnitStatus =
  | 'AVAILABLE'
  | 'EN_ROUTE'
  | 'ON_SCENE'
  | 'ENGAGING_FLANK'
  | 'HOLDING_LINE'
  | 'RETARDANT_DROP'
  | 'EVACUATING'
  | 'REFUELING';

export type DispatchPriority = 'IMMEDIATE' | 'HIGH' | 'ROUTINE';

export type DispatchStatus = 'PENDING' | 'DISPATCHED' | 'EXECUTING' | 'COMPLETED' | 'CANCELLED';

export interface ResponderUser {
  id: string;
  name: string;
  role: ResponderRole;
  callsign: string;
  agency: string;
  badgeNumber: string;
  avatarUrl?: string;
}

export interface ResponderUnit {
  id: string;
  callsign: string;
  type: UnitType;
  status: UnitStatus;
  latitude: number;
  longitude: number;
  assignedEventId: string | null;
  assignedEventName?: string;
  personnelCount: number;
  waterCapacityGal: number;
  waterRemainingGal: number;
  fuelPercent: number;
  batteryPercent?: number;
  headingDeg: number;
  speedKmh: number;
  tacticalObjective: string;
  lastCheckIn: string; // ISO
  targetLat?: number;
  targetLon?: number;
}

export interface IncidentDispatchOrder {
  id: string;
  eventId: string;
  eventName: string;
  unitId: string;
  unitCallsign: string;
  priority: DispatchPriority;
  objective: string;
  orderedBy: string;
  orderedAt: string; // ISO
  status: DispatchStatus;
  targetCoords: [number, number];
  completionNotes?: string;
}

export interface CivilianSOSReport {
  id: string;
  reporterName: string;
  contactNumber: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  peopleCount: number;
  urgency: 'CRITICAL' | 'HIGH' | 'MODERATE';
  message: string;
  status: 'OPEN' | 'ASSIGNED' | 'RESOLVED';
  assignedUnitId?: string;
  assignedUnitCallsign?: string;
}

export interface TacticalRadioMessage {
  id: string;
  senderName: string;
  senderRole: ResponderRole;
  callsign: string;
  channel: 'COMMAND' | 'AIR_OPS' | 'GROUND_OPS' | 'EVAC' | 'ALL_UNITS';
  content: string;
  timestamp: string;
  isAlert?: boolean;
}

export interface FireWeatherConditions {
  locationName: string;
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windGustsKmh: number;
  windDirectionDeg: number;
  windDirectionLabel: string;
  hainesIndex: number; // 1-6
  hainesRisk: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Severe';
  fuelMoisturePercent: number;
  rateOfSpreadChainsPerHour: number;
  flameLengthMeters: number;
  redFlagWarning: boolean;
}

export interface ApiConfiguration {
  serverProxyEnabled: boolean;
  serverKeySecured: boolean;
  selectedSensor: 'VIIRS_SNPP_NRT' | 'VIIRS_NOAA20_NRT' | 'VIIRS_NOAA21_NRT' | 'MODIS_NRT';
  nasaDays: number;
  refreshIntervalSec: number;
  liveSimulationActive: boolean;
  openMeteoEnabled: boolean;
  cadFeedEnabled: boolean;
  lastSyncTime: string | null;
  connectionStatus: 'CONNECTED' | 'SIMULATING' | 'DISCONNECTED' | 'ERROR';
  encryptionStatus: 'AES_256_ACTIVE';
  errorMessage?: string;
}
