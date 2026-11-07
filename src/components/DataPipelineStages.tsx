import React from 'react';
import { ArrowRight, Database, CheckSquare, Search, GitMerge, Sparkles, BarChart3, Activity } from 'lucide-react';

export const DataPipelineStages: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'INGEST',
      subtitle: 'NASA FIRMS Stream',
      desc: 'Acquire Collection 2 VIIRS and Collection 6.1 MODIS data products.',
      icon: Database,
      color: '#42A5FF',
    },
    {
      step: '02',
      title: 'NORMALIZE',
      subtitle: 'Schema Uniformity',
      desc: 'Standardize UTC datetimes, EPSG:4326 coords, and confidence classes.',
      icon: Activity,
      color: '#55C98A',
    },
    {
      step: '03',
      title: 'FILTER',
      subtitle: 'Quality & Audit',
      desc: 'Flag negative FRP anomalies and resolve 30 cross-file duplicates.',
      icon: CheckSquare,
      color: '#FFB547',
    },
    {
      step: '04',
      title: 'MATCH',
      subtitle: 'Spatial-Temporal',
      desc: 'Evaluate distance (km) and orbital offset windows (minutes).',
      icon: Search,
      color: '#FF6A2A',
    },
    {
      step: '05',
      title: 'CLUSTER',
      subtitle: 'ST-DBSCAN Events',
      desc: 'Form coherent, bounded fire events with dynamic identifiers.',
      icon: GitMerge,
      color: '#FFB000',
    },
    {
      step: '06',
      title: 'SCORE',
      subtitle: 'Concordance Metric',
      desc: 'Calculate transparent 4-factor FireFusion Association Score (0–100).',
      icon: Sparkles,
      color: '#A855F7',
    },
    {
      step: '07',
      title: 'VISUALIZE',
      subtitle: 'Map & Calendar',
      desc: 'Render interactive map layers and Burning Activity Calendar matrix.',
      icon: BarChart3,
      color: '#00D9FF',
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#42A5FF] uppercase tracking-wider mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>System Pipeline Architecture</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          The 7-Stage Harmonization Pipeline
        </h2>
        <p className="text-base text-[#9AA6B2]">
          From multi-sensor ingest to the Burning Activity Calendar: an end-to-end, scientifically transparent workflow.
        </p>
      </div>

      {/* Horizontal Flow Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {steps.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="p-4 rounded-xl bg-[#0B1018] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${st.color}15`,
                      color: st.color,
                      border: `1px solid ${st.color}35`,
                    }}
                  >
                    {st.step}
                  </span>
                  <Icon className="w-4 h-4 text-[#9AA6B2] group-hover:text-white transition-colors" />
                </div>

                <div className="font-display font-bold text-white text-base mb-0.5">
                  {st.title}
                </div>
                <div className="text-[11px] font-mono text-[#9AA6B2] mb-2">{st.subtitle}</div>
                <p className="text-[11px] text-[#9AA6B2] leading-relaxed">{st.desc}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:flex justify-end pt-3 text-white/20">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
