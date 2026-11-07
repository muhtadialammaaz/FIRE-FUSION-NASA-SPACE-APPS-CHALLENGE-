/**
 * FireFusion Data Types & Schemas
 * Aligned with NASA FIRMS MODIS Collection 6.1 and VIIRS Collection 2 specifications
 */

export type SensorType = 'MODIS' | 'VIIRS';
export type SatelliteType = 'Terra' | 'Aqua' | 'N20' | 'N21' | 'SNPP';
export type ConfidenceClass = 'low' | 'nominal' | 'high';
export type ProcessingState = 'NRT' | 'STANDARD' | 'RT' | 'URT';
export type DayNight = 'D' | 'N';
export type EventStatus = 'ACTIVE' | 'RECENT' | 'HISTORICAL';
export type ActivityLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH';
export type AnomalyStatus = 'NORMAL' | 'ELEVATED' | 'HIGH ANOMALY';

export interface NormalizedObservation {
  observation_id: string;
  sensor: SensorType;
  satellite: SatelliteType;
  instrument: string;
  latitude: number;
  longitude: number;
  timestamp: string; // ISO 8601 UTC
  acquisition_date: string; // YYYY-MM-DD
  acquisition_time: string; // HH:MM UTC (zero padded)
  brightness_primary: number; // Kelvin (MODIS ch21/22 or VIIRS I4)
  brightness_secondary: number | null; // Kelvin (VIIRS I5 or MODIS ch31)
  frp_mw: number; // Fire Radiative Power in MW
  confidence_native: string | number; // e.g., 85 (MODIS) or 'n' (VIIRS)
  confidence_percent: number | null; // Official NASA percentage only for MODIS, null for VIIRS
  confidence_class: ConfidenceClass; // Standardized low | nominal | high
  scan_km: number; // Along-scan pixel dimension
  track_km: number; // Along-track pixel dimension
  day_night: DayNight;
  product: string; // e.g. MCD14DL, VNP14IMGT, J1V-C2, J2V-C2
  version: string; // e.g. 6.1NRT, 2.0NRT, 6.1
  processing_state: ProcessingState;
  hotspot_type: number | null; // 0=veg, 1=volcano, 2=static, 3=offshore
  source_file: string;
  source_format: 'CSV' | 'SHP' | 'API';
  quality_flag: 'VALID' | 'INVALID_FRP' | 'CROSS_FILE_DUP' | 'SUSPECT_COORDS';
  event_id: string | null;
}

export interface AssociationScoreBreakdown {
  total_score: number; // 0-100 (FireFusion Prototype Association Score)
  spatial_component: number; // max 40
  temporal_component: number; // max 30
  quality_component: number; // max 20
  frp_component: number; // max 10
  geographic_distance_km: number;
  temporal_difference_minutes: number;
}

export interface FireFusionEvent {
  event_id: string; // Dynamic format e.g. FF-000847
  centroid_lat: number;
  centroid_lon: number;
  bounding_box: {
    min_lat: number;
    max_lat: number;
    min_lon: number;
    max_lon: number;
  };
  start_time: string; // UTC ISO
  end_time: string; // UTC ISO
  duration_minutes: number;
  observation_count: number;
  modis_count: number;
  viirs_count: number;
  terra_count: number;
  aqua_count: number;
  noaa20_count: number;
  noaa21_count: number;
  peak_frp_mw: number;
  average_frp_mw: number;
  total_frp_mw: number;
  frp_range_mw: { min: number; max: number };
  peak_activity_time: string;
  first_detection: string;
  last_detection: string;
  status: EventStatus;
  activity_level: ActivityLevel;
  sensor_composition: string; // e.g. "Harmonized MODIS + VIIRS", "Multi-VIIRS (NOAA-20/21)"
  association_score_avg: number;
  score_breakdown: AssociationScoreBreakdown;
  observations: NormalizedObservation[];
}

export interface CalendarPeriod {
  period_id: string; // e.g. "2026-09-18" or "2026-W38" or "2026-09"
  date_label: string;
  granularity: 'day' | 'week' | 'month';
  start_date: string;
  end_date: string;
  observation_count: number;
  event_count: number;
  total_frp: number;
  average_frp: number;
  peak_frp: number;
  modis_count: number;
  viirs_count: number;
  activity_level: ActivityLevel;
  baseline_activity: number;
  anomaly_score: number; // z-score or baseline deviation
  anomaly_status: AnomalyStatus;
  primary_satellites: string[];
}

export interface AreaOfInterest {
  id: string;
  name: string;
  countryOrRegion: string;
  description: string;
  bounds: {
    min_lat: number;
    max_lat: number;
    min_lon: number;
    max_lon: number;
  };
  center: [number, number];
  zoom: number;
  fire_season: string;
  dominant_fuel: string;
}

export interface DatasetProvenance {
  sources: {
    name: string;
    file_reference: string;
    satellite: string;
    instrument: string;
    collection: string;
    processing: ProcessingState;
    raw_records: number;
    loaded: boolean;
    temporal_coverage: string;
  }[];
  raw_total_records: number;
  deduplicated_records: number;
  cross_file_duplicates: number;
  invalid_frp_flagged: number;
  date_min: string;
  date_max: string;
  modis_available: boolean;
  viirs_available: boolean;
}

export interface HarmonizationParameters {
  spatial_threshold_km: number; // default ~2.5 km
  temporal_threshold_minutes: number; // default ~60 min
  frp_component_enabled: boolean;
  quality_component_enabled: boolean;
  min_cluster_size: number;
  clustering_method: 'ST-DBSCAN-Adaptive' | 'Centroid-Radius';
}
