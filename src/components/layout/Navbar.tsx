import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/src/lib/utils";
import { X, Send, Menu, Home, Layers, Eye, Phone } from "lucide-react";

export default function Navbar() {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "Residencial",
    lote: "",
    area: "",
    pisos: "1",
    ubicacion: "",
    objetivo: "Diseño y Construcción",
    nivel: "Estándar"
  });

  const { pricePerM2, estimatedPrice } = useMemo(() => {
    const prices: Record<string, number> = {
      "Básico": 12000,
      "Estándar": 16000,
      "Premium": 21000
    };
    const price = prices[formData.nivel] || 16000;
    const area = parseFloat(formData.area) || 0;
    const pisos = parseFloat(formData.pisos) || 0;
    
    // Si pisos es 0 o NaN (vacío), asumimos 1 para el cálculo base si hay área
    const effectivePisos = pisos > 0 ? pisos : (area > 0 ? 1 : 0);
    
    return {
      pricePerM2: price,
      estimatedPrice: area * effectivePisos * price
    };
  }, [formData.nivel, formData.area, formData.pisos]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const startProject = () => {
    const messageText = `Hola APA Arquitectos • Constructores, me gustaría iniciar un proyecto.
    
📝 Detalles del Proyecto:
• Tipo: ${formData.tipo}
• Nivel: ${formData.nivel}
• Lote: ${formData.lote}
• Área: ${formData.area} m2
• Pisos: ${formData.pisos}
• Ubicación: ${formData.ubicacion}
• Objetivo: ${formData.objetivo}

Pre-cotización aproximada: $${formatCurrency(estimatedPrice)} COP`;

    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/573222720549?text=${message}`, "_blank");
    setShowInquiryModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Estudio", href: "#estudio", icon: Home },
    { name: "Proyectos", href: "#proyectos", icon: Layers },
    { name: "BIM Virtual", href: "#bim-viewer", icon: Eye },
    { name: "Contacto", href: "#contacto", icon: Phone },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 md:py-6 flex justify-between items-center transition-all duration-500",
      scrolled ? "bg-black/80 backdrop-blur-md" : "bg-gradient-to-b from-black/50 to-transparent"
    )}>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col relative z-20"
      >
        <span className="font-serif text-2xl tracking-tighter font-medium underline-offset-4 leading-none text-white">APA</span>
        <span className="text-[7px] uppercase tracking-[0.2em] opacity-80 text-white">Arquitectos • Constructores</span>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-12 text-[9px] uppercase tracking-[0.4em] font-medium items-center">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="hover:text-accent-orange transition-colors flex items-center gap-2 group text-white">
            <link.icon className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
            {link.name}
          </a>
        ))}
        <button 
          onClick={() => setShowInquiryModal(true)}
          className="border border-accent-orange text-accent-orange px-8 py-3 rounded-full hover:bg-accent-orange hover:text-white transition-all duration-500 tracking-[0.2em]"
        >
          INICIA UN PROYECTO
        </button>
      </div>

      {/* Mobile Toggle */}
      <button 
        className="lg:hidden text-white z-20 p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0a0a] z-10 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl uppercase tracking-[0.3em] font-light text-white hover:text-accent-orange transition-colors flex flex-col items-center gap-2"
              >
                <link.icon className="w-6 h-6 text-accent-orange/40 mb-2" />
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowInquiryModal(true);
              }}
              className="mt-4 border border-accent-orange text-accent-orange px-10 py-4 rounded-full hover:bg-accent-orange hover:text-white transition-all duration-500 tracking-[0.2em] text-xs"
            >
              INICIA UN PROYECTO
            </button>
            <div className="absolute bottom-12 text-[8px] uppercase tracking-[0.4em] opacity-40">
              APA Architects • Builds
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInquiryModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0d0d0d] border border-petroleum/30 rounded-2xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center mb-10">
                <div className="w-12 h-12 bg-petroleum/20 rounded-full flex items-center justify-center mb-4 border border-petroleum/30">
                  <Send className="w-5 h-5 text-accent-orange" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif italic text-center mb-6">
                  Inicia tu proyecto con <br/>
                  <span className="text-petroleum not-italic font-bold tracking-tight">A.P.A Arquitectos • Constructores</span>
                </h3>
                <div className="text-center space-y-6 max-w-lg mb-8">
                  <p className="text-[11px] text-white/80 font-medium tracking-wide uppercase">Bienvenidos a A.P.A Arquitectos • Constructores</p>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    Somos una firma dedicada al desarrollo de arquitectura estratégica, donde cada proyecto se trabaja a partir de un método claro: <br/>
                    <span className="text-accent-orange not-italic font-bold tracking-widest uppercase text-[10px]">Análisis • Proyecto • Acción.</span>
                  </p>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    En A.P.A pensamos, diseñamos y construimos espacios funcionales, estéticos y bien ejecutados, acompañando a nuestros clientes desde la idea inicial hasta la obra terminada. 
                    <br/><br/>
                    Creemos que la buena arquitectura nace del análisis, se fortalece con un proyecto sólido y se materializa con una ejecución responsable.
                  </p>
                  <p className="text-[11px] text-accent-orange font-bold tracking-widest uppercase pt-2">Si tienes una idea o proyecto en mente, conversemos.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 ml-2">Tipo de Proyecto</label>
                  <select 
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-accent-orange transition-colors"
                  >
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Interiores">Interiores</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 ml-2">Medidas del Lote (Ej: 10x20m)</label>
                  <input 
                    type="text" 
                    placeholder="Largo x Ancho"
                    value={formData.lote}
                    onChange={(e) => setFormData({...formData, lote: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 ml-2">Área total (m2)</label>
                  <input 
                    type="number" 
                    placeholder="Área en m2"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 ml-2">Número de Pisos</label>
                  <input 
                    type="number" 
                    placeholder="Cantidad de niveles"
                    value={formData.pisos}
                    onChange={(e) => setFormData({...formData, pisos: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 ml-2">Ubicación</label>
                  <input 
                    type="text" 
                    placeholder="Ciudad o Sector"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 ml-2">Nivel de Arquitectura</label>
                  <select 
                    value={formData.nivel}
                    onChange={(e) => setFormData({...formData, nivel: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-accent-orange transition-colors"
                  >
                    <option value="Básico">Básico ($12.000 / m2)</option>
                    <option value="Estándar">Estándar ($16.000 / m2)</option>
                    <option value="Premium">Premium ($21.000 / m2)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] uppercase tracking-widest text-white/40 ml-2">Objetivo</label>
                  <select 
                    value={formData.objetivo}
                    onChange={(e) => setFormData({...formData, objetivo: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-accent-orange transition-colors"
                  >
                    <option value="Diseño y Construcción">Diseño y Construcción</option>
                    <option value="Solo Diseño">Solo Diseño</option>
                    <option value="Solo Construcción">Solo Construcción</option>
                    <option value="Remodelación">Remodelación</option>
                  </select>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-8 text-left">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-accent-orange font-bold">Referencia de Valor</span>
                    <motion.p 
                      key={estimatedPrice}
                      initial={{ opacity: 0.8, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-serif"
                    >
                      $ {formatCurrency(estimatedPrice)} <span className="text-[10px] text-white/40 italic">COP aprox.</span>
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <span className="text-[7px] uppercase tracking-widest opacity-40 leading-none">M2 Proyectado ({formData.nivel})</span>
                    <motion.p 
                      key={pricePerM2}
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] font-medium"
                    >
                      $ {formatCurrency(pricePerM2)} / m2
                    </motion.p>
                  </div>
                </div>
                <p className="mt-4 text-[9px] text-white/30 italic leading-relaxed">
                  * Este valor es una referencia aproximada basada en el área ingresada. Para un presupuesto detallado y profundo, por favor contacta a uno de nuestros asesores técnicos.
                </p>
              </div>

              <button 
                onClick={startProject}
                className="w-full bg-accent-orange text-white py-5 rounded-xl font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-white hover:text-black transition-all shadow-lg"
              >
                Continuar a WhatsApp
              </button>
              
              <p className="mt-6 text-[8px] uppercase tracking-widest text-technical opacity-40">
                Respuesta inmediata por nuestro equipo técnico
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
