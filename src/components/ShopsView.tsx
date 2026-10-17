import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Tag, 
  ArrowUpRight, 
  CheckCircle2, 
  SlidersHorizontal,
  Layers,
  Sparkles
} from 'lucide-react';
import { ShopUnit, StoreCategory, FloorId } from '../types/mall';

interface ShopsViewProps {
  shops: ShopUnit[];
  onLocateOnFloor: (floorId: FloorId, shopId: string) => void;
  onOpen3DView: () => void;
}

export const ShopsView: React.FC<ShopsViewProps> = ({ shops, onLocateOnFloor, onOpen3DView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFloor, setSelectedFloor] = useState<string>('ALL');
  const [openOnly, setOpenOnly] = useState<boolean>(false);
  const [activeModalShop, setActiveModalShop] = useState<ShopUnit | null>(null);

  const categories: string[] = useMemo(() => {
    const set = new Set<string>();
    shops.forEach((s) => set.add(s.category));
    return ['ALL', ...Array.from(set)];
  }, [shops]);

  const floorsList = ['ALL', 'G', 'L1', 'L2', 'L3', 'L4', 'L5', 'B1', 'B2'];

  const filteredShops = useMemo(() => {
    return shops.filter((s) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = selectedCategory === 'ALL' || s.category === selectedCategory;
      const matchFloor = selectedFloor === 'ALL' || s.floorId === selectedFloor;
      const matchOpen = !openOnly || s.isOpen;

      return matchSearch && matchCategory && matchFloor && matchOpen;
    });
  }, [shops, searchQuery, selectedCategory, selectedFloor, openOnly]);

  return (
    <div className="w-full space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-[#0B192C] text-white p-8 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Curated World-Class Brands
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Shops & Brand Directory
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Discover bespoke haute couture, Swiss horology, cutting-edge consumer technology, and Scandinavian living across our eight thoughtfully designed levels.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by brand name, category, or keywords (e.g., jewelry, shoes, apple)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Floor Dropdown Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Floor:</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {floorsList.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFloor(f)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    selectedFloor === f
                      ? 'bg-[#0B192C] text-amber-400'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Open Now Checkbox */}
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 whitespace-nowrap">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={(e) => setOpenOnly(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-400"
            />
            <span>Open Now</span>
          </label>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filters */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredShops.length}</strong> retail locations
        </span>
        <span className="text-[11px] text-slate-400">
          Demo data clearly labeled • Subject to lease confirmation
        </span>
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.map((shop) => (
          <div
            key={shop.id}
            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200/90 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Card Decorator Ribbon */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: shop.brandColor || '#D4AF37' }}
            />

            <div>
              {/* Card Header: Unit Number & Rating */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {shop.unitNumber}
                  </span>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                    Floor {shop.floorId}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{shop.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors mb-1 font-cinzel">
                {shop.name}
              </h3>
              <p className="text-xs font-medium text-slate-500 mb-3">{shop.category}</p>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {shop.description}
              </p>

              {/* Quick Info Specs */}
              <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{shop.openingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{shop.phone}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1 flex-wrap mb-4">
                {shop.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => onLocateOnFloor(shop.floorId, shop.id)}
                className="px-3 py-2 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locate on Map</span>
              </button>

              <button
                onClick={() => setActiveModalShop(shop)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredShops.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No brands found</h3>
          <p className="text-xs text-slate-500">
            No shops matched your search for "{searchQuery}". Try clearing filters or searching for terms like "fashion", "shoes", or "tech".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setSelectedFloor('ALL');
              setOpenOnly(false);
            }}
            className="px-4 py-2 bg-slate-900 text-amber-400 rounded-xl text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {activeModalShop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-fade-in space-y-5">
            <button
              onClick={() => setActiveModalShop(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-sm font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Unit {activeModalShop.unitNumber}
                </span>
                <span className="text-xs text-slate-500">Floor {activeModalShop.floorId}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-cinzel">
                {activeModalShop.name}
              </h2>
              <p className="text-xs text-amber-700 font-medium">{activeModalShop.category}</p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeModalShop.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-700">
              <div>
                <strong>Operating Hours:</strong> {activeModalShop.openingHours}
              </div>
              <div>
                <strong>Direct Phone:</strong> {activeModalShop.phone}
              </div>
              <div>
                <strong>Nearest Access:</strong> {activeModalShop.nearestEntrance}
              </div>
              <div>
                <strong>Wayfinding Guide:</strong> {activeModalShop.directionsGuide}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onLocateOnFloor(activeModalShop.floorId, activeModalShop.id);
                  setActiveModalShop(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0B192C] text-amber-400 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Show on Floor Plan</span>
              </button>
              <button
                onClick={() => {
                  onOpen3DView();
                  setActiveModalShop(null);
                }}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>3D View</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
