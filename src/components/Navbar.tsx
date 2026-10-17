import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ChevronDown 
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home' },
    { id: '3d-tour', label: '3D Virtual Tour' },
    { id: 'floors', label: 'Floor Directory' },
    { id: 'shops', label: 'Shops & Brands' },
    { id: 'dining', label: 'Restaurants' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'materials', label: 'Materials' },
    { id: 'interior', label: 'Interior Design' },
    { id: 'site-layout', label: 'Site Layout' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'staff', label: 'Staff & Careers' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const languages = ['EN', 'FR', 'AR', 'DE', 'ES'];

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Architectural Brand */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B192C] rounded-[14px] flex items-center justify-center text-amber-400">
                <Building2 className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-widest text-white font-cinzel">
                  SMART MALL
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                  BIM 3D
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
                Architectural Design & Operations
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
            {mainNavItems.slice(0, 8).map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  currentTab === item.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Dropdown for More Categories */}
            <div className="relative group">
              <button className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center gap-1">
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 hidden group-hover:block animate-fade-in">
                {mainNavItems.slice(8).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      currentTab === item.id
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions: Search, Language, Operations Portal */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-2 text-xs"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                /
              </kbd>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1.5 text-xs font-mono font-semibold"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLanguage}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-28 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-fade-in">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                        currentLanguage === lang
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Operations Portal Button */}
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                currentTab === 'dashboard'
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Operations</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl xl:hidden bg-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden pb-6 pt-2 border-t border-slate-800 space-y-1">
            <div className="grid grid-cols-2 gap-1.5 pt-2">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2.5 text-left rounded-xl text-xs font-semibold transition-all ${
                    currentTab === item.id
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
