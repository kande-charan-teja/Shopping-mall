import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Wrench, 
  Car, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Edit3, 
  Lock, 
  Unlock, 
  Filter, 
  ArrowUpRight, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { ShopUnit, MaintenanceTicket, ParkingSlot, FloorId } from '../types/mall';
import { INITIAL_MAINTENANCE_TICKETS, INITIAL_PARKING_SLOTS, LIVE_OPERATIONS_METRICS } from '../data/operationsData';

interface OperationsDashboardProps {
  shops: ShopUnit[];
  onAddShop?: (newShop: ShopUnit) => void;
  onUpdateShop?: (updatedShop: ShopUnit) => void;
}

type UserRole = 'Administrator' | 'Facility Manager' | 'Retail Leasing' | 'Security Officer';

export const OperationsDashboard: React.FC<OperationsDashboardProps> = ({ shops }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('Administrator');
  const [activeTab, setActiveTab] = useState<'kpis' | 'tenants' | 'maintenance' | 'parking' | 'energy'>('kpis');
  
  // Local state for tickets and parking slots
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_MAINTENANCE_TICKETS);
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>(INITIAL_PARKING_SLOTS);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicketLoc, setNewTicketLoc] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketCat, setNewTicketCat] = useState<'Electrical' | 'HVAC' | 'Plumbing' | 'Civil / Structural' | 'Elevator / Escalator' | 'Housekeeping' | 'Fire Safety'>('HVAC');
  const [newTicketFloor, setNewTicketFloor] = useState<FloorId>('G');

  const handleToggleTicketStatus = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Open' ? 'In Progress' : t.status === 'In Progress' ? 'Resolved' : 'Open';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketLoc || !newTicketDesc) return;
    const newEntry: MaintenanceTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      floorId: newTicketFloor,
      location: newTicketLoc,
      category: newTicketCat,
      priority: 'High',
      description: newTicketDesc,
      reportedAt: 'Just now',
      assignedTo: 'Assigned on Dispatch',
      status: 'Open',
    };
    setTickets([newEntry, ...tickets]);
    setNewTicketLoc('');
    setNewTicketDesc('');
    setIsNewTicketOpen(false);
  };

  const handleToggleParking = (slotId: string) => {
    setParkingSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, isOccupied: !s.isOccupied } : s))
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Admin Security Strip */}
      <div className="bg-[#0B192C] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-slate-950 uppercase">
              Secure Operations Bridge
            </span>
            <span className="text-xs text-slate-400 font-mono">BMS v4.8 • Level 5 Command</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-cinzel">
            Integrated Mall Management Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Centralized telemetry for retail lease occupancy, work orders, smart EV parking, and chilled water central plant.
          </p>
        </div>

        {/* Role-Based Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700/80">
          <span className="text-xs text-slate-400 font-medium px-2 hidden sm:inline">Acting Role:</span>
          {(['Administrator', 'Facility Manager', 'Retail Leasing', 'Security Officer'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setCurrentRole(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentRole === r
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'kpis', label: 'Executive KPIs & Overview', icon: LayoutDashboard },
          { id: 'tenants', label: 'Store Lease Management', icon: Store },
          { id: 'maintenance', label: `Work Orders (${tickets.filter((t) => t.status !== 'Resolved').length} Open)`, icon: Wrench },
          { id: 'parking', label: 'Parking & EV Bays', icon: Car },
          { id: 'energy', label: 'Energy & BMS Automation', icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#0B192C] text-amber-400 shadow-md ring-2 ring-amber-500/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE KPIS */}
      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Retail Occupancy Rate
              </span>
              <div className="text-3xl font-bold text-slate-900 font-cinzel">
                {LIVE_OPERATIONS_METRICS.retailOccupancyRate}%
              </div>
              <p className="text-xs text-emerald-600 font-medium">34 of 35 primary units leased</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Today's Footfall Count
              </span>
              <div className="text-3xl font-bold text-slate-900 font-cinzel">
                {LIVE_OPERATIONS_METRICS.currentFootfallToday.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">Peak hour: {LIVE_OPERATIONS_METRICS.peakOccupancyTime}</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Parking Bay Utilization
              </span>
              <div className="text-3xl font-bold text-slate-900 font-cinzel">
                {LIVE_OPERATIONS_METRICS.parkingOccupancyPercent}%
              </div>
              <p className="text-xs text-slate-500">1,420 of 1,850 bays occupied</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Open Maintenance Tasks
              </span>
              <div className="text-3xl font-bold text-amber-600 font-cinzel">
                {tickets.filter((t) => t.status !== 'Resolved').length}
              </div>
              <p className="text-xs text-slate-500">
                {tickets.filter((t) => t.priority === 'Critical').length} critical priority
              </p>
            </div>
          </div>

          {/* Quick Status Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-cinzel">Recent Critical Dispatches</h3>
              <div className="space-y-3">
                {tickets.slice(0, 3).map((t) => (
                  <div key={t.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                          {t.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">{t.location}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{t.description}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                      t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-cinzel">Subsystem Health Status</h3>
              <div className="space-y-3 text-xs">
                {[
                  { name: '11kV Electrical Transformers', status: 'Optimal (100% Load Balance)', ok: true },
                  { name: 'Central Chiller Plant (4 Units)', status: 'Optimal COP 6.42', ok: true },
                  { name: 'VESDA Laser Aspirating Fire Alarms', status: 'Online & Certified Normal', ok: true },
                  { name: '48x Level-3 EV Fast Chargers', status: '1 Bay Communication Glitch', ok: false },
                  { name: 'Vertical Elevators (28 units)', status: 'All Cars Operational', ok: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-medium text-slate-800">{item.name}</span>
                    <span className={`font-semibold flex items-center gap-1.5 ${item.ok ? 'text-emerald-700' : 'text-amber-700'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STORE LEASE MANAGEMENT */}
      {activeTab === 'tenants' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-cinzel">Retail Store Leases</h3>
              <p className="text-xs text-slate-500">Manage tenant lease status and store directory listings</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Brand Tenant</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Floor</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shops.map((shop) => (
                  <tr key={shop.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{shop.unitNumber}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{shop.name}</td>
                    <td className="py-3 px-4 text-slate-600">{shop.category}</td>
                    <td className="py-3 px-4 font-mono text-amber-700 font-semibold">Level {shop.floorId}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Active Lease
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => alert(`Editing lease terms for ${shop.name} (${shop.unitNumber})`)}
                        className="text-amber-700 font-semibold hover:underline"
                      >
                        Edit Lease
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WORK ORDERS / MAINTENANCE */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-cinzel">Maintenance & Inspection Work Orders</h3>
              <p className="text-xs text-slate-500">Live ticket queue dispatched across MEP, civil, electrical, and housekeeping</p>
            </div>
            <button
              onClick={() => setIsNewTicketOpen(!isNewTicketOpen)}
              className="px-4 py-2 rounded-xl bg-[#0B192C] text-amber-400 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Log Work Order</span>
            </button>
          </div>

          {/* New Ticket Drawer */}
          {isNewTicketOpen && (
            <form onSubmit={handleCreateTicket} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 animate-fade-in text-xs">
              <h4 className="font-bold text-slate-900 font-cinzel text-sm">New Maintenance Request</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Floor</label>
                  <select
                    value={newTicketFloor}
                    onChange={(e) => setNewTicketFloor(e.target.value as FloorId)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    {['G', 'L1', 'L2', 'L3', 'L4', 'L5', 'B1', 'B2'].map((f) => (
                      <option key={f} value={f}>Floor {f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTicketCat}
                    onChange={(e) => setNewTicketCat(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    {['HVAC', 'Electrical', 'Plumbing', 'Civil / Structural', 'Elevator / Escalator', 'Fire Safety', 'Housekeeping'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location Details</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. West Escalator Comb Plate"
                    value={newTicketLoc}
                    onChange={(e) => setNewTicketLoc(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issue Description</label>
                <input
                  type="text"
                  required
                  placeholder="Describe sensor trip, leak, or inspection note..."
                  value={newTicketDesc}
                  onChange={(e) => setNewTicketDesc(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0B192C] text-amber-400 rounded-lg font-semibold"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          )}

          {/* Tickets List */}
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      {t.id}
                    </span>
                    <span className="font-mono text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Level {t.floorId}
                    </span>
                    <span className="text-xs font-semibold text-slate-900">{t.location}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                      t.priority === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{t.description}</p>
                  <div className="text-[11px] text-slate-400">
                    Reported {t.reportedAt} • Assigned to: <strong>{t.assignedTo}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleToggleTicketStatus(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                      t.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : t.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Status: {t.status} ↻
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PARKING & EV BAYS */}
      {activeTab === 'parking' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-cinzel">Basement 1 Smart Parking Deck</h3>
              <p className="text-xs text-slate-500">Live ultrasonic bay occupancy sensors. Click any bay to simulate vehicle arrival/departure.</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
              1,420 / 1,850 Total Occupied
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {parkingSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => handleToggleParking(slot.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
                  slot.isOccupied
                    ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
                    : 'bg-emerald-50 text-slate-800 border-emerald-300 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
                  <span>Bay {slot.number}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${slot.isOccupied ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                </div>
                <div className="text-[10px] text-slate-400 font-medium">{slot.type}</div>
                <div className="text-[11px] font-bold mt-2">
                  {slot.isOccupied ? (
                    <span className="text-rose-400">Occupied</span>
                  ) : (
                    <span className="text-emerald-700">Available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ENERGY & BMS AUTOMATION */}
      {activeTab === 'energy' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 font-cinzel">Central Energy & Chiller Telemetry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 font-mono">Chilled Water Plant</span>
              <div className="text-2xl font-bold font-mono text-slate-900">
                Supply: {LIVE_OPERATIONS_METRICS.chilledWaterSupplyTemp}°C
              </div>
              <p className="text-xs text-slate-600">4x 2,500-ton centrifugal magnetic chillers online</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 font-mono">Total Complex Energy Draw</span>
              <div className="text-2xl font-bold font-mono text-slate-900">
                {LIVE_OPERATIONS_METRICS.totalBuildingEnergyDrawKw.toLocaleString()} kW
              </div>
              <p className="text-xs text-slate-600">Peak demand shaving active via battery storage</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs text-slate-500 font-mono">Real-time Solar Generation</span>
              <div className="text-2xl font-bold font-mono text-amber-600">
                {LIVE_OPERATIONS_METRICS.solarInstantKw} kW Instantaneous
              </div>
              <p className="text-xs text-slate-600">1.2 MWp rooftop monocrystalline array</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
