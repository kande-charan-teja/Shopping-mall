import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Building2, 
  Layers, 
  Sun, 
  Moon, 
  Sunrise, 
  RotateCcw, 
  Eye, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Maximize2,
  Info,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { FloorId } from '../types/mall';

interface ThreeMallViewerProps {
  onSelectFloor?: (floorId: FloorId) => void;
  initialFloorId?: FloorId;
}

type LightingPreset = 'day' | 'sunset' | 'night';
type CameraViewPreset = 'facade' | 'aerial' | 'atrium' | 'terrace' | 'parking' | 'exploded';

export const ThreeMallViewer: React.FC<ThreeMallViewerProps> = ({ onSelectFloor, initialFloorId }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Interactive Controls State
  const [explodeFactor, setExplodeFactor] = useState<number>(0);
  const [selectedFloor, setSelectedFloor] = useState<FloorId | 'ALL'>('ALL');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('day');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [viewMode2D, setViewMode2D] = useState<boolean>(false);
  const [hoveredFloorInfo, setHoveredFloorInfo] = useState<{ id: FloorId; name: string; dept: string } | null>(null);

  // References to communicate with ThreeJS render loop without resetting canvas
  const stateRef = useRef({
    explodeFactor: 0,
    selectedFloor: 'ALL' as FloorId | 'ALL',
    lightingPreset: 'day' as LightingPreset,
    isAutoRotate: true,
  });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current.explodeFactor = explodeFactor;
    stateRef.current.selectedFloor = selectedFloor;
    stateRef.current.lightingPreset = lightingPreset;
    stateRef.current.isAutoRotate = isAutoRotate;
  }, [explodeFactor, selectedFloor, lightingPreset, isAutoRotate]);

  const cameraPresetTargetRef = useRef<{ pos: THREE.Vector3; lookAt: THREE.Vector3 } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(lightingPreset === 'night' ? 0x050c18 : 0xf1f5f9);
    scene.fog = new THREE.FogExp2(
      lightingPreset === 'night' ? 0x050c18 : 0xf1f5f9,
      0.008
    );

    // CAMERA
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 500);
    camera.position.set(55, 38, 65);

    // RENDERER
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below ground
    controls.minDistance = 15;
    controls.maxDistance = 180;
    controls.target.set(0, 10, 0);

    // PROCEDURAL STUDIO ENVIRONMENT (RoomEnvironment PMREM)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // PROCEDURAL TEXTURE GENERATOR HELPERS
    const createMarbleTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 512;
      const ctx = cvs.getContext('2d')!;
      ctx.fillStyle = '#EDEAE3';
      ctx.fillRect(0, 0, 512, 512);

      // Gold & grey veins
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 9; i++) {
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(212, 175, 55, 0.28)' : 'rgba(120, 120, 130, 0.22)';
        ctx.beginPath();
        let x = Math.random() * 512;
        let y = 0;
        ctx.moveTo(x, y);
        while (y < 512) {
          x += (Math.random() - 0.48) * 45;
          y += Math.random() * 55 + 20;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Tile grid seams
      ctx.strokeStyle = 'rgba(180, 170, 160, 0.4)';
      ctx.lineWidth = 1;
      for (let p = 0; p <= 512; p += 64) {
        ctx.beginPath();
        ctx.moveTo(p, 0); ctx.lineTo(p, 512);
        ctx.moveTo(0, p); ctx.lineTo(512, p);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(cvs);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    const createSolarPanelTexture = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 256;
      cvs.height = 256;
      const ctx = cvs.getContext('2d')!;
      ctx.fillStyle = '#081c3b';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 2;
      for (let x = 0; x <= 256; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
      }
      for (let y = 0; y <= 256; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.8;
      for (let x = 8; x <= 256; x += 16) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
      }
      const texture = new THREE.CanvasTexture(cvs);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(6, 6);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const marbleTexture = createMarbleTexture();
    const solarTexture = createSolarPanelTexture();

    // SHARED MATERIALS
    const materials = {
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xc8e6f0,
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.08,
        ior: 1.52,
        reflectivity: 0.6,
        depthWrite: false,
      }),
      champagneMetal: new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.85,
        roughness: 0.25,
      }),
      darkSteel: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.7,
        roughness: 0.35,
      }),
      concretePlaza: new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.8,
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.1,
        metalness: 0.3,
      }),
      grass: new THREE.MeshStandardMaterial({
        color: 0x2e7d32,
        roughness: 0.9,
      }),
      marbleFloor: new THREE.MeshStandardMaterial({
        map: marbleTexture,
        roughness: 0.22,
        metalness: 0.1,
      }),
      storeGlow: new THREE.MeshStandardMaterial({
        color: 0xfff4d6,
        emissive: 0xffdb8b,
        emissiveIntensity: 0.6,
        roughness: 0.5,
      }),
      cinemaBlack: new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.4,
      }),
      solar: new THREE.MeshStandardMaterial({
        map: solarTexture,
        roughness: 0.2,
        metalness: 0.6,
      }),
      subterranean: new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.7,
      }),
    };

    // LIGHTING RIG
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcfd8dc, 0.8);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
    sunLight.position.set(45, 65, 40);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 180;
    const d = 50;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xd9e4ec, 0.6);
    fillLight.position.set(-40, 30, -35);
    scene.add(fillLight);

    // Warm Atrium Interior Core Light
    const atriumPointLight = new THREE.PointLight(0xffd27d, 2.5, 45, 1.2);
    atriumPointLight.position.set(0, 12, 0);
    scene.add(atriumPointLight);

    // HIERARCHY ROOT
    const mallBuildingGroup = new THREE.Group();
    scene.add(mallBuildingGroup);

    // GROUND SITE & ENVIRONMENT
    const groundSiteGroup = new THREE.Group();
    // Plaza main base
    const siteGeometry = new THREE.CylinderGeometry(52, 54, 1.5, 48);
    const siteMesh = new THREE.Mesh(siteGeometry, materials.concretePlaza);
    siteMesh.position.y = -0.75;
    siteMesh.receiveShadow = true;
    groundSiteGroup.add(siteMesh);

    // Surrounding Green Lawn Ring
    const lawnGeom = new THREE.RingGeometry(36, 51.5, 48);
    const lawnMesh = new THREE.Mesh(lawnGeom, materials.grass);
    lawnMesh.rotation.x = -Math.PI / 2;
    lawnMesh.position.y = 0.02;
    lawnMesh.receiveShadow = true;
    groundSiteGroup.add(lawnMesh);

    // Front Dancing Water Fountain
    const fountainBasinGeom = new THREE.CylinderGeometry(6, 6.5, 0.6, 32);
    const fountainBasin = new THREE.Mesh(fountainBasinGeom, materials.champagneMetal);
    fountainBasin.position.set(0, 0.3, 27);
    fountainBasin.receiveShadow = true;
    groundSiteGroup.add(fountainBasin);

    const waterGeom = new THREE.CylinderGeometry(5.6, 5.6, 0.4, 32);
    const waterMesh = new THREE.Mesh(waterGeom, materials.water);
    waterMesh.position.set(0, 0.45, 27);
    groundSiteGroup.add(waterMesh);

    // Fountain Water Jets (procedural animated jets)
    const jetGroup = new THREE.Group();
    for (let j = 0; j < 8; j++) {
      const angle = (j / 8) * Math.PI * 2;
      const jetCone = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 2.2, 8),
        new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.75 })
      );
      jetCone.position.set(Math.cos(angle) * 3.5, 1.2, Math.sin(angle) * 3.5);
      jetGroup.add(jetCone);
    }
    const centerJet = new THREE.Mesh(
      new THREE.ConeGeometry(0.35, 3.8, 8),
      new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.85 })
    );
    centerJet.position.set(0, 2.0, 0);
    jetGroup.add(centerJet);
    jetGroup.position.set(0, 0.4, 27);
    groundSiteGroup.add(jetGroup);

    // Procedural Landscape Trees (Trunk + Foliage Group)
    const treePositions = [
      [-22, 26], [22, 26], [-28, 16], [28, 16],
      [-32, -5], [32, -5], [-26, -24], [26, -24],
      [-12, 34], [12, 34]
    ];
    treePositions.forEach(([tx, tz]) => {
      const treeGroup = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.45, 2.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 })
      );
      trunk.position.y = 1.25;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const foliage = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.8, 1),
        new THREE.MeshStandardMaterial({ color: 0x235328, roughness: 0.8 })
      );
      foliage.position.y = 3.2;
      foliage.castShadow = true;
      foliage.scale.set(1, 1.25, 1);
      treeGroup.add(foliage);

      treeGroup.position.set(tx, 0, tz);
      groundSiteGroup.add(treeGroup);
    });

    // Subterranean Parking Vehicle Access Ramp
    const rampGeom = new THREE.BoxGeometry(7, 1.2, 14);
    const rampMesh = new THREE.Mesh(rampGeom, materials.subterranean);
    rampMesh.position.set(-23, -0.6, -14);
    rampMesh.rotation.x = 0.16;
    groundSiteGroup.add(rampMesh);

    scene.add(groundSiteGroup);

    // MULTI-FLOOR ARCHITECTURAL SLICES
    // Store floor groups in a map so we can animate exploded view or isolate floors
    const floorGroups: { [key in FloorId]: THREE.Group } = {
      B2: new THREE.Group(),
      B1: new THREE.Group(),
      G: new THREE.Group(),
      L1: new THREE.Group(),
      L2: new THREE.Group(),
      L3: new THREE.Group(),
      L4: new THREE.Group(),
      L5: new THREE.Group(),
    };

    const baseFloorElevations: { [key in FloorId]: number } = {
      B2: -5.5,
      B1: -2.8,
      G: 0,
      L1: 4.2,
      L2: 8.4,
      L3: 12.6,
      L4: 16.8,
      L5: 21.0,
    };

    // Helper: Build floor slab with optional atrium cutout
    const createFloorSlab = (width: number, depth: number, height: number, material: THREE.Material, hasAtriumHole = true) => {
      if (!hasAtriumHole) {
        const slab = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
        slab.receiveShadow = true;
        slab.castShadow = true;
        return slab;
      }

      // Procedural slab with rectangular atrium void
      const shape = new THREE.Shape();
      const hw = width / 2;
      const hd = depth / 2;
      shape.moveTo(-hw, -hd);
      shape.lineTo(hw, -hd);
      shape.lineTo(hw, hd);
      shape.lineTo(-hw, hd);
      shape.closePath();

      // Atrium Hole
      const hole = new THREE.Path();
      const holeW = 10;
      const holeD = 12;
      hole.moveTo(-holeW / 2, -holeD / 2);
      hole.lineTo(-holeW / 2, holeD / 2);
      hole.lineTo(holeW / 2, holeD / 2);
      hole.lineTo(holeW / 2, -holeD / 2);
      hole.closePath();
      shape.holes.push(hole);

      const extrudeSettings = {
        steps: 1,
        depth: height,
        bevelEnabled: false,
      };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geom, material);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = height / 2;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      return mesh;
    };

    // B2: SERVICE & MEP
    {
      const group = floorGroups.B2;
      const slab = createFloorSlab(38, 38, 2.2, materials.subterranean, false);
      group.add(slab);
      // Chiller plant boxes
      for (let i = -12; i <= 12; i += 8) {
        const chiller = new THREE.Mesh(new THREE.BoxGeometry(5, 1.8, 3), materials.darkSteel);
        chiller.position.set(i, 1.1, -8);
        chiller.castShadow = true;
        group.add(chiller);
      }
      group.position.y = baseFloorElevations.B2;
      mallBuildingGroup.add(group);
    }

    // B1: PARKING & EV
    {
      const group = floorGroups.B1;
      const slab = createFloorSlab(40, 40, 2.2, materials.subterranean, false);
      group.add(slab);
      // Parking columns & EV glowing stalls
      for (let x = -14; x <= 14; x += 9.3) {
        for (let z = -14; z <= 14; z += 9.3) {
          const col = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.4, 0.8), materials.darkSteel);
          col.position.set(x, 1.2, z);
          group.add(col);
        }
      }
      // EV Supercharging indicator strips
      for (let i = -12; i <= 12; i += 6) {
        const evCharger = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1.6, 0.6),
          new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.6 })
        );
        evCharger.position.set(i, 0.8, 14);
        group.add(evCharger);
      }
      group.position.y = baseFloorElevations.B1;
      mallBuildingGroup.add(group);
    }

    // GROUND FLOOR (G): GRAND ENTRANCE & LUXURY RETAIL
    {
      const group = floorGroups.G;
      const slab = createFloorSlab(42, 42, 0.8, materials.marbleFloor, false);
      group.add(slab);

      // Grand Entrance Glass Canopy Portico
      const canopy = new THREE.Mesh(
        new THREE.BoxGeometry(16, 0.4, 8),
        materials.champagneMetal
      );
      canopy.position.set(0, 3.8, 24);
      group.add(canopy);

      // Glass Entrance Portico Pillars
      for (const px of [-6.5, 6.5]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 3.8, 16), materials.champagneMetal);
        pillar.position.set(px, 1.9, 26);
        group.add(pillar);
      }

      // Luxury Store Fronts (Ground Floor Perimeter Blocks with glowing displays)
      const storeConfigs = [
        { x: -14, z: -12, w: 10, d: 8, label: 'Maison Joaillerie' },
        { x: 14, z: -12, w: 10, d: 8, label: 'Atelier Aurelia' },
        { x: -14, z: 12, w: 10, d: 8, label: 'Café de la Paix' },
        { x: 14, z: 12, w: 10, d: 8, label: 'L’Elixir Beauty' },
      ];
      storeConfigs.forEach((sc) => {
        const storeBox = new THREE.Mesh(new THREE.BoxGeometry(sc.w, 3.2, sc.d), materials.storeGlow);
        storeBox.position.set(sc.x, 2.0, sc.z);
        storeBox.castShadow = true;
        group.add(storeBox);

        // Glass Storefront framing
        const frame = new THREE.Mesh(new THREE.BoxGeometry(sc.w + 0.2, 3.3, 0.2), materials.champagneMetal);
        frame.position.set(sc.x, 2.0, sc.z + sc.d / 2);
        group.add(frame);
      });

      // Ground Floor Central Fountain Model
      const miniFountain = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.5, 0.8, 24), materials.champagneMetal);
      miniFountain.position.set(0, 0.4, 0);
      group.add(miniFountain);

      group.position.y = baseFloorElevations.G;
      mallBuildingGroup.add(group);
    }

    // LEVEL 1 (L1): FASHION & LIFESTYLE (WITH ATRIUM VOID)
    {
      const group = floorGroups.L1;
      const slab = createFloorSlab(40, 40, 0.7, materials.marbleFloor, true);
      group.add(slab);

      // Atrium Glass Balustrade
      const balustradeGeom = new THREE.BoxGeometry(10.4, 1.0, 12.4);
      const balustrade = new THREE.Mesh(balustradeGeom, materials.glass);
      balustrade.position.set(0, 0.9, 0);
      group.add(balustrade);

      // Store Units L1
      const storeBlocks = [
        { x: -13, z: -11, w: 9, d: 7 },
        { x: 13, z: -11, w: 9, d: 7 },
        { x: -13, z: 11, w: 9, d: 7 },
        { x: 13, z: 11, w: 9, d: 7 },
      ];
      storeBlocks.forEach((sb) => {
        const store = new THREE.Mesh(new THREE.BoxGeometry(sb.w, 3.0, sb.d), materials.storeGlow);
        store.position.set(sb.x, 1.8, sb.z);
        group.add(store);
      });

      // Escalators spanning between levels
      const escGeom = new THREE.BoxGeometry(1.6, 0.4, 6);
      const escMesh = new THREE.Mesh(escGeom, materials.champagneMetal);
      escMesh.position.set(0, -1.8, 3.5);
      escMesh.rotation.x = 0.45;
      group.add(escMesh);

      group.position.y = baseFloorElevations.L1;
      mallBuildingGroup.add(group);
    }

    // LEVEL 2 (L2): ELECTRONICS & TECH / HOME
    {
      const group = floorGroups.L2;
      const slab = createFloorSlab(40, 40, 0.7, materials.marbleFloor, true);
      group.add(slab);

      // Tech Flagship Store Blocks (Quantum Tech & Nordic Furniture)
      const techStore1 = new THREE.Mesh(
        new THREE.BoxGeometry(11, 3.0, 8),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, metalness: 0.8 })
      );
      techStore1.position.set(-13, 1.8, -11);
      group.add(techStore1);

      const techStore2 = new THREE.Mesh(
        new THREE.BoxGeometry(11, 3.0, 8),
        materials.storeGlow
      );
      techStore2.position.set(13, 1.8, 11);
      group.add(techStore2);

      // Balustrade
      const balustrade = new THREE.Mesh(new THREE.BoxGeometry(10.4, 1.0, 12.4), materials.glass);
      balustrade.position.set(0, 0.9, 0);
      group.add(balustrade);

      group.position.y = baseFloorElevations.L2;
      mallBuildingGroup.add(group);
    }

    // LEVEL 3 (L3): THE GRAND TERRACE FOOD COURT & DINING
    {
      const group = floorGroups.L3;
      // Cantilevered outdoor dining terrace on south side (+4m overhang)
      const slab = createFloorSlab(40, 44, 0.7, materials.marbleFloor, true);
      group.add(slab);

      // Outdoor Terrace Pergola
      const pergola = new THREE.Mesh(
        new THREE.BoxGeometry(22, 0.25, 6),
        materials.champagneMetal
      );
      pergola.position.set(0, 3.4, 18);
      group.add(pergola);

      // Food Stalls & Seating Clusters
      for (let s = -14; s <= 14; s += 7) {
        const stall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.8, 3.8), materials.storeGlow);
        stall.position.set(s, 1.7, -13);
        group.add(stall);
      }

      group.position.y = baseFloorElevations.L3;
      mallBuildingGroup.add(group);
    }

    // LEVEL 4 (L4): MULTIPLEX CINEMA & ENTERTAINMENT
    {
      const group = floorGroups.L4;
      const slab = createFloorSlab(38, 38, 0.8, materials.cinemaBlack, false);
      group.add(slab);

      // Cinema Auditoriums (Large volume boxes with high ceilings)
      const imaxHall = new THREE.Mesh(new THREE.BoxGeometry(15, 4.8, 14), materials.cinemaBlack);
      imaxHall.position.set(-9, 2.7, 0);
      group.add(imaxHall);

      // Cinema Illuminated Marquee
      const marquee = new THREE.Mesh(
        new THREE.BoxGeometry(12, 1.2, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x4f46e5, emissiveIntensity: 0.9 })
      );
      marquee.position.set(-9, 4.4, 7.2);
      group.add(marquee);

      // VR Arcade & Bowling Lounge Wing
      const arcadeWing = new THREE.Mesh(
        new THREE.BoxGeometry(14, 3.8, 14),
        new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.4 })
      );
      arcadeWing.position.set(10, 2.2, 0);
      group.add(arcadeWing);

      group.position.y = baseFloorElevations.L4;
      mallBuildingGroup.add(group);
    }

    // LEVEL 5 (L5): EXECUTIVE ADMINISTRATION & ROOFTOP SKYLIGHT CROWN
    {
      const group = floorGroups.L5;
      const slab = createFloorSlab(34, 34, 0.7, materials.darkSteel, true);
      group.add(slab);

      // Corporate Admin Office Blocks (North Wing)
      const officeBlock = new THREE.Mesh(new THREE.BoxGeometry(26, 3.0, 8), materials.glass);
      officeBlock.position.set(0, 1.8, -10);
      group.add(officeBlock);

      // Central Architectural Glass Skylight Lantern
      const skylightArchGeom = new THREE.CylinderGeometry(8, 8.5, 2.2, 32, 1, true, 0, Math.PI);
      const skylight = new THREE.Mesh(skylightArchGeom, materials.glass);
      skylight.rotation.z = Math.PI / 2;
      skylight.position.set(0, 2.0, 0);
      group.add(skylight);

      // Rooftop Photovoltaic Solar Panels
      for (const sx of [-11, 11]) {
        const solarBed = new THREE.Mesh(new THREE.BoxGeometry(6, 0.3, 10), materials.solar);
        solarBed.position.set(sx, 0.5, 6);
        solarBed.rotation.x = -0.12;
        group.add(solarBed);
      }

      // Crown Structural Bracing (Champagne Gold Space Frame)
      const crownRim = new THREE.Mesh(new THREE.BoxGeometry(34.4, 0.6, 34.4), materials.champagneMetal);
      crownRim.position.set(0, 3.4, 0);
      group.add(crownRim);

      group.position.y = baseFloorElevations.L5;
      mallBuildingGroup.add(group);
    }

    // EXTERIOR GLASS CURTAIN WALL SHELL & COLUMNS
    const curtainWallGroup = new THREE.Group();

    // 4 Corner Architectural Columns
    const cornerOffsets = [
      [-19.5, -19.5], [19.5, -19.5],
      [-19.5, 19.5], [19.5, 19.5]
    ];
    cornerOffsets.forEach(([cx, cz]) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(1.6, 24, 1.6), materials.champagneMetal);
      col.position.set(cx, 12, cz);
      col.castShadow = true;
      curtainWallGroup.add(col);
    });

    // Outer Glazing Facades (South Grand Entrance Glass, East, West, North)
    const facadeSouth = new THREE.Mesh(new THREE.BoxGeometry(37, 21, 0.3), materials.glass);
    facadeSouth.position.set(0, 11.5, 20.2);
    curtainWallGroup.add(facadeSouth);

    const facadeNorth = new THREE.Mesh(new THREE.BoxGeometry(37, 21, 0.3), materials.glass);
    facadeNorth.position.set(0, 11.5, -20.2);
    curtainWallGroup.add(facadeNorth);

    const facadeEast = new THREE.Mesh(new THREE.BoxGeometry(0.3, 21, 39), materials.glass);
    facadeEast.position.set(20.2, 11.5, 0);
    curtainWallGroup.add(facadeEast);

    const facadeWest = new THREE.Mesh(new THREE.BoxGeometry(0.3, 21, 39), materials.glass);
    facadeWest.position.set(-20.2, 11.5, 0);
    curtainWallGroup.add(facadeWest);

    // Architectural Horizontal Champagne Spandrels
    for (const y of [4.2, 8.4, 12.6, 16.8, 21.0]) {
      const ring = new THREE.Mesh(new THREE.BoxGeometry(41, 0.6, 41), materials.champagneMetal);
      ring.position.set(0, y, 0);
      curtainWallGroup.add(ring);
    }

    mallBuildingGroup.add(curtainWallGroup);

    // RAYCASTING FOR INTERACTIVE FLOOR HOVER/CLICK
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(mallBuildingGroup.children, true);

      if (intersects.length > 0) {
        // Find which floor group this object belongs to
        let obj: THREE.Object3D | null = intersects[0].object;
        let matchedFloor: FloorId | null = null;
        while (obj && obj !== mallBuildingGroup && obj !== scene) {
          for (const fid of Object.keys(floorGroups) as FloorId[]) {
            if (floorGroups[fid] === obj) {
              matchedFloor = fid;
              break;
            }
          }
          if (matchedFloor) break;
          obj = obj.parent;
        }

        if (matchedFloor) {
          const names: Record<FloorId, { name: string; dept: string }> = {
            B2: { name: 'Basement 2', dept: 'Service, Central Chiller & MEP Infrastructure' },
            B1: { name: 'Basement 1', dept: '1,850 Parking Bays, 48x EV Superchargers & Freight' },
            G: { name: 'Ground Floor', dept: 'Grand Atrium, Fountain & Haute Joaillerie' },
            L1: { name: 'Level 1', dept: 'Global Designer Fashion, Lifestyle & Footwear' },
            L2: { name: 'Level 2', dept: 'Consumer Tech, AI Hardware & Nordic Living' },
            L3: { name: 'Level 3', dept: '1,200-Seat Atrium Food Court & Dining Terrace' },
            L4: { name: 'Level 4', dept: '12-Screen IMAX Multiplex, VR Arena & Bowling' },
            L5: { name: 'Level 5', dept: 'Executive Management HQ, Leasing & Security Ops' },
          };
          setHoveredFloorInfo({ id: matchedFloor, ...names[matchedFloor] });
        } else {
          setHoveredFloorInfo(null);
        }
      } else {
        setHoveredFloorInfo(null);
      }
    };

    const handlePointerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(mallBuildingGroup.children, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        let matchedFloor: FloorId | null = null;
        while (obj && obj !== mallBuildingGroup && obj !== scene) {
          for (const fid of Object.keys(floorGroups) as FloorId[]) {
            if (floorGroups[fid] === obj) {
              matchedFloor = fid;
              break;
            }
          }
          if (matchedFloor) break;
          obj = obj.parent;
        }

        if (matchedFloor) {
          setSelectedFloor(matchedFloor);
          if (onSelectFloor) {
            onSelectFloor(matchedFloor);
          }
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handlePointerClick);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // PRE-WARM SHADERS
    renderer.compile(scene, camera);

    // ANIMATION LOOP (ZERO GARBAGE COLLECTION IN TICK)
    const clock = new THREE.Clock();
    let reqId = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera transition if preset target exists
      if (cameraPresetTargetRef.current) {
        const { pos, lookAt } = cameraPresetTargetRef.current;
        camera.position.lerp(pos, 0.05);
        controls.target.lerp(lookAt, 0.05);
        if (camera.position.distanceTo(pos) < 0.2) {
          cameraPresetTargetRef.current = null;
        }
      }

      // Auto-rotate when active and user isn't dragging
      if (stateRef.current.isAutoRotate && !cameraPresetTargetRef.current) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
      } else {
        controls.autoRotate = false;
      }

      // Animate water fountain jets
      const jetScale = 1 + Math.sin(elapsed * 4) * 0.15;
      jetGroup.scale.set(1, jetScale, 1);

      // EXPODED VIEW INTERPOLATION
      const targetExplode = stateRef.current.explodeFactor;
      // Animate each floor to its exploded position
      const floorOrder: FloorId[] = ['B2', 'B1', 'G', 'L1', 'L2', 'L3', 'L4', 'L5'];
      const spacing = 4.2; // Extra spacing per level when exploded
      floorOrder.forEach((fid, idx) => {
        const grp = floorGroups[fid];
        const base = baseFloorElevations[fid];
        const targetY = base + idx * targetExplode * spacing;
        grp.position.y = THREE.MathUtils.damp(grp.position.y, targetY, 6, delta);

        // Floor isolation handling
        const currentIso = stateRef.current.selectedFloor;
        if (currentIso === 'ALL') {
          grp.visible = true;
        } else if (currentIso === fid) {
          grp.visible = true;
        } else {
          // If a single floor is isolated and not in exploded mode, hide or fade others
          if (targetExplode < 0.1) {
            grp.visible = false;
          } else {
            grp.visible = true;
          }
        }
      });

      // Hide or reveal outer curtain walls based on explode slider or floor isolation
      if (targetExplode > 0.15 || stateRef.current.selectedFloor !== 'ALL') {
        curtainWallGroup.visible = false;
      } else {
        curtainWallGroup.visible = true;
      }

      // LIGHTING PRESET SMOOTH UPDATES
      const currentLight = stateRef.current.lightingPreset;
      if (currentLight === 'day') {
        sunLight.intensity = THREE.MathUtils.damp(sunLight.intensity, 1.8, 4, delta);
        sunLight.color.setHex(0xfff5e6);
        scene.background = new THREE.Color(0xf1f5f9);
        (scene.fog as THREE.FogExp2).color.setHex(0xf1f5f9);
      } else if (currentLight === 'sunset') {
        sunLight.intensity = THREE.MathUtils.damp(sunLight.intensity, 1.4, 4, delta);
        sunLight.color.setHex(0xff9944);
        scene.background = new THREE.Color(0x3d2645);
        (scene.fog as THREE.FogExp2).color.setHex(0x3d2645);
      } else if (currentLight === 'night') {
        sunLight.intensity = THREE.MathUtils.damp(sunLight.intensity, 0.35, 4, delta);
        sunLight.color.setHex(0x38bdf8);
        scene.background = new THREE.Color(0x050c18);
        (scene.fog as THREE.FogExp2).color.setHex(0x050c18);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP ON UNMOUNT
    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handlePointerClick);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries & materials
      marbleTexture.dispose();
      solarTexture.dispose();
      Object.values(materials).forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // CAMERA VIEW PRESET HANDLER
  const setCameraPreset = (preset: CameraViewPreset) => {
    switch (preset) {
      case 'facade':
        cameraPresetTargetRef.current = {
          pos: new THREE.Vector3(0, 16, 52),
          lookAt: new THREE.Vector3(0, 10, 0),
        };
        break;
      case 'aerial':
        cameraPresetTargetRef.current = {
          pos: new THREE.Vector3(0, 78, 45),
          lookAt: new THREE.Vector3(0, 6, 0),
        };
        break;
      case 'atrium':
        cameraPresetTargetRef.current = {
          pos: new THREE.Vector3(12, 14, 18),
          lookAt: new THREE.Vector3(0, 8, 0),
        };
        break;
      case 'terrace':
        cameraPresetTargetRef.current = {
          pos: new THREE.Vector3(0, 18, 28),
          lookAt: new THREE.Vector3(0, 14, 12),
        };
        break;
      case 'parking':
        cameraPresetTargetRef.current = {
          pos: new THREE.Vector3(-32, 6, 22),
          lookAt: new THREE.Vector3(-10, -2, 0),
        };
        break;
      case 'exploded':
        setExplodeFactor(0.8);
        cameraPresetTargetRef.current = {
          pos: new THREE.Vector3(50, 48, 55),
          lookAt: new THREE.Vector3(0, 20, 0),
        };
        break;
    }
  };

  return (
    <div className="relative w-full h-[640px] md:h-[720px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: Minimal Architectural Header Badge */}
      <div className="absolute top-5 left-6 pointer-events-none flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-400 shadow-lg backdrop-blur-md">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white text-base font-semibold tracking-wide font-cinzel">SMART MALL 3D</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              REALTIME WEBGL
            </span>
          </div>
          <p className="text-slate-300 text-xs">Architectural Axonometric & Interactive BIM Model</p>
        </div>
      </div>

      {/* Top Right: Quick Actions */}
      <div className="absolute top-5 right-6 flex items-center gap-2">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border backdrop-blur-md ${
            isAutoRotate
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-sm'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isAutoRotate ? 'Orbiting' : 'Paused'}</span>
        </button>

        <button
          onClick={() => setViewMode2D(!viewMode2D)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border backdrop-blur-md ${
            viewMode2D
              ? 'bg-blue-600/30 border-blue-400 text-blue-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
          title="Switch 2D / 3D Mode"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{viewMode2D ? '2D Schematic' : '3D Model'}</span>
        </button>
      </div>

      {/* Hovered Floor Tooltip Floating Card */}
      {hoveredFloorInfo && (
        <div className="absolute top-20 left-6 p-4 rounded-2xl bg-slate-950/90 border border-amber-500/40 shadow-2xl backdrop-blur-md max-w-xs animate-fade-in pointer-events-none">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400">
              LEVEL {hoveredFloorInfo.id}
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Click to Isolate</span>
          </div>
          <h4 className="text-white text-sm font-semibold mb-1">{hoveredFloorInfo.name}</h4>
          <p className="text-slate-300 text-xs leading-relaxed">{hoveredFloorInfo.dept}</p>
        </div>
      )}

      {/* 2D Schematic Overlay Modal if enabled */}
      {viewMode2D && (
        <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md flex flex-col p-6 animate-fade-in overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white font-cinzel">2D Architectural Section & Floor Elevations</h3>
              <p className="text-xs text-slate-400">Orthogonal building slice showing vertical mechanical and retail distribution</p>
            </div>
            <button
              onClick={() => setViewMode2D(false)}
              className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-lg text-xs hover:bg-amber-500/30"
            >
              Back to 3D View
            </button>
          </div>

          <div className="my-auto py-6 max-w-4xl mx-auto w-full">
            <div className="space-y-3">
              {[
                { id: 'L5', name: 'Level 5 — Executive Offices, Leasing & Security Command', elev: '+21.0m', area: '14,500 m²', color: 'border-slate-600 bg-slate-900/60' },
                { id: 'L4', name: 'Level 4 — Starlight IMAX Multiplex, CyberVerse VR & Bowling', elev: '+16.8m', area: '22,000 m²', color: 'border-purple-600/50 bg-purple-950/30' },
                { id: 'L3', name: 'Level 3 — The Grand Terrace Food Court & Fine Dining', elev: '+12.6m', area: '24,000 m²', color: 'border-amber-600/50 bg-amber-950/30' },
                { id: 'L2', name: 'Level 2 — Consumer Tech, AI Robotics & Scandinavian Living', elev: '+8.4m', area: '23,800 m²', color: 'border-sky-600/50 bg-sky-950/30' },
                { id: 'L1', name: 'Level 1 — Global Fashion & Designer Apparel Flagships', elev: '+4.2m', area: '24,500 m²', color: 'border-yellow-600/50 bg-yellow-950/30' },
                { id: 'G', name: 'Ground Floor — Grand South Atrium, Fountain & Haute Couture', elev: '±0.0m', area: '26,000 m²', color: 'border-amber-400/60 bg-amber-950/40' },
                { id: 'B1', name: 'Basement 1 — 1,850 Parking Bays, 48x EV Superchargers & Freight', elev: '-2.8m', area: '32,000 m²', color: 'border-slate-700 bg-slate-900/50' },
                { id: 'B2', name: 'Basement 2 — Central Chiller Plant, 11kV Substation & MEP Spine', elev: '-5.5m', area: '28,500 m²', color: 'border-slate-800 bg-slate-950/80' },
              ].map((lvl) => (
                <div
                  key={lvl.id}
                  onClick={() => {
                    setSelectedFloor(lvl.id as FloorId);
                    if (onSelectFloor) onSelectFloor(lvl.id as FloorId);
                    setViewMode2D(false);
                  }}
                  className={`p-4 rounded-xl border ${lvl.color} flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer group`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono font-bold text-amber-400 text-sm">
                      {lvl.id}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">{lvl.name}</h4>
                      <p className="text-xs text-slate-400">Total Plate: {lvl.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-amber-400/90 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                      {lvl.elev}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Select Level →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ERGONOMIC COLLAPSIBLE BOTTOM CONTROL DOCK (Zero Viewport Occlusion) */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-20">
        <div className="relative">
          {/* Collapse / Expand Toggle Tab */}
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="mx-auto flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-slate-900/95 border-t border-x border-slate-700 text-slate-300 hover:text-white text-xs font-medium shadow-md transition-colors"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Show Controls (Dock)</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                <span>Hide Controls</span>
              </>
            )}
          </button>

          {/* Unified Horizontal Control Dock */}
          {!isDockCollapsed && (
            <div className="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Exploded View Slider */}
              <div className="w-full md:w-56 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    Exploded View
                  </span>
                  <span className="font-mono text-amber-400 font-semibold">{Math.round(explodeFactor * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeFactor}
                  onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Floor Isolation Selector */}
              <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0">
                {(['ALL', 'B2', 'B1', 'G', 'L1', 'L2', 'L3', 'L4', 'L5'] as const).map((floor) => (
                  <button
                    key={floor}
                    onClick={() => {
                      setSelectedFloor(floor);
                      if (floor !== 'ALL' && onSelectFloor) {
                        onSelectFloor(floor);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                      selectedFloor === floor
                        ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>

              {/* Lighting Presets */}
              <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setLightingPreset('day')}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                    lightingPreset === 'day'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Daylight Architecture"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden lg:inline">Day</span>
                </button>
                <button
                  onClick={() => setLightingPreset('sunset')}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                    lightingPreset === 'sunset'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Golden Sunset"
                >
                  <Sunrise className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden lg:inline">Sunset</span>
                </button>
                <button
                  onClick={() => setLightingPreset('night')}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all ${
                    lightingPreset === 'night'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Luxury Evening Glow"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden lg:inline">Night</span>
                </button>
              </div>

              {/* Camera Presets Menu */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCameraPreset('facade')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Facade
                </button>
                <button
                  onClick={() => setCameraPreset('atrium')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Atrium
                </button>
                <button
                  onClick={() => setCameraPreset('aerial')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Aerial
                </button>
                <button
                  onClick={() => setCameraPreset('exploded')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                >
                  Explode
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
