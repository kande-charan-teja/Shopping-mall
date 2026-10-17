import React from 'react';
import { 
  Leaf, 
  Sun, 
  Droplet, 
  Wind, 
  Zap, 
  Recycle, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { LIVE_OPERATIONS_METRICS } from '../data/operationsData';

export const SustainabilityView: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0B192C] to-slate-900 text-white p-8 md:p-12 overflow-hidden shadow-xl border border-emerald-900/40">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <Leaf className="w-3.5 h-3.5" />
            LEED Platinum Certified Architecture
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Sustainability & Smart Building Systems
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Smart Mall is engineered as a climate-resilient, net-positive urban commercial ecosystem. We combine a 1.2 MWp rooftop photovoltaic solar array, closed-loop rainwater treatment, demand-controlled HVAC, and intelligent automation.
          </p>
        </div>
      </div>

      {/* Live Ecological Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Solar Generation */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Solar Output Today
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Sun className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 font-cinzel">
            {LIVE_OPERATIONS_METRICS.solarYieldTodayKwh.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-500">kWh</span>
          </div>
          <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <span>+{LIVE_OPERATIONS_METRICS.solarOffsetPercent}%</span>
            <span className="text-slate-400 font-normal">of common load offset</span>
          </p>
        </div>

        {/* Rainwater Saved */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Recycled Water Today
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 font-cinzel">
            {LIVE_OPERATIONS_METRICS.waterSavedTodayLiters.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-500">Liters</span>
          </div>
          <p className="text-xs text-blue-700 font-semibold">100% self-sufficient landscape irrigation</p>
        </div>

        {/* Indoor Air Quality */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Indoor Air Quality (AQI)
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Wind className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-600 font-cinzel">
            {LIVE_OPERATIONS_METRICS.indoorAirQualityAQI} <span className="text-sm font-sans font-normal text-slate-500">PM2.5 Excellent</span>
          </div>
          <p className="text-xs text-slate-500">Hospital-grade MERV-14 + UVGI Filtration</p>
        </div>

        {/* Active EV Charging */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Active EV Chargers
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 font-cinzel">
            {LIVE_OPERATIONS_METRICS.activeEVChargers} / 48 <span className="text-sm font-sans font-normal text-slate-500">Stalls</span>
          </div>
          <p className="text-xs text-purple-700 font-semibold">350kW DC Ultra-Fast Hub in B1</p>
        </div>
      </div>

      {/* Sustainable Building Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-cinzel">
            1.2 MWp Photovoltaic Solar Crown
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Over 3,400 high-efficiency monocrystalline bifacial solar modules line the mall rooftop and parking structures, generating 1,850,000 kWh of clean renewable energy per annum while shading the building envelope.
          </p>
          <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
            Micro-inverters with string-level AI degradation tracking.
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Droplet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-cinzel">
            Subterranean Rainwater Harvesting
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Stormwater across the 35,000 m² roof is routed into a 1.5-million-liter retention vault beneath Basement 2. Multi-media sand filtration and UV sterilization repurpose rainwater for cooling towers and botanical gardens.
          </p>
          <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
            Saves 42 million liters of municipal potable water each year.
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-cinzel">
            Demand-Controlled Smart HVAC
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Magnetic-bearing centrifugal chillers combined with dynamic CO2 sensors modulate airflow based on real-time footfall density. Conditioned air is supplied only where visitors gather, slashing energy waste by 41%.
          </p>
          <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
            Refrigerant R-1233zd with near-zero global warming potential (GWP &lt; 1).
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center justify-between">
        <span>Performance metrics represent simulated building telemetry calibrated to seasonal climate models.</span>
        <span className="font-mono text-slate-500 font-semibold">Smart BAS Version 4.8</span>
      </div>
    </div>
  );
};
