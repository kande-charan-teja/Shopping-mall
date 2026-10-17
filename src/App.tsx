import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Layers, 
  MapPin, 
  Store, 
  UtensilsCrossed, 
  Film, 
  Boxes, 
  Palette, 
  Compass, 
  Calculator, 
  Leaf, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Search,
  ChevronRight,
  TrendingUp,
  Activity,
  Maximize2
} from 'lucide-react';
import { FloorId, ShopUnit, FloorInfo } from './types/mall';
import { INITIAL_FLOORS, INITIAL_SHOPS, INITIAL_AMENITIES } from './data/floorsData';
import { INITIAL_MATERIALS } from './data/materialsData';
import { INITIAL_STAFF_ROLES } from './data/staffData';
import { INITIAL_EVENTS } from './data/eventsData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThreeMallViewer } from './components/ThreeMallViewer';
import { FloorDirectory } from './components/FloorDirectory';
import { ShopsView } from './components/ShopsView';
import { DiningView } from './components/DiningView';
import { EntertainmentView } from './components/EntertainmentView';
import { MaterialsLibrary } from './components/MaterialsLibrary';
import { InteriorDesignView } from './components/InteriorDesignView';
import { SiteLayoutView } from './components/SiteLayoutView';
import { CostEstimatorView } from './components/CostEstimatorView';
import { SustainabilityView } from './components/SustainabilityView';
import { StaffCareersView } from './components/StaffCareersView';
import { OperationsDashboard } from './components/OperationsDashboard';
import { ContactSupportView } from './components/ContactSupportView';
import { QuickSearchModal } from './components/QuickSearchModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedFloorId, setSelectedFloorId] = useState<FloorId>('G');
  const [floors, setFloors] = useState<FloorInfo[]>(INITIAL_FLOORS);
  const [shops, setShops] = useState<ShopUnit[]>(INITIAL_SHOPS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global hotkey for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Jump helper: Navigate to floor plan and isolate shop
  const handleLocateOnFloor = (floorId: FloorId, shopId: string) => {
    setSelectedFloorId(floorId);
    setCurrentTab('floors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectShopFromSearch = (shop: ShopUnit) => {
    handleLocateOnFloor(shop.floorId, shop.id);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A202C] flex flex-col selection:bg-amber-400/20 selection:text-slate-900 font-sans-body">
      {/* Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* VIEW 1: HOMEPAGE */}
        {currentTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            {/* HERO SECTION */}
            <section className="relative rounded-3xl bg-gradient-to-b from-[#0B192C] via-[#0F1E36] to-[#0B192C] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-slate-800">
              {/* Background architectural ambiance */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-600/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  Premier Architectural Destination
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-cinzel leading-tight">
                  Discover a World of Shopping, Dining, and Entertainment.
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Explore an extraordinary shopping destination featuring premium retail brands, delicious dining, family entertainment, and inspiring architecture.
                </p>

                {/* 4 Functional Buttons */}
                <div className="pt-2 flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      setCurrentTab('3d-tour');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 group"
                  >
                    <Layers className="w-4 h-4 text-slate-950" />
                    <span>Take a Virtual Tour</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('floors');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/15 transition-all flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>View All Floors</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('shops');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/15 transition-all flex items-center gap-2"
                  >
                    <Store className="w-4 h-4 text-amber-400" />
                    <span>Discover Shops</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('site-layout');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-sm border border-slate-700/80 transition-all flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-slate-400" />
                    <span>Explore Site Plan</span>
                  </button>
                </div>
              </div>

              {/* Embedded Interactive 3D Showcase Preview inside Hero */}
              <div className="mt-10 pt-8 border-t border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
                    <Layers className="w-4 h-4" />
                    <span>Real-Time 3D Building Visualization</span>
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    Click & drag to rotate • Scroll to zoom • Use bottom dock to explode floors
                  </span>
                </div>
                <ThreeMallViewer
                  initialFloorId={selectedFloorId}
                  onSelectFloor={(fid) => {
                    setSelectedFloorId(fid);
                    setCurrentTab('floors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            </section>

            {/* MALL STATISTICS SECTION */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-cinzel">Mall Architecture & Scale</h2>
                  <p className="text-xs text-slate-500">Key dimensional metrics across the commercial real estate development</p>
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  Figures Illustrative & Verified
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Total Building Area', value: '180,000 m²', sub: '~1,937,500 sq.ft GFA', icon: Building2 },
                  { label: 'Building Floors', value: '8 Levels', sub: 'B2 to L5 + Sky Atrium', icon: Layers },
                  { label: 'Curated Shops', value: '34+ Units', sub: '96.2% Leased Occupancy', icon: Store },
                  { label: 'Dining Outlets', value: '30+ Venues', sub: '1,200-Seat Food Court', icon: UtensilsCrossed },
                  { label: 'Smart Parking', value: '1,850 Bays', sub: '48 Level-3 EV Chargers', icon: Compass },
                  { label: 'Entertainment', value: '12 Screens', sub: 'Laser IMAX & VR Arena', icon: Film },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-1 hover:border-amber-400 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-amber-600 mb-2" />
                      <div className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">{stat.value}</div>
                      <div className="text-xs font-semibold text-slate-700">{stat.label}</div>
                      <div className="text-[10px] text-slate-400">{stat.sub}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FEATURED SECTIONS EXPLORATION TILES */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-cinzel">Curated Mall Destinations</h2>
                  <p className="text-xs text-slate-500">Explore signature departments, leisure sanctuaries, and architectural highlights</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Fashion */}
                <div
                  onClick={() => {
                    setCurrentTab('shops');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Ground & Level 1
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-amber-700 transition-colors">
                      Haute Couture & Fashion
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Italian runway collections, handcrafted leather goods, Swiss watchmakers, and contemporary athletic lifestyle flagships.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform gap-1">
                    <span>Explore Brands</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. Electronics & Home */}
                <div
                  onClick={() => {
                    setSelectedFloorId('L2');
                    setCurrentTab('floors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                      Level 2
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-amber-700 transition-colors">
                      Consumer Tech & Nordic Living
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Quantum computing demo stores, sound-treated audio listening chambers, AI smart home robotics, and Scandinavian furniture.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform gap-1">
                    <span>View Level 2 Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. Dining */}
                <div
                  onClick={() => {
                    setCurrentTab('dining');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                      Level 3 & Terraces
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-amber-700 transition-colors">
                      The Grand Terrace Food Court
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      24 global street food stalls, wood-fired Neapolitan pizza, Miyazaki Wagyu teppanyaki, and an outdoor skyline garden terrace.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform gap-1">
                    <span>Explore Dining</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 4. Entertainment */}
                <div
                  onClick={() => {
                    setCurrentTab('entertainment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                      Level 4
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-cinzel group-hover:text-amber-700 transition-colors">
                      Laser IMAX & Family Leisure
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      12 luxury laser cinema auditoriums, 20,000 sq.ft CyberVerse VR gaming arena, 16 boutique bowling lanes, and kids play zone.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform gap-1">
                    <span>View Showtimes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </section>

            {/* UPCOMING MALL EVENTS & EXPERIENCES */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-cinzel">Events, Runways & Activations</h2>
                  <p className="text-xs text-slate-500">Seasonal luxury exhibitions, celebrity masterclasses, and family weekends</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_EVENTS.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          {event.highlightBadge}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-500">{event.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 font-cinzel">{event.title}</h3>
                      <p className="text-xs text-slate-500">{event.location} • {event.time}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">{event.rsvpCount} Attending</span>
                      <button
                        onClick={() => alert(`RSVP registered for ${event.title}`)}
                        className="px-3 py-1.5 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors"
                      >
                        RSVP / Save Date
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ARCHITECTURAL HIGHLIGHTS ROW */}
            <section className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block">
                  Design & Engineering Excellence
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-cinzel">
                  Crafted by Leading Architects & Structural Engineers
                </h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Every square meter of Smart Mall is conceived to harmonize aesthetic grandeur with operational functionality. Discover our architectural materials library, preliminary construction cost estimator, and sustainable MEP infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentTab('materials');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">
                      Materials & Finishes Library
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">11 categories with unit rates & specs</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('estimator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">
                      Construction Cost Estimator
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">Preliminary project budget calculator</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('sustainability');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">
                      Sustainability & Solar Array
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">1.2 MWp solar crown & rainwater plant</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: 3D VIRTUAL TOUR FULL PAGE */}
        {currentTab === '3d-tour' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 font-cinzel">3D Virtual Mall Visualization</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Full interactive WebGL axonometric model. Use mouse or touch to orbit, zoom, switch day/night lighting, and explode floors vertically.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('floors');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 self-start md:self-auto"
              >
                <MapPin className="w-4 h-4" />
                <span>Switch to 2D Floor Directory</span>
              </button>
            </div>

            <ThreeMallViewer
              initialFloorId={selectedFloorId}
              onSelectFloor={(fid) => {
                setSelectedFloorId(fid);
                setCurrentTab('floors');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 3: INTERACTIVE MULTI-FLOOR DIRECTORY */}
        {currentTab === 'floors' && (
          <FloorDirectory
            floors={floors}
            shops={shops}
            amenities={INITIAL_AMENITIES}
            currentFloorId={selectedFloorId}
            onFloorChange={(fid) => setSelectedFloorId(fid)}
            onOpen3DView={() => setCurrentTab('3d-tour')}
            onUpdateFloors={(uf) => setFloors(uf)}
          />
        )}

        {/* VIEW 4: SHOPS & BRANDS DIRECTORY */}
        {currentTab === 'shops' && (
          <ShopsView
            shops={shops}
            onLocateOnFloor={handleLocateOnFloor}
            onOpen3DView={() => setCurrentTab('3d-tour')}
          />
        )}

        {/* VIEW 5: RESTAURANTS & FOOD COURT */}
        {currentTab === 'dining' && (
          <DiningView
            shops={shops}
            onLocateOnFloor={handleLocateOnFloor}
          />
        )}

        {/* VIEW 6: ENTERTAINMENT & CINEMA */}
        {currentTab === 'entertainment' && (
          <EntertainmentView
            onLocateOnFloor={handleLocateOnFloor}
          />
        )}

        {/* VIEW 7: ARCHITECTURAL MATERIALS LIBRARY */}
        {currentTab === 'materials' && <MaterialsLibrary />}

        {/* VIEW 8: INTERIOR DESIGN GALLERY */}
        {currentTab === 'interior' && (
          <InteriorDesignView onOpen3DView={() => setCurrentTab('3d-tour')} />
        )}

        {/* VIEW 9: SITE LAYOUT & MASTERPLAN */}
        {currentTab === 'site-layout' && (
          <SiteLayoutView
            onOpen3DView={() => setCurrentTab('3d-tour')}
            onExploreFloors={() => setCurrentTab('floors')}
          />
        )}

        {/* VIEW 10: CONSTRUCTION COST ESTIMATOR */}
        {currentTab === 'estimator' && <CostEstimatorView />}

        {/* VIEW 11: SUSTAINABILITY & SMART BUILDING */}
        {currentTab === 'sustainability' && <SustainabilityView />}

        {/* VIEW 12: STAFF DIRECTORY & CAREERS */}
        {currentTab === 'staff' && <StaffCareersView />}

        {/* VIEW 13: CONTACT & CUSTOMER SUPPORT */}
        {currentTab === 'contact' && <ContactSupportView />}

        {/* VIEW 14: OPERATIONS & ADMINISTRATION DASHBOARD */}
        {currentTab === 'dashboard' && <OperationsDashboard shops={shops} />}
      </main>

      {/* Global Instant Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        shops={shops}
        materials={INITIAL_MATERIALS}
        staff={INITIAL_STAFF_ROLES}
        onSelectShop={handleSelectShopFromSearch}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
