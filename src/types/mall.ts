export type FloorId = 'B2' | 'B1' | 'G' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export interface FloorInfo {
  id: FloorId;
  name: string;
  subtitle: string;
  levelNumber: number; // -2, -1, 0, 1, 2, 3, 4, 5
  areaSqM: number;
  description: string;
  accentColor: string;
  isRestricted?: boolean;
  facilities: string[];
}

export type StoreCategory =
  | 'Luxury Fashion'
  | 'Fashion & Apparel'
  | 'Footwear & Bags'
  | 'Cosmetics & Beauty'
  | 'Jewellery & Watches'
  | 'Electronics & Tech'
  | 'Home & Living'
  | 'Food Court & Dining'
  | 'Café & Bakery'
  | 'Entertainment & Cinema'
  | 'Supermarket & Essentials'
  | 'Services & Banking'
  | 'Administrative';

export interface ShopUnit {
  id: string;
  unitNumber: string;
  name: string;
  category: StoreCategory;
  floorId: FloorId;
  description: string;
  openingHours: string;
  phone: string;
  email?: string;
  website?: string;
  rating: number;
  isOpen: boolean;
  featured?: boolean;
  logoUrl?: string;
  brandColor?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  tags: string[];
  // SVG coordinates for interactive floor plan [x, y, width, height]
  mapBounds: { x: number; y: number; width: number; height: number };
  nearestEntrance: string;
  nearestElevator: string;
  directionsGuide: string;
  deals?: string[];
  cuisine?: string;
  dietary?: string[];
}

export interface AmenityPoint {
  id: string;
  name: string;
  type: 'elevator' | 'escalator' | 'restroom' | 'emergency-exit' | 'info-desk' | 'atm' | 'first-aid' | 'ev-charger' | 'parking-pay';
  floorId: FloorId;
  x: number;
  y: number;
  description: string;
}

export interface MaterialItem {
  id: string;
  category: string;
  name: string;
  application: string;
  finish: string;
  advantages: string[];
  maintenance: string;
  unit: string;
  indicativeCostPerUnit: number;
  estimatedQuantity: number;
  ecoRating?: 'A+' | 'A' | 'B' | 'Certified';
  fireRating?: string;
  acousticRating?: string;
}

export interface StaffRole {
  id: string;
  title: string;
  department: string;
  responsibilities: string[];
  qualifications: string;
  reportingManager: string;
  shift: string;
  headcountNeeded: number;
  currentStaffed: number;
  trainingRequirements: string;
  contactEmail: string;
}

export interface MaintenanceTicket {
  id: string;
  floorId: FloorId;
  location: string;
  category: 'Electrical' | 'HVAC' | 'Plumbing' | 'Civil / Structural' | 'Elevator / Escalator' | 'Housekeeping' | 'Fire Safety';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  reportedAt: string;
  assignedTo: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

export interface ParkingSlot {
  id: string;
  floorId: 'B1' | 'B2';
  zone: 'A' | 'B' | 'C' | 'D';
  number: string;
  type: 'Regular' | 'Accessible' | 'EV Charging' | 'Two-Wheeler' | 'Loading Dock';
  isOccupied: boolean;
  evRateKw?: number;
}

export interface MallEvent {
  id: string;
  title: string;
  category: 'Fashion' | 'Culinary' | 'Entertainment' | 'Holiday' | 'Kids' | 'Sale';
  date: string;
  time: string;
  location: string;
  description: string;
  highlightBadge: string;
  imageUrl: string;
  rsvpCount: number;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  experienceLevel: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface CostCategoryItem {
  id: string;
  category: string;
  description: string;
  unit: string;
  quantity: number;
  unitRate: number;
  notes: string;
}
