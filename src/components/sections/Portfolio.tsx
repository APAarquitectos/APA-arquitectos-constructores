import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { cn } from "@/src/lib/utils";
import { X, Maximize2, Search } from "lucide-react";
import { getFallbackImage } from "@/src/lib/images";

interface Project {
  id: string;
  title: string;
  category: string;
  mainCategory: "Arquitectura" | "Interiores" | "Espacio Público" | "Planificación";
  lot: string;
  area: string;
  status: string;
  year: string;
  image: string;
}

const PROJECTS: Project[] = [
  { id: "A-PP029", title: "House N°J - Vivienda Multifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "10 m x 8,50 m", area: "360 m2", status: "En Construcción", year: "2026", image: "/projects/A-PP029.png" },
  { id: "A-PP027", title: "House DS – Vivienda Bi familiar", category: "Residencial", mainCategory: "Arquitectura", lot: "9,28 m x 5,93 m", area: "66,38 m2", status: "En Construcción", year: "2025", image: "/projects/A-PP027.png" },
  { id: "A-PP026", title: "House PH – Apartamento Tipo Loft", category: "Interiores", mainCategory: "Interiores", lot: "9,50 m x 13,68 m", area: "96,76 m2", status: "En Diseño", year: "2025", image: "/projects/A-PP026.png" },
  { id: "A-PP025", title: "House YRG – Vivienda Multifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "6,50 m x 13,00 m", area: "285,98 m2", status: "En Construcción", year: "2025", image: "/projects/A-PP025.png" },
  { id: "A-PP024", title: "House GP – Apartamento estándar", category: "Interiores", mainCategory: "Interiores", lot: "6,80 m x 8,40 m", area: "50 m2", status: "Terminado", year: "2025", image: "/projects/A-PP024.jpg" },
  { id: "A-PP023", title: "House EA - Vivienda Unifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "Zona rural", area: "532,5 m2", status: "En Construcción", year: "2025", image: "/projects/A-PP023.png" },
  { id: "A-PP022", title: "House WG - Vivienda Unifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "7 m x 10,60 m", area: "176,13 m2", status: "En Construcción", year: "2025", image: "/projects/A-PP022.png" },
  { id: "A-PP020", title: "House AB - Vivienda Multifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "6,26 m x 10,60 m", area: "197,67 m2", status: "En Diseño", year: "2025", image: "/projects/A-PP020.png" },
  { id: "A-PP019", title: "House JC – Apartamento doble", category: "Interiores", mainCategory: "Interiores", lot: "12,05 m x 8,51 m", area: "100 m2", status: "En Diseño", year: "2024", image: "/projects/A-PP019.png" },
  { id: "A-PP016", title: "House LY - Vivienda Unifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "10 m x 10,30 m", area: "325 m2", status: "En Construcción", year: "2024", image: "/projects/A-PP016.png" },
  { id: "A-PP015", title: "House Center VGR - Vivienda Unifamiliar y Hotelería", category: "Residencial", mainCategory: "Arquitectura", lot: "5,20 m x 14,92 m", area: "123,86 m2", status: "Terminado", year: "2024", image: "/projects/A-PP015.png" },
  { id: "A-PP012", title: "House Curve OR - Vivienda Unifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "10 m x 11 m", area: "95,93 m2", status: "Terminado", year: "2023", image: "/projects/A-PP012.png" },
  { id: "A-PP011", title: "House CR - Vivienda Unifamiliar y Hotelería", category: "Residencial", mainCategory: "Arquitectura", lot: "9,84 m x 14 m", area: "247,65 m2", status: "Terminado", year: "2023", image: "/projects/A-PP011.png" },
  { id: "A-PP010", title: "Urbanización Senderos de la Esperanza", category: "Planificación", mainCategory: "Planificación", lot: "Varios", area: "32000 m2", status: "En Construcción", year: "2023", image: "/projects/A-PP010.png" },
  { id: "A-PP009", title: "House LPM – Vivienda Unifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "Zona rural", area: "340,69 m2", status: "Terminado", year: "2022", image: "/projects/A-PP009.png" },
  { id: "A-PP008", title: "House DAN – Vivienda Multifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "8,10 m x 14 m", area: "345,87 m2", status: "Terminado", year: "2022", image: "/projects/A-PP008.png" },
  { id: "A-PP007", title: "House NOM – Apartamento Tipo Loft", category: "Interiores", mainCategory: "Interiores", lot: "6,70 m x 13,92 m", area: "80,22 m2", status: "Terminado", year: "2022", image: "/projects/A-PP007.png" },
  { id: "A-PP006", title: "House Workshop OVE – Vivienda Unifamiliar y Hotelería", category: "Residencial", mainCategory: "Arquitectura", lot: "10 m x 21,10 m", area: "377,98 m2", status: "En Construcción", year: "2022", image: "/projects/A-PP006.png" },
  { id: "A-PP005", title: "House Staggered EE – Vivienda Bi familiar", category: "Residencial", mainCategory: "Arquitectura", lot: "7,30 m x 12 m", area: "315,36 m2", status: "Terminado", year: "2022", image: "/projects/A-PP005.png" },
  { id: "A-PP004", title: "House Redu CC – Vivienda Multifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "6 m x 13,50 m", area: "137,42 m2", status: "En Diseño", year: "2022", image: "/projects/A-PP004.png" },
  { id: "A-PP003", title: "House Hotel Gold - Vivienda Unifamiliar y Hotelería", category: "Residencial", mainCategory: "Arquitectura", lot: "5,50m x 10,10 m", area: "237,05 m2", status: "Terminado", year: "2022", image: "/projects/A-PP003.png" },
  { id: "A-PP002", title: "Rural House D - Vivienda Unifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "Zona rural", area: "141,36 m2", status: "Terminado", year: "2021", image: "/projects/A-PP002.png" },
  { id: "A-PP001", title: "House One - Vivienda Unifamiliar", category: "Residencial", mainCategory: "Arquitectura", lot: "14 m x 8 m", area: "195 m2", status: "En Diseño", year: "2020", image: "/projects/A-PP001.png" },
  { id: "S-PP001", title: "Modulo habitable de emergencia", category: "Salud", mainCategory: "Arquitectura", lot: "6 m x 5,5 m", area: "Zonas de emergencia", status: "Terminado", year: "2018", image: "/projects/S-PP001.png" },
  { id: "S-PP002", title: "Centro de vida adulto mayor", category: "Salud", mainCategory: "Arquitectura", lot: "21,02 m x 8,24 m", area: "157 m2", status: "Terminado", year: "2023", image: "/projects/S-PP002.png" },
  { id: "EP-PP001", title: "Entre Puentes – Espacio Público Inteligente", category: "Espacio Público", mainCategory: "Espacio Público", lot: "Zona urbana", area: "15000 m2", status: "En Diseño", year: "2019", image: "/projects/EP-PP001.png" },
  { id: "EP-PP002", title: "Extent House – Ampliación de vivienda", category: "Espacio Público", mainCategory: "Espacio Público", lot: "Zona rural", area: "6 a 50 m2", status: "En Diseño", year: "2020", image: "/projects/EP-PP002.png" },
  { id: "C-PP001", title: "Alcaldía Local de La Candelaria", category: "Cultura", mainCategory: "Arquitectura", lot: "Lote irregular", area: "2000 m2", status: "En Diseño", year: "2017", image: "/projects/C-PP001.png" },
  { id: "C-PP002", title: "Plaza de mercado 12 de octubre", category: "Cultura", mainCategory: "Arquitectura", lot: "Manzana urbana", area: "6000 m2", status: "En Diseño", year: "2018", image: "/projects/C-PP002.png" },
  { id: "C-PP003", title: "Ciudad vertical Barrio Acevedo Tejada", category: "Cultura", mainCategory: "Arquitectura", lot: "Zona urbana", area: "23000 m2", status: "En Diseño", year: "2019", image: "/projects/C-PP003.png" },
  { id: "C-PP004", title: "La casa del arquitecto", category: "Cultura", mainCategory: "Arquitectura", lot: "32 m x 14 m", area: "470 m2", status: "En Diseño", year: "2019", image: "/projects/C-PP004.png" },
  { id: "C-PP005", title: "OnTime Watches – Tienda de relojes", category: "Cultura", mainCategory: "Arquitectura", lot: "18,70 m x 30,48 m", area: "1902 m2", status: "En Diseño", year: "2020", image: "/projects/C-PP005.png" },
  { id: "C-PP006", title: "Centro de innovación cultural", category: "Cultura", mainCategory: "Arquitectura", lot: "Manzana urbana", area: "2788 m2", status: "En Diseño", year: "2021", image: "/projects/C-PP006.png" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeSubFilter, setActiveSubFilter] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["Todos", "Arquitectura", "Interiores", "Espacio Público", "Planificación"];
  const architectureTypes = ["Todas", "Residencial", "Cultura", "Salud"];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesSearch = 
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (activeFilter === "Todos") return true;
      if (activeFilter === "Arquitectura") {
        if (activeSubFilter === "Todas") return p.mainCategory === "Arquitectura";
        return p.category === activeSubFilter;
      }
      return p.mainCategory === activeFilter;
    });
  }, [activeFilter, activeSubFilter, searchQuery]);

  return (
    <section id="proyectos" className="py-32 px-10 bg-base-950">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="space-y-4 w-full md:w-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] text-technical">Proyectos Arquitectónicos y Urbanos</span>
          <h2 className="text-5xl md:text-7xl font-serif italic">Portfolio</h2>
          
          <div className="relative max-w-sm mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Buscar por código o tipología..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-[10px] uppercase tracking-widest outline-none focus:border-petroleum transition-colors"
            />
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-6 w-full md:w-auto">
          <div className="flex flex-wrap justify-end gap-3">
            {categories.map((cat) => (
              <FilterButton 
                key={cat} 
                label={cat} 
                active={activeFilter === cat} 
                onClick={() => {
                  setActiveFilter(cat);
                  setActiveSubFilter("Todas");
                }}
              />
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            {activeFilter === "Arquitectura" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4 border-t border-white/10 pt-4"
              >
                {architectureTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveSubFilter(type)}
                    className={cn(
                      "text-[9px] uppercase tracking-widest transition-all",
                      activeSubFilter === type ? "text-accent-orange font-bold underline underline-offset-4" : "text-white/40 hover:text-white"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="w-full md:w-2/3 aspect-video md:aspect-auto">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getFallbackImage(selectedProject.category);
                  }}
                />
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-accent-orange font-bold">
                      {selectedProject.id}
                    </span>
                    <h3 className="text-4xl font-serif mt-2 tracking-tighter leading-tight italic">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-8">
                    <DetailItem label="Tipología" value={selectedProject.category} />
                    <DetailItem label="Estado" value={selectedProject.status} />
                    <DetailItem label="Área" value={selectedProject.area} />
                    <DetailItem label="Lote" value={selectedProject.lot} />
                    <DetailItem label="Año" value={selectedProject.year} />
                  </div>
                </div>

                <div className="mt-12">
                  <span className="text-[8px] uppercase tracking-widest text-technical italic opacity-40">
                    Propiedad Intelectual de A.P.A Architects • Builds
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onClick={onClick}
      className={cn(
        "group cursor-pointer",
        index % 3 === 1 ? "lg:mt-12" : ""
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6 bg-white/5 shadow-xl">
        {/* Top Right: Status */}
        <div className="absolute top-4 right-4 z-20">
          <span className={cn(
            "text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-md border",
            project.status === "Terminado" ? "bg-petroleum/40 border-petroleum/50 text-white" : 
            project.status === "En Construcción" ? "bg-accent-orange/40 border-accent-orange/50 text-white" : 
            "bg-white/10 border-white/20 text-white"
          )}>
            {project.status}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 scale-90 group-hover:scale-100 transition-transform">
            <Maximize2 className="w-5 h-5 text-white" />
          </div>
        </div>

        <motion.img 
          src={project.image} 
          alt={project.title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover select-none pointer-events-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = getFallbackImage(project.category);
          }}
        />
        
        {/* Bottom Info: Tech Specs */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2">
          <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="text-[7px] uppercase tracking-widest text-white/60">Lote: {project.lot}</span>
            <span className="text-[7px] uppercase tracking-widest text-white/60">Área: {project.area}</span>
            <span className="text-[7px] uppercase tracking-widest text-white/60">Año: {project.year}</span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
            {project.id}
          </span>
        </div>
      </div>
      
      <div className="space-y-1 px-2">
        <p className="text-[9px] uppercase tracking-widest text-technical font-medium">{project.category}</p>
        <h3 className="text-xl md:text-2xl font-serif text-white/90 group-hover:text-accent-orange transition-colors line-clamp-1 leading-tight group-hover:italic">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[9px] uppercase tracking-widest text-technical opacity-60">{label}</span>
      <p className="text-sm font-light tracking-tight text-white/90">{value}</p>
    </div>
  );
}

function FilterButton({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "text-[10px] uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300",
        active ? "bg-petroleum text-white border-petroleum" : "border border-white/10 hover:border-white/40 text-white/60 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}
