export interface InteriorAreaConcept {
  id: string;
  name: string;
  floorBadge: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  materialsPalette: { name: string; hex: string; role: string }[];
  lightingDesign: string;
  acousticTreatment: string;
  circulationDesign: string;
  dimensions: string;
}

export const INTERIOR_DESIGN_AREAS: InteriorAreaConcept[] = [
  {
    id: 'atrium',
    name: 'The Grand Central Atrium',
    floorBadge: 'Ground to Level 4 (Double-Height Void)',
    tagline: 'Monumental 22-meter sunlit vertical sanctuary anchoring pedestrian circulation.',
    description: 'Conceived as the civic living room of Smart Mall. Features soaring fluted columns clad in warm American walnut, a 3,400 m² structural glass lantern roof infusing diffuse natural light, and mirror-finished Calacatta gold terrazzo floors reflecting moving architectural shadows.',
    keyFeatures: [
      '22-meter soaring volume creating cross-floor sightlines to all luxury retail balconies',
      'Illuminated choreography water fountain with submerged warm 2700K brass nozzle fittings',
      'Continuous 17.52mm ultra-clear laminated glass balustrades with satin champagne gold top handrails',
      'Living vertical botanical green wall towers with automated misting and supplemental full-spectrum grow LEDs',
    ],
    materialsPalette: [
      { name: 'Calacatta Gold Terrazzo', hex: '#EAE6DF', role: 'Main flooring with mirror reflection' },
      { name: 'Champagne Gold Anodized Brass', hex: '#D4AF37', role: 'Balustrade cap, column inlays & trim' },
      { name: 'American Fluted Walnut', hex: '#5C4033', role: 'Acoustic slatted column cladding' },
      { name: 'Optiwhite Low-Iron Glass', hex: '#DCE7E9', role: 'Structural balustrade panels' },
    ],
    lightingDesign: 'Integrated concealed linear LED coves following floor curve profiles, complemented by 16 motorized programmable theatrical downlights for evening gala events.',
    acousticTreatment: 'Concealed micro-perforated wood veneer paneling on upper balcony soffits keeping reverberation time under 1.4 seconds even during peak crowds.',
    circulationDesign: 'Dual monumental glass-flanked central escalators providing theatrical ascension, backed by four high-speed panoramic scenic elevator tubes.',
    dimensions: '64m length × 42m width × 22m clear ceiling height',
  },
  {
    id: 'retail-concourses',
    name: 'High Fashion & Designer Promenades',
    floorBadge: 'Level 1 & Level 2',
    tagline: 'Refined rhythm of storefront glass, recessed portals, and intuitive wayfinding.',
    description: 'Designed to heighten the ritual of retail discovery. Generous 9-meter wide pedestrian concourses eliminate corridor crowding. Recessed shopfront entry portals give each brand a bespoke architectural frame while maintaining cohesive mall aesthetic continuity.',
    keyFeatures: [
      'Frameless 4.2-meter high floor-to-ceiling ultra-clear retail storefront glazing',
      'Integrated ceiling recessed track lighting busbars allowing tenants flexible accent focus',
      'Curved bronze reveals and recessed directional brass floor inlays for intuitive flow',
      'Comfortable banquette rest lounges equipped with USB-C wireless inductive charging pads',
    ],
    materialsPalette: [
      { name: 'Vitrified Greige Porcelain', hex: '#DDD8CE', role: 'Heavy commercial high-traffic flooring' },
      { name: 'Brushed Deep Bronze', hex: '#4A3B32', role: 'Storefront portals and reveal trim' },
      { name: 'Micro-Perforated White Metal', hex: '#F1F3F5', role: 'Acoustic baffle drop ceilings' },
      { name: 'Warm Oak Ribbing', hex: '#9C7A53', role: 'Rest bench surrounds' },
    ],
    lightingDesign: 'Dual-layer ambient lighting: continuous 3000K soft wash troffers combined with adjustable micro-aperture spotlights delivering 450 lux average concourse illumination.',
    acousticTreatment: 'Sound-dampening acoustic felt underlayment beneath porcelain tiles reduces heel impact noise by 18 dB.',
    circulationDesign: 'Gentle elliptical curvilinear pathways preventing "visual corridor fatigue" and naturally unveiling retail storefronts in progressive views.',
    dimensions: '9.2m average concourse width with 4.5m clear finished ceiling',
  },
  {
    id: 'food-court',
    name: 'The Grand Terrace Epicurean Hub',
    floorBadge: 'Level 3',
    tagline: 'Vibrant indoor-outdoor culinary theater with 1,200 seats and open flame kitchens.',
    description: 'Transforming mall dining into a memorable culinary social venue. Features distinct spatial micro-zones: bustling open live-kitchen market counters, intimate leather banquettes for couples, and expansive communal oak refectory tables bordering the outdoor garden terrace.',
    keyFeatures: [
      '24 bespoke tenant stall facades featuring glazed Moroccan zellige tiles and patinated steel hoods',
      'Sunlit garden dining terrace with retractable glazed pergola overlooking the city skyline',
      'Automated negative-pressure kitchen exhaust hoods preventing cooking odor migration into public mall zones',
      'Dedicated family dining pavilion with low-height toddler handwash basins and highchair docks',
    ],
    materialsPalette: [
      { name: 'Honed Basalt Stone', hex: '#2C302E', role: 'Spill-proof anti-slip stall apron' },
      { name: 'Terracotta Acoustic Baffles', hex: '#C86D51', role: 'Ceiling sound baffles and warmth' },
      { name: 'White Glazed Ceramic Zellige', hex: '#EBEBE6', role: 'Stall front tile cladding' },
      { name: 'Solid European Ash Wood', hex: '#D2B48C', role: 'Dining tables and bespoke joinery' },
    ],
    lightingDesign: 'Low-glare decorative brass pendant domes over seating clusters paired with dimmable perimeter warm wall grazers that transition from bright lunch to moody dinner bistro ambiance.',
    acousticTreatment: 'High-density mineral fiber acoustic ceiling baffles suspended in an undulating wave geometry maintaining conversational speech clarity.',
    circulationDesign: 'Tri-loop circulation allowing patrons to survey all 24 stall menus without crossing paths with tray-carrying departing diners.',
    dimensions: '7,800 m² total dining floor plate with 1,200 indoor seats and 280 outdoor terrace seats',
  },
  {
    id: 'cinema',
    name: 'Starlight Multiplex & VIP Cinema Lounge',
    floorBadge: 'Level 4',
    tagline: 'Immersive cinematic portal wrapped in sound-sculpted fabric and cosmic lighting.',
    description: 'An architectural transition into cinematic fantasy. Deep midnight navy acoustical felt walls, subtle constellations of fiber-optic ceiling star points, and floating illuminated portal arches leading to 12 state-of-the-art Laser IMAX and VIP recliner auditoriums.',
    keyFeatures: [
      'Double-stud drywall sound isolation walls achieving STC 68 rating between adjacent auditoriums',
      'Concession bar featuring back-lit backlit onyx stone counters and champagne gold tap handles',
      'VIP lounge with plush velvet armchair pods, private coat check, and pre-movie cocktail bar',
      'Recessed aisle glow-strip floor lighting meeting international theater egress safety codes',
    ],
    materialsPalette: [
      { name: 'Midnight Navy Acoustic Felt', hex: '#0B132B', role: 'Acoustic wall baffle upholstery' },
      { name: 'Backlit Honeycomb Onyx', hex: '#E3B263', role: 'VIP concession bar front' },
      { name: 'Plush Sound-Absorbing Carpet', hex: '#1C2541', role: 'Heavy density theater flooring' },
      { name: 'Black Anodized Aluminum', hex: '#1E1E24', role: 'Door surrounds and reveal channels' },
    ],
    lightingDesign: 'Total darkness discipline in auditoriums with soft 2200K amber low-level path lights; lobby features programmable RGBW ceiling light ribs that sync with movie premiere themes.',
    acousticTreatment: 'Calibrated reverberation time of 0.6 seconds in auditoriums using fiberglass core bass traps and diffusor wall panels.',
    circulationDesign: 'Unidirectional guest flow: central grand marquee entrance with separate dedicated exit corridors leading straight to parking elevators.',
    dimensions: '4,200 m² multiplex foot-print housing 12 auditoriums and 1,840 total seats',
  },
  {
    id: 'restrooms',
    name: 'Executive Restroom Suites & Powder Rooms',
    floorBadge: 'All Levels (G to L5)',
    tagline: 'Spa-inspired personal hospitality with 100% touchless hygienic luxury.',
    description: 'Elevating the mall restroom experience into an oasis of calm. Floor-to-ceiling solid oak privacy cubicles, full-height bookmatched marble vanities, recessed warm backlight halo mirrors, and integrated Dyson touchless hand-washing and drying faucets.',
    keyFeatures: [
      '100% touchless sensor-activated fixtures: faucets, soap dispensers, toilet flushes, and paper towels',
      'Full-height acoustic cubicle doors ensuring complete personal acoustic and visual privacy',
      'Dedicated family parent suites equipped with padded baby changing stations and nursing chairs',
      'Continuous 12 air-change-per-hour ventilation with active carbon odor neutralizers',
    ],
    materialsPalette: [
      { name: 'Nero Marquina Black Marble', hex: '#1C1D21', role: 'Floating vanity counter slab' },
      { name: 'Warm Cream Fluted Porcelain', hex: '#F2EFEB', role: 'Full-height wall cladding' },
      { name: 'Matte Black Stainless Steel', hex: '#2A2D34', role: 'Hardware and sensor faucets' },
      { name: 'Smoked Walnut Veneer', hex: '#4B382A', role: 'Floor-to-ceiling cubicle doors' },
    ],
    lightingDesign: 'Diffuse vertical vanity mirror side-glow lighting (CRI > 98) eliminating unflattering facial shadows, with soft indirect cove wash on ceilings.',
    acousticTreatment: 'Continuous low-frequency white-noise ambient water sound masking to ensure utmost user comfort and privacy.',
    circulationDesign: 'Baffle vestibule entry geometry that eliminates sightlines from main mall concourses without requiring swinging doors.',
    dimensions: '180 m² average per floor suite accommodating 14 cubicles, 8 urinals, and 2 accessible pods',
  },
  {
    id: 'parking',
    name: 'Subterranean Smart Parking Decks',
    floorBadge: 'Basement 1 & Basement 2',
    tagline: 'Bright, intuitive subterranean terminal with dynamic bay guidance and EV hubs.',
    description: 'Far from a dim underground garage, Smart Mall parking is designed with the clarity of a modern airport terminal. White high-reflectance ceilings, zone color-coded wayfinding columns, clear sightlines, and overhead ultrasonic LED sensors indicating available bays from 100 meters away.',
    keyFeatures: [
      'Overhead green/red/blue ultrasonic sensors over every single bay displaying real-time vacancy',
      '48 high-speed 350kW DC fast EV charging bays in Zone A with automated cable suspension',
      'Clearly demarcated raised pedestrian walkways with non-slip high-visibility safety stripes',
      '24/7 video analytics monitoring vehicle movements and parking ticket validation kiosks',
    ],
    materialsPalette: [
      { name: 'Epoxy Polyurethane Grey Deck', hex: '#6C757D', role: 'Tire-screech resistant floor' },
      { name: 'High-Reflectance Pure White Paint', hex: '#F8F9FA', role: 'Ceiling and beam finish (LRV 88%)' },
      { name: 'Zone Emerald Green Accent', hex: '#10B981', role: 'Zone A EV charging column graphics' },
      { name: 'Safety Yellow Thermoplastic', hex: '#FBBF24', role: 'Pedestrian crossings and bay lines' },
    ],
    lightingDesign: 'Continuous LED trunking delivering a crisp, high-visibility 180 lux average across drive lanes, with dynamic daylight sensors dimming lighting during quiet night hours.',
    acousticTreatment: 'Textured polyurethane floor topping dampens harsh tire squeal by over 75% compared to bare polished concrete.',
    circulationDesign: 'One-way 7-meter wide circulatory drive aisles with gentle spiral entry/exit ramps avoiding blind intersections.',
    dimensions: '60,500 m² dual-level garage footprint with 1,850 marked parking bays',
  },
  {
    id: 'offices',
    name: 'Executive Boardrooms & Administration Suites',
    floorBadge: 'Level 5 (Restricted)',
    tagline: 'Prestigious corporate environment overseeing entire retail property operations.',
    description: 'The administrative brain of Smart Mall. Features floor-to-ceiling panoramic glass walls looking out over the city skyline, soundproofed executive boardrooms with integrated video-conferencing, ergonomic collaborative workstations, and the mission-critical 24/7 Security Operations command bridge.',
    keyFeatures: [
      'Double-glazed acoustic glass office partitions with switchable smart privacy electrochromic glass',
      'Custom 24-seat conference boardroom table crafted from solid American walnut with flush power docks',
      'Elevated command console bridge with uninterrupted views of the 24/7 security video wall',
      'Dedicated executive catering pantry and quiet contemplation pods for staff wellness',
    ],
    materialsPalette: [
      { name: 'American Walnut Timber', hex: '#4A3525', role: 'Executive desks and millwork' },
      { name: 'Champagne Satin Metal Trim', hex: '#C5A059', role: 'Partition frame and door pulls' },
      { name: 'Acoustic Wool Weave Carpet', hex: '#374151', role: 'Sound-dampening office floor' },
      { name: 'Architectural Textured Glass', hex: '#D1D5DB', role: 'Meeting room privacy screens' },
    ],
    lightingDesign: 'Human-centric tunable white lighting (2700K - 5000K) that automatically syncs with outdoor circadian time of day to promote focus and reduce eye strain.',
    acousticTreatment: 'STC 52 rated partition assemblies and ceiling sound baffles ensuring boardroom confidentiality.',
    circulationDesign: 'Controlled biometric access zones separating executive offices, leasing client presentation suites, and security control bridge.',
    dimensions: '14,500 m² complete administration floor plate housing 220 staff workstations',
  },
];
