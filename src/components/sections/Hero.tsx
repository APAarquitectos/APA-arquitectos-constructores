import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="APA Architects Hero"
          className="w-full h-full object-cover scale-110 select-none pointer-events-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        />
        {/* Placeholder for Cinematic Video Overlay Effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-t from-base-950 via-transparent to-transparent z-10"
        />
      </div>

      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-text"
        >
          <h1 className="text-6xl md:text-[6vw] font-serif italic leading-none tracking-tight">
            Análisis, Proyecto y Acción.
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 flex flex-col items-center"
        >
          <p className="text-[10px] md:text-sm uppercase tracking-[0.5em] font-light max-w-md">
            Redefiniendo el Paisaje Urbano a través de la Precisión BIM
          </p>
          <div className="mt-12 h-20 w-[1px] bg-gradient-to-b from-accent-orange to-transparent animate-pulse" />
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-petroleum/20 hidden md:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-petroleum/20 hidden md:block" />
    </section>
  );
}
