import React, { useState } from 'react';
import { Calendar, Flame, AlertTriangle, TrendingUp, Info, ChevronRight, Filter, Satellite } from 'lucide-react';
import { CalendarPeriod, ActivityLevel, AnomalyStatus } from '../types/fire';

interface BurningCalendarProps {
  periods: CalendarPeriod[];
  selectedPeriod: CalendarPeriod | null;
  onSelectPeriod: (period: CalendarPeriod) => void;
  granularity: 'day' | 'week' | 'month';
  onChangeGranularity: (g: 'day' | 'week' | 'month') => void;
}

export const BurningCalendar: React.FC<BurningCalendarProps> = ({
  periods,
  selectedPeriod,
  onSelectPeriod,
  granularity,
  onChangeGranularity,
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const filteredPeriods = periods.filter((p) => {
    if (filterLevel === 'ALL') return true;
    return p.activity_level === filterLevel;
  });

  const getActivityColor = (level: ActivityLevel) => {
    switch (level) {
      case 'VERY HIGH':
        return 'bg-[#FF3D1F] text-white border-[#FF3D1F]';
      case 'HIGH':
        return 'bg-[#FF6A2A] text-white border-[#FF6A2A]';
      case 'MODERATE':
        return 'bg-[#FFB547] text-[#05070B] border-[#FFB547]';
      case 'LOW':
      default:
        return 'bg-[#55C98A]/20 text-[#55C98A] border-[#55C98A]/40';
    }
  };

  return (
    <section id="calendar" className="relative max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FFB000] uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Core NASA Space Apps Challenge Deliverable</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Burning Activity Calendar
          </h2>
          <p className="text-sm sm:text-base text-[#9AA6B2] mt-2">
            Aggregates harmonized multi-satellite active fire hotspots into an interpretable temporal calendar matrix, highlighting peak burn periods and historical anomalies.
          </p>
        </div>

        {/* Granularity & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Granularity Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#111923] border border-white/10 text-xs font-mono">
            <button
              onClick={() => onChangeGranularity('day')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                granularity === 'day' ? 'bg-[#FF6A2A] text-white' : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => onChangeGranularity('week')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                granularity === 'week' ? 'bg-[#FF6A2A] text-white' : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => onChangeGranularity('month')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                granularity === 'month' ? 'bg-[#FF6A2A] text-white' : 'text-[#9AA6B2] hover:text-white'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Main Calendar Matrix & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calendar Grid (left) */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0B1018] border border-white/10 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 text-xs font-mono text-[#9AA6B2]">
            <span>TEMPORAL PERIOD ({periods.length} Cataloged)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#55C98A]" /> Low
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFB547]" /> Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF6A2A]" /> High
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF3D1F]" /> Very High
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredPeriods.map((p) => {
              const isSelected = selectedPeriod?.period_id === p.period_id;
              return (
                <div
                  key={p.period_id}
                  onClick={() => onSelectPeriod(p)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#151F2B] border-[#00D9FF] shadow-lg shadow-[#00D9FF]/10 scale-[1.02]'
                      : 'bg-[#111923] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-white">
                      {p.date_label}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold ${getActivityColor(
                        p.activity_level
                      )}`}
                    >
                      {p.activity_level}
                    </span>
                  </div>

                  <div className="space-y-1 my-2 text-[11px] font-mono">
                    <div className="flex justify-between text-[#9AA6B2]">
                      <span>Events:</span>
                      <span className="text-white font-medium">{p.event_count}</span>
                    </div>
                    <div className="flex justify-between text-[#9AA6B2]">
                      <span>Detections:</span>
                      <span className="text-white font-medium">{p.observation_count}</span>
                    </div>
                    <div className="flex justify-between text-[#9AA6B2]">
                      <span>Total FRP:</span>
                      <span className="text-[#FF6A2A] font-bold">{p.total_frp} MW</span>
                    </div>
                  </div>

                  {p.anomaly_status !== 'NORMAL' && (
                    <div className="mt-1 pt-1.5 border-t border-white/5 flex items-center gap-1 text-[10px] font-mono text-[#FFB547]">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{p.anomaly_status}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Period Intelligence Detail (right) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0B1018] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-mono text-[#9AA6B2]">PERIOD INTELLIGENCE</span>
              <span className="text-xs font-mono text-[#42A5FF]">
                {selectedPeriod ? selectedPeriod.date_label : 'Select Period'}
              </span>
            </div>

            {selectedPeriod ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    Activity: {selectedPeriod.activity_level}
                  </h3>
                  <p className="text-xs text-[#9AA6B2]">
                    Harmonized active fire measurements for {selectedPeriod.date_label}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px]">TOTAL FRP</div>
                    <div className="text-lg font-bold text-[#FF6A2A]">
                      {selectedPeriod.total_frp} MW
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px]">PEAK DETECTION</div>
                    <div className="text-lg font-bold text-white">
                      {selectedPeriod.peak_frp} MW
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px]">HARMONIZED EVENTS</div>
                    <div className="text-lg font-bold text-[#FFB000]">
                      {selectedPeriod.event_count}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#111923] border border-white/5">
                    <div className="text-[#9AA6B2] text-[10px]">OBSERVATIONS</div>
                    <div className="text-lg font-bold text-white">
                      {selectedPeriod.observation_count}
                    </div>
                  </div>
                </div>

                {/* Prototype Anomaly Indicator */}
                <div className="p-4 rounded-xl bg-[#151F2B] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#9AA6B2]">Prototype Anomaly Status:</span>
                    <span
                      className={`font-bold ${
                        selectedPeriod.anomaly_status === 'HIGH ANOMALY'
                          ? 'text-[#FF3D1F]'
                          : selectedPeriod.anomaly_status === 'ELEVATED'
                          ? 'text-[#FFB547]'
                          : 'text-[#55C98A]'
                      }`}
                    >
                      {selectedPeriod.anomaly_status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#9AA6B2]">
                    Deviation from Seasonal Baseline: {selectedPeriod.anomaly_score} &sigma;
                  </div>
                  <div className="text-[10px] text-[#9AA6B2] leading-tight pt-1 border-t border-white/5">
                    *Prototype Anomaly evaluates unusualness relative to historical baseline; does NOT represent a wildfire forecast.
                  </div>
                </div>

                {/* Satellites Contributing */}
                <div>
                  <div className="text-xs font-mono text-[#9AA6B2] mb-1.5">SENSORS IN WINDOW:</div>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                    {selectedPeriod.primary_satellites.map((sat) => (
                      <span
                        key={sat}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white"
                      >
                        {sat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#9AA6B2] text-sm">
                Click any calendar tile to inspect harmonized burning metrics and anomaly signals.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-[#9AA6B2] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#42A5FF] shrink-0" />
            <span>Interactive filtering applies across map and analytical views.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
