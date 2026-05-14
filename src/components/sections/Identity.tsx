import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Identity() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section ref={containerRef} id="estudio" className="min-h-screen py-32 px-10 flex flex-col items-center justify-center relative">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-5xl w-full text-center space-y-24"
      >
        <div className="space-y-8">
          <span className="text-[10px] uppercase tracking-[0.5em] text-technical">Nuestra Esencia</span>
          <h2 className="text-4xl md:text-6xl font-serif font-light leading-[1.2] tracking-tight">
            La arquitectura une pensamiento y acción. En A.P.A, cada proyecto <span className="italic font-normal text-petroleum">analiza, proyecta y transforma</span> ideas en arquitectura, resultado de diseño riguroso y visión estratégica.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-20 text-left">
          <div className="space-y-4 border-l border-petroleum pl-8 py-2">
            <h3 className="font-serif text-2xl italic text-petroleum font-medium">Misión</h3>
            <p className="text-secondary leading-relaxed font-light text-sm opacity-80">
              Nuestra misión es concebir, diseñar y construir arquitectura de alto valor mediante un proceso basado en Análisis, Proyecto y Acción, donde cada obra responde de manera precisa al contexto, a las necesidades del cliente y a los retos técnicos de cada espacio.
              <br /><br />
              En A.P.A Arquitectos • Constructores integramos pensamiento estratégico, diseño arquitectónico y ejecución constructiva, transformando ideas en proyectos reales que aportan calidad, identidad y permanencia al entorno construido.
            </p>
          </div>
          <div className="space-y-4 border-l border-accent-orange pl-8 py-2">
            <h3 className="font-serif text-2xl italic text-accent-orange font-medium">Visión</h3>
            <p className="text-secondary leading-relaxed font-light text-sm opacity-80">
              Ser un estudio de arquitectura y construcción reconocido por su capacidad de transformar ideas en arquitectura construida, destacándose por la claridad conceptual, la precisión técnica y la excelencia en cada proyecto.
              <br /><br />
              Aspiramos a consolidarnos como una firma que desarrolla proyectos contemporáneos, funcionales y sostenibles, contribuyendo al desarrollo de las ciudades y municipios, y a la creación de espacios arquitectónicos que perduren en el tiempo y fortalezcan la identidad de su entorno.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.02]">
        <span className="text-[25vw] font-serif font-bold italic select-none">ARCHITECTURE</span>
      </div>
    </section>
  );
}
