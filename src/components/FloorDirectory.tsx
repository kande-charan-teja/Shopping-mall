import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Search, 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Share2, 
  CheckCircle2, 
  SlidersHorizontal,
  Plus,
  Edit2,
  Trash2,
  Layers,
  ArrowRight,
  Info,
  Maximize2,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FloorId, FloorInfo, ShopUnit, AmenityPoint, StoreCategory } from '../types/mall';

interface FloorDirectoryProps {
  floors: FloorInfo[];
  shops: ShopUnit[];
  amenities: AmenityPoint[];
  currentFloorId: FloorId;
  onFloorChange: (floorId: FloorId) => void;
  onSelectShop?: (shop: ShopUnit) => void;
  onOpen3DView?: () => void;
  onUpdateFloors?: (updatedFloors: FloorInfo[]) => void;
}

export const FloorDirectory: React.FC<FloorDirectoryProps> = ({
  floors,
  shops,
  amenities,
  currentFloorId,
  onFloorChange,
  onSelectShop,
  onOpen3DView,
  onUpdateFloors,
}) => {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showWayfinding, setShowWayfinding] = useState<boolean>(true);
  const [isEditingFloors, setIsEditingFloors] = useState<boolean>(false);
  const [editingFloor, setEditingFloor] = useState<FloorInfo | null>(null);

  // Active Floor Info
  const activeFloor = useMemo(() => {
    return floors.find((f) => f.id === currentFloorId) || floors[2]; // Default to G
  }, [floors, currentFloorId]);

  // Shops on current floor
  const floorShops = useMemo(() => {
    return shops.filter((s) => s.floorId === currentFloorId);
  }, [shops, currentFloorId]);

  // Amenities on current floor
  const floorAmenities = useMemo(() => {
    return amenities.filter((a) => a.floorId === currentFloorId);
  }, [amenities, currentFloorId]);

  // Filtered Shops based on search & category
  const filteredShops = useMemo(() => {
    return floorShops.filter((shop) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        shop.unitNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'ALL' || shop.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [floorShops, searchQuery, selectedCategory]);

  // Selected Shop object
  const activeShop = useMemo(() => {
    return shops.find((s) => s.id === selectedShopId) || null;
  }, [shops, selectedShopId]);

  // Categories present on this floor
  const floorCategories = useMemo(() => {
    const set = new Set<string>();
    floorShops.forEach((s) => set.add(s.category));
    return ['ALL', ...Array.from(set)];
  }, [floorShops]);

  // Wayfinding coordinates (from nearest entrance/elevator to shop center)
  const wayfindingPath = useMemo(() => {
    if (!activeShop || !showWayfinding) return null;
    // Central escalator/elevator hub is roughly (380, 200)
    const startX = 380;
    const startY = 200;
    const targetX = activeShop.mapBounds.x + activeShop.mapBounds.width / 2;
    const targetY = activeShop.mapBounds.y + activeShop.mapBounds.height / 2;

    // Dog-leg waypoint route through the corridors
    const midX = targetX;
    const midY = startY;

    return `M ${startX} ${startY} L ${midX} ${midY} L ${targetX} ${targetY}`;
  }, [activeShop, showWayfinding]);

  const handleShopClick = (shop: ShopUnit) => {
    setSelectedShopId(shop.id);
    if (onSelectShop) onSelectShop(shop);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Bar: Floor Selector + Search & Filter */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Level Switcher Buttons */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Select Level
              </span>
              {activeFloor.isRestricted && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                  <ShieldAlert className="w-3 h-3" />
                  Authorized Personnel Only
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  onClick={() => {
                    onFloorChange(floor.id);
                    setSelectedShopId(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold font-mono transition-all flex items-center gap-2 ${
                    currentFloorId === floor.id
                      ? 'bg-[#0B192C] text-white shadow-md ring-2 ring-[#D4AF37]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{floor.id}</span>
                  <span className="text-xs font-normal font-sans hidden sm:inline text-slate-400">
                    {floor.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search & 3D Jump */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search shops, shoes, food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {onOpen3DView && (
              <button
                onClick={onOpen3DView}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-xs tracking-wide shadow-sm hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Layers className="w-4 h-4" />
                <span>View in 3D</span>
              </button>
            )}
          </div>
        </div>

        {/* Floor Subtitle and Category Filter Badges */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 font-cinzel">
                {activeFloor.name}
              </h2>
              <span className="text-xs text-amber-700 font-medium px-2 py-0.5 bg-amber-50 border border-amber-200/60 rounded-full">
                {activeFloor.subtitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{activeFloor.description}</p>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 max-w-full">
            {floorCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0B192C] text-amber-400 font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Floor Plan Grid: SVG Map on Left + Shop Details Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Architectural Floor Plan Viewer */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 relative overflow-hidden">
          {/* Conceptual Disclaimer Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-white">
                PLAN VIEW: LEVEL {currentFloorId}
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 hidden sm:inline">
                Conceptual Architectural Diagram • Scale 1:200
              </span>
            </div>

            {/* Wayfinding Toggle */}
            <button
              onClick={() => setShowWayfinding(!showWayfinding)}
              className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 border transition-all ${
                showWayfinding
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-medium'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span>Wayfinding Route {showWayfinding ? 'Active' : 'Off'}</span>
            </button>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[16/10] bg-[#F8FAFC] rounded-2xl border border-slate-200 p-2 overflow-hidden shadow-inner">
            <svg
              viewBox="0 0 780 440"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.03))' }}
            >
              {/* Architectural Grid pattern */}
              <defs>
                <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.6" strokeDasharray="2,2" />
                </pattern>
                <linearGradient id="hallwayGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>
              </defs>

              {/* Background Grid */}
              <rect x="0" y="0" width="780" height="440" fill="url(#archGrid)" />

              {/* Floor Outer Boundary Perimeter Wall */}
              <rect
                x="20"
                y="30"
                width="740"
                height="370"
                rx="18"
                fill="#F8FAFC"
                stroke="#0B192C"
                strokeWidth="4"
              />

              {/* Central Atrium Circulation Hallway */}
              <rect
                x="190"
                y="180"
                width="400"
                height="60"
                rx="8"
                fill="url(#hallwayGlow)"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* Central Void / Atrium Indicator */}
              {currentFloorId !== 'B1' && currentFloorId !== 'B2' && (
                <g>
                  <rect
                    x="290"
                    y="160"
                    width="200"
                    height="90"
                    rx="12"
                    fill="#EFF6FF"
                    stroke="#93C5FD"
                    strokeWidth="2"
                  />
                  <text
                    x="390"
                    y="200"
                    textAnchor="middle"
                    className="text-[12px] font-bold fill-blue-900 font-cinzel"
                  >
                    CENTRAL ATRIUM VOID
                  </text>
                  <text
                    x="390"
                    y="218"
                    textAnchor="middle"
                    className="text-[9px] fill-blue-600 font-sans"
                  >
                    Natural Daylight Skylight Above
                  </text>
                </g>
              )}

              {/* Central Escalators & Scenic Elevators Hub */}
              <g transform="translate(365, 175)">
                <rect x="0" y="0" width="50" height="30" rx="4" fill="#0B192C" />
                <text x="25" y="19" textAnchor="middle" fill="#D4AF37" fontSize="10" fontWeight="bold">
                  LIFTS
                </text>
              </g>

              {/* Interactive Shop Units */}
              {floorShops.map((shop) => {
                const isSelected = shop.id === selectedShopId;
                const isMatch = filteredShops.some((s) => s.id === shop.id);
                const { x, y, width, height } = shop.mapBounds;

                return (
                  <g
                    key={shop.id}
                    onClick={() => handleShopClick(shop)}
                    className="cursor-pointer group transition-all"
                  >
                    {/* Unit Box */}
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="8"
                      fill={
                        isSelected
                          ? '#0B192C'
                          : isMatch
                          ? '#FFFFFF'
                          : '#F1F5F9'
                      }
                      stroke={
                        isSelected
                          ? '#D4AF37'
                          : isMatch
                          ? shop.brandColor || '#94A3B8'
                          : '#CBD5E1'
                      }
                      strokeWidth={isSelected ? 3 : 1.8}
                      opacity={isMatch || searchQuery === '' ? 1 : 0.35}
                      className="transition-all duration-200"
                    />

                    {/* Unit Tag Header Badge */}
                    <rect
                      x={x + 8}
                      y={y + 8}
                      width={52}
                      height={16}
                      rx="4"
                      fill={isSelected ? '#D4AF37' : '#F1F5F9'}
                    />
                    <text
                      x={x + 34}
                      y={y + 20}
                      textAnchor="middle"
                      fill={isSelected ? '#0B192C' : '#475569'}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {shop.unitNumber}
                    </text>

                    {/* Shop Name Text (Auto-wraps / truncated) */}
                    <text
                      x={x + 12}
                      y={y + 45}
                      fill={isSelected ? '#FFFFFF' : '#0F172A'}
                      fontSize={width > 160 ? 12 : 10.5}
                      fontWeight="bold"
                      className="transition-colors"
                    >
                      {shop.name.length > 20 && width < 160
                        ? `${shop.name.substring(0, 18)}...`
                        : shop.name}
                    </text>

                    {/* Category Label */}
                    <text
                      x={x + 12}
                      y={y + 62}
                      fill={isSelected ? '#D4AF37' : '#64748B'}
                      fontSize="9"
                      fontWeight="500"
                    >
                      {shop.category}
                    </text>

                    {/* Selection Pin Indicator */}
                    {isSelected && (
                      <circle
                        cx={x + width - 18}
                        cy={y + 18}
                        r="6"
                        fill="#D4AF37"
                        stroke="#0B192C"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                );
              })}

              {/* Wayfinding Animated Route Line */}
              {wayfindingPath && (
                <g>
                  {/* Glow Shadow Line */}
                  <path
                    d={wayfindingPath}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.4"
                  />
                  {/* Animated Dashed Golden Guide */}
                  <path
                    d={wayfindingPath}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6,4"
                    className="animate-pulse"
                  />
                  {/* Start Point (Elevator Hub) */}
                  <circle cx="380" cy="200" r="7" fill="#0B192C" stroke="#D4AF37" strokeWidth="2" />
                  <circle cx="380" cy="200" r="3" fill="#D4AF37" />
                  {/* Destination Icon Point */}
                  {activeShop && (
                    <circle
                      cx={activeShop.mapBounds.x + activeShop.mapBounds.width / 2}
                      cy={activeShop.mapBounds.y + activeShop.mapBounds.height / 2}
                      r="8"
                      fill="#EF4444"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  )}
                </g>
              )}

              {/* Amenities Pins */}
              {floorAmenities.map((amenity) => (
                <g
                  key={amenity.id}
                  transform={`translate(${amenity.x}, ${amenity.y})`}
                  className="cursor-help"
                >
                  <title>{`${amenity.name}: ${amenity.description}`}</title>
                  <circle cx="0" cy="0" r="9" fill="#0B192C" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill="#D4AF37"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {amenity.type === 'restroom'
                      ? 'WC'
                      : amenity.type === 'elevator'
                      ? 'EL'
                      : amenity.type === 'escalator'
                      ? 'ES'
                      : amenity.type === 'emergency-exit'
                      ? 'EX'
                      : amenity.type === 'ev-charger'
                      ? 'EV'
                      : 'ℹ'}
                  </text>
                </g>
              ))}

              {/* Compass Rose Bottom Left */}
              <g transform="translate(48, 385)">
                <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                <path d="M 0 -10 L 4 0 L 0 3 L -4 0 Z" fill="#EF4444" />
                <path d="M 0 10 L 4 0 L 0 -3 L -4 0 Z" fill="#94A3B8" />
                <text x="0" y="-12" textAnchor="middle" fill="#0B192C" fontSize="8" fontWeight="bold">
                  N
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Legend Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-3 h-3 rounded bg-[#0B192C] border border-[#D4AF37] inline-block" />
                Selected Shop
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-3 h-3 rounded bg-white border border-slate-300 inline-block" />
                Retail Unit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#0B192C] text-[#D4AF37] text-[9px] font-bold flex items-center justify-center">
                  WC
                </span>
                Restrooms
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#0B192C] text-[#D4AF37] text-[9px] font-bold flex items-center justify-center">
                  EL
                </span>
                Elevator Core
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#0B192C] text-[#D4AF37] text-[9px] font-bold flex items-center justify-center">
                  EX
                </span>
                Fire Egress
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Click any shop box to inspect details</span>
          </div>
        </div>

        {/* Right Column: Selected Shop Detail Card / Unit Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {activeShop ? (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 animate-fade-in relative">
              {/* Unit Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300">
                      {activeShop.unitNumber}
                    </span>
                    <span className="text-xs text-slate-500">Level {activeShop.floorId}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 font-cinzel">
                    {activeShop.name}
                  </h3>
                </div>

                <span
                  className="w-4 h-4 rounded-full shrink-0 mt-1"
                  style={{ backgroundColor: activeShop.brandColor || '#D4AF37' }}
                  title="Brand Accent"
                />
              </div>

              {/* Category & Status */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                  {activeShop.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeShop.isOpen ? 'Open Now' : 'Closed'}
                </span>
                {activeShop.priceRange && (
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {activeShop.priceRange}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {activeShop.description}
              </p>

              {/* Quick Specs */}
              <div className="space-y-2.5 text-xs text-slate-600 mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Hours:</strong> {activeShop.openingHours}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Phone:</strong> {activeShop.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Nearest:</strong> {activeShop.nearestEntrance}
                  </span>
                </div>
              </div>

              {/* Turn-by-Turn Wayfinding Directions Box */}
              <div className="p-4 rounded-xl bg-[#0B192C] text-white space-y-2 mb-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Wayfinding Guidance</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeShop.directionsGuide}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Take {activeShop.nearestElevator}</span>
                  <span className="text-amber-400 font-medium">Est. 2 min walk</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4">
                {activeShop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `Smart Mall - ${activeShop.name} (${activeShop.unitNumber}) on ${activeFloor.name}`
                    );
                    alert(`Copied location link for ${activeShop.name}`);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Location</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpen3DView) onOpen3DView();
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-900 text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View in 3D</span>
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 font-cinzel">
                  Interactive Floor Inspector
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  Click any store unit on the architectural plan or search for a brand to view specifications, operating hours, and live wayfinding paths.
                </p>
              </div>

              {/* Quick links to popular shops on this floor */}
              <div className="pt-4 border-t border-slate-100 text-left">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  Popular On {activeFloor.name}
                </span>
                <div className="space-y-1.5">
                  {floorShops.slice(0, 4).map((shop) => (
                    <button
                      key={shop.id}
                      onClick={() => handleShopClick(shop)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                          {shop.name}
                        </div>
                        <div className="text-[10px] text-slate-400">{shop.category}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-amber-600">
                        {shop.unitNumber} →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Configurable Floor Notice & Admin Customizer Trigger */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-700 text-xs flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-900">Customizable Multi-Floor Plan</p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                The mall owner can add, rename, re-sequence, and calibrate departments across B2 to L5 using the Operations Portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
