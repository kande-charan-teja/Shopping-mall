import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  Download, 
  Printer, 
  DollarSign, 
  Sliders, 
  AlertTriangle, 
  Check, 
  FileSpreadsheet, 
  Layers 
} from 'lucide-react';
import { CostCategoryItem } from '../types/mall';
import { INITIAL_COST_ITEMS } from '../data/costsData';

export const CostEstimatorView: React.FC = () => {
  const [costItems, setCostItems] = useState<CostCategoryItem[]>(INITIAL_COST_ITEMS);
  const [contingencyPercent, setContingencyPercent] = useState<number>(10);
  const [taxPercent, setTaxPercent] = useState<number>(5);

  const totalGfaSqM = 180000;
  const totalGfaSqFt = Math.round(totalGfaSqM * 10.7639);

  // Group items by category
  const categoriesList = useMemo(() => {
    const map = new Map<string, CostCategoryItem[]>();
    costItems.forEach((item) => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    });
    return Array.from(map.entries());
  }, [costItems]);

  // Subtotal before contingency and tax
  const rawSubtotal = useMemo(() => {
    return costItems.reduce((acc, curr) => acc + curr.quantity * curr.unitRate, 0);
  }, [costItems]);

  const contingencyAmount = useMemo(() => {
    return rawSubtotal * (contingencyPercent / 100);
  }, [rawSubtotal, contingencyPercent]);

  const taxAmount = useMemo(() => {
    return (rawSubtotal + contingencyAmount) * (taxPercent / 100);
  }, [rawSubtotal, contingencyAmount, taxPercent]);

  const finalGrandTotal = useMemo(() => {
    return rawSubtotal + contingencyAmount + taxAmount;
  }, [rawSubtotal, contingencyAmount, taxAmount]);

  const costPerSqM = Math.round(finalGrandTotal / totalGfaSqM);
  const costPerSqFt = Math.round(finalGrandTotal / totalGfaSqFt);

  const handleUpdateItem = (id: string, field: 'quantity' | 'unitRate', val: number) => {
    setCostItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: Math.max(0, val) } : it))
    );
  };

  const handleReset = () => {
    setCostItems(INITIAL_COST_ITEMS);
    setContingencyPercent(10);
    setTaxPercent(5);
  };

  const handleExportCsv = () => {
    const headers = ['Category', 'Description', 'Unit', 'Quantity', 'Unit Rate (USD)', 'Subtotal (USD)', 'Notes'];
    const rows = costItems.map((item) => [
      `"${item.category}"`,
      `"${item.description.replace(/"/g, '""')}"`,
      `"${item.unit}"`,
      item.quantity,
      item.unitRate,
      item.quantity * item.unitRate,
      `"${item.notes.replace(/"/g, '""')}"`,
    ]);

    rows.push([]);
    rows.push(['"Base Subtotal"', '', '', '', '', rawSubtotal, '']);
    rows.push([`"Contingency Allowance (${contingencyPercent}%)"`, '', '', '', '', contingencyAmount, '']);
    rows.push([`"Estimated Taxes & Municipal Duties (${taxPercent}%)"`, '', '', '', '', taxAmount, '']);
    rows.push(['"ESTIMATED GRAND TOTAL"', '', '', '', '', finalGrandTotal, '']);
    rows.push(['"Cost Per Square Meter"', '', '', '', '', costPerSqM, '']);
    rows.push(['"Cost Per Square Foot"', '', '', '', '', costPerSqFt, '']);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Smart_Mall_Preliminary_Cost_Estimate.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-[#0B192C] text-white p-8 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Calculator className="w-3.5 h-3.5" />
            Preliminary Feasibility Budgeting
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Construction Cost Estimator
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Interactive commercial budgeting tool covering structural framing, facade engineering, vertical transportation, HVAC MEP systems, and contingency modeling for the 180,000 m² property.
          </p>
        </div>
      </div>

      {/* KPI Highlight Deck */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Cost */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Estimated Project Total
          </span>
          <div className="text-3xl font-bold text-slate-900 font-cinzel">
            ${Math.round(finalGrandTotal).toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-700 font-medium">Includes contingency & taxes</p>
        </div>

        {/* Cost / Sq.M */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Cost Per Square Meter
          </span>
          <div className="text-3xl font-bold text-slate-900 font-cinzel">
            ${costPerSqM.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Based on 180,000 m² GFA</p>
        </div>

        {/* Cost / Sq.Ft */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Cost Per Square Foot
          </span>
          <div className="text-3xl font-bold text-slate-900 font-cinzel">
            ${costPerSqFt.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Approx. 1,937,500 sq.ft</p>
        </div>

        {/* Base Subtotal */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Direct Core Subtotal
          </span>
          <div className="text-3xl font-bold text-slate-900 font-cinzel">
            ${Math.round(rawSubtotal).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">18 work packages evaluated</p>
        </div>
      </div>

      {/* Contingency, Tax Adjustment & Export Actions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          {/* Contingency Slider */}
          <div className="w-full md:w-1/3 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Contingency Reserve:</span>
              <span className="font-mono text-amber-700 font-bold">{contingencyPercent}% (+${Math.round(contingencyAmount).toLocaleString()})</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={contingencyPercent}
              onChange={(e) => setContingencyPercent(parseInt(e.target.value) || 0)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Tax Slider */}
          <div className="w-full md:w-1/3 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Municipal Taxes & Permits:</span>
              <span className="font-mono text-amber-700 font-bold">{taxPercent}% (+${Math.round(taxAmount).toLocaleString()})</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={taxPercent}
              onChange={(e) => setTaxPercent(parseInt(e.target.value) || 0)}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <button
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              title="Reset rates to baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Detailed Work Package Table */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-cinzel">
              Itemized Work Package Breakdown
            </h3>
            <span className="text-xs text-slate-400">All quantities and rates are directly editable</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">Work Package</th>
                  <th className="py-3 px-4">Description & Scope</th>
                  <th className="py-3 px-3">Unit</th>
                  <th className="py-3 px-3 w-32">Quantity</th>
                  <th className="py-3 px-3 w-32">Rate (USD)</th>
                  <th className="py-3 px-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {costItems.map((item) => {
                  const lineTotal = item.quantity * item.unitRate;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-sm">
                        <div className="font-medium text-slate-800">{item.description}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{item.notes}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                        {item.unit}
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-2 py-1 bg-slate-50 focus:bg-white border border-slate-200 rounded font-mono font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                          <input
                            type="number"
                            value={item.unitRate}
                            onChange={(e) =>
                              handleUpdateItem(item.id, 'unitRate', parseFloat(e.target.value) || 0)
                            }
                            className="w-full pl-5 pr-2 py-1 bg-slate-50 focus:bg-white border border-slate-200 rounded font-mono font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        ${lineTotal.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Professional Warning Box */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">Certified Professional Verification Notice</p>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            All quantities, rates, tax assumptions, and project cost totals generated by this calculator are preliminary modeling guidelines only. Final construction figures are subject to detailed architectural construction documents, geotechnical core boreholes, local municipal tariff schedules, supply chain inflation, and formal competitive general contractor bids verified by a licensed Quantity Surveyor (RICS/AACE).
          </p>
        </div>
      </div>
    </div>
  );
};
