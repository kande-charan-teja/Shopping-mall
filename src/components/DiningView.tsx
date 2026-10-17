import React, { useState, useMemo } from 'react';
import { 
  UtensilsCrossed, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Coffee, 
  Sparkles, 
  Check, 
  HeartHandshake, 
  Layers, 
  ExternalLink 
} from 'lucide-react';
import { ShopUnit, FloorId } from '../types/mall';

interface DiningViewProps {
  shops: ShopUnit[];
  onLocateOnFloor: (floorId: FloorId, shopId: string) => void;
}

export const DiningView: React.FC<DiningViewProps> = ({ shops, onLocateOnFloor }) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('ALL');
  const [selectedDietary, setSelectedDietary] = useState<string>('ALL');
  const [selectedZone, setSelectedZone] = useState<string>('ALL');

  // Filter dining spots (Level 3 or Food categories)
  const diningSpots = useMemo(() => {
    return shops.filter(
      (s) =>
        s.category === 'Food Court & Dining' ||
        s.category === 'Café & Bakery' ||
        s.floorId === 'L3'
    );
  }, [shops]);

  const cuisines = useMemo(() => {
    const list = new Set<string>();
    diningSpots.forEach((d) => {
      if (d.cuisine) list.add(d.cuisine);
    });
    return ['ALL', ...Array.from(list)];
  }, [diningSpots]);

  const dietaryOptions = ['ALL', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-Free'];

  const filteredDining = useMemo(() => {
    return diningSpots.filter((d) => {
      const matchCuisine = selectedCuisine === 'ALL' || d.cuisine === selectedCuisine;
      const matchDietary =
        selectedDietary === 'ALL' ||
        (d.dietary && d.dietary.some((tag) => tag.toLowerCase().includes(selectedDietary.toLowerCase())));
      return matchCuisine && matchDietary;
    });
  }, [diningSpots, selectedCuisine, selectedDietary]);

  return (
    <div className="w-full space-y-8">
      {/* Hero Epicurean Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-950 via-[#0B192C] to-slate-900 text-white p-8 md:p-12 overflow-hidden shadow-xl border border-amber-900/40">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Gastronomy on Level 3 & Ground
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            The Grand Terrace Dining Hub
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Experience culinary masterclasses, 24 world street food counters, wood-fired artisan Italian pizzas, live Japanese teppanyaki theatre, and sunlit outdoor garden café terraces.
          </p>
        </div>
      </div>

      {/* Dining Zones Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: '1,200-Seat Atrium Court',
            desc: 'Expansive central sunlit dining surrounded by 24 international quick-service counters.',
            floor: 'Level 3 Center',
            badge: 'Food Court',
          },
          {
            title: 'Outdoor Garden Terrace',
            desc: 'Alfresco dining with panoramic city views and lush tropical landscaping.',
            floor: 'Level 3 South',
            badge: 'Alfresco',
          },
          {
            title: 'Signature Fine Dining',
            desc: 'Private dining rooms, sommelier wine cellars, and white-glove hospitality.',
            floor: 'Level 3 East',
            badge: 'Fine Dining',
          },
          {
            title: 'Artisan Café Colonnade',
            desc: 'Single-origin espresso, French viennoiserie, and Sicilian churned gelato.',
            floor: 'Ground & L3',
            badge: 'Cafés',
          },
        ].map((zone, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-amber-400 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                {zone.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">{zone.floor}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-cinzel">{zone.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{zone.desc}</p>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Cuisine Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-semibold text-slate-400 mr-1 whitespace-nowrap">Cuisine:</span>
            {cuisines.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCuisine === c
                    ? 'bg-[#0B192C] text-amber-400 font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Dietary Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-400 mr-1 whitespace-nowrap">Dietary:</span>
            {dietaryOptions.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDietary(d)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedDietary === d
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDining.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg border border-slate-200 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  {spot.unitNumber} • Floor {spot.floorId}
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{spot.rating.toFixed(1)}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1 font-cinzel">
                {spot.name}
              </h3>
              <p className="text-xs font-medium text-amber-700 mb-3">
                {spot.cuisine || spot.category}
              </p>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {spot.description}
              </p>

              {/* Dietary Badges */}
              {spot.dietary && spot.dietary.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {spot.dietary.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                    >
                      <Check className="w-2.5 h-2.5" />
                      {d}
                    </span>
                  ))}
                </div>
              )}

              {/* Details */}
              <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{spot.openingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{spot.phone}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onLocateOnFloor(spot.floorId, spot.id)}
              className="w-full py-2.5 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Locate on Level {spot.floorId} Map</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
