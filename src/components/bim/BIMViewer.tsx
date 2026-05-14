import { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, useHelper, Float, Grid, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";
import { Info, Layers, Scissors, Move3d, MousePointer2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

function BuildingBlock({ position, size, color, data, onSelect }: any) {
  const [hovered, setHover] = useState(false);
  
  return (
    <mesh 
      position={position} 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data);
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={hovered ? "#ffffff" : color} 
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function BIMModel({ clippingY, wireframe, onSelect }: any) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate a procedural architectural block set
  const blocks = [
    { pos: [0, 1, 0], size: [10, 1, 10], color: "#1a1a1a", data: { type: "Foundations", mat: "Concrete", status: "Built" } },
    { pos: [0, 4, 0], size: [8, 5, 8], color: "#333333", data: { type: "Structure", mat: "Steel/Glass", status: "Finishing" } },
    { pos: [0, 8, 0], size: [12, 1, 12], color: "#222222", data: { type: "Rooftop", mat: "Solar Panels", status: "Design" } },
    { pos: [4, 4, 4], size: [1, 5, 1], color: "#555555", data: { type: "MEP Column", mat: "Mixed", status: "En ejecución" } },
    { pos: [-4, 4, 4], size: [1, 5, 1], color: "#555555", data: { type: "MEP Column", mat: "Mixed", status: "En ejecución" } },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    // clip logic simulated by hiding elements or using stencil if complex (simplified for demo)
    groupRef.current.children.forEach((child: any) => {
      if (child.position.y > clippingY) {
        child.visible = false;
      } else {
        child.visible = true;
      }
      if (child.material) child.material.wireframe = wireframe;
    });
  });

  return (
    <group ref={groupRef}>
      {blocks.map((b, i) => (
        <BuildingBlock key={i} position={b.pos} size={b.size} color={b.color} data={b.data} onSelect={onSelect} />
      ))}
    </group>
  );
}

export default function BIMViewer() {
  const [clippingY, setClippingY] = useState(15);
  const [wireframe, setWireframe] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);

  return (
    <section id="bim-viewer" className="relative h-screen w-full bg-[#050505] flex flex-col md:flex-row">
      {/* UI Overlay */}
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <h2 className="text-4xl font-serif italic tracking-tight">Active View: IFC Core</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-2">Tecnología APA Proprietary Render Engine</p>
      </div>

      {/* Tools Sidebar */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        <div className="glass-morphism p-4 rounded-2xl flex flex-col gap-6 shadow-2xl">
          <ToolButton 
            active={wireframe} 
            onClick={() => setWireframe(!wireframe)}
            icon={<Layers size={20} />}
            label="Layers"
          />
          <ToolButton 
            icon={<Scissors size={20} />}
            label="Section"
            slider
            value={clippingY}
            onChange={(v) => setClippingY(v)}
          />
          <ToolButton 
            icon={<MousePointer2 size={20} />}
            label="Inspect"
          />
        </div>
      </div>

      {/* Data Inspector Panel */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute bottom-10 left-10 z-20 glass-morphism p-8 rounded-3xl w-80 shadow-2xl border-white/20"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-serif text-2xl">{selectedElement.type}</h3>
              <button 
                onClick={() => setSelectedElement(null)}
                className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100"
              >
                Close
              </button>
            </div>
            
            <div className="space-y-4">
              <DataField label="Material" value={selectedElement.mat} />
              <DataField label="Status" value={selectedElement.status} />
              <DataField label="ID" value={`#APA-BIM-${Math.floor(Math.random()*9999)}`} />
            </div>
            
            <button className="mt-8 w-full bg-white text-black py-3 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-white/90 transition-all">
              Ver Planos Revit
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow w-full h-full cursor-crosshair">
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={35} />
          <OrbitControls 
            enablePan={true} 
            maxPolarAngle={Math.PI / 2.1} 
            minDistance={10} 
            maxDistance={80} 
            autoRotate={!selectedElement}
            autoRotateSpeed={0.5}
          />
          
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            
            <BIMModel 
              clippingY={clippingY} 
              wireframe={wireframe} 
              onSelect={setSelectedElement} 
            />

            <Grid 
              infiniteGrid 
              fadeDistance={50} 
              fadeStrength={5} 
              sectionColor="#ffffff" 
              sectionSize={5} 
              cellColor="#333333" 
            />
            
            <ContactShadows 
              opacity={0.5} 
              scale={20} 
              blur={2.4} 
              far={10} 
              resolution={256} 
              color="#000000" 
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

function ToolButton({ icon, label, active, onClick, slider, value, onChange }: any) {
  return (
    <div className="flex flex-col items-center gap-2 group pointer-events-auto">
      <button 
        onClick={onClick}
        className={cn(
          "p-3 rounded-xl transition-all duration-300",
          active ? "bg-accent-orange text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
        )}
      >
        {icon}
      </button>
      {slider && (
        <input 
          type="range" 
          min="0" max="15" step="0.1" 
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-20 accent-accent-orange h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
        />
      )}
      <span className="text-[8px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-60 transition-opacity">
        {label}
      </span>
    </div>
  );
}

function DataField({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1 border-l border-white/10 pl-4 py-1">
      <span className="text-[8px] uppercase tracking-[0.2em] text-white/40">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
