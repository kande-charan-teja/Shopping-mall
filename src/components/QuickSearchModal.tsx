import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Store, Utensils, Boxes, Users, ArrowRight, X } from 'lucide-react';
import { ShopUnit, FloorId, MaterialItem, StaffRole } from '../types/mall';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  shops: ShopUnit[];
  materials: MaterialItem[];
  staff: StaffRole[];
  onSelectShop: (shop: ShopUnit) => void;
  onNavigateTab: (tabId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  shops,
  materials,
  staff,
  onSelectShop,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const matchedShops = useMemo(() => {
    if (!query.trim()) return [];
    return shops.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        s.unitNumber.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [shops, query]);

  const matchedMaterials = useMemo(() => {
    if (!query.trim()) return [];
    return materials.filter(
      (m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase()) ||
        m.application.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3);
  }, [materials, query]);

  const matchedStaff = useMemo(() => {
    if (!query.trim()) return [];
    return staff.filter(
      (st) =>
        st.title.toLowerCase().includes(query.toLowerCase()) ||
        st.department.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3);
  }, [staff, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        {/* Search Input Bar */}
        <div className="relative p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search stores, shoes, sushi, marble, engineering..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100"
            >
              Clear
            </button>
          ) : (
            <kbd className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-400 border border-slate-200">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p>Type keywords to search across shops, dining, materials, and staff.</p>
              <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                {['Jewelry', 'IMAX', 'Teppanyaki', 'Solar', 'HVAC', 'Shoes'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs hover:bg-amber-100 hover:text-amber-900 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Shops & Dining Matches */}
              {matchedShops.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block px-2">
                    Shops & Dining ({matchedShops.length})
                  </span>
                  {matchedShops.map((shop) => (
                    <div
                      key={shop.id}
                      onClick={() => {
                        onSelectShop(shop);
                        onClose();
                      }}
                      className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center font-mono">
                          {shop.floorId}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                            {shop.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {shop.unitNumber} • {shop.category}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-amber-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>View Map</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Materials Matches */}
              {matchedMaterials.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block px-2">
                    Materials & Finishes ({matchedMaterials.length})
                  </span>
                  {matchedMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      onClick={() => {
                        onNavigateTab('materials');
                        onClose();
                      }}
                      className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                          {mat.name}
                        </div>
                        <div className="text-xs text-slate-500">{mat.category} • {mat.finish}</div>
                      </div>
                      <span className="text-xs text-slate-400 group-hover:text-amber-600 font-medium">
                        View Material →
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Staff Matches */}
              {matchedStaff.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block px-2">
                    Staff & Department Roles ({matchedStaff.length})
                  </span>
                  {matchedStaff.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => {
                        onNavigateTab('staff');
                        onClose();
                      }}
                      className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                          {st.title}
                        </div>
                        <div className="text-xs text-slate-500">{st.department}</div>
                      </div>
                      <span className="text-xs text-slate-400 group-hover:text-amber-600 font-medium">
                        View Role →
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {matchedShops.length === 0 &&
                matchedMaterials.length === 0 &&
                matchedStaff.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No results found for "{query}".
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
