import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Database, FileCheck, Layers, Info } from 'lucide-react';
import { DatasetProvenance } from '../types/fire';

interface DataValidationDashboardProps {
  provenance: DatasetProvenance;
}

export const DataValidationDashboard: React.FC<DataValidationDashboardProps> = ({ provenance }) => {
  return (
    <section id="validation" className="relative max-w-7xl mx-auto px-6 py-20">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#55C98A] uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Scientific Data Transparency</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Data Validation & Quality Auditing
        </h2>
        <p className="text-base text-[#9AA6B2]">
          Every data-quality operation is transparently documented and audited. FireFusion never silently deletes or alters raw NASA FIRMS measurements.
        </p>
      </div>

      {/* KPI Audit Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#0B1018] border border-white/10">
          <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">RAW CATALOGED RECORDS</div>
          <div className="text-2xl font-display font-bold text-white">13,992,333</div>
          <div className="text-[10px] font-mono text-[#42A5FF] mt-1">NOAA-20, NOAA-21 CSV & SHP</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0B1018] border border-white/10">
          <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">CROSS-FILE DUPLICATES</div>
          <div className="text-2xl font-display font-bold text-[#FFB000]">30 Records</div>
          <div className="text-[10px] font-mono text-[#55C98A] mt-1">Deduplicated (CSV &times; SHP)</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0B1018] border border-white/10">
          <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">INVALID FRP FLAGS</div>
          <div className="text-2xl font-display font-bold text-[#FF6A2A]">13 Records</div>
          <div className="text-[10px] font-mono text-[#9AA6B2] mt-1">Negative FRP &middot; Excluded from Sum</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0B1018] border border-white/10">
          <div className="text-[11px] font-mono text-[#9AA6B2] mb-1">MISSING VALUES DETECTED</div>
          <div className="text-2xl font-display font-bold text-[#55C98A]">0 Records</div>
          <div className="text-[10px] font-mono text-[#55C98A] mt-1">100% Complete Fields</div>
        </div>
      </div>

      {/* Audit Rules Table */}
      <div className="rounded-2xl bg-[#0B1018] border border-white/10 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <span className="font-display font-bold text-white text-base">
            NASA FIRMS Data Validation Policy Rules
          </span>
          <span className="text-xs font-mono text-[#55C98A] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Audit Rules Active
          </span>
        </div>

        <div className="divide-y divide-white/5 text-xs font-mono">
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <div className="text-white font-bold">Negative FRP Ingestion</div>
            <div className="text-[#FF6A2A]">13 observations in NOAA-21</div>
            <div className="text-[#9AA6B2] md:col-span-2">
              Retained with flag <code>INVALID_FRP</code>. Never converted to zero or silently dropped; safely excluded from physical FRP aggregation.
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <div className="text-white font-bold">Cross-File Overlap</div>
            <div className="text-[#FFB000]">30 exact duplicate records</div>
            <div className="text-[#9AA6B2] md:col-span-2">
              Detected across NOAA-21 CSV and Shapefile packages. Reconciled during ingestion to yield exactly 13,992,303 unique observations.
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <div className="text-white font-bold">Temporal Zero-Padding</div>
            <div className="text-[#42A5FF]">Integer acq_time normalization</div>
            <div className="text-[#9AA6B2] md:col-span-2">
              NASA integer timestamps (e.g. 3 &rarr; 0003 &rarr; 00:03 UTC) padded cleanly. Seconds never fabricated and set to :00.
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <div className="text-white font-bold">Processing Provenance</div>
            <div className="text-[#55C98A]">STANDARD vs NRT Tracking</div>
            <div className="text-[#9AA6B2] md:col-span-2">
              Preserves standard science-quality processing for historical baselines; limits near-real-time (NRT) to recent operational data.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
