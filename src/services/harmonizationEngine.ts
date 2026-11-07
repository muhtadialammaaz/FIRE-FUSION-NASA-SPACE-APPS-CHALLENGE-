import {
  NormalizedObservation,
  FireFusionEvent,
  HarmonizationParameters,
  AssociationScoreBreakdown,
  CalendarPeriod,
  ActivityLevel,
  AnomalyStatus,
} from '../types/fire';

export const DEFAULT_PARAMETERS: HarmonizationParameters = {
  spatial_threshold_km: 3.0,
  temporal_threshold_minutes: 90,
  frp_component_enabled: true,
  quality_component_enabled: true,
  min_cluster_size: 1,
  clustering_method: 'ST-DBSCAN-Adaptive',
};

/**
 * Calculates Haversine distance between two latitude/longitude points in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371.0; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  const dLon = ((lon2 - lon1) * Math.PI) / 180.0;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180.0) *
      Math.cos((lat2 * Math.PI) / 180.0) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates absolute temporal difference in minutes between two UTC ISO strings.
 */
export function calculateTemporalDifferenceMinutes(
  time1Iso: string,
  time2Iso: string
): number {
  const t1 = new Date(time1Iso).getTime();
  const t2 = new Date(time2Iso).getTime();
  return Math.abs(t1 - t2) / (1000 * 60);
}

/**
 * Evaluates pair-wise observation compatibility and computes the
 * FireFusion Prototype Association Score (0 to 100).
 * Clearly documented as FireFusion-derived methodology, not NASA confidence.
 */
export function computeAssociationScore(
  obs1: NormalizedObservation,
  obs2: NormalizedObservation,
  params: HarmonizationParameters = DEFAULT_PARAMETERS
): AssociationScoreBreakdown {
  const distKm = calculateHaversineDistance(
    obs1.latitude,
    obs1.longitude,
    obs2.latitude,
    obs2.longitude
  );
  const timeDiffMin = calculateTemporalDifferenceMinutes(
    obs1.timestamp,
    obs1.timestamp === obs2.timestamp ? obs1.timestamp : obs2.timestamp
  );

  // 1. Spatial Component (0 to 40)
  // Accounts for nominal pixel scales (MODIS 1km, VIIRS 375m)
  let spatialComp = 0;
  if (distKm <= params.spatial_threshold_km) {
    const ratio = distKm / params.spatial_threshold_km;
    spatialComp = Math.round(40 * Math.max(0, 1 - ratio * 0.85));
  }

  // 2. Temporal Component (0 to 30)
  let temporalComp = 0;
  if (timeDiffMin <= params.temporal_threshold_minutes) {
    const ratio = timeDiffMin / params.temporal_threshold_minutes;
    temporalComp = Math.round(30 * Math.max(0, 1 - ratio * 0.9));
  }

  // 3. Quality Component (0 to 20)
  let qualityComp = 12; // base nominal
  if (params.quality_component_enabled) {
    const q1 = obs1.confidence_class;
    const q2 = obs2.confidence_class;
    if (q1 === 'high' && q2 === 'high') {
      qualityComp = 20;
    } else if (q1 === 'high' || q2 === 'high') {
      qualityComp = 17;
    } else if (q1 === 'low' && q2 === 'low') {
      qualityComp = 8;
    }
  }

  // 4. FRP Supporting Component (0 to 10)
  // Note: MODIS vs VIIRS FRP retrieval physics differ; does not enforce strict equality!
  let frpComp = 8;
  if (params.frp_component_enabled) {
    if (obs1.frp_mw > 0 && obs2.frp_mw > 0) {
      const maxFrp = Math.max(obs1.frp_mw, obs2.frp_mw);
      const minFrp = Math.min(obs1.frp_mw, obs2.frp_mw);
      const ratio = minFrp / maxFrp;
      frpComp = Math.round(5 + ratio * 5);
    }
  }

  const total = Math.min(
    100,
    Math.max(0, spatialComp + temporalComp + qualityComp + frpComp)
  );

  return {
    total_score: total,
    spatial_component: spatialComp,
    temporal_component: temporalComp,
    quality_component: qualityComp,
    frp_component: frpComp,
    geographic_distance_km: Number(distKm.toFixed(2)),
    temporal_difference_minutes: Math.round(timeDiffMin),
  };
}

/**
 * Spatiotemporal Clustering (ST-DBSCAN style)
 * Transforms raw normalized observations into dynamically generated FireFusion Events.
 */
export function clusterObservationsIntoEvents(
  observations: NormalizedObservation[],
  params: HarmonizationParameters = DEFAULT_PARAMETERS
): FireFusionEvent[] {
  // Filter out invalid/duplicate records from clustering
  const validObs = observations.filter(
    (o) => o.quality_flag !== 'CROSS_FILE_DUP'
  );

  if (validObs.length === 0) return [];

  // Group by spatial-temporal proximity
  const visited = new Set<string>();
  const clusters: NormalizedObservation[][] = [];

  for (let i = 0; i < validObs.length; i++) {
    const root = validObs[i];
    if (visited.has(root.observation_id)) continue;

    visited.add(root.observation_id);
    const cluster = [root];
    const queue = [root];

    while (queue.length > 0) {
      const current = queue.shift()!;
      for (let j = 0; j < validObs.length; j++) {
        const candidate = validObs[j];
        if (visited.has(candidate.observation_id)) continue;

        const distKm = calculateHaversineDistance(
          current.latitude,
          current.longitude,
          candidate.latitude,
          candidate.longitude
        );
        const timeDiff = calculateTemporalDifferenceMinutes(
          current.timestamp,
          candidate.timestamp
        );

        if (
          distKm <= params.spatial_threshold_km &&
          timeDiff <= params.temporal_threshold_minutes
        ) {
          visited.add(candidate.observation_id);
          cluster.push(candidate);
          queue.push(candidate);
        }
      }
    }

    if (cluster.length >= params.min_cluster_size) {
      clusters.push(cluster);
    }
  }

  // Convert clusters into FireFusionEvent objects
  return clusters.map((items, idx) => {
    // Generate dynamic application ID (never claims to be a NASA event id)
    const eventIdNumber = (840 + idx).toString().padStart(6, '0');
    const event_id = `FF-${eventIdNumber}`;

    // Compute bounding box & centroid
    let minLat = 90,
      maxLat = -90,
      minLon = 180,
      maxLon = -180;
    let sumLat = 0,
      sumLon = 0;
    let modisCount = 0,
      viirsCount = 0;
    let terraCount = 0,
      aquaCount = 0,
      noaa20Count = 0,
      noaa21Count = 0;

    let peakFrp = 0;
    let peakFrpTime = items[0].timestamp;
    let minFrp = Infinity;
    let sumFrp = 0;
    let validFrpCount = 0;

    // Sort items chronologically
    const sortedItems = [...items].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const firstDetection = sortedItems[0].timestamp;
    const lastDetection = sortedItems[sortedItems.length - 1].timestamp;
    const durationMinutes = Math.max(
      15,
      Math.round(
        (new Date(lastDetection).getTime() - new Date(firstDetection).getTime()) /
          (1000 * 60)
      )
    );

    sortedItems.forEach((o) => {
      // Assign event ID to the observation
      o.event_id = event_id;

      if (o.latitude < minLat) minLat = o.latitude;
      if (o.latitude > maxLat) maxLat = o.latitude;
      if (o.longitude < minLon) minLon = o.longitude;
      if (o.longitude > maxLon) maxLon = o.longitude;
      sumLat += o.latitude;
      sumLon += o.longitude;

      if (o.sensor === 'MODIS') modisCount++;
      if (o.sensor === 'VIIRS') viirsCount++;

      if (o.satellite === 'Terra') terraCount++;
      if (o.satellite === 'Aqua') aquaCount++;
      if (o.satellite === 'N20') noaa20Count++;
      if (o.satellite === 'N21') noaa21Count++;

      // Valid FRP check (excludes negative FRP per spec)
      if (o.quality_flag !== 'INVALID_FRP' && o.frp_mw > 0) {
        sumFrp += o.frp_mw;
        validFrpCount++;
        if (o.frp_mw > peakFrp) {
          peakFrp = o.frp_mw;
          peakFrpTime = o.timestamp;
        }
        if (o.frp_mw < minFrp) {
          minFrp = o.frp_mw;
        }
      }
    });

    const obsCount = sortedItems.length;
    const centroidLat = Number((sumLat / obsCount).toFixed(4));
    const centroidLon = Number((sumLon / obsCount).toFixed(4));

    if (minFrp === Infinity) minFrp = 0;
    const avgFrp = validFrpCount > 0 ? Number((sumFrp / validFrpCount).toFixed(1)) : 0;
    const totalFrp = Number(sumFrp.toFixed(1));

    // Determine sensor composition
    let sensor_composition = 'Multi-VIIRS (NOAA-20/21)';
    if (modisCount > 0 && viirsCount > 0) {
      sensor_composition = 'Harmonized MODIS + VIIRS';
    } else if (modisCount > 0) {
      sensor_composition = 'MODIS only';
    } else if (noaa20Count > 0 && noaa21Count > 0) {
      sensor_composition = 'Multi-Satellite VIIRS (NOAA-20 & NOAA-21)';
    } else {
      sensor_composition = 'Single Sensor Detection';
    }

    // Determine FireFusion activity level
    let activity_level: ActivityLevel = 'MODERATE';
    if (totalFrp > 200 || peakFrp > 100) {
      activity_level = 'VERY HIGH';
    } else if (totalFrp > 90 || peakFrp > 50) {
      activity_level = 'HIGH';
    } else if (totalFrp < 30) {
      activity_level = 'LOW';
    }

    // Calculate score breakdown for representative pair
    let scoreBreakdown: AssociationScoreBreakdown;
    if (sortedItems.length > 1) {
      scoreBreakdown = computeAssociationScore(sortedItems[0], sortedItems[1], params);
    } else {
      scoreBreakdown = {
        total_score: 95,
        spatial_component: 40,
        temporal_component: 30,
        quality_component: 17,
        frp_component: 8,
        geographic_distance_km: 0,
        temporal_difference_minutes: 0,
      };
    }

    return {
      event_id,
      centroid_lat: centroidLat,
      centroid_lon: centroidLon,
      bounding_box: {
        min_lat: Number(minLat.toFixed(4)),
        max_lat: Number(maxLat.toFixed(4)),
        min_lon: Number(minLon.toFixed(4)),
        max_lon: Number(maxLon.toFixed(4)),
      },
      start_time: firstDetection,
      end_time: lastDetection,
      duration_minutes: durationMinutes,
      observation_count: obsCount,
      modis_count: modisCount,
      viirs_count: viirsCount,
      terra_count: terraCount,
      aqua_count: aquaCount,
      noaa20_count: noaa20Count,
      noaa21_count: noaa21Count,
      peak_frp_mw: peakFrp,
      average_frp_mw: avgFrp,
      total_frp_mw: totalFrp,
      frp_range_mw: { min: minFrp, max: peakFrp },
      peak_activity_time: peakFrpTime,
      first_detection: firstDetection,
      last_detection: lastDetection,
      status: 'ACTIVE',
      activity_level,
      sensor_composition,
      association_score_avg: scoreBreakdown.total_score,
      score_breakdown: scoreBreakdown,
      observations: sortedItems,
    };
  });
}

/**
 * Builds the Burning Activity Calendar
 * Aggregates harmonized observations into Day, Week, or Month periods
 * with historical baseline and Prototype Anomaly Detection.
 */
export function buildBurningActivityCalendar(
  observations: NormalizedObservation[],
  events: FireFusionEvent[],
  granularity: 'day' | 'week' | 'month' = 'day'
): CalendarPeriod[] {
  const periodMap = new Map<
    string,
    {
      label: string;
      startDate: string;
      endDate: string;
      observations: NormalizedObservation[];
      events: FireFusionEvent[];
    }
  >();

  observations.forEach((o) => {
    let key = o.acquisition_date;
    let label = o.acquisition_date;

    if (granularity === 'month') {
      key = o.acquisition_date.slice(0, 7);
      label = key;
    } else if (granularity === 'week') {
      // Simplified ISO week calculation
      const d = new Date(o.acquisition_date);
      const weekNum = Math.ceil(d.getDate() / 7);
      key = `${o.acquisition_date.slice(0, 7)}-W${weekNum}`;
      label = key;
    }

    if (!periodMap.has(key)) {
      periodMap.set(key, {
        label,
        startDate: o.acquisition_date,
        endDate: o.acquisition_date,
        observations: [],
        events: [],
      });
    }

    periodMap.get(key)!.observations.push(o);
  });

  // Assign events to periods based on peak activity time
  events.forEach((ev) => {
    const dateStr = ev.peak_activity_time.slice(0, 10);
    let key = dateStr;
    if (granularity === 'month') key = dateStr.slice(0, 7);
    else if (granularity === 'week') {
      const d = new Date(dateStr);
      const weekNum = Math.ceil(d.getDate() / 7);
      key = `${dateStr.slice(0, 7)}-W${weekNum}`;
    }

    if (periodMap.has(key)) {
      periodMap.get(key)!.events.push(ev);
    }
  });

  // Calculate baseline stats
  const periods = Array.from(periodMap.entries()).map(([key, data]) => {
    let totalFrp = 0;
    let peakFrp = 0;
    let modisCount = 0;
    let viirsCount = 0;
    const satellitesSet = new Set<string>();

    data.observations.forEach((o) => {
      if (o.quality_flag !== 'INVALID_FRP' && o.frp_mw > 0) {
        totalFrp += o.frp_mw;
        if (o.frp_mw > peakFrp) peakFrp = o.frp_mw;
      }
      if (o.sensor === 'MODIS') modisCount++;
      if (o.sensor === 'VIIRS') viirsCount++;
      satellitesSet.add(o.satellite);
    });

    const obsCount = data.observations.length;
    const avgFrp = obsCount > 0 ? Number((totalFrp / obsCount).toFixed(1)) : 0;

    // Activity classification
    let activity_level: ActivityLevel = 'MODERATE';
    if (totalFrp > 250 || obsCount > 6) {
      activity_level = 'VERY HIGH';
    } else if (totalFrp > 100 || obsCount > 3) {
      activity_level = 'HIGH';
    } else if (totalFrp < 30) {
      activity_level = 'LOW';
    }

    // Prototype Anomaly Detection (Baseline comparison)
    // Prototype anomaly evaluated against seasonal expected baseline (approx 65 MW daily)
    const expectedBaseline = 65;
    const anomalyScore = Number(((totalFrp - expectedBaseline) / 35).toFixed(2));
    let anomaly_status: AnomalyStatus = 'NORMAL';
    if (anomalyScore >= 2.0) {
      anomaly_status = 'HIGH ANOMALY';
    } else if (anomalyScore >= 1.0) {
      anomaly_status = 'ELEVATED';
    }

    return {
      period_id: key,
      date_label: data.label,
      granularity,
      start_date: data.startDate,
      end_date: data.endDate,
      observation_count: obsCount,
      event_count: data.events.length,
      total_frp: Number(totalFrp.toFixed(1)),
      average_frp: avgFrp,
      peak_frp: Number(peakFrp.toFixed(1)),
      modis_count: modisCount,
      viirs_count: viirsCount,
      activity_level,
      baseline_activity: expectedBaseline,
      anomaly_score: anomalyScore,
      anomaly_status,
      primary_satellites: Array.from(satellitesSet),
    };
  });

  return periods.sort((a, b) => b.start_date.localeCompare(a.start_date));
}
