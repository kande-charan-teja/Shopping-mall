import React, { useState, useMemo } from 'react';
import { 
  Boxes, 
  Search, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Leaf, 
  Edit3, 
  RotateCcw, 
  DollarSign, 
  Layers, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { MaterialItem } from '../types/mall';
import { INITIAL_MATERIALS } from '../data/materialsData';

export const MaterialsLibrary: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isEditingCosts, setIsEditingCosts] = useState<boolean>(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    materials.forEach((m) => set.add(m.category));
    return ['ALL', ...Array.from(set)];
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.application.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.finish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'ALL' || m.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [materials, searchQuery, selectedCategory]);

  // Total indicative material budget calculation
  const totalMaterialCost = useMemo(() => {
    return materials.reduce((acc, curr) => acc + curr.indicativeCostPerUnit * curr.estimatedQuantity, 0);
  }, [materials]);

  const handleUpdateItem = (id: string, field: 'indicativeCostPerUnit' | 'estimatedQuantity', val: number) => {
    setMaterials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: Math.max(0, val) } : item))
    );
  };

  const handleResetMaterials = () => {
    setMaterials(INITIAL_MATERIALS);
  };

  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-[#0B192C] text-white p-8 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Boxes className="w-3.5 h-3.5" />
            Architectural Specification Library
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Materials & Finishes Catalog
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Detailed engineering specifications for all structural concrete, Low-E glass facades, Calacatta terrazzo flooring, acoustic micro-baffle ceilings, and sustainable renewable energy installations.
          </p>
        </div>
      </div>

      {/* Estimator Summary Bar & Edit Mode Toggle */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-mono">
            Indicative Materials Schedule Budget
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl md:text-3xl font-bold text-slate-900 font-cinzel">
              ${totalMaterialCost.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">USD (Preliminary estimate)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditingCosts(!isEditingCosts)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              isEditingCosts
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingCosts ? 'Lock Values' : 'Edit Unit Rates & Qty'}</span>
          </button>

          {isEditingCosts && (
            <button
              onClick={handleResetMaterials}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors flex items-center gap-1"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search materials by name, finish, application, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B192C] text-amber-400 font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMaterials.map((mat) => {
          const itemTotal = mat.indicativeCostPerUnit * mat.estimatedQuantity;

          return (
            <div
              key={mat.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:border-amber-400/80 transition-colors"
            >
              <div>
                {/* Header Category and Badges */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                    {mat.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {mat.ecoRating && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Leaf className="w-2.5 h-2.5" />
                        Eco {mat.ecoRating}
                      </span>
                    )}
                    {mat.fireRating && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        {mat.fireRating}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-cinzel mb-1">{mat.name}</h3>
                <p className="text-xs text-amber-700 font-medium mb-3">
                  <strong>Finish:</strong> {mat.finish}
                </p>

                {/* Application */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-3">
                  <strong>Architectural Application:</strong> {mat.application}
                </div>

                {/* Advantages */}
                <div className="space-y-1 mb-3">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                    Key Performance Advantages:
                  </span>
                  {mat.advantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>

                {/* Maintenance */}
                <p className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
                  <strong>Lifecycle Care:</strong> {mat.maintenance}
                </p>
              </div>

              {/* Cost & Quantity Breakdown Bar */}
              <div className="pt-4 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-5 rounded-b-3xl">
                <div className="grid grid-cols-3 gap-3 items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
                      Rate / {mat.unit}
                    </span>
                    {isEditingCosts ? (
                      <input
                        type="number"
                        value={mat.indicativeCostPerUnit}
                        onChange={(e) =>
                          handleUpdateItem(mat.id, 'indicativeCostPerUnit', parseFloat(e.target.value) || 0)
                        }
                        className="w-full mt-1 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900"
                      />
                    ) : (
                      <span className="text-sm font-bold font-mono text-slate-900">
                        ${mat.indicativeCostPerUnit.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
                      Estimated Qty
                    </span>
                    {isEditingCosts ? (
                      <input
                        type="number"
                        value={mat.estimatedQuantity}
                        onChange={(e) =>
                          handleUpdateItem(mat.id, 'estimatedQuantity', parseFloat(e.target.value) || 0)
                        }
                        className="w-full mt-1 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900"
                      />
                    ) : (
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {mat.estimatedQuantity.toLocaleString()} {mat.unit}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
                      Indicative Subtotal
                    </span>
                    <span className="text-base font-bold font-mono text-amber-700">
                      ${itemTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-700 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Architectural Disclaimer:</strong> All material specifications, performance ratings, and unit costs are indicative figures modeled for design exploration and preliminary budgeting. Physical installation requires certified site engineering verification, local building code clearances, and actual contractor procurement tenders.
        </p>
      </div>
    </div>
  );
};
