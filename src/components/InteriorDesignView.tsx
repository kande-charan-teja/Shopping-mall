import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Volume2, 
  SunMedium, 
  Compass, 
  Maximize2, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { INTERIOR_DESIGN_AREAS, InteriorAreaConcept } from '../data/interiorDesignData';

interface InteriorDesignViewProps {
  onOpen3DView: () => void;
}

export const InteriorDesignView: React.FC<InteriorDesignViewProps> = ({ onOpen3DView }) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(INTERIOR_DESIGN_AREAS[0].id);

  const activeArea = INTERIOR_DESIGN_AREAS.find((a) => a.id === selectedAreaId) || INTERIOR_DESIGN_AREAS[0];

  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-[#0B192C] text-white p-8 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Palette className="w-3.5 h-3.5" />
            Interior Architectural Concepts
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Interior Design by Zone
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Delve into spatial philosophies, material swatches, acoustic treatments, and human-centric lighting designs curated for each distinct public and executive environment.
          </p>
        </div>
      </div>

      {/* Area Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {INTERIOR_DESIGN_AREAS.map((area) => (
          <button
            key={area.id}
            onClick={() => setSelectedAreaId(area.id)}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
              selectedAreaId === area.id
                ? 'bg-[#0B192C] text-amber-400 shadow-md ring-2 ring-amber-500/30'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {area.name}
          </button>
        ))}
      </div>

      {/* Main Concept Presentation */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {activeArea.floorBadge}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-2 font-cinzel">
              {activeArea.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1 italic">{activeArea.tagline}</p>
          </div>

          <button
            onClick={onOpen3DView}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <Layers className="w-4 h-4" />
            <span>Inspect in 3D Model</span>
          </button>
        </div>

        {/* Narrative Description */}
        <p className="text-slate-700 text-sm md:text-base leading-relaxed">
          {activeArea.description}
        </p>

        {/* Materials Palette Swatches Bar */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-mono">
            Curated Architectural Finishes & Swatches:
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeArea.materialsPalette.map((swatch, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center gap-3.5 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl shadow-inner border border-black/10 shrink-0"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 truncate">{swatch.name}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{swatch.role}</div>
                  <span className="text-[9px] font-mono font-semibold text-slate-400">{swatch.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          {/* Lighting Design */}
          <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm font-cinzel">
              <SunMedium className="w-4 h-4 text-amber-600" />
              <span>Lighting Philosophy</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeArea.lightingDesign}
            </p>
          </div>

          {/* Acoustic Engineering */}
          <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200/60 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm font-cinzel">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Acoustic Attenuation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeArea.acousticTreatment}
            </p>
          </div>

          {/* Circulation & Wayfinding */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-cinzel">
              <Compass className="w-4 h-4 text-slate-700" />
              <span>Circulation & Scale</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeArea.circulationDesign}
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 font-semibold border-t border-slate-200">
              {activeArea.dimensions}
            </div>
          </div>
        </div>

        {/* Key Architectural Features List */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-mono">
            Distinctive Features & Specifications:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeArea.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
