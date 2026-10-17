import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  Heart,
  Sparkles 
} from 'lucide-react';

interface FooterProps {
  onSelectTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-widest text-white font-cinzel">
                SMART MALL
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A monumental benchmark in contemporary commercial architecture and high-efficiency building operations. Integrating eight levels of luxury retail, Michelin-guided gastronomy, IMAX leisure, and sustainable smart infrastructure.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Smart Mall Boulevard, Grand Atrium Gateway, Suite 100</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Concierge: +1 (800) 555-MALL • Security: +1 (800) 555-0911</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Retail: 10:00 AM – 10:00 PM • Cinema & Parking: Open 24/7</span>
              </div>
            </div>
          </div>

          {/* Column 1: Explore & Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Explore & Spaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('3d-tour')} className="hover:text-amber-400 transition-colors">
                  3D Virtual Tour
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('floors')} className="hover:text-amber-400 transition-colors">
                  Interactive Floor Directory
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('shops')} className="hover:text-amber-400 transition-colors">
                  Shops & Brand Directory
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dining')} className="hover:text-amber-400 transition-colors">
                  Restaurants & Food Court
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('entertainment')} className="hover:text-amber-400 transition-colors">
                  Multiplex Cinema & VR
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Architecture & Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Architecture & BIM
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('materials')} className="hover:text-amber-400 transition-colors">
                  Materials & Finishes Library
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('interior')} className="hover:text-amber-400 transition-colors">
                  Interior Design Concepts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('site-layout')} className="hover:text-amber-400 transition-colors">
                  Site Layout Masterplan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('estimator')} className="hover:text-amber-400 transition-colors">
                  Construction Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sustainability')} className="hover:text-amber-400 transition-colors">
                  Sustainability & Solar Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Management & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Management & Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('dashboard')} className="hover:text-amber-400 transition-colors">
                  Operations Command Portal
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('staff')} className="hover:text-amber-400 transition-colors">
                  Staff Directory & Shifts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('staff')} className="hover:text-amber-400 transition-colors">
                  Careers & Job Openings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('contact')} className="hover:text-amber-400 transition-colors">
                  Retail Leasing Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('contact')} className="hover:text-amber-400 transition-colors">
                  Guest Services & Lost Item
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Architectural Disclaimer Notice */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Architectural & Engineering Disclaimer:</strong> SMART MALL represents a conceptual commercial real estate and smart building design showcase. All floor layouts, 3D visualizations, material costs, construction budgets, and tenant brand names are illustrative design models created for prototyping and architectural presentation. Structural, electrical, MEP, and life-safety specifications must be certified by qualified licensed architects and professional engineers prior to physical implementation.
          </p>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} SMART MALL Architecture & Property Management. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-300 cursor-pointer">LEED Scorecard</span>
            <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
