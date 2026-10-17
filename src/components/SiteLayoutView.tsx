import React, { useState } from 'react';
import { 
  Map, 
  Car, 
  Truck, 
  Trees, 
  ShieldCheck, 
  ArrowRight, 
  Info, 
  Layers, 
  Sparkles,
  Maximize2
} from 'lucide-react';

interface SiteLayoutViewProps {
  onOpen3DView: () => void;
  onExploreFloors: () => void;
}

export const SiteLayoutView: React.FC<SiteLayoutViewProps> = ({ onOpen3DView, onExploreFloors }) => {
  const [selectedZone, setSelectedZone] = useState<string>('dropoff');

  const zones: Record<string, { title: string; category: string; desc: string; specs: string[]; traffic: string }> = {
    dropoff: {
      title: 'Grand South Vehicular Portico & Drop-Off Roundabout',
      category: 'Guest Vehicular Egress',
      desc: 'Triple-lane covered vehicular entrance portico with heated granite paving, automated valet staging booths, and luggage concierge assistance.',
      specs: ['3 lanes (Taxi, Private Drop-off, Valet)', '18m covered canopy clearance', 'Zero-curb pedestrian crosswalks'],
      traffic: 'Up to 600 vehicles / hour during peak arrival',
    },
    fountain: {
      title: 'Pedestrian Arrival Plaza & Choreographed Fountain',
      category: 'Public Open Space',
      desc: '12,000 m² outdoor civic plaza paved in flamed charcoal granite. Anchored by an illuminated dancing water fountain and shade trees.',
      specs: ['120 submerged programmable water jets', 'Mature date palms with sub-surface drip irrigation', 'Continuous stone seating benches'],
      traffic: 'Accommodates up to 4,000 pedestrians simultaneously',
    },
    mall: {
      title: 'Main Mall Commercial Superstructure',
      category: 'Primary Building Footprint',
      desc: 'Eight-level architectural complex (B2 to L5) featuring double-glazed curtain walls, photovoltaic skylight crown, and central atrium core.',
      specs: ['180,000 m² Gross Floor Area (GFA)', '52m building height above grade', '4 primary public entrance vestibules'],
      traffic: 'Designed for 35,000+ daily visitors',
    },
    ramps: {
      title: 'Basement Parking Subterranean Ramps (B1 & B2)',
      category: 'Subterranean Access',
      desc: 'Dual spiral vehicle entry and exit ramps equipped with automatic license plate recognition (ALPR) and electronic bay vacancy signs.',
      specs: ['7.2m dual-lane width with 12% slope gradient', 'Sub-slab heating elements for winter anti-icing', 'Integrated carbon monoxide ventilation shafts'],
      traffic: 'Direct conduit to 1,850 underground parking bays',
    },
    service: {
      title: 'North Service Ring Road & Logistics Loading Docks',
      category: 'Heavy Logistics & Waste',
      desc: 'Segregated heavy vehicle corridor on the north perimeter. Accommodates 12 articulated semi-trailers simultaneously with hydraulic dock levelers.',
      specs: ['12 enclosed hydraulic dock bays', 'Contraband under-vehicle inspection scanner', 'Direct freight elevator access to all floors'],
      traffic: 'Strict operating window: 23:00 – 08:30 for heavy bulk deliveries',
    },
    gardens: {
      title: 'Botanical Gardens & Outdoor Dining Terraces',
      category: 'Landscape & Wellness',
      desc: 'Lush drought-tolerant landscape buffer featuring native flora, outdoor dining pergolas, illuminated walking pathways, and sculpture installations.',
      specs: ['100% irrigated via recycled rainwater harvesting', 'Bio-swale stormwater retention filtration basins', 'Zero light-pollution DarkSky certified fixtures'],
      traffic: 'Open to public guests from 07:00 AM to 11:30 PM',
    },
    emergency: {
      title: 'Emergency Vehicle Perimeter Access Ring',
      category: 'Fire & Life Safety',
      desc: 'Continuous 6-meter wide heavy-duty reinforced turf pavers capable of supporting 45-ton municipal aerial ladder fire trucks.',
      specs: ['6.0m clear roadway width', '10 bar high-pressure fire hydrants spaced every 60m', 'Direct emergency responder entrance portals'],
      traffic: 'Strictly restricted to emergency services and security patrols',
    },
  };

  const activeZone = zones[selectedZone] || zones.dropoff;

  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-[#0B192C] text-white p-8 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Map className="w-3.5 h-3.5" />
            Urban Masterplan & Site Circulation
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Site Layout & Masterplan
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Examine the macroscopic masterplan: seamless vehicular circulation, subterranean parking ramps, pedestrian arrival plazas, logistics freight docks, and emergency perimeters.
          </p>
        </div>
      </div>

      {/* Main Masterplan Interactive SVG + Zone Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive SVG Site Plan */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              SITE MASTERPLAN • TOP-DOWN SECTION
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpen3DView}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D View</span>
              </button>
            </div>
          </div>

          {/* SVG Site Plan */}
          <div className="relative w-full aspect-[16/10] bg-[#F1F5F9] rounded-2xl border border-slate-200 p-2 overflow-hidden shadow-inner">
            <svg viewBox="0 0 800 500" className="w-full h-full select-none">
              <defs>
                <pattern id="siteGrass" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#E2E8F0" />
                  <circle cx="5" cy="5" r="1.5" fill="#CBD5E1" />
                </pattern>
              </defs>

              {/* Entire Site Ground */}
              <rect x="10" y="10" width="780" height="480" rx="16" fill="url(#siteGrass)" stroke="#94A3B8" strokeWidth="2" />

              {/* Emergency Perimeter Road Ring */}
              <rect
                x="30"
                y="30"
                width="740"
                height="440"
                rx="24"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="28"
              />
              <rect
                x="30"
                y="30"
                width="740"
                height="440"
                rx="24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="8,6"
              />

              {/* North Service Road & Loading Dock */}
              <g
                onClick={() => setSelectedZone('service')}
                className="cursor-pointer group"
              >
                <rect
                  x="60"
                  y="45"
                  width="680"
                  height="45"
                  rx="6"
                  fill={selectedZone === 'service' ? '#334155' : '#475569'}
                  stroke={selectedZone === 'service' ? '#D4AF37' : '#1E293B'}
                  strokeWidth={selectedZone === 'service' ? 3 : 1}
                />
                <text x="400" y="72" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                  NORTH SERVICE ROAD & FREIGHT LOADING DOCKS (12 BAYS)
                </text>
              </g>

              {/* West Subterranean Parking Ramps */}
              <g
                onClick={() => setSelectedZone('ramps')}
                className="cursor-pointer group"
              >
                <rect
                  x="60"
                  y="110"
                  width="70"
                  height="260"
                  rx="8"
                  fill={selectedZone === 'ramps' ? '#0B192C' : '#64748B'}
                  stroke={selectedZone === 'ramps' ? '#D4AF37' : '#334155'}
                  strokeWidth={selectedZone === 'ramps' ? 3 : 1}
                />
                <text x="95" y="245" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" transform="rotate(-90 95 245)">
                  SUBTERRANEAN PARKING RAMPS (B1 / B2)
                </text>
              </g>

              {/* East Botanical Gardens */}
              <g
                onClick={() => setSelectedZone('gardens')}
                className="cursor-pointer group"
              >
                <rect
                  x="670"
                  y="110"
                  width="70"
                  height="260"
                  rx="8"
                  fill={selectedZone === 'gardens' ? '#15803D' : '#22C55E'}
                  stroke={selectedZone === 'gardens' ? '#D4AF37' : '#166534'}
                  strokeWidth={selectedZone === 'gardens' ? 3 : 1}
                  opacity="0.85"
                />
                <text x="705" y="245" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" transform="rotate(90 705 245)">
                  BOTANICAL GARDENS & AL FRESCO TERRACES
                </text>
              </g>

              {/* Main Mall Central Footprint */}
              <g
                onClick={() => setSelectedZone('mall')}
                className="cursor-pointer group"
              >
                <rect
                  x="150"
                  y="110"
                  width="500"
                  height="260"
                  rx="14"
                  fill={selectedZone === 'mall' ? '#0B192C' : '#1E293B'}
                  stroke={selectedZone === 'mall' ? '#D4AF37' : '#0F172A'}
                  strokeWidth={selectedZone === 'mall' ? 4 : 2}
                />
                <text x="400" y="225" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold" className="font-cinzel">
                  SMART MALL MAIN BUILDING
                </text>
                <text x="400" y="250" textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="600">
                  Levels B2, B1, G, L1, L2, L3, L4, L5 • 180,000 m²
                </text>
              </g>

              {/* South Pedestrian Arrival Plaza & Fountain */}
              <g
                onClick={() => setSelectedZone('fountain')}
                className="cursor-pointer group"
              >
                <rect
                  x="200"
                  y="385"
                  width="400"
                  height="50"
                  rx="8"
                  fill={selectedZone === 'fountain' ? '#0284C7' : '#38BDF8'}
                  stroke={selectedZone === 'fountain' ? '#D4AF37' : '#0369A1'}
                  strokeWidth={selectedZone === 'fountain' ? 3 : 1}
                />
                <circle cx="400" cy="410" r="16" fill="#0B192C" stroke="#D4AF37" strokeWidth="2" />
                <text x="400" y="414" textAnchor="middle" fill="#D4AF37" fontSize="10" fontWeight="bold">
                  FOUNTAIN
                </text>
              </g>

              {/* South Vehicular Drop-Off Roundabout */}
              <g
                onClick={() => setSelectedZone('dropoff')}
                className="cursor-pointer group"
              >
                <rect
                  x="120"
                  y="445"
                  width="560"
                  height="30"
                  rx="6"
                  fill={selectedZone === 'dropoff' ? '#D97706' : '#F59E0B'}
                  stroke={selectedZone === 'dropoff' ? '#D4AF37' : '#B45309'}
                  strokeWidth={selectedZone === 'dropoff' ? 3 : 1}
                />
                <text x="400" y="465" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">
                  GRAND SOUTH VEHICULAR DROP-OFF PORTICO & VALET
                </text>
              </g>

              {/* Compass Marker Top Right */}
              <g transform="translate(740, 50)">
                <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                <path d="M 0 -10 L 4 0 L 0 3 L -4 0 Z" fill="#EF4444" />
                <path d="M 0 10 L 4 0 L 0 -3 L -4 0 Z" fill="#94A3B8" />
                <text x="0" y="-12" textAnchor="middle" fill="#0B192C" fontSize="8" fontWeight="bold">
                  N
                </text>
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Click any labeled masterplan sector to review specifications</span>
            <span className="font-mono text-slate-400">Total Plot Area: 72,000 m²</span>
          </div>
        </div>

        {/* Right: Selected Zone Inspector Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {activeZone.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 font-cinzel">
                {activeZone.title}
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeZone.desc}
            </p>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                Key Engineering Parameters:
              </span>
              {activeZone.specs.map((sp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{sp}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
              <span className="font-semibold text-slate-900 block">Traffic & Flow Capacity:</span>
              <p className="text-slate-600 text-[11px]">{activeZone.traffic}</p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={onExploreFloors}
                className="py-2.5 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Floor Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpen3DView}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Model</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
