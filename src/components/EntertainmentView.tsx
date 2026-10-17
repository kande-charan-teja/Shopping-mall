import React, { useState } from 'react';
import { 
  Film, 
  Gamepad2, 
  Sparkles, 
  Clock, 
  Calendar, 
  MapPin, 
  Trophy, 
  Tv, 
  Users, 
  ShieldCheck, 
  Ticket 
} from 'lucide-react';
import { FloorId } from '../types/mall';

interface EntertainmentViewProps {
  onLocateOnFloor: (floorId: FloorId, shopId: string) => void;
}

export const EntertainmentView: React.FC<EntertainmentViewProps> = ({ onLocateOnFloor }) => {
  const [activeTab, setActiveTab] = useState<'cinema' | 'gaming' | 'bowling' | 'kids'>('cinema');

  const movieShowtimes = [
    {
      title: 'Cosmic Horizons: The Frontier IMAX 4K',
      format: 'IMAX 4K Laser • Dolby Atmos 12-Channel',
      duration: '168 mins',
      rating: 'PG-13',
      times: ['12:30 PM', '03:45 PM', '07:15 PM', '10:30 PM'],
      synopsis: 'An interstellar voyage beyond known galaxies featuring stunning architectural cosmic visualization in native 70mm IMAX format.',
      hall: 'Auditorium 1 (IMAX Giant Screen)',
    },
    {
      title: 'Architects of Venice: A Secret History',
      format: 'VIP Director’s Lounge 4K',
      duration: '115 mins',
      rating: 'PG',
      times: ['01:15 PM', '04:30 PM', '08:00 PM'],
      synopsis: 'A mesmerizing visual journey into Italian Renaissance marble quarrying, palazzo facades, and subterranean canal engineering.',
      hall: 'VIP Recliner Suite 4',
    },
    {
      title: 'Neon Velocity: Cyber Circuit 2099',
      format: '4DX Dynamic Motion Seats',
      duration: '135 mins',
      rating: 'PG-13',
      times: ['02:00 PM', '05:15 PM', '08:45 PM', '11:15 PM'],
      synopsis: 'High-octane futuristic hyper-car racing thriller with wind, atmospheric scents, and hydraulic motion feedback.',
      hall: 'Auditorium 6 (4DX Sensory)',
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-950 via-[#0B192C] to-slate-950 text-white p-8 md:p-12 overflow-hidden shadow-xl border border-purple-900/40">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Level 4 Leisure Kingdom
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Entertainment & Cinema Sanctuary
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Immerse yourself in our 12-Screen Laser IMAX Multiplex, 20,000 sq.ft CyberVerse VR Gaming Arena, boutique 16-lane VIP bowling lounge, and safe toddler play wonderland.
          </p>
        </div>
      </div>

      {/* Entertainment Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'cinema', label: 'Starlight IMAX Multiplex', icon: Film },
          { id: 'gaming', label: 'CyberVerse VR & Arcade', icon: Gamepad2 },
          { id: 'bowling', label: 'The Strike Club Bowling', icon: Trophy },
          { id: 'kids', label: 'Cloud9 Kids Kingdom', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#0B192C] text-amber-400 shadow-md ring-2 ring-amber-500/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Cinema Multiplex */}
      {activeTab === 'cinema' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Unit L4-501 • Level 4
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1 font-cinzel">
                Starlight Laser IMAX Multiplex (12 Screens)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Featuring motorized leather zero-gravity recliners, in-seat chef service, and 4K RGB pure laser projection.
              </p>
            </div>
            <button
              onClick={() => onLocateOnFloor('L4', 'l4-01')}
              className="px-4 py-2.5 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MapPin className="w-4 h-4" />
              <span>Locate on Level 4 Map</span>
            </button>
          </div>

          {/* Now Showing Schedule */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-cinzel">Now Showing Today</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {movieShowtimes.map((movie, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        {movie.rating}
                      </span>
                      <span className="text-xs text-slate-400">{movie.duration}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 font-cinzel">{movie.title}</h4>
                    <p className="text-xs font-semibold text-amber-700">{movie.format}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{movie.synopsis}</p>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      Hall: <strong>{movie.hall}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-500 block mb-2 font-medium">Available Showtimes:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {movie.times.map((t) => (
                        <button
                          key={t}
                          onClick={() => alert(`Seat reservation modal for "${movie.title}" at ${t}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-amber-400 hover:text-slate-950 border border-slate-200 text-xs font-mono font-semibold text-slate-700 transition-colors text-center"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CyberVerse VR & Arcade */}
      {activeTab === 'gaming' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-purple-900/60 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
                Unit L4-502 • Level 4 Center
              </span>
              <h2 className="text-3xl font-bold font-cinzel">CyberVerse VR & Esports Arena</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Step inside 20,000 sq.ft of untethered virtual reality action. Compete in 8-player tactical shooter arenas, experience high-G hydraulic Formula-1 racing simulators, and collect digital redemption prizes.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
                <span>✓ 40+ VR Battle Pods</span>
                <span>✓ 120 Japanese Rhythm Arcades</span>
                <span>✓ Esports Tournament Stage</span>
              </div>
              <button
                onClick={() => onLocateOnFloor('L4', 'l4-02')}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Locate CyberVerse on Map</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bowling Lounge */}
      {activeTab === 'bowling' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 font-mono text-xs font-bold border border-amber-200">
              Unit L4-503 • Level 4 East
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-cinzel">
              The Strike Club VIP Bowling Lounge
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              16 professional Brunswick regulation tenpin bowling lanes featuring ambient ultraviolet lane projection, vintage leather chesterfield banquettes, and lane-side craft mocktail service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Open Play Bowling</h4>
                <p className="text-xs text-slate-500 mt-1">$12 per game / person (Shoe rental included)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">VIP Suite Reservation</h4>
                <p className="text-xs text-slate-500 mt-1">4 private lanes + luxury lounge + dedicated host</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Glow Cosmic Nights</h4>
                <p className="text-xs text-slate-500 mt-1">Every Friday & Saturday from 08:00 PM onwards</p>
              </div>
            </div>
            <button
              onClick={() => onLocateOnFloor('L4', 'l4-03')}
              className="px-4 py-2.5 rounded-xl bg-[#0B192C] text-amber-400 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Locate Bowling on Map</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Kids Kingdom */}
      {activeTab === 'kids' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-200">
              Unit L4-504 • Level 4 South
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-cinzel">
              Cloud9 Kids Soft-Play & Sensory Kingdom
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              A multi-level soft play universe crafted for children ages 1 to 10. Equipped with antimicrobial foam padded play modules, zero-gravity foam pits, parent viewing lounges, and certified pediatric first-aid marshals.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" /> Biometric child & parent safety matching
              </span>
              <span>•</span>
              <span>Sanitized daily with hospital-grade UVGI</span>
            </div>
            <button
              onClick={() => onLocateOnFloor('L4', 'l4-04')}
              className="px-4 py-2.5 rounded-xl bg-[#0B192C] text-amber-400 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Locate Kids Kingdom on Map</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
