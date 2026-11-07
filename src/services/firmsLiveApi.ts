/**
 * NASA FIRMS Secure Server Telemetry Service
 * Connects to the Express backend proxy at `/api/firms/telemetry`
 * Kept strictly server-side to eliminate front-end API key exposure and security vulnerabilities.
 */

import { NormalizedObservation, SensorType, SatelliteType, ConfidenceClass } from '../types/fire';

export interface FirmsApiFetchParams {
  source?: 'VIIRS_SNPP_NRT' | 'VIIRS_NOAA20_NRT' | 'VIIRS_NOAA21_NRT' | 'MODIS_NRT';
  area?: 'world' | 'custom';
  bbox?: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };
  dayRange?: number; // 1 to 10
}

/**
 * Parses CSV response into NormalizedObservation array
 */
export function parseFirmsCsv(csvText: string, defaultSensor: SensorType = 'VIIRS'): NormalizedObservation[] {
  const lines = csvText.trim().split('\n');
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const observations: NormalizedObservation[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map((v) => v.trim());
    if (row.length < headers.length) continue;

    const record: Record<string, string> = {};
    headers.forEach((h, idx) => {
      record[h] = row[idx];
    });

    const lat = parseFloat(record['latitude']);
    const lon = parseFloat(record['longitude']);
    const frp = parseFloat(record['frp'] || '0');
    const scan = parseFloat(record['scan'] || '0.375');
    const track = parseFloat(record['track'] || '0.375');
    const date = record['acq_date'] || new Date().toISOString().slice(0, 10);
    const timeRaw = (record['acq_time'] || '0000').padStart(4, '0');
    const timeFormatted = `${timeRaw.slice(0, 2)}:${timeRaw.slice(2, 4)}`;

    const satRaw = (record['satellite'] || 'N20').toUpperCase();
    let sat: SatelliteType = 'N20';
    if (satRaw.includes('21') || satRaw.includes('J02')) sat = 'N21';
    else if (satRaw.includes('NPP') || satRaw.includes('SNPP')) sat = 'SNPP';
    else if (satRaw.includes('TERRA') || satRaw === 'T') sat = 'Terra';
    else if (satRaw.includes('AQUA') || satRaw === 'A') sat = 'Aqua';

    const sensor: SensorType = sat === 'Terra' || sat === 'Aqua' ? 'MODIS' : 'VIIRS';

    // Standardize confidence class
    const confRaw = record['confidence'] || 'n';
    let confClass: ConfidenceClass = 'nominal';
    let confPct: number | null = null;

    if (sensor === 'MODIS') {
      const pct = parseInt(confRaw, 10);
      confPct = isNaN(pct) ? 80 : pct;
      if (confPct >= 80) confClass = 'high';
      else if (confPct >= 30) confClass = 'nominal';
      else confClass = 'low';
    } else {
      const c = confRaw.toLowerCase();
      if (c === 'h') confClass = 'high';
      else if (c === 'l') confClass = 'low';
      else confClass = 'nominal';
    }

    const obs: NormalizedObservation = {
      observation_id: `LIVE-${sat}-${i}-${Date.now().toString().slice(-4)}`,
      sensor,
      satellite: sat,
      instrument: sensor === 'MODIS' ? 'MODIS' : 'VIIRS',
      latitude: lat,
      longitude: lon,
      timestamp: `${date}T${timeFormatted}:00Z`,
      acquisition_date: date,
      acquisition_time: timeFormatted,
      brightness_primary: parseFloat(record['bright_ti4'] || record['brightness'] || '340'),
      brightness_secondary: record['bright_ti5'] ? parseFloat(record['bright_ti5']) : null,
      frp_mw: isNaN(frp) ? 15.0 : Math.max(0, frp),
      confidence_native: confRaw,
      confidence_percent: confPct,
      confidence_class: confClass,
      scan_km: scan,
      track_km: track,
      day_night: (record['daynight']?.toUpperCase() === 'N' ? 'N' : 'D') as 'D' | 'N',
      product: sensor === 'MODIS' ? 'MCD14DL_NRT' : 'VNP14IMGTDL_NRT',
      version: 'Live-NRT',
      processing_state: 'NRT',
      hotspot_type: 0,
      source_file: `FIRMS_LIVE_${sat}_${date}.csv`,
      source_format: 'API',
      quality_flag: frp < 0 ? 'INVALID_FRP' : 'VALID',
      event_id: null,
    };

    observations.push(obs);
  }

  return observations;
}

/**
 * Fetches live fire observations securely through the Express server-side proxy
 * Never sends or exposes API keys on the frontend
 */
export async function fetchLiveFirmsData(params?: FirmsApiFetchParams): Promise<{
  success: boolean;
  observations: NormalizedObservation[];
  message: string;
  isServerSecured: boolean;
}> {
  let bboxStr = '-122,38,-120,40';
  if (params?.area === 'custom' && params?.bbox) {
    bboxStr = `${params.bbox.minLon},${params.bbox.minLat},${params.bbox.maxLon},${params.bbox.maxLat}`;
  }

  const sensor = params?.source || 'VIIRS_SNPP_NRT';
  const days = params?.dayRange || 1;

  const endpoint = `/api/firms/telemetry?sensor=${sensor}&bbox=${bboxStr}&days=${days}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      return {
        success: false,
        observations: [],
        message: `Gateway server responded with status: ${res.status}`,
        isServerSecured: true,
      };
    }

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return {
        success: true,
        observations: [],
        message: data.message || 'Server secure proxy active',
        isServerSecured: true,
      };
    }

    const csv = await res.text();
    const observations = parseFirmsCsv(csv);
    return {
      success: true,
      observations,
      message: `Securely ingested ${observations.length} active live hotspots via server proxy.`,
      isServerSecured: true,
    };
  } catch (err: any) {
    return {
      success: false,
      observations: [],
      message: `Server telemetry gateway: ${err.message || 'Secure demonstration active'}`,
      isServerSecured: true,
    };
  }
}
